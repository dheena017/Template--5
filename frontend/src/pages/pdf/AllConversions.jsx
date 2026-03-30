import React, { useEffect, useMemo, useState } from 'react'
import { Search, Download, Loader2, AlertCircle, CheckCircle2, Layers } from 'lucide-react'
import { api } from '../../services/api'
import '../../styles/pages/pdf/AllConversions.css'
import ToolLayout from '../../components/layouts/ToolLayout'
import KeyboardShortcuts from '../../components/common/KeyboardShortcuts'

const AllConversions = () => {
  const [catalog, setCatalog] = useState([])
  const [search, setSearch] = useState('')
  const [selectedKey, setSelectedKey] = useState('')
  const [files, setFiles] = useState([])
  const [isLoadingCatalog, setIsLoadingCatalog] = useState(true)
  const [isConverting, setIsConverting] = useState(false)
  const [error, setError] = useState('')
  const [downloadUrl, setDownloadUrl] = useState('')
  const [downloadName, setDownloadName] = useState('converted-file')

  useEffect(() => {
    let cancelled = false
    const loadCatalog = async () => {
      setIsLoadingCatalog(true)
      setError('')
      try {
        const data = await api.pdf.getUniversalCatalog()
        if (!cancelled) {
          setCatalog(data.items || [])
          if ((data.items || []).length > 0) {
            setSelectedKey(data.items[0].conversion_key)
          }
        }
      } catch (err) {
        if (!cancelled) setError(err?.message || 'Failed to load conversion catalog')
      } finally {
        if (!cancelled) setIsLoadingCatalog(false)
      }
    }
    loadCatalog()
    return () => {
      cancelled = true
    }
  }, [])

  useEffect(() => {
    return () => {
      if (downloadUrl) URL.revokeObjectURL(downloadUrl)
    }
  }, [downloadUrl])

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    if (!q) return catalog
    return catalog.filter((item) => {
      return (
        item.conversion_key.toLowerCase().includes(q) ||
        String(item.label || '').toLowerCase().includes(q) ||
        String(item.engine || '').toLowerCase().includes(q)
      )
    })
  }, [search, catalog])

  const selected = useMemo(() => catalog.find((c) => c.conversion_key === selectedKey) || null, [catalog, selectedKey])

  const handleConvert = async () => {
    if (!selected) return
    if (!selected.supported) {
      setError(`${selected.conversion_key} is not supported yet.`)
      return
    }
    if (!files.length) {
      setError('Please select file(s) first.')
      return
    }

    setIsConverting(true)
    setError('')
    if (downloadUrl) {
      URL.revokeObjectURL(downloadUrl)
      setDownloadUrl('')
    }

    try {
      const res = await api.pdf.universalConvert(selected.conversion_key, files)
      if (!res.ok) {
        let detail = 'Conversion failed'
        try {
          const body = await res.json()
          detail = body?.detail || detail
        } catch {
          // ignore JSON parse failure and keep fallback message
        }
        throw new Error(detail)
      }
      const blob = await res.blob()
      const url = URL.createObjectURL(blob)
      const extension = selected.output && selected.output !== 'unknown' ? selected.output : 'bin'
      setDownloadName(`${selected.conversion_key}.${extension}`)
      setDownloadUrl(url)
    } catch (err) {
      setError(err?.message || 'Conversion failed')
    } finally {
      setIsConverting(false)
    }
  }

  return (
    <ToolLayout 
        title="All Conversions" 
        subtitle="One page for all available format conversions from your backend Python engines." 
        icon={Layers} 
        color="#a855f7"
        category="Document Intelligence"
    >
        <div className="all-conversions-toolbar">
          <label className="all-conversions-search">
            <Search size={16} />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search conversion key (example: pdf_to_word)"
            />
          </label>
          <div className="all-conversions-count">{filtered.length} tools</div>
        </div>

        {isLoadingCatalog ? (
          <div className="all-conversions-empty">Loading catalog...</div>
        ) : (
          <div className="all-conversions-layout">
            <div className="all-conversions-list">
              {filtered.map((item) => (
                <button
                  key={item.conversion_key}
                  type="button"
                  className={`all-conversions-item ${selectedKey === item.conversion_key ? 'active' : ''}`}
                  onClick={() => {
                    setSelectedKey(item.conversion_key)
                    setFiles([])
                    setError('')
                  }}
                >
                  <span className="key">{item.conversion_key}</span>
                  <span className={`status ${item.supported ? 'ok' : 'na'}`}>
                    {item.supported ? 'supported' : 'not-ready'}
                  </span>
                </button>
              ))}
            </div>

            <div className="all-conversions-panel">
              {selected ? (
                <>
                  <h2>{selected.label || selected.conversion_key}</h2>
                  <p className="engine">Engine: {selected.engine || 'N/A'}</p>
                  <p className="support-row">
                    {selected.supported ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
                    {selected.supported ? 'Ready to convert' : (selected.reason || 'Not implemented yet')}
                  </p>

                  <input
                    type="file"
                    multiple={!!selected.accepts_multiple_files}
                    onChange={(e) => setFiles(Array.from(e.target.files || []))}
                  />
                  {files.length > 0 && <p className="files-note">{files.length} file(s) selected</p>}

                  <div className="actions">
                    <button type="button" onClick={handleConvert} disabled={isConverting || !selected.supported}>
                      {isConverting ? <Loader2 size={16} className="spin" /> : null}
                      {isConverting ? 'Converting...' : 'Convert'}
                    </button>
                    {downloadUrl && (
                      <a href={downloadUrl} download={downloadName}>
                        <Download size={16} />
                        Download
                      </a>
                    )}
                  </div>

                  {error && <div className="error">{error}</div>}
                </>
              ) : (
                <div className="all-conversions-empty">Select a conversion</div>
              )}
            </div>
          </div>
        )}
        <div style={{ marginTop: '2rem' }}>
          <KeyboardShortcuts />
        </div>
    </ToolLayout>
  )
}

export default AllConversions

