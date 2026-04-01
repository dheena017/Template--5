import React, { useState } from 'react'
import { Sparkles, Bot, Mic, Wand2, Play, FileText, Settings, Zap, Download, Upload, ChevronRight } from 'lucide-react'
import { motion } from 'framer-motion'
import '../../styles/pages/video-ai/AIStudio.css'

const steps = [
  { id: 1, icon: <Bot size={22} />, label: 'Avatar', color: '#6366f1' },
  { id: 2, icon: <FileText size={22} />, label: 'Script', color: '#f59e0b' },
  { id: 3, icon: <Mic size={22} />, label: 'Voice', color: '#10b981' },
  { id: 4, icon: <Wand2 size={22} />, label: 'Style', color: '#ec4899' },
  { id: 5, icon: <Zap size={22} />, label: 'Generate', color: '#a855f7' },
]

const voices = [
  { id: 1, name: 'Natural Sarah', accent: 'US English', speed: '1.0x' },
  { id: 2, name: 'Deep Marcus', accent: 'UK English', speed: '0.9x' },
  { id: 3, name: 'Warm Sofia', accent: 'Spanish', speed: '1.1x' },
]

const AIStudio = () => {
  const [step, setStep] = useState(1)
  const [script, setScript] = useState('')
  const [selectedVoice, setSelectedVoice] = useState(1)
  const [generating, setGenerating] = useState(false)
  const [done, setDone] = useState(false)

  const handleGenerate = () => {
    setGenerating(true)
    setTimeout(() => { setGenerating(false); setDone(true) }, 3500)
  }

  return (
    <div className="ai-studio-page">
      {/* Step Tracker */}
      <div className="ais-steps glass-card">
        {steps.map((s, i) => (
          <React.Fragment key={s.id}>
            <button
              className={`ais-step ${step === s.id ? 'active' : ''} ${step > s.id ? 'done' : ''}`}
              onClick={() => setStep(s.id)}
              style={{ '--step-color': s.color }}
            >
              <div className="ais-step-icon">{s.icon}</div>
              <span>{s.label}</span>
            </button>
            {i < steps.length - 1 && <div className={`ais-connector ${step > s.id ? 'done' : ''}`} />}
          </React.Fragment>
        ))}
      </div>

      <div className="ais-workspace">
        {/* Left: Preview */}
        <div className="ais-preview premium-card">
          <div className="ais-preview-head">
            <span>Live Preview</span>
            <div className="ais-aspect">9:16</div>
          </div>
          <div className="ais-canvas">
            {done ? (
              <motion.div className="ais-done-state" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}>
                <Sparkles size={48} />
                <h3>Video Ready!</h3>
                <button className="ais-dl-btn"><Download size={16} /> Download MP4</button>
              </motion.div>
            ) : generating ? (
              <div className="ais-generating">
                <div className="ais-gen-spinner" />
                <p>AI is generating your video...</p>
              </div>
            ) : (
              <div className="ais-empty-canvas">
                <Bot size={64} opacity={0.2} />
                <p>Configure settings & generate</p>
              </div>
            )}
          </div>
        </div>

        {/* Right: Controls */}
        <div className="ais-controls">
          {step === 1 && (
            <motion.div className="ais-panel premium-card" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
              <h2><Bot size={20} /> Select Avatar</h2>
              <div className="ais-avatar-row">
                {['Alex', 'Sofia', 'Marcus', 'Zoe'].map((name, i) => (
                  <div key={name} className={`ais-av-thumb ${i === 0 ? 'selected' : ''}`}>
                    <Bot size={28} />
                    <span>{name}</span>
                  </div>
                ))}
              </div>
              <button className="ais-next-btn" onClick={() => setStep(2)}>Next: Script <ChevronRight size={14} /></button>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div className="ais-panel premium-card" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
              <h2><FileText size={20} /> Script Editor</h2>
              <textarea
                className="ais-script-area"
                placeholder="Write what your avatar will say..."
                value={script}
                onChange={e => setScript(e.target.value)}
                rows={10}
              />
              <div className="ais-script-meta">
                <span>{script.length} chars · ~{Math.ceil(script.split(' ').length / 130)} min video</span>
                <button className="ais-ai-write"><Wand2 size={14} /> AI Write</button>
              </div>
              <button className="ais-next-btn" onClick={() => setStep(3)}>Next: Voice <ChevronRight size={14} /></button>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div className="ais-panel premium-card" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
              <h2><Mic size={20} /> Choose Voice</h2>
              <div className="ais-voice-list">
                {voices.map(v => (
                  <div key={v.id} className={`ais-voice-item ${selectedVoice === v.id ? 'active' : ''}`} onClick={() => setSelectedVoice(v.id)}>
                    <div className="ais-voice-wave">
                      {[...Array(8)].map((_, i) => <div key={i} className="ais-bar" style={{ height: `${Math.random() * 60 + 20}%` }} />)}
                    </div>
                    <div>
                      <strong>{v.name}</strong>
                      <span>{v.accent} · {v.speed}</span>
                    </div>
                  </div>
                ))}
              </div>
              <button className="ais-next-btn" onClick={() => setStep(4)}>Next: Style <ChevronRight size={14} /></button>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div className="ais-panel premium-card" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
              <h2><Wand2 size={20} /> Video Style</h2>
              <div className="ais-style-grid">
                {['Corporate', 'Casual', 'Studio', 'Outdoor', 'Minimal', 'Dynamic'].map((s, i) => (
                  <div key={s} className={`ais-style-card ${i === 0 ? 'selected' : ''}`}>
                    <div className="ais-style-thumb" style={{ background: `hsl(${i * 40}, 60%, 20%)` }} />
                    <span>{s}</span>
                  </div>
                ))}
              </div>
              <button className="ais-next-btn" onClick={() => setStep(5)}>Next: Generate <ChevronRight size={14} /></button>
            </motion.div>
          )}

          {step === 5 && (
            <motion.div className="ais-panel premium-card" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
              <h2><Zap size={20} /> Generate Video</h2>
              <div className="ais-summary">
                <div className="ais-summary-row"><span>Avatar</span><strong>Alex</strong></div>
                <div className="ais-summary-row"><span>Script</span><strong>{script.substring(0, 30) || '(empty)'}...</strong></div>
                <div className="ais-summary-row"><span>Voice</span><strong>{voices.find(v => v.id === selectedVoice)?.name}</strong></div>
                <div className="ais-summary-row"><span>Style</span><strong>Corporate</strong></div>
                <div className="ais-summary-row"><span>Cost</span><strong>50 credits</strong></div>
              </div>
              <button className="ais-generate-btn" onClick={handleGenerate} disabled={generating}>
                {generating ? <><div className="ais-spin" /> Generating...</> : <><Zap size={18} /> Generate Video</>}
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}

export default AIStudio





