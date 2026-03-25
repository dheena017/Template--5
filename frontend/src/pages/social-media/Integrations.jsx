import React, { useState } from 'react'
import { 
  Search, Filter, Globe, Zap, ArrowRight,
  Sparkles, ExternalLink, Grid, LayoutGrid,
  Code2, MessageSquare, Bot, Share2, PlayCircle,
  Video, Layers, PenTool, Database, Mail, Workflow
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import '../../styles/pages/social-media/Integrations.css'

const integrations = [
  {
    name: 'ChatGPT App',
    desc: 'Generate video directly in ChatGPT.',
    icon: <MessageSquare size={24} />,
    category: 'Productivity',
    badge: 'New'
  },
  {
    name: 'n8n',
    desc: 'Build workflow automations with HeyGen in n8n. Connect to 400+ apps.',
    icon: <Workflow size={24} />,
    category: 'Automation',
    badge: 'New'
  },
  {
    name: 'Autohive',
    desc: 'Connect HeyGen with Autohive to add personalized AI video to sales workflows.',
    icon: <Zap size={24} />,
    category: 'Automation',
    badge: 'New'
  },
  {
    name: 'Slack',
    desc: 'Create videos from Slack conversations without switching apps.',
    icon: <MessageSquare size={24} />,
    category: 'Productivity',
    badge: 'New'
  },
  {
    name: 'HubSpot',
    desc: 'Create and send personalized videos at scale. Sync with your CRM.',
    icon: <Database size={24} />,
    category: 'Sales'
  },
  {
    name: 'Vimeo',
    desc: 'Centralize and manage your AI-generated videos from HeyGen in one place.',
    icon: <Video size={24} />,
    category: 'Video'
  },
  {
    name: 'Adobe Express Plugin',
    desc: 'Bring HeyGen into Adobe for seamless editing. Create standout videos.',
    icon: <PenTool size={24} />,
    category: 'Creative'
  },
  {
    name: 'Canva App',
    desc: 'Integrate HeyGen with Canva to power up designs. Create polished videos.',
    icon: <LayoutGrid size={24} />,
    category: 'Creative'
  },
  {
    name: 'Tolstoy AI Video Player',
    desc: 'Embed HeyGen videos on sites, emails, or SMS. Boost views and drive traffic.',
    icon: <Globe size={24} />,
    category: 'Video'
  },
  {
    name: 'Trupeer AI Screen Recorder',
    desc: 'Upgrade screen recordings with AI voiceovers and effects in 20+ languages.',
    icon: <PlayCircle size={24} />,
    category: 'Video'
  },
  {
    name: 'FlowShare',
    desc: 'Turn tasks into step-by-step guides instantly for training.',
    icon: <Layers size={24} />,
    category: 'Documentation'
  },
  {
    name: 'Mindstamp',
    desc: 'Add interactivity to your videos with buttons, quizzes, and more.',
    icon: <Bot size={24} />,
    category: 'Video'
  },
  {
    name: 'Repurpose.io',
    desc: 'Turn your HeyGen video into a post and auto-share it everywhere.',
    icon: <Share2 size={24} />,
    category: 'Social'
  },
  {
    name: 'Zapier',
    desc: 'Connect HeyGen to thousands of apps and automate tasks without code.',
    icon: <Zap size={24} />,
    category: 'Automation'
  },
  {
    name: 'Make',
    desc: 'Visually build automations for HeyGen videos. Streamline tasks easily.',
    icon: <Grid size={24} />,
    category: 'Automation'
  },
  {
    name: 'Pabbly',
    desc: 'Connect 2,000+ tools to automate video workflows and boost productivity.',
    icon: <Database size={24} />,
    category: 'Automation'
  },
  {
    name: 'Plainly Videos',
    desc: 'Auto-insert HeyGen videos into After Effects templates with avatars.',
    icon: <Video size={24} />,
    category: 'Creative'
  },
  {
    name: 'Clay',
    desc: 'Generate HeyGen videos with unique scripts pulling data from any source.',
    icon: <Database size={24} />,
    category: 'Sales'
  },
  {
    name: 'Hexus',
    desc: 'Add avatars to demos and guides with Hexus AI. Scalable product content.',
    icon: <Bot size={24} />,
    category: 'Video'
  },
  {
    name: 'viaSocket',
    desc: 'Automate processes across tools with this no-code platform.',
    icon: <Code2 size={24} />,
    category: 'Automation'
  }
]

const categories = ['All', 'Productivity', 'Automation', 'Sales', 'Video', 'Creative', 'Social', 'Documentation']

const Integrations = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')

  const filteredItems = integrations.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         item.desc.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = activeCategory === 'All' || item.category === activeCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="integrations-container">
      <header className="integrations-header">
        <div className="header-top">
          <div className="title-group">
            <h1>Integrations <Sparkles size={20} className="sparkle-icon" /></h1>
            <p>Connect HeyGen with your favorite tools to automate video creation and boost productivity.</p>
          </div>
          <div className="header-actions">
            <button className="pro-invite-btn">Request Integration</button>
          </div>
        </div>

        <div className="integrations-toolbar search-glass">
          <div className="search-box">
            <Search size={18} />
            <input 
              type="text" 
              placeholder="Search 500+ integrations..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="categories-scroll">
            {categories.map(cat => (
              <button 
                key={cat} 
                className={`category-pill ${activeCategory === cat ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </header>

      <main className="integrations-grid">
        <AnimatePresence mode="popLayout">
          {filteredItems.map((item, idx) => (
            <motion.div
              layout
              key={item.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ delay: idx * 0.03 }}
              className="integration-card glass-card"
            >
              <div className="card-top">
                <div className="card-icon-wrap">
                  {item.icon}
                </div>
                {item.badge && <span className="card-badge">{item.badge}</span>}
              </div>
              <div className="card-content">
                <h3>{item.name}</h3>
                <p>{item.desc}</p>
              </div>
              <div className="card-footer">
                <span className="card-category">{item.category}</span>
                <button className="connect-btn">
                  Connect <ArrowRight size={14} />
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </main>

      {filteredItems.length === 0 && (
        <div className="no-results">
          <div className="no-results-icon"><Search size={48} opacity={0.2} /></div>
          <h2>No integrations found</h2>
          <p>We couldn't find anything matching "{searchTerm}". Try a different search term or category.</p>
        </div>
      )}
    </div>
  )
}

export default Integrations





