import React, { useState } from 'react'
import { 
  Image as ImageIcon, Wand2, Sparkles, LayoutGrid, 
  Layers, Maximize2, Zap, Droplets, Box, 
  Frame, Camera, Focus
} from 'lucide-react'
import OnOffButton from '../../components/common/OnOffButton'

const ImageSettings = () => {
  const [model, setModel] = useState('flux');
  const [resolution, setResolution] = useState('Standard (1024px)');
  const [faceFix, setFaceFix] = useState(true);
  const [autoUpscale, setAutoUpscale] = useState(false);
  const [smartNegative, setSmartNegative] = useState(true);
  const [safeSymmetry, setSafeSymmetry] = useState(true);
  const [stylizedWeight, setStylizedWeight] = useState(0.45);
  const [denoising, setDenoising] = useState(0.75);
  const [perspective, setPerspective] = useState('Cinematic');
  const [format, setFormat] = useState('PNG');

  return (
    <div className="settings-content-grid">
      <section className="premium-card lg:col-span-2">
        <div className="card-icon-header">
           <ImageIcon size={32} className="text-primary" />
           <div className="header-info">
             <h3 className="text-2xl font-black">Synthesis Hub</h3>
             <p className="text-sm text-slate-500">Universal engine defaults for high-fidelity image generation.</p>
           </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
           {[
             { id: 'flux', label: 'Flux v1.1 Pro', icon: Sparkles, desc: 'Recommended for realism and text.' },
             { id: 'sdxl', label: 'SD 3.5 Large', icon: Box, desc: 'Maximum creative freedom and speed.' },
             { id: 'dalle', label: 'DALL-E 3 Turbo', icon: Zap, desc: 'Highly intuitive prompt following.' }
           ].map(opt => (
             <button 
               key={opt.id}
               className={`theme-selection-card ${model === opt.id ? 'active' : ''}`}
               onClick={() => setModel(opt.id)}
             >
                <opt.icon size={20} className="mb-3" />
                <span className="font-bold block text-sm">{opt.label}</span>
                <p className="text-[9px] opacity-60 leading-tight">{opt.desc}</p>
             </button>
           ))}
        </div>
      </section>

      <section className="premium-card">
        <div className="card-icon-header">
          <Maximize2 size={24} />
          <h3>Output Scaling</h3>
        </div>
        <p className="setting-desc">Primary resolution and upscaling behavior for new renders.</p>
        <div className="grid grid-cols-1 gap-4 mt-4">
           {['Standard (1024px)', 'HD+ (2048px)', 'Ultra-Fid (4096px)'].map(res => (
             <button
               key={res}
               className={`seg-btn ${resolution === res ? 'active' : ''}`}
               onClick={() => setResolution(res)}
             >
               {res}
             </button>
           ))}
        </div>
        <div className="toggle-list mt-8">
           <div className="toggle-row">
             <label>Auto-Upscale to 4K</label>
             <OnOffButton checked={autoUpscale} onChange={setAutoUpscale} />
           </div>
        </div>
      </section>

      <section className="premium-card">
        <div className="card-icon-header">
          <Droplets size={24} />
          <h3>Diffusion Aesthetics</h3>
        </div>
        <div className="space-y-8 mt-4">
           <div className="range-wrap-aura">
             <div className="flex justify-between mb-2">
               <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Stylized Weight</label>
               <span className="radius-numerical-badge">{stylizedWeight.toFixed(2)}</span>
             </div>
             <input
               type="range" min="0" max="1" step="0.05"
               value={stylizedWeight}
               onChange={e => setStylizedWeight(parseFloat(e.target.value))}
             />
           </div>
           <div className="range-wrap-aura">
             <div className="flex justify-between mb-2">
               <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Denoising Strength</label>
               <span className="radius-numerical-badge">{denoising.toFixed(2)}</span>
             </div>
             <input
               type="range" min="0" max="1" step="0.05"
               value={denoising}
               onChange={e => setDenoising(parseFloat(e.target.value))}
             />
           </div>
        </div>
      </section>

      <section className="premium-card">
        <div className="card-icon-header">
          <Wand2 size={24} />
          <h3>Intelligent Correction</h3>
        </div>
        <div className="toggle-list space-y-4">
          <div className="toggle-row">
            <label>Neural Face-Fix (v3)</label>
            <OnOffButton checked={faceFix} onChange={setFaceFix} />
          </div>
          <div className="toggle-row">
            <label>Smart-Negative Filter</label>
            <OnOffButton checked={smartNegative} onChange={setSmartNegative} />
          </div>
          <div className="toggle-row">
            <label>Forced Anatomic Symmetry</label>
            <OnOffButton checked={safeSymmetry} onChange={setSafeSymmetry} />
          </div>
        </div>
      </section>

      <section className="premium-card">
        <div className="card-icon-header">
          <Camera size={24} />
          <h3>Default Perspective</h3>
        </div>
        <p className="setting-desc">Universal framing applied to generic prompts.</p>
        <div className="grid grid-cols-2 gap-3 mt-4">
           {['Cinematic', 'Portrait', 'Landscape', 'Macro'].map(l => (
             <button
               key={l}
               className={`seg-btn ${perspective === l ? 'active' : ''}`}
               onClick={() => setPerspective(l)}
             >
               {l}
             </button>
           ))}
        </div>
        <div className="mt-8">
           <label className="text-xs font-black uppercase text-slate-500 bg-white/5 py-1 px-3 rounded-full">Primary Format</label>
           <div className="flex gap-2 mt-4">
              {['PNG', 'WEBP', 'JPEG'].map(f => (
                <button
                  key={f}
                  className={`seg-btn ${format === f ? 'active' : ''}`}
                  onClick={() => setFormat(f)}
                >
                  {f}
                </button>
              ))}
           </div>
        </div>
      </section>
    </div>
  )
}

export default ImageSettings
