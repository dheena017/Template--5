import React, { useState } from 'react'
import { LayoutGrid, Search, Filter, Globe, Zap, ArrowRight, Sparkles, ExternalLink, Grid, LayoutGrid as LayoutIcon, MessageSquare, Bot, Share2, PlayCircle, Video, Layers, PenTool, Database, Mail, Workflow, Code2, Plus } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import '../../styles/pages/avatar/Apps.css'

const apps = [
  {
    name: 'ChatGPT Plus',
    desc: 'Generate avatar scripts directly in ChatGPT.',
    icon: <MessageSquare size={24} />,
    category: 'Productivity',
    badge: 'Popular',
    connected: true
  },
  {
    name: 'n8n Automation',
    desc: 'Build avatar video workflows with 400+ apps.',
    icon: <Workflow size={24} />,
    category: 'Automation',
    badge: 'New',
    connected: false
  },
  {
    name: 'Slack Integration',
    desc: 'Create avatar messages without switching tabs.',
    icon: <MessageSquare size={24} />,
    category: 'Communication',
    connected: true
  },
  {
    name: 'HubSpot CRM',
    desc: 'Send personalized avatar videos to your leads.',
    icon: <Database size={24} />,
    category: 'Sales',
    connected: false
  },
  {
    name: 'Canva Design',
    desc: 'Import your avatars directly into Canva.',
    icon: <LayoutIcon size={24} />,
    category: 'Creative',
    connected: true
  },
  {
    name: 'Vimeo Hosting',
    desc: 'Publish avatar videos directly to Vimeo.',
    icon: <Video size={24} />,
    category: 'Video',
    connected: false
  },
  {
    name: 'Adobe Plugin',
    desc: 'Edit avatar layers directly in Premiere Pro.',
    icon: <PenTool size={24} />,
    category: 'Creative',
    connected: false
  },
  {
    name: 'Mindstamp Interactive',
    desc: 'Add interactive buttons to your avatar videos.',
    icon: <Bot size={24} />,
    category: 'Engagement',
    connected: false
  }
]

const categories = ['All', 'Productivity', 'Automation', 'Creative', 'Sales', 'Communication']

const Apps = () => {
  const [activeCategory, setActiveCategory] = useState('All')
  const [searchTerm, setSearchTerm] = useState('')

  const filteredApps = apps.filter(app => {
    const matchesSearch = app.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          app.desc.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = activeCategory === 'All' || app.category === activeCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="apps-page">
      <div className="ap-header">
        <div className="ap-title">
          <h1><LayoutGrid size={32} /> Avatar Apps</h1>
          <p>Extend the power of your avatars with our growing library of integrations.</p>
        </div>
        <div className="ap-stats glass-card">
          <div className="ap-stat">
            <strong>24</strong>
            <span>Available Apps</span>
          </div>
          <div className="ap-divider" />
          <div className="ap-stat">
            <strong>8</strong>
            <span>Connected</span>
          </div>
        </div>
      </div>

      <div className="ap-toolbar">
        <div className="ap-search glass-card">
          <Search size={18} />
          <input 
            type="text" 
            placeholder="Search for apps and integrations..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="ap-cats">
          {categories.map(cat => (
            <button 
              key={cat} 
              className={`ap-cat-btn ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="ap-grid">
        <AnimatePresence mode="popLayout">
          {filteredApps.map((app, idx) => (
            <motion.div
              layout
              key={app.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="ap-card premium-card"
            >
              <div className="ap-card-top">
                <div className="ap-card-icon">{app.icon}</div>
                {app.badge && <span className="ap-badge">{app.badge}</span>}
                {app.connected && <span className="ap-connected"><Check size={12} /> Connected</span>}
              </div>
              <div className="ap-card-content">
                <h3>{app.name}</h3>
                <p>{app.desc}</p>
              </div>
              <div className="ap-card-footer">
                <span className="ap-cat-pill">{app.category}</span>
                <button className={`ap-btn ${app.connected ? 'secondary' : 'primary'}`}>
                  {app.connected ? 'Settings' : 'Connect'} <ArrowRight size={14} />
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        <motion.div className="ap-card ap-request-card" whileHover={{ scale: 1.02 }}>
          <div className="ap-request-inner">
            <Plus size={32} />
            <h3>Request App</h3>
            <p>Don't see the app you need? Let our team know.</p>
            <button className="ap-request-btn">Request Integration</button>
          </div>
        </motion.div>
      </div>

      <div className="ap-developer-banner glass-card">
        <div className="ap-dev-text">
          <h2>Build your own Avatar App</h2>
          <p>Our open SDK allows you to create custom integrations for your business needs.</p>
        </div>
        <div className="ap-dev-btns">
          <button className="btn btn-secondary"><Code2 size={18} /> API Reference</button>
          <button className="btn btn-primary">Join Dev Program <ExternalLink size={18} /></button>
        </div>
      </div>
    </div>
  )
}

export default Apps





