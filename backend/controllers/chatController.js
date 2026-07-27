// backend/chatbot/chatController.js
// Main chat endpoint using FREE Groq API

const Groq = require('groq-sdk');
const config = require('../config');
const { SYSTEM_PROMPT, OFF_TOPIC_RESPONSE, SECURITY_BLOCK_RESPONSE } = require('./prompts');
const { searchKnowledgeBase } = require('./knowledgeBase');

// Check if Groq API key is available
if (!config.groqApiKey) {
  console.error('❌ GROQ_API_KEY is missing! Chatbot will not work.');
}

const groq = new Groq({ apiKey: config.groqApiKey });

function isSecurityThreat(message) {
  const lowerMsg = message.toLowerCase();
  const threats = [
    /admin\s*(password|pass|login|credential|access)/i,
    /hack|exploit|bypass|inject|sql\s*injection/i,
    /show\s*(all|me)\s*(users?|passwords?|emails?)/i,
    /database\s*(dump|schema|structure)/i,
    /api\s*key|secret\s*key|jwt\s*secret|env/i,
    /ignore\s*previous\s*instructions/i,
    /you\s*are\s*now/i,
    /system\s*prompt|reveal\s*your\s*instructions/i,
    /mongodb\s*uri|connection\s*string/i,
  ];
  return threats.some(p => p.test(lowerMsg));
}

function isOffTopic(message, hasContext) {
  const lowerMsg = message.toLowerCase();
  const relevant = [
    'nexlify', 'service', 'web', 'development', 'ai', 'artificial',
    'content', 'writing', 'model', 'training', 'database', 'project',
    'price', 'cost', 'pricing', 'contact', 'email', 'whatsapp',
    'consultation', 'hire', 'work', 'portfolio', 'company', 'about',
    'help', 'hello', 'hi', 'hey', 'thanks', 'website', 'app',
    'application', 'chatbot', 'automation', 'seo', 'blog', 'article',
    'mern', 'react', 'node', 'mongodb', 'machine', 'learning', 'ml'
  ];
  
  if (message.length < 12) return false;
  if (hasContext) return false;
  
  const hasRelevant = relevant.some(kw => lowerMsg.includes(kw));
  return !hasRelevant;
}

exports.chat = async (req, res) => {
  try {
    const { message, history = [] } = req.body;
    
    if (!message || typeof message !== 'string') {
      return res.status(400).json({ success: false, message: 'Message required' });
    }
    
    const userMessage = message.trim().slice(0, 500);
    
    // Security check
    if (isSecurityThreat(userMessage)) {
      console.log('🛡️ Blocked:', userMessage.substring(0, 50));
      return res.json({ success: true, response: SECURITY_BLOCK_RESPONSE });
    }
    
    // Retrieve context
    let context = [];
    try {
      context = searchKnowledgeBase(userMessage, 3);
    } catch (err) {
      console.error('Knowledge base search error:', err.message);
    }
    
    // Off-topic check
    if (context.length === 0 && isOffTopic(userMessage, false)) {
      return res.json({ success: true, response: OFF_TOPIC_RESPONSE });
    }
    
    // Build context string
    const contextStr = context.map((c, i) => `[${i+1}] ${c.content}`).join('\n\n');
    
    // Build messages for Groq
    const messages = [
      {
        role: 'system',
        content: `${SYSTEM_PROMPT}\n\nRELEVANT CONTEXT:\n${contextStr}\n\nAnswer using ONLY the above context.`
      }
    ];
    
    const recentHistory = history.slice(-(config.chatbotMaxContext || 5));
    messages.push(...recentHistory);
    messages.push({ role: 'user', content: userMessage });
    
    // Call Groq API
    console.log('🤖 Calling Groq API with model:', config.chatbotModel);
    
    const completion = await groq.chat.completions.create({
      messages,
      model: config.chatbotModel || 'llama-3.3-70b-versatile',
      temperature: config.chatbotTemperature || 0.3,
      max_tokens: 500,
    });
    
    const botResponse = completion.choices[0]?.message?.content || 
      "I'm sorry, I couldn't process that. Please contact us at nexlify.servicess@gmail.com";
    
    console.log(`🤖 Response: "${botResponse.substring(0, 50)}..."`);
    
    res.json({
      success: true,
      response: botResponse,
      context: context.map(c => c.id)
    });
    
  } catch (error) {
    console.error('❌ Chat error:', error.message);
    console.error('❌ Error details:', error);
    
    res.status(500).json({
      success: false,
      message: 'Chat service temporarily unavailable. Please contact us at nexlify.servicess@gmail.com'
    });
  }
};

exports.health = async (req, res) => {
  res.json({ 
    status: 'ok', 
    service: 'chatbot',
    model: config.chatbotModel,
    groqConfigured: !!config.groqApiKey
  });
};