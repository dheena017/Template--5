import { FileText, Shield, Lock, Unlock, Zap, BookOpen, Pin } from 'lucide-react'
import OnOffButton from '../../components/common/OnOffButton'
import { useState } from 'react'

const PDFSettings = () => {
  const [smartDetection, setSmartDetection] = useState(true);
  const [editableBlocks, setEditableBlocks] = useState(true);
  return (
    <div className="settings-content-grid">
      <section className="settings-card premium-card">
        <h3><Shield size={18} /> Global Document Protection</h3>
        <p className="setting-desc">Set default security for all PDF exports.</p>
        <div className="segment-row">
          <button className="seg-btn"><Lock size={14}/> Always Encrypt</button>
          <button className="seg-btn active"><Unlock size={14}/> Open Access</button>
        </div>
      </section>

      <section className="settings-card premium-card">
        <h3><Zap size={18} /> OCR Intelligence Mode</h3>
        <p className="setting-desc">Preferred OCR technology for text extraction.</p>
        <select className="setting-select">
          <option>Standard OCR (Fast)</option>
          <option>High Fidelity (Best for Handwriting)</option>
          <option>Scientific (Mathematical Symbols)</option>
        </select>
      </section>

      <section className="settings-card premium-card">
        <h3><Pin size={18} /> Default Compression Level</h3>
        <p className="setting-desc">Control file size vs image quality trade-off.</p>
        <div className="range-wrap">
          <input type="range" min="0" max="100" defaultValue="70" />
          <span>70%</span>
        </div>
      </section>

      <section className="settings-card premium-card">
        <h3><BookOpen size={18} /> Layout Preservation</h3>
        <div className="toggle-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '1rem 0' }}>
          <span>Smart Detection</span>
          <OnOffButton checked={smartDetection} onChange={setSmartDetection} />
        </div>
        <div className="toggle-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '1rem 0' }}>
          <span>Editable Text Blocks</span>
          <OnOffButton checked={editableBlocks} onChange={setEditableBlocks} />
        </div>
      </section>
    </div>
  )
}

export default PDFSettings

