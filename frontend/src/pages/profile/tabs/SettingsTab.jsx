import React from 'react'
import { LayoutGrid, Maximize, Moon, Palette, Square, Sun, Type } from 'lucide-react'

const SettingsTab = ({
  theme,
  setTheme,
  accentColor,
  setAccentColor,
  fontFamily,
  setFontFamily,
  borderRadius,
  setBorderRadius,
  glassStrength,
  setGlassStrength,
  setToast
}) => {
  const accents = ['#646cff', '#2ed573', '#ff4757', '#ffa502', '#ae1af7', '#00d2d3']
  const fonts = [
    { name: 'Outfit', val: "'Outfit', sans-serif" },
    { name: 'Inter', val: "'Inter', sans-serif" },
    { name: 'Mono', val: "'Fira Code', monospace" }
  ]
  const radiuses = ['0px', '8px', '16px', '32px']

  const applyPreset = (preset) => {
    if (preset === 'Minimal') {
      setTheme('light')
      setBorderRadius('8px')
      setGlassStrength('0.05')
    }
    if (preset === 'Creator') {
      setTheme('dark')
      setBorderRadius('16px')
      setGlassStrength('0.12')
      setAccentColor('#06b6d4')
    }
    if (preset === 'Studio') {
      setTheme('dark')
      setBorderRadius('32px')
      setGlassStrength('0.2')
      setAccentColor('#22c55e')
    }
    setToast?.(`${preset} preset applied`)
  }

  return (
    <div className="tab-grid settings-grid">
      <div className="grid-col main">
        <section className="premium-card">
          <div className="section-head">
            <h3>Appearance Engine</h3>
            <Palette size={20} className="icon-burn" />
          </div>

          <div className="settings-stack">
            <div className="setting-block">
              <label>Core Interface Theme</label>
              <div className="theme-options">
                <div className={`theme-box ${theme === 'dark' ? 'active' : ''}`} onClick={() => setTheme('dark')}><Moon size={18} /> Dark</div>
                <div className={`theme-box ${theme === 'light' ? 'active' : ''}`} onClick={() => setTheme('light')}><Sun size={18} /> Light</div>
              </div>
            </div>

            <div className="setting-block">
              <label>Accent Brand Color</label>
              <div className="accent-colors">
                {accents.map((color) => (
                  <div key={color} className={`color-dot ${accentColor === color ? 'active' : ''}`} style={{ background: color }} onClick={() => setAccentColor(color)}></div>
                ))}
                <div className="color-picker-input">
                  <input type="color" value={accentColor} onChange={(e) => setAccentColor(e.target.value)} />
                  <Palette size={14} />
                </div>
              </div>
            </div>

            <div className="dual-split">
              <div className="setting-block flex-1">
                <label><Type size={14} /> Typography</label>
                <select value={fontFamily} onChange={(e) => setFontFamily(e.target.value)} className="premium-select">
                  {fonts.map((f) => <option key={f.name} value={f.val}>{f.name}</option>)}
                </select>
              </div>
              <div className="setting-block flex-1">
                <label><Square size={14} /> Card Roundness</label>
                <div className="pills-container">
                  {radiuses.map((r) => (
                    <button key={r} className={`pill ${borderRadius === r ? 'active' : ''}`} onClick={() => setBorderRadius(r)}>{r}</button>
                  ))}
                </div>
              </div>
            </div>

            <div className="setting-block">
              <label><Maximize size={14} /> Glassmorphism (Surface Opacity)</label>
              <input type="range" min="0.02" max="0.4" step="0.01" value={glassStrength} onChange={(e) => setGlassStrength(e.target.value)} className="premium-slider" />
              <div className="slider-labels"><span>Solid</span><span>Glass</span></div>
            </div>
          </div>
        </section>

        <section className="premium-card">
          <h3>Advanced Customization</h3>
          <div className="settings-stack">
            <div className="setting-row-flex">
              <div className="info"><label>Animations</label><p>Smooth transitions site-wide.</p></div>
              <input type="checkbox" defaultChecked />
            </div>
            <div className="setting-row-flex">
              <div className="info"><label>Compact Density</label><p>Higher information density for power users.</p></div>
              <input type="checkbox" defaultChecked />
            </div>
            <div className="setting-block">
              <label><LayoutGrid size={14} /> Presets</label>
              <div className="pills-container">
                {['Minimal', 'Creator', 'Studio'].map((preset) => (
                  <button key={preset} className="pill" onClick={() => applyPreset(preset)}>{preset}</button>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>

      <div className="grid-col side">
        <section className="premium-card preview-mini">
          <h3>Live Preview</h3>
          <div className="preview-card-mockup premium-card">
            <div className="mock-bar"></div>
            <div className="mock-content">
              <strong>Your New Interface</strong>
              <p>This is how cards will appear.</p>
              <button className="preview-btn">Button Accent</button>
            </div>
          </div>
        </section>

        <section className="premium-card">
          <div className="info"><label>Reset All</label><p>Restore system defaults.</p></div>
          <button className="danger-btn" onClick={() => window.location.reload()}>Restore Defaults</button>
        </section>
      </div>
    </div>
  )
}

export default SettingsTab

