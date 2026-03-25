import React from 'react'
import { Bot, UserPlus, Users2, ShieldCheck, Box } from 'lucide-react'

const AvatarSettings = () => {
  return (
    <div className="settings-content-grid">
      <section className="settings-card premium-card">
        <h3><Bot size={18} /> Digital Twin Sensitivity</h3>
        <p className="setting-desc">Control lip-sync accuracy and head motion.</p>
        <div className="range-wrap">
          <input type="range" min="0" max="100" defaultValue="85" />
          <span>85%</span>
        </div>
      </section>

      <section className="settings-card premium-card">
        <h3><Users2 size={18} /> Preferred Studio Background</h3>
        <select className="setting-select">
          <option>Transparent (Broadcast Ready)</option>
          <option>Studio Green Screen (Chroma)</option>
          <option>Natural Office - Blurred</option>
          <option>Custom AI Cinematic</option>
        </select>
      </section>

      <section className="settings-card premium-card">
        <h3><UserPlus size={18} /> Avatar v3 Engine</h3>
        <div className="segment-row">
          <button className="seg-btn active">Real-Time Sync</button>
          <button className="seg-btn">High Fidelity (HQ)</button>
        </div>
      </section>

      <section className="settings-card premium-card">
        <h3><ShieldCheck size={18} /> Deepfake Protection</h3>
        <p className="setting-desc">Automatically add verifiable digital watermarks to every generation.</p>
        <div className="toggle-row">
          <span>Verifiable Watermark</span>
          <input type="checkbox" defaultChecked />
        </div>
      </section>

      <section className="settings-card premium-card">
        <h3><Box size={18} /> Project Flow</h3>
        <div className="toggle-row">
          <span>Auto-export on synthesis</span>
          <input type="checkbox" />
        </div>
      </section>
    </div>
  )
}

export default AvatarSettings

