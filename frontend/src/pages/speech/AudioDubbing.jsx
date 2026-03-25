import React, { useEffect, useState } from 'react'
import { Upload, Volume2, Globe, Zap, Download } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { api, logger } from '../../services/api'
import '../../styles/pages/speech/AudioDubbing.css'

const AudioDubbing = () => {
  const [audioFile, setAudioFile] = useState(null)
  const [sourceLanguage, setSourceLanguage] = useState('en')
  const [targetLanguage, setTargetLanguage] = useState('es')
  const [isDubbing, setIsDubbing] = useState(false)
  const [result, setResult] = useState(null)
  const [status, setStatus] = useState(null)
  const [_jobId, setJobId] = useState(null)

  useEffect(() => {
    logger.log('AUDIO_DUB', 'Component mounted')
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

  const handleAudioUpload = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      setAudioFile(file)
      logger.log('AUDIO_DUB', 'Audio file uploaded', { fileName: file.name, size: file.size })
    }
  }

  const handleDub = async () => {
    if (!audioFile) {
      alert('Please upload an audio file')
      return
    }

    logger.log('AUDIO_DUB', 'Starting dubbing', { fromLang: sourceLanguage, toLang: targetLanguage })
    setIsDubbing(true)
    setResult(null)
    setStatus({ status: 'Uploading', progress: 5 })
    
    try {
      const uploadRes = await api.uploadFile(audioFile)
      if (!uploadRes || !uploadRes.url) throw new Error("Upload failed")
      
      const res = await api.video.dubbing({
        source_url: uploadRes.url,
        target_lang: targetLanguage,
        mode: 'audio'
      })

      if (res.job_id) {
        setJobId(res.job_id)
        logger.success('AUDIO_DUB', 'Dubbing job created', { jobId: res.job_id })
        pollStatus(res.job_id)
      } else {
        throw new Error(res.error || "Failed to start dubbing job.")
      }
    } catch (err) {
      logger.error('AUDIO_DUB', 'Dubbing failed', err.message)
      alert("Dubbing failed. " + err.message)
      setIsDubbing(false)
      setStatus({ status: 'Failed', progress: 0, message: err.message })
    }
  }

  const pollStatus = async (id) => {
    const timer = setInterval(async () => {
      try {
        const res = await api.video.getStatus(id)
        setStatus(res)
        if (res.status === 'Completed') {
          setResult({
            id: id,
            original: audioFile.name,
            targetLang: languages.find(l => l.code === targetLanguage)?.name,
            url: res.result.url,
            duration: Math.round(audioFile.size / 1024 / 200) + ' seconds'
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
    <div className="audio-dubbing-page">
      <div className="ad-header">
        <h1>Audio Dubbing</h1>
        <p>Dub your audio into different languages instantly</p>
      </div>

      <div className="ad-content">
        <motion.div 
          className="ad-form"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="ad-upload">
            <Upload size={32} />
            <h3>Upload Audio</h3>
            <p>Your audio file (MP3, WAV, M4A, etc.)</p>
            <input 
              type="file" 
              accept="audio/*"
              onChange={handleAudioUpload}
              className="ad-hidden-input"
            />
            {audioFile && <p className="ad-file-name">✓ {audioFile.name}</p>}
          </div>

          <div className="ad-grid">
            <div className="ad-control">
              <label>Source Language</label>
              <select value={sourceLanguage} onChange={(e) => setSourceLanguage(e.target.value)}>
                {languages.map(lang => (
                  <option key={lang.code} value={lang.code}>{lang.name}</option>
                ))}
              </select>
            </div>

            <div className="ad-control">
              <label>Target Language</label>
              <select value={targetLanguage} onChange={(e) => setTargetLanguage(e.target.value)}>
                {languages.map(lang => (
                  <option key={lang.code} value={lang.code}>{lang.name}</option>
                ))}
              </select>
            </div>
          </div>

          {isDubbing && (
            <div className="progress-bar-wrap" style={{ marginTop: '20px' }}>
              <div className="progress-bar" style={{ height: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', overflow: 'hidden' }}>
                <motion.div 
                  className="progress-fill-hq" 
                  initial={{ width: 0 }}
                  animate={{ width: `${status?.progress || 0}%` }}
                  style={{ height: '100%', background: 'linear-gradient(90deg, var(--primary) 0%, var(--accent) 100%)', borderRadius: '4px' }}
                />
              </div>
              <div className="progress-stats" style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                <span>{status?.status || 'Processing'}</span>
                <strong>{status?.progress || 0}%</strong>
              </div>
            </div>
          )}

          <button 
            className={`ad-dub-btn ${isDubbing ? 'loading' : ''}`}
            onClick={handleDub}
            disabled={!audioFile || isDubbing}
          >
            {isDubbing ? (
              <>
                <Zap size={18} className="spin" />
                Processing...
              </>
            ) : (
              <>
                <Globe size={18} />
                Dub Audio
              </>
            )}
          </button>
        </motion.div>

        <AnimatePresence>
          {result && (
            <motion.div 
              className="ad-result"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Volume2 size={32} />
              <h3>Dubbing Complete</h3>
              <p>{result.original}</p>
              <p className="ad-lang-pair">{result.targetLang}</p>
              <small>Duration: {result.duration}</small>
              <button className="ad-download">
                <Download size={18} />
                Download Dubbed Audio
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default AudioDubbing





