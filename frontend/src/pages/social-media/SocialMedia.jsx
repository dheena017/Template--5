import React from 'react'
import { motion } from 'framer-motion'
import { Share2, TrendingUp, Users, Camera, Play, Globe } from 'lucide-react'
import '../../styles/pages/dashboards/Dashboard.css' // Reuse dashboard styles for consistency

const SocialMedia = () => {
  const platforms = [
    { name: 'YouTube', icon: <Play />, followers: '12.4k', trend: '+1.2k', color: '#ff0000' },
    { name: 'Instagram', icon: <Camera />, followers: '8.1k', trend: '+850', color: '#e1306c' },
    { name: 'Twitter', icon: <Share2 />, followers: '4.2k', trend: '+120', color: '#1da1f2' }
  ]

  return (
    <div className="dashboard-container">
      <header className="dash-header">
        <div className="welcome-section">
          <h1>Social Hub</h1>
          <p>Manage and track your cross-platform content metrics.</p>
        </div>
        <button className="premium-btn">
          <Share2 size={16} /> Publish Post
        </button>
      </header>

      <div className="section-group">
        <span className="group-label">Platforms</span>
        <div className="tool-cards-grid">
          {platforms.map(p => (
            <div key={p.name} className="tool-card">
              <div className="tool-icon-box" style={{ color: p.color }}>{p.icon}</div>
              <div className="tool-info">
                <h3>{p.name}</h3>
                <p>{p.followers} followers • <span style={{ color: '#10b981' }}>{p.trend}</span></p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <section className="data-table-section">
        <div className="table-header">
          <span>Recent Posts</span>
          <span>Engagement</span>
          <span>Status</span>
          <span>Date</span>
          <span>Platform</span>
        </div>
        <div className="table-body">
          <div className="table-row">
            <span className="row-name">How AI is changing music v1...</span>
            <span className="row-amount">12.4k views</span>
            <span className="row-state">Published</span>
            <span className="row-date">2h ago</span>
            <span className="row-tags">YouTube</span>
          </div>
          <div className="table-row">
            <span className="row-name">Studio Behind the Scenes</span>
            <span className="row-amount">2.1k likes</span>
            <span className="row-state">Processing</span>
            <span className="row-date">Recent</span>
            <span className="row-tags">Instagram</span>
          </div>
        </div>
      </section>
    </div>
  )
}

export default SocialMedia




