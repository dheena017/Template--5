import React from 'react'
import { Share2, Globe, MessageSquare, HeartPulse, UserPlus } from 'lucide-react'

const SocialSettings = () => {
  return (
    <div className="settings-content-grid">
      <section className="settings-card premium-card">
        <h3><Share2 size={18} /> Community Visibility</h3>
        <p className="setting-desc">Control how others see your productions in the hub.</p>
        <div className="segment-row">
          <button className="seg-btn active">Private (Only Me)</button>
          <button className="seg-btn">Public Hub (Live)</button>
          <button className="seg-btn">Organization Hub</button>
        </div>
      </section>

      <section className="settings-card premium-card">
        <h3><Globe size={18} /> Network Integrations</h3>
        <p className="setting-desc">Auto-syndicate your exported media to active accounts.</p>
        <div className="toggle-row">
          <span>Auto-post to Twitter/X</span>
          <input type="checkbox" />
        </div>
        <div className="toggle-row">
          <span>Discord Notification on Flow Success</span>
          <input type="checkbox" defaultChecked />
        </div>
      </section>

      <section className="settings-card premium-card">
        <h3><MessageSquare size={18} /> Direct Support</h3>
        <p className="setting-desc">Enable priority support routing for your account.</p>
        <div className="toggle-row">
          <span>Premium Support Dashboard</span>
          <input type="checkbox" defaultChecked />
        </div>
      </section>

      <section className="settings-card premium-card">
        <h3><UserPlus size={18} /> Organization Policy</h3>
        <select className="setting-select">
          <option>Admin Approval Required</option>
          <option>Open Collaboration</option>
          <option>Review Only (No Edits)</option>
        </select>
      </section>
    </div>
  )
}

export default SocialSettings

