import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  Search, ArrowUpRight, Shield, Lock, Unlock, PenTool, EyeOff, GitCompare
} from 'lucide-react'
import '../../../styles/pages/dashboards/DashboardIndex.css'
import { PrimaryButton } from '../../../components/buttons'
import SearchBar from '../../../components/common/SearchBar/SearchBar'


const TOOLS = [
  { id: 'lock', name: 'Protect PDF', icon: Lock, color: '#0ea5e9' },
  { id: 'unlock', name: 'Unlock PDF', icon: Unlock, color: '#2563eb' },
  { id: 'sign', name: 'Sign PDF', icon: PenTool, color: '#db2777' },
  { id: 'redact', name: 'Redact PDF', icon: EyeOff, color: '#dc2626' },
  { id: 'compare', name: 'Compare PDF', icon: GitCompare, color: '#475569' }
]

const PDFSecurityDashboard = () => {
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
                             <Shield className="text-sky-400" size={32} />
                        </div>
                        <div>
                            <h2 className="text-3xl font-black text-white">PDF Security</h2>
                            <p className="text-slate-400">Lock, sign, and securely redact sensitive document data</p>
                        </div>
                    </div>

                    <SearchBar 
                        placeholder="Search security tool..."
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
                                        <span className="suite-name-tag">SECURITY</span>
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

export default PDFSecurityDashboard
