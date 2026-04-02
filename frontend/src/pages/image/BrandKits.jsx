import React, { useEffect, useMemo, useState } from 'react'
import {
    Palette, Plus, Search,
    Settings, Type, Image as ImageIcon,
    PlusCircle,
    Layers, Copy,
} from 'lucide-react'
import { motion } from 'framer-motion'
import '../../styles/pages/image/BrandKits.css'

const BrandKits = () => {
        const [selectedKit, setSelectedKit] = useState(1)
        const [kitSearch, setKitSearch] = useState('')
        const [duplicateEnabled, setDuplicateEnabled] = useState(false)
        const [copiedHex, setCopiedHex] = useState('')

    const brandKits = [
        {
            id: 1,
            name: 'TextAI Default',
            colors: ['#6366f1', '#1e1b4b', '#f8fafc'],
            fonts: ['Inter', 'Outfit'],
            lastModified: 'Mar 15, 2026',
            status: 'Primary'
        },
        {
            id: 2,
            name: 'Cyberpunk Project',
            colors: ['#ff00ff', '#00ffff', '#050505'],
            fonts: ['JetBrains Mono', 'Orbitron'],
            lastModified: 'Mar 18, 2026',
            status: 'Active'
        }
    ]

    const filteredKits = useMemo(() => {
        const q = kitSearch.trim().toLowerCase()
        if (!q) return brandKits
        return brandKits.filter((kit) => (
            kit.name.toLowerCase().includes(q) ||
            kit.status.toLowerCase().includes(q)
        ))
    }, [kitSearch])

    useEffect(() => {
        if (!filteredKits.find((k) => k.id === selectedKit)) {
            setSelectedKit(filteredKits[0]?.id ?? 1)
        }
    }, [filteredKits, selectedKit])

    const activeKit = brandKits.find((k) => k.id === selectedKit)

    const copyHex = async (hex) => {
        try {
            await navigator.clipboard.writeText(hex)
            setCopiedHex(hex)
            window.setTimeout(() => setCopiedHex(''), 1100)
        } catch {
            setCopiedHex('')
        }
    }

    return (
        <div className="brandkits-container">
            <header className="brand-header">
                <div className="title-section">
                    <h1><Palette size={28} /> Brand Kits</h1>
                    <p>Standardize your visual identity across all generated content flows.</p>
                </div>
                <div className="brand-actions">
                    <button className="primary-btn"><Plus size={18} /> New Brand Kit</button>
                </div>
            </header>

            <div className="brand-layout">
                <aside className="brand-sidebar">
                    <div className="sidebar-head">
                        <h3>Your Kits</h3>
                        <span className="kit-count-chip">{filteredKits.length}</span>
                    </div>

                    <div className="kits-search-wrap">
                        <Search size={15} />
                        <input
                            type="text"
                            value={kitSearch}
                            onChange={(e) => setKitSearch(e.target.value)}
                            placeholder="Search kits..."
                        />
                    </div>

                    <div className="kits-list">
                        {filteredKits.map(kit => (
                            <button 
                                key={kit.id} 
                                className={`kit-item ${selectedKit === kit.id ? 'active' : ''}`}
                                onClick={() => setSelectedKit(kit.id)}
                            >
                                <div className="kit-icon"><Layers size={20} /></div>
                                <div className="kit-info">
                                    <strong>{kit.name}</strong>
                                    <span>{kit.status} · {kit.lastModified}</span>
                                </div>
                            </button>
                        ))}
                        {filteredKits.length === 0 && (
                            <div className="kits-empty-state">No kits matched your search.</div>
                        )}
                    </div>
                    <button className="add-kit-btn">
                        <PlusCircle size={18} /> Add Organization
                    </button>
                </aside>

                <main className="brand-editor glass-card">
                    <div className="editor-head">
                        <div className="editor-title">
                            <h2>{activeKit?.name}</h2>
                            <span className="last-sync">Last synced: {activeKit?.lastModified}</span>
                        </div>
                        <div className="editor-actions">
                            <label className="duplicate-toggle">
                                <span>Duplicate</span>
                                <button
                                    type="button"
                                    className={`toggle-switch ${duplicateEnabled ? 'on' : ''}`}
                                    onClick={() => setDuplicateEnabled((prev) => !prev)}
                                    aria-label="Toggle duplicate"
                                >
                                    <span className="toggle-dot" />
                                </button>
                            </label>
                            <button className="primary-btn sm">Save Changes</button>
                        </div>
                    </div>

                    <div className="editor-sections">
                        <motion.section className="editor-block" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                            <div className="block-head">
                                <h3><div className="b-icon colors"><Palette size={16} /></div> Color Palette</h3>
                                <button className="add-point"><Plus size={14} /></button>
                            </div>
                            <div className="colors-grid">
                                {activeKit?.colors.map((color, i) => (
                                    <div key={i} className="color-item">
                                        <div className="color-swatch" style={{ background: color }}></div>
                                        <div className="color-hex">
                                           <span>{color}</span>
                                           <button type="button" className="copy-chip" onClick={() => copyHex(color)}>
                                               {copiedHex === color ? 'Copied' : <Copy size={12} />}
                                           </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.section>

                        <motion.section className="editor-block" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                            <div className="block-head">
                                <h3><div className="b-icon fonts"><Type size={16} /></div> Typography</h3>
                                <button className="add-point"><Plus size={14} /></button>
                            </div>
                            <div className="fonts-list">
                                {activeKit?.fonts.map((font, i) => (
                                    <div key={i} className="font-card">
                                        <div className="font-preview" style={{ fontFamily: font }}>AaBbCc</div>
                                        <div className="font-details">
                                            <strong>{font}</strong>
                                            <span>Variable Weight</span>
                                        </div>
                                        <div className="font-actions">
                                            <button className="icon-btn-sm"><Settings size={14} /></button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.section>

                        <motion.section className="editor-block" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                            <div className="block-head">
                                <h3><div className="b-icon assets"><ImageIcon size={16} /></div> Brand Assets</h3>
                                <button className="add-point"><Plus size={14} /></button>
                            </div>
                            <div className="assets-grid">
                                <div className="asset-upload-card">
                                    <Plus size={32} />
                                    <span>Upload Logo</span>
                                    <small>SVG, PNG</small>
                                </div>
                                <div className="asset-upload-card">
                                    <Plus size={32} />
                                    <span>Upload Watermark</span>
                                    <small>PNG with transparency</small>
                                </div>
                            </div>
                        </motion.section>
                    </div>
                </main>
            </div>
        </div>
    )
}

export default BrandKits





