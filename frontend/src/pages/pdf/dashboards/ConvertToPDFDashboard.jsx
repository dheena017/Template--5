import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  Search, ArrowUpRight, FileUp, FileText, ImageIcon, Table, Presentation, Box, BookOpen, HardDrive
} from 'lucide-react'
import '../../../styles/pages/dashboards/DashboardIndex.css'
import { PrimaryButton } from '../../../components/buttons'
import SearchBar from '../../../components/common/SearchBar/SearchBar'


const TOOLS = [
  { id: 'word-to-pdf', name: 'Word to PDF', icon: FileText, color: '#42a5f5' },
  { id: 'jpg-to-pdf', name: 'JPG to PDF', icon: ImageIcon, color: '#ffca28' },
  { id: 'excel-to-pdf', name: 'Excel to PDF', icon: Table, color: '#66bb6a' },
  { id: 'ppt-to-pdf', name: 'PPT to PDF', icon: Presentation, color: '#ff7043' },
  { id: 'cad-to-pdf', name: 'CAD to PDF', icon: Box, color: '#8e24aa' },
  { id: 'epub-to-pdf', name: 'EPUB to PDF', icon: BookOpen, color: '#ab47bc' }
]

const ConvertToPDFDashboard = () => {
    const navigate = useNavigate()
    const [search, setSearch] = useState('')

    const filteredTools = TOOLS.filter(t => 
        t.name.toLowerCase().includes(search.toLowerCase())
    )

    return (
        <section className="pdf-pages-shell">
            <main className="pdf-pages-main p-8 md:p-12 w-full max-w-[1400px] mx-auto">
                <header className="pdf-pages-header mb-12 flex justify-between items-center bg-white/5 p-8 rounded-3xl border border-white/10">
                    <div className="flex items-center gap-6">
                        <div className="p-4 bg-sky-500/20 rounded-2xl">
                             <FileUp className="text-sky-400" size={32} />
                        </div>
                        <div>
                            <h2 className="text-3xl font-black text-white">Convert to PDF</h2>
                            <p className="text-slate-400">Transform any file format into a professional PDF</p>
                        </div>
                    </div>

                    <SearchBar 
                        placeholder="Find creation tool..."
                        onSearch={(val) => setSearch(val)}
                        className="w-96"
                    />

                </header>

                <div className="portal-tools-main-grid">
                    {filteredTools.map((tool, idx) => {
                        const Icon = tool.icon
                        return (
                            <div
                                key={tool.id}
                                className="portal-tool-card"
                                style={{ 
                                    backgroundColor: '#0f1016',
                                    border: '1px solid rgba(255, 255, 255, 0.04)',
                                    animationDelay: `${idx * 0.05}s`,
                                    cursor: 'pointer'
                                }}
                                onClick={() => navigate(`/${tool.id}`)}
                            >
                                <div className="tool-card-top">
                                    <div className="tool-suite-info">
                                        <div className="suite-icon-mini" style={{ color: tool.color }}>
                                            <Icon size={14} />
                                        </div>
                                        <span className="suite-name-tag">IMPORT</span>
                                    </div>
                                    <div className="tool-action-indicator">
                                        <ArrowUpRight size={14} />
                                    </div>
                                </div>

                                <div className="tool-card-body">
                                    <h3>{tool.name}</h3>
                                    <div className="tool-card-footer">
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
                            </div>
                        )
                    }
                    )}
                </div>
            </main>
        </section>
    )
}

export default ConvertToPDFDashboard
