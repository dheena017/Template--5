import React, { useState } from 'react'
import { 
  Send, MessageSquare, Star, 
  ThumbsUp, ThumbsDown, Bug, 
  Sparkles, Lightbulb, ChevronRight
} from 'lucide-react'
import '../../styles/pages/about-us/Feedback.css'

const Feedback = () => {
  const [sentiment, setSentiment] = useState(null)

  const categories = [
    { name: 'Feature Request', icon: <Lightbulb size={18} /> },
    { name: 'Bug Report', icon: <Bug size={18} /> },
    { name: 'UI/UX Improvement', icon: <Sparkles size={18} /> },
    { name: 'Praise', icon: <Star size={18} /> }
  ]

  return (
    <div className="feedback-container">
      <header className="feedback-header">
        <h1>Share Your Feedback</h1>
        <p>Help us shape the future of AI creativity. We read every message.</p>
      </header>

      <div className="feedback-form-wrapper premium-card">
        <section className="sentiment-section">
          <h3>How was your experience?</h3>
          <div className="sentiment-btns">
             <button className={sentiment === 'bad' ? 'active' : ''} onClick={() => setSentiment('bad')}><ThumbsDown size={24} /></button>
             <button className={sentiment === 'ok' ? 'active' : ''} onClick={() => setSentiment('ok')}><MessageSquare size={24} /></button>
             <button className={sentiment === 'good' ? 'active' : ''} onClick={() => setSentiment('good')}><ThumbsUp size={24} /></button>
          </div>
        </section>

        <section className="category-section">
          <h3>Category</h3>
          <div className="category-chips">
            {categories.map(cat => (
              <button key={cat.name} className="cat-chip">
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

        <div className="form-footer">
          <label className="checkbox-row">
            <input type="checkbox" defaultChecked />
            <span>Include system logs for debugging</span>
          </label>
          <button className="submit-btn">
            <span>Send Feedback</span>
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




