import React from 'react'
import { 
  Terminal, Activity, Shield, Key, 
  Webhook, BarChart3, ListOrdered, 
  Server, Cpu, Database, Globe,
  RefreshCw, CheckCircle2, AlertCircle,
  Clock, Download, Copy, ExternalLink,
  Code, HardDrive, Smartphone, Zap
} from 'lucide-react'
import '../../styles/pages/developers/DevOverview.css'

const DevOverview = () => {
   const usageBars = Array.from({ length: 24 }, (_, i) => ((i * 13 + 19) % 80) + 20)

  const services = [
    { name: 'Neural Engine 3.0', status: 'Online', latency: '124ms', load: '12%' },
    { name: 'Transcription S1', status: 'Online', latency: '42ms', load: '4%' },
    { name: 'Voice Lab HQ', status: 'Warning', latency: '850ms', load: '92%' }
  ]

  return (
    <div className="dev-container">
      <header className="dev-header">
        <div className="header-left">
          <h1>Developer Console</h1>
          <p>Monitor your AI infrastructure, API health, and integration tokens.</p>
        </div>
        <div className="header-actions">
           <button className="secondary-btn"><RefreshCw size={18} /> Refresh Metrics</button>
           <button className="primary-btn"><Key size={18} /> Credentials</button>
        </div>
      </header>

      <div className="dev-layout">
        {/* Main Console Stats */}
        <main className="dev-main">
           <section className="stats-marquee">
              <div className="stat-card premium-card">
                 <div className="stat-label">Total API Calls (24h)</div>
                 <div className="stat-value">1,245,802</div>
                 <div className="stat-trend positive">+12.4% <Activity size={12} /></div>
              </div>
              <div className="stat-card premium-card">
                 <div className="stat-label">Avg. Latency</div>
                 <div className="stat-value">142ms</div>
                 <div className="stat-trend negative">+8ms <Activity size={12} /></div>
              </div>
              <div className="stat-card premium-card">
                 <div className="stat-label">Compute Hours</div>
                 <div className="stat-value">842.5h</div>
                 <div className="stat-trend positive">+5.2% <Activity size={12} /></div>
              </div>
           </section>

           <div className="console-split">
              <section className="service-health premium-card flex-1">
                 <div className="section-head">
                    <h3>Service Infrastructure</h3>
                    <span className="live-pill">Live</span>
                 </div>
                 <div className="service-list">
                    {services.map(s => (
                      <div key={s.name} className="service-row">
                         <div className="s-info">
                            <div className={`s-dot ${s.status === 'Online' ? 'ok' : 'warn'}`}></div>
                            <strong>{s.name}</strong>
                         </div>
                         <div className="s-metrics">
                            <div className="metric"><span>Latency</span> <strong>{s.latency}</strong></div>
                            <div className="metric"><span>Load</span> <strong>{s.load}</strong></div>
                         </div>
                      </div>
                    ))}
                 </div>
              </section>

              <section className="usage-chart premium-card flex-1">
                 <h3>Token Usage (Hourly)</h3>
                 <div className="viz-mini-graph">
                              {usageBars.map((height, i) => (
                                 <div key={i} className="v-bar" style={{height: `${height}%`}}></div>
                    ))}
                 </div>
              </section>
           </div>

           <section className="recent-logs premium-card">
              <div className="section-head">
                 <h3>Live Request Log</h3>
                 <button className="text-btn">View All Logs</button>
              </div>
              <div className="log-table">
                 <div className="log-row header">
                    <span>Method</span><span>Endpoint</span><span>Status</span><span>Timestamp</span>
                 </div>
                 {[
                   { m: 'POST', e: '/v1/voices/synth', s: '200', t: '12:42:01' },
                   { m: 'GET', e: '/v1/projects/active', s: '200', t: '12:41:58' },
                   { m: 'POST', e: '/v1/transcribe/file', s: '201', t: '12:41:42' },
                 ].map((log, i) => (
                   <div key={i} className="log-row">
                      <span className={`method ${log.m}`}>{log.m}</span>
                      <span className="endpoint">{log.e}</span>
                      <span className="status">OK {log.s}</span>
                      <span className="ts">{log.t}</span>
                   </div>
                 ))}
              </div>
           </section>
        </main>

        {/* Technical Side Rail */}
        <aside className="dev-sidebar">
           <section className="premium-card quick-links">
              <h3>Documentation</h3>
              <div className="doc-links">
                 <div className="doc-item"><Code size={14} /> Python SDK <ExternalLink size={12} /></div>
                 <div className="doc-item"><Code size={14} /> Node.js SDK <ExternalLink size={12} /></div>
                 <div className="doc-item"><Terminal size={14} /> CLI Tooling <ExternalLink size={12} /></div>
              </div>
           </section>

           <section className="premium-card api-status">
              <h3>System Resource</h3>
              <div className="resource-list">
                 <div className="res-item">
                    <div className="label"><span>CPU Usage</span> <strong>42%</strong></div>
                    <div className="progress-bar"><div className="fill" style={{width: '42%'}}></div></div>
                 </div>
                 <div className="res-item">
                    <div className="label"><span>Storage</span> <strong>8/100TB</strong></div>
                    <div className="progress-bar"><div className="fill" style={{width: '8%'}}></div></div>
                 </div>
              </div>
           </section>
        </aside>
      </div>
    </div>
  )
}

export default DevOverview





