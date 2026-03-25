import React, { useState } from 'react'
import { 
  Palette, Plus, Search, 
  Settings, Type, Image as ImageIcon,
  CheckCircle2, PlusCircle, Trash2, 
  ExternalLink, Layers, Copy,
  Grid2X2, List
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import '../../styles/pages/image/BrandKits.css'

const BrandKits = () => {
    const [selectedKit, setSelectedKit] = useState(1)

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
                        <button className="icon-btn"><Search size={16} /></button>
                    </div>
                    <div className="kits-list">
                        {brandKits.map(kit => (
                            <button 
                                key={kit.id} 
                                className={`kit-item ${selectedKit === kit.id ? 'active' : ''}`}
                                onClick={() => setSelectedKit(kit.id)}
                            >
                                <div className="kit-icon"><Layers size={20} /></div>
                                <div className="kit-info">
                                    <strong>{kit.name}</strong>
                                    <span>{kit.status}</span>
                                </div>
                            </button>
                        ))}
                    </div>
                    <button className="add-kit-btn">
                        <PlusCircle size={18} /> Add Organization
                    </button>
                </aside>

                <main className="brand-editor glass-card">
                    <div className="editor-head">
                        <div className="editor-title">
                            <h2>{brandKits.find(k => k.id === selectedKit)?.name}</h2>
                            <span className="last-sync">Last synced: {brandKits.find(k => k.id === selectedKit)?.lastModified}</span>
                        </div>
                        <div className="editor-actions">
                            <button className="secondary-btn"><Copy size={16} /> Duplicate</button>
                            <button className="secondary-btn danger"><Trash2 size={16} /></button>
                            <button className="primary-btn sm">Save Changes</button>
                        </div>
                    </div>

                    <div className="editor-sections">
                        <section className="editor-block">
                            <div className="block-head">
                                <h3><div className="b-icon colors"><Palette size={16} /></div> Color Palette</h3>
                                <button className="add-point"><Plus size={14} /></button>
                            </div>
                            <div className="colors-grid">
                                {brandKits.find(k => k.id === selectedKit)?.colors.map((color, i) => (
                                    <div key={i} className="color-item">
                                        <div className="color-swatch" style={{ background: color }}></div>
                                        <div className="color-hex">
                                           <span>{color}</span>
                                           <Copy size={12} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        <section className="editor-block">
                            <div className="block-head">
                                <h3><div className="b-icon fonts"><Type size={16} /></div> Typography</h3>
                                <button className="add-point"><Plus size={14} /></button>
                            </div>
                            <div className="fonts-list">
                                {brandKits.find(k => k.id === selectedKit)?.fonts.map((font, i) => (
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
                        </section>

                        <section className="editor-block">
                            <div className="block-head">
                                <h3><div className="b-icon assets"><ImageIcon size={16} /></div> Brand Assets</h3>
                                <button className="add-point"><Plus size={14} /></button>
                            </div>
                            <div className="assets-grid">
                                <div className="asset-upload-card">
                                    <Plus size={32} />
                                    <span>Upload Logo</span>
                                </div>
                                <div className="asset-upload-card">
                                    <Plus size={32} />
                                    <span>Upload Watermark</span>
                                </div>
                            </div>
                        </section>
                    </div>
                </main>
            </div>
        </div>
    )
}

export default BrandKits





