import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  Search, ArrowUpRight, Zap, History, Shield, Minimize, FileVideo, Music
} from 'lucide-react'
import '../../../styles/pages/dashboards/DashboardIndex.css'
import { PrimaryButton } from '../../../components/buttons'
import PDFToolSwitcher from '../../../components/dropdowns/PDFToolSwitcher'

const TOOLS = [
  { id: 'compress', name: 'Compress PDF', icon: Zap, color: '#10b981' },
  { id: 'repair', name: 'Repair PDF', icon: History, color: '#0ea5e9' },
  { id: 'ppt-compress', name: 'Compress PPT', icon: Minimize, color: '#ff7043' },
  { id: 'word-compress', name: 'Compress Word', icon: Minimize, color: '#42a5f5' },
  { id: 'img-compress', name: 'Compress Images', icon: Minimize, color: '#43a047' }
]

const OptimizePDFDashboard = () => {
    const navigate = useNavigate()
    const [search, setSearch] = useState('')

    const filteredTools = TOOLS.filter(t => 
        t.name.toLowerCase().includes(search.toLowerCase())
    )

    return (
        <section className="pdf-pages-shell">
            <main className="pdf-pages-main p-8 md:p-12 w-full max-w-[1400px] mx-auto">
                <PDFToolSwitcher activeTool="Optimize PDF" />
                <header className="pdf-pages-header mb-12 flex justify-between items-center bg-white/5 p-8 rounded-3xl border border-white/10">
                    <div className="flex items-center gap-6">
                        <div className="p-4 bg-emerald-500/20 rounded-2xl">
                             <Zap className="text-emerald-400" size={32} />
                        </div>
                        <div>
                            <h2 className="text-3xl font-black text-white">Optimize PDF</h2>
                            <p className="text-slate-400">Reduce document size and fix structural issues</p>
                        </div>
                    </div>

                    <label htmlFor="optimize-search" className="pdf-pages-search relative w-96">
                        <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                            id="optimize-search"
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search optimization tool..."
                            className="w-full bg-black/40 border border-white/10 rounded-full py-4 pl-12 pr-6 text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500 transition-all font-bold"
                        />
                    </label>
                </header>

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
                                        <span className="suite-name-tag">OPTIMIZE</span>
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
                            </button>
                        )
                    }
                    )}
                </div>
            </main>
        </section>
    )
}

export default OptimizePDFDashboard
