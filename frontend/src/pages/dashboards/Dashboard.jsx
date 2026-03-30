import React from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Film,
  Palette,
  Bot,
  Mic,
  FileText,
  Clapperboard,
  Library,
  Sparkles,
  Terminal,
  Share2,
  Info,
  HardDrive,
  ArrowUpRight,
  Combine,
  Zap,
  Plus,
  Search,
  CheckCircle,
  Clock
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import '../../styles/pages/dashboards/DashboardIndex.css'
import { PrimaryButton } from '../../components/buttons'
import SearchBar from '../../components/common/SearchBar/SearchBar'


const FEATURED_TOOLS = [
  {
    title: 'Merge PDF',
    description: 'Combine multiple PDF files into one.',
    path: '/merge',
    icon: Combine,
    color: '#ef4444',
    suite: 'Document Intelligence'
  },
  {
    title: 'Text to Speech',
    description: 'Convert any text into natural sounding voices.',
    path: '/text-to-speech',
    icon: Mic,
    color: '#f59e0b',
    suite: 'Voice & Audio'
  },
  {
    title: 'Image Creator',
    description: 'Generate stunning AI images from text prompts.',
    path: '/image-generator',
    icon: Palette,
    color: '#db2777',
    suite: 'Visual Arts'
  }
]

const TOOL_SUITES = [
  {
    id: 'docs',
    title: 'Document Intelligence',
    icon: FileText,
    color: '#ec4899',
    tools: [
      { id: 'pdf-dashboard', label: 'PDF Master Dashboard', path: '/pdf-dashboard', color: '#ec4899' },
      { id: 'merge', label: 'Merge Documents', path: '/merge', color: '#ef4444' },
      { id: 'split', label: 'Split PDF', path: '/split', color: '#ff5252' },
      { id: 'organize-pdf', label: 'Organize Pages', path: '/organize-pdf', color: '#42a5f5' },
    ]
  },
  {
    id: 'media',
    title: 'Creative Studio',
    icon: Clapperboard,
    color: '#7c3aed',
    tools: [
      { id: 'artists-home', label: 'Studio Dashboard', path: '/artists-home', color: '#7c3aed' },
      { id: 'video-dashboard', label: 'Video Production', path: '/video-dashboard', color: '#ef4444' },
      { id: 'image-dashboard', label: 'Image Studio', path: '/image-dashboard', color: '#db2777' },
      { id: 'avatar-dashboard', label: 'Avatar Lab', path: '/avatar-dashboard', color: '#2563eb' },
    ]
  },
  {
    id: 'voice',
    title: 'Voice & Speech',
    icon: Mic,
    color: '#f59e0b',
    tools: [
      { id: 'speech-dashboard', label: 'Audio Dashboard', path: '/speech-dashboard', color: '#f59e0b' },
      { id: 'text-to-speech', label: 'AI Voiceover', path: '/text-to-speech', color: '#f59e0b' },
      { id: 'voice-changer', label: 'Voice Changer', path: '/voice-changer', color: '#f59e0b' },
      { id: 'podcast-creator', label: 'Podcast Lab', path: '/podcast-creator', color: '#f59e0b' },
    ]
  },
  {
    id: 'intelligence',
    title: 'Smart Intelligence',
    icon: Bot,
    color: '#10b981',
    tools: [
      { id: 'text-dashboard', label: 'Text Hub', path: '/text-dashboard', color: '#10b981' },
      { id: 'translate', label: 'Translation', path: '/translate', color: '#10b981' },
      { id: 'summarize', label: 'AI Summarizer', path: '/summarize', color: '#10b981' },
    ]
  },
  {
    id: 'system',
    title: 'System & Cloud',
    icon: HardDrive,
    color: '#64748b',
    tools: [
      { id: 'files', label: 'Library & Assets', path: '/files', color: '#64748b' },
      { id: 'dev-dashboard', label: 'Developer Console', path: '/dev-dashboard', color: '#475569' },
      { id: 'analytics', label: 'Usage Insights', path: '/analytics', color: '#8b5cf6' },
      { id: 'settings/general', label: 'Account Settings', path: '/settings/general', color: '#f59e0b' },
    ]
  }
]

const FEATURE_TAGS = ['PDF', 'Video', 'Voice', 'Avatar', 'Transcription', 'API']

const TURBO_RECIPES = [
  { id: 'recipe-1', label: 'Scan + OCR + Translate', desc: 'Universal document digitizer', colors: ['#10b981', '#7c3aed'], icon: Zap },
  { id: 'recipe-2', label: 'Merge + Optimize + Sign', desc: 'Pro contract production', colors: ['#ef4444', '#f59e0b'], icon: Plus },
  { id: 'recipe-3', label: 'Text → Voice → Canvas', desc: 'Creative b-roll generator', colors: ['#3b82f6', '#db2777'], icon: Sparkles }
]

