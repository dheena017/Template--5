import React, { useState } from 'react'
import { 
  HardDrive, Library, Layers, CheckCircle, Box, Trash2, 
  Database, RefreshCw, FolderTree, FileSearch, Cloud, 
  ShieldCheck, Clock
} from 'lucide-react'
import OnOffButton from '../../components/common/OnOffButton'

const FileSettings = () => {
  const [storageMode, setStorageMode] = useState('cloud');
  const [namingConvention, setNamingConvention] = useState('date_tool');
  const [versioning, setVersioning] = useState(true);
  const [autoOrganize, setAutoOrganize] = useState(true);
  const [metadataStrip, setMetadataStrip] = useState(false);
  const [smartSearch, setSmartSearch] = useState(true);
  const [thumbnailPregen, setThumbnailPregen] = useState(true);
  const [ocrIndexing, setOcrIndexing] = useState(true);
  const [forceSanitize, setForceSanitize] = useState(true);
  const [cloudSync, setCloudSync] = useState(true);
  const [retention, setRetention] = useState('30');
  const [autoCleanup, setAutoCleanup] = useState(true);

  return (
    <div className="settings-content-grid">
      <section className="premium-card lg:col-span-2">
        <div className="card-icon-header">
           <Database size={32} className="text-primary" />
           <div className="header-info">
             <h3 className="text-2xl font-black">Storage Architecture</h3>
             <p className="text-sm text-slate-500">Universal file management and cloud synchronization defaults.</p>
           </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
           {[
             { id: 'cloud', label: 'Aura Cloud Storage', icon: Cloud, desc: 'Encrypted, multi-device sync.' },
             { id: 'local', label: 'Browser Cache', icon: HardDrive, desc: 'Ultra-fast, ephemeral sessions.' },
             { id: 'hybrid', label: 'Hybrid Mesh', icon: RefreshCw, desc: 'Local draft + Cloud backup.' }
           ].map(opt => (
             <button 
               key={opt.id}
               className={`theme-selection-card ${storageMode === opt.id ? 'active' : ''}`}
               onClick={() => setStorageMode(opt.id)}
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
          <FolderTree size={24} />
          <h3>Naming &amp; Hierarchy</h3>
        </div>
        <p className="setting-desc">Universal directory and file naming conventions.</p>
        <div className="space-y-4 mt-4">
           <select
             className="setting-select"
             value={namingConvention}
             onChange={e => setNamingConvention(e.target.value)}
           >
              <option value="date_tool">{'{date}_{tool}_{id}'}</option>
              <option value="tool_project">{'{tool}_{project}_{v}'}</option>
              <option value="original">{'Original Filename (Suffix)'}</option>
           </select>
           <div className="toggle-list mt-8">
              <div className="toggle-row">
                <label>Auto-Group by Category</label>
                <OnOffButton checked={autoOrganize} onChange={setAutoOrganize} />
              </div>
           </div>
        </div>
      </section>

      <section className="premium-card">
        <div className="card-icon-header">
          <FileSearch size={24} />
          <h3>Intelligent Indexing</h3>
        </div>
        <div className="toggle-list space-y-4 mt-4">
           <div className="toggle-row">
             <label>Deep Semantic Search</label>
             <OnOffButton checked={smartSearch} onChange={setSmartSearch} />
           </div>
           <div className="toggle-row">
             <label>Thumbnail Pre-gen</label>
             <OnOffButton checked={thumbnailPregen} onChange={setThumbnailPregen} />
           </div>
           <div className="toggle-row">
             <label>OCR Auto-indexing</label>
             <OnOffButton checked={ocrIndexing} onChange={setOcrIndexing} />
           </div>
        </div>
      </section>

      <section className="premium-card">
        <div className="card-icon-header">
          <ShieldCheck size={24} />
          <h3>Privacy &amp; Scrubbing</h3>
        </div>
        <p className="setting-desc">Universal file sanitation on export.</p>
        <div className="toggle-list space-y-4 mt-4">
          <div className="toggle-row">
            <label>Strip GPS &amp; EXIF Data</label>
            <OnOffButton checked={metadataStrip} onChange={setMetadataStrip} />
          </div>
          <div className="toggle-row">
             <label>Force Filename Sanitation</label>
             <OnOffButton checked={forceSanitize} onChange={setForceSanitize} />
          </div>
        </div>
      </section>

      <section className="premium-card">
        <div className="card-icon-header">
          <Clock size={24} />
          <h3>Persistence &amp; Lifecycle</h3>
        </div>
        <div className="toggle-list space-y-4 mt-4">
          <div className="toggle-row">
            <label>Master Version History</label>
            <OnOffButton checked={versioning} onChange={setVersioning} />
          </div>
          <select
            className="setting-select mt-2"
            value={retention}
            onChange={e => setRetention(e.target.value)}
          >
            <option value="30">Retention: 30 Days (Standard)</option>
            <option value="never">Retention: Never Delete (Safe)</option>
            <option value="weekly">Retention: Delete Weekly (Privacy)</option>
          </select>
          <div className="toggle-row">
             <label>Auto-Cleanup Ghost Assets</label>
             <OnOffButton checked={autoCleanup} onChange={setAutoCleanup} />
          </div>
        </div>
      </section>
    </div>
  )
}

export default FileSettings
