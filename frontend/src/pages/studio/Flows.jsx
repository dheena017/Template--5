import React, { useState } from 'react'
import { 
  Workflow, Plus, Play, Save, 
  Settings, Trash2, ArrowRight,
  Zap, Activity, Database, Globe,
  Terminal, Shield, Layers, Sliders,
  RefreshCw, CheckCircle2, AlertCircle,
  Share2, Download, Copy, ExternalLink,
  MessageSquare, Mic, Wand2, Sparkles,
  MousePointer2, Move, Grab, ZoomIn, ZoomOut
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import '../../styles/pages/studio/Flows.css'

const Flows = () => {
  const [activeTab, setActiveTab] = useState('Editor')

  const nodes = [
    { id: 'N1', type: 'Trigger', label: 'Audio Uploaded', icon: <Mic size={18} />, pos: { x: 50, y: 150 }, status: 'ok' },
    { id: 'N2', type: 'Process', label: 'Neural Polish', icon: <Sparkles size={18} />, pos: { x: 300, y: 150 }, status: 'idle' },
    { id: 'N3', type: 'Action', label: 'Notify Webhook', icon: <Globe size={18} />, pos: { x: 550, y: 150 }, status: 'idle' }
  ]

  return (
    <div className="flows-container">
      <header className="flows-header">
        <div className="header-left">
          <h1>Workflow Designer <span className="beta-tag">Automation</span></h1>
          <p>Visually build and orchestrate complex AI-driven data pipelines.</p>
        </div>
        <div className="header-actions">
           <button className="secondary-btn"><Play size={18} /> Test Flow</button>
           <button className="primary-btn"><Save size={18} /> Save Pipeline</button>
        </div>
      </header>

      <div className="flows-workspace">
        {/* Node Library Side */}
        <aside className="node-library premium-card">
           <div className="lib-head"><h3><Plus size={18} /> Node Library</h3></div>
           <div className="lib-groups">
              <section className="lib-group">
                 <label>Triggers</label>
                 <div className="node-item-ghost">
                    <Mic size={14} /> New Audio Input
                 </div>
                 <div className="node-item-ghost">
                    <Database size={14} /> DB Entry Created
                 </div>
              </section>

              <section className="lib-group">
                 <label>Processes</label>
                 <div className="node-item-ghost active-ghost">
                    <Wand2 size={14} /> Neural Transcribe
                 </div>
                 <div className="node-item-ghost">
                    <Activity size={14} /> Sentiment Analysis
                 </div>
              </section>

              <section className="lib-group">
                 <label>Outputs</label>
                 <div className="node-item-ghost">
                    <Globe size={14} /> Webhook Request
                 </div>
                 <div className="node-item-ghost">
                    <MessageSquare size={14} /> Slack Message
                 </div>
              </section>
           </div>
        </aside>

        {/* Canvas Area */}
        <main className="canvas-main premium-card">
           <div className="canvas-toolbar">
              <div className="canvas-tools">
                 <button className="c-tool"><MousePointer2 size={18} /></button>
                 <button className="c-tool"><Move size={18} /></button>
                 <div className="v-divider" />
                 <button className="c-tool"><ZoomIn size={18} /></button>
                 <button className="c-tool"><ZoomOut size={18} /></button>
              </div>
              <div className="flow-telemetry">
                 <span>Active Nodes: <strong>3</strong></span>
                 <span>Cycle Time: <strong>1.2s</strong></span>
              </div>
           </div>

           <div className="node-canvas">
              <svg className="svg-connectors">
                 <path d="M 120 185 Q 210 185 300 185" className="wire" />
                 <path d="M 380 185 Q 460 185 550 185" className="wire-dim" />
              </svg>

              {nodes.map(n => (
                <motion.div 
                  key={n.id} 
                  className={`flow-node glass-card ${n.type.toLowerCase()}`}
                  style={{ left: n.pos.x, top: n.pos.y }}
                  whileHover={{ scale: 1.05 }}
                >
                   <div className="n-icon">{n.icon}</div>
                   <div className="n-content">
                      <span className="n-type">{n.type}</span>
                      <strong>{n.label}</strong>
                   </div>
                   <div className="n-status">
                      <div className={`status-dot ${n.status}`}></div>
                   </div>
                   <div className="anchor-right"></div>
                   <div className="anchor-left"></div>
                </motion.div>
              ))}
           </div>
           
           <div className="canvas-bg-grid"></div>
        </main>
      </div>
    </div>
  )
}

export default Flows





