import React from 'react';
import { 
    Mic, AudioWaveform, Languages, 
    Headphones, UserCheck, MessageSquare, 
    Sparkles, ChevronRight, Speaker, Zap, 
    ShieldCheck, Waves, Music, BotIcon
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import '../../styles/pages/pdf/OrganizePDF.css';
import '../../styles/pages/dashboards/DashboardIndex.css';
import { PrimaryButton } from '../../components/buttons';

const SPEECH_TOOLS = [
    { 
        id: 'text-to-speech', 
        name: 'Neural Voice Synth', 
        desc: 'Synthesize hyper-realistic AI voices for any text in 29+ languages.',
        icon: Speaker,
        color: '#6366f1',
        isNew: false
    },
    { 
        id: 'voice-changer', 
        name: 'Aura Morph Engine', 
        desc: 'Transform any vocal track into a different persona with zero loss.',
        icon: UserCheck,
        color: '#ec4899',
        isNew: true
    },
    { 
        id: 'audio-dubbing', 
        name: 'Kinetic Translator', 
        desc: 'Autonomous video dubbing with perfect lip-sync and emotional сохранение.',
        icon: Languages,
        color: '#10b981',
        isNew: false
    },
    { 
        id: 'sound-effects', 
        name: 'SFX Bio-Forge', 
        desc: 'Generate immersive atmospheric sounds and cinematic foley via AI.',
        icon: AudioWaveform,
        color: '#f59e0b',
        isNew: true
    },
    { 
        id: 'podcast-creator', 
        name: 'Studio Master AI', 
        desc: 'One-click podcast production with multi-track cleaning and leveling.',
        icon: Mic,
        color: '#a855f7',
        isNew: false
    },
    { 
        id: 'voices-hub', 
        name: 'Voice Vault', 
        desc: 'Professional voice cloning and celebrity persona marketplace.',
        icon: Headphones,
        color: '#ec4899',
        isNew: false
    }
];

const SpeechDashboard = () => {
    const navigate = useNavigate();

    return (
        <section className="pdf-pages-shell" style={{ width: '100%', height: '100%', overflowY: 'auto' }}>
            <motion.header className="portal-hero-premium mb-12">
                <div className="hero-bg-overlay-aura">
                    <img src="https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=1500" alt="Audio Hero" className="hero-image-aura" style={{ opacity: 0.4 }} />
                </div>
                <div className="hero-content-aura" style={{ padding: '6rem 8%' }}>
                    <motion.div className="aura-chip-premium-v3">
                        <Waves size={14} className="text-pink-400" />
                        <span>AURA SONIC ENGINE v5.1 ACTIVE</span>
                    </motion.div>
                    <h1 className="text-6xl md:text-8xl font-black text-white mb-6 tracking-tighter">
                        Command the <br/> <span className="text-pink-500">Audio Space.</span>
                    </h1>
                    <p className="text-xl text-slate-400 max-w-2xl mb-12 font-medium">
                        Professional-grade neural voice synthesis, vocal cloning, and cinematic sound design—all orchestrated by the Aura Sonic Core.
                    </p>
                    <div className="flex gap-8 text-sm font-black text-slate-500">
                        <div className="flex items-center gap-2"><ShieldCheck size={18} className="text-pink-500" /> ZERO LATENCY SYNC</div>
                        <div className="flex items-center gap-2"><Zap size={18} className="text-yellow-500" /> NEURAL DUBBING</div>
                        <div className="flex items-center gap-2"><Music size={18} className="text-blue-500" /> LOSSLESS MASTERING</div>
                    </div>
                </div>
            </motion.header>

            <main className="pdf-pages-main p-8 pt-0 md:p-12 md:pt-0 w-full max-w-[1700px] mx-auto">
                <header className="mb-12 flex flex-col md:flex-row justify-between items-center bg-white/[0.02] backdrop-blur-3xl p-6 rounded-[32px] border border-white/5 gap-6">
                    <div className="flex items-center gap-5">
                        <div className="p-4 bg-pink-500/20 rounded-2xl border border-pink-500/20">
                            <Waves className="text-pink-400" size={28} />
                        </div>
                        <div>
                            <h2 className="text-2xl font-black text-white tracking-tight uppercase">Sonic Studio</h2>
                            <p className="text-sm font-bold text-slate-500 tracking-widest">{SPEECH_TOOLS.length} SONIC MODULES READY</p>
                        </div>
                    </div>
                </header>

                <div className="portal-tools-main-grid-v4">
                    {SPEECH_TOOLS.map((cat, idx) => (
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
                                        <span className="suite-name-tag-v3 uppercase">AUDIO TOOL</span>
                                    </div>
                                    {cat.isNew && <div className="tool-is-new-v3 bg-pink-500 text-white">PRO</div>}
                                </div>
                                <div className="tool-card-body-v3">
                                    <h3 className="text-xl font-black text-white mb-2">{cat.name}</h3>
                                    <p className="text-sm text-slate-500 mb-6 font-medium line-clamp-2">{cat.desc}</p>
                                    <div className="card-launch-aura-v3">
                                        <PrimaryButton style={{ backgroundColor: cat.color }} className="w-full">Initialize Engine</PrimaryButton>
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

export default SpeechDashboard;
