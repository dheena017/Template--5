import React, { useState } from 'react'
import { Bot, Upload, Camera, Sparkles, Check, Zap, ChevronRight, User } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import '../../styles/pages/avatar/AvatarCreator.css'

const steps = ['Method', 'Setup', 'Preview', 'Publish']

const AvatarCreator = () => {
  const [step, setStep] = useState(0)
  const [method, setMethod] = useState(null)
  const [name, setName] = useState('')
  const [file, setFile] = useState(null)
  const [processing, setProcessing] = useState(false)
  const [done, setDone] = useState(false)

  const methods = [
    { id: 'photo', icon: <Camera size={32} />, title: 'From Photo', desc: 'Upload a clear front-facing photo to create your avatar', color: '#6366f1' },
    { id: 'video', icon: <Upload size={32} />, title: 'From Video', desc: 'Record or upload a short 5-minute video for a hyper-realistic avatar', color: '#10b981', badge: 'Most Realistic' },
    { id: 'preset', icon: <Bot size={32} />, title: 'Preset Avatar', desc: 'Customize an existing avatar to match your brand', color: '#f59e0b' },
  ]

  const handleProcess = () => {
    setProcessing(true)
    setTimeout(() => { setProcessing(false); setDone(true); setStep(2) }, 3000)
  }

  return (
    <div className="avatar-creator-page">
      {/* Steps */}
      <div className="ac-steps glass-card">
        {steps.map((s, i) => (
          <div key={s} className={`ac-step ${step === i ? 'active' : ''} ${step > i ? 'done' : ''}`}>
            <div className="ac-step-num">{step > i ? <Check size={14} /> : i + 1}</div>
            <span>{s}</span>
          </div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {step === 0 && (
          <motion.div key="step0" className="ac-body" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            <div className="ac-hero">
              <h1>Create Your Avatar</h1>
              <p>Choose how you'd like to create your personal AI avatar</p>
            </div>
            <div className="ac-method-grid">
              {methods.map(m => (
                <motion.div
                  key={m.id}
                  className={`ac-method-card premium-card ${method === m.id ? 'selected' : ''}`}
                  whileHover={{ y: -6 }}
                  onClick={() => setMethod(m.id)}
                  style={{ '--method-color': m.color }}
                >
                  {m.badge && <div className="ac-method-badge">{m.badge}</div>}
                  <div className="ac-method-icon" style={{ background: `${m.color}22`, color: m.color }}>{m.icon}</div>
                  <h3>{m.title}</h3>
                  <p>{m.desc}</p>
                  {method === m.id && <div className="ac-check"><Check size={14} /></div>}
                </motion.div>
              ))}
            </div>
            <button className="ac-next-btn" disabled={!method} onClick={() => setStep(1)}>
              Continue <ChevronRight size={16} />
            </button>
          </motion.div>
        )}

        {step === 1 && (
          <motion.div key="step1" className="ac-body" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            <div className="ac-hero">
              <h1>Setup Your Avatar</h1>
              <p>Name it and {method === 'photo' ? 'upload a photo' : method === 'video' ? 'upload a video' : 'pick a preset'}</p>
            </div>
            <div className="ac-setup premium-card">
              <div className="ac-form-group">
                <label>Avatar Name</label>
                <input type="text" placeholder="e.g. My Work Avatar" value={name} onChange={e => setName(e.target.value)} className="ac-input" />
              </div>

              <div className="ac-form-group">
                <label>{method === 'photo' ? 'Upload Photo' : method === 'video' ? 'Upload Video' : 'Select Preset'}</label>
                {method !== 'preset' ? (
                  <div className="ac-upload-box" onClick={() => document.getElementById('ac-file').click()}>
                    {file ? (
                      <div className="ac-file-preview">
                        <Check size={24} />
                        <span>{file.name}</span>
                      </div>
                    ) : (
                      <>
                        <Upload size={32} />
                        <p>Click to upload {method === 'photo' ? 'a photo (JPG, PNG)' : 'a video (MP4, MOV)'}</p>
                      </>
                    )}
                  </div>
                ) : (
                  <div className="ac-preset-row">
                    {['Alex', 'Sofia', 'Marcus', 'Zoe', 'Daniel', 'Aria'].map(n => (
                      <div key={n} className={`ac-preset-opt ${name === n ? 'active' : ''}`} onClick={() => setName(n)}>
                        <Bot size={28} />
                        <span>{n}</span>
                      </div>
                    ))}
                  </div>
                )}
                <input id="ac-file" type="file" accept={method === 'photo' ? 'image/*' : 'video/*'} style={{ display: 'none' }} onChange={e => setFile(e.target.files?.[0])} />
              </div>

              <button className="ac-next-btn" disabled={!name || (!file && method !== 'preset')} onClick={handleProcess}>
                {processing ? <><div className="ac-spin" /> Processing...</> : <><Sparkles size={16} /> Create Avatar</>}
              </button>
            </div>
          </motion.div>
        )}

        {step === 2 && done && (
          <motion.div key="step2" className="ac-body" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}>
            <div className="ac-done-card premium-card">
              <div className="ac-done-icon"><Sparkles size={56} /></div>
              <h2>Avatar Created!</h2>
              <p>"{name}" is ready to use in your videos</p>
              <div className="ac-done-avatar">
                <Bot size={80} />
              </div>
              <div className="ac-done-actions">
                <button className="ac-use-btn"><Zap size={16} /> Create Video Now</button>
                <button className="ac-another-btn" onClick={() => { setStep(0); setMethod(null); setName(''); setFile(null); setDone(false) }}>Create Another</button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default AvatarCreator





