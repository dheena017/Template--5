import React, { useState } from 'react'
import { 
  Webhook, Plus, RefreshCw, 
  Settings, History, List, 
  CheckCircle2, AlertCircle, 
  ExternalLink, Copy, Search,
  Zap, Globe, Database,
  Eye, EyeOff, MoreVertical,
  Activity, Shield, ChevronRight
} from 'lucide-react'
import '../../styles/pages/developers/Webhooks.css'

const Webhooks = () => {
  const [showLogId, setShowLogId] = useState(null)

  const hooks = [
    { id: '1', url: 'https://api.myapp.com/webhooks/stt', event: 'speech.transcribed', status: 'Active', latency: '124ms' },
    { id: '2', url: 'https://hooks.slack.com/services/T000/B000/XXXX', event: 'project.completed', status: 'Paused', latency: '42ms' },
  ]

  const logs = [
    { id: 'L1', hook: '1', status: '200 OK', time: '12:42:01', payload: '{ "id": "p_842", "text": "Hello world" }' },
    { id: 'L2', hook: '1', status: '500 Server Error', time: '12:41:58', payload: '{ "error": "Endpoint timeout" }' },
    { id: 'L3', hook: '2', status: '200 OK', time: '12:41:42', payload: '{ "id": "p_124", "status": "done" }' },
  ]

  return (
    <div className="webhooks-container">
      <header className="webhooks-header">
        <div className="header-left">
          <h1>Webhook Endpoints</h1>
          <p>Configure and manage automated real-time alerts for your AI integrations.</p>
        </div>
        <div className="header-actions">
           <button className="primary-btn"><Plus size={18} /> Add Endpoint</button>
        </div>
      </header>

      <div className="webhooks-layout">
        <main className="webhooks-main premium-card">
           <div className="hooks-list">
              <div className="lh-head"><h3>Active Channels</h3></div>
              <div className="hooks-grid">
                {hooks.map(h => (
                  <div key={h.id} className="hook-item glass-card">
                     <div className="hook-info">
                        <strong>{h.url}</strong>
                        <div className="hook-event-badge"><Zap size={12} /> {h.event}</div>
                     </div>
                     <div className="hook-metrics">
                        <span className={`status-pill ${h.status === 'Active' ? 'ok' : 'pause'}`}>{h.status}</span>
                        <div className="latency-val">{h.latency}</div>
                        <button className="icon-btn-webhook"><Settings size={16} /></button>
                     </div>
                  </div>
                ))}
              </div>
           </div>

           <div className="delivery-logs">
              <div className="lh-head"><h3>Recent Delivery Logs</h3></div>
              <div className="logs-table">
                 <div className="log-row-hook header">
                    <span>Endpoint</span><span>Status</span><span>Event</span><span>Timestamp</span>
                 </div>
                 {logs.map(log => (
                   <div key={log.id} className="log-row-hook item">
                      <span className="log-url">.../webhooks/{log.hook}</span>
                      <span className={`log-status ${log.status.includes('200') ? 'ok' : 'err'}`}>{log.status}</span>
                      <span className="log-event">speech.transcribed</span>
                      <span className="log-ts">{log.time}</span>
                   </div>
                 ))}
              </div>
           </div>
        </main>

        <aside className="webhooks-sidebar">
           <section className="premium-card retry-policy">
              <h3>Retry Policy</h3>
              <p>Endpoints that fail to respond with a 2xx status will be retried up to <strong>15 times</strong> using an exponential backoff strategy over 24 hours.</p>
           </section>

           <section className="premium-card signature-verify">
              <h3>Webhooks Signatures</h3>
              <div className="verify-shield"><Shield size={32} /></div>
              <p>Verify that requests originate from TextAI using our HMAC signature system.</p>
              <button className="learn-more-btn">Secret Dashboard <ExternalLink size={14} /></button>
           </section>
        </aside>
      </div>
    </div>
  )
}

export default Webhooks





