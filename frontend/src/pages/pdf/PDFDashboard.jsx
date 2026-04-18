import React, { useState } from 'react';
import { 
    LayoutGrid, Minimize2, ArrowLeftRight, FileCode, Edit3, Shield, Sparkles, 
    ChevronRight, ArrowUpRight, Zap, ShieldCheck, HardDrive, FileText, Lock, Eye, BotIcon
} from 'lucide-react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import '../../styles/pages/pdf/OrganizePDF.css';
import '../../styles/pages/dashboards/DashboardIndex.css';
import ToolLayout from '../../components/layouts/ToolLayout';
import { PrimaryButton } from '../../components/buttons';

const PDF_CATEGORIES = [
    { 
        id: 'organize-pdf', 
        name: 'Organize PDF', 
        desc: 'Merge, split, remove, or extract pages with high-fidelity control.',
        icon: LayoutGrid,
        color: '#3b82f6',
        isNew: false
    },
    { 
        id: 'optimize-pdf', 
        name: 'Optimize PDF', 
        desc: 'Reduce file size while preserving professional print quality.',
        icon: Minimize2,
        color: '#10b981',
        isNew: true
    },
    { 
        id: 'convert-to-pdf', 
        name: 'Convert to PDF', 
        desc: 'Transform Word, Excel, JPG, and 20+ other formats into PDF.',
        icon: FileText,
        color: '#8b5cf6',
        isNew: false
    },
    { 
        id: 'convert-from-pdf', 
        name: 'Convert from PDF', 
        desc: 'Turn PDF documents back into editable Office and image files.',
        icon: ArrowLeftRight,
        color: '#f59e0b',
        isNew: false
    },
    { 
        id: 'edit-pdf', 
        name: 'Edit PDF', 
        desc: 'Add text, shapes, signatures, and watermarks directly in browser.',
        icon: Edit3,
        color: '#ec4899',
        isNew: true
    },
    { 
        id: 'pdf-security', 
        name: 'PDF Security', 
        desc: 'Protect, unlock, and digitally sign sensitive documents.',
        icon: Lock,
        color: '#ef4444',
        isNew: false
    },
    { 
        id: 'pdf-intelligence', 
        name: 'PDF Intelligence', 
        desc: 'AI-powered document analysis, summarization, and data extraction.',
        icon: BotIcon,
        color: '#a855f7',
        isNew: true
    }
];

const CategoryCard3D = ({ cat, idx, navigate }) => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [15, -15]), { stiffness: 300, damping: 30 });
    const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-15, 15]), { stiffness: 300, damping: 30 });
    const Icon = cat.icon;

    function handleMouse(event) {
        const rect = event.currentTarget.getBoundingClientRect();
        x.set(event.clientX / rect.width - rect.left / rect.width - 0.5);
        y.set(event.clientY / rect.height - rect.top / rect.height - 0.5);
    }

    return (
        <motion.button
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            onMouseMove={handleMouse}
            onMouseLeave={() => { x.set(0); y.set(0); }}
            onClick={() => navigate(`/${cat.id}`)}
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            className="portal-tool-card-v3"
        >
            <div className="tool-card-inner-v3" style={{ transform: 'translateZ(50px)' }}>
                <div className="tool-card-top-v3">
                    <div className="tool-suite-info-v3">
                        <div className="suite-icon-mini-v3" style={{ background: `${cat.color}20`, color: cat.color }}>
                            <Icon size={14} />
                        </div>
                        <span className="suite-name-tag-v3 uppercase tracking-widest">{cat.name.split(' ')[1] || 'TOOL'}</span>
                    </div>
                    {cat.isNew && <div className="tool-is-new-v3">NEW</div>}
                </div>

                <div className="tool-card-body-v3">
                    <h3 className="text-xl font-black text-white mb-2">{cat.name}</h3>
                    <p className="text-sm text-slate-500 mb-6 font-medium line-clamp-2">{cat.desc}</p>
                    
                    <div className="tool-card-footer-v3">
                        <div className="tool-status-dot-v3" style={{ backgroundColor: cat.color }}></div>
                        <span className="tool-ready-text-v3">Registry Core Active</span>
                    </div>

                    <div className="card-launch-aura-v3">
                        <PrimaryButton
                            className="launch-btn-premium-v3"
                            style={{ backgroundColor: cat.color }}
                        >
                            Open Dashboard
                        </PrimaryButton>
                    </div>
                </div>
            </div>
            <div className="card-glare-effect-v3"></div>
            <div className="card-hover-bg-v3" style={{ background: `radial-gradient(circle at top right, ${cat.color}15, transparent)` }}></div>
        </motion.button>
    );
};

