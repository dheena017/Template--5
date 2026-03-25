import React from 'react'
import { Clapperboard, Workflow, Target, Cpu, Clock, Zap } from 'lucide-react'

const StudioSettings = () => {
  return (
    <div className="settings-content-grid">
      <section className="settings-card premium-card">
        <h3><Cpu size={18} /> Processing Backend</h3>
        <p className="setting-desc">Preferred hardware for video and multi-modal tasks.</p>
        <div className="segment-row">
          <button className="seg-btn active">NVIDIA Cluster (Cloud)</button>
          <button className="seg-btn">Local WebGPU</button>
        </div>
      </section>

      <section className="settings-card premium-card">
        <h3><Clock size={18} /> Auto-Save Workflow</h3>
        <p className="setting-desc">Control frequency of cloud-synced backups.</p>
        <select className="setting-select">
          <option>Every 30 seconds</option>
          <option>Every 5 minutes</option>
          <option>Manual Save (Control+S)</option>
        </select>
      </section>

      <section className="settings-card premium-card">
        <h3><Target size={18} /> Preview Rendering</h3>
        <div className="range-wrap">
          <label>Resolution</label>
          <input type="range" min="360" max="1080" step="360" defaultValue="720" />
          <span>720p</span>
        </div>
      </section>

      <section className="settings-card premium-card">
        <h3><Workflow size={18} /> Production Shortcuts</h3>
        <div className="toggle-row">
          <span>Show Node Grid in Editor</span>
          <input type="checkbox" defaultChecked />
        </div>
        <div className="toggle-row">
          <span>Enable Quick-Keys (J/K/L)</span>
          <input type="checkbox" defaultChecked />
        </div>
      </section>

      <section className="settings-card premium-card">
        <h3><Zap size={18} /> Turbo Rendering</h3>
        <p className="setting-desc">Speed up exports by using multiple GPU instances simultaneously.</p>
        <div className="toggle-row">
          <span>Multi-Stream Render</span>
          <input type="checkbox" />
        </div>
      </section>
    </div>
  )
}

export default StudioSettings

