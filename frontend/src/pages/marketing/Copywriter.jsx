import React, { useState } from 'react'
import { Type, Sparkles, Wand2, Copy, Check, Info, Layout, Target, Rocket, MousePointerClick } from 'lucide-react'
import { motion } from 'framer-motion'
import '../../styles/pages/marketing/Copywriter.css'

const Copywriter = () => {
  const [product, setProduct] = useState('')
  const [tone, setTone] = useState('Professional')
  const [isGenerating, setIsGenerating] = useState(false)
  const [output, setOutput] = useState('')
  const [copied, setCopied] = useState(false)

  const handleGenerate = (e) => {
    e.preventDefault()
    setIsGenerating(true)
    setTimeout(() => {
      setOutput(`🚀 Experience the future of ${product || 'your business'} today! \n\nOur state-of-the-art AI-driven ecosystem empowers you to scale with precision and speed. Transform your creative workflows into automated revenue machines with just a single click. \n\n✨ Why choose us?\n• 10x faster output delivery\n• Human-like ${tone} narrative style\n• Seamless multi-platform integration\n\nDon't let your competition outpace you. Join the elite 1% of market leaders today.`)
      setIsGenerating(false)
    }, 2000)
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(output)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="copywriter-container">
      <div className="tool-header">
        <div className="tag">Marketing Suite</div>
        <h1>AI Ad Copywriter</h1>
        <p>Premium persuasive copy generator for high-conversion marketing campaigns.</p>
      </div>

      <div className="tool-layout">
        <div className="input-panel glass-card">
          <form onSubmit={handleGenerate}>
            <div className="input-group">
              <label><Target size={14} /> Product / Service Name</label>
              <input 
                placeholder="e.g., Luxury AI Assistant" 
                value={product}
                onChange={(e) => setProduct(e.target.value)}
              />
            </div>

            <div className="input-group">
              <label><Wand2 size={14} /> Desired Tone</label>
              <div className="tone-selector">
                {['Professional', 'Exciting', 'Minimalist', 'Urgent'].map(t => (
                  <button 
                    key={t}
                    type="button"
                    className={`tone-btn ${tone === t ? 'active' : ''}`}
                    onClick={() => setTone(t)}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <button type="submit" className="generate-main-btn" disabled={isGenerating}>
              {isGenerating ? 'Synthesizing...' : <><Sparkles size={18} /> Generate Elite Copy</>}
            </button>
          </form>
        </div>

        <div className="output-panel">
          <div className="output-header">
            <span>Result Preview</span>
            {output && (
              <button className="copy-btn" onClick={handleCopy}>
                {copied ? <><Check size={14} /> Copied</> : <><Copy size={14} /> Copy</>}
              </button>
            )}
          </div>
          
          <div className={`output-canvas glass-card ${isGenerating ? 'analyzing' : ''}`}>
            {isGenerating ? (
              <div className="writing-indicator">
                <Type className="fade-pulse" size={48} />
                <p>Curating persuasive patterns...</p>
              </div>
            ) : output ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="result-text">
                {output.split('\n').map((line, i) => <p key={i}>{line}</p>)}
              </motion.div>
            ) : (
              <div className="empty-canvas">
                <Layout size={40} opacity={0.1} />
                <p>Your high-conversion copy will appear here.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="strategies-footer">
         <div className="strat-card">
            <Rocket size={20} />
            <h4>AIDA Framework</h4>
            <p>Optimized for Attention, Interest, Desire, and Action.</p>
         </div>
         <div className="strat-card">
            <MousePointerClick size={20} />
            <h4>Click-Through Optimization</h4>
            <p>Predictive modeling to increase user engagement rates.</p>
         </div>
      </div>
    </div>
  )
}

export default Copywriter
