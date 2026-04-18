import React, { useState } from 'react';
import { 
    Book, 
    FileText, 
    Zap, 
    ShieldCheck, 
    Download, 
    Smartphone, 
    Tablet, 
    Monitor,
    Sparkles,
    ChevronRight,
    RefreshCw,
    CheckCircle2,
    Activity,
    Layers,
    Type
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import '../../styles/pages/dashboards/DashboardIndex.css';
import { PrimaryButton } from '../../components/buttons';

const EbookDashboard = () => {
    const navigate = useNavigate();
    const [isConverting, setIsConverting] = useState(false);
    const [progress, setProgress] = useState(0);

    const formats = [
        { id: 'epub', name: 'EPUB 3.0', desc: 'Standard reflowable format for Apple Books & Kobo.', icon: Book, color: '#3b82f6' },
        { id: 'mobi', name: 'MOBI / AZW3', desc: 'Optimized for Amazon Kindle devices.', icon: Tablet, color: '#f59e0b' },
        { id: 'pdf-print', name: 'PDF (Print)', desc: 'Fixed layout for high-fidelity professional printing.', icon: FileText, color: '#ef4444' },
    ];

    return (
        <section className="pdf-pages-shell" style={{ width: '100%', height: '100%', overflowY: 'auto', background: '#0a0a0c' }}>
            <motion.header className="portal-hero-premium mb-12">
                <div className="hero-bg-overlay-aura">
                    <img src="https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&q=80&w=1500" alt="Ebook Hero" className="hero-image-aura" style={{ opacity: 0.3 }} />
                </div>
                <div className="hero-content-aura" style={{ padding: '6rem 8%' }}>
                    <motion.div className="aura-chip-premium-v3">
                        <Book size={14} className="text-secondary" />
                        <span>AURA PUBLISHING HUB v2.1</span>
                    </motion.div>
                    <h1 className="text-6xl md:text-8xl font-black text-white mb-6 tracking-tighter">
                        Digital <br/> <span className="text-secondary" style={{ background: 'linear-gradient(135deg, #6366f1, #a855f7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Publishing.</span>
                    </h1>
                    <p className="text-xl text-slate-400 max-w-2xl mb-12 font-medium">
                        Convert manuscripts into professional-grade eBooks. 
                        Autonomous typesetting, metadata injection, and multi-format export.
                    </p>
                    <div className="flex gap-8 text-sm font-black text-slate-500">
                        <div className="flex items-center gap-2"><Layers size={18} className="text-indigo-500" /> MULTI-FORMAT</div>
                        <div className="flex items-center gap-2"><Type size={18} className="text-purple-500" /> AUTO-TYPESET</div>
                        <div className="flex items-center gap-2"><Smartphone size={18} className="text-pink-500" /> DEVICE READY</div>
                    </div>
                </div>
            </motion.header>

            <main className="pdf-pages-main p-8 pt-0 md:p-12 md:pt-0 w-full max-w-[1700px] mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <section className="glass-card p-10 border-none" style={{ background: 'rgba(255,255,255,0.02)' }}>
                        <div className="d-flex align-items-center gap-4 mb-8">
                            <div className="p-4 bg-indigo-500/20 rounded-2xl border border-indigo-500/20">
                                <Sparkles className="text-indigo-400" size={32} />
                            </div>
                            <div>
                                <h3 className="text-3xl font-black text-white m-0 uppercase tracking-tighter">Synthesis Engine</h3>
                                <p className="tiny font-black text-slate-500 uppercase tracking-widest">Upload your manuscript for neural processing.</p>
                            </div>
                        </div>

                        <div className="upload-zone-aura glass-card d-grid place-items-center mb-8" style={{ border: '2px dashed rgba(255,255,255,0.1)', height: '240px', borderRadius: '32px' }}>
                           <div className="text-center">
                              <div className="mx-auto mb-4 p-4 rounded-full bg-white/5 w-fit"><FileText size={40} className="text-slate-500" /></div>
                              <h4 className="text-white font-black mb-1">Drag manuscript here</h4>
                              <p className="tiny text-slate-500 uppercase font-bold tracking-widest text-[10px]">DOCX, PDF, or Markdown Supported</p>
                           </div>
                        </div>

                        <div className="format-selection d-grid gap-3">
                            {formats.map(f => (
                                <button key={f.id} className="glass-card p-4 d-flex align-items-center justify-content-between border-white/5 hover:border-indigo-500/50 transition-all">
                                    <div className="d-flex align-items-center gap-4">
                                        <div className="p-3 bg-white/5 rounded-xl" style={{ color: f.color }}><f.icon size={20} /></div>
                                        <div className="text-start">
                                            <h4 className="text-white font-black m-0">{f.name}</h4>
                                            <p className="tiny text-slate-500 m-0">{f.desc}</p>
                                        </div>
                                    </div>
                                    <ChevronRight size={18} className="text-slate-700" />
                                </button>
                            ))}
                        </div>

                        <PrimaryButton className="w-100 mt-8 py-5 text-lg font-black tracking-widest uppercase" style={{ background: 'linear-gradient(135deg, #6366f1, #a855f7)' }}>
                           Initialize Conversion
                        </PrimaryButton>
                    </section>

                    <section className="glass-card p-10 relative overflow-hidden" style={{ background: 'rgba(255,255,255,0.01)' }}>
                        <div className="panel-header-v5 mb-10">
                            <h3 className="text-2xl font-black text-white uppercase tracking-tighter d-flex align-items-center gap-3">
                                <Activity size={24} className="text-indigo-400" /> Real-time Telemetry
                            </h3>
                        </div>

                        <div className="stats-box-aura d-grid grid-cols-2 gap-4 mb-8">
                           <div className="p-6 glass-card border-none bg-white/5">
                              <label className="tiny text-slate-500 block mb-1 uppercase font-black">Reflow Accuracy</label>
                              <div className="text-3xl font-black text-white">99.2%</div>
                           </div>
                           <div className="p-6 glass-card border-none bg-white/5">
                              <label className="tiny text-slate-500 block mb-1 uppercase font-black">Active Clusters</label>
                              <div className="text-3xl font-black text-indigo-400">12</div>
                           </div>
                        </div>

                        <div className="preview-container-aura glass-card p-8 h-full min-h-[400px] border-none bg-indigo-500/5 d-grid place-items-center relative">
                           <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20" style={{ background: 'radial-gradient(circle at center, #6366f1, transparent)' }} />
                           <div className="text-center relative z-10">
                               <Monitor size={120} className="text-white/10 mx-auto mb-6" />
                               <p className="tiny font-black text-slate-600 uppercase tracking-[1em]">Awaiting Cluster Data</p>
                           </div>
                        </div>
                    </section>
                </div>
            </main>
        </section>
    );
};

export default EbookDashboard;
