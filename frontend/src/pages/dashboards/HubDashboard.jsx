import React from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Box, Info } from 'lucide-react'
import { SIDEBAR_CATEGORIES } from '../../constants/sidebarData'
import '../../styles/pages/dashboards/HubDashboards.css'

const HubDashboard = ({ type = 'main' }) => {
  const navigate = useNavigate()

  const HUB_CONFIGS = {
    'main': {
      title: 'Main Tools Hub',
      subtitle: 'Explore and launch our industry-leading AI processing engines.',
      className: 'main-tools-dashboard',
      headerClass: 'main-tools-header',
      gridClass: 'categories-container',
      categories: ['Video', 'Image', 'Avatar', 'Speech', 'Text', 'Studio'],
      isToolGrid: true
    },
    'management': {
      title: 'Management Center',
      subtitle: 'Control and manage your library, templates, and document workflows in one place.',
      className: 'management-dashboard',
      headerClass: 'management-header',
      gridClass: 'management-grid',
      categories: ['Files', 'PDF'],
      color: '#64748b'
    },
    'pdf': {
      title: 'PDF Engineering Hub',
      subtitle: 'Access specialized document conversion and processing engines.',
      className: 'pdf-hub-dashboard',
      headerClass: 'pdf-header',
      gridClass: 'pdf-grid',
      categories: ['PDF', 'Popular conversions', 'PDF conversion'],
      color: '#ef4444'
    },
    'system': {
      title: 'System & Platform Hub',
      subtitle: 'Access developer tools, community channels, and platform documentation.',
      className: 'system-info-dashboard',
      headerClass: 'system-header',
      gridClass: 'system-grid',
      categories: ['Developers', 'Social media', 'About us'],
      color: '#475569',
      cardAction: 'Access Info'
    }
  }

  const config = HUB_CONFIGS[type] || HUB_CONFIGS['main']

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
  }

  const CATEGORY_COLORS = {
    'Video': '#e11d48', 'Image': '#db2777', 'Avatar': '#2563eb',
    'Speech': '#f59e0b', 'Text': '#10b981', 'Studio': '#7c3aed',
    'Files': '#64748b', 'PDF': '#ef4444', 'Developers': '#475569',
    'Social media': '#0ea5e9', 'About us': '#4b5563'
  }

  return (
    <div className={config.className}>
      <header className={config.headerClass}>
        <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
          {config.title}
        </motion.h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
          {config.subtitle}
        </motion.p>
      </header>

      <motion.div 
        className={config.gridClass}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {config.categories.map((catName) => {
          const category = SIDEBAR_CATEGORIES.find(c => c.name === catName)
          if (!category) return null
          
          const catColor = config.color || CATEGORY_COLORS[catName] || '#6366f1'

          if (config.isToolGrid) {
            return (
              <section key={catName} className="tools-category-section">
                <div className="category-title" style={{ borderColor: `${catColor}30` }}>
                  <span style={{ color: catColor }}>{category.icon}</span>
                  <h2>{catName} Tools</h2>
                </div>
                <div className="tools-grid">
                  {category.links.slice(0, 4).map((tool, idx) => (
                    <motion.button
                      key={`${catName}-${idx}`}
                      className="tool-card"
                      style={{ '--cat-color': catColor }}
                      variants={itemVariants}
                      onClick={() => navigate(tool.path)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="tool-icon-wrapper">
                        {tool.icon ? React.cloneElement(tool.icon, { size: 24 }) : <Box size={24} />}
                      </div>
                      <div className="tool-info">
                        <h3>{tool.name}</h3>
                        <p>High-performance AI engine for advanced {tool.name.toLowerCase()} processing.</p>
                      </div>
                      <div className="tool-footer">
                        <ArrowRight size={18} />
                      </div>
                    </motion.button>
                  ))}
                </div>
              </section>
            )
          }

          return category.links.map((link, lIdx) => (
            <motion.button
              key={`${catName}-${lIdx}`}
              className="management-card" 
              role="link"
              aria-label={`Launch ${link.name} center`}
              style={{ '--cat-color': catColor }}
              variants={itemVariants}
              onClick={() => navigate(link.path)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="card-icon-box" style={{ background: `${catColor}15`, color: catColor }}>
                {link.icon ? React.cloneElement(link.icon, { size: 28 }) : <Box size={28} />}
              </div>
              <div className="card-content">
                <h3>{link.name}</h3>
                <p>{type === 'system' ? `Platform infrastructure and community resources for ${link.name.toLowerCase()}.` : `Efficiently organize and manage your ${link.name.toLowerCase()} assets.`}</p>
              </div>
              <div className="card-action" style={{ color: catColor }}>
                <span>{config.cardAction || 'Launch Center'}</span>
                <ArrowRight size={18} />
              </div>
              <div className="card-stats">
                <div className="stat-item">
                  <span>{type === 'system' ? 'Category' : 'Usage'}</span>
                  <span>{type === 'system' ? category.name : '92%'}</span>
                </div>
                <div className="stat-item">
                  <span>{type === 'system' ? 'Type' : 'Status'}</span>
                  <span>{type === 'system' ? 'Hub' : 'Healthy'}</span>
                </div>
              </div>
            </motion.button>
          ))
        })}
      </motion.div>
    </div>
  )
}

export default HubDashboard

