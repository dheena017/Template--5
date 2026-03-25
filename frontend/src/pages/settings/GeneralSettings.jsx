import React from 'react'
import { Sun, Moon, Palette, Type, Square, RotateCcw } from 'lucide-react'
import { useTheme } from '../../context/ThemeContext'

const GeneralSettings = () => {
  const {
    theme, setTheme, accentColor, setAccentColor, fontFamily, setFontFamily,
    borderRadius, setBorderRadius
  } = useTheme()

  const accentPresets = ['#646cff', '#ff6b6b', '#2ed573', '#00bcd4', '#f59e0b', '#a855f7']

  return (
    <div className="settings-content-grid">
      <section className="settings-card premium-card">
        <h3><Sun size={18} /> Theme Mode</h3>
        <div className="segment-row">
          <button className={`seg-btn ${theme === 'dark' ? 'active' : ''}`} onClick={() => setTheme('dark')}>Dark</button>
          <button className={`seg-btn ${theme === 'light' ? 'active' : ''}`} onClick={() => setTheme('light')}>Light</button>
        </div>
      </section>

      <section className="settings-card premium-card">
        <h3><Palette size={18} /> Accent Color</h3>
        <div className="swatch-row">
          {accentPresets.map(color => (
            <button key={color} className={`color-swatch ${accentColor === color ? 'active' : ''}`} style={{ backgroundColor: color }} onClick={() => setAccentColor(color)} />
          ))}
        </div>
      </section>

      <section className="settings-card premium-card">
        <h3><Type size={18} /> Font Family</h3>
        <select className="setting-select" value={fontFamily} onChange={e => setFontFamily(e.target.value)}>
          <option value="'Outfit', sans-serif">Outfit</option>
          <option value="'Poppins', sans-serif">Poppins</option>
          <option value="'Space Grotesk', sans-serif">Space Grotesk</option>
          <option value="'Manrope', sans-serif">Manrope</option>
        </select>
      </section>

      <section className="settings-card premium-card">
        <h3><Square size={18} /> Corner Radius</h3>
        <div className="range-wrap">
          <input type="range" min="8" max="28" value={parseInt(borderRadius)} onChange={e => setBorderRadius(`${e.target.value}px`)} />
          <span>{borderRadius}</span>
        </div>
      </section>
    </div>
  )
}

export default GeneralSettings

