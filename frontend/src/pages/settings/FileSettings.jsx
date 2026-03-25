import React from 'react'
import { HardDrive, Library, Layers, CheckCircle, Box, Trash2 } from 'lucide-react'

const FileSettings = () => {
  return (
    <div className="settings-content-grid">
      <section className="settings-card premium-card">
        <h3><HardDrive size={18} /> Storage Provider</h3>
        <p className="setting-desc">Primary location for raw and master assets.</p>
        <div className="segment-row">
          <button className="seg-btn active">Platform Cloud</button>
          <button className="seg-btn">Local Browser (Session)</button>
        </div>
      </section>

      <section className="settings-card premium-card">
        <h3><Trash2 size={18} /> Auto-Cleanup Policy</h3>
        <p className="setting-desc">Control automatic deletion of temporary renders.</p>
        <select className="setting-select">
          <option>Never delete (Manual only)</option>
          <option>After 30 days of inactivity</option>
          <option>After 7 days of inactivity</option>
          <option>Delete on project export</option>
        </select>
      </section>

      <section className="settings-card premium-card">
        <h3><Library size={18} /> Library Organization</h3>
        <div className="toggle-row">
          <span>Sort by Date (Default)</span>
          <input type="checkbox" defaultChecked />
        </div>
        <div className="toggle-row">
          <span>Group by Production Folder</span>
          <input type="checkbox" />
        </div>
      </section>

      <section className="settings-card premium-card">
        <h3><Layers size={18} /> Asset Versioning</h3>
        <p className="setting-desc">Save up to 10 previous versions of a file.</p>
        <div className="toggle-row">
          <span>Keep Version History</span>
          <input type="checkbox" defaultChecked />
        </div>
      </section>

      <section className="settings-card premium-card">
        <h3><Box size={18} /> Default Export Type</h3>
        <select className="setting-select">
          <option>MPEG-4 (Best Quality)</option>
          <option>MOV (Production Post)</option>
          <option>MKV (Multi-audio)</option>
        </select>
      </section>
    </div>
  )
}

export default FileSettings

