import React, { useState } from 'react'
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
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion'
import '../../styles/pages/dashboards/DashboardIndex.css'
import { PrimaryButton } from '../../components/buttons'
import SearchBar from '../../components/common/SearchBar/SearchBar'

const TOOL_SUITES = [
  {
    id: 'docs',
    title: 'Document Intelligence',
    icon: FileText,
    color: '#ec4899',
    image: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&q=80&w=800',
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
    image: 'https://images.unsplash.com/photo-1492691523567-6170c3295db5?auto=format&fit=crop&q=80&w=800',
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
    image: 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?auto=format&fit=crop&q=80&w=800',
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
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800',
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
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800',
    tools: [
      { id: 'files', label: 'Library & Assets', path: '/files', color: '#64748b' },
      { id: 'dev-dashboard', label: 'Developer Console', path: '/dev-dashboard', color: '#475569' },
      { id: 'analytics', label: 'Usage Insights', path: '/analytics', color: '#8b5cf6' },
      { id: 'settings/general', label: 'Account Settings', path: '/settings/general', color: '#f59e0b' },
    ]
  }
]

const TURBO_RECIPES = [
  { id: 'recipe-1', label: 'Scan + OCR + Translate', desc: 'Universal document digitizer', colors: ['#10b981', '#7c3aed'], icon: Zap },
  { id: 'recipe-2', label: 'Merge + Optimize + Sign', desc: 'Pro contract production', colors: ['#ef4444', '#f59e0b'], icon: Plus },
  { id: 'recipe-3', label: 'Text → Voice → Canvas', desc: 'Creative b-roll generator', colors: ['#3b82f6', '#db2777'], icon: Sparkles }
]

const ToolTiltCard = ({ tool, navigate, SuiteIcon }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [15, -15]), { stiffness: 100, damping: 30 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-15, 15]), { stiffness: 100, damping: 30 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      layout
      className="portal-tool-card-v3 aura-card-premium"
      onClick={() => navigate(tool.path)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ 
        cursor: 'pointer',
        perspective: '1000px',
        rotateX,
        rotateY,
        transformStyle: "preserve-3d"
      }}
      whileHover={{ scale: 1.02 }}
    >
      <div className="card-glare-effect" style={{ transform: 'translateZ(1px)' }}></div>
      
      <div className="tool-card-top-v3" style={{ transform: 'translateZ(40px)' }}>
        <div className="tool-suite-info">
          <div className="suite-icon-mini" style={{ color: tool.color }}>
            <SuiteIcon size={14} />
          </div>
          <span className="suite-name-tag">{tool.suiteName}</span>
        </div>
        <ArrowUpRight size={14} className="tool-arrow-v3" />
      </div>

      <div className="tool-card-body-v3" style={{ transform: 'translateZ(60px)' }}>
        <div className="tool-meta-row">
             <h4>{tool.label}</h4>
             <CheckCircle size={14} className="active-dot-v3" />
        </div>
        <p className="tool-description-mini">Premium {tool.suiteName} automation module.</p>
        <button 
          className="card-launch-btn-v3" 
          style={{ 
            background: tool.color,
            transform: 'translateZ(30px)',
            boxShadow: `0 10px 20px -5px ${tool.color}50`
          }}
        >
          <Zap size={14} /> Launch
        </button>
      </div>

      <div 
        className="card-hover-bg-v3" 
        style={{ 
          background: `radial-gradient(circle at top right, ${tool.color}25, transparent)`,
          transform: 'translateZ(-10px)'
        }} 
      ></div>
    </motion.div>
  );
};

const Dashboard = () => {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = React.useState('')
  const [activeCategory, setActiveCategory] = React.useState('all')
  const [currentTime, setCurrentTime] = React.useState(new Date())

  // Hero Parallax Motion Values
  const heroMouseX = useMotionValue(0);
  const heroMouseY = useMotionValue(0);
  const heroRotateX = useSpring(useTransform(heroMouseY, [-0.5, 0.5], [5, -5]), { stiffness: 50, damping: 20 });
  const heroRotateY = useSpring(useTransform(heroMouseX, [-0.5, 0.5], [-5, 5]), { stiffness: 50, damping: 20 });
  
  const heroTranslateX = useSpring(useTransform(heroMouseX, [-0.5, 0.5], [-20, 20]), { stiffness: 50, damping: 20 });
  const heroTranslateY = useSpring(useTransform(heroMouseY, [-0.5, 0.5], [-20, 20]), { stiffness: 50, damping: 20 });

  const handleHeroMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    heroMouseX.set(clientX / innerWidth - 0.5);
    heroMouseY.set(clientY / innerHeight - 0.5);
  };

  const handleHeroMouseLeave = () => {
    heroMouseX.set(0);
    heroMouseY.set(0);
  };

  React.useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const getGreeting = () => {
    const hour = currentTime.getHours()
    if (hour < 12) return 'Good Morning'
    if (hour < 18) return 'Good Afternoon'
    return 'Good Evening'
  }

  const formattedTime = currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })


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
        <motion.header 
          className="portal-hero-premium" 
          variants={itemVariants}
          onMouseMove={handleHeroMouseMove}
          onMouseLeave={handleHeroMouseLeave}
          style={{ 
            perspective: '1500px',
            rotateX: heroRotateX,
            rotateY: heroRotateY,
            transformStyle: 'preserve-3d'
          }}
        >
          <motion.div 
            className="hero-bg-overlay-aura"
            style={{ 
              x: useTransform(heroTranslateX, val => val * 0.5),
              y: useTransform(heroTranslateY, val => val * 0.5),
              translateZ: '-50px'
            }}
          >
            <img src="/assets/dashboards/hero.png" alt="Hero" className="hero-image-aura" />
          </motion.div>

          <div className="hero-content-aura" style={{ transformStyle: 'preserve-3d' }}>
            <motion.div 
              className="aura-chip-premium-v3"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{ transform: 'translateZ(80px)' }}
            >
              <div className="status-dot-pulse-v3"></div>
              <Sparkles size={14} className="text-secondary" />
              <span>{formattedTime} • ENTERPRISE AURA v2.5</span>
            </motion.div>
            
            <motion.h2 
              className="greeting-text-premium"
              style={{ transform: 'translateZ(100px)' }}
            >
              {getGreeting()}, <span className="text-muted">Creative Lead</span>
            </motion.h2>
            
            <motion.h1 
              className="hero-main-title-premium"
              style={{ transform: 'translateZ(120px)' }}
            >
              One Interface. <br/> 
              <span className="text-gradient-aura">Infinite Possibilities.</span>
            </motion.h1>
            
            <motion.div 
              className="universal-search-premium"
              style={{ transform: 'translateZ(150px)' }}
            >
              <SearchBar 
                placeholder="Ask Aura or search tools..."
                onSearch={(val) => setSearchQuery(val)}
                className="dashboard-search-cinematic"
              />
            </motion.div>
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

        <motion.div className="portal-tools-main-grid-v4" variants={containerVariants}>
          <AnimatePresence mode="popLayout">
            {filteredTools.map((tool) => (
              <ToolTiltCard 
                key={tool.id} 
                tool={tool} 
                navigate={navigate} 
                SuiteIcon={tool.suiteIcon}
              />
            ))}
          </AnimatePresence>
        </motion.div>


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

