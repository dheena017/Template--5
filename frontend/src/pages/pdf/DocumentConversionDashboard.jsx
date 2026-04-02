import React, { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import {
    Search, ArrowUpRight, FileUp, FileText, ImageIcon, Table, Presentation, Box, BookOpen, HardDrive, Languages, ScanIcon, Sparkles, ShieldCheck, Zap
} from 'lucide-react'
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion'
import '../../styles/pages/dashboards/DashboardIndex.css'
import { PrimaryButton } from '../../components/buttons'
import SearchBar from '../../components/common/SearchBar/SearchBar'

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

const DocToolCard = ({ tool, navigate, idx }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [15, -15]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-15, 15]), { stiffness: 300, damping: 30 });
  const Icon = tool.icon;

  function handleMouse(event) {
    const rect = event.currentTarget.getBoundingClientRect();
    x.set(event.clientX / rect.width - rect.left / rect.width - 0.5);
    y.set(event.clientY / rect.height - rect.top / rect.height - 0.5);
  }

  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: idx * 0.02 }}
      onMouseMove={handleMouse}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="portal-tool-card-v3"
      onClick={() => navigate(`/${tool.id}`)}
    >
      <div className="tool-card-inner-v3" style={{ transform: 'translateZ(50px)' }}>
        <div className="tool-card-top-v3">
          <div className="tool-suite-info-v3">
            <div className="suite-icon-mini-v3" style={{ background: `${tool.color}20`, color: tool.color }}>
              <Icon size={14} />
            </div>
            <span className="suite-name-tag-v3">DOC PROTOCOL</span>
          </div>
          <div className="tool-action-indicator-v3">
            <ArrowUpRight size={16} />
          </div>
        </div>

        <div className="tool-card-body-v3">
          <h3 className="text-xl font-black text-white mb-2">{tool.name}</h3>
          <p className="text-sm text-slate-500 mb-6 font-medium line-clamp-2">{tool.desc}</p>
          
          <div className="tool-card-footer-v3">
            <div className="tool-status-dot-v3" style={{ backgroundColor: tool.color }}></div>
            <span className="tool-ready-text-v3">Protocol Optimized</span>
          </div>

          <div className="card-launch-aura-v3">
            <PrimaryButton
              className="launch-btn-premium-v3"
              style={{ backgroundColor: '#7c3aed' }}
            >
              Start Conversion
            </PrimaryButton>
          </div>
        </div>
      </div>
      <div className="card-glare-effect-v3"></div>
      <div className="card-hover-bg-v3" style={{ background: `radial-gradient(circle at top right, ${tool.color}15, transparent)` }}></div>
    </motion.button>
  );
};

const DocumentConversionDashboard = () => {
    const navigate = useNavigate()
    const [search, setSearch] = useState('')

    // Hero Parallax
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const heroRotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [5, -5]), { stiffness: 50, damping: 20 });
    const heroRotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-5, 5]), { stiffness: 50, damping: 20 });

    const filteredTools = useMemo(() => {
        const query = search.trim().toLowerCase();
        return TOOLS.filter(t =>
            t.name.toLowerCase().includes(query) ||
            t.desc.toLowerCase().includes(query)
        );
    }, [search]);

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
                    <img src="/assets/dashboards/pdf_hero.png" alt="Document Hero" className="hero-image-aura" style={{ opacity: 0.5 }} />
                </div>
                <div className="hero-content-aura" style={{ transformStyle: 'preserve-3d', padding: '6rem 8%' }}>
                    <motion.div className="aura-chip-premium-v3" style={{ transform: 'translateZ(80px)' }}>
                        <div className="status-dot-pulse-v3" style={{ backgroundColor: '#38bdf8' }}></div>
                        <Sparkles size={14} className="text-sky-400" />
                        <span>DOCUMENT ENGINE ACTIVE</span>
                    </motion.div>
                    <motion.h1 
                        className="text-6xl md:text-8xl font-black text-white mb-6 tracking-tighter"
                        style={{ transform: 'translateZ(120px)', lineHeight: 0.9 }}
                    >
                        Universal <br/> <span className="text-sky-500">Document Hub.</span>
                    </motion.h1>
                    <motion.p 
                        className="text-xl text-slate-400 max-w-2xl mb-12 font-medium"
                        style={{ transform: 'translateZ(100px)' }}
                    >
                        Enterprise-grade transformation for all your needs. 
                        Office files, eBooks, and specialized formats processed with perfection.
                    </motion.p>
                    <div className="flex gap-8 text-sm font-black text-slate-500" style={{ transform: 'translateZ(130px)' }}>
                        <div className="flex items-center gap-2"><ShieldCheck size={18} className="text-emerald-500" /> HIGH PRECISION</div>
                        <div className="flex items-center gap-2"><Zap size={18} className="text-yellow-500" /> INSTANT FLOW</div>
                        <div className="flex items-center gap-2"><Box size={18} className="text-sky-500" /> 10+ PROTOCOLS</div>
                    </div>
                </div>
            </motion.header>

            <main className="pdf-pages-main p-8 pt-0 md:p-12 md:pt-0 w-full max-w-[1700px] mx-auto">
                <header className="mb-12 flex flex-col md:flex-row justify-between items-center bg-white/[0.02] backdrop-blur-3xl p-6 rounded-[32px] border border-white/5 gap-6">
                    <div className="flex items-center gap-5">
                        <div className="p-4 bg-sky-500/20 rounded-2xl border border-sky-500/20">
                            <FileText className="text-sky-400" size={28} />
                        </div>
                        <div>
                            <h2 className="text-2xl font-black text-white tracking-tight uppercase">Registry Suite</h2>
                            <p className="text-sm font-bold text-slate-500 tracking-widest">{filteredTools.length} ENGINES AVAILABLE</p>
                        </div>
                    </div>

                    <SearchBar 
                        placeholder="Find document tool..."
                        onSearch={(val) => setSearch(val)}
                        className="w-full md:w-96"
                    />
                </header>

                <AnimatePresence mode="popLayout">
                    {filteredTools.length > 0 ? (
                        <div className="portal-tools-main-grid-v4">
                            {filteredTools.map((tool, idx) => (
                                <DocToolCard key={tool.id} tool={tool} navigate={navigate} idx={idx} />
                            ))}
                        </div>
                    ) : (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-40 text-slate-500 border border-dashed border-white/5 rounded-[48px] bg-white/[0.01]">
                            <FileText size={64} className="mx-auto mb-6 opacity-10" />
                            <p className="text-2xl font-black tracking-tight">Registry Empty</p>
                            <p className="text-slate-600 mt-2">No transformation tools found matching "{search}"</p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </main>
        </section>
    )
}

export default DocumentConversionDashboard
