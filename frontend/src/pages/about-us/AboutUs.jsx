import React from 'react'
import { motion } from 'framer-motion'
import { Heart, Shield, Users, Activity, ExternalLink } from 'lucide-react'

const AboutUs = () => {
  return (
    <div className="dashboard-container">
      <header className="dash-header">
        <div className="welcome-section">
          <h1>About Us</h1>
          <p>Building the future of AI-powered creativity and content production.</p>
        </div>
      </header>

      <div className="section-group">
        <span className="group-label">Our Values</span>
        <div className="tool-cards-grid">
          <div className="tool-card">
            <div className="tool-icon-box" style={{ color: '#ef4444' }}><Heart /></div>
            <div className="tool-info">
              <h3>Human-Centric</h3>
              <p>AI that empowers people, not replaces them.</p>
            </div>
          </div>
          <div className="tool-card">
            <div className="tool-icon-box" style={{ color: '#10b981' }}><Shield /></div>
            <div className="tool-info">
              <h3>Ethical AI</h3>
              <p>Transparent and fair model training.</p>
            </div>
          </div>
        </div>
      </div>

      <section className="data-table-section" style={{ padding: '2.5rem' }}>
        <h2>Company History</h2>
        <div className="timeline-col" style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
           <div className="timeline-row" style={{ display: 'flex', gap: '1.5rem' }}>
              <strong style={{ minWidth: '80px' }}>2026</strong>
              <div>
                <h4 style={{ color: 'var(--text-primary)' }}>Series B Funding Complete</h4>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Closed $42M to expand the Generative AI infrastructure.</p>
              </div>
           </div>
           <div className="timeline-row" style={{ display: 'flex', gap: '1.5rem' }}>
              <strong style={{ minWidth: '80px' }}>2025</strong>
              <div>
                <h4 style={{ color: 'var(--text-primary)' }}>Production Launch</h4>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>First suite of tools released for the creative community.</p>
              </div>
           </div>
        </div>
      </section>
    </div>
  )
}

export default AboutUs





