import React, { useState } from 'react'
import { Folder, Search, Filter, Plus, MoreHorizontal, Play, Check, Clock, Download, Share2, Layers, Bot, Zap, Globe, Sparkles } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import '../../styles/pages/avatar/Project.css'

const projects = [
  {
    id: 1,
    name: 'Q3 Sales Strategy Intro',
    status: 'completed',
    type: 'Video Agent',
    lastUsed: '2 hours ago',
    thumbnail: '#',
    credits: 120,
    duration: '03:45',
    color: '#6366f1'
  },
  {
    id: 2,
    name: 'New Employee Onboarding',
    status: 'processing',
    type: 'AI Studio',
    lastUsed: 'Just now',
    thumbnail: '#',
    credits: 80,
    progress: 75,
    color: '#10b981'
  },
  {
    id: 3,
    name: 'Product Feature Highlight',
    status: 'draft',
    type: 'Face Swap',
    lastUsed: 'Yesterday',
    thumbnail: '#',
    credits: 45,
    duration: '01:20',
    color: '#f59e0b'
  },
  {
    id: 4,
    name: 'Quarterly Update - FR',
    status: 'completed',
    type: 'Translate',
    lastUsed: '2 days ago',
    thumbnail: '#',
    credits: 200,
    duration: '10:00',
    color: '#ec4899'
  },
  {
    id: 5,
    name: 'Website Hero Promo',
    status: 'completed',
    type: 'AI Studio',
    lastUsed: '3 days ago',
    thumbnail: '#',
    credits: 50,
    duration: '00:30',
    color: '#a855f7'
  }
]

const categories = ['All', 'AI Studio', 'Translate', 'Face Swap', 'Video Agent']

const Project = () => {
  const [activeCategory, setActiveCategory] = useState('All')
  const [searchTerm, setSearchTerm] = useState('')

  const filteredProjects = projects.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = activeCategory === 'All' || p.type === activeCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="project-page">
      <div className="pj-header">
        <div className="pj-title">
          <h1><Folder size={32} /> Avatar Projects</h1>
          <p>Manage all your previous and active AI avatar video generations.</p>
        </div>
        <div className="pj-actions">
          <button className="pj-btn-primary btn btn-primary"><Plus size={18} /> New Video</button>
        </div>
      </div>

      <div className="pj-toolbar glass-card">
        <div className="pj-search">
          <Search size={18} />
          <input 
            type="text" 
            placeholder="Search projects..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="pj-filters">
          {categories.map(cat => (
            <button 
              key={cat} 
              className={`pj-filter-btn ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="pj-grid">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((p, idx) => (
            <motion.div
              layout
              key={p.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="pj-card premium-card"
            >
              <div className="pj-card-thumb" style={{ background: `linear-gradient(135deg, ${p.color}44, ${p.color}11)` }}>
                {p.status === 'processing' ? (
                  <div className="pj-processing">
                    <div className="pj-spinner" />
                    <span className="pj-prog-text">{p.progress}%</span>
                    <div className="pj-prog-bar"><div className="fill" style={{ width: `${p.progress}%` }}></div></div>
                  </div>
                ) : (
                  <div className="pj-play-overlay"><Play size={32} /></div>
                )}
                <div className={`pj-status-badge ${p.status}`}>{p.status}</div>
                {p.duration && <div className="pj-duration">{p.duration}</div>}
              </div>
              <div className="pj-card-info">
                <div className="pj-card-top">
                  <h3>{p.name}</h3>
                  <button className="pj-more-btn"><MoreHorizontal size={18} /></button>
                </div>
                <div className="pj-card-meta">
                  <span className="pj-type-tag"><Bot size={12} /> {p.type}</span>
                  <span className="pj-credit-tag"><Zap size={12} /> {p.credits} credits</span>
                </div>
                <div className="pj-card-footer">
                  <span className="pj-time"><Clock size={12} /> {p.lastUsed}</span>
                  <div className="pj-footer-btns">
                    <button className="pj-mini-btn" title="Share"><Share2 size={14} /></button>
                    <button className="pj-mini-btn" title="Download"><Download size={14} /></button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        <motion.div className="pj-card pj-new-card" whileHover={{ scale: 1.02 }}>
          <div className="pj-new-inner">
            <Plus size={32} />
            <h3>New Video</h3>
            <p>Ready to create your next masterpiece?</p>
            <button className="pj-btn-primary btn btn-primary">Choose Tool <ArrowRight size={14} /></button>
          </div>
        </motion.div>
      </div>

      {projects.find(p => p.status === 'processing') && (
        <div className="pj-active-banner glass-card">
          <div className="pj-ab-info">
            <div className="pj-ab-icon-wrap"><Bot size={24} className="icon-burn" /></div>
            <div>
              <strong>1 Video Processing</strong>
              <span>New Employee Onboarding · {projects.find(p => p.status === 'processing').progress}% complete</span>
            </div>
          </div>
          <button className="btn btn-secondary btn-sm">View Job Status</button>
        </div>
      )}
    </div>
  )
}

export default Project





