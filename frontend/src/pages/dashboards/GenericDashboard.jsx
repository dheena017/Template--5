import React, { useState, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  ChevronRight, ArrowRight, Play, Download, 
  Clock, CheckCircle2, Shield, Zap, Activity,
  Video, Palette, Bot, Box, FileText, HardDrive, 
  Layers, Database, Search, ArrowUpRight, MoreVertical, 
  Trash2, History, Scissors, Plus, LayoutGrid, Monitor,
  Smartphone, Languages, Music, Settings, Sparkles
} from 'lucide-react'
import { DASHBOARD_CONFIG } from '../../constants/dashboardConfig'
import '../../styles/pages/dashboards/Dashboard.css'
import '../../styles/pages/dashboards/DashboardIndex.css'
import '../../styles/pages/dashboards/ImageToVideoDashboard.css'
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

  // Production State
  const [scenes, setScenes] = useState([
    { id: 1, title: 'Scene 1: Introduction', prompt: 'Cinematic view of a futuristic city at sunset...', status: 'Ready', preview: 'https://images.unsplash.com/photo-1605142859862-978be7eba909?auto=format&fit=crop&q=80&w=300' },
    { id: 2, title: 'Scene 2: Core Concept', prompt: 'Close up of neural pathways lighting up...', status: 'Synthesizing', preview: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=300' },
    { id: 3, title: 'Scene 3: Climax', prompt: 'The city pulses with kinetic energy...', status: 'Draft', preview: '' }
  ])

  const [productionState, setProductionState] = useState({
    format: config.productionSettings?.formats[0] || 'YouTube Landscape',
    style: config.productionSettings?.styles[0] || 'Cinematic',
    language: config.productionSettings?.languages[0] || 'English',
    tone: config.productionSettings?.tones[0] || 'Exciting'
  })

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
      className={`dashboard-container dashboard-${categoryKey}`}
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
        <div style={{ marginBottom: '1rem' }}>
          <PromptBar 
            placeholder={config.promptPlaceholder || "Synthesize your vision..."}
            onExecute={() => navigate(config.actionPath)}
            isProcessing={false}
          />
        </div>
      )}

      {/* Production Workspace - NEW Scene-by-Scene Mode */}
      {config.isProduction && (
        <motion.div className="production-workspace-v2" variants={itemVariants}>
          {/* Master Production Pulse */}
          <div className="master-synth-progress">
             <div className="msp-header">
                <div className="msp-info">
                   <h3><Sparkles size={18} /> Production Synthesis</h3>
                   <span className="msp-status">Batch Processing: 2/3 Scenes</span>
                </div>
                <div className="msp-percent">67%</div>
             </div>
             <div className="msp-track">
                <motion.div 
                  className="msp-fill"
                  initial={{ width: 0 }}
                  animate={{ width: '67%' }}
                  transition={{ duration: 1.2 }}
                />
             </div>
          </div>

          <div className="production-header-controls">
            <div className="control-group">
              <label><Monitor size={14} /> Format</label>
              <select 
                value={productionState.format} 
                onChange={(e) => setProductionState({...productionState, format: e.target.value})}
              >
                {config.productionSettings.formats.map(f => <option key={f}>{f}</option>)}
              </select>
            </div>
            <div className="control-group">
              <label><Palette size={14} /> Style</label>
              <div className="style-sync-row">
                 <select 
                   value={productionState.style} 
                   onChange={(e) => setProductionState({...productionState, style: e.target.value})}
                 >
                   {config.productionSettings.styles.map(s => <option key={s}>{s}</option>)}
                 </select>
                 <button className="sync-all-btn" title="Apply to all scenes"><Layers size={14} /></button>
              </div>
            </div>
            <div className="control-group">
              <label><Languages size={14} /> Voiceover</label>
              <select 
                value={productionState.language} 
                onChange={(e) => setProductionState({...productionState, language: e.target.value})}
              >
                {config.productionSettings.languages.map(l => <option key={l}>{l}</option>)}
              </select>
            </div>
            <div className="control-group">
              <label><Music size={14} /> Tone</label>
              <select 
                value={productionState.tone} 
                onChange={(e) => setProductionState({...productionState, tone: e.target.value})}
              >
                {config.productionSettings.tones.map(t => <option key={t}>{t}</option>)}
              </select>
            </div>
          </div>

          {/* AI Script Architect - NEW Core Feature */}
          <section className="script-architect-zone">
             <div className="sa-header">
                <div className="sa-title">
                   <Bot size={18} />
                   <h4>AI Script Architect</h4>
                </div>
                <button className="sa-generate-btn">Generate Scenes from Script</button>
             </div>
             <textarea 
               className="sa-textarea" 
               placeholder="Paste your full script or story here... Aura will automatically parse it into visual scenes."
             />
          </section>

          <div className="scene-pipeline-container">
            <div className="pipeline-header">
              <h3><LayoutGrid size={18} /> Production Timeline</h3>
              <div className="pipeline-top-actions">
                 <button className="batch-render-btn"><Play size={14} /> Global Synth</button>
                 <button className="add-scene-btn"><Plus size={16} /> New Scene</button>
              </div>
            </div>
            
            <div className="scene-track">
              {scenes.map((scene, idx) => (
                <motion.div 
                  key={scene.id} 
                  className={`scene-card-v2 ${scene.status.toLowerCase()}`}
                  whileHover={{ y: -5 }}
                >
                  <div className="scene-card-header">
                     <span className="s-num">S{idx + 1}</span>
                     <div className="s-status-blob"></div>
                     <span className="s-status-text">{scene.status}</span>
                  </div>

                  <div className="scene-preview-box">
                    {scene.preview ? (
                      <img src={scene.preview} alt={scene.title} />
                    ) : (
                      <div className="preview-placeholder">
                        <Sparkles size={24} className="sparkle-pulse" />
                      </div>
                    )}
                    {scene.status === 'Synthesizing' && <div className="render-overlay">Rendering...</div>}
                  </div>

                  <div className="scene-details">
                    <input className="scene-title-input" defaultValue={scene.title} />
                    <textarea 
                      className="scene-prompt-input" 
                      defaultValue={scene.prompt}
                      placeholder="Describe this scene..."
                    />
                  </div>

                  <div className="scene-footer-v2">
                    <button className="scene-synth-btn primary">
                       <Zap size={14} /> 
                       Synthesize
                    </button>
                    <div className="scene-utility-btns">
                       <button className="s-util-btn" title="Download"><Download size={14} /></button>
                       <button className="s-util-btn" title="Duplicate"><Layers size={14} /></button>
                       <button className="s-util-btn danger" title="Delete"><Trash2 size={14} /></button>
                    </div>
                  </div>
                </motion.div>
              ))}
              <button className="add-scene-card-end">
                 <Plus size={24} />
                 <span>Add Scene</span>
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Asset Library Workspace - NEW Media Vault v5 */}
      {config.isAssetLibrary && (
        <motion.div className="media-vault-workspace" variants={itemVariants}>
           <div className="vault-analytics-row">
              <div className="storage-telemetry-card">
                 <div className="storage-circle-wrap">
                    <svg viewBox="0 0 100 100" className="storage-svg">
                       <circle className="bg" cx="50" cy="50" r="45" />
                       <motion.circle 
                         className="meter" 
                         cx="50" cy="50" r="45" 
                         initial={{ strokeDashoffset: 283 }}
                         animate={{ strokeDashoffset: 283 - (283 * 0.15) }} 
                         transition={{ duration: 1.5, ease: "easeOut" }}
                       />
                    </svg>
                    <div className="storage-content">
                       <span className="s-percent">15%</span>
                       <span className="s-label">Used</span>
                    </div>
                 </div>
                 <div className="storage-text">
                    <h4>Hybrid Cloud Core</h4>
                    <p>850GB of 1TB storage available for master synthesis assets.</p>
                    <div className="storage-health">
                       <Shield size={12} /> System Healthy
                    </div>
                 </div>
              </div>

              <div className="vault-search-bar">
                 <Search size={18} />
                 <input type="text" placeholder="Search by prompt, asset name, or engine tag..." />
                 <button className="v-filter-btn">Filters</button>
              </div>
           </div>

           <div className="asset-grid-v5">
              {config.assets?.map((asset) => (
                <motion.div 
                  key={asset.id} 
                  className="v5-asset-card"
                  whileHover={{ y: -8 }}
                >
                   <div className="v5-asset-preview">
                      <img src={asset.preview} alt={asset.name} />
                      <div className="v5-type-badge">{asset.type}</div>
                      
                      {/* Deep Metadata Peek */}
                      <div className="v5-metadata-overlay">
                         <div className="v5-meta-content">
                            <label>Synthesis DNA</label>
                            <p>{asset.prompt}</p>
                            <div className="v5-meta-tags">
                               <span>Seed: 42938...</span>
                               <span>v5.2 Engine</span>
                            </div>
                         </div>
                      </div>
                   </div>
                   <div className="v5-asset-info">
                      <div className="v5-main-info">
                         <h5>{asset.name}</h5>
                         <span>{asset.size}</span>
                      </div>
                      <div className="v5-asset-actions">
                         <button className="v5-icon-btn" title="Synthesize Motion"><Zap size={14} /></button>
                         <button className="v5-icon-btn" title="Download Master"><Download size={14} /></button>
                         <button className="v5-icon-btn danger" title="Neural Delete"><Trash2 size={14} /></button>
                      </div>
                   </div>
                </motion.div>
              ))}
              <div className="v5-asset-card upload-placeholder">
                 <Plus size={32} />
                 <span>Drop Masters Here</span>
              </div>
           </div>

           {/* Batch Command Bar - Appears when items selected (Mocked) */}
           <div className="batch-command-bar">
              <div className="batch-info">3 Assets Selected</div>
              <div className="batch-actions">
                 <button className="b-action"><Download size={16} /> Batch Download</button>
                 <button className="b-action danger"><Trash2 size={16} /> Delete Neural Assets</button>
              </div>
           </div>
        </motion.div>
      )}

      {/* Billing Workspace - NEW Credit Matrix & Hub */}
      {config.isBilling && (
        <motion.div className="billing-workspace" variants={itemVariants}>
          <div className="credit-matrix-v4">
             <div className="matrix-info">
                <h3><Zap size={20} /> Credit Intelligence</h3>
                <p>Synthesis engine consumption metrics for current cycle.</p>
             </div>
             <div className="matrix-stat">
                <span className="matrix-value">12,450 <span className="matrix-total">/ 15,000</span></span>
                <div className="matrix-bar-wrap">
                   <motion.div 
                     className="matrix-bar-fill" 
                     initial={{ width: 0 }}
                     animate={{ width: '85%' }}
                     transition={{ duration: 1.5, ease: "easeOut" }}
                   />
                </div>
                <span className="matrix-hint">~4,500 more text-to-video seconds available</span>
             </div>
          </div>
        </motion.div>
      )}

      {/* Category Stats */}
      <motion.div className="stats-grid" variants={containerVariants}>
        {config.stats.map((stat, idx) => (
          <motion.div key={idx} className="stat-card" variants={itemVariants}>
            <div className="stat-header">
              <span className="stat-label">{stat.label}</span>
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

