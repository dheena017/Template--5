import React, { useState } from 'react'
import {
  BarChart3, Activity, Users,
  Target, Globe, Zap, ArrowUpRight,
  ArrowDownRight, Calendar, Download,
  Filter, MoreHorizontal, MousePointer2,
  Clock, Server, Cpu, Layers,
  CreditCard, Layout, Terminal
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import '../../styles/pages/developers/DevAnalytics.css'

const DevAnalytics = () => {
  const [timeRange, setTimeRange] = useState('7d')


  const bars = Array.from({ length: 48 }, (_, i) => ({
    p: ((Math.sin(i / 3) * 30 + 50) + (i * 1.5)) % 90 + 5,
    s: ((Math.cos(i / 2) * 10 + 10) + (i * 0.2)) % 15 + 1
  }))

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } }
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 25 } }
  }

  return (
    <div className="analytics-container">
      <motion.header 
        className="analytics-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="header-left">
          <h1>Platform Intelligence</h1>
          <p>Global edge analytics for API throughput, regional saturation, and computational performance.</p>
        </div>
        <div className="header-actions">
           <div className="time-select glass-card">
              <Calendar size={16} color="#818cf8" />
              <select value={timeRange} onChange={(e) => setTimeRange(e.target.value)}>
                 <option value="24h">L-24 Hours (Realtime)</option>
                 <option value="7d">Last 7 Cycles</option>
                 <option value="30d">Last 30 Cycles</option>
              </select>
           </div>
           <button className="secondary-btn" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', color: '#fff', padding: '0.6rem 1.25rem', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
             <Download size={18} /> Export L-Edge
           </button>
        </div>
      </motion.header>

      <motion.div 
        className="analytics-grid"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Metric Cards */}
        <motion.div className="metric-card premium-card" variants={cardVariants}>
            <div className="label">Network Revenue (ARR)</div>
            <div className="value">$1,242,502</div>
            <div className="trend pos">
              <ArrowUpRight size={14} /> +24.8% <span style={{ color: '#666', fontWeight: 500, marginLeft: '4px' }}>vs prev p.</span>
            </div>
            <div style={{ position: 'absolute', right: -10, top: -10, opacity: 0.03 }}>
              <CreditCard size={120} />
            </div>
        </motion.div>

        <motion.div className="metric-card premium-card" variants={cardVariants}>
            <div className="label">Active Node Developers</div>
            <div className="value">42,910</div>
            <div className="trend pos">
              <ArrowUpRight size={14} /> +8.4% <span style={{ color: '#666', fontWeight: 500, marginLeft: '4px' }}>mo/mo</span>
            </div>
            <div style={{ position: 'absolute', right: -10, top: -10, opacity: 0.03 }}>
              <Users size={120} />
            </div>
        </motion.div>

        <motion.div className="metric-card premium-card" variants={cardVariants}>
            <div className="label">Edge Uptime (SLA)</div>
            <div className="value">99.999%</div>
            <div className="trend pos">
              <Activity size={14} /> Critical <span style={{ color: '#666', fontWeight: 500, marginLeft: '4px' }}>Operational</span>
            </div>
            <div style={{ position: 'absolute', right: -10, top: -10, opacity: 0.03 }}>
              <Server size={120} />
            </div>
        </motion.div>

        <motion.div className="metric-card premium-card" variants={cardVariants}>
            <div className="label">Mean Latency (P99)</div>
            <div className="value">84.2 ms</div>
            <div className="trend neg">
              <ArrowDownRight size={14} /> -12.4 ms <span style={{ color: '#666', fontWeight: 500, marginLeft: '4px' }}>optimization</span>
            </div>
            <div style={{ position: 'absolute', right: -10, top: -10, opacity: 0.03 }}>
              <Clock size={120} />
            </div>
        </motion.div>

        {/* Main Charts Row */}
        <motion.section className="chart-section premium-card span-2" variants={cardVariants}>
           <div className="chart-head">
              <h3>Volume & Throughput (Live)</h3>
              <div className="legend">
                 <span><div className="dot p"></div> Traffic (req/s)</span>
                 <span><div className="dot s"></div> Node Errors</span>
              </div>
           </div>
           <div className="viz-canvas-main">
              {bars.map((bar, i) => (
                <div key={i} className="v-bar-group">
                  <motion.div 
                    initial={{ height: 0 }}
                    animate={{ height: `${bar.p}%` }}
                    transition={{ delay: i * 0.01 + 0.5, duration: 1 }}
                    className="v-bar p" 
                  />
                  <motion.div 
                    initial={{ height: 0 }}
                    animate={{ height: `${bar.s}%` }}
                    transition={{ delay: i * 0.01 + 0.6, duration: 1 }}
                    className="v-bar s" 
                  />
                </div>
              ))}
           </div>
        </motion.section>

        <motion.section className="geo-section premium-card" variants={cardVariants}>
           <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3 style={{ margin: 0 }}>Market Saturation</h3>
              <Globe size={18} color="#22d3ee" />
           </div>
           <div className="geo-list">
              <div className="geo-item"><span>North America (NA-West)</span> <strong>42%</strong></div>
              <div className="geo-item"><span>European Union (EU-C)</span> <strong>28%</strong></div>
              <div className="geo-item"><span>Asia Pacific (APAC)</span> <strong>18%</strong></div>
              <div className="geo-item"><span>Emerging Nodes</span> <strong>12%</strong></div>
           </div>
           <div className="viz-donut-placeholder">
              <div className="ring-inner">
                <span style={{ transform: 'rotate(-45deg)', display: 'block' }}>Global Sync</span>
              </div>
              <motion.div 
                animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3] }}
                transition={{ repeat: Infinity, duration: 3 }}
                style={{ position: 'absolute', inset: 0, border: '2px solid #818cf8', borderRadius: '50%', opacity: 0.1, margin: '-20px' }}
              />
           </div>
        </motion.section>

        <motion.section className="performance-table premium-card span-3" variants={cardVariants}>
           <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
              <h3 style={{ margin: 0 }}>Endpoint Performance Matrix</h3>
              <div style={{ display: 'flex', gap: '8px' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981' }} />
                <span style={{ fontSize: '0.75rem', fontWeight: 700, transparency: 0.6 }}>Network Operational</span>
              </div>
           </div>
           <div className="perf-table">
              <div className="p-row header">
                 <span>Operational Endpoint</span>
                 <span style={{ textAlign: 'right' }}>Edge Calls (Avg)</span>
                 <span style={{ textAlign: 'right' }}>Lat (P95)</span>
                 <span style={{ paddingLeft: '2rem' }}>Integrity</span>
              </div>
              {[
                { e: '/v1/neural/faceswap', c: '4,281/m', l: '1.24s', u: '99.98%', color: '#818cf8' },
                { e: '/v1/audio/dubbing', c: '1,204/m', l: '0.42s', u: '100.00%', color: '#c084fc' },
                { e: '/v1/vision/generate', c: '12,940/m', l: '0.05s', u: '100.00%', color: '#22d3ee' },
                { e: '/v1/text/synthesize', c: '8,412/m', l: '0.12s', u: '99.94%', color: '#fbbf24' },
              ].map((p, idx) => (
                <motion.div 
                  key={p.e} 
                  className="p-row"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 + idx * 0.1 }}
                >
                   <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                     <div style={{ width: '3px', height: '20px', background: p.color, borderRadius: '2px' }} />
                     <span className="code-font">{p.e}</span>
                   </div>
                   <strong style={{ textAlign: 'right' }}>{p.c}</strong>
                   <span className="latency" style={{ textAlign: 'right', fontWeight: 700, color: '#fafafa' }}>{p.l}</span>
                   <div style={{ paddingLeft: '2rem' }}>
                     <span className="uptime tag-ok" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                       <Zap size={12} fill="currentColor" /> {p.u}
                     </span>
                   </div>
                </motion.div>
              ))}
           </div>
        </motion.section>

        <motion.div className="metric-card premium-card" variants={cardVariants} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', background: 'linear-gradient(135deg, rgba(129, 140, 248, 0.1) 0%, rgba(236, 72, 153, 0.1) 100%)' }}>
            <div className="label">Intelligence Engine</div>
            <div style={{ position: 'relative', marginTop: '1rem' }}>
              <Cpu size={48} color="#818cf8" />
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 4, ease: 'linear' }}
                style={{ position: 'absolute', inset: -10, border: '2px dashed #818cf8', borderRadius: '50%', opacity: 0.3 }}
              />
            </div>
            <p style={{ fontSize: '0.75rem', textAlign: 'center', color: '#888', marginTop: '1.5rem', fontWeight: 600 }}>v4.2.1-Stable Node</p>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default DevAnalytics
