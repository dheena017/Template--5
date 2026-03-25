import React, { useEffect, useState } from 'react'
import { 
  Search, Filter, Plus, Play, MoreHorizontal, 
  Globe2, Star, Info, MessageSquare, BookOpen, 
  HelpCircle, ChevronRight, MousePointer2, 
  FileCode, History, Compass, LayoutGrid,
  Video, Music, Mic, Zap, Layers, Sparkles
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { logger } from '../../services/api'
import '../../styles/pages/files/Templates.css'

const Templates = () => {
  const [view, setView] = useState('explore') // 'explore' or 'history'

  useEffect(() => {
    logger.log('TEMPLATES', 'Component mounted')
  }, [])

  const categories = [
    { name: 'Video Content', icon: <Video size={18} />, count: 24 },
    { name: 'Audio Production', icon: <Music size={18} />, count: 18 },
    { name: 'Voice Synthesis', icon: <Mic size={18} />, count: 12 },
    { name: 'Social Media', icon: <Sparkles size={18} />, count: 30 },
    { name: 'Professional', icon: <FileCode size={18} />, count: 8 }
  ]

  const featuredTemplates = [
    { name: 'Cinematic Movie Trailer', category: 'Video', designer: 'TextAI Team', rating: 4.9 },
    { name: 'Podcast Intro Glow', category: 'Audio', designer: 'Sarah P.', rating: 4.8 },
    { name: 'Documentary Narrator', category: 'Voice', designer: 'James M.', rating: 5.0 },
    { name: 'Fast-Cut Tiktok', category: 'Social', designer: 'Alex V.', rating: 4.7 }
  ]

  return (
    <div className="templates-page">
      {/* Templates Header */}
      <header className="templates-header">
        <div className="header-left">
          <h1>Templates <span className="beta-badge">Beta</span></h1>
        </div>
        <div className="header-nav">
          <button 
            className={view === 'explore' ? 'active' : ''} 
            onClick={() => setView('explore')}
          >
            <Compass size={18} /> Explore
          </button>
          <button 
            className={view === 'history' ? 'active' : ''} 
            onClick={() => setView('history')}
          >
            <History size={18} /> History
          </button>
        </div>
      </header>

      <AnimatePresence mode="wait">
        {view === 'explore' ? (
          <motion.div
            key="explore"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <section className="search-section">
              <div className="search-bar">
                <Search className="search-icon" />
                <input type="text" placeholder="Search templates (e.g. 'YouTube', 'Professional')..." />
                <button className="filter-btn"><Filter size={16} /> Filters</button>
              </div>
            </section>

            <section className="category-scroll">
              {categories.map(cat => (
                <div key={cat.name} className="cat-pill">
                  {cat.icon}
                  <span>{cat.name} ({cat.count})</span>
                </div>
              ))}
            </section>

            <section className="templates-grid">
              <div className="section-title"><h2>Featured Templates</h2></div>
              <div className="grid-container">
                {featuredTemplates.map(tmp => (
                  <div key={tmp.name} className="template-card premium-card">
                    <div className="card-preview">
                       <FileCode size={40} className="preview-icon" />
                    </div>
                    <div className="card-info">
                      <span className="type-tag">{tmp.category}</span>
                      <h3>{tmp.name}</h3>
                      <div className="meta">
                        <span>by {tmp.designer}</span>
                        <div className="rating"><Star size={12} fill="currentColor" /> {tmp.rating}</div>
                      </div>
                    </div>
                    <button className="use-btn"><Zap size={14} /> Use Template</button>
                  </div>
                ))}
              </div>
            </section>
          </motion.div>
        ) : (
          <motion.div
            key="history"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <div className="empty-history-view">
              <div className="empty-ring"><History size={40} /></div>
              <h2>No history yet</h2>
              <p>Once you start using templates, your recent creations will appear here for quick access and rollbacks.</p>
              <button className="primary-btn" onClick={() => setView('explore')}>Go to Explore</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Templates





