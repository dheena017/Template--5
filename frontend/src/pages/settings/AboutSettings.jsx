import React, { useState } from 'react'
import { Info, BookOpen, CircleHelp, Activity, Sparkles, HeartPulse } from 'lucide-react'
import OnOffButton from '../../components/common/OnOffButton'

const AboutSettings = () => {
  const [healthCheck, setHealthCheck] = useState(true);
  const [releaseChannel, setReleaseChannel] = useState('stable');

  return (
    <div className="settings-content-grid">
      <section className="settings-card premium-card wide">
        <div className="card-icon-header">
          <Info size={24} />
          <h3>Platform Information</h3>
        </div>
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
        <div className="card-icon-header">
          <Activity size={24} />
          <h3>Health Check</h3>
        </div>
        <p className="setting-desc">Control background system health checks.</p>
        <div className="toggle-row">
          <span>Real-time Health Status</span>
          <OnOffButton checked={healthCheck} onChange={setHealthCheck} />
        </div>
      </section>

      <section className="settings-card premium-card">
        <div className="card-icon-header">
          <Sparkles size={24} />
          <h3>Early Access</h3>
        </div>
        <p className="setting-desc">Opt-in to test experimental features before release.</p>
        <div className="segment-row">
          <button
            className={`seg-btn ${releaseChannel === 'stable' ? 'active' : ''}`}
            onClick={() => setReleaseChannel('stable')}
          >
            Stable Only
          </button>
          <button
            className={`seg-btn ${releaseChannel === 'beta' ? 'active' : ''}`}
            onClick={() => setReleaseChannel('beta')}
          >
            Beta / Insider
          </button>
        </div>
      </section>

      <section className="settings-card premium-card">
        <div className="card-icon-header">
          <BookOpen size={24} />
          <h3>Knowledge Update</h3>
        </div>
        <div className="toggle-row">
           <span>Download Offline Docs</span>
           <button
             className="seg-btn"
             style={{ maxWidth: '120px', padding: '0.5rem 1rem', fontSize: '0.8rem' }}
             onClick={() => alert('Downloading offline docs...')}
           >
             Download
           </button>
        </div>
      </section>
    </div>
  )
}

export default AboutSettings
