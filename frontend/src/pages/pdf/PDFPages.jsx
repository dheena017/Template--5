import React, { useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import {
  Search,
  FileText,
  ChevronDown,
  Image as ImageIcon,
  Table,
  Presentation,
  Lock,
  Unlock,
  Files,
  ListChecks,
  BookOpen,
  Languages,
  Film,
  Layers,
  Box,
  Pin,
  Music,
  ShieldCheck
} from 'lucide-react'
import OrganizePDF from './OrganizePDF'
import '../../styles/pages/pdf/PDFPages.css'

const CANONICAL_TOOL_KEYS = [
  'aac_to_ac3',
  'aac_to_flac',
  'aac_to_mp3',
  'aac_to_ogg',
  'aac_to_wav',
  'ac3_to_aac',
  'ac3_to_flac',
  'ac3_to_mp3',
  'ac3_to_ogg',
  'ac3_to_wav',
  'avi_to_mkv',
  'avi_to_mov',
  'avi_to_mp4',
  'avi_to_wmv',
  'azw3_to_epub',
  'azw3_to_mobi',
  'azw3_to_pdf',
  'batch_images_to_pdf',
  'cad_to_pdf',
  'cad_to_word',
  'caj_to_pdf',
  'caj_to_word',
  'cbr_to_pdf',
  'cbz_to_pdf',
  'epub_to_azw3',
  'epub_to_mobi',
  'epub_to_pdf',
  'excel_merge',
  'excel_split',
  'excel_to_pdf',
  'flac_to_aac',
  'flac_to_ac3',
  'flac_to_ogg',
  'flac_to_wav',
  'heic_to_jpeg',
  'heic_to_jpg',
  'heic_to_png',
  'heic_to_webp',
  'hwp_to_pdf',
  'hwp_to_txt',
  'hwp_to_word',
  'image_compression',
  'jpg_to_pdf',
  'jpg_to_webp',
  'jpg_to_word',
  'mkv_to_avi',
  'mkv_to_mov',
  'mkv_to_mp4',
  'mkv_to_wmv',
  'mobi_to_azw3',
  'mobi_to_epub',
  'mobi_to_pdf',
  'mov_to_avi',
  'mov_to_mkv',
  'mov_to_mp4',
  'mov_to_wmv',
  'mp3_to_aac',
  'mp3_to_ac3',
  'mp3_to_flac',
  'mp3_to_ogg',
  'mp3_to_wav',
  'mp4_to_avi',
  'mp4_to_mkv',
  'mp4_to_mov',
  'mp4_to_wmv',
  'ofd_to_pdf',
  'ofd_to_word',
  'ogg_to_aac',
  'ogg_to_ac3',
  'ogg_to_flac',
  'ogg_to_mp3',
  'ogg_to_wav',
  'pdf_chinese_english',
  'pdf_compression',
  'pdf_decryption',
  'pdf_encryption',
  'pdf_english_chinese',
  'pdf_merge',
  'pdf_split',
  'pdf_to_azw3',
  'pdf_to_cad',
  'pdf_to_epub',
  'pdf_to_excel',
  'pdf_to_html',
  'pdf_to_jpg',
  'pdf_to_long_image',
  'pdf_to_mobi',
  'pdf_to_ofd',
  'pdf_to_ppt',
  'pdf_to_word',
  'png_to_pdf',
  'ppt_compression',
  'ppt_to_pdf',
  'svg_to_jpeg',
  'svg_to_jpg',
  'svg_to_png',
  'svg_to_webp',
  'wav_to_ac3',
  'wav_to_flac',
  'wav_to_mp3',
  'wav_to_ogg',
  'webp_to_jpeg',
  'webp_to_jpg',
  'webp_to_png',
  'wmv_to_avi',
  'wmv_to_mkv',
  'wmv_to_mov',
  'wmv_to_mp4',
  'word_compression',
  'word_merge',
  'word_to_ofd',
  'word_to_pdf',
  'xps_to_pdf',
  'xps_to_word'
]

const POPULAR_KEYS = new Set([
  'pdf_to_word',
  'jpg_to_pdf',
  'pdf_to_jpg',
  'word_to_pdf',
  'pdf_to_excel',
  'excel_to_pdf',
  'pdf_to_ppt',
  'ppt_to_pdf',
  'pdf_merge',
  'pdf_split',
  'pdf_compression',
  'image_compression',
  'pdf_decryption',
  'jpg_to_word',
  'ofd_to_pdf',
  'pdf_to_ofd',
  'pdf_to_long_image',
  'caj_to_pdf',
  'caj_to_word',
  'cad_to_pdf',
  'pdf_to_cad'
])

const SECTION_CONFIG = [
  { key: 'popular_conversions', title: 'Popular conversions' },
  { key: 'pdf_conversion', title: 'PDF conversion' },
  { key: 'convert_to_pdf', title: 'Convert to PDF' },
  { key: 'image_to_pdf', title: 'Image to PDF' },
  { key: 'image_format_conversion', title: 'Image format conversion' },
  { key: 'pdf_translation', title: 'PDF translation' },
  { key: 'video_conversion', title: 'Video conversion' },
  { key: 'audio_conversion', title: 'Audio conversion' },
  { key: 'other', title: 'Other tools' }
]

const ACRONYMS = new Set(['pdf', 'jpg', 'jpeg', 'png', 'webp', 'svg', 'heic', 'excel', 'ppt', 'ofd', 'caj', 'cad', 'xps', 'hwp', 'txt', 'epub', 'mobi', 'azw3', 'cbr', 'cbz', 'avi', 'mp4', 'mov', 'mkv', 'wmv', 'mp3', 'wav', 'flac', 'aac', 'ac3', 'ogg', 'html'])

const toToolName = (key) => {
  if (key === 'batch_images_to_pdf') return 'Convert images to PDF (Batch)'
  return key
    .split('_')
    .map((part) => {
      if (part === 'to') return 'to'
      if (ACRONYMS.has(part)) return part.toUpperCase()
      return part.charAt(0).toUpperCase() + part.slice(1)
    })
    .join(' ')
}

const isVideoKey = (key) => /(^|_)(avi|mp4|mov|mkv|wmv)(_|$)/.test(key)
const isAudioKey = (key) => /(^|_)(mp3|wav|flac|aac|ac3|ogg)(_|$)/.test(key)
const isEbookKey = (key) => /(epub|mobi|azw3|cbr|cbz)/.test(key)
const isImageKey = (key) => /(jpg|jpeg|png|webp|svg|heic|image)/.test(key)

const getSectionKey = (toolKey) => {
  if (POPULAR_KEYS.has(toolKey)) return 'popular_conversions'
  if (toolKey === 'pdf_chinese_english' || toolKey === 'pdf_english_chinese') return 'pdf_translation'
  if (isAudioKey(toolKey)) return 'audio_conversion'
  if (isVideoKey(toolKey)) return 'video_conversion'

  if (isImageKey(toolKey)) {
    if (toolKey.endsWith('_to_pdf')) return 'convert_to_pdf' // Grouping JPG to PDF etc in Convert to PDF if non-popular
    return 'image_format_conversion'
  }

  // Explicit mapping based on source/target
  if (toolKey.startsWith('pdf_to_')) return 'pdf_conversion'
  if (toolKey.endsWith('_to_pdf')) return 'convert_to_pdf'

  // Specific catch-alls requested
  if (/(word|excel|ppt|ofd|caj|cad|xps|hwp|pdf)/.test(toolKey)) {
    if (toolKey.startsWith('pdf_')) return 'pdf_conversion'
    if (toolKey.endsWith('_pdf')) return 'convert_to_pdf'
    return 'pdf_conversion'
  }

  return 'other'
}

const getToolVisual = (toolKey) => {
  if (toolKey === 'pdf_encryption') return { icon: Lock, color: '#039be5' }
  if (toolKey === 'pdf_decryption') return { icon: Unlock, color: '#29b6f6' }
  if (toolKey.includes('merge')) return { icon: Files, color: '#e53935' }
  if (toolKey.includes('split')) return { icon: ListChecks, color: '#ff5252' }
  if (isAudioKey(toolKey)) return { icon: Music, color: '#8e24aa' }
  if (isVideoKey(toolKey)) return { icon: Film, color: '#ef5350' }
  if (isEbookKey(toolKey)) return { icon: BookOpen, color: '#ab47bc' }
  if (toolKey.includes('translation') || toolKey.includes('chinese') || toolKey.includes('english')) return { icon: Languages, color: '#5e35b1' }
  if (isImageKey(toolKey)) return { icon: ImageIcon, color: '#ffca28' }
  if (toolKey.includes('excel')) return { icon: Table, color: '#66bb6a' }
  if (toolKey.includes('ppt')) return { icon: Presentation, color: '#ff7043' }
  if (toolKey.includes('cad')) return { icon: Box, color: '#8e24aa' }
  if (toolKey.includes('compression')) return { icon: Pin, color: '#43a047' }
  if (toolKey.includes('batch')) return { icon: Layers, color: '#ffca28' }
  return { icon: FileText, color: '#42a5f5' }
}

const PDF_TOOL_SECTIONS = SECTION_CONFIG.map((section) => {
  const sectionTools = CANONICAL_TOOL_KEYS
    .filter((toolKey) => getSectionKey(toolKey) === section.key)
    .map((toolKey) => {
      const visual = getToolVisual(toolKey)
      return {
        tool: toolKey,
        name: toToolName(toolKey),
        icon: visual.icon,
        color: visual.color
      }
    })

  return {
    ...section,
    tools: sectionTools
  }
}).filter((section) => section.tools.length > 0)

const PDFPages = ({ forcedTab = null }) => {
  const navigate = useNavigate()
  const location = useLocation()
  const [search, setSearch] = useState('')
  const [activeSection, setActiveSection] = useState(forcedTab || PDF_TOOL_SECTIONS[0]?.key || 'popular_conversions')
  const [showDropdown, setShowDropdown] = useState(false)

  const params = new URLSearchParams(location.search)
  const selectedTool = params.get('tool')
  const tabParam = params.get('tab')

  useEffect(() => {
    if (tabParam && PDF_TOOL_SECTIONS.some(s => s.key === tabParam)) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setActiveSection(tabParam)
    }
  }, [tabParam])

  const filteredSections = useMemo(() => {
    const query = search.trim().toLowerCase()
    if (!query) return PDF_TOOL_SECTIONS

    return PDF_TOOL_SECTIONS
      .map((section) => ({
        ...section,
        tools: section.tools.filter((tool) => tool.name.toLowerCase().includes(query) || tool.tool.includes(query))
      }))
      .filter((section) => section.tools.length > 0)
  }, [search])

  const visibleSection = filteredSections.find((section) => section.key === activeSection) || filteredSections[0]

  if (selectedTool) {
    return <OrganizePDF />
  }

  return (
    <section className="pdf-pages-shell">
      <div className="pdf-hero bg-gradient-to-br from-indigo-900 via-slate-900 to-black py-20 px-8 text-center border-b border-white/5">
        <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight">
            Split PDF Pages - <span className="text-red-500">Fast, Free, and Private</span>
        </h1>
        <p className="text-xl text-slate-400 max-w-3xl mx-auto mb-10">
            Professional PDF tools that run 100% in your browser. No registration required. 
            No cloud uploads—your files never leave your device.
        </p>
        <div className="flex flex-wrap justify-center gap-8 text-sm font-bold text-slate-300">
            <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full border border-white/5">
                <ShieldCheck size={18} className="text-emerald-400" />
                GDPR COMPLIANT
            </div>
            <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full border border-white/5">
                <Lock size={18} className="text-blue-400" />
                SSL SECURE
            </div>
            <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full border border-white/5">
                <Box size={18} className="text-purple-400" />
                NO DATA STORAGE
            </div>
        </div>
      </div>
      <main className="pdf-pages-main">
        <header className="pdf-pages-header">
          <div className="pdf-category-dropdown">
            <button
              type="button"
              className="pdf-dropdown-trigger"
              onClick={() => setShowDropdown(!showDropdown)}
            >
              <div className="trigger-content">
                <span className="current-label">Category:</span>
                <span className="current-value">{visibleSection?.title || 'Select Category'}</span>
              </div>
              <ChevronDown size={18} className={`dropdown-chevron ${showDropdown ? 'rotate' : ''}`} />
            </button>

            {showDropdown && (
              <div className="pdf-dropdown-menu">
                {PDF_TOOL_SECTIONS.map((section) => (
                  <button
                    key={section.key}
                    type="button"
                    className={`pdf-dropdown-item ${activeSection === section.key ? 'active' : ''}`}
                    onClick={() => {
                      setActiveSection(section.key)
                      setShowDropdown(false)
                      navigate(`/tools/pdf?tab=${section.key}`)
                    }}
                  >
                    <span>{section.title}</span>
                    <small>{section.tools.length}</small>
                  </button>
                ))}
              </div>
            )}
          </div>

          <label htmlFor="pdf-pages-search" className="pdf-pages-search">
            <Search size={16} />
            <input
              id="pdf-pages-search"
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search PDF tools"
            />
          </label>
        </header>

        {visibleSection ? (
          <>
            <div className="pdf-pages-title-row">
              <h1>{visibleSection.title}</h1>
              <span>{visibleSection.tools.length} tools</span>
            </div>

            <div className="pdf-pages-grid">
              {visibleSection.tools.map((tool) => {
                const Icon = tool.icon
                return (
                  <button
                    key={tool.tool}
                    type="button"
                    className="pdf-page-card"
                    onClick={() => navigate(`/tools/pdf?tool=${tool.tool}`)}
                  >
                    <span className="pdf-page-icon" style={{ color: tool.color, backgroundColor: `${tool.color}22` }}>
                      <Icon size={18} />
                    </span>
                    <span className="pdf-page-name">{tool.name}</span>
                  </button>
                )
              }
              )}
            </div>
          </>
        ) : (
          <div className="pdf-pages-empty">No matching PDF tools were found.</div>
        )}
      </main>
    </section>
  )
}

export default PDFPages





