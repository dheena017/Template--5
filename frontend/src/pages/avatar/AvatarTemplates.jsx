import React, { useState } from 'react'
import { LayoutGrid, Search, Star, Zap, Crown, Filter, Play } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import '../../styles/pages/avatar/AvatarTemplates.css'

const templates = [
  { id: 1, title: 'Product Launch', category: 'Marketing', duration: '60s', style: 'Corporate', rating: 4.9, uses: '34k', pro: false, color: '#6366f1' },
  { id: 2, title: 'Company Welcome', category: 'HR', duration: '90s', style: 'Formal', rating: 4.8, uses: '22k', pro: false, color: '#10b981' },
  { id: 3, title: 'Sales Pitch', category: 'Sales', duration: '45s', style: 'Dynamic', rating: 4.9, uses: '67k', pro: true, color: '#f59e0b' },
  { id: 4, title: 'Tutorial Explainer', category: 'Education', duration: '3min', style: 'Casual', rating: 4.7, uses: '18k', pro: false, color: '#ec4899' },
  { id: 5, title: 'Social Media Short', category: 'Social', duration: '30s', style: 'Minimal', rating: 4.8, uses: '89k', pro: true, color: '#a855f7' },
  { id: 6, title: 'News Update', category: 'Media', duration: '2min', style: 'Studio', rating: 4.6, uses: '12k', pro: true, color: '#3b82f6' },
  { id: 7, title: 'Onboarding Flow', category: 'HR', duration: '5min', style: 'Formal', rating: 4.7, uses: '9k', pro: false, color: '#ef4444' },
  { id: 8, title: 'Brand Story', category: 'Marketing', duration: '90s', style: 'Cinematic', rating: 4.9, uses: '41k', pro: true, color: '#14b8a6' },
]

const categories = ['All', 'Marketing', 'HR', 'Sales', 'Education', 'Social', 'Media']

const AvatarTemplates = () => {
  const [activeCategory, setActiveCategory] = useState('All')
  const [search, setSearch] = useState('')
  const [hoveredId, setHoveredId] = useState(null)

  const filtered = templates.filter(t => {
    const matchSearch = t.title.toLowerCase().includes(search.toLowerCase())
    return matchSearch && (activeCategory === 'All' || t.category === activeCategory)
  })

  return (
    <div className="avatar-templates-page">
      <div className="at-hero">
        <div>
          <h1><LayoutGrid size={28} /> Avatar Templates</h1>
          <p>Launch your video in seconds with professionally crafted templates</p>
        </div>
      </div>

      <div className="at-toolbar">
        <div className="at-search glass-card">
          <Search size={16} />
          <input placeholder="Search templates..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <div className="at-cats">
          {categories.map(cat => (
            <button key={cat} className={`at-cat ${activeCategory === cat ? 'active' : ''}`} onClick={() => setActiveCategory(cat)}>
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="at-grid">
        <AnimatePresence>
          {filtered.map((tmpl, i) => (
            <motion.div
              key={tmpl.id}
              className="at-card premium-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ y: -6 }}
              onHoverStart={() => setHoveredId(tmpl.id)}
              onHoverEnd={() => setHoveredId(null)}
            >
              {tmpl.pro && <div className="at-pro-badge"><Crown size={10} /> PRO</div>}
              <div className="at-thumb" style={{ background: `linear-gradient(135deg, ${tmpl.color}44, ${tmpl.color}11)`, borderBottom: `1px solid ${tmpl.color}33` }}>
                <Play size={32} style={{ color: tmpl.color, opacity: hoveredId === tmpl.id ? 1 : 0.5 }} />
                <div className="at-duration">{tmpl.duration}</div>
              </div>
              <div className="at-info">
                <div className="at-info-top">
                  <h3>{tmpl.title}</h3>
                  <span className="at-category-pill">{tmpl.category}</span>
                </div>
                <div className="at-meta">
                  <span><Star size={11} fill="currentColor" /> {tmpl.rating}</span>
                  <span><Zap size={11} /> {tmpl.uses} uses</span>
                  <span>{tmpl.style}</span>
                </div>
              </div>
              <div className="at-actions">
                <button className="at-preview-btn">Preview</button>
                <button className="at-use-btn" style={{ background: tmpl.color }}>Use Template</button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default AvatarTemplates





