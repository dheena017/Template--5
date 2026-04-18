import React from 'react';
import { 
    MegaPhone, Layout, Target, 
    TrendingUp, Award, Rocket, 
    Sparkles, ChevronRight, Share2, Zap, 
    ShieldCheck, BarChart3, Globe, BotIcon,
    PenTool, Calendar
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import '../../styles/pages/pdf/OrganizePDF.css';
import '../../styles/pages/dashboards/DashboardIndex.css';
import { PrimaryButton } from '../../components/buttons';

const MARKETING_TOOLS = [
    { 
        id: 'ad-engine', 
        name: 'Aura Ad Engine', 
        desc: 'Autonomous multi-platform ad generation with high-velocity creative testing.',
        icon: Rocket,
        color: '#f59e0b',
        isNew: true
    },
    { 
        id: 'copywriter', 
        name: 'Neural Copywriter', 
        desc: 'Synthesize high-conversion sales copy, emails, and social posts via LLM.',
        icon: PenTool,
        color: '#3b82f6',
        isNew: false
    },
    { 
        id: 'social-campaigns', 
        name: 'Campaign Pulse', 
        desc: 'Orchestrate cross-channel marketing campaigns with AI budget optimization.',
        icon: Globe,
        color: '#10b981',
        isNew: false
    },
    { 
        id: 'audience-intel', 
        name: 'Audience Intel', 
        desc: 'Predictive audience modeling and psychographic mapping for precise targeting.',
        icon: Target,
        color: '#ec4899',
        isNew: true
    },
    { 
        id: 'brand-kits', 
        name: 'Brand Synth', 
        desc: 'Generate complete visual brand identity kits synchronized with core assets.',
        icon: Layout,
        color: '#a855f7',
        isNew: true
    },
    { 
        id: 'social-scheduler', 
        name: 'Autonomous Scheduler', 
        desc: 'AI-driven content calendar with optimized engagement timing algorithms.',
        icon: Calendar,
        color: '#f59e0b',
        isNew: false
    }
];

const MarketingDashboard = () => {
    const navigate = useNavigate();

    return (
        <section className="pdf-pages-shell" style={{ width: '100%', height: '100%', overflowY: 'auto', background: '#080912' }}>
            <motion.header className="portal-hero-premium mb-12">
                <div className="hero-bg-overlay-aura">
                    <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1500" alt="Marketing Hero" className="hero-image-aura" style={{ opacity: 0.3 }} />
                </div>
                <div className="hero-content-aura" style={{ padding: '6rem 8%' }}>
                    <motion.div className="aura-chip-premium-v3">
                        <TrendingUp size={14} className="text-amber-400" />
                        <span>AURA MARKETING NEXUS v4.2 PRO</span>
                    </motion.div>
                    <h1 className="text-6xl md:text-8xl font-black text-white mb-6 tracking-tighter">
                        Accelerate <br/> <span className="text-amber-500">Growth.</span>
                    </h1>
                    <p className="text-xl text-slate-400 max-w-2xl mb-12 font-medium">
                        Autonomous creative production and predictive growth orchestration, fueled by the collective intelligence of the Aura Ad Engine.
                    </p>
                    <div className="flex gap-8 text-sm font-black text-slate-500">
                        <div className="flex items-center gap-2"><ShieldCheck size={18} className="text-amber-500" /> ROAS OPTIMIZED</div>
                        <div className="flex items-center gap-2"><Zap size={18} className="text-yellow-500" /> INSTANT CREATIVES</div>
                        <div className="flex items-center gap-2"><BarChart3 size={18} className="text-blue-500" /> GLOBAL ANALYTICS</div>
                    </div>
                </div>
            </motion.header>

            <main className="pdf-pages-main p-8 pt-0 md:p-12 md:pt-0 w-full max-w-[1700px] mx-auto">
                <header className="mb-12 flex flex-col md:flex-row justify-between items-center bg-white/[0.02] backdrop-blur-3xl p-6 rounded-[32px] border border-white/5 gap-6">
                    <div className="flex items-center gap-5">
                        <div className="p-4 bg-amber-500/20 rounded-2xl border border-amber-500/20">
                            <Rocket className="text-amber-400" size={28} />
                        </div>
                        <div>
                            <h2 className="text-2xl font-black text-white tracking-tight uppercase">Growth Hub</h2>
                            <p className="text-sm font-bold text-slate-500 tracking-widest">{MARKETING_TOOLS.length} GROWTH MODULES READY</p>
                        </div>
                    </div>
                </header>

                <div className="portal-tools-main-grid-v4">
                    {MARKETING_TOOLS.map((cat, idx) => (
                        <motion.button
                            key={cat.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.05 }}
                            onClick={() => navigate(`/${cat.id}`)}
                            className="portal-tool-card-v3"
                        >
                            <div className="tool-card-inner-v3 h-100">
                                <div className="tool-card-top-v3">
                                    <div className="tool-suite-info-v3">
                                        <div className="suite-icon-mini-v3" style={{ background: `${cat.color}20`, color: cat.color }}>
                                            <cat.icon size={14} />
                                        </div>
                                        <span className="suite-name-tag-v3 uppercase">GROWTH TOOL</span>
                                    </div>
                                    {cat.isNew && <div className="tool-is-new-v3 bg-amber-500 text-white">VIP</div>}
                                </div>
                                <div className="tool-card-body-v3">
                                    <h3 className="text-xl font-black text-white mb-2">{cat.name}</h3>
                                    <p className="text-sm text-slate-500 mb-6 font-medium line-clamp-2">{cat.desc}</p>
                                    <div className="card-launch-aura-v3">
                                        <PrimaryButton style={{ backgroundColor: cat.color }} className="w-full">Initialize Campaign</PrimaryButton>
                                    </div>
                                </div>
                            </div>
                        </motion.button>
                    ))}
                </div>
            </main>
        </section>
    );
};

export default MarketingDashboard;
