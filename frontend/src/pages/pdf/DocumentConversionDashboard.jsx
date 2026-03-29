import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
    Search, ArrowUpRight, FileUp, FileText, ImageIcon, Table, Presentation, Box, BookOpen, HardDrive, Languages, ScanIcon
} from 'lucide-react'
import '../../styles/pages/dashboards/DashboardIndex.css'
import { PrimaryButton } from '../../components/buttons'

const TOOLS = [
    { id: 'word-to-pdf', name: 'Word to PDF', icon: FileText, color: '#42a5f5', desc: 'Convert DOC/DOCX to PDF' },
    { id: 'excel-to-pdf', name: 'Excel to PDF', icon: Table, color: '#66bb6a', desc: 'Convert XLS/XLSX to PDF' },
    { id: 'jpg-to-pdf', name: 'JPG to PDF', icon: ImageIcon, color: '#ffca28', desc: 'Convert JPG/JPEG photos to PDF' },
    { id: 'cad-to-pdf', name: 'CAD to PDF', icon: Box, color: '#8e24aa', desc: 'Convert DWG/DXF drawings to PDF' },
    { id: 'epub-to-pdf', name: 'EPUB to PDF', icon: BookOpen, color: '#ab47bc', desc: 'Convert EPUB eBooks to PDF' },
    { id: 'mobi-to-pdf', name: 'MOBI to PDF', icon: BookOpen, color: '#ec407a', desc: 'Convert MOBI eBooks to PDF' },
    { id: 'azw3-to-pdf', name: 'AZW3 to PDF', icon: BookOpen, color: '#f06292', desc: 'Convert Kindle AZW3 format to PDF' },
    { id: 'hwp-to-pdf', name: 'HWP to PDF', icon: Languages, color: '#26c6da', desc: 'Convert Hangul Word Processor to PDF' },
    { id: 'xps-to-pdf', name: 'XPS to PDF', icon: FileUp, color: '#78909c', desc: 'Convert Microsoft XPS to standard PDF' },
    { id: 'cbr-to-pdf', name: 'CBR to PDF', icon: ScanIcon, color: '#5c6bc0', desc: 'Convert CBR comics to PDF books' },
    { id: 'cbz-to-pdf', name: 'CBZ to PDF', icon: ScanIcon, color: '#3f51b5', desc: 'Convert CBZ comic archives to PDF' }
]

const DocumentConversionDashboard = () => {
    const navigate = useNavigate()
    const [search, setSearch] = useState('')

    const filteredTools = TOOLS.filter(t =>
        t.name.toLowerCase().includes(search.toLowerCase()) ||
        t.desc.toLowerCase().includes(search.toLowerCase())
    )

    return (
        <section className="pdf-pages-shell" style={{ width: '100%', height: '100%', overflowY: 'auto' }}>
            <div className="pdf-hero bg-gradient-to-br from-indigo-900 via-sky-950 to-black py-20 px-8 text-center border-b border-white/5 mb-12">
                <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight">
                    Universal <span className="text-sky-500">Document</span> Hub
                </h1>
                <p className="text-xl text-slate-400 max-w-3xl mx-auto mb-10">
                    Industry-grade document transformation suite. Convert Office files, eBooks, CAD drawings, and specialized formats.
                </p>
                <div className="flex flex-wrap justify-center gap-8 text-sm font-bold text-slate-300">
                    <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full border border-white/5">
                        <HardDrive size={18} className="text-indigo-400" />
                        PRESERVE FORMATTING
                    </div>
                </div>
            </div>

            <main className="pdf-pages-main p-8 pt-10 md:p-12 md:pt-12 w-full max-w-[1400px] mx-auto">
                <header className="pdf-pages-header mb-12 flex justify-between items-center bg-white/5 p-4 rounded-2xl border border-white/10">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-sky-500/20 rounded-xl">
                            <FileText className="text-sky-400" size={24} />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-white">Document Conversion Suite</h2>
                            <p className="text-sm text-slate-400">12 format protocols available</p>
                        </div>
                    </div>

                    <div className="relative w-72 group">
                        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-sky-500 transition-colors" />
                        <input
                            id="doc-conversion-search"
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Find document tool..."
                            autoComplete="off"
                            spellCheck="false"
                            style={{ paddingLeft: '3rem' }}
                            className="w-full bg-black/40 border border-white/10 rounded-full py-3 pr-4 text-white placeholder:text-slate-500 focus:outline-none focus:border-sky-500 focus:bg-black/60 transition-all font-medium"
                        />
                    </div>
                </header>

                {filteredTools.length > 0 ? (
                    <div className="portal-tools-main-grid">
                        {filteredTools.map((tool, idx) => {
                            const Icon = tool.icon
                            return (
                                <button
                                    key={tool.id}
                                    className="portal-tool-card"
                                    style={{
                                        backgroundColor: '#0f1016',
                                        border: '1px solid rgba(255, 255, 255, 0.04)',
                                        animationDelay: `${idx * 0.05}s`
                                    }}
                                    onClick={() => navigate(`/${tool.id}`)}
                                >
                                    <div className="tool-card-top">
                                        <div className="tool-suite-info">
                                            <div className="suite-icon-mini" style={{ color: tool.color }}>
                                                <Icon size={14} />
                                            </div>
                                            <span className="suite-name-tag">DOC CONVERSION</span>
                                        </div>
                                        <div className="tool-action-indicator">
                                            <ArrowUpRight size={14} />
                                        </div>
                                    </div>

                                    <div className="tool-card-body">
                                        <h3>{tool.name}</h3>
                                        <p style={{ color: '#94a3b8', fontSize: '13px', marginTop: '4px', textAlign: 'left' }}>{tool.desc}</p>
                                        <div className="tool-card-footer" style={{ marginTop: 'auto', paddingTop: '16px' }}>
                                            <div className="tool-status-dot" style={{ backgroundColor: tool.color }}></div>
                                            <span className="tool-ready-text">Ready to use</span>
                                        </div>

                                        <div className="card-launch-aura">
                                            <PrimaryButton
                                                className="launch-btn-premium"
                                                size="md"
                                                style={{ backgroundColor: '#7c3aed', color: '#fff', borderRadius: '100px', fontWeight: '800', border: 'none', boxShadow: '0 10px 20px rgba(124, 58, 237, 0.3)', paddingInline: '2rem' }}
                                            >
                                                Open Tool
                                            </PrimaryButton>
                                        </div>
                                    </div>
                                    <div className="card-hover-bg" style={{ background: `radial-gradient(circle at top right, ${tool.color}15, transparent)` }}></div>
                                </button>
                            )
                        }
                        )}
                    </div>
                ) : (
                    <div className="text-center py-20 text-slate-400">
                        <FileText size={48} className="mx-auto mb-4 opacity-20" />
                        <p className="text-xl">No document tools matching "{search}"</p>
                    </div>
                )}
            </main>
        </section>
    )
}

export default DocumentConversionDashboard
