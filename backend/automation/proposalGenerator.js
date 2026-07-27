// backend/automation/proposalGenerator.js
const fs = require('fs');
const path = require('path');
const { PDFDocument, StandardFonts, rgb } = require('pdf-lib');
const { askForJSON } = require('./groqClient');
const config = require('../config');

const PROPOSAL_SYSTEM_PROMPT = `You write short, specific business proposals for Nexlify, a digital agency offering Web Development, AI Automation & AI Agents, Content Writing, AI Model Training, and Database Management.

Write in a confident, human, non-generic tone. Reference the specific opportunities given to you — never write filler like "we noticed you could benefit from technology."

Respond with ONLY a JSON object in this exact shape:
{
  "title": "short proposal title, e.g. 'AI Automation Proposal for Acme Logistics'",
  "greeting": "1-2 sentences opening, referencing something specific about their business",
  "problem": "2-3 sentences describing the specific gap/opportunity",
  "solution": "2-3 sentences describing what Nexlify would build",
  "scope": ["short bullet points of deliverables, 3-5 items"],
  "timeline": "rough estimate, e.g. '3-4 weeks'",
  "pricingNote": "one line, e.g. 'Final pricing depends on scope — happy to send a detailed quote after a quick call.'",
  "closing": "1-2 sentence call to action"
}`;

async function generateProposalContent(lead) {
  const userPrompt = `Company: ${lead.companyName}
Industry: ${lead.industry}
Website: ${lead.website}
Summary: ${lead.analysis.summary}
Observed gaps: ${lead.analysis.techObserved.join('; ')}
Opportunities to pitch: ${lead.analysis.opportunities.join('; ')}`;

  return askForJSON(PROPOSAL_SYSTEM_PROMPT, userPrompt);
}

// --- Minimal PDF rendering (no browser, just pdf-lib) ---

function wrapText(text, font, fontSize, maxWidth) {
  const words = text.split(' ');
  const lines = [];
  let current = '';
  for (const word of words) {
    const trial = current ? `${current} ${word}` : word;
    if (font.widthOfTextAtSize(trial, fontSize) > maxWidth && current) {
      lines.push(current);
      current = word;
    } else {
      current = trial;
    }
  }
  if (current) lines.push(current);
  return lines;
}

async function renderProposalPDF(content, lead) {
  const pdfDoc = await PDFDocument.create();
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  const margin = 50;
  const pageWidth = 595; // A4
  const pageHeight = 842;
  const maxWidth = pageWidth - margin * 2;

  let page = pdfDoc.addPage([pageWidth, pageHeight]);
  let y = pageHeight - margin;

  const newPageIfNeeded = (neededSpace) => {
    if (y - neededSpace < margin) {
      page = pdfDoc.addPage([pageWidth, pageHeight]);
      y = pageHeight - margin;
    }
  };

  const drawParagraph = (text, { size = 11, bold = false, gapAfter = 14, color = rgb(0.1, 0.1, 0.1) } = {}) => {
    const useFont = bold ? boldFont : font;
    const lines = wrapText(text, useFont, size, maxWidth);
    for (const line of lines) {
      newPageIfNeeded(size + 6);
      page.drawText(line, { x: margin, y, size, font: useFont, color });
      y -= size + 6;
    }
    y -= gapAfter;
  };

  drawParagraph('NEXLIFY', { size: 20, bold: true, gapAfter: 4, color: rgb(0.15, 0.25, 0.55) });
  drawParagraph('nexlify.servicess@gmail.com', { size: 9, gapAfter: 20, color: rgb(0.4, 0.4, 0.4) });

  drawParagraph(content.title || `Proposal for ${lead.companyName}`, { size: 16, bold: true, gapAfter: 16 });

  drawParagraph(content.greeting, { gapAfter: 14 });

  drawParagraph('The Opportunity', { size: 13, bold: true, gapAfter: 6 });
  drawParagraph(content.problem, { gapAfter: 14 });

  drawParagraph('What We Would Build', { size: 13, bold: true, gapAfter: 6 });
  drawParagraph(content.solution, { gapAfter: 10 });

  for (const item of content.scope || []) {
    drawParagraph(`•  ${item}`, { gapAfter: 4 });
  }
  y -= 10;

  drawParagraph('Timeline', { size: 13, bold: true, gapAfter: 6 });
  drawParagraph(content.timeline, { gapAfter: 14 });

  drawParagraph('Pricing', { size: 13, bold: true, gapAfter: 6 });
  drawParagraph(content.pricingNote, { gapAfter: 14 });

  drawParagraph(content.closing, { gapAfter: 4 });

  return pdfDoc.save();
}

async function generateProposal(lead) {
  const content = await generateProposalContent(lead);
  const pdfBytes = await renderProposalPDF(content, lead);

  const dir = path.join(__dirname, '..', config.uploadDir, 'proposals');
  fs.mkdirSync(dir, { recursive: true });

  const filename = `proposal-${lead._id}-${Date.now()}.pdf`;
  fs.writeFileSync(path.join(dir, filename), pdfBytes);

  const pdfUrl = `/uploads/proposals/${filename}`;
  return { content, pdfUrl };
}

module.exports = { generateProposal };