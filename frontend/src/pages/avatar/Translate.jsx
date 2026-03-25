import React, { useState } from 'react'
import { Languages, Globe, Zap, Play, Check, Download, Layers, Shield, Sparkles, Wand2 } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import '../../styles/pages/avatar/Translate.css'

const Translate = () => {
  const [video, setVideo] = useState(null)
  const [targetLang, setTargetLang] = useState('Spanish')
  const [translating, setTranslating] = useState(false)
  const [result, setResult] = useState(null)

  const languages = [
    { name: 'Spanish', flag: '🇪🇸' },
    { name: 'French', flag: '🇫🇷' },
    { name: 'German', flag: '🇩🇪' },
    { name: 'Japanese', flag: '🇯🇵' },
    { name: 'Chinese', flag: '🇨🇳' },
    { name: 'Hindi', flag: '🇮🇳' },
    { name: 'Portuguese', flag: '🇧🇷' }
  ]

  const handleTranslate = () => {
    setTranslating(true)
    setTimeout(() => {
      setTranslating(false)
      setResult({
        url: '#',
        duration: '02:45',
        lang: targetLang
      })
    }, 4000)
  }

  return (
    <div className="translate-page">
      <div className="tr-header">
        <div className="tr-title-group">
          <h1><Languages size={32} className="icon-gradient" /> Video Translate</h1>
          <p>Translate your avatar videos into 40+ languages with perfect lip-sync technology.</p>
        </div>
        <div className="tr-badges">
          <div className="tr-badge"><Shield size={14} /> SOC2 Secure</div>
          <div className="tr-badge"><Sparkles size={14} /> Lip-Sync AI</div>
        </div>
      </div>

      <div className="tr-main glass-card">
        {!result ? (
          <div className="tr-workflow">
            {/* Step 1: Upload */}
            <div className="tr-step">
              <div className="tr-step-num">1</div>
              <h3>Source Video</h3>
              <div className="tr-upload-area" onClick={() => setVideo({ name: 'intro_video.mp4' })}>
                {video ? (
                  <div className="tr-file-info">
                    <Play size={24} />
                    <span>{video.name}</span>
                    <button className="tr-remove" onClick={(e) => { e.stopPropagation(); setVideo(null); }}>Change</button>
                  </div>
                ) : (
                  <>
                    <Globe size={48} opacity={0.2} />
                    <p>Select video from library or upload</p>
                    <button className="btn-sm btn-primary">Choose Video</button>
                  </>
                )}
              </div>
            </div>

            {/* Step 2: Language */}
            <div className="tr-step">
              <div className="tr-step-num">2</div>
              <h3>Target Language</h3>
              <div className="tr-lang-grid">
                {languages.map(lang => (
                  <button 
                    key={lang.name} 
                    className={`tr-lang-btn ${targetLang === lang.name ? 'active' : ''}`}
                    onClick={() => setTargetLang(lang.name)}
                  >
                    <span className="tr-flag">{lang.flag}</span>
                    <span>{lang.name}</span>
                    {targetLang === lang.name && <Check size={14} />}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Options */}
            <div className="tr-step">
              <div className="tr-step-num">3</div>
              <h3>Translation Options</h3>
              <div className="tr-options">
                <label className="tr-checkbox">
                  <input type="checkbox" defaultChecked />
                  <span>Lip-Sync (AI Dubbing)</span>
                </label>
                <label className="tr-checkbox">
                  <input type="checkbox" defaultChecked />
                  <span>Generate Subtitles</span>
                </label>
                <label className="tr-checkbox">
                  <input type="checkbox" />
                  <span>Translate Text in Video</span>
                </label>
              </div>
            </div>

            <div className="tr-action">
              <button 
                className={`tr-translate-btn ${translating ? 'loading' : ''}`}
                disabled={!video || translating}
                onClick={handleTranslate}
              >
                {translating ? (
                  <><div className="spinner"></div> Translating...</>
                ) : (
                  <><Zap size={18} /> Start Translation</>
                )}
              </button>
              <p className="tr-cost">Cost: 2 credits / min</p>
            </div>
          </div>
        ) : (
          <motion.div 
            className="tr-result"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className="tr-result-preview">
              <div className="tr-mock-player">
                <Play size={48} className="play-icon" />
                <div className="tr-lang-tag">{result.lang}</div>
              </div>
            </div>
            <div className="tr-result-info">
              <h2>Translation Complete!</h2>
              <p>Your video has been successfully translated with high-fidelity lip-sync.</p>
              <div className="tr-result-meta">
                <span><strong>Duration:</strong> {result.duration}</span>
                <span><strong>Language:</strong> {result.lang}</span>
              </div>
              <div className="tr-result-btns">
                <button className="btn btn-primary"><Download size={18} /> Download Video</button>
                <button className="btn btn-secondary" onClick={() => setResult(null)}>Translate Another</button>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      <div className="tr-footer-grid">
        <div className="tr-info-card premium-card">
          <Wand2 className="info-icon" />
          <h3>AI Voice Cloning</h3>
          <p>Preserves the speaker's original voice, tone, and emotion across languages.</p>
        </div>
        <div className="tr-info-card premium-card">
          <Layers className="info-icon" />
          <h3>Multi-Speaker</h3>
          <p>Automatically detects and translates multiple speakers in the same video.</p>
        </div>
      </div>
    </div>
  )
}

export default Translate