const PDFDashboard = () => {
    const navigate = useNavigate();

    // Hero Parallax
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const heroRotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [5, -5]), { stiffness: 50, damping: 20 });
    const heroRotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-5, 5]), { stiffness: 50, damping: 20 });

    return (
        <section className="pdf-pages-shell" style={{ width: '100%', height: '100%', overflowY: 'auto', backgroundColor: '#05060b' }}>
            <motion.header 
                className="portal-hero-premium mb-12" 
                onMouseMove={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    mouseX.set(e.clientX / rect.width - rect.left / rect.width - 0.5);
                    mouseY.set(e.clientY / rect.height - rect.top / rect.height - 0.5);
                }}
                onMouseLeave={() => { mouseX.set(0); mouseY.set(0); }}
                style={{ 
                    perspective: '1500px',
                    rotateX: heroRotateX,
                    rotateY: heroRotateY,
                    transformStyle: 'preserve-3d'
                }}
            >
                <div className="hero-bg-overlay-aura">
                    <img src="/assets/dashboards/pdf_hero.png" alt="PDF Hero" className="hero-image-aura" style={{ opacity: 0.6 }} />
                </div>
                <div className="hero-content-aura" style={{ transformStyle: 'preserve-3d', padding: '6rem 8%' }}>
                    <motion.div className="aura-chip-premium-v3" style={{ transform: 'translateZ(80px)' }}>
                        <div className="status-dot-pulse-v3"></div>
                        <Sparkles size={14} className="text-blue-400" />
                        <span>AURA DOCUMENT CLOUD v4.5</span>
                    </motion.div>
                    <motion.h1 
                        className="text-6xl md:text-8xl font-black text-white mb-6 tracking-tighter"
                        style={{ transform: 'translateZ(120px)', lineHeight: 0.9 }}
                    >
                        Master Your <br/> <span className="text-blue-500">Documents.</span>
                    </motion.h1>
                    <motion.p 
                        className="text-xl text-slate-400 max-w-2xl mb-12 font-medium"
                        style={{ transform: 'translateZ(100px)' }}
                    >
                        Secure, offline, and blazing fast PDF processing. 
                        No uploads, no limits, just pure intelligence.
                    </motion.p>
                    <div className="flex gap-8 text-sm font-black text-slate-500" style={{ transform: 'translateZ(130px)' }}>
                        <div className="flex items-center gap-2"><ShieldCheck size={18} className="text-emerald-500" /> BANK-GRADE PRIVACY</div>
                        <div className="flex items-center gap-2"><Zap size={18} className="text-yellow-500" /> GPU ACCELERATED</div>
                        <div className="flex items-center gap-2"><HardDrive size={18} className="text-blue-500" /> LOCAL PROCESSING</div>
                    </div>
                </div>
            </motion.header>

            <main className="pdf-pages-main p-8 pt-0 md:p-12 md:pt-0 w-full max-w-[1700px] mx-auto">
                <header className="mb-12 flex flex-col md:flex-row justify-between items-center bg-white/[0.02] backdrop-blur-3xl p-6 rounded-[32px] border border-white/5 gap-6">
                    <div className="flex items-center gap-5">
                        <div className="p-4 bg-blue-500/20 rounded-2xl border border-blue-500/20">
                            <FileText className="text-blue-400" size={28} />
                        </div>
                        <div>
                            <h2 className="text-2xl font-black text-white tracking-tight uppercase">Product Library</h2>
                            <p className="text-sm font-bold text-slate-500 tracking-widest">{PDF_CATEGORIES.length} MODULES READY</p>
                        </div>
                    </div>
                </header>

                <div className="portal-tools-main-grid-v4">
                    {PDF_CATEGORIES.map((cat, idx) => (
                        <CategoryCard3D key={cat.id} cat={cat} idx={idx} navigate={navigate} />
                    ))}
                </div>
            </main>
        </section>
    );
};

export default PDFDashboard;
