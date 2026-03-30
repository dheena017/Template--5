import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  Search, ArrowUpRight, Bot, Box, FileText, Layers, Languages, Zap
} from 'lucide-react'
import '../../../styles/pages/dashboards/DashboardIndex.css'
import { PrimaryButton } from '../../../components/buttons'
import SearchBar from '../../../components/common/SearchBar/SearchBar'


const TOOLS = [
  { id: 'ocr-pdf', name: 'OCR PDF', icon: Box, color: '#f59e0b' },
  { id: 'chat-pdf', name: 'Chat with PDF', icon: Bot, color: '#7c3aed' },
  { id: 'summarize', name: 'Summarize PDF', icon: FileText, color: '#10b981' },
  { id: 'extract-data', name: 'Extract Data', icon: Layers, color: '#db2777' },
  { id: 'translate-pdf', name: 'Translate PDF', icon: Languages, color: '#111827' }
]

const PDFIntelligenceDashboard = () => {
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
                        <div className="p-4 bg-amber-500/20 rounded-2xl">
                             <Bot className="text-amber-400" size={32} />
                        </div>
                        <div>
                            <h2 className="text-3xl font-black text-white">PDF Intelligence</h2>
                            <p className="text-slate-400">Neural data extraction, OCR, and AI-driven document chat</p>
                        </div>
                    </div>

                    <SearchBar 
                        placeholder="Find AI tool..."
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
                                        <span className="suite-name-tag">AI INTELLIGENCE</span>
                                    </div>
                                    <div className="tool-action-indicator">
                                        <ArrowUpRight size={14} />
                                    </div>
                                </div>

                                <div className="tool-card-body">
                                    <h3>{tool.name}</h3>
                                    <div className="tool-card-footer">
                                        <div className="tool-status-dot" style={{ backgroundColor: tool.color }}></div>
                                        <span className="tool-ready-text">Neural Engine Active</span>
                                    </div>

                                    <div className="card-launch-aura">
                                        <PrimaryButton 
                                            className="launch-btn-premium"
                                            size="md"
                                            style={{ backgroundColor: '#7c3aed', color: '#fff', borderRadius: '100px', fontWeight: '800', border: 'none', boxShadow: '0 10px 20px rgba(124, 58, 237, 0.3)', paddingInline: '2rem' }}
                                        >
                                            Generate
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

export default PDFIntelligenceDashboard
