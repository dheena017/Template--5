import React, { useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { api } from '../../services/api'
import '../../styles/pages/pdf/PDFWorkflowPages.css'

const modeToConversion = {
  merge: 'pdf_merge',
  split: 'pdf_split',
  rotate: 'pdf_to_jpg',
  extract: 'pdf_to_word',
  convert: 'pdf_to_word',
}

const PDFConvert = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [files, setFiles] = useState(() => (Array.isArray(location.state?.files) ? location.state.files : []))
  const [isConverting, setIsConverting] = useState(false)
  const [error, setError] = useState('')
  const [downloadUrl, setDownloadUrl] = useState('')

  const mode = useMemo(() => new URLSearchParams(location.search).get('mode') || 'convert', [location.search])
  const conversionKey = modeToConversion[mode] || 'pdf_to_word'

  const onConvert = async () => {
    if (!files.length) {
      setError('Please select file(s) before converting.')
      return
    }
    setError('')
    setIsConverting(true)

    try {
      const res = await api.pdf.universalConvert(conversionKey, files)
      if (!res.ok) {
        const body = await res.json().catch(() => ({}))
        throw new Error(body.detail || 'Conversion failed')
      }
      const blob = await res.blob()
      if (downloadUrl) URL.revokeObjectURL(downloadUrl)
      setDownloadUrl(URL.createObjectURL(blob))
    } catch (err) {
      setError(err?.message || 'Conversion failed')
    } finally {
      setIsConverting(false)
    }
  }

  return (
    <section className="pdf-workflow-shell">
      <div className="pdf-workflow-card">
        <h1>PDF Convert</h1>
        <p>Current mode: <strong>{mode}</strong> | Conversion key: <strong>{conversionKey}</strong></p>

        <input
          type="file"
          multiple
          accept=".pdf,application/pdf,image/*,.doc,.docx,.ppt,.pptx,.xls,.xlsx"
          onChange={(event) => setFiles(Array.from(event.target.files || []))}
        />

        <div className="pdf-workflow-actions">
          <button type="button" onClick={() => navigate('/tools/pdf/edit-mode', { state: { files } })}>
            Back
          </button>
          <button type="button" onClick={onConvert} disabled={isConverting}>
            {isConverting ? 'Converting...' : 'Run Conversion'}
          </button>
          {downloadUrl && (
            <a href={downloadUrl} download={`${conversionKey}_output`}>
              Download Output
            </a>
          )}
        </div>

        {error && <div className="error">{error}</div>}
      </div>
    </section>
  )
}

export default PDFConvert
