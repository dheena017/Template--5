import React from 'react'
import { Info, BookOpen, CircleHelp, Activity, Sparkles, HeartPulse } from 'lucide-react'

const AboutSettings = () => {
  return (
    <div className="settings-content-grid">
      <section className="settings-card premium-card wide">
        <h3><Info size={18} /> Platform Information</h3>
        <p className="setting-desc">Detailed metadata regarding your current build and node status.</p>
        <div className="info-list">
           <div className="info-item"><span>Platform Version</span> <span>v2.8.4 Enterprise</span></div>
           <div className="info-item"><span>Build Identifier</span> <span>EF_9124_LATEST_PROD</span></div>
           <div className="info-item"><span>Cluster Node</span> <span>SG-PRO-04-12</span></div>
           <div className="info-item"><span>Engine Status</span> <span style={{color: '#10b981', fontWeight: 900}}>Operational</span></div>
           <div className="info-item"><span>Last Sync</span> <span>2m ago</span></div>
        </div>
      </section>

      <section className="settings-card premium-card">
        <h3><Activity size={18} /> Health Check</h3>
        <p className="setting-desc">Control background system health checks.</p>
        <div className="toggle-row">
          <span>Real-time Health Status</span>
          <input type="checkbox" defaultChecked />
        </div>
      </section>

      <section className="settings-card premium-card">
        <h3><Sparkles size={18} /> Early Access</h3>
        <p className="setting-desc">Opt-in to test experimental features before release.</p>
        <div className="segment-row">
          <button className="seg-btn active">Stable Only</button>
          <button className="seg-btn">Beta / Insider</button>
        </div>
      </section>

      <section className="settings-card premium-card">
        <h3><BookOpen size={18} /> Knowledge Update</h3>
        <div className="toggle-row">
           <span>Download Offline Docs</span>
           <button className="icon-btn-sm" style={{background: 'rgba(255,255,255,0.05)', border: 'none', padding: '0.2rem 0.5rem', borderRadius: '4px', cursor: 'pointer'}}>Download</button>
        </div>
      </section>
    </div>
  )
}

export default AboutSettings

