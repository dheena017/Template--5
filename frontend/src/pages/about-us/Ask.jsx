import React, { useState } from 'react'
import { 
  Send, User, Sparkles, Plus, 
  Search, MessageSquare, History,
  Trash2, MoreHorizontal, HelpCircle,
  Play, BookOpen, Bug, ExternalLink
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import '../../styles/pages/about-us/Ask.css'

const Ask = () => {
  const [messages, setMessages] = useState([
    { role: 'assistant', text: 'Hello! I am your AI Assistant. How can I help you with the TextAI platform today?' }
  ])
  const [input, setInput] = useState('')

  const quickAsks = [
    { label: 'Cloud Storage Limit?', icon: <History size={14} /> },
    { label: 'Voice Cloning Steps', icon: <Sparkles size={14} /> },
    { label: 'API Key Access', icon: <HelpCircle size={14} /> }
  ]

  const sendMessage = () => {
    if (!input.trim()) return
    const newMessages = [...messages, { role: 'user', text: input }]
    setMessages(newMessages)
    setInput('')
    
    // Simulating AI response
    setTimeout(() => {
      setMessages(prev => [...prev, { role: 'assistant', text: "I've analyzed your request. Based on our docs, the specific feature you're looking for is currently in Beta. Would you like a tutorial link?" }])
    }, 1000)
  }

  return (
    <div className="ask-container">
      {/* Sidebar: Chat History */}
      <aside className="ask-sidebar premium-card">
         <div className="sidebar-head">
            <button className="new-chat-btn"><Plus size={16} /> New Chat</button>
         </div>
         <div className="history-list">
            <label>Today</label>
            {['API Rate Limits', 'Custom Voice Issue'].map(t => (
              <div key={t} className="history-item"><MessageSquare size={14} /> {t}</div>
            ))}
         </div>
         <div className="sidebar-footer">
            <div className="user-mini-profile">
               <div className="avatar small">DH</div>
               <div className="info"><span>Dheena R</span> <p>Pro Plan</p></div>
               <Settings size={14} />
            </div>
         </div>
      </aside>

      {/* Main Chat Area */}
      <main className="ask-main">
        <header className="ask-header">
           <h1>Ask AI Assistant</h1>
           <div className="help-switches">
              <span>Developer FAQ</span>
              <div className="switch"><div className="knob"></div></div>
           </div>
        </header>

        <div className="chat-canvas">
          <AnimatePresence>
            {messages.map((m, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`message-row ${m.role}`}
              >
                <div className="message-bubble premium-card">
                   <div className="bubble-icon">
                      {m.role === 'assistant' ? <Sparkles size={16} /> : <User size={16} />}
                   </div>
                   <div className="text">{m.text}</div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <footer className="ask-footer">
          <div className="quick-asks">
             {quickAsks.map(qa => <button key={qa.label}>{qa.icon} {qa.label}</button>)}
          </div>
          <div className="chat-input-wrapper">
             <input 
               type="text" 
               placeholder="Ask me anything about TextAI..." 
               value={input}
               onChange={(e) => setInput(e.target.value)}
               onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
             />
             <button className="send-btn" onClick={sendMessage}><Send size={18} /></button>
          </div>
        </footer>
      </main>

      {/* Right Rail: Context & Resources */}
      <aside className="ask-context side-col">
         <section className="context-box premium-card">
            <h3>Related Docs</h3>
            <div className="doc-list">
               <div className="doc-link">Introduction <ExternalLink size={12} /></div>
               <div className="doc-link">Cloning FAQ <ExternalLink size={12} /></div>
            </div>
         </section>
         <section className="context-box premium-card">
            <h3>Community Solutions</h3>
            <p>3 users had similar questions.</p>
            <button className="view-solutions-btn">View Solutions</button>
         </section>
      </aside>
    </div>
  )
}

const Settings = ({ size }) => <HelpCircle size={size} /> // Alias

export default Ask




