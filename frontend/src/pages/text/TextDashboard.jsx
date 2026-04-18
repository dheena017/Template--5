import React from 'react';
import { 
    FileText, Sparkles, Zap, ShieldCheck, HardDrive, 
    BotIcon, Languages, Eraser, Search, Type, LineChart, 
    MessageSquare, Quote, FileCode, CheckCircle2
} from 'lucide-react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import '../../styles/pages/dashboards/DashboardIndex.css';
import { PrimaryButton } from '../../components/buttons';

const TEXT_CATEGORIES = [
    { 
        id: 'copywriter', 
        name: 'AI Copywriter', 
        desc: 'Generate professional ad copy, emails, and landing page content.',
        icon: Type,
        color: '#10b981',
        isNew: true
    },
    { 
        id: 'summarizer', 
        name: 'Smart Summarizer', 
        desc: 'Distill long documents and articles into key insights and bullet points.',
        icon: FileText,
        color: '#3b82f6',
        isNew: false
    },
    { 
        id: 'translator', 
        name: 'Universal Translator', 
        desc: 'Neural translation for 100+ languages with contextual accuracy.',
        icon: Languages,
        color: '#8b5cf6',
        isNew: false
    },
    { 
        id: 'grammar-gpt', 
        name: 'Grammar GPT', 
        desc: 'Advanced proofreading, tone adjustment, and professional polishing.',
        icon: ShieldCheck,
        color: '#ec4899',
        isNew: true
    },
    { 
        id: 'seo-optimizer', 
        name: 'SEO Optimizer', 
        desc: 'Analyze keywords and optimize your content for search engine rankings.',
        icon: LineChart,
        color: '#f59e0b',
        isNew: true
    },
    { 
        id: 'sentiment-analysis', 
        name: 'Sentiment Analysis', 
        desc: 'Detect emotional tone and intent in customer feedback or social posts.',
        icon: MessageSquare,
        color: '#ef4444',
        isNew: false
    },
    { 
        id: 'speech-to-text', 
        name: 'Speech to Text', 
        desc: 'High-accuracy audio transcription with speaker identification.',
        icon: BotIcon,
        color: '#6366f1',
        isNew: false
    }
];

const TextToolCard = ({ cat, idx, navigate }) => {
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
                        <span className="suite-name-tag-v3 uppercase tracking-widest">{cat.name.split(' ')[1] || 'TEXT'}</span>
                    </div>
                    {cat.isNew && <div className="tool-is-new-v3">NEW</div>}
                </div>

                <div className="tool-card-body-v3">
                    <h3 className="text-xl font-black text-white mb-2">{cat.name}</h3>
                    <p className="text-sm text-slate-500 mb-6 font-medium line-clamp-2">{cat.desc}</p>
                    
                    <div className="tool-card-footer-v3">
                        <div className="tool-status-dot-v3" style={{ backgroundColor: cat.color }}></div>
                        <span className="tool-ready-text-v3">Semantic Engine Ready</span>
                    </div>

                    <div className="card-launch-aura-v3">
                        <PrimaryButton
                            className="launch-btn-premium-v3"
                            style={{ backgroundColor: cat.color }}
                        >
                            Start Generating
                        </PrimaryButton>
                    </div>
                </div>
            </div>
            <div className="card-glare-effect-v3"></div>
            <div className="card-hover-bg-v3" style={{ background: `radial-gradient(circle at top right, ${cat.color}15, transparent)` }}></div>
        </motion.button>
    );
};

const TextDashboard = () => {
    const navigate = useNavigate();

    // Hero Parallax
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const heroRotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [5, -5]), { stiffness: 50, damping: 20 });
    const heroRotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-5, 5]), { stiffness: 50, damping: 20 });

    return (
        <section className="text-pages-shell" style={{ width: '100%', height: '100%', overflowY: 'auto', backgroundColor: '#02040a' }}>
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
                    <img src="/assets/dashboards/text_hero.png" alt="Text AI Hero" className="hero-image-aura" style={{ opacity: 0.5 }} />
                </div>
                <div className="hero-content-aura" style={{ transformStyle: 'preserve-3d', padding: '6rem 8%' }}>
                    <motion.div className="aura-chip-premium-v3" style={{ transform: 'translateZ(80px)' }}>
                        <div className="status-dot-pulse-v3"></div>
                        <Sparkles size={14} className="text-emerald-400" />
                        <span>AURA SEMANTIC CLOUD v3.8</span>
                    </motion.div>
                    <motion.h1 
                        className="text-6xl md:text-8xl font-black text-white mb-6 tracking-tighter"
                        style={{ transform: 'translateZ(120px)', lineHeight: 0.9 }}
                    >
                        Master the <br/> <span className="text-emerald-500">Written Word.</span>
                    </motion.h1>
                    <motion.p 
                        className="text-xl text-slate-400 max-w-2xl mb-12 font-medium"
                        style={{ transform: 'translateZ(100px)' }}
                    >
                        Enterprise-grade linguistic intelligence. Transform concepts into 
                        compelling narratives with high-contexual accuracy.
                    </motion.p>
                    <div className="flex gap-8 text-sm font-black text-slate-500" style={{ transform: 'translateZ(130px)' }}>
                        <div className="flex items-center gap-2"><Quote size={18} className="text-emerald-500" /> CONTEXT AWARE</div>
                        <div className="flex items-center gap-2"><Zap size={18} className="text-yellow-500" /> REAL-TIME AGENTS</div>
                        <div className="flex items-center gap-2"><CheckCircle2 size={18} className="text-blue-500" /> VERIFIED OUTPUT</div>
                    </div>
                </div>
            </motion.header>

            <main className="text-pages-main p-8 pt-0 md:p-12 md:pt-0 w-full max-w-[1700px] mx-auto">
                <header className="mb-12 flex flex-col md:flex-row justify-between items-center bg-white/[0.02] backdrop-blur-3xl p-6 rounded-[32px] border border-white/5 gap-6">
                    <div className="flex items-center gap-5">
                        <div className="p-4 bg-emerald-500/20 rounded-2xl border border-emerald-500/20">
                            <Type className="text-emerald-400" size={28} />
                        </div>
                        <div>
                            <h2 className="text-2xl font-black text-white tracking-tight uppercase">Semantic Labs</h2>
                            <p className="text-sm font-bold text-slate-500 tracking-widest">{TEXT_CATEGORIES.length} INTELLIGENCE ENGINES ACTIVE</p>
                        </div>
                    </div>
                </header>

                <div className="portal-tools-main-grid-v4">
                    {TEXT_CATEGORIES.map((cat, idx) => (
                        <TextToolCard key={cat.id} cat={cat} idx={idx} navigate={navigate} />
                    ))}
                </div>
            </main>
        </section>
    );
};

export default TextDashboard;
