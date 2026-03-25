import React from 'react'
import { Volume2, Mic2, SlidersHorizontal, AudioLines, Headphones } from 'lucide-react'

const SpeechSettings = () => {
  return (
    <div className="settings-content-grid">
      <section className="settings-card premium-card">
        <h3><Volume2 size={18} /> Master Voice Engine</h3>
        <p className="setting-desc">The primary provider for text-to-speech synthesis.</p>
        <div className="segment-row">
          <button className="seg-btn active">ElevenLabs v2</button>
          <button className="seg-btn">Play.ht Pro</button>
          <button className="seg-btn">OpenAI TTS-1</button>
        </div>
      </section>

      <section className="settings-card premium-card">
        <h3><Mic2 size={18} /> Vocal Modulation Defaults</h3>
        <div className="range-wrap">
          <label>Speed</label>
          <input type="range" min="0.5" max="2.0" step="0.1" defaultValue="1.0" />
          <span>1.0x</span>
        </div>
        <div className="range-wrap">
          <label>Stability</label>
          <input type="range" min="0" max="100" defaultValue="75" />
          <span>75%</span>
        </div>
      </section>

      <section className="settings-card premium-card">
        <h3><SlidersHorizontal size={18} /> Global Emotional Bias</h3>
        <select className="setting-select">
          <option>Natural (Default)</option>
          <option>Excited / Energetic</option>
          <option>Calm / Soothing</option>
          <option>Serious / Professional</option>
        </select>
      </section>

      <section className="settings-card premium-card">
        <h3><Headphones size={18} /> Output Preservation</h3>
        <div className="toggle-row">
          <span>Stereo Mastering</span>
          <input type="checkbox" defaultChecked />
        </div>
        <div className="toggle-row">
          <span>Loudness Normalization</span>
          <input type="checkbox" />
        </div>
      </section>
    </div>
  )
}

export default SpeechSettings

