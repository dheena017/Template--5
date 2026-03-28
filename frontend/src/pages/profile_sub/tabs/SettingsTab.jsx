import React from 'react'
import '../../../styles/pages/profile/Settings.css'
import { LayoutGrid, Maximize, Moon, Palette, Square, Sun, Type, Sparkles, ExternalLink, Zap, RefreshCw, MapPin, Globe, Mail, Link as LinkIcon } from 'lucide-react'

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
  animationsEnabled,
  setAnimationsEnabled,
  neonGlows,
  setNeonGlows,
  noiseOverlay,
  setNoiseOverlay,
  auraBackground,
  setAuraBackground,
  setToast,
  profileDraft,
  handleDraftChange
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
          <div className="section-head">
            <h3>Advanced Customization</h3>
              <div className="flex items-center gap-2 text-[10px] text-muted-secondary uppercase tracking-widest font-bold">
                <Sparkles size={12} className="text-secondary" /> Cinematic Engine
              </div>
            </div>
          <div className="settings-stack advanced-controls">
            <div className="setting-row-flex">
              <div className="info">
                <label><Zap size={14} className="text-secondary" /> Fluid Animations <span className="setting-badge motion">Motion</span></label>
                <p>Silky transitions for page fades and component entries. Disabling this optimizes performance on low-power devices.</p>
              </div>
              <div 
                className={`toggle-switch ${animationsEnabled ? 'on' : 'off'}`}
                onClick={() => {
                  setAnimationsEnabled(!animationsEnabled);
                  setToast?.(!animationsEnabled ? 'Animations active' : 'Performance mode active');
                }}
              >
                <span className="toggle-text-on">ON</span>
                <span className="toggle-text-off">OFF</span>
                <div className="toggle-thumb" />
              </div>
            </div>
            
            <div className="setting-row-flex">
              <div className="info">
                <label><Sparkles size={14} className="text-accent" /> Aura Neon Glow <span className="setting-badge visual">Visual</span></label>
                <p>Enables ultra-soft light bloom and vibrant shadows for cards. Disabling this creates a clean, flat aesthetic.</p>
              </div>
              <div 
                className={`toggle-switch ${neonGlows ? 'on' : 'off'}`}
                onClick={() => {
                  setNeonGlows(!neonGlows);
                  setToast?.(!neonGlows ? 'Neon glows enabled' : 'Clean aesthetic active');
                }}
              >
                <span className="toggle-text-on">ON</span>
                <span className="toggle-text-off">OFF</span>
                <div className="toggle-thumb" />
              </div>
            </div>

            <div className="setting-row-flex">
              <div className="info">
                <label><Palette size={14} className="text-muted" /> Organic Noise Overlay <span className="setting-badge texture">Texture</span></label>
                <p>Applies a subtle film-grain texture to the interface, giving surfaces a professional, physical, "analog" studio feel.</p>
              </div>
              <div 
                className={`toggle-switch ${noiseOverlay ? 'on' : 'off'}`}
                onClick={() => {
                  setNoiseOverlay(!noiseOverlay);
                  setToast?.(!noiseOverlay ? 'Grain texture applied' : 'Solid colors restored');
                }}
              >
                <span className="toggle-text-on">ON</span>
                <span className="toggle-text-off">OFF</span>
                <div className="toggle-thumb" />
              </div>
            </div>

            <div className="setting-row-flex">
              <div className="info">
                <label><Maximize size={14} className="text-secondary" /> Cinematic Backdrop <span className="setting-badge atmosphere">Atmosphere</span></label>
                <p>Activates the multi-axis "Aura Orbs" in the background. Disabling this clears the visual field for focused creative tasks.</p>
              </div>
              <div 
                className={`toggle-switch ${auraBackground ? 'on' : 'off'}`}
                onClick={() => {
                  setAuraBackground(!auraBackground);
                  setToast?.(!auraBackground ? 'Atmosphere enabled' : 'Clean background active');
                }}
              >
                <span className="toggle-text-on">ON</span>
                <span className="toggle-text-off">OFF</span>
                <div className="toggle-thumb" />
              </div>
            </div>
          </div>
        </section>

        <section className="premium-card">
          <div className="section-head">
            <h3>Digital Identity</h3>
            <div className="flex items-center gap-2 text-[10px] text-muted-secondary uppercase tracking-widest font-bold">
              <Globe size={12} className="text-secondary" /> Network Hub
            </div>
          </div>
          <div className="settings-stack">
            <div className="setting-block">
              <label><LinkIcon size={14} /> GitHub Identifier</label>
              <div className="flex gap-3">
                <input 
                  className="premium-input flex-1" 
                  placeholder="github.com/yourname" 
                  value={profileDraft.github_url || ''} 
                  onChange={(e) => handleDraftChange('github_url', e.target.value)} 
                />
                <button className="action-icon-btn" onClick={() => window.open(profileDraft.github_url, '_blank')}>
                  <ExternalLink size={16} />
                </button>
              </div>
            </div>
            <div className="setting-block mt-4">
              <label><Globe size={14} /> Portfolio Showcase</label>
              <div className="flex gap-3">
                <input 
                  className="premium-input flex-1" 
                  placeholder="https://yourportfolio.com" 
                  value={profileDraft.portfolio_url || ''} 
                  onChange={(e) => handleDraftChange('portfolio_url', e.target.value)} 
                />
                <button className="action-icon-btn" onClick={() => window.open(profileDraft.portfolio_url, '_blank')}>
                  <ExternalLink size={16} />
                </button>
              </div>
            </div>
            <div className="setting-block mt-4">
              <label><Mail size={14} /> Contact Ecosystem Email</label>
              <div className="flex gap-3">
                <input 
                  className="premium-input flex-1" 
                  placeholder="email@example.com" 
                  value={profileDraft.email || ''} 
                  onChange={(e) => handleDraftChange('email', e.target.value)} 
                />
                <button className="action-icon-btn" onClick={() => window.open(`mailto:${profileDraft.email}`, '_blank')}>
                  <ExternalLink size={16} />
                </button>
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
          <div className="section-head mb-4">
            <div className="info">
              <label className="text-danger flex items-center gap-2">Danger Zone</label>
              <h3>Reset All</h3>
              <p className="text-muted text-sm mt-1">Restore all platform settings to system defaults. This action is permanent.</p>
            </div>
          </div>
          <button className="danger-btn mt-4" onClick={() => window.location.reload()}>
            <RefreshCw size={16} /> Restore Defaults
          </button>
        </section>
      </div>
    </div>
  )
}

export default SettingsTab

