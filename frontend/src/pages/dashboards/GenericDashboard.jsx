import React, { useState, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  ArrowUpRight, Download, MoreVertical, Trash2, Zap, Clock, Play
} from 'lucide-react'
import { DASHBOARD_CONFIG } from '../../constants/dashboardConfig'
import '../../styles/pages/dashboards/Dashboard.css'

const GenericDashboard = () => {
  const { category } = useParams()
  const navigate = useNavigate()
  const scrollRef = useRef(null)
  const [scrollProgress, setScrollProgress] = useState(0)

  // Default to video if not found (or handle 404)
  const config = DASHBOARD_CONFIG[category?.toLowerCase()] || DASHBOARD_CONFIG['video']

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
      return { background: '#ecfdf5', color: '#059669' }
    }
    if (s === 'rendering' || s === 'synthesizing' || s === 'processing' || s === 'drafting' || s === 'in review') {
      return { background: '#fffbeb', color: '#d97706' }
    }
    return { background: '#f8fafc', color: '#64748b' }
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
        <div className="dash-actions">
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
        <motion.div className="tool-cards-grid" variants={containerVariants}>
          {config.tools.map((tool) => (
            <motion.div 
              key={tool.name} 
              className="tool-card premium-card" 
              onClick={() => navigate(tool.path)}
              variants={itemVariants}
            >
               <div className="tool-header-row">
                  <div className="tool-icon-box">{tool.icon}</div>
                  <div className="launch-badge">{config.badge}</div>
               </div>
               <div className="tool-info">
                  <h3>{tool.name}</h3>
                  <p>{tool.desc}</p>
               </div>
               <div className="tool-footer">
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, opacity: 0.6 }}>{config.version}</span>
                  <ArrowUpRight size={16} style={{ opacity: 0.5 }} />
               </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      <motion.section className="data-table-section" variants={itemVariants}>
        <div className="section-title-box" style={{ marginBottom: '1.5rem', borderBottom: '1px solid #f1f5f9', paddingBottom: '1rem' }}>
           <Play size={20} style={{ color: '#64748b' }} />
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

