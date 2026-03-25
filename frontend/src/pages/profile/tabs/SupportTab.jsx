import React from 'react'
import { Bug, MessageCircle, PlayCircle, Search } from 'lucide-react'

const SupportTab = () => (
  <div className="tab-grid support-grid full-width">
    <section className="premium-card help-hero-section">
      <Search className="search-icon" size={24} />
      <input type="text" placeholder="Search for documentation, tutorials, or FAQs..." />
    </section>
    <div className="support-actions-row">
      <section className="premium-card flex-1">
        <h3>Direct Support</h3>
        <div className="action-btns">
          <button><MessageCircle size={18} /> Live AI Assistant</button>
          <button><Bug size={18} /> Bug Report</button>
        </div>
      </section>
      <section className="premium-card flex-1">
        <h3>Learning Library</h3>
        <div className="tut-list">
          <div className="tut-item"><PlayCircle size={14} /> Mastering Voice Cloning</div>
          <div className="tut-item"><PlayCircle size={14} /> Advanced Sound FX</div>
        </div>
      </section>
    </div>
  </div>
)

export default SupportTab

