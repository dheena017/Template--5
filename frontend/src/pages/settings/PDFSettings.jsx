import './SettingsUniversal.css'
import {
  FileText, Shield, Lock, Unlock, Zap, BookOpen, Pin, 
  Stamp, Trash2, Cpu, Eye, Cloud
} from 'lucide-react'
import OnOffButton from '../../components/common/OnOffButton'
import { useState } from 'react'

const PDFSettings = () => {
  // Security Protocol
  const [securityProtocol, setSecurityProtocol] = useState('flexible');

  // Intelligence Engine
  const [intelligenceEngine, setIntelligenceEngine] = useState('neural');
  const [autoOcr, setAutoOcr] = useState(false);

  // Security toggles
  const [metadataScrubbing, setMetadataScrubbing] = useState(true);

  // Watermark
  const [watermarkText, setWatermarkText] = useState('DRAFT');
  const [watermarkOpacity, setWatermarkOpacity] = useState(12);

  // Persistence
  const [cloudBackup, setCloudBackup] = useState(true);
  const [retentionPolicy, setRetentionPolicy] = useState('30');

  // Rendering
  const [dpi, setDpi] = useState(300);
  const [accuracy, setAccuracy] = useState(95);

  return (
    <div className="settings-content-grid">
      {/* Security Protocol */}
      <section className="premium-card">
        <div className="card-icon-header">
          <Shield size={24} />
          <h3>Security Protocol</h3>
        </div>
        <p className="setting-desc">Configure default encryption and access levels for generated documents.</p>
        <div className="segment-row">
          <button
            className={`seg-btn ${securityProtocol === 'high' ? 'active' : ''}`}
            onClick={() => setSecurityProtocol('high')}
          >
            <Lock size={16}/> High Restriction
          </button>
          <button
            className={`seg-btn ${securityProtocol === 'flexible' ? 'active' : ''}`}
            onClick={() => setSecurityProtocol('flexible')}
          >
            <Unlock size={16}/> Flexible Access
          </button>
        </div>
        <div className="toggle-list mt-8">
           <div className="toggle-row">
             <div className="toggle-info">
               <label>Metadata Scrubbing</label>
               <p className="text-[10px] text-slate-500">Removes author, location and system tracking on export.</p>
             </div>
             <OnOffButton checked={metadataScrubbing} onChange={setMetadataScrubbing} />
           </div>
        </div>
      </section>

      {/* Intelligence Engine */}
      <section className="premium-card">
        <div className="card-icon-header">
          <Zap size={24} />
          <h3>Intelligence Engine</h3>
        </div>
        <p className="setting-desc">Select the extraction engine optimized for your document types.</p>
        <select
          className="setting-select mb-8"
          value={intelligenceEngine}
          onChange={(e) => setIntelligenceEngine(e.target.value)}
        >
          <option value="neural">Neural Network (Standard)</option>
          <option value="handwriting">High-Resolution Handwriting</option>
          <option value="scientific">Scientific &amp; Mathematical</option>
          <option value="legacy">Legacy Pattern Matching</option>
        </select>
        <div className="toggle-row">
          <label>Auto-OCR on Upload</label>
          <OnOffButton checked={autoOcr} onChange={setAutoOcr} />
        </div>
      </section>

      {/* System Watermarking */}
      <section className="premium-card">
        <div className="card-icon-header">
          <Stamp size={24} />
          <h3>System Watermarking</h3>
        </div>
        <p className="setting-desc">Universal protective layer applied to all exported drafts.</p>
        <div className="flex flex-col gap-4">
           <input
             className="premium-input-field"
             placeholder="Default Watermark (e.g. DRAFT)"
             value={watermarkText}
             onChange={(e) => setWatermarkText(e.target.value)}
           />
           <div className="range-wrap-aura mt-4">
             <div className="flex justify-between items-center mb-2">
               <label className="text-xs font-bold text-slate-400">Opacity</label>
               <span className="text-[10px] bg-white/5 py-1 px-3 rounded-full">{watermarkOpacity}%</span>
             </div>
             <input
               type="range"
               min="0"
               max="100"
               value={watermarkOpacity}
               onChange={(e) => setWatermarkOpacity(Number(e.target.value))}
             />
           </div>
        </div>
      </section>

      {/* Persistence & Sync */}
      <section className="premium-card">
        <div className="card-icon-header">
          <Cloud size={24} />
          <h3>Persistence &amp; Sync</h3>
        </div>
        <p className="setting-desc">Manage how document assets are cached and stored.</p>
        <div className="toggle-list space-y-4">
          <div className="toggle-row">
            <label>Encrypted Workspace Backup</label>
            <OnOffButton checked={cloudBackup} onChange={setCloudBackup} />
          </div>
          <select
            className="setting-select"
            value={retentionPolicy}
            onChange={(e) => setRetentionPolicy(e.target.value)}
          >
            <option value="30">Retention: 30 Days (Standard)</option>
            <option value="7">Retention: 7 Days (Privacy)</option>
            <option value="never">Retention: Never (Temporary)</option>
          </select>
        </div>
      </section>

      {/* Rendering & Output */}
      <section className="premium-card lg:col-span-2">
        <div className="card-icon-header">
          <Cpu size={24} />
          <h3>Rendering &amp; Output</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-4">
           <div className="range-wrap-aura">
             <div className="flex justify-between mb-4">
               <label className="text-sm font-bold">Resampling DPI</label>
               <span className="radius-numerical-badge">{dpi}</span>
             </div>
             <input
               type="range"
               min="72"
               max="600"
               value={dpi}
               step="10"
               onChange={(e) => setDpi(Number(e.target.value))}
             />
           </div>
           <div className="range-wrap-aura">
             <div className="flex justify-between mb-4">
               <label className="text-sm font-bold">Structure Accuracy</label>
               <span className="radius-numerical-badge">{accuracy}%</span>
             </div>
             <input
               type="range"
               min="0"
               max="100"
               value={accuracy}
               onChange={(e) => setAccuracy(Number(e.target.value))}
             />
           </div>
        </div>
      </section>
    </div>
  )
}

export default PDFSettings
