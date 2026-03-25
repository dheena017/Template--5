import React, { useEffect, useState } from 'react'
import { Upload, Mic2, Music, Settings, Zap, Download } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { api, logger } from '../../services/api'
import '../../styles/pages/studio/VideoPodcast.css'


const VideoPodcast = () => {
  const [podcastTitle, setPodcastTitle] = useState('')
  const [audioFile, setAudioFile] = useState(null)
  const [backgroundVideo, setBackgroundVideo] = useState(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [output, setOutput] = useState(null)
  const [status, setStatus] = useState(null)
  const [_jobId, setJobId] = useState(null)

  useEffect(() => {
    logger.log('PODCAST', 'Component mounted')
  }, [])

  const handleAudioUpload = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      setAudioFile(file)
      logger.log('PODCAST', 'Audio file uploaded', { fileName: file.name })
    }
  }

  const handleVideoUpload = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      setBackgroundVideo(file)
      logger.log('PODCAST', 'Background video uploaded', { fileName: file.name })
    }
  }

  const handleGenerate = async () => {
    if (!audioFile || !backgroundVideo) return

    logger.log('PODCAST', 'Starting podcast generation', { title: podcastTitle })
    setIsGenerating(true)
    setOutput(null)
    setStatus({ status: 'Uploading Assets', progress: 5 })
    
    try {
      const [audioRes, videoRes] = await Promise.all([
        api.uploadFile(audioFile),
        api.uploadFile(backgroundVideo)
      ])

      if (!audioRes.url || !videoRes.url) throw new Error("Upload failed")
      
      const res = await api.video.getPodcast({
        script: podcastTitle || 'No title',
        audio_url: audioRes.url,
        video_url: videoRes.url,
        title: podcastTitle || 'Untitled Podcast'
      })

      if (res.job_id) {
        setJobId(res.job_id)
        logger.success('PODCAST', 'Podcast job created', { jobId: res.job_id })
        pollStatus(res.job_id)
        pollStatus(res.job_id)
      } else {
        throw new Error(res.error || "Failed to start podcast job.")
      }
    } catch (err) {
      console.error(err)
      setIsGenerating(false)
      setStatus({ status: 'Failed', progress: 0, message: err.message })
    }
  }

  const pollStatus = async (id) => {
    const timer = setInterval(async () => {
      try {
        const res = await api.video.getStatus(id)
        setStatus(res)
        if (res.status === 'Completed') {
          setOutput({
            id: id,
            title: podcastTitle || 'Untitled Podcast',
            duration: res.result.duration || 'Processed',
            preview: res.result.preview_url || 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=400',
            url: res.result.url
          })
          setIsGenerating(false)
          clearInterval(timer)
        } else if (res.status === 'Failed') {
          setIsGenerating(false)
          clearInterval(timer)
          alert("Podcast creation failed: " + (res.message || "Unknown error"))
        }
      } catch (err) {
        console.error("Polling error:", err)
        clearInterval(timer)
        setIsGenerating(false)
      }
    }, 2000)
  }

  return (
    <div className="video-podcast-page">
      <div className="vp-header">
        <h1>Video Podcast</h1>
        <p>Transform your podcast into engaging video content</p>
      </div>

      <div className="vp-content">
        <motion.div 
          className="vp-form"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="vp-section">
            <label>Podcast Title</label>
            <input 
              type="text" 
              value={podcastTitle}
              onChange={(e) => setPodcastTitle(e.target.value)}
              placeholder="Enter podcast episode title..."
            />
          </div>

          <div className="vp-grid">
            <div className="vp-upload-box">
              <Mic2 size={32} />
              <h3>Upload Audio</h3>
              <p>Your podcast audio file (MP3, WAV, etc.)</p>
              <input 
                type="file" 
                accept="audio/*"
                onChange={handleAudioUpload}
                className="vp-hidden-input"
              />
              {audioFile && <p className="vp-file-name">✓ {audioFile.name}</p>}
            </div>

            <div className="vp-upload-box">
              <Music size={32} />
              <h3>Background Video</h3>
              <p>Static or looping video background</p>
              <input 
                type="file" 
                accept="video/*"
                onChange={handleVideoUpload}
                className="vp-hidden-input"
              />
              {backgroundVideo && <p className="vp-file-name">✓ {backgroundVideo.name}</p>}
            </div>
          </div>

          {isGenerating && (
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
            className={`vp-generate-btn ${isGenerating ? 'loading' : ''}`}
            onClick={handleGenerate}
            disabled={!audioFile || !backgroundVideo || isGenerating}
          >
            {isGenerating ? (
              <>
                <Zap size={18} className="spin" />
                Generating Podcast...
              </>
            ) : (
              <>
                <Settings size={18} />
                Generate Video Podcast
              </>
            )}
          </button>
        </motion.div>

        <AnimatePresence>
          {output && (
            <motion.div 
              className="vp-result"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="vp-preview">
                <img src={output.preview} alt="Podcast" />
                <div className="vp-overlay">
                  <Music size={48} />
                </div>
              </div>
              <div className="vp-info">
                <h3>{output.title}</h3>
                <p>Duration: {output.duration}</p>
                <button className="vp-download">
                  <Download size={18} />
                  Export Video
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default VideoPodcast





