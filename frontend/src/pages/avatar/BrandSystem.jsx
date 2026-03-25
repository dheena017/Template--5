import React, { useState } from 'react'
import { Palette, Upload, Plus, Sparkles, Check, Trash2, Eye } from 'lucide-react'
import { motion } from 'framer-motion'
import '../../styles/pages/avatar/BrandSystem.css'

const BrandSystem = () => {
  const [primaryColor, setPrimaryColor] = useState('#6366f1')
  const [secondaryColor, setSecondaryColor] = useState('#f59e0b')
  const [textColor, setTextColor] = useState('#ffffff')
  const [fontFamily, setFontFamily] = useState('Inter')
  const [saved, setSaved] = useState(false)
  const [logoPreview, setLogoPreview] = useState(null)

  const fonts = ['Inter', 'Outfit', 'Roboto', 'Poppins', 'Playfair Display', 'Montserrat']
  const presets = [
    { name: 'Corporate', primary: '#1e40af', secondary: '#f59e0b' },
    { name: 'Startup', primary: '#7c3aed', secondary: '#10b981' },
    { name: 'Elegant', primary: '#111827', secondary: '#d4af37' },
    { name: 'Vibrant', primary: '#ec4899', secondary: '#f97316' },
  ]

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="brand-system-page">
      <div className="bs-hero">
        <h1><Palette size={28} /> Brand System</h1>
        <p>Define your brand identity. AI will apply it automatically to all your avatar videos.</p>
      </div>

      <div className="bs-layout">
        {/* Left: Controls */}
        <div className="bs-controls">
          {/* Logo Upload */}
          <div className="bs-section premium-card">
            <h3>Logo</h3>
            <div className="bs-logo-area" onClick={() => document.getElementById('logo-inp').click()}>
              {logoPreview ? (
                <img src={logoPreview} alt="logo" className="bs-logo-preview" />
              ) : (
                <div className="bs-logo-placeholder">
                  <Upload size={28} />
                  <span>Upload Logo</span>
                  <small>PNG, SVG, 512×512px recommended</small>
                </div>
              )}
            </div>
            <input id="logo-inp" type="file" accept="image/*" style={{ display: 'none' }} onChange={e => {
              const f = e.target.files?.[0]
              if (f) setLogoPreview(URL.createObjectURL(f))
            }} />
          </div>

          {/* Colors */}
          <div className="bs-section premium-card">
            <h3>Color Palette</h3>
            <div className="bs-presets">
              {presets.map(p => (
                <div key={p.name} className="bs-preset" onClick={() => { setPrimaryColor(p.primary); setSecondaryColor(p.secondary) }}>
                  <div className="bs-preset-swatch">
                    <div style={{ background: p.primary }} />
                    <div style={{ background: p.secondary }} />
                  </div>
                  <span>{p.name}</span>
                </div>
              ))}
            </div>
            <div className="bs-color-pickers">
              <div className="bs-color-row">
                <label>Primary</label>
                <div className="bs-color-input-wrap">
                  <div className="bs-color-dot" style={{ background: primaryColor }} />
                  <input type="color" value={primaryColor} onChange={e => setPrimaryColor(e.target.value)} />
                  <span>{primaryColor}</span>
                </div>
              </div>
              <div className="bs-color-row">
                <label>Secondary</label>
                <div className="bs-color-input-wrap">
                  <div className="bs-color-dot" style={{ background: secondaryColor }} />
                  <input type="color" value={secondaryColor} onChange={e => setSecondaryColor(e.target.value)} />
                  <span>{secondaryColor}</span>
                </div>
              </div>
              <div className="bs-color-row">
                <label>Text</label>
                <div className="bs-color-input-wrap">
                  <div className="bs-color-dot" style={{ background: textColor }} />
                  <input type="color" value={textColor} onChange={e => setTextColor(e.target.value)} />
                  <span>{textColor}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Typography */}
          <div className="bs-section premium-card">
            <h3>Typography</h3>
            <div className="bs-font-grid">
              {fonts.map(f => (
                <button key={f} className={`bs-font-btn ${fontFamily === f ? 'active' : ''}`} style={{ fontFamily: f }} onClick={() => setFontFamily(f)}>
                  {fontFamily === f && <Check size={12} />} {f}
                </button>
              ))}
            </div>
          </div>

          <button className="bs-save-btn" onClick={handleSave}>
            {saved ? <><Check size={16} /> Saved!</> : <><Sparkles size={16} /> Save Brand Kit</>}
          </button>
        </div>

        {/* Right: Live Preview */}
        <div className="bs-preview premium-card">
          <div className="bs-preview-head">
            <Eye size={16} /> Live Preview
          </div>
          <div className="bs-video-mock" style={{ background: `linear-gradient(135deg, ${primaryColor}22, ${secondaryColor}11)`, borderColor: `${primaryColor}44` }}>
            <div className="bs-mock-header" style={{ background: `${primaryColor}cc` }}>
              {logoPreview ? <img src={logoPreview} alt="" className="bs-mock-logo" /> : <div className="bs-mock-logo-placeholder" />}
            </div>
            <div className="bs-mock-avatar">
              <div className="bs-mock-avatar-circle" style={{ background: primaryColor }} />
            </div>
            <div className="bs-mock-text" style={{ fontFamily, color: textColor }}>
              <div className="bs-mock-title" style={{ background: `${primaryColor}66` }} />
              <div className="bs-mock-sub" style={{ background: `${secondaryColor}44` }} />
            </div>
            <div className="bs-mock-footer" style={{ background: `${secondaryColor}99` }} />
          </div>
          <p className="bs-preview-note">This is how your brand will appear in generated videos</p>
        </div>
      </div>
    </div>
  )
}

export default BrandSystem





