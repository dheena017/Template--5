import React, { useState } from 'react'
import './SettingsUniversal.css'
import { Share2, Globe, MessageSquare, HeartPulse, UserPlus } from 'lucide-react'
import OnOffButton from '../../components/common/OnOffButton'

const SocialSettings = () => {
  const [visibility, setVisibility] = useState('private');
  const [autoPostTwitter, setAutoPostTwitter] = useState(false);
  const [discordNotify, setDiscordNotify] = useState(true);
  const [premiumSupport, setPremiumSupport] = useState(true);
  const [orgPolicy, setOrgPolicy] = useState('admin');

  return (
    <div className="settings-content-grid">
      <section className="settings-card premium-card">
        <div className="card-icon-header">
          <Share2 size={24} />
          <h3>Community Visibility</h3>
        </div>
        <p className="setting-desc">Control how others see your productions in the hub.</p>
        <div className="segment-row">
          <button
            className={`seg-btn ${visibility === 'private' ? 'active' : ''}`}
            onClick={() => setVisibility('private')}
          >
            Private (Only Me)
          </button>
          <button
            className={`seg-btn ${visibility === 'public' ? 'active' : ''}`}
            onClick={() => setVisibility('public')}
          >
            Public Hub (Live)
          </button>
          <button
            className={`seg-btn ${visibility === 'org' ? 'active' : ''}`}
            onClick={() => setVisibility('org')}
          >
            Organization Hub
          </button>
        </div>
      </section>

      <section className="settings-card premium-card">
        <div className="card-icon-header">
          <Globe size={24} />
          <h3>Network Integrations</h3>
        </div>
        <p className="setting-desc">Auto-syndicate your exported media to active accounts.</p>
        <div className="toggle-list space-y-4 mt-4">
          <div className="toggle-row">
            <label>Auto-post to Twitter/X</label>
            <OnOffButton checked={autoPostTwitter} onChange={setAutoPostTwitter} />
          </div>
          <div className="toggle-row">
            <label>Discord Notification on Flow Success</label>
            <OnOffButton checked={discordNotify} onChange={setDiscordNotify} />
          </div>
        </div>
      </section>

      <section className="settings-card premium-card">
        <div className="card-icon-header">
          <MessageSquare size={24} />
          <h3>Direct Support</h3>
        </div>
        <p className="setting-desc">Enable priority support routing for your account.</p>
        <div className="toggle-row mt-4">
          <label>Premium Support Dashboard</label>
          <OnOffButton checked={premiumSupport} onChange={setPremiumSupport} />
        </div>
      </section>

      <section className="settings-card premium-card">
        <div className="card-icon-header">
          <UserPlus size={24} />
          <h3>Organization Policy</h3>
        </div>
        <p className="setting-desc">Define collaboration rules for your team workspace.</p>
        <select
          className="setting-select mt-4"
          value={orgPolicy}
          onChange={e => setOrgPolicy(e.target.value)}
        >
          <option value="admin">Admin Approval Required</option>
          <option value="open">Open Collaboration</option>
          <option value="readonly">Review Only (No Edits)</option>
        </select>
      </section>
    </div>
  )
}

export default SocialSettings
