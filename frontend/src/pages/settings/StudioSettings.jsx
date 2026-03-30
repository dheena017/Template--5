import React, { useState } from 'react'
import './SettingsUniversal.css'
import { 
  Clapperboard, Workflow, Target, Cpu, Clock, Zap, 
  Monitor, Layout, Key, Rocket, Server, 
  RefreshCw, Layers
} from 'lucide-react'
import OnOffButton from '../../components/common/OnOffButton'

const StudioSettings = () => {
  const [nodeGrid, setNodeGrid] = useState(true);
  const [quickKeys, setQuickKeys] = useState(true);
  const [snapToGrid, setSnapToGrid] = useState(true);
  const [multiStream, setMultiStream] = useState(false);
  const [gpuBoost, setGpuBoost] = useState(true);
  const [autoSave, setAutoSave] = useState(true);
  const [previewRes, setPreviewRes] = useState(720);
  const [cacheGB, setCacheGB] = useState(4);
  const [computeBackend, setComputeBackend] = useState('NVIDIA Cloud Cluster');
  const [syncInterval, setSyncInterval] = useState('30s');

  const resLabel = previewRes >= 1440 ? '1440p' : previewRes >= 1080 ? '1080p' : previewRes >= 720 ? '720p' : '360p';

  return (
    <div className="settings-content-grid">
      <section className="premium-card lg:col-span-2">
        <div className="card-icon-header">
           <Clapperboard size={32} className="text-primary" />
           <div className="header-info">
             <h3 className="text-2xl font-black">Production Studio Core</h3>
             <p className="text-sm text-slate-500">Universal hardware and workflow calibration for high-intensity media tasks.</p>
           </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-8">
           <div className="range-wrap-aura">
             <div className="flex justify-between mb-4">
               <label className="text-sm font-bold">Preview Texture Resolution</label>
               <span className="radius-numerical-badge">{resLabel}</span>
             </div>
             <input
               type="range" min="360" max="1440" step="360"
               value={previewRes}
               onChange={e => setPreviewRes(Number(e.target.value))}
             />
             <p className="text-[10px] text-slate-500 mt-4 leading-relaxed">Lower resolutions improve real-time timeline scrubbing performance.</p>
           </div>
           <div className="range-wrap-aura">
             <div className="flex justify-between mb-4">
               <label className="text-sm font-bold">Rendering Cache Capacity</label>
               <span className="radius-numerical-badge">{cacheGB}GB</span>
             </div>
             <input
               type="range" min="1" max="16"
               value={cacheGB}
               onChange={e => setCacheGB(Number(e.target.value))}
             />
             <p className="text-[10px] text-slate-500 mt-4 leading-relaxed">Allocates system memory for rapid frame re-processing.</p>
           </div>
        </div>
      </section>

      <section className="premium-card">
        <div className="card-icon-header">
          <Server size={24} />
          <h3>Compute Backend</h3>
        </div>
        <p className="setting-desc">Primary hardware cluster for video &amp; 3D tasks.</p>
        <div className="space-y-4 mt-4">
           {['NVIDIA Cloud Cluster', 'Local WebGPU (Experimental)', 'Apple Neural Engine', 'DirectCompute v2'].map(hw => (
             <button
               key={hw}
               className={`seg-btn ${computeBackend === hw ? 'active' : ''}`}
               onClick={() => setComputeBackend(hw)}
             >
               {hw}
             </button>
           ))}
        </div>
      </section>

      <section className="premium-card">
        <div className="card-icon-header">
          <RefreshCw size={24} />
          <h3>Workflow Continuity</h3>
        </div>
        <div className="toggle-list space-y-4 mt-4">
           <div className="toggle-row">
             <label>Real-time Cloud Auto-Save</label>
             <OnOffButton checked={autoSave} onChange={setAutoSave} />
           </div>
           <select
             className="setting-select mt-2"
             value={syncInterval}
             onChange={e => setSyncInterval(e.target.value)}
           >
              <option value="30s">Synchronicity Interval: 30s</option>
              <option value="5m">Synchronicity Interval: 5m</option>
              <option value="manual">Manual Commit Only</option>
           </select>
        </div>
      </section>

      <section className="premium-card">
        <div className="card-icon-header">
          <Key size={24} />
          <h3>Operator Shortcuts</h3>
        </div>
        <div className="toggle-list space-y-4 mt-4">
          <div className="toggle-row">
            <label>Master Node-Grid System</label>
            <OnOffButton checked={nodeGrid} onChange={setNodeGrid} />
          </div>
          <div className="toggle-row">
            <label>Legacy Quick-Keys (J/K/L)</label>
            <OnOffButton checked={quickKeys} onChange={setQuickKeys} />
          </div>
          <div className="toggle-row">
            <label>Snap-to-Grid Precision</label>
            <OnOffButton checked={snapToGrid} onChange={setSnapToGrid} />
          </div>
        </div>
      </section>

      <section className="premium-card">
        <div className="card-icon-header">
          <Rocket size={24} />
          <h3>Turbo Rendering</h3>
        </div>
        <div className="toggle-list space-y-4 mt-4">
          <div className="toggle-row">
            <label>Multi-Stream Export</label>
            <OnOffButton checked={multiStream} onChange={setMultiStream} />
          </div>
          <div className="toggle-row">
            <label>Advanced GPU Over-Boost</label>
            <OnOffButton checked={gpuBoost} onChange={setGpuBoost} />
          </div>
        </div>
        <p className="text-[10px] text-amber-500 mt-4 italic">Warning: Multi-Stream may consume significant credits.</p>
      </section>
    </div>
  )
}

export default StudioSettings
