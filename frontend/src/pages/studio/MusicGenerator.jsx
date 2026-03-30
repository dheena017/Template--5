import React, { useEffect, useState } from 'react'
import { 
  Music as MusicIcon, Sparkles, Play, Pause, 
  Download, Share2, Plus, Wand2,
  Volume2, Disc, Waves, Mic,
  ChevronRight, ArrowRight, Heart,
  Settings, Layers, Sliders, Search,
  Clock, Zap, Activity, Info
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { MUSIC_TRENDING, MUSIC_GENRES, MUSIC_MOODS, MUSIC_THEMES } from '../../constants/data'
import { logger } from '../../services/api'
import SearchBar from '../../components/common/SearchBar/SearchBar'
import '../../styles/pages/studio/MusicGenerator.css'


const MusicGenerator = () => {
  const [activeTab, setActiveTab] = useState('Explore') 
  const [isGenerating, setIsGenerating] = useState(false)

  useEffect(() => {
    logger.log('MUSIC_GEN', 'Component mounted')
  }, [])

  const tabs = ['Explore', 'Create', 'History', 'Finetunes']

  return (
    <div className="music-page dark-theme">
      <nav className="music-nav">
        <div className="nav-left">
          <h1>Music</h1>
          <div className="nav-tabs">
            {tabs.map(t => (
              <button 
                key={t} 
                className={activeTab === t ? 'active' : ''}
                onClick={() => setActiveTab(t)}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
        <div className="nav-right">
           <button className="feedback-btn">Feedback</button>
           <button className="docs-btn">Docs</button>
           <button className="ask-btn">Ask</button>
           <div className="user-mini-badge">
             <span>Dheena R</span>
             <div className="avatar">DR</div>
           </div>
        </div>
      </nav>

      <AnimatePresence mode="wait">
        {activeTab === 'Explore' ? (
          <motion.div 
            key="explore"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="explore-view"
          >
            <ExploreContent />
          </motion.div>
        ) : (
          <motion.div 
            key="others"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="empty-tab-view"
          >
             <div className="placeholder-msg">
               <MusicIcon size={48} opacity={0.2} />
               <p>{activeTab} view coming soon.</p>
             </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

const ExploreContent = () => {
  return (
    <div className="explore-container">
      <section className="explore-search">
        <SearchBar 
          placeholder="Search for music, genres, or moods..."
          onSearch={(val) => console.log('Search music:', val)}
          className="music-search-premium"
        />
      </section>


      <section className="explore-section">
        <div className="section-header">
           <h2>Trending</h2>
           <button className="text-btn">View All</button>
        </div>
        <div className="trending-grid">
          {MUSIC_TRENDING.map((t, i) => (
            <div key={i} className="music-card-premium">
              <div className="card-top">
                <button className="play-circle-btn"><Play size={20} fill="currentColor" /></button>
                <div className="track-main">
                  <h3>{t.title}</h3>
                  <p>{t.desc}</p>
                </div>
              </div>
              <div className="card-meta">
                <div className="meta-left">
                  <span><Clock size={12} /> {t.duration}</span>
                  <span><Activity size={12} /> {t.bpm}</span>
                </div>
                <div className="meta-right">
                   {t.tags.map(tag => <span key={tag} className="tag-pill">{tag}</span>)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="explore-section">
        <div className="section-header"><h2>Genres</h2></div>
        <div className="genres-fluid-grid">
           {MUSIC_GENRES.map(g => (
             <button key={g} className="genre-chip">
               <div className="chip-icon"><Disc size={14} /></div>
               {g}
             </button>
           ))}
        </div>
      </section>

      <section className="explore-section">
        <div className="section-header"><h2>Moods</h2></div>
        <div className="moods-row-scroll">
           {MUSIC_MOODS.map(m => (
             <div key={m} className="mood-box">
                <div className="mood-color-overlay"></div>
                <span>{m}</span>
             </div>
           ))}
        </div>
      </section>

      <section className="explore-section">
        <div className="section-header"><h2>Themes</h2></div>
        <div className="themes-grid">
           {MUSIC_THEMES.map(th => (
             <div key={th} className="theme-card">
                <div className="theme-img-placeholder"><MusicIcon size={24} opacity={0.1} /></div>
                <h4>{th}</h4>
             </div>
           ))}
        </div>
      </section>

      <div className="composition-update-banner">
        <span><Info size={16} /> Song composition has been updated. Generate to apply changes to your song.</span>
      </div>

      <div className="prompt-interaction-sticky">
         <div className="sticky-inner">
           <textarea placeholder="Generate a high-energy rock track with distorted guitars, powerful drums..." />
           <div className="sticky-actions">
              <div className="tokens-info"><Zap size={14} /> 900 credits/min</div>
              <button className="generate-sticky-btn">Generate</button>
           </div>
         </div>
      </div>
    </div>
  )
}

export default MusicGenerator





