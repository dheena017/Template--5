import React, { useEffect, useState } from 'react'
import { Mic2, Volume2, Globe, Zap, Check, Upload } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { api, logger } from '../../services/api'
import '../../styles/pages/speech/Pronunciation.css'

const Pronunciation = () => {
  const [word, setWord] = useState('')
  const [audioFile, setAudioFile] = useState(null)
  const [language, setLanguage] = useState('en')
  const [pronunciation, setPronunciation] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [saved, setSaved] = useState([])
  const [_jobId, setJobId] = useState(null)

  useEffect(() => {
    logger.log('PRONUNCIATION', 'Component mounted')
  }, [])

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Spanish' },
    { code: 'fr', name: 'French' },
    { code: 'de', name: 'German' },
    { code: 'it', name: 'Italian' },
    { code: 'ja', name: 'Japanese' }
  ]

  const _handleAudioUpload = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      setAudioFile(file)
      logger.log('PRONUNCIATION', 'Audio file uploaded', { fileName: file.name })
    }
  }

  const handleCheck = async () => {
    if (!word.trim() || !audioFile) {
      alert('Please enter text and upload an audio file')
      return
    }

    logger.log('PRONUNCIATION', 'Starting pronunciation check', { word, language })
    setIsLoading(true)
    try {
      const uploadRes = await api.uploadFile(audioFile)
      if (!uploadRes || !uploadRes.url) throw new Error("Upload failed")
      
      const res = await api.video.pronunciation({
        audio_url: uploadRes.url,
        text: word
      })

      if (res.job_id) {
        setJobId(res.job_id)
        logger.success('PRONUNCIATION', 'Check job created', { jobId: res.job_id })
        pollStatus(res.job_id)
      } else {
        throw new Error(res.error || "Failed to start pronunciation check.")
      }
    } catch (err) {
      logger.error('PRONUNCIATION', 'Pronunciation check failed', err.message)
      setIsLoading(false)
      alert('Pronunciation check failed: ' + err.message)
    }
  }

  const pollStatus = async (id) => {
    const timer = setInterval(async () => {
      try {
        const res = await api.video.getStatus(id)
        if (res.status === 'Completed') {
          setIsLoading(false)
          clearInterval(timer)
          setPronunciation({
            word,
            language,
            phonetic: res.result?.phonetic || `/prəˌnaʊnsiˈeɪʃən/`,
            audio: res.result?.audio_url || 'https://example.com/audio',
            score: res.result?.overall_score || 92,
            feedback: res.result?.feedback || []
          })
        } else if (res.status === 'Failed') {
          setIsLoading(false)
          clearInterval(timer)
          alert("Pronunciation check failed: " + (res.message || "Unknown error"))
        }
      } catch (err) {
        console.error("Polling error:", err)
        clearInterval(timer)
        setIsLoading(false)
      }
    }, 2000)
  }

  const handleSave = () => {
    if (pronunciation) {
      setSaved(prev => [...prev, pronunciation])
      setWord('')
      setAudioFile(null)
      setPronunciation(null)
    }
  }

  return (
    <div className="pronunciation-page">
      <div className="pron-header">
        <h1>Pronunciation Guide</h1>
        <p>Check and learn correct pronunciations in multiple languages</p>
      </div>

      <div className="pron-content">
        <motion.div 
          className="pron-checker"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="pron-input-group">
            <label>Enter Word or Phrase</label>
            <input 
              type="text" 
              value={word}
              onChange={(e) => setWord(e.target.value)}
              placeholder="Type a word or phrase..."
              onKeyPress={(e) => e.key === 'Enter' && handleCheck()}
            />
          </div>

          <div className="pron-language">
            <label>Language</label>
            <select value={language} onChange={(e) => setLanguage(e.target.value)}>
              {languages.map(lang => (
                <option key={lang.code} value={lang.code}>{lang.name}</option>
              ))}
            </select>
          </div>

          <button 
            className={`pron-check-btn ${isLoading ? 'loading' : ''}`}
            onClick={handleCheck}
            disabled={!word.trim() || isLoading}
          >
            {isLoading ? (
              <>
                <Zap size={18} className="spin" />
                Checking...
              </>
            ) : (
              <>
                <Mic2 size={18} />
                Check Pronunciation
              </>
            )}
          </button>
        </motion.div>

        {pronunciation && (
          <motion.div 
            className="pron-result"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <h3>{pronunciation.word}</h3>
            <p className="pron-phonetic">{pronunciation.phonetic}</p>
            <div className="pron-buttons">
              <button className="pron-play">
                <Volume2 size={18} />
                Play Audio
              </button>
              <button className="pron-save" onClick={handleSave}>
                <Check size={18} />
                Save
              </button>
            </div>
          </motion.div>
        )}

        {saved.length > 0 && (
          <motion.div 
            className="pron-saved"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h3>Saved Pronunciations ({saved.length})</h3>
            <div className="pron-list">
              {saved.map((item, idx) => (
                <div key={idx} className="pron-item">
                  <div>
                    <p>{item.word}</p>
                    <small>{item.phonetic}</small>
                  </div>
                  <button className="pron-item-play">
                    <Volume2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default Pronunciation





