import React, { useEffect, useState } from 'react'
import { 
  Type, Sparkles, Play, Download, 
  Share2, Save, Wand2, Volume2, 
  Mic2, Settings2, Sliders, Info,
  ChevronRight, ArrowRight, Activity,
  Globe2, Zap, Headphones, MessageSquare,
  Lock, Key, Layers, Palette
} from 'lucide-react'
import { useTheme } from '../../context/ThemeContext'
import '../../styles/pages/speech/TextToSpeech.css'
import { api, logger } from '../../services/api'

const TextToSpeech = () => {
  const [isGenerating, setIsGenerating] = useState(false)
  const [voiceModel, setVoiceModel] = useState('Michael Caine')
  const [inputText, setInputText] = useState('')
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)
  const { accentColor } = useTheme()

  useEffect(() => {
    logger.log('TTS', 'Component mounted')
  }, [])

  const handleGenerate = async () => {
    if (!inputText.trim()) {
      alert('Please enter some text first')
      return
    }
    setIsGenerating(true)
    setResult(null)
    setError(null)
    logger.log('TTS', 'Starting generation', { voice: voiceModel, textLength: inputText.length })
    try {
      // TTS endpoint not yet implemented on backend — upload text as a file for queuing
      const textBlob = new Blob([inputText], { type: 'text/plain' })
      const file = new File([textBlob], 'tts_script.txt', { type: 'text/plain' })
      const uploadRes = await api.uploadFile(file)
      if (uploadRes && uploadRes.url) {
        setResult({ message: 'Script queued for TTS synthesis.', url: uploadRes.url })
        logger.success('TTS', 'Script uploaded successfully')
      } else {
        throw new Error('Upload failed')
      }
    } catch (err) {
      setError(err.message)
      logger.error('TTS', 'Generation failed', err.message)
    } finally {
      setIsGenerating(false)
    }
  }

  const voices = [
    { name: 'Michael Caine', desc: 'Legendary, British, Calm', id: 'mc-1' },
    { name: 'Sarah Anderson', desc: 'Youthful, Energetic, US', id: 'sa-1' },
    { name: 'Marcus Flint', desc: 'Deep, Narrative, UK', id: 'mf-1' }
  ]

  const quickStarts = [
    'Narrate a story',
    'Tell a silly joke',
    'Record an advertisement',
    'Speak in different languages',
    'Direct a dramatic movie scene',
    'Hear from a video game character',
    'Introduce your podcast',
    'Guide a meditation class'
  ]

  return (
    <div className="tts-container">
      <header className="tts-header">
        <div className="header-left">
          <h1>Text to Speech <span className="hq-badge">Sono V3</span></h1>
          <p>Start typing here or paste any text you want to turn into lifelike speech...</p>
        </div>
        <div className="header-actions">
           <button className="secondary-btn"><Zap size={18} /> Optimization: On</button>
           <button className="primary-btn"><Sparkles size={18} /> Pro Access</button>
        </div>
      </header>

      <div className="tts-layout">
        <main className="tts-main premium-card">
           <div className="voice-selection-bar glass-card">
              <label><Mic2 size={16} /> Select Neural Model</label>
              <div className="voice-grid">
                {voices.map(v => (
                  <button 
                    key={v.id} 
                    className={`voice-btn ${voiceModel === v.name ? 'active' : ''}`}
                    onClick={() => setVoiceModel(v.name)}
                  >
                    <strong>{v.name}</strong>
                    <span>{v.desc}</span>
                  </button>
                ))}
              </div>
           </div>

           <div className="text-canvas">
              <h3>Input Text</h3>
              <div className="quick-starts">
                <span className="quick-starts-title">Get started with</span>
                <div className="quick-start-grid">
                  {quickStarts.map((prompt) => (
                    <button
                      key={prompt}
                      type="button"
                      className="quick-start-btn"
                      onClick={() => setInputText(prompt)}
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>
              <div className="canvas-wrapper">
                 <textarea 
                   placeholder="Start typing here or paste any text you want to turn into lifelike speech..."
                   className="premium-textarea"
                   value={inputText}
                   onChange={(e) => setInputText(e.target.value)}
                 />
                 <div className="char-counter">{inputText.length} / 5,000 characters</div>
              </div>
           </div>

           <div className="generation-controls">
              <button 
                className="generate-tts-btn" 
                onClick={handleGenerate}
                disabled={isGenerating}
              >
                {isGenerating ? (
                  <><div className="loader-ring"></div> Synthesizing...</>
                ) : (
                  <><Wand2 size={20} /> Generate Speech</>
                )}
              </button>
               <div className="cost-estimate">Est. Cost: <strong>4 Credits</strong></div>
            </div>
            {result && (
              <div style={{ padding: '16px', background: 'rgba(100,200,100,0.1)', borderRadius: '12px', border: '1px solid rgba(100,200,100,0.2)', marginTop: '16px' }}>
                <strong style={{ color: '#7dffb3' }}>✓ {result.message}</strong>
              </div>
            )}
            {error && (
              <div style={{ padding: '16px', background: 'rgba(255,107,107,0.1)', borderRadius: '12px', border: '1px solid rgba(255,107,107,0.2)', marginTop: '16px' }}>
                <strong style={{ color: '#ff6b6b' }}>Error: {error}</strong>
              </div>
            )}
         </main>

        <aside className="tts-sidebar">
           <section className="premium-card control-panel">
              <div className="panel-title"><Settings2 size={18} /> Voice Laboratory</div>
              
              <div className="control-groups">
                 <div className="control-item">
                    <label>Stability</label>
                    <input type="range" className="premium-range" data-accent={accentColor} />
                    <div className="l-range"><span>Wild</span><span>Solid</span></div>
                 </div>
                 <div className="control-item">
                    <label>Clarity + Similarity</label>
                    <input type="range" className="premium-range" />
                    <div className="l-range"><span>Lo-fi</span><span>Ultra</span></div>
                 </div>
                 <div className="control-item">
                    <label>Style Exaggeration</label>
                    <input type="range" className="premium-range" />
                 </div>
              </div>
              
              <div className="speaker-boost">
                 <label className="checkbox-row">
                    <input type="checkbox" defaultChecked />
                    <span>Enable Speaker Boost <Info size={14} /></span>
                 </label>
              </div>
           </section>

           <section className="premium-card output-shelf">
              <div className="panel-title"><Activity size={18} /> Recent Generations</div>
              <div className="output-list">
                 {[1, 2].map(i => (
                   <div key={i} className="output-item">
                      <div className="o-play"><Play size={14} fill="currentColor" /></div>
                      <div className="o-info">
                         <strong>Michael Caine - Script v2</strong>
                         <span>12s • 420 KB</span>
                      </div>
                      <button className="icon-btn"><Download size={14} /></button>
                   </div>
                 ))}
              </div>
           </section>
        </aside>
      </div>
    </div>
  )
}

export default TextToSpeech





