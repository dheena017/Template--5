import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import '../../styles/pages/pdf/PDFWorkflowPages.css'

const MODES = [
  { key: 'merge', label: 'Merge PDFs' },
  { key: 'split', label: 'Split PDF' },
  { key: 'rotate', label: 'Rotate PDF' },
  { key: 'extract', label: 'Extract Pages' },
  { key: 'convert', label: 'Convert PDF Format' },
]

const PDFEditMode = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [mode, setMode] = useState(MODES[0].key)
  const files = Array.isArray(location.state?.files) ? location.state.files : []

  return (
    <section className="pdf-workflow-shell">
      <div className="pdf-workflow-card">
        <h1>PDF Edit Mode</h1>
        <p>Choose how you want to process your selected PDF files.</p>

        <div className="pdf-workflow-list">
          {MODES.map((item) => (
            <label key={item.key} className="pdf-workflow-item radio">
              <input
                type="radio"
                name="pdf-mode"
                value={item.key}
                checked={mode === item.key}
                onChange={(event) => setMode(event.target.value)}
              />
              <span>{item.label}</span>
            </label>
          ))}
        </div>

        <div className="pdf-workflow-actions">
          <button type="button" onClick={() => navigate('/tools/pdf/select-files')}>
            Back
          </button>
          <button
            type="button"
            onClick={() => navigate(`/tools/pdf/convert?mode=${mode}`, { state: { files } })}
            disabled={files.length === 0}
          >
            Next: Convert
          </button>
        </div>
      </div>
    </section>
  )
}

export default PDFEditMode
