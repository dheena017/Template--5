import React, { useEffect, useState } from 'react'
import { Upload, Volume2, Globe, Zap, Download } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { api, logger } from '../../services/api'
import '../../styles/pages/studio/VideoDubbing.css'

const VideoDubbing = () => {
  const [videoFile, setVideoFile] = useState(null)
  const [sourceLanguage, setSourceLanguage] = useState('en')
  const [targetLanguage, setTargetLanguage] = useState('es')
  const [isDubbing, setIsDubbing] = useState(false)
  const [result, setResult] = useState(null)
  const [status, setStatus] = useState(null)
  const [_jobId, setJobId] = useState(null)

  useEffect(() => {
    logger.log('VIDEO_DUB', 'Component mounted')
  }, [])

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Spanish' },
    { code: 'fr', name: 'French' },
    { code: 'de', name: 'German' },
    { code: 'it', name: 'Italian' },
    { code: 'pt', name: 'Portuguese' },
    { code: 'ja', name: 'Japanese' },
    { code: 'zh', name: 'Chinese' },
    { code: 'ru', name: 'Russian' },
    { code: 'ar', name: 'Arabic' }
  ]

  const handleVideoUpload = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      setVideoFile(file)
      logger.log('VIDEO_DUB', 'Video file uploaded', { fileName: file.name, size: file.size })
    }
  }

  const handleDub = async () => {
    if (!videoFile) return

    logger.log('VIDEO_DUB', 'Starting video dubbing', { fromLang: sourceLanguage, toLang: targetLanguage })
    setIsDubbing(true)
    setResult(null)
    setStatus({ status: 'Uploading', progress: 5 })
    
    try {
      const uploadRes = await api.uploadFile(videoFile)
      if (!uploadRes || !uploadRes.url) throw new Error("Upload failed")
      
      const res = await api.video.dubbing({
        video_url: uploadRes.url,
        target_lang: targetLanguage
      })

      if (res.job_id) {
        setJobId(res.job_id)
        logger.success('VIDEO_DUB', 'Dubbing job created', { jobId: res.job_id })
        pollStatus(res.job_id)
      } else {
        throw new Error(res.error || "Failed to start dubbing job.")
      }
    } catch (err) {
      logger.error('VIDEO_DUB', 'Video dubbing failed', err.message)
      alert("Dubbing failed. " + err.message)
      setIsDubbing(false)
      setStatus({ status: 'Failed', progress: 0, message: err.message })
    }
  }

  const pollStatus = async (id) => {
    const timer = setInterval(async () => {
      try {
        const res = await api.video.getStatus(id)
        setStatus(res) // Update status with the full response
        if (res.status === 'Completed') {
          setResult({
            id: id,
            original: videoFile.name,
            targetLang: languages.find(l => l.code === targetLanguage)?.name,
            url: res.result.url
          })
          setIsDubbing(false)
          clearInterval(timer)
        } else if (res.status === 'Failed') {
          setIsDubbing(false)
          clearInterval(timer)
          alert("Dubbing job failed: " + (res.message || "Unknown error"))
        }
      } catch (err) {
        console.error("Polling error:", err)
        clearInterval(timer)
        setIsDubbing(false)
        setStatus({ status: 'Failed', progress: 0, message: "Polling failed" })
        alert("Error during status polling: " + err.message)
      }
    }, 2000)
  }

  return (
    <div className="video-dubbing-page">
      <div className="vd-header">
        <h1>Video Dubbing</h1>
        <p>Dub your videos into multiple languages with AI voices</p>
      </div>

      <div className="vd-content">
        <motion.div 
          className="vd-form"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="vd-upload">
            <Upload size={32} />
            <h3>Upload Video</h3>
            <p>Your video file (MP4, WebM, etc.)</p>
            <input 
              type="file" 
              accept="video/*"
              onChange={handleVideoUpload}
              className="vd-hidden-input"
            />
            {videoFile && <p className="vd-file-name">✓ {videoFile.name}</p>}
          </div>

          <div className="vd-grid">
            <div className="vd-control">
              <label>Source Language</label>
              <select value={sourceLanguage} onChange={(e) => setSourceLanguage(e.target.value)}>
                {languages.map(lang => (
                  <option key={lang.code} value={lang.code}>{lang.name}</option>
                ))}
              </select>
            </div>

            <div className="vd-control">
              <label>Target Language</label>
              <select value={targetLanguage} onChange={(e) => setTargetLanguage(e.target.value)}>
                {languages.map(lang => (
                  <option key={lang.code} value={lang.code}>{lang.name}</option>
                ))}
              </select>
            </div>
          </div>

          {isDubbing && (
            <div className="progress-bar-wrap">
              <div className="progress-bar">
                <motion.div 
                  className="progress-fill-hq" 
                  initial={{ width: 0 }}
                  animate={{ width: `${status?.progress || 0}%` }}
                />
              </div>
              <div className="progress-stats">
                <span>{status?.status || 'Processing'}</span>
                <strong>{status?.progress || 0}%</strong>
              </div>
            </div>
          )}

          <button 
            className={`vd-dub-btn ${isDubbing ? 'loading' : ''}`}
            onClick={handleDub}
            disabled={!videoFile || isDubbing}
          >
            {isDubbing ? (
              <>
                <Zap size={18} className="spin" />
                Processing Job...
              </>
            ) : (
              <>
                <Globe size={18} />
                Start Dubbing
              </>
            )}
          </button>
        </motion.div>

        <AnimatePresence>
          {result && (
            <motion.div 
              className="vd-result"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Volume2 size={32} />
              <h3>Dubbing Complete</h3>
              <p>{result.original} → {result.targetLang}</p>
              <small>Job ID: {result.id}</small>
              <button className="vd-download">
                <Download size={18} />
                Download Dubbed Video
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default VideoDubbing





