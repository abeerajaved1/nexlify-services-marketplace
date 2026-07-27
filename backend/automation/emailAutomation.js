// backend/automation/emailAutomation.js
//
// Drafts outreach emails with Groq. Nothing is ever sent automatically —
// every email sits as status "draft" until an admin approves it from the
// dashboard. This is a deliberate choice: unsupervised cold-outreach is
// risky (wrong tone, wrong lead, spam flags on your Gmail account), and a
// one-click approve is nearly as fast as full automation without the risk.

const transporter = require('../utils/email');
const config = require('../config');
const { askForText } = require('./groqClient');

const STAGE_PROMPTS = {
  proposal: (lead) => `Write a short, warm cold outreach email (under 150 words) to ${lead.companyName} introducing Nexlify and referencing this specific opportunity: ${lead.analysis.opportunities.join('; ')}. End by mentioning a proposal PDF is attached and inviting a quick call. No markdown, plain email text, sign off as "The Nexlify Team".`,
  followup1: (lead) => `Write a brief, friendly follow-up email (under 80 words) to ${lead.companyName}, referencing that we sent a proposal a few days ago about: ${lead.analysis.opportunities.join('; ')}. Ask if they had a chance to look it over. No markdown, sign off as "The Nexlify Team".`,
  followup2: (lead) => `Write a very short, low-pressure final follow-up email (under 60 words) to ${lead.companyName}. Politely check in one last time and offer to close the loop if the timing isn't right. No markdown, sign off as "The Nexlify Team".`,
};

const SYSTEM_PROMPT = `You are writing outreach emails on behalf of Nexlify, a digital agency (Web Development, AI Automation, Content Writing, AI Model Training, Database Management). Be concise, specific, and human — never generic or salesy. Output plain email body text only, no subject line, no markdown formatting.`;

async function draftEmail(lead, stage) {
  const promptFn = STAGE_PROMPTS[stage] || STAGE_PROMPTS.proposal;
  const body = await askForText(SYSTEM_PROMPT, promptFn(lead));

  const subjects = {
    proposal: `Idea for ${lead.companyName} — from Nexlify`,
    followup1: `Following up — ${lead.companyName}`,
    followup2: `Quick last check-in`,
  };

  return { subject: subjects[stage] || subjects.proposal, body };
}

async function sendEmail({ to, subject, body, attachmentPath }) {
  const mailOptions = {
    from: `"Nexlify" <${config.gmailUser}>`,
    to,
    subject,
    text: body,
  };

  if (attachmentPath) {
    mailOptions.attachments = [{ path: attachmentPath }];
  }

  return transporter.sendMail(mailOptions);
}

module.exports = { draftEmail, sendEmail };