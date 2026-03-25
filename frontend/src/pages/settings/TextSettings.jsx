import React from 'react'
import { FileText, Languages, MessageSquare, ListChecks, Zap } from 'lucide-react'

const TextSettings = () => {
  return (
    <div className="settings-content-grid">
      <section className="settings-card premium-card">
        <h3><Languages size={18} /> Default Translation Provider</h3>
        <p className="setting-desc">Preferred engine for full-document translation.</p>
        <div className="segment-row">
          <button className="seg-btn active">DeepL Pro</button>
          <button className="seg-btn">Google Cloud v3</button>
          <button className="seg-btn">GPT-4o Vision</button>
        </div>
      </section>

      <section className="settings-card premium-card">
        <h3><Zap size={18} /> Intelligence Level</h3>
        <p className="setting-desc">Control LLM token expenditure for creative tasks.</p>
        <select className="setting-select">
          <option>Optimized (Fast & Cheaper)</option>
          <option>Premium (Most Intelligent)</option>
        </select>
      </section>

      <section className="settings-card premium-card">
        <h3><MessageSquare size={18} /> Formatting Behavior</h3>
        <div className="toggle-row">
          <span>Auto-correct grammar</span>
          <input type="checkbox" defaultChecked />
        </div>
        <div className="toggle-row">
          <span>Preserve original layout</span>
          <input type="checkbox" defaultChecked />
        </div>
      </section>

      <section className="settings-card premium-card">
        <h3><ListChecks size={18} /> Industry Ruleset</h3>
        <p className="setting-desc">Apply specific narrative constraints for copy.</p>
        <select className="setting-select">
          <option>General Creative</option>
          <option>Marketing / Sales-Focus</option>
          <option>Technical / Engineering</option>
          <option>Academic / Formal</option>
        </select>
      </section>
    </div>
  )
}

export default TextSettings

