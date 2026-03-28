import React from 'react'
import '../../../styles/pages/profile/Support.css'
import { Bug, MessageCircle, PlayCircle, Search, LifeBuoy } from 'lucide-react'
import { PrimaryButton, OutlineButton } from '../../../components/buttons'

const SupportTab = () => (
  <div className="tab-grid support-grid full-width">
    <section className="premium-card help-hero-section">
      <div className="search-wrapper">
        <Search className="search-icon" size={20} />
        <input type="text" placeholder="Search for documentation, tutorials, or FAQs..." />
      </div>
    </section>
    <div className="support-actions-row">
      <section className="premium-card flex-1">
        <h3><LifeBuoy size={18} /> Direct Support</h3>
        <p className="support-desc">Get instant help from our AI agents or report a technical issue.</p>
        <div className="action-btns" style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
          <PrimaryButton><MessageCircle size={18} /> Live AI Assistant</PrimaryButton>
          <OutlineButton><Bug size={18} /> Bug Report</OutlineButton>
        </div>
      </section>
      <section className="premium-card flex-1">
        <h3><PlayCircle size={18} /> Learning Library</h3>
        <div className="tut-list">
          <div className="tut-item" style={{ cursor: 'pointer' }}><PlayCircle size={14} /> Mastering Voice Cloning</div>
          <div className="tut-item" style={{ cursor: 'pointer' }}><PlayCircle size={14} /> Advanced Sound FX</div>
          <div className="tut-item" style={{ cursor: 'pointer' }}><PlayCircle size={14} /> Visual Synthesis v2</div>
        </div>
      </section>
    </div>
  </div>
)

export default SupportTab

