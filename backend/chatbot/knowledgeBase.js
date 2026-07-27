// backend/chatbot/knowledgeBase.js
// Static knowledge base (no vector DB needed for simple version)

const knowledgeDocuments = [
  {
    id: 'about',
    content: `Nexlify Services is a premium digital agency specializing in Web Development, AI Solutions, Content Writing, AI Model Training, and Database Management. We deliver cutting-edge technology solutions that empower businesses to grow.`,
    keywords: ['about', 'company', 'who', 'nexlify', 'what is nexlify']
  },
  {
    id: 'web-dev',
    content: `Our Web Development service includes custom MERN stack applications, responsive design, e-commerce platforms, SaaS dashboards, and API development. We use React, Node.js, Express, and MongoDB. Pricing varies by project complexity.`,
    keywords: ['web', 'website', 'development', 'mern', 'react', 'node', 'ecommerce', 'app']
  },
  {
    id: 'ai-solutions',
    content: `Our AI Solutions cover intelligent automation, machine learning integration, custom chatbots, predictive analytics, and AI-powered business intelligence. We specialize in NLP and automation workflows.`,
    keywords: ['ai', 'artificial intelligence', 'automation', 'machine learning', 'ml', 'chatbot', 'nlp']
  },
  {
    id: 'content-writing',
    content: `Our Content Writing service provides SEO-optimized articles, technical documentation, blog posts, website copy, and social media content. We create content that ranks on Google and converts visitors.`,
    keywords: ['content', 'writing', 'seo', 'blog', 'article', 'copywriting', 'documentation']
  },
  {
    id: 'model-training',
    content: `Our AI Model Training service includes custom model fine-tuning, dataset preparation, model evaluation, deployment pipelines, and ongoing maintenance. We work with GPT, LLaMA, and open-source models.`,
    keywords: ['model', 'training', 'fine-tuning', 'dataset', 'llm', 'gpt', 'llama']
  },
  {
    id: 'database',
    content: `Our Database Management includes MongoDB optimization, schema design, data migration, performance tuning, backup strategies, and scaling. We ensure your data is secure and performing at its best.`,
    keywords: ['database', 'mongodb', 'optimization', 'schema', 'migration', 'backup']
  },
  {
    id: 'contact',
    content: `Contact Nexlify: Email at nexlify.servicess@gmail.com, WhatsApp at +923280355038. We typically respond within 24 hours. For urgent inquiries, WhatsApp is fastest.`,
    keywords: ['contact', 'email', 'phone', 'whatsapp', 'reach', 'location']
  },
  {
    id: 'process',
    content: `Our project process: 1) Free consultation, 2) Detailed proposal with timeline/pricing, 3) Development with weekly updates, 4) Testing & QA, 5) Deployment, 6) 30-day free support. We use agile methodology.`,
    keywords: ['process', 'how', 'work', 'consultation', 'proposal', 'timeline', 'agile']
  },
  {
    id: 'security',
    content: `Nexlify takes security seriously. We sign NDAs, use encrypted communications, follow OWASP guidelines, and never share client data. All code is security-reviewed before deployment.`,
    keywords: ['security', 'nda', 'privacy', 'safe', 'protect', 'confidential']
  }
];

// Simple keyword-based search (no embeddings needed)
function searchKnowledgeBase(query, limit = 3) {
  const lowerQuery = query.toLowerCase();
  const queryWords = lowerQuery.split(/\s+/).filter(w => w.length > 2);
  
  const scored = knowledgeDocuments.map(doc => {
    let score = 0;
    
    // Check keyword matches
    doc.keywords.forEach(kw => {
      if (lowerQuery.includes(kw)) score += 3;
    });
    
    // Check word overlap in content
    queryWords.forEach(word => {
      if (doc.content.toLowerCase().includes(word)) score += 1;
    });
    
    return { ...doc, score };
  });
  
  return scored
    .filter(d => d.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}

module.exports = {
  knowledgeDocuments,
  searchKnowledgeBase
};