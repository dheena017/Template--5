import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Music, Headphones, Zap, ShieldCheck, Volume2, Disc, ChevronRight, ArrowUpRight, Sparkles } from 'lucide-react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import '../../styles/pages/pdf/PDFPages.css';
import '../../styles/pages/dashboards/DashboardIndex.css';
import { PrimaryButton } from '../../components/buttons';
import SearchBar from '../../components/common/SearchBar/SearchBar';

const AUDIO_TOOLS = [
  { id: 'mp3-to-wav', name: 'MP3 to WAV', desc: 'Convert MP3 to high-quality uncompressed WAV format' },
  { id: 'mp3-to-flac', name: 'MP3 to FLAC', desc: 'Convert MP3 to lossless FLAC audio' },
  { id: 'mp3-to-aac', name: 'MP3 to AAC', desc: 'Convert MP3 to Apple compatible AAC' },
  { id: 'mp3-to-ac3', name: 'MP3 to AC3', desc: 'Convert MP3 to Dolby Digital AC3' },
  { id: 'mp3-to-ogg', name: 'MP3 to OGG', desc: 'Convert MP3 to open source OGG Vorbis' },
  { id: 'wav-to-mp3', name: 'WAV to MP3', desc: 'Convert uncompressed WAV to standard MP3' },
  { id: 'wav-to-flac', name: 'WAV to FLAC', desc: 'Lossless conversion from WAV to FLAC' },
  { id: 'wav-to-ac3', name: 'WAV to AC3', desc: 'Convert WAV audio to AC3 surround format' },
  { id: 'wav-to-ogg', name: 'WAV to OGG', desc: 'Convert uncompressed WAV to OGG format' },
  { id: 'flac-to-mp3', name: 'FLAC to MP3', desc: 'High-quality conversion from FLAC to MP3' },
  { id: 'flac-to-wav', name: 'FLAC to WAV', desc: 'Decompress FLAC to standard WAV format' },
  { id: 'flac-to-aac', name: 'FLAC to AAC', desc: 'Convert lossless FLAC to AAC format' },
  { id: 'flac-to-ac3', name: 'FLAC to AC3', desc: 'Convert FLAC audio to AC3' },
  { id: 'flac-to-ogg', name: 'FLAC to OGG', desc: 'Convert FLAC to OGG Vorbis' },
  { id: 'aac-to-mp3', name: 'AAC to MP3', desc: 'Convert AAC audio to standard MP3' },
  { id: 'aac-to-wav', name: 'AAC to WAV', desc: 'Convert AAC to uncompressed WAV' },
  { id: 'aac-to-flac', name: 'AAC to FLAC', desc: 'Convert AAC to lossless FLAC' },
  { id: 'aac-to-ac3', name: 'AAC to AC3', desc: 'Convert AAC to AC3 format' },
  { id: 'aac-to-ogg', name: 'AAC to OGG', desc: 'Convert AAC to OGG Vorbis' },
  { id: 'ogg-to-mp3', name: 'OGG to MP3', desc: 'Convert OGG Vorbis to standard MP3' },
];

const AudioToolCard = ({ tool, navigate, idx }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [15, -15]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-15, 15]), { stiffness: 300, damping: 30 });

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
            <div className="suite-icon-mini-v3" style={{ background: '#a855f730', color: '#a855f7' }}>
              <Volume2 size={14} />
            </div>
            <span className="suite-name-tag-v3">AUDIO ENGINE</span>
          </div>
          <div className="tool-action-indicator-v3">
            <ArrowUpRight size={16} />
          </div>
        </div>

        <div className="tool-card-body-v3">
          <h3 className="text-xl font-black text-white mb-2">{tool.name}</h3>
          <p className="text-sm text-slate-500 mb-6 font-medium line-clamp-2">{tool.desc}</p>
          
          <div className="tool-card-footer-v3">
            <div className="tool-status-dot-v3" style={{ backgroundColor: '#a855f7' }}></div>
            <span className="tool-ready-text-v3">Hi-Fi Engine Ready</span>
          </div>

          <div className="card-launch-aura-v3">
            <PrimaryButton
              className="launch-btn-premium-v3"
              style={{ backgroundColor: '#a855f7' }}
            >
              Master Audio
            </PrimaryButton>
          </div>
        </div>
      </div>
      <div className="card-glare-effect-v3"></div>
      <div className="card-hover-bg-v3" style={{ background: `radial-gradient(circle at top right, rgba(168, 85, 247, 0.15), transparent)` }}></div>
    </motion.button>
  );
};

const AudioConversionDashboard = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');

  // Hero Parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const heroRotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [5, -5]), { stiffness: 50, damping: 20 });
  const heroRotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-5, 5]), { stiffness: 50, damping: 20 });

  const filteredTools = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return AUDIO_TOOLS;

    return AUDIO_TOOLS.filter((tool) => 
      tool.name.toLowerCase().includes(query) || tool.desc.toLowerCase().includes(query)
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
              <img src="/assets/dashboards/audio_hero.png" alt="Audio Hero" className="hero-image-aura" style={{ opacity: 0.5 }} />
          </div>
          <div className="hero-content-aura" style={{ transformStyle: 'preserve-3d', padding: '6rem 8%' }}>
              <motion.div className="aura-chip-premium-v3" style={{ transform: 'translateZ(80px)' }}>
                  <div className="status-dot-pulse-v3" style={{ backgroundColor: '#a855f7' }}></div>
                  <Sparkles size={14} className="text-purple-400" />
                  <span>MASTERING ENGINE ACTIVE</span>
              </motion.div>
              <motion.h1 
                  className="text-6xl md:text-8xl font-black text-white mb-6 tracking-tighter"
                  style={{ transform: 'translateZ(120px)', lineHeight: 0.9 }}
              >
                  Universal <br/> <span className="text-purple-500">Mastering.</span>
              </motion.h1>
              <motion.p 
                  className="text-xl text-slate-400 max-w-2xl mb-12 font-medium"
                  style={{ transform: 'translateZ(100px)' }}
              >
                  High-fidelity audio conversion suite. 
                  Studio quality processing, entirely browser-based and secure.
              </motion.p>
              <div className="flex gap-8 text-sm font-black text-slate-500" style={{ transform: 'translateZ(130px)' }}>
                <div className="flex items-center gap-2"><ShieldCheck size={18} className="text-emerald-500" /> LOSSLESS QUALITY</div>
                <div className="flex items-center gap-2"><Zap size={18} className="text-yellow-500" /> REAL-TIME</div>
                <div className="flex items-center gap-2"><Disc size={18} className="text-purple-500" /> 32-BIT DEPTH</div>
              </div>
          </div>
      </motion.header>

      <main className="pdf-pages-main p-8 pt-0 md:p-12 md:pt-0 w-full max-w-[1700px] mx-auto">
        <header className="mb-12 flex flex-col md:flex-row justify-between items-center bg-white/[0.02] backdrop-blur-3xl p-6 rounded-[32px] border border-white/5 gap-6">
          <div className="flex items-center gap-5">
            <div className="p-4 bg-purple-500/20 rounded-2xl border border-purple-500/20">
               <Music className="text-purple-400" size={28} />
            </div>
            <div>
              <h2 className="text-2xl font-black text-white tracking-tight uppercase">Audio Master Library</h2>
              <p className="text-sm font-bold text-slate-500 tracking-widest">{filteredTools.length} MASTERING ENGINES READY</p>
            </div>
          </div>

          <SearchBar 
            placeholder="Search format (e.g. mp3)"
            onSearch={(val) => setSearch(val)}
            className="w-full md:w-96"
          />
        </header>

        <AnimatePresence mode="popLayout">
          {filteredTools.length > 0 ? (
            <div className="portal-tools-main-grid-v4">
              {filteredTools.map((tool, idx) => (
                <AudioToolCard key={tool.id} tool={tool} navigate={navigate} idx={idx} />
              ))}
            </div>
          ) : (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-40 text-slate-500 border border-dashed border-white/5 rounded-[48px] bg-white/[0.01]">
              <Headphones size={64} className="mx-auto mb-6 opacity-10" />
              <p className="text-2xl font-black tracking-tight">Audio Registry Empty</p>
              <p className="text-slate-600 mt-2">No audio formats matching "{search}"</p>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </section>
  );
};

export default AudioConversionDashboard;