const Dashboard = () => {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = React.useState('')
  const [activeCategory, setActiveCategory] = React.useState('all')
  const [hoveredTool, setHoveredTool] = React.useState(null)

  const allTools = React.useMemo(() => {
    const list = []
    TOOL_SUITES.forEach(suite => {
      suite.tools.forEach(tool => {
        list.push({ ...tool, suiteId: suite.id, suiteName: suite.title, suiteIcon: suite.icon })
      })
    })
    return list
  }, [])

  const filteredTools = allTools.filter(tool => {
    const matchesSearch = tool.label.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          tool.suiteName.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = activeCategory === 'all' || tool.suiteId === activeCategory
    return matchesSearch && matchesCategory
  })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.05 } 
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 10 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } }
  }

  return (
    <motion.section 
      className="aura-portal-shell"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="portal-glow"></div>
      
      <div className="portal-content-container">
        <motion.header className="portal-hero-section" variants={itemVariants}>
          <div className="hero-top">
            <motion.div 
              className="aura-chip"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Sparkles size={14} /> System v2.4 Active
            </motion.div>
            <h1>What can we <span className="text-gradient">automate</span> for you?</h1>
          </div>

          <div className="universal-search-hub">
            <SearchBar 
              placeholder="Search organization tool..."
              onSearch={(val) => setSearchQuery(val)}
              className="dashboard-search-premium"
            />
            
            <div className="portal-filter-rail">

              <button 
                className={`filter-pill ${activeCategory === 'all' ? 'active' : ''}`}
                onClick={() => setActiveCategory('all')}
              >
                All Tools
              </button>
              {TOOL_SUITES.map(suite => (
                <button 
                  key={suite.id}
                  className={`filter-pill ${activeCategory === suite.id ? 'active' : ''}`}
                  onClick={() => setActiveCategory(suite.id)}
                >
                  {suite.title.split(' ')[0]}
                </button>
              ))}
            </div>
          </div>
        </motion.header>

        <motion.div className="quick-resume-workspace" variants={itemVariants}>
          <div className="resume-header">
            <div className="flex items-center gap-3">
              <Clock size={16} className="text-secondary" />
              <span className="text-xs uppercase font-black tracking-widest text-slate-500">Quick Resume</span>
            </div>
            <div className="resume-divider"></div>
          </div>
          
          <div className="resume-grid">
             {[
               { id: 'merge', label: 'Merge Documents', path: '/merge', icon: Combine, color: '#ef4444', lastUsed: '2m ago', config: '4 Files' },
               { id: 'image', label: 'Image Studio', path: '/image-dashboard', icon: Palette, color: '#db2777', lastUsed: '15m ago', config: 'Flux 1.1 Pro' },
               { id: 'pdf-dashboard', label: 'PDF Master', path: '/pdf-dashboard', icon: FileText, color: '#ec4899', lastUsed: '1h ago', config: 'Active System' }
             ].map(tool => (
               <motion.button 
                 key={tool.id} 
                 className="resume-pill-card"
                 whileHover={{ x: 5, backgroundColor: 'rgba(255,255,255,0.05)' }}
                 onClick={() => navigate(tool.path)}
               >
                 <div className="pill-icon" style={{ backgroundColor: `${tool.color}15`, color: tool.color }}>
                   <tool.icon size={20} />
                 </div>
                 <div className="pill-content">
                    <span className="pill-title">{tool.label}</span>
                    <span className="pill-meta">{tool.config} • {tool.lastUsed}</span>
                 </div>
                 <ArrowUpRight size={14} className="pill-arrow" />
               </motion.button>
             ))}
          </div>
        </motion.div>

          <motion.div className="turbo-recipes-workspace" variants={itemVariants}>
            <div className="turbo-recipes-header" style={{ marginBottom: '1.5rem', textAlign: 'left' }}>
              <div className="flex items-center gap-3 mb-2">
               <Zap size={20} className="text-secondary" />
               <span className="text-xs uppercase font-black tracking-widest text-slate-500" style={{ fontSize: '1.1rem', letterSpacing: '2px' }}>TURBO RECIPES</span>
              </div>
              <div className="turbo-recipes-subtitle" style={{ marginLeft: '2.2rem', marginTop: '0.2rem', color: 'var(--text-muted)', fontWeight: 600, fontSize: '1rem' }}>
               Scan + OCR + Translate
              </div>
            </div>
            <div className="recipe-grid">
              {TURBO_RECIPES.map(recipe => (
                <motion.button 
                  key={recipe.id}
                  className="recipe-card-aura"
                  whileHover={{ y: -5, scale: 1.02 }}
                  onClick={() => navigate('/orchestrator')}
                >
                  <div className="recipe-icon-stack">
                     <recipe.icon size={24} style={{ color: recipe.colors[0] }} />
                     <div className="recipe-icon-glow" style={{ background: recipe.colors[0] }}></div>
                  </div>
                  <div className="recipe-info">
                     <span className="recipe-title">{recipe.label}</span>
                     <p className="recipe-desc">{recipe.desc}</p>
                  </div>
                  <div className="recipe-badge">Fast</div>
                </motion.button>
              ))}
           </div>
        </motion.div>

        {/* Render section headers as <h3> for each suite */}
        {TOOL_SUITES.filter(suite => filteredTools.some(tool => tool.suiteId === suite.id)).map(suite => (
          <React.Fragment key={suite.id}>
            <h3 style={{
              margin: '2.5rem 0 1.2rem 0',
              fontSize: '1.1rem',
              fontWeight: 900,
              textTransform: 'uppercase',
              letterSpacing: '2px',
              color: '#a78bfa',
              display: 'flex',
              alignItems: 'center',
              gap: '0.6rem',
            }}>
              <suite.icon size={20} style={{ color: suite.color }} />
              {suite.title}
            </h3>
            <motion.div className="portal-tools-main-grid" variants={containerVariants}>
              <AnimatePresence mode="popLayout">
                {filteredTools.filter(tool => tool.suiteId === suite.id).map((tool) => {
                  const SuiteIcon = tool.suiteIcon
                  return (
                    <motion.div
                      layout
                      key={tool.id}
                      className="portal-tool-card aura-card-premium"
                      variants={itemVariants}
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                      onClick={() => navigate(tool.path)}
                      onMouseEnter={() => setHoveredTool(tool.id)}
                      onMouseLeave={() => setHoveredTool(null)}
                      whileHover={{ y: -5, boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.6)' }}
                      style={{ cursor: 'pointer' }}
                    >
                      {hoveredTool === tool.id && (
                        <motion.div 
                          className="live-signal-overlay"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                        >
                          <SuiteIcon size={80} strokeWidth={0.5} style={{ color: tool.color }} />
                        </motion.div>
                      )}
                      <div className="tool-card-top">
                        <div className="tool-suite-info">
                          <div className="suite-icon-mini" style={{ color: tool.color }}>
                            <SuiteIcon size={14} />
                          </div>
                          <span className="suite-name-tag">{tool.suiteName}</span>
                        </div>
                        <div className="tool-action-indicator">
                          <ArrowUpRight size={14} />
                        </div>
                      </div>
                      <div className="tool-card-body">
                        <h4 style={{marginBottom: '0.25rem'}}>{tool.label}</h4>
                        <div className="tool-card-footer">
                          <div className="tool-status-dot" style={{ backgroundColor: tool.color, width: 10, height: 10, border: '2px solid #fff', boxShadow: '0 0 0 2px #18181b' }}></div>
                          <span className="tool-ready-text">Ready to use</span>
                        </div>
                        <div className="card-launch-aura">
                            <PrimaryButton 
                                className="w-full launch-btn-premium"
                                size="md"
                                style={{ backgroundColor: '#7c3aed', color: '#fff', borderRadius: '100px', fontWeight: '800', border: 'none', boxShadow: '0 10px 20px rgba(124, 58, 237, 0.3)' }}
                            >
                                Open Tool
                            </PrimaryButton>
                        </div>
                      </div>
                      <div className="card-hover-bg" style={{ background: `radial-gradient(circle at top right, ${tool.color}15, transparent)` }}></div>
                    </motion.div>
                  )
                })}
              </AnimatePresence>
            </motion.div>
          </React.Fragment>
        ))}

        {filteredTools.length === 0 && (
          <motion.div className="portal-empty-state" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="empty-icon"><Info size={48} /></div>
            <h3>No tools match your search</h3>
            <p>Try searching for core terms like "PDF", "Video", or "Text".</p>
            <button onClick={() => { setSearchQuery(''); setActiveCategory('all') }}>View All Tools</button>
          </motion.div>
        )}
      </div>

      <motion.footer className="portal-quick-info" variants={itemVariants}>
        <div className="quick-stat">
          <span className="stat-label">System Load</span>
          <div className="stat-bar"><div className="stat-fill" style={{ width: '24%' }}></div></div>
        </div>
        <div className="quick-stat">
          <span className="stat-label">Active Processes</span>
          <span className="stat-value">0 Active</span>
        </div>
        <div className="quick-stat">
          <span className="stat-label">Security</span>
          <span className="stat-value"><CheckCircle size={14} color="#10b981" /> Encrypted</span>
        </div>
      </motion.footer>
    </motion.section>
  )
}


export default Dashboard

