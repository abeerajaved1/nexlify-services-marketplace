// backend/automation/groqClient.js
// One shared Groq client, reused by lead analysis, proposal writing, and email drafting.
// Groq is free-tier and one of the fastest inference APIs available, which is why
// we use it instead of a self-hosted local model (no server/GPU needed, no cost).
const Groq = require('groq-sdk');
const config = require('../config');

const groq = new Groq({ apiKey: config.groqApiKey });

/**
 * Ask Groq for a JSON object back. We instruct it strictly to return JSON only,
 * then parse it defensively (strip code fences if the model adds them anyway).
 */
async function askForJSON(systemPrompt, userPrompt) {
  const completion = await groq.chat.completions.create({
    model: config.chatbotModel,
    temperature: 0.4,
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userPrompt },
    ],
  });

  const raw = completion.choices[0]?.message?.content || '{}';
  const cleaned = raw.replace(/```json/gi, '').replace(/```/g, '').trim();

  try {
    return JSON.parse(cleaned);
  } catch (err) {
    console.error('❌ Groq did not return valid JSON:', raw);
    throw new Error('AI response was not valid JSON');
  }
}

/** Plain text completion (e.g. a follow-up email body). */
async function askForText(systemPrompt, userPrompt) {
  const completion = await groq.chat.completions.create({
    model: config.chatbotModel,
    temperature: 0.5,
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userPrompt },
    ],
  });
  return (completion.choices[0]?.message?.content || '').trim();
}

module.exports = { groq, askForJSON, askForText };