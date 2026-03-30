import React, { useState } from 'react'
import './SettingsUniversal.css'
import { 
  Bot, Users2, ShieldCheck, Box, 
  Layers, Smile, Video, Monitor, 
  Cpu, Lock, Fingerprint, Camera
} from 'lucide-react'
import OnOffButton from '../../components/common/OnOffButton'

const AvatarSettings = () => {
  const [lipSync, setLipSync] = useState(85);
  const [headLatency, setHeadLatency] = useState(12);
  const [virtualStudio, setVirtualStudio] = useState('Transparent Alpha');
  const [headMotion, setHeadMotion] = useState(true);
  const [eyeContact, setEyeContact] = useState(true);
  const [microExpressions, setMicroExpressions] = useState(true);
  const [c2pa, setC2pa] = useState(true);
  const [invisibleMark, setInvisibleMark] = useState(true);
  const [cryptoTag, setCryptoTag] = useState(true);
  const [enginePriority, setEnginePriority] = useState('ultra');
  const [autoExport, setAutoExport] = useState(false);
  const [notifyRender, setNotifyRender] = useState(true);

  return (
    <div className="settings-content-grid">
      <section className="premium-card lg:col-span-2">
        <div className="card-icon-header">
           <Bot size={32} className="text-primary" />
           <div className="header-info">
             <h3 className="text-2xl font-black">Neural Performer Core</h3>
             <p className="text-sm text-slate-500">Universal calibration for AI actor movement and lip-sync fidelity.</p>
           </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-8">
           <div className="range-wrap-aura">
             <div className="flex justify-between mb-4">
               <label className="text-sm font-bold">Lip-Sync Precision</label>
               <span className="radius-numerical-badge">{lipSync}%</span>
             </div>
             <input
               type="range" min="0" max="100"
               value={lipSync}
               onChange={e => setLipSync(Number(e.target.value))}
             />
             <p className="text-[10px] text-slate-500 mt-4 leading-relaxed">Higher precision increases GPU rendering time but eliminates vocal artifacts.</p>
           </div>
           <div className="range-wrap-aura">
             <div className="flex justify-between mb-4">
               <label className="text-sm font-bold">Head Posture Latency</label>
               <span className="radius-numerical-badge">{headLatency}ms</span>
             </div>
             <input
               type="range" min="5" max="50"
               value={headLatency}
               onChange={e => setHeadLatency(Number(e.target.value))}
             />
             <p className="text-[10px] text-slate-500 mt-4 leading-relaxed">Lower latency produces more organic, fluid head movements.</p>
           </div>
        </div>
      </section>

      <section className="premium-card">
        <div className="card-icon-header">
          <Users2 size={24} />
          <h3>Virtual Studio</h3>
        </div>
        <p className="setting-desc">Primary world-engine for actor composite rendering.</p>
        <div className="space-y-4 mt-4">
           {['Transparent Alpha', 'Pro Green-Key', 'Cinematic Unreal 5', 'Gaussian Splat Blur'].map(studio => (
             <button
               key={studio}
               className={`seg-btn ${virtualStudio === studio ? 'active' : ''}`}
               onClick={() => setVirtualStudio(studio)}
             >
               {studio}
             </button>
           ))}
        </div>
      </section>

      <section className="premium-card">
        <div className="card-icon-header">
          <Smile size={24} />
          <h3>Behavioral Biometrics</h3>
        </div>
        <div className="toggle-list space-y-4 mt-4">
           <div className="toggle-row">
             <label>Dynamic Head Motion</label>
             <OnOffButton checked={headMotion} onChange={setHeadMotion} />
           </div>
           <div className="toggle-row">
             <label>Predictive Eye-Contact</label>
             <OnOffButton checked={eyeContact} onChange={setEyeContact} />
           </div>
           <div className="toggle-row">
             <label>Micro-Expression Pulses</label>
             <OnOffButton checked={microExpressions} onChange={setMicroExpressions} />
           </div>
        </div>
      </section>

      <section className="premium-card">
        <div className="card-icon-header">
          <Fingerprint size={24} />
          <h3>Ethics &amp; Identity</h3>
        </div>
        <p className="setting-desc">Universal protective layers for verified AI creation.</p>
        <div className="toggle-list space-y-4 mt-4">
          <div className="toggle-row">
            <label>C2PA Metadata</label>
            <OnOffButton checked={c2pa} onChange={setC2pa} />
          </div>
          <div className="toggle-row">
            <label>Invisible Watermark</label>
            <OnOffButton checked={invisibleMark} onChange={setInvisibleMark} />
          </div>
          <div className="toggle-row">
            <label>Cryptographic Tagging</label>
            <OnOffButton checked={cryptoTag} onChange={setCryptoTag} />
          </div>
        </div>
      </section>

      <section className="premium-card">
        <div className="card-icon-header">
          <Cpu size={24} />
          <h3>Engine Performance</h3>
        </div>
        <p className="setting-desc">Universal priority defaults for synthesis tasks.</p>
        <select
          className="setting-select mt-4"
          value={enginePriority}
          onChange={e => setEnginePriority(e.target.value)}
        >
          <option value="ultra">Priority: Ultra High (Fastest)</option>
          <option value="standard">Priority: Standard (Eco)</option>
          <option value="accurate">Priority: High Accuracy (Wait)</option>
        </select>
        <div className="toggle-list mt-8">
           <div className="toggle-row">
             <label>Notify on Completion</label>
             <OnOffButton checked={notifyRender} onChange={setNotifyRender} />
           </div>
        </div>
      </section>
    </div>
  )
}

export default AvatarSettings
