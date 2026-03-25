import React, { useEffect, useState } from 'react'
import { 
  Search, Filter, Plus, Play, MoreHorizontal, 
  Globe2, Star, Info, MessageSquare, BookOpen, 
  HelpCircle, ChevronRight, MousePointer2, 
  Mic, User, PlusCircle 
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { logger } from '../../services/api'
import '../../styles/pages/speech/Voices.css'

const Voices = () => {
  const [view, setView] = useState('explore') // 'explore' or 'my'

  useEffect(() => {
    logger.log('VOICES', 'Component mounted')
  }, [])

  const languages = [
    "Arabic", "Bulgarian", "Chinese", "Czech", "Danish", "Dutch", 
    "English", "Filipino", "Finnish", "French", "German", "Greek", 
    "Hindi", "Hungarian", "Indonesian", "Italian", "Japanese", 
    "Norwegian", "Polish", "Portuguese", "Romanian", "Russian", 
    "Slovak", "Spanish", "Swedish", "Turkish", "Ukrainian", "Vietnamese"
  ]

  const useCases = [
    { name: 'Eleven v3 Best', img: 'v3' },
    { name: 'Popular Tiktok', img: 'tk' },
    { name: 'Conversational', img: 'cv' },
    { name: 'Video Games', img: 'vg' },
    { name: 'Announcers', img: 'an' },
    { name: 'Romantic Story', img: 'rs' }
  ]

  return (
    <div className="voices-page">
      {/* Voices Sub-toolbar */}
      <div className="voices-toolbar">
        <div className="toolbar-nav">
          <span 
            className={view === 'explore' ? 'active' : ''} 
            onClick={() => setView('explore')}
          >
            Explore
          </span>
          <span 
            className={view === 'my' ? 'active' : ''} 
            onClick={() => setView('my')}
          >
            My Voices
          </span>
          <span>Feedback</span>
          <span>Docs</span>
          <span>Ask</span>
        </div>
        <div className="user-badge">
          <span>Dheena R</span>
          <div className="avatar small">DR</div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {view === 'explore' ? (
          <motion.div
            key="explore"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <ExploreView languages={languages} useCases={useCases} />
          </motion.div>
        ) : (
          <motion.div
            key="my"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <MyVoicesView />
          </motion.div>
        )}
      </AnimatePresence>

      <footer className="voices-footer">
        <p>© 2026 Text AI Research | All rights reserved.</p>
      </footer>
    </div>
  )
}

const ExploreView = ({ languages, useCases }) => (
  <>
    {/* Hero Search Section */}
    <section className="voices-hero">
      <div className="search-container">
        <div className="search-box">
          <Search className="search-icon" />
          <input type="text" placeholder="Search library voices..." />
          <button className="filter-btn"><Filter size={16} /> Filters</button>
        </div>
        <button className="create-voice-btn"><Plus size={18} /> Create Voice</button>
      </div>
    </section>

    {/* Legendary Section */}
    <section className="voices-section">
      <div className="section-header">
        <h2>Legendary voices for your projects</h2>
        <span className="learn-more">Learn more <ChevronRight size={14} /></span>
      </div>
      <div className="legendary-grid">
        {['Michael Caine', 'Burt Reynolds', 'James Dean', 'Judy Garland'].map(name => (
          <div key={name} className="voice-card horizontal">
            <div className="voice-avatar"><Star size={20} /></div>
            <div className="voice-info">
              <h3>{name}</h3>
              <p>Hollywood Icon • Cinematic</p>
            </div>
            <button className="play-btn"><Play size={16} /></button>
          </div>
        ))}
      </div>
    </section>

    {/* Use Case Row */}
    <section className="voices-section">
      <div className="section-header"><h2>Handpicked for your use case</h2></div>
      <div className="scroll-row">
        {useCases.map(uc => (
          <div key={uc.name} className="use-case-card">
            <div className="card-image-placeholder"></div>
            <span>{uc.name}</span>
          </div>
        ))}
      </div>
    </section>

    {/* Weekly Spotlight */}
    <section className="voices-section">
      <div className="section-header"><h2>Weekly Spotlight</h2></div>
      <div className="scroll-row">
        {['Character Voices', 'Relaxing & Meditative', 'Epic Narrators'].map(title => (
           <div key={title} className="use-case-card wide">
             <div className="card-image-placeholder spotlight"></div>
             <span>{title}</span>
           </div>
        ))}
      </div>
    </section>

    {/* Languages Grid */}
    <section className="voices-section">
      <div className="section-header"><h2>Curated language collections</h2></div>
      <div className="languages-grid">
        {languages.map(lang => (
          <div key={lang} className="lang-card">
            <span className="lang-name">{lang}</span>
            <span className="top-pick">Top picks <ChevronRight size={12} /></span>
          </div>
        ))}
      </div>
    </section>

    {/* Bulk Action Promo */}
    <div className="bulk-promo">
      <div className="promo-inner">
        <MousePointer2 size={24} className="promo-icon" />
        <div className="promo-text">
          <h3>Did you know you can do bulk actions?</h3>
          <p>Start selecting multiple voices with Shift + Click to perform bulk actions to those voices!</p>
        </div>
      </div>
    </div>
  </>
)

const MyVoicesView = () => (
  <div className="my-voices-container">
    {/* Page Header */}
    <header className="library-header">
      <div className="title-row">
        <h1>My Voices</h1>
      </div>
      <div className="search-container small">
        <div className="search-box">
          <Search className="search-icon" size={18} />
          <input type="text" placeholder="Search My Voices..." />
        </div>
        <button className="create-voice-btn small"><Plus size={16} /> Create Voice</button>
      </div>
    </header>

    {/* Empty State */}
    <div className="empty-state-card premium-card">
      <div className="empty-inner">
        <div className="empty-icon-ring">
          <Mic size={48} className="mic-icon" />
          <PlusCircle size={20} className="add-badge" />
        </div>
        <h2>No voice found</h2>
        <p>Add some from the library or create a new voice from scratch using your own samples.</p>
        <div className="empty-actions">
          <button className="primary-action-btn">Create a voice</button>
          <button className="secondary-action-btn">Go to library</button>
        </div>
      </div>
    </div>
  </div>
)

export default Voices





