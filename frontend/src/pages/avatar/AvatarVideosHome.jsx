import React from 'react'
import { Play, Plus, Sparkles, TrendingUp, Bot, Wand2, Zap, Layout, FileText, Languages, Share2, ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import '../../styles/pages/avatar/AvatarVideosHome.css'

const AvatarVideosHome = () => {
  const navigate = useNavigate()

  const quickLinks = [
    { title: 'AI Studio', desc: 'Create video from script', icon: <Wand2 />, path: '/avatar-videos/ai-studio', color: '#6366f1' },
    { title: 'PPT to Video', desc: 'Convert slides instantly', icon: <FileText />, path: '/avatar-videos/ppt-pdf-to-video', color: '#10b981' },
    { title: 'Video Translate', desc: 'Dub in 40+ languages', icon: <Languages />, path: '/avatar-videos/translate', color: '#f59e0b' },
    { title: 'Video Agent', desc: 'Autonomous sales agents', icon: <Bot />, path: '/avatar-videos/video-agent', color: '#ec4899' },
  ]

  const recentProjects = [
    { id: 1, name: 'Product Launch Intro', date: '2h ago', status: 'Completed', type: 'AI Studio' },
    { id: 2, name: 'Support FAQ - Spanish', date: '5h ago', status: 'Processing', type: 'Translate' },
    { id: 3, name: 'Sales Outreach', date: 'Yesterday', status: 'Draft', type: 'Video Agent' },
  ]

  return (
    <div className="avh-page">
      <div className="avh-hero-section">
        <div className="avh-hero-content">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="avh-badge"
          >
            <Sparkles size={14} /> New: Hyper-Realistic Avatars 2.0
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Create Engaging <span className="text-gradient">Avatar Videos</span> in Minutes
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            From scripts to high-quality videos. Use AI-powered digital twins to communicate, sell, and train at scale.
          </motion.p>
          <motion.div 
            className="avh-hero-btns"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <button className="btn-primary-lg" onClick={() => navigate('/avatar-videos/ai-studio')}>
              <Plus size={20} /> Create Your First Video
            </button>
            <button className="btn-secondary-lg">
              <Play size={20} /> Watch Demo
            </button>
          </motion.div>
        </div>
        
        <motion.div 
          className="avh-hero-image"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <div className="avh-placeholder-visual">
            <Bot size={120} className="icon-float" />
            <div className="glow-effect" />
          </div>
        </motion.div>
      </div>

      <div className="avh-quick-grid">
        {quickLinks.map((link, idx) => (
          <motion.div
            key={link.title}
            className="avh-quick-card premium-card"
            whileHover={{ y: -8, scale: 1.02 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            onClick={() => navigate(link.path)}
          >
            <div className="avh-card-icon" style={{ background: `${link.color}22`, color: link.color }}>
              {link.icon}
            </div>
            <h3>{link.title}</h3>
            <p>{link.desc}</p>
            <ArrowRight size={18} className="avh-arrow" />
          </motion.div>
        ))}
      </div>

      <div className="avh-dashboard-layout">
        <section className="avh-recent-section">
          <div className="section-header">
            <h2>Recent Projects</h2>
            <button className="text-btn" onClick={() => navigate('/avatar-videos/project')}>View All</button>
          </div>
          <div className="recent-list glass-card">
            {recentProjects.map(proj => (
              <div key={proj.id} className="recent-item">
                <div className="proj-thumb">
                  <Play size={16} />
                </div>
                <div className="proj-info">
                  <h4>{proj.name}</h4>
                  <span>{proj.type} · {proj.date}</span>
                </div>
                <div className={`proj-status ${proj.status.toLowerCase()}`}>
                  {proj.status}
                </div>
                <button className="icon-btn-sm"><Share2 size={14} /></button>
              </div>
            ))}
          </div>
        </section>

        <aside className="avh-sidebar-tools">
          <h2>Popular Resources</h2>
          <div className="resource-card premium-card">
            <Zap size={24} className="icon-gradient" />
            <div>
              <h4>Tips for 10x Engagement</h4>
              <p>Learn how to optimize your avatars.</p>
            </div>
          </div>
          <div className="resource-card premium-card">
            <Layout size={24} className="icon-gradient" />
            <div>
              <h4>New Corporate Templates</h4>
              <p>20+ new layouts for HR teams.</p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}

export default AvatarVideosHome





