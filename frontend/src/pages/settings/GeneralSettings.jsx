import React from 'react'
import { motion } from 'framer-motion'
import { 
  Sun, Moon, Palette, Type, RotateCcw, Monitor, Laptop, 
  Wind, Zap, Info, Sparkles, Layers, Box, Eye
} from 'lucide-react'
import { useTheme } from '../../context/ThemeContext'
import OnOffButton from '../../components/common/OnOffButton'

const GeneralSettings = () => {
  const {
    theme, setTheme, accentColor, setAccentColor, fontFamily, setFontFamily,
    borderRadius, setBorderRadius, glassStrength, setGlassStrength,
    animationsEnabled, setAnimationsEnabled, neonGlows, setNeonGlows,
    noiseOverlay, setNoiseOverlay, auraBackground, setAuraBackground
  } = useTheme()

  const accentPresets = [
    { name: 'Amethyst', color: '#8b5cf6' },
    { name: 'Cyan', color: '#06b6d4' },
    { name: 'Emerald', color: '#10b981' },
    { name: 'Amber', color: '#f59e0b' },
    { name: 'Ruby', color: '#ef4444' },
    { name: 'Rose', color: '#ec4899' }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { staggerChildren: 0.1 } 
    }
  }

  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: 'easeOut' } }
  }

  return (
    <motion.div 
      className="settings-content-grid"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* 1. Theme Selection */}
      <motion.section className="premium-card lg:col-span-2" variants={cardVariants}>
        <div className="card-icon-header">
           <Monitor size={32} className="text-primary" />
           <div className="header-info">
             <h3 className="text-2xl font-black">Environment Core</h3>
             <p className="text-sm text-slate-500">Universal theme engine for the entire Aura ecosystem.</p>
           </div>
        </div>
        
        <div className="flex flex-wrap gap-8 mt-4">
           {[
             { id: 'dark', label: 'Deep Space', icon: Moon, desc: 'Optimized for high-contrast focus and low-light environments.' },
             { id: 'light', label: 'Solar Bloom', icon: Sun, desc: 'High legibility and vibrant energy for daylight productivity.' },
             { id: 'system', label: 'Auto sync', icon: Laptop, desc: 'Dynamic synchronization with your hardware OS preference.' }
           ].map(opt => (
             <button 
               key={opt.id}
               className={`theme-selection-card ${theme === opt.id ? 'active' : ''}`}
               onClick={() => setTheme(opt.id)}
             >
                <opt.icon size={24} className="mb-4" />
                <span className="font-bold block mb-1">{opt.label}</span>
                <p className="text-[10px] text-slate-500 leading-tight">{opt.desc}</p>
             </button>
           ))}
        </div>
      </motion.section>

      {/* 2. Animation & Motion Controls */}
      <motion.section className="premium-card" variants={cardVariants}>
         <div className="card-icon-header">
           <Wind size={24} />
           <h3>UI Motion & Physics</h3>
         </div>
         <p className="setting-desc">Control the intensity and frequency of interface animations.</p>
         
         <div className="toggle-list space-y-4 mt-4">
            <div className="toggle-row">
              <label>Enable Global Animations</label>
              <OnOffButton checked={animationsEnabled} onChange={setAnimationsEnabled} />
            </div>
            <div className="toggle-row">
              <label>Ambient Aura Pulsing</label>
              <OnOffButton checked={auraBackground} onChange={setAuraBackground} />
            </div>
            <div className="toggle-row">
               <label>Volumetric Shadow Pulls</label>
               <OnOffButton checked={true} onChange={() => {}} />
            </div>
         </div>
         <p className="text-[10px] italic text-slate-500 mt-4">Disabling animations can improve performance on legacy hardware.</p>
      </motion.section>

      {/* 3. Visual FX & Textures */}
      <motion.section className="premium-card" variants={cardVariants}>
         <div className="card-icon-header">
           <Sparkles size={24} />
           <h3>Aura FX Engine</h3>
         </div>
         <p className="setting-desc">Advanced stylistic overlays for a premium hyper-modern feel.</p>
         
         <div className="toggle-list space-y-4 mt-4">
            <div className="toggle-row">
               <label>Hyper-Neon Glows</label>
               <OnOffButton checked={neonGlows} onChange={setNeonGlows} />
            </div>
            <div className="toggle-row">
               <label>Film-Grain Overlays</label>
               <OnOffButton checked={noiseOverlay} onChange={setNoiseOverlay} />
            </div>
            <div className="range-wrap-aura mt-4">
               <div className="flex justify-between items-center mb-2">
                 <label className="text-xs font-bold text-slate-400 uppercase">Glassmorphism Strength</label>
                 <span className="radius-numerical-badge">{Math.round(glassStrength * 100)}%</span>
               </div>
               <input 
                 type="range" 
                 min="0.05" 
                 max="0.4" 
                 step="0.01" 
                 value={glassStrength} 
                 onChange={e => setGlassStrength(parseFloat(e.target.value))} 
               />
            </div>
         </div>
      </motion.section>

      {/* 4. Accent Color */}
      <motion.section className="premium-card" variants={cardVariants}>
        <div className="card-icon-header">
          <Palette size={24} />
          <h3>Aura Identity</h3>
        </div>
        <p className="setting-desc">Universal brand color applied to all interactive elements.</p>
        <div className="swatch-row mt-4">
          {accentPresets.map(preset => (
            <div key={preset.color} className="flex flex-col items-center gap-3">
              <button 
                className={`color-swatch-v2 ${accentColor === preset.color ? 'active' : ''}`} 
                style={{ backgroundColor: preset.color }} 
                onClick={() => setAccentColor(preset.color)} 
              />
              <span className="text-[9px] font-black uppercase text-slate-600 tracking-widest">{preset.name}</span>
            </div>
          ))}
        </div>
      </motion.section>

      {/* 5. Typography Foundry */}
      <motion.section className="premium-card" variants={cardVariants}>
        <div className="card-icon-header">
          <Type size={24} />
          <h3>Type Foundry</h3>
        </div>
        <p className="setting-desc">Universal font scale for optimized readability.</p>
        <div className="space-y-6 mt-4">
          <select className="setting-select" value={fontFamily} onChange={e => setFontFamily(e.target.value)}>
            <option value="'Outfit', sans-serif">Outfit (Precision)</option>
            <option value="'Space Grotesk', sans-serif">Space Grotesk (Neo-Future)</option>
            <option value="'Inter', sans-serif">Inter (Standard)</option>
            <option value="'Manrope', sans-serif">Manrope (Modernist)</option>
          </select>
          
          <div className="font-preview-area p-8 bg-black/40 border border-white/5 rounded-2xl flex items-center justify-center">
             <span style={{ fontFamily, fontSize: '1.5rem', fontWeight: 900, letterSpacing: '-0.05em' }}>Aura Creative Engine</span>
          </div>
        </div>
      </motion.section>

      {/* 6. Border Radius */}
      <motion.section className="premium-card lg:col-span-2" variants={cardVariants}>
        <div className="flex justify-between items-start mb-4">
          <div className="card-icon-header">
            <RotateCcw size={24} />
            <h3>Interface Sculpting</h3>
          </div>
          <span className="radius-numerical-badge">{borderRadius}</span>
        </div>
        
        <div className="range-wrap-aura">
          <input 
            type="range" 
            min="0" 
            max="40" 
            step="4"
            value={parseInt(borderRadius)} 
            onChange={e => setBorderRadius(`${e.target.value}px`)} 
          />
          <div className="flex justify-between text-[10px] uppercase font-black text-slate-500 tracking-widest mt-4">
            <span>Sharp Edge</span>
            <span>Brutalism</span>
            <span>Ultra Fluid</span>
          </div>
        </div>
      </motion.section>
    </motion.div>
  )
}

export default GeneralSettings
