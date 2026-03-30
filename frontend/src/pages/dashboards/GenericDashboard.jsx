import React, { useState, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  ArrowUpRight, Download, MoreVertical, Trash2, Zap, Clock, Play
} from 'lucide-react'
import { DASHBOARD_CONFIG } from '../../constants/dashboardConfig'
import '../../styles/pages/dashboards/Dashboard.css'
import '../../styles/pages/dashboards/DashboardIndex.css'
import { PrimaryButton } from '../../components/buttons'

const GenericDashboard = ({ type }) => {
  const { category: paramCategory } = useParams()
  const navigate = useNavigate()
  const scrollRef = useRef(null)
  const [scrollProgress, setScrollProgress] = useState(0)

  // Default to video if not found (or handle 404)
  const categoryKey = (type || paramCategory || 'video').toLowerCase()
  const config = DASHBOARD_CONFIG[categoryKey] || DASHBOARD_CONFIG['video']

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 } 
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, translateY: 15 },
    visible: { opacity: 1, translateY: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } }
  }

  const handleTableScroll = (e) => {
    const { scrollLeft, scrollWidth, clientWidth } = e.target
    const progress = (scrollLeft / (scrollWidth - clientWidth)) * 100
    setScrollProgress(progress || 0)
  }

  const getStatusStyle = (status) => {
    const s = status.toLowerCase()
    if (s === 'completed' || s === 'active' || s === 'ready' || s === 'published') {
      return { background: 'rgba(16, 185, 129, 0.1)', color: '#10b981' }
    }
    if (s === 'rendering' || s === 'synthesizing' || s === 'processing' || s === 'drafting' || s === 'in review') {
      return { background: 'rgba(245, 158, 11, 0.1)', color: '#f59e0b' }
    }
    return { background: 'rgba(148, 163, 184, 0.1)', color: '#94a3b8' }
  }

  return (
    <motion.div 
      className="dashboard-container" 
      style={{ '--accent-color': config.color, '--accent-rgb': config.rgb }}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.header className="dash-header" variants={itemVariants}>
        <div className="welcome-section">
          <h1>{config.title}</h1>
          <p>{config.subtitle}</p>
        </div>
        <div className="dash-actions" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
           <div className="system-pulse" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px', background: 'rgba(255,255,255,0.03)', borderRadius: '100px', border: '1px solid rgba(255,255,255,0.05)' }}>
             <div className="pulse-dot" style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981', boxShadow: '0 0 12px #10b981', animation: 'pulse 2s infinite' }}></div>
             <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>Engine Live</span>
           </div>
           <button className="premium-btn" onClick={() => navigate(config.actionPath)}>{config.actionText}</button>
        </div>
      </motion.header>

      {/* Category Stats */}
      <motion.div className="stats-grid" variants={containerVariants}>
        {config.stats.map((stat, idx) => (
          <motion.div key={idx} className="stat-card" variants={itemVariants}>
            <span className="stat-label">{stat.label}</span>
            <div className="stat-value">{stat.value}</div>
            <span className="stat-sub" style={{ color: stat.subColor }}>
              {stat.subIcon} {stat.sub}
            </span>
          </motion.div>
        ))}
      </motion.div>

      <motion.div className="section-group" variants={itemVariants}>
        <div className="section-title-box">
           {React.cloneElement(config.icon, { style: { color: config.color } })}
           <span className="group-label">{config.groupLabel}</span>
        </div>
        <motion.div className="portal-tools-main-grid" variants={containerVariants}>
          {config.tools.map((tool) => (
            <div 
              key={tool.name} 
              className="portal-tool-card" 
              style={{ 
                  backgroundColor: '#0f1016',
                  border: '1px solid rgba(255, 255, 255, 0.04)',
                  cursor: 'pointer'
              }}
              onClick={() => navigate(tool.path)}
            >
              <div className="tool-card-top">
                  <div className="tool-suite-info">
                      <div className="suite-icon-mini" style={{ color: config.color }}>
                          {React.cloneElement(tool.icon, { size: 14 })}
                      </div>
                      <span className="suite-name-tag">{config.title.toUpperCase()}</span>
                  </div>
                  <div className="tool-action-indicator">
                      <ArrowUpRight size={14} />
                  </div>
              </div>

              <div className="tool-card-body">
                  <h3>{tool.name}</h3>
                  <div className="tool-card-footer">
                      <div className="tool-status-dot" style={{ backgroundColor: config.color }}></div>
                      <span className="tool-ready-text">Ready to use</span>
                  </div>

                  <div className="card-launch-aura">
                      <PrimaryButton 
                          className="launch-btn-premium"
                          size="md"
                          style={{ backgroundColor: '#7c3aed', color: '#fff', borderRadius: '100px', fontWeight: '800', border: 'none', boxShadow: '0 10px 20px rgba(124, 58, 237, 0.3)', paddingInline: '2rem' }}
                      >
                          Open Tool
                      </PrimaryButton>
                  </div>
              </div>
              <div className="card-hover-bg" style={{ background: `radial-gradient(circle at top right, ${config.color}15, transparent)` }}></div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      <motion.section className="data-table-section" variants={itemVariants}>
        <div className="section-title-box" style={{ marginBottom: '1.5rem', paddingBottom: '1rem' }}>
           <Play size={20} style={{ color: 'var(--text-muted)' }} />
           <span className="group-label">{config.recentHeader}</span>
        </div>
        
        <div className="table-wrapper" ref={scrollRef} onScroll={handleTableScroll}>
           <table className="custom-table">
              <thead>
                 <tr>
                    {config.recentCols.map(col => <th key={col}>{col}</th>)}
                 </tr>
              </thead>
              <tbody>
                 {config.recentItems.map((row) => (
                   <tr key={row.id}>
                      <td className="row-name">{row.name}</td>
                      <td className="row-date">{row.specs}</td>
                      <td>
                         <span className="status-chip" style={getStatusStyle(row.status)}>
                            {row.status}
                         </span>
                      </td>
                      <td>
                         <div className="actions-cell">
                             <button className="icon-btn" title="Download"><Download size={14} /></button>
                             <button className="icon-btn" title="Options"><MoreVertical size={14} /></button>
                             <button className="icon-btn" title="Delete"><Trash2 size={14} /></button>
                         </div>
                      </td>
                   </tr>
                 ))}
              </tbody>
           </table>
        </div>
        <div className="table-panning-track">
           <div className="table-panning-indicator" style={{ width: `${scrollProgress}%` }} />
        </div>
      </motion.section>
    </motion.div>
  )
}

export default GenericDashboard

