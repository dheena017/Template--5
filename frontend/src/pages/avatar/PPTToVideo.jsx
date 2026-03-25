import React, { useState, useRef } from 'react'
import { FileText, Upload, Bot, Zap, Sparkles, ChevronRight, Check, Image, Film } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import '../../styles/pages/avatar/PPTToVideo.css'

const PPTToVideo = () => {
  const [file, setFile] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [uploadDone, setUploadDone] = useState(false)
  const [avatar, setAvatar] = useState('Alex')
  const [voice, setVoice] = useState('natural')
  const [generating, setGenerating] = useState(false)
  const [done, setDone] = useState(false)
  const [progress, setProgress] = useState(0)
  const fileRef = useRef()

  const handleFile = (e) => {
    const f = e.target.files?.[0]
    if (!f) return
    setFile(f)
    setUploading(true)
    let p = 0
    const iv = setInterval(() => {
      p += 10
      setProgress(p)
      if (p >= 100) { clearInterval(iv); setUploading(false); setUploadDone(true) }
    }, 150)
  }

  const handleGenerate = () => {
    if (!uploadDone) return
    setGenerating(true)
    setTimeout(() => { setGenerating(false); setDone(true) }, 4000)
  }

  const avatarOptions = ['Alex', 'Sofia', 'Marcus', 'Zoe']
  const voices = [
    { id: 'natural', name: 'Natural', desc: 'Warm & conversational' },
    { id: 'pro', name: 'Professional', desc: 'Authoritative & clear' },
    { id: 'energetic', name: 'Energetic', desc: 'Fast-paced & lively' },
  ]

  return (
    <div className="ppt-to-video-page">
      <div className="ptv-hero">
        <h1><FileText size={28} /> PPT / PDF to Video</h1>
        <p>Upload a presentation and our AI will transform it into a professional avatar video automatically.</p>
      </div>

      {!done ? (
        <div className="ptv-layout">
          {/* Upload Section */}
          <div className="ptv-upload-section premium-card">
            <h3><Upload size={18} /> Upload Presentation</h3>
            <div
              className={`ptv-drop-zone ${uploadDone ? 'done' : ''}`}
              onClick={() => fileRef.current?.click()}
              onDragOver={e => e.preventDefault()}
              onDrop={e => { e.preventDefault(); const f = e.dataTransfer.files[0]; if (f) fileRef.current.files = e.dataTransfer.files; handleFile({ target: { files: [f] } }) }}
            >
              {uploadDone ? (
                <div className="ptv-dz-done">
                  <Check size={40} />
                  <h3>{file?.name}</h3>
                  <p>Ready to convert</p>
                </div>
              ) : uploading ? (
                <div className="ptv-dz-uploading">
                  <div className="ptv-prog-ring">
                    <span>{progress}%</span>
                  </div>
                  <p>Uploading {file?.name}...</p>
                </div>
              ) : (
                <div className="ptv-dz-empty">
                  <div className="ptv-dz-icon">
                    <Image size={32} />
                    <Film size={32} />
                  </div>
                  <h3>Drop your file here</h3>
                  <p>Supports PPT, PPTX, PDF  · Max 100MB</p>
                  <button className="ptv-browse-btn">Browse Files</button>
                </div>
              )}
            </div>
            <input ref={fileRef} type="file" accept=".ppt,.pptx,.pdf" style={{ display: 'none' }} onChange={handleFile} />
          </div>

          {/* Settings */}
          <div className="ptv-settings">
            <div className="ptv-settings-card premium-card">
              <h3><Bot size={18} /> Presenter Avatar</h3>
              <div className="ptv-avatar-row">
                {avatarOptions.map(a => (
                  <button key={a} className={`ptv-avatar-btn ${avatar === a ? 'active' : ''}`} onClick={() => setAvatar(a)}>
                    <Bot size={22} />
                    <span>{a}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="ptv-settings-card premium-card">
              <h3>Narration Voice Style</h3>
              {voices.map(v => (
                <div key={v.id} className={`ptv-voice-opt ${voice === v.id ? 'active' : ''}`} onClick={() => setVoice(v.id)}>
                  <div className={`ptv-radio ${voice === v.id ? 'checked' : ''}`} />
                  <div>
                    <strong>{v.name}</strong>
                    <span>{v.desc}</span>
                  </div>
                </div>
              ))}
            </div>

            <button
              className={`ptv-gen-btn ${!uploadDone ? 'disabled' : ''} ${generating ? 'loading' : ''}`}
              onClick={handleGenerate}
              disabled={!uploadDone || generating}
            >
              {generating ? (
                <><div className="ptv-spin" /> Generating Video...</>
              ) : (
                <><Zap size={18} /> Convert to Video</>
              )}
            </button>
          </div>
        </div>
      ) : (
        <motion.div className="ptv-result premium-card" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
          <div className="ptv-result-icon"><Sparkles size={48} /></div>
          <h2>Video Generated!</h2>
          <p>Your presentation has been converted into a professional avatar video</p>
          <div className="ptv-result-stats">
            <div className="ptv-stat"><strong>12</strong><span>Slides converted</span></div>
            <div className="ptv-stat"><strong>3:42</strong><span>Video duration</span></div>
            <div className="ptv-stat"><strong>1080p</strong><span>Resolution</span></div>
          </div>
          <div className="ptv-result-actions">
            <button className="ptv-download-btn"><Check size={16} /> Download MP4</button>
            <button className="ptv-restart-btn" onClick={() => { setDone(false); setFile(null); setUploadDone(false); setProgress(0) }}>Convert Another</button>
          </div>
        </motion.div>
      )}
    </div>
  )
}

export default PPTToVideo





