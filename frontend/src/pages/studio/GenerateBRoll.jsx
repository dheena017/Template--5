import React, { useState } from 'react'
import { Clapperboard, Wand2, Zap, Download } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { api } from '../../services/api'
import '../../styles/pages/studio/GenerateBRoll.css'

const GenerateBRoll = () => {
  const [prompt, setPrompt] = useState('')
  const [duration, setDuration] = useState('10')
  const [style, setStyle] = useState('cinematic')
  const [isGenerating, setIsGenerating] = useState(false)
  const [videos, setVideos] = useState([])
  const [_status, setStatus] = useState(null)

  const styles = ['cinematic', 'documentary', 'fast-paced', 'peaceful', 'corporate']
  const durations = ['5', '10', '15', '30', '60']

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      alert('Please enter a description')
      return
    }

    setIsGenerating(true)
    setStatus({ status: 'In Queue', progress: 0 })
    
    try {
      const res = await api.video.broll({ script: prompt, style })
      if (res.job_id) {
        pollStatus(res.job_id, prompt)
      } else {
        throw new Error(res.error || 'Failed to start job')
      }
    } catch (err) {
      alert('B-Roll generation failed: ' + err.message)
      setIsGenerating(false)
    }
  }

  const pollStatus = (id, originalPrompt) => {
    const timer = setInterval(async () => {
      const res = await api.video.getStatus(id)
      setStatus(res)
      if (res.status === 'Completed') {
        setVideos(prev => [...prev, {
          id,
          prompt: originalPrompt,
          duration,
          style,
          preview: res.result?.preview_url || 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=300'
        }])
        setPrompt('')
        setIsGenerating(false)
        clearInterval(timer)
      } else if (res.status === 'Failed') {
        setIsGenerating(false)
        clearInterval(timer)
      }
    }, 2000)
  }

  return (
    <div className="generate-broll-page">
      <div className="gbr-header">
        <h1>Generate B-Roll</h1>
        <p>Create professional background footage for your videos</p>
      </div>

      <div className="gbr-content">
        <motion.div 
          className="gbr-create-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="gbr-input-group">
            <label>Describe Your B-Roll</label>
            <textarea 
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g., 'Mountain landscape with sunrise, flowing clouds, cinematic camera movement'"
              rows={4}
            />
          </div>

          <div className="gbr-grid">
            <div className="gbr-control">
              <label>Duration</label>
              <select value={duration} onChange={(e) => setDuration(e.target.value)}>
                {durations.map(d => <option key={d} value={d}>{d}s</option>)}
              </select>
            </div>

            <div className="gbr-control">
              <label>Style</label>
              <select value={style} onChange={(e) => setStyle(e.target.value)}>
                {styles.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          </div>

          <button 
            className={`gbr-generate-btn ${isGenerating ? 'loading' : ''}`}
            onClick={handleGenerate}
            disabled={!prompt.trim() || isGenerating}
          >
            {isGenerating ? (
              <>
                <Zap size={18} className="spin" />
                Generating...
              </>
            ) : (
              <>
                <Wand2 size={18} />
                Generate B-Roll
              </>
            )}
          </button>
        </motion.div>

        {videos.length > 0 && (
          <motion.div 
            className="gbr-results"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h2>Generated Videos</h2>
            <div className="gbr-grid-videos">
              {videos.map(vid => (
                <motion.div 
                  key={vid.id}
                  className="gbr-video-card"
                  whileHover={{ scale: 1.05 }}
                >
                  <img src={vid.video} alt="B-Roll" />
                  <div className="gbr-info">
                    <p className="gbr-prompt">{vid.prompt}</p>
                    <div className="gbr-meta">
                      <span>{vid.duration}s</span>
                      <span>{vid.style}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default GenerateBRoll





