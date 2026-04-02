import React, { useState, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  ChevronRight, ArrowRight, Play, Download, 
  Clock, CheckCircle2, Shield, Zap, Activity,
  Video, Palette, Bot, Box, FileText, HardDrive, 
  Layers, Database, Search, ArrowUpRight, MoreVertical, 
  Trash2, History, Scissors
} from 'lucide-react'
import { DASHBOARD_CONFIG } from '../../constants/dashboardConfig'
import '../../styles/pages/dashboards/Dashboard.css'
import '../../styles/pages/dashboards/DashboardIndex.css'
import { PrimaryButton } from '../../components/buttons'
import PromptBar from '../../components/common/PromptBar/PromptBar'

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
           {!config.hasPromptBar && (
             <button className="premium-btn" onClick={() => navigate(config.actionPath)}>{config.actionText}</button>
           )}
        </div>
      </motion.header>
      
      {config.hasPromptBar && (
        <div style={{ marginBottom: '2.5rem' }}>
          <PromptBar 
            placeholder={config.promptPlaceholder || "Synthesize your vision..."}
            onExecute={() => navigate(config.actionPath)}
            isProcessing={false}
          />
        </div>
      )}

      {/* Category Stats */}
      <motion.div className="stats-grid" variants={containerVariants}>
        
        {config.showTelemetry && (
          <motion.div className="stat-card telemetry-card" variants={itemVariants}>
            <div className="stat-header">
              <span className="stat-label">GPU Cluster Load</span>
              <div className="stat-icon pulse-live">
                <Box size={12} />
              </div>
            </div>
            <div className="telemetry-body">
               <div className="load-label">Aura Core v4.2</div>
               <div className="load-bar-wrap">
                  <motion.div 
                    className="load-bar-fill"
                    animate={{ width: ['45%', '72%', '68%', '85%', '54%'] }}
                    transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
                  />
               </div>
               <div className="load-footer">Latency: 45ms • Nodes: 128</div>
            </div>
          </motion.div>
        )}

        {config.stats.map((stat, idx) => (
          <motion.div key={idx} className="stat-card" variants={itemVariants}>
            <div className="stat-header">
              <span className="stat-label">{stat.label}</span>
              <div className="stat-icon" style={{ background: `rgba(${config.rgb}, 0.1)`, color: `rgb(${config.rgb})` }}>
                {stat.subIcon}
              </div>
            </div>
            <div className="stat-value">{stat.value}</div>
            <div className="stat-footer" style={{ color: stat.subColor }}>
              {stat.sub}
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Samples Archive - NEW Phase 3 */}
      {config.samples && (
        <motion.section className="samples-section" variants={containerVariants}>
          <div className="section-header">
             <h3 className="section-title">Synthesis Samples</h3>
             <span className="section-tag">Seeds & Vision Archive</span>
          </div>
          <div className="samples-grid">
             {config.samples.map(sample => (
               <motion.div key={sample.id} className="sample-card-v4" variants={itemVariants}>
                  <div className="sample-preview">
                     <img src={sample.preview} alt={sample.title} />
                     <div className="sample-overlay">
                        <PrimaryButton size="sm">Explore Seed</PrimaryButton>
                     </div>
                  </div>
                  <div className="sample-footer">
                     <div className="sample-info">
                        <div className="sample-title">{sample.title}</div>
                        <div className="sample-type">{sample.type}</div>
                     </div>
                     <div className="sample-action"><Play size={14} /></div>
                  </div>
               </motion.div>
             ))}
          </div>
        </motion.section>
      )}

      <motion.div className="section-group" variants={itemVariants}>
        <div className="section-title-box">
           {React.cloneElement(config.icon, { style: { color: config.color } })}
           <span className="group-label">{config.groupLabel}</span>
        </div>
        <motion.div className="portal-tools-main-grid-v3" variants={containerVariants}>
          {config.tools.map((tool) => (
            <motion.div 
              key={tool.name} 
              className="portal-tool-card-v3" 
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              onClick={() => navigate(tool.path)}
            >
              <div className="card-glare-effect"></div>
              <div className="tool-card-top-v3">
                  <div className="tool-suite-info">
                      <div className="suite-icon-mini" style={{ color: config.color, background: `rgba(${config.rgb}, 0.1)` }}>
                          {React.cloneElement(tool.icon, { size: 16 })}
                      </div>
                      <span className="suite-name-tag">{config.title.toUpperCase()}</span>
                  </div>
                  <div className="tool-arrow-v3">
                      <ArrowUpRight size={18} />
                  </div>
              </div>

              <div className="tool-card-body-v3">
                  <h4>{tool.name}</h4>
                  <p className="tool-description-mini">{tool.desc}</p>
                  
                  <div className="tool-card-footer">
                      <div className="active-dot-v3">●</div>
                      <span className="tool-ready-text">Ready to use</span>
                  </div>

                  <PrimaryButton 
                      className="card-launch-btn-v3"
                      style={{ background: `linear-gradient(to right, ${config.color}, #7c3aed)` }}
                  >
                      Open Tool
                  </PrimaryButton>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      <motion.section className="data-table-section" variants={itemVariants}>
        <div className="section-header" style={{ marginBottom: '2rem' }}>
           <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <History size={20} style={{ color: config.color }} />
              <h3 className="section-title">{config.recentHeader}</h3>
           </div>
           <span className="section-tag">Production Manifest</span>
        </div>
        
        <div className="table-wrapper-v4" ref={scrollRef} onScroll={handleTableScroll}>
           <table className="aura-table-glass">
              <thead>
                 <tr>
                    {config.recentCols.map(col => <th key={col}>{col}</th>)}
                 </tr>
              </thead>
              <tbody>
                 {config.recentItems.map((row) => (
                   <tr key={row.id}>
                      <td className="row-name-v4">
                         <div className="name-with-dot">
                            <div className="status-dot-mini" style={{ background: config.color }}></div>
                            {row.name}
                         </div>
                      </td>
                      <td className="row-specs-v4">{row.specs}</td>
                      <td>
                         <span className={`status-pill-v4 ${row.status.toLowerCase()}`}>
                            {row.status}
                         </span>
                      </td>
                      <td>
                         <div className="actions-cell-v4">
                             <button className="aura-icon-btn" title="Download"><Download size={14} /></button>
                             <button className="aura-icon-btn" title="Options"><MoreVertical size={14} /></button>
                             <button className="aura-icon-btn" title="Delete"><Trash2 size={14} /></button>
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

