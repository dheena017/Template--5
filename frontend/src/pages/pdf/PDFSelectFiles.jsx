import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../../styles/pages/pdf/PDFWorkflowPages.css'

const PDFSelectFiles = () => {
  const navigate = useNavigate()
  const [files, setFiles] = useState([])

  const onFileChange = (event) => {
    const selected = Array.from(event.target.files || [])
    setFiles(selected)
  }

  return (
    <section className="pdf-workflow-shell">
      <div className="pdf-workflow-card">
        <h1>PDF Select Files</h1>
        <p>Select one or more PDF files to start your workflow.</p>

        <input type="file" accept=".pdf,application/pdf" multiple onChange={onFileChange} />

        <div className="pdf-workflow-list">
          {files.length === 0 ? (
            <p className="muted">No files selected yet.</p>
          ) : (
            files.map((file, index) => (
              <div key={`${file.name}_${index}`} className="pdf-workflow-item">
                {index + 1}. {file.name}
              </div>
            ))
          )}
        </div>

        <div className="pdf-workflow-actions">
          <button
            type="button"
            onClick={() => navigate('/tools/pdf/edit-mode', { state: { files } })}
            disabled={files.length === 0}
          >
            Next: Edit Mode
          </button>
        </div>
      </div>
    </section>
  )
}

export default PDFSelectFiles
