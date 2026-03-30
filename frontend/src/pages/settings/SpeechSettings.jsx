import React, { useState } from 'react'
import './SettingsUniversal.css'
import { 
  Volume2, Mic2, SlidersHorizontal, AudioLines, Headphones, 
  Zap, Activity, Music, Radio, Waves
} from 'lucide-react'
import OnOffButton from '../../components/common/OnOffButton'

const SpeechSettings = () => {
  const [provider, setProvider] = useState('eleven');
  const [stereo, setStereo] = useState(true);
  const [normalization, setNormalization] = useState(false);
  const [smartBreathing, setSmartBreathing] = useState(true);
  const [echoRemoval, setEchoRemoval] = useState(true);
  const [retryWebhooks, setRetryWebhooks] = useState(true);
  const [pace, setPace] = useState(75);
  const [clarity, setClarity] = useState(92);
  const [narrativeIntent, setNarrativeIntent] = useState('natural');
  const [acousticEnv, setAcousticEnv] = useState('Studio');

  return (
    <div className="settings-content-grid">
      <section className="premium-card lg:col-span-2">
        <div className="card-icon-header">
           <Volume2 size={32} className="text-primary" />
           <div className="header-info">
             <h3 className="text-2xl font-black">Neural Vocal Core</h3>
             <p className="text-sm text-slate-500">Master synthesis engine for all voice-driven interactions.</p>
           </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
           {[
             { id: 'eleven', label: 'ElevenLabs v2', icon: Waves, desc: 'Industry-leading clarity and emotion.' },
             { id: 'playht', label: 'Play.ht Pro', icon: Radio, desc: 'Optimized for long-form narration.' },
             { id: 'openai', label: 'OpenAI TTS-1', icon: Zap, desc: 'Ultra-fast low-latency responses.' }
           ].map(opt => (
             <button 
               key={opt.id}
               className={`theme-selection-card ${provider === opt.id ? 'active' : ''}`}
               onClick={() => setProvider(opt.id)}
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
          <Activity size={24} />
          <h3>Dynamic Modulation</h3>
        </div>
        <div className="space-y-8 mt-4">
           <div className="range-wrap-aura">
             <div className="flex justify-between mb-2">
               <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Pace Stability</label>
               <span className="radius-numerical-badge">{pace}%</span>
             </div>
             <input
               type="range" min="0" max="100"
               value={pace}
               onChange={e => setPace(Number(e.target.value))}
             />
           </div>
           <div className="range-wrap-aura">
             <div className="flex justify-between mb-2">
               <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Clarity Boost</label>
               <span className="radius-numerical-badge">{clarity}%</span>
             </div>
             <input
               type="range" min="0" max="100"
               value={clarity}
               onChange={e => setClarity(Number(e.target.value))}
             />
           </div>
        </div>
      </section>

      <section className="premium-card">
        <div className="card-icon-header">
          <SlidersHorizontal size={24} />
          <h3>Narrative Intent</h3>
        </div>
        <p className="setting-desc">Universal bias applied to vocal emotion and inflection.</p>
        <select
          className="setting-select mt-4"
          value={narrativeIntent}
          onChange={e => setNarrativeIntent(e.target.value)}
        >
          <option value="natural">Natural Conversational (Default)</option>
          <option value="broadcast">High-Energy Broadcast</option>
          <option value="asmr">Calm / ASMR Optimized</option>
          <option value="corporate">Authoritative / Corporate</option>
          <option value="storytelling">Storytelling / Dramatic</option>
        </select>
        <div className="toggle-list mt-8">
           <div className="toggle-row">
             <label>Predictive Breathing</label>
             <OnOffButton checked={smartBreathing} onChange={setSmartBreathing} />
           </div>
        </div>
      </section>

      <section className="premium-card">
        <div className="card-icon-header">
          <Headphones size={24} />
          <h3>Studio Mastering</h3>
        </div>
        <div className="toggle-list space-y-4">
          <div className="toggle-row">
            <label>Ultra-Stereo Enhancement</label>
            <OnOffButton checked={stereo} onChange={setStereo} />
          </div>
          <div className="toggle-row">
            <label>Loudness Normalization</label>
            <OnOffButton checked={normalization} onChange={setNormalization} />
          </div>
          <div className="toggle-row">
            <label>AI Echo Suppression</label>
            <OnOffButton checked={echoRemoval} onChange={setEchoRemoval} />
          </div>
        </div>
      </section>

      <section className="premium-card">
        <div className="card-icon-header">
          <Music size={24} />
          <h3>Acoustic Environment</h3>
        </div>
        <p className="setting-desc">Simulate vocal recording in specific virtual spaces.</p>
        <div className="grid grid-cols-2 gap-3 mt-4">
           {['Studio', 'Pod-Booth', 'Concert Hall', 'Outdoor'].map(loc => (
             <button
               key={loc}
               className={`seg-btn ${acousticEnv === loc ? 'active' : ''}`}
               onClick={() => setAcousticEnv(loc)}
             >
               {loc}
             </button>
           ))}
        </div>
      </section>
    </div>
  )
}

export default SpeechSettings
