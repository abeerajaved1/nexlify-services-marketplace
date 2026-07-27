// backend/automation/leadAnalyzer.js
//
// Given a company's website URL, this:
//  1. Tries a direct fetch first (fastest, free, no dependency)
//  2. If the site blocks that (403, bot-detection, JS-only page), falls back
//     to Jina AI Reader (https://r.jina.ai) — a free, no-signup scraping
//     service that renders the page on their end and returns clean text.
//     This keeps OUR server light (still just a fetch call) while getting
//     past the bot-protection that blocks plain server-side requests.
//  3. Hands the extracted text to Groq and asks it to summarize the company
//     + spot automation/web-dev opportunities Nexlify could pitch
//
// NOTE: this only reads normal public page content. It does not log in
// anywhere and does not touch LinkedIn.

const cheerio = require('cheerio');
const { askForJSON } = require('./groqClient');

// Domains that show up as false positives (analytics/tracking/placeholder emails, not real contacts)
const EMAIL_FALSE_POSITIVES = /sentry\.io|wixpress\.com|example\.com|godaddy\.com|schema\.org|w3\.org|\.png$|\.jpg$|\.svg$|\.gif$|\.webp$/i;

function extractEmail(text) {
  const matches = text.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g) || [];
  const clean = matches.find((m) => !EMAIL_FALSE_POSITIVES.test(m));
  return clean || '';
}

function extractPhone(text) {
  const match = text.match(/\+?\d[\d\s().-]{7,}\d/);
  return match ? match[0].trim() : '';
}

async function fetchDirect(url) {
  const res = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
      Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
      'Accept-Language': 'en-US,en;q=0.9',
    },
    signal: AbortSignal.timeout(10000),
  });

  if (!res.ok) {
    throw new Error(`Site responded with status ${res.status}`);
  }

  const html = await res.text();
  const $ = cheerio.load(html);

  const title = $('title').first().text().trim();
  const metaDescription = $('meta[name="description"]').attr('content') || '';

  $('script, style, noscript').remove();
  const bodyText = $('body').text().replace(/\s+/g, ' ').trim().slice(0, 4000);

  const emailMatch = html.match(/mailto:([^"'?\s]+)/i);
  const phoneMatch = html.match(/tel:([^"'\s]+)/i);

  // A blocked/challenge page usually renders almost no real text — treat that as a failure too
  if (bodyText.length < 100) {
    throw new Error('Page returned almost no readable content (likely blocked)');
  }

  return {
    title,
    metaDescription,
    bodyText,
    // Prefer an explicit mailto:/tel: link, fall back to scanning the visible text
    extractedEmail: emailMatch ? emailMatch[1] : extractEmail(bodyText),
    extractedPhone: phoneMatch ? phoneMatch[1] : extractPhone(bodyText),
  };
}

// Fallback: free, no API key needed. Renders JS on Jina's servers and returns text.
async function fetchViaJinaReader(url) {
  const res = await fetch(`https://r.jina.ai/${url}`, {
    headers: { 'X-Return-Format': 'text' },
    signal: AbortSignal.timeout(20000), // JS rendering takes longer
  });

  if (!res.ok) {
    throw new Error(`Jina Reader also failed (status ${res.status})`);
  }

  const raw = await res.text();

  // Jina's plain-text format starts with "Title: ...\nURL Source: ...\nMarkdown Content:\n..."
  const titleMatch = raw.match(/^Title:\s*(.*)$/m);
  const contentIndex = raw.indexOf('Markdown Content:');
  const bodyText = (contentIndex >= 0 ? raw.slice(contentIndex + 'Markdown Content:'.length) : raw)
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 4000);

  const emailMatch = extractEmail(raw);
  const phoneMatch = extractPhone(raw);

  if (bodyText.length < 100) {
    throw new Error('Jina Reader also returned almost no content');
  }

  return {
    title: titleMatch ? titleMatch[1].trim() : '',
    metaDescription: '',
    bodyText,
    extractedEmail: emailMatch,
    extractedPhone: phoneMatch,
  };
}

async function fetchSiteInfo(url) {
  let site;
  try {
    site = await fetchDirect(url);
  } catch (directErr) {
    console.log(`⚠️ Direct fetch failed for ${url} (${directErr.message}), trying Jina Reader...`);
    try {
      site = await fetchViaJinaReader(url);
    } catch (jinaErr) {
      throw new Error(`Could not read this site (direct: ${directErr.message}; reader: ${jinaErr.message})`);
    }
  }

  // Homepages often don't list an email/phone directly — try a /contact page too,
  // but only if we didn't already find one (keeps this fast for sites that already worked).
  if (!site.extractedEmail && !site.extractedPhone) {
    const base = url.replace(/\/$/, '');
    for (const path of ['/contact', '/contact-us', '/contactus']) {
      try {
        const contactSite = await fetchDirect(`${base}${path}`);
        if (contactSite.extractedEmail || contactSite.extractedPhone) {
          site.extractedEmail = site.extractedEmail || contactSite.extractedEmail;
          site.extractedPhone = site.extractedPhone || contactSite.extractedPhone;
          break;
        }
      } catch {
        // that path doesn't exist or is blocked too — just move on, this is a best-effort try
      }
    }
  }

  return site;
}

const ANALYSIS_SYSTEM_PROMPT = `You are a business analyst for Nexlify, a digital agency offering: Web Development (MERN stack), AI Automation & AI Agents, Content Writing, AI Model Training, and Database Management.

Given raw text scraped from a company's website, identify realistic opportunities for Nexlify to pitch. Be specific and grounded in what's actually described — do not invent details that aren't implied by the text.

Respond with ONLY a JSON object, no other text, in this exact shape:
{
  "companyName": "string",
  "industry": "string, short",
  "summary": "1-2 sentence summary of what the company does",
  "techObserved": ["short strings, e.g. 'no visible chatbot', 'static contact form'"],
  "opportunities": ["short strings, e.g. 'Could add an AI support chatbot'"],
  "score": 0
}
"score" is 0-100: how good a fit this company looks like for Nexlify's services based on what you observed. Be honest — most sites should NOT score above 70 unless there's a clear, specific gap.`;

async function analyzeLeadFromUrl(url) {
  const site = await fetchSiteInfo(url);

  const userPrompt = `URL: ${url}
Page title: ${site.title}
Meta description: ${site.metaDescription}
Visible text (truncated): ${site.bodyText}`;

  const analysis = await askForJSON(ANALYSIS_SYSTEM_PROMPT, userPrompt);

  return {
    companyName: analysis.companyName || site.title || url,
    website: url,
    contactEmail: site.extractedEmail,
    contactPhone: site.extractedPhone,
    industry: analysis.industry || '',
    analysis: {
      summary: analysis.summary || '',
      techObserved: Array.isArray(analysis.techObserved) ? analysis.techObserved : [],
      opportunities: Array.isArray(analysis.opportunities) ? analysis.opportunities : [],
      score: typeof analysis.score === 'number' ? analysis.score : 0,
    },
  };
}

module.exports = { analyzeLeadFromUrl };