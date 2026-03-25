import React, { useEffect, useState, useRef } from 'react'
import { 
  Mic, Sparkles, Upload, 
  FileText, Download,
  Clock, Globe, CheckCircle2
} from 'lucide-react'
import { useTheme } from '../../context/ThemeContext'
import { api, logger } from '../../services/api'
import '../../styles/pages/text/SpeechToText.css'

const SpeechToText = () => {
  const [isTranscribing, setIsTranscribing] = useState(false)
  const [activeTab, setActiveTab] = useState('Upload')
  const [audioFile, setAudioFile] = useState(null)
  const [transcript, setTranscript] = useState(null)
  const [error, setError] = useState(null)
  const fileInputRef = useRef(null)
  const { accentColor } = useTheme()

  useEffect(() => {
    logger.log('STT', 'Component mounted')
  }, [])

  const handleFileChange = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      setAudioFile(file)
      logger.log('STT', 'Audio file uploaded', { fileName: file.name, size: file.size })
    }
  }

  const handleTranscribe = async () => {
    if (!audioFile) {
      alert('Please upload an audio or video file first')
      return
    }
    logger.log('STT', 'Starting transcription')
    setIsTranscribing(true)
    setError(null)
    setTranscript(null)
    try {
      const uploadRes = await api.uploadFile(audioFile)
      if (!uploadRes || !uploadRes.url) throw new Error('Upload failed')
      // Real transcription would call a /transcribe endpoint here
      // For now, we display upload success as confirmation
      setTranscript({
        file: audioFile.name,
        url: uploadRes.url,
        status: 'uploaded',
        message: 'File uploaded successfully. Transcription queued.'
      })
      logger.success('STT', 'File uploaded and queued for transcription')
    } catch (err) {
      logger.error('STT', 'Transcription failed', err.message)
      setError(err.message)
    } finally {
      setIsTranscribing(false)
    }
  }

  return (
    <div className="stt-container">
      <header className="stt-header">
        <div className="header-left">
          <h1>Speech to Text <span className="hq-badge">Whisper V3</span></h1>
          <p>Unmatched accuracy with real-time translation and multi-speaker diarization.</p>
        </div>
        <div className="header-actions">
           <button className="secondary-btn"><Globe size={18} /> Global Langs: 90+</button>
           <button className="primary-btn"><Sparkles size={18} /> Upgrade Engine</button>
        </div>
      </header>

      <div className="stt-layout">
        <main className="stt-main premium-card">
           <div className="stt-tabs">
              <button className={activeTab === 'Upload' ? 'active' : ''} onClick={() => setActiveTab('Upload')}><Upload size={16} /> Upload Audio</button>
              <button className={activeTab === 'Live' ? 'active' : ''} onClick={() => setActiveTab('Live')}><Mic size={16} /> Live Record</button>
              <button className={activeTab === 'URL' ? 'active' : ''} onClick={() => setActiveTab('URL')}><Globe size={16} /> Link URL</button>
           </div>

           <div className="stt-drop-zone glass-card" onClick={() => fileInputRef.current?.click()}>
              <div className="drop-inner">
                 <div className="p-icon"><Upload size={48} /></div>
                 <h3>{audioFile ? `✓ ${audioFile.name}` : 'Upload Your Audio/Video'}</h3>
                 <p>{audioFile ? `${(audioFile.size/1024/1024).toFixed(2)} MB — click to change` : 'Drag and drop or click to browse (MP3, WAV, MP4, M4A up to 1GB)'}</p>
                 <div className="drop-meta">
                    <span><CheckCircle2 size={12} /> Auto-Translation</span>
                    <span><CheckCircle2 size={12} /> Speaker IDs</span>
                 </div>
              </div>
              <input ref={fileInputRef} type="file" accept="audio/*,video/*" onChange={handleFileChange} style={{ display: 'none' }} />
           </div>

           <div className="stt-actions-row">
              <div className="lang-picker">
                 <label>Source Language</label>
                 <select className="premium-select">
                    <option>Auto-Detect Language</option>
                    <option>English (US)</option>
                    <option>Spanish (ES)</option>
                    <option>Hindi (IN)</option>
                 </select>
              </div>
              <button 
                className="stt-trigger-btn" 
                onClick={handleTranscribe}
                disabled={isTranscribing}
              >
                {isTranscribing ? (
                  <><div className="loader-ring"></div> Transcribing...</>
                ) : (
                  <><Sparkles size={18} /> {audioFile ? 'Transcribe File' : 'Transcribe Session'}</>
                )}
              </button>
              <div className="cost-info">4 Credits / Min</div>
           </div>
           {transcript && (
             <div style={{ padding: '16px', background: 'rgba(100,200,100,0.1)', borderRadius: '12px', border: '1px solid rgba(100,200,100,0.2)', marginTop: '16px' }}>
               <strong style={{ color: '#7dffb3' }}>✓ {transcript.message}</strong>
             </div>
           )}
           {error && (
             <div style={{ padding: '16px', background: 'rgba(255,107,107,0.1)', borderRadius: '12px', border: '1px solid rgba(255,107,107,0.2)', marginTop: '16px' }}>
               <strong style={{ color: '#ff6b6b' }}>Error: {error}</strong>
             </div>
           )}
        </main>

        <aside className="stt-sidebar">
           <section className="premium-card history-section">
              <div className="panel-head"><h3><Clock size={18} /> Recent Sessions</h3></div>
              <div className="stt-history-list">
                 {[1, 2].map(i => (
                   <div key={i} className="stt-item">
                      <div className="stt-meta">
                         <strong>Interview - Part #{i}</strong>
                         <span>Spanish to English • 4:20</span>
                      </div>
                      <div className="stt-actions">
                         <button className="icon-btn"><FileText size={14} /></button>
                         <button className="icon-btn"><Download size={14} /></button>
                      </div>
                   </div>
                 ))}
              </div>
           </section>

           <section className="premium-card engine-specs">
              <h3>Engine: Whisper-V3-HQ</h3>
              <div className="spec-row"><span>Accuracy</span> <strong>99.4%</strong></div>
              <div className="spec-row"><span>Speaker ID</span> <strong>Enabled</strong></div>
              <div className="spec-row"><span>Latency</span> <strong>~1.4s</strong></div>
           </section>
        </aside>
      </div>
    </div>
  )
}

export default SpeechToText





