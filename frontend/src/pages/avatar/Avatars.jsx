import React, { useState } from 'react'
import { Bot, Plus, Search, Star, Crown, Zap, Check, Sparkles, Filter } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import '../../styles/pages/avatar/Avatars.css'

const avatarData = [
  { id: 1, name: 'Alex', role: 'Business Professional', gender: 'Male', style: 'Formal', rating: 4.9, uses: '128k', pro: false, hue: '#6366f1' },
  { id: 2, name: 'Sofia', role: 'News Anchor', gender: 'Female', style: 'Formal', rating: 4.8, uses: '96k', pro: false, hue: '#ec4899' },
  { id: 3, name: 'Marcus', role: 'Tech Presenter', gender: 'Male', style: 'Casual', rating: 4.7, uses: '74k', pro: true, hue: '#10b981' },
  { id: 4, name: 'Zoe', role: 'Marketing Expert', gender: 'Female', style: 'Casual', rating: 4.9, uses: '112k', pro: true, hue: '#f59e0b' },
  { id: 5, name: 'Daniel', role: 'Healthcare Pro', gender: 'Male', style: 'Formal', rating: 4.6, uses: '55k', pro: false, hue: '#3b82f6' },
  { id: 6, name: 'Aria', role: 'Educator', gender: 'Female', style: 'Smart Casual', rating: 4.8, uses: '88k', pro: true, hue: '#a855f7' },
  { id: 7, name: 'James', role: 'Sales Coach', gender: 'Male', style: 'Smart Casual', rating: 4.5, uses: '43k', pro: false, hue: '#ef4444' },
  { id: 8, name: 'Nadia', role: 'Lifestyle Creator', gender: 'Female', style: 'Casual', rating: 4.7, uses: '67k', pro: true, hue: '#14b8a6' },
]

const tabs = ['All', 'Male', 'Female', 'Formal', 'Casual', 'Pro']

const Avatars = () => {
  const [activeTab, setActiveTab] = useState('All')
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState(null)

  const filtered = avatarData.filter(a => {
    const matchSearch = a.name.toLowerCase().includes(search.toLowerCase()) || a.role.toLowerCase().includes(search.toLowerCase())
    if (activeTab === 'All') return matchSearch
    if (activeTab === 'Pro') return matchSearch && a.pro
    return matchSearch && (a.gender === activeTab || a.style.includes(activeTab))
  })

  return (
    <div className="avatars-page">
      <div className="av-hero">
        <div className="av-hero-text">
          <h1><Bot size={28} /> Avatar Library</h1>
          <p>Choose from 120+ realistic AI avatars or create a custom digital twin</p>
        </div>
        <button className="av-create-btn">
          <Plus size={18} /> Create Custom Avatar
        </button>
      </div>

      <div className="av-toolbar">
        <div className="av-search glass-card">
          <Search size={16} />
          <input placeholder="Search avatars..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <div className="av-tabs">
          {tabs.map(tab => (
            <button key={tab} className={`av-tab ${activeTab === tab ? 'active' : ''}`} onClick={() => setActiveTab(tab)}>
              {tab === 'Pro' && <Crown size={12} />} {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="av-grid">
        <AnimatePresence>
          {filtered.map((avatar, i) => (
            <motion.div
              key={avatar.id}
              className={`av-card premium-card ${selected === avatar.id ? 'selected' : ''}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ delay: i * 0.04 }}
              whileHover={{ y: -6 }}
              onClick={() => setSelected(avatar.id === selected ? null : avatar.id)}
            >
              {avatar.pro && <div className="av-pro-badge"><Crown size={10} /> PRO</div>}
              {selected === avatar.id && <div className="av-selected-check"><Check size={14} /></div>}
              <div className="av-avatar-visual" style={{ background: `radial-gradient(circle at 30% 30%, ${avatar.hue}44, ${avatar.hue}11)`, borderColor: `${avatar.hue}33` }}>
                <Bot size={52} style={{ color: avatar.hue }} />
                <div className="av-glow" style={{ background: avatar.hue }} />
              </div>
              <div className="av-card-info">
                <h3>{avatar.name}</h3>
                <span className="av-role">{avatar.role}</span>
                <div className="av-meta">
                  <span><Star size={11} fill="currentColor" /> {avatar.rating}</span>
                  <span><Zap size={11} /> {avatar.uses} uses</span>
                </div>
              </div>
              <button className="av-use-btn" style={{ background: avatar.hue }}>Use Avatar</button>
            </motion.div>
          ))}
        </AnimatePresence>

        <motion.div className="av-card av-upload-card premium-card" whileHover={{ y: -6 }}>
          <div className="av-upload-inner">
            <div className="av-upload-icon"><Sparkles size={32} /></div>
            <h3>Custom Avatar</h3>
            <p>Upload your own photo or video to create a personal AI avatar</p>
            <button className="av-create-btn-sm">
              <Plus size={16} /> Create Now
            </button>
          </div>
        </motion.div>
      </div>

      {selected && (
        <div className="av-action-bar glass-card">
          <span>1 avatar selected — {avatarData.find(a => a.id === selected)?.name}</span>
          <div>
            <button className="av-ab-btn secondary">Preview</button>
            <button className="av-ab-btn primary"><Zap size={14} /> Use in New Video</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Avatars





