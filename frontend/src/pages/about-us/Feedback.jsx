import React, { useState } from 'react'
import { 
  Send, MessageSquare, Star, 
  ThumbsUp, ThumbsDown, Bug, 
  Sparkles, Lightbulb, ChevronRight,
  Plus
} from 'lucide-react'
import '../../styles/pages/about-us/Feedback.css'

const Feedback = () => {
  const [category, setCategory] = useState('Feature Request')
  const [sentiment, setSentiment] = useState(null)
  const [urgency, setUrgency] = useState('Medium')
  const [isSubmitted, setIsSubmitted] = useState(false)

  const categories = [
    { name: 'Feature Request', icon: <Lightbulb size={18} />, color: '#f59e0b' },
    { name: 'Bug Report', icon: <Bug size={18} />, color: '#ef4444' },
    { name: 'UI/UX Improvement', icon: <Sparkles size={18} />, color: '#8b5cf6' },
    { name: 'Praise', icon: <Star size={18} />, color: '#10b981' }
  ]

  return (
    <div className="feedback-container">
      <header className="feedback-header">
        <h1>Share Your Feedback</h1>
        <p>Help us shape the future of AI creativity. We read every message.</p>
      </header>

      <div className="feedback-form-wrapper premium-card">
        <div className="form-grid-layout">
          <div className="form-main-content">
            <section className="sentiment-section">
              <h3>How was your experience?</h3>
              <div className="sentiment-btns">
                <button 
                  className={`sentiment-btn bad ${sentiment === 'bad' ? 'active' : ''}`} 
                  onClick={() => setSentiment('bad')}
                  aria-label="Bad Experience"
                >
                  <ThumbsDown size={28} />
                </button>
                <button 
                  className={`sentiment-btn ok ${sentiment === 'ok' ? 'active' : ''}`} 
                  onClick={() => setSentiment('ok')}
                  aria-label="Okay Experience"
                >
                  <MessageSquare size={28} />
                </button>
                <button 
                  className={`sentiment-btn good ${sentiment === 'good' ? 'active' : ''}`} 
                  onClick={() => setSentiment('good')}
                  aria-label="Good Experience"
                >
                  <ThumbsUp size={28} />
                </button>
              </div>
            </section>

            <section className="category-section">
              <h3>Category</h3>
              <div className="category-chips">
                {categories.map(cat => (
                  <button 
                    key={cat.name} 
                    className={`cat-chip ${category === cat.name ? 'active' : ''}`}
                    onClick={() => setCategory(cat.name)}
                    style={{ '--cat-color': cat.color }}
                  >
                    {cat.icon} <span>{cat.name}</span>
                  </button>
                ))}
              </div>
            </section>

            <section className="message-section">
              <h3>Tell us more</h3>
              <textarea 
                placeholder="Describe your suggestion or report in detail..." 
                className="premium-textarea"
              />
            </section>
          </div>

          <aside className="form-sidebar-settings">
            <section className="urgency-section">
              <h3>Priority</h3>
              <div className="urgency-toggle glass-pill">
                {['Low', 'Medium', 'High'].map(level => (
                  <button 
                    key={level} 
                    className={urgency === level ? 'active' : ''} 
                    onClick={() => setUrgency(level)}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </section>

            <section className="contact-section">
              <h3>Follow-up Email</h3>
              <div className="email-input-box">
                <input type="email" placeholder="email@example.com" className="premium-input-aura" />
              </div>
            </section>

            <section className="attachment-section">
              <h3>Attachments</h3>
              <div className="upload-zone-aura">
                <Plus size={24} />
                <span>Add Screenshots</span>
              </div>
            </section>

            <div className="roadmap-card-aura">
              <Sparkles className="icon-spark" />
              <h4>Public Roadmap</h4>
              <p>Vote on features we're building next.</p>
              <button className="text-link-btn">View Roadmap <ChevronRight size={14}/></button>
            </div>
          </aside>
        </div>

        <div className="form-footer">
          <label className="checkbox-row">
            <input type="checkbox" defaultChecked />
            <span>Include system logs for debugging</span>
          </label>
          <button className="submit-btn" onClick={() => { setIsSubmitted(true); setTimeout(() => setIsSubmitted(false), 3000); }}>
            <span>{isSubmitted ? 'Message Sent!' : 'Send Feedback'}</span>
            <Send size={18} />
          </button>
        </div>
      </div>

      <footer className="feedback-stats">
         <div className="stat"><strong>1,245</strong> Active Community Requests</div>
         <div className="stat"><strong>4.8/5</strong> User Satisfaction Score</div>
      </footer>
    </div>
  )
}

export default Feedback




