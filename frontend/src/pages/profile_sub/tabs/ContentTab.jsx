import React, { useState } from 'react'
import { motion } from 'framer-motion'
import '../../../styles/pages/profile/Content.css'
import { AudioWaveform, Clapperboard, Heart, History, Music, PlayCircle, Star, TrendingUp, Video, Zap, Plus } from 'lucide-react'

const ContentTab = ({ projectsData, setToast }) => {
  const [portfolioFilter, setPortfolioFilter] = useState('all')
  const fallbackPortfolio = [
    { id: 1, title: 'Cinematic Voices', type: 'Voice', likes: 1240, plays: 3890, icon: <AudioWaveform size={32} />, color: '#06b6d4' },
    { id: 2, title: 'Electronic Dreams', type: 'Music', likes: 892, plays: 2156, icon: <Music size={32} />, color: '#22c55e' },
    { id: 3, title: 'Visual Sync', type: 'Video', likes: 654, plays: 1543, icon: <Video size={32} />, color: '#f59e0b' },
    { id: 4, title: 'AI Dubbing Pro', type: 'Tool', likes: 2145, plays: 5432, icon: <Clapperboard size={32} />, color: '#ec4899' }
  ]

  const portfolio = (projectsData && projectsData.length > 0)
    ? projectsData.slice(0, 8).map((item, i) => ({
      id: item.id || i,
      title: item.name || item.title || `Project ${i + 1}`,
      type: item.type || 'Project',
      status: item.status || (i % 3 === 0 ? 'pinned' : i % 3 === 1 ? 'draft' : 'archived'),
      likes: item.likes || 0,
      plays: item.plays || 0,
      icon: i % 2 === 0 ? <AudioWaveform size={32} /> : <Clapperboard size={32} />,
      color: i % 2 === 0 ? '#06b6d4' : '#22c55e'
    }))
    : fallbackPortfolio.map((item, i) => ({ ...item, status: i % 3 === 0 ? 'pinned' : i % 3 === 1 ? 'draft' : 'archived' }))

  const filteredPortfolio = portfolio.filter(item => portfolioFilter === 'all' ? true : item.status === portfolioFilter)

  const drafts = [
    { id: 1, name: 'Podcast Script v2.1', date: '2h ago', progress: 65 },
    { id: 2, name: 'Background Score - Final?', date: '5h ago', progress: 80 },
    { id: 3, name: 'Voice Clone Training Data', date: '1d ago', progress: 45 }
  ]

  const skills = [
    'Voice Synthesis', 'AI Audio', 'Music Production', 'Video Editing',
    'Machine Learning', 'API Integration', 'Full Stack', 'Cloud Deploy'
  ]

  return (
    <div className="tab-grid full-width">
      <motion.section className="premium-card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="section-head">
          <h3>Featured Portfolio</h3>
          <div className="portfolio-filter-row">
            <div className="pills-group">
              {['all', 'pinned', 'draft', 'archived'].map((filter) => (
                <button key={filter} className={`pill ${portfolioFilter === filter ? 'active' : ''}`} onClick={() => setPortfolioFilter(filter)}>
                  {filter}
                </button>
              ))}
            </div>
            <motion.button 
              className="new-btn" 
              whileHover={{ scale: 1.05 }}
              onClick={() => setToast?.('Preparing new project container...')}
            >
              <Plus size={16} /> New Project
            </motion.button>
          </div>
        </div>
        <div className="portfolio-grid">
          {filteredPortfolio.map((item, i) => (
            <motion.div key={item.id} className="portfolio-card premium-card" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.05 }} whileHover={{ y: -8, boxShadow: '0 20px 40px rgba(0,0,0,0.3)' }}>
              <div className="portfolio-header" style={{ borderTopColor: item.color }}>
                <div className="portfolio-icon" style={{ color: item.color, background: `${item.color}20` }}>{item.icon}</div>
                <span className="project-type">{item.type} · {item.status}</span>
              </div>
              <h4>{item.title}</h4>
              <div className="portfolio-stats">
                <div className="stat"><Heart size={14} /> {item.likes}</div>
                <div className="stat"><PlayCircle size={14} /> {item.plays}</div>
              </div>
              <div className="portfolio-actions">
                <button className="text-btn" aria-label="Pin project"><Star size={14} /> Pin</button>
                <button className="text-btn" aria-label="Move project up"><TrendingUp size={14} /> Move</button>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      <motion.section className="premium-card skills-section" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="section-head">
          <h3>Expertise & Skills</h3>
          <span className="sub">{skills.length} Skills</span>
        </div>
        <div className="skills-grid">
          {skills.map((skill, i) => (
            <motion.div key={i} className="skill-tag" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.03 }} whileHover={{ scale: 1.1 }}>
              {skill}
              <Zap size={12} />
            </motion.div>
          ))}
        </div>
      </motion.section>

      <div className="dual-split">
        <motion.section className="premium-card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <h3>Works in Progress</h3>
          <div className="draft-list">
            {drafts.map((draft, i) => (
              <motion.div key={draft.id} className="draft-row" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 + i * 0.05 }} whileHover={{ x: 4 }}>
                <div className="draft-info">
                  <History size={16} />
                  <div>
                    <span className="draft-name">{draft.name}</span>
                    <span className="draft-time">{draft.date}</span>
                  </div>
                </div>
                <div className="progress-container-mini" style={{ margin: '0 1rem' }}><div className="progress-fill-mini" style={{ width: `${draft.progress}%` }}></div></div>
                <span className="progress-text">{draft.progress}%</span>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section className="premium-card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
          <h3>Favorites & Collections</h3>
          <div className="fav-grid">
            {[
              { name: 'Dream Scape', count: 24 },
              { name: 'Minimal Bass', count: 18 },
              { name: 'Cinematic', count: 32 },
              { name: 'Experimental', count: 15 }
            ].map((fav, i) => (
              <motion.div key={i} className="fav-item" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.25 + i * 0.05 }} whileHover={{ scale: 1.05 }}>
                <Star size={16} />
                <span>{fav.name}</span>
                <div className="count-badge">{fav.count}</div>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </div>
    </div>
  )
}

export default ContentTab

