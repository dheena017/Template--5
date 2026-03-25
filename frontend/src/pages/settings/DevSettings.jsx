import React from 'react'
import { Terminal, Key, Webhook, Activity, Code2, Cpu } from 'lucide-react'

const DevSettings = () => {
  return (
    <div className="settings-content-grid">
      <section className="settings-card premium-card">
        <h3><Cpu size={18} /> API Cluster Region</h3>
        <p className="setting-desc">Preferred endpoint for production requests.</p>
        <div className="segment-row">
          <button className="seg-btn active">Auto-Optimize</button>
          <button className="seg-btn">US-East-1</button>
          <button className="seg-btn">EU-West-1</button>
        </div>
      </section>

      <section className="settings-card premium-card">
        <h3><Key size={18} /> Credentials Management</h3>
        <p className="setting-desc">Control life-cycle of your private API keys.</p>
        <div className="toggle-row">
          <span>Auto-Rotate monthly</span>
          <input type="checkbox" />
        </div>
        <div className="toggle-row">
          <span>Revoke on Breach Detection</span>
          <input type="checkbox" defaultChecked />
        </div>
      </section>

      <section className="settings-card premium-card">
        <h3><Webhook size={18} /> Webhook Verbosity</h3>
        <select className="setting-select">
          <option>Success/Errors Only</option>
          <option>Detailed Lifecycle Logs</option>
          <option>Full Raw Trace (Dev Hub)</option>
        </select>
      </section>

      <section className="settings-card premium-card">
        <h3><Activity size={18} /> Monitoring Console</h3>
        <div className="toggle-row">
          <span>Enable Real-Time Health Alerts</span>
          <input type="checkbox" defaultChecked />
        </div>
        <div className="toggle-row">
          <span>Collect Anonymous Telemetry</span>
          <input type="checkbox" />
        </div>
      </section>

      <section className="settings-card premium-card">
        <h3><Code2 size={18} /> SDK Version</h3>
        <p className="setting-desc">Manually pin your requests to a specific version.</p>
        <select className="setting-select">
          <option>Alpha (Latest - v4.5)</option>
          <option>Stable (Prod Ready - v4.1)</option>
          <option>Legacy Support (v3.8)</option>
        </select>
      </section>
    </div>
  )
}

export default DevSettings

