import { useState, useRef, useEffect } from 'react';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:10000';

// AXENRO White Theme Colors
const AX = {
  primary: '#2563eb',
  primaryDark: '#1d4ed8',
  primaryLight: '#3b82f6',
  bg: '#ffffff',
  card: '#f8fafc',
  cardLight: '#ffffff',
  border: '#e2e8f0',
  text: '#0f172a',
  textMuted: '#64748b',
  success: '#22c55e',
  error: '#ef4444',
  shadow: '0 20px 60px rgba(15, 23, 42, 0.15)',
};

const s = {
  container: {
    position: 'fixed',
    bottom: '24px',
    right: '24px',
    zIndex: 99999,
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
  },
  toggleBtn: {
    width: '60px',
    height: '60px',
    borderRadius: '50%',
    background: `linear-gradient(135deg, ${AX.primary} 0%, ${AX.primaryDark} 100%)`,
    border: 'none',
    color: 'white',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: `0 4px 24px ${AX.primary}40`,
    fontSize: '26px',
    transition: 'all 0.3s ease',
  },
  chatWindow: {
    width: '400px',
    height: '560px',
    background: AX.bg,
    borderRadius: '20px',
    boxShadow: AX.shadow,
    border: `1px solid ${AX.border}`,
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
  },
  header: {
    background: `linear-gradient(135deg, ${AX.card} 0%, ${AX.bg} 100%)`,
    padding: '18px 20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottom: `1px solid ${AX.border}`,
  },
  headerInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  avatar: {
    width: '44px',
    height: '44px',
    borderRadius: '50%',
    background: `linear-gradient(135deg, ${AX.primary} 0%, ${AX.primaryDark} 100%)`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontWeight: 800,
    fontSize: '20px',
    border: `2px solid ${AX.primaryLight}`,
  },
  headerTitle: {
    color: AX.text,
    margin: 0,
    fontSize: '16px',
    fontWeight: 700,
  },
  status: {
    color: AX.success,
    fontSize: '12px',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
  },
  statusDot: {
    width: '8px',
    height: '8px',
    background: AX.success,
    borderRadius: '50%',
    display: 'inline-block',
    boxShadow: `0 0 8px ${AX.success}`,
  },
  closeBtn: {
    background: 'none',
    border: 'none',
    color: AX.textMuted,
    cursor: 'pointer',
    fontSize: '20px',
    padding: '4px',
    transition: 'color 0.2s',
  },
  messages: {
    flex: 1,
    overflowY: 'auto',
    padding: '16px',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    background: AX.bg,
  },
  messageRowUser: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  messageRowBot: {
    display: 'flex',
    justifyContent: 'flex-start',
  },
  bubble: {
    maxWidth: '80%',
    padding: '12px 16px',
    borderRadius: '16px',
    fontSize: '14px',
    lineHeight: 1.5,
    wordWrap: 'break-word',
  },
  bubbleUser: {
    background: `linear-gradient(135deg, ${AX.primary} 0%, ${AX.primaryDark} 100%)`,
    color: 'white',
    borderBottomRightRadius: '4px',
  },
  bubbleBot: {
    background: AX.card,
    color: AX.text,
    borderBottomLeftRadius: '4px',
    border: `1px solid ${AX.border}`,
  },
  bubbleError: {
    background: 'rgba(239,68,68,0.08)',
    color: '#dc2626',
    border: '1px solid rgba(239,68,68,0.15)',
  },
  typing: {
    display: 'flex',
    gap: '6px',
    padding: '16px 20px',
  },
  dot: {
    width: '8px',
    height: '8px',
    background: AX.primary,
    borderRadius: '50%',
  },
  quickReplies: {
    padding: '10px 16px',
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px',
    borderTop: `1px solid ${AX.border}`,
    background: AX.card,
  },
  quickReplyBtn: {
    background: 'rgba(37,99,235,0.08)',
    border: `1px solid ${AX.border}`,
    color: AX.primary,
    padding: '8px 14px',
    borderRadius: '20px',
    fontSize: '12px',
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
  inputArea: {
    padding: '14px 16px',
    background: AX.card,
    borderTop: `1px solid ${AX.border}`,
    display: 'flex',
    gap: '10px',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    background: AX.bg,
    border: `1px solid ${AX.border}`,
    borderRadius: '24px',
    padding: '12px 18px',
    color: AX.text,
    fontSize: '14px',
    outline: 'none',
    transition: 'border-color 0.2s',
  },
  sendBtn: {
    width: '44px',
    height: '44px',
    borderRadius: '50%',
    background: `linear-gradient(135deg, ${AX.primary} 0%, ${AX.primaryDark} 100%)`,
    border: 'none',
    color: 'white',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '18px',
    transition: 'all 0.2s',
  },
  sendBtnDisabled: {
    opacity: 0.5,
    cursor: 'not-allowed',
  },
};

function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'bot', content: "👋 Hi! I'm Axenro AI. How can I help you with our technology services today?" }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => { scrollToBottom(); }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setLoading(true);

    try {
      const history = messages
        .filter(m => m.role !== 'error')
        .slice(-10)
        .map(m => ({ role: m.role === 'bot' ? 'assistant' : 'user', content: m.content }));

      const res = await fetch(`${API_BASE}/api/chatbot/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMsg, history })
      });

      const data = await res.json();

      if (data.success) {
        setMessages(prev => [...prev, { role: 'bot', content: data.response }]);
      } else {
        throw new Error(data.message || 'Unknown error');
      }
    } catch (err) {
      console.error('🚀 CHATBOT ERROR:', err.message);
      setMessages(prev => [...prev, {
        role: 'error',
        content: 'Sorry, connection issue. Email us: contact@axenro.com'
      }]);
    } finally {
      setLoading(false);
    }
  };

  const quickReplies = [
    'What services do you offer?',
    'How much does a project cost?',
    'Tell me about AI solutions',
    'How can I contact you?'
  ];

  return (
    <div style={s.container}>
      {!isOpen && (
        <button style={s.toggleBtn} onClick={() => setIsOpen(true)} aria-label="Open chat">
          💬
        </button>
      )}

      {isOpen && (
        <div style={s.chatWindow}>
          <div style={s.header}>
            <div style={s.headerInfo}>
              <div style={s.avatar}>A</div>
              <div>
                <h4 style={s.headerTitle}>Axenro AI</h4>
                <span style={s.status}>
                  <span style={s.statusDot}></span> Online
                </span>
              </div>
            </div>
            <button style={s.closeBtn} onClick={() => setIsOpen(false)}>✕</button>
          </div>

          <div style={s.messages}>
            {messages.map((msg, idx) => (
              <div key={idx} style={msg.role === 'user' ? s.messageRowUser : s.messageRowBot}>
                <div style={{
                  ...s.bubble,
                  ...(msg.role === 'user' ? s.bubbleUser : 
                     msg.role === 'error' ? s.bubbleError : s.bubbleBot)
                }}>
                  {msg.content}
                </div>
              </div>
            ))}
            {loading && (
              <div style={s.messageRowBot}>
                <div style={{...s.bubble, ...s.bubbleBot, ...s.typing}}>
                  <span style={s.dot}></span>
                  <span style={s.dot}></span>
                  <span style={s.dot}></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {messages.length < 3 && (
            <div style={s.quickReplies}>
              {quickReplies.map((r, i) => (
                <button key={i} style={s.quickReplyBtn} onClick={() => {
                  setInput(r);
                  setTimeout(() => handleSubmit({preventDefault:()=>{}}), 100);
                }}>
                  {r}
                </button>
              ))}
            </div>
          )}

          <form style={s.inputArea} onSubmit={handleSubmit}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about our services..."
              maxLength={500}
              disabled={loading}
              style={s.input}
            />
            <button 
              type="submit" 
              disabled={loading || !input.trim()} 
              style={{
                ...s.sendBtn,
                ...(loading || !input.trim() ? s.sendBtnDisabled : {})
              }}
            >
              ➤
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default ChatWidget;