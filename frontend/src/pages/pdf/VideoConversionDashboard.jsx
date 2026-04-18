import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Film, MonitorPlay, Zap, ShieldCheck, Box, ChevronRight, ArrowUpRight, Sparkles } from 'lucide-react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import '../../styles/pages/pdf/PDFPages.css';
import '../../styles/pages/dashboards/DashboardIndex.css';
import { PrimaryButton } from '../../components/buttons';
import SearchBar from '../../components/common/SearchBar/SearchBar';

const VIDEO_TOOLS = [
  { id: 'avi-to-mp4', name: 'AVI to MP4', desc: 'Convert legacy AVI videos to modern MP4 format' },
  { id: 'mp4-to-avi', name: 'MP4 to AVI', desc: 'Convert MP4 videos back to standard AVI' },
  { id: 'mkv-to-mp4', name: 'MKV to MP4', desc: 'Extract and convert MKV containers to MP4' },
  { id: 'mov-to-mp4', name: 'MOV to MP4', desc: 'Convert Apple QuickTime MOV to universal MP4' },
  { id: 'wmv-to-mp4', name: 'WMV to MP4', desc: 'Convert Windows Media Video to MP4' },
  { id: 'avi-to-mkv', name: 'AVI to MKV', desc: 'Wrap AVI streams into MKV containers' },
  { id: 'avi-to-mov', name: 'AVI to MOV', desc: 'Convert AVI to Apple MOV format' },
  { id: 'avi-to-wmv', name: 'AVI to WMV', desc: 'Convert AVI to Windows Media Video' },
  { id: 'mkv-to-avi', name: 'MKV to AVI', desc: 'Convert MKV video files to AVI' },
  { id: 'mkv-to-mov', name: 'MKV to MOV', desc: 'Convert MKV files to Apple compatible MOV' },
  { id: 'mkv-to-wmv', name: 'MKV to WMV', desc: 'Convert MKV to Windows compatible WMV' },
  { id: 'mov-to-avi', name: 'MOV to AVI', desc: 'Convert Apple MOV to standard AVI' },
  { id: 'mov-to-mkv', name: 'MOV to MKV', desc: 'Convert MOV video to MKV container' },
  { id: 'mov-to-wmv', name: 'MOV to WMV', desc: 'Convert Apple MOV format to WMV' },
  { id: 'mp4-to-mkv', name: 'MP4 to MKV', desc: 'Convert standard MP4 into MKV containers' },
  { id: 'mp4-to-mov', name: 'MP4 to MOV', desc: 'Convert MP4 format into Apple MOV' },
  { id: 'mp4-to-wmv', name: 'MP4 to WMV', desc: 'Convert MP4 into Windows Media Video' },
  { id: 'wmv-to-avi', name: 'WMV to AVI', desc: 'Convert WMV files to standard AVI format' },
  { id: 'wmv-to-mkv', name: 'WMV to MKV', desc: 'Convert WMV into open MKV format' }
];

const ConversionToolCard = ({ tool, navigate, idx }) => {
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
            <div className="suite-icon-mini-v3" style={{ background: '#7c3aed30', color: '#7c3aed' }}>
              <Film size={14} />
            </div>
            <span className="suite-name-tag-v3">VIDEO CONVERSION</span>
          </div>
          <div className="tool-action-indicator-v3">
            <ArrowUpRight size={16} />
          </div>
        </div>

        <div className="tool-card-body-v3">
          <h3 className="text-xl font-black text-white mb-2">{tool.name}</h3>
          <p className="text-sm text-slate-500 mb-6 font-medium line-clamp-2">{tool.desc}</p>
          
          <div className="tool-card-footer-v3">
            <div className="tool-status-dot-v3" style={{ backgroundColor: '#7c3aed' }}></div>
            <span className="tool-ready-text-v3">Transcoding Engine Ready</span>
          </div>

          <div className="card-launch-aura-v3">
            <PrimaryButton
              className="launch-btn-premium-v3"
              style={{ backgroundColor: '#7c3aed' }}
            >
              Open Transcoder
            </PrimaryButton>
          </div>
        </div>
      </div>
      <div className="card-glare-effect-v3"></div>
      <div className="card-hover-bg-v3" style={{ background: `radial-gradient(circle at top right, rgba(124, 58, 237, 0.15), transparent)` }}></div>
    </motion.button>
  );
};

const VideoConversionDashboard = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');

  // Hero Parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const heroRotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [5, -5]), { stiffness: 50, damping: 20 });
  const heroRotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-5, 5]), { stiffness: 50, damping: 20 });

  const filteredTools = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return VIDEO_TOOLS;

    return VIDEO_TOOLS.filter((tool) =>
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
              <img src="/assets/dashboards/conversion_hero.png" alt="Conversion Hero" className="hero-image-aura" style={{ opacity: 0.5 }} />
          </div>
          <div className="hero-content-aura" style={{ transformStyle: 'preserve-3d', padding: '6rem 8%' }}>
              <motion.div className="aura-chip-premium-v3" style={{ transform: 'translateZ(80px)' }}>
                  <div className="status-dot-pulse-v3" style={{ backgroundColor: '#7c3aed' }}></div>
                  <Sparkles size={14} className="text-violet-400" />
                  <span>TRANSCODE ENGINE ACTIVE</span>
              </motion.div>
              <motion.h1 
                  className="text-6xl md:text-8xl font-black text-white mb-6 tracking-tighter"
                  style={{ transform: 'translateZ(120px)', lineHeight: 0.9 }}
              >
                  Universal <br/> <span className="text-violet-500">Transcoding.</span>
              </motion.h1>
              <motion.p 
                  className="text-xl text-slate-400 max-w-2xl mb-12 font-medium"
                  style={{ transform: 'translateZ(100px)' }}
              >
                  Professional browser-based video conversion. 
                  Zero server lag, 100% privacy, infinite possibilities.
              </motion.p>
              <div className="flex gap-8 text-sm font-black text-slate-500" style={{ transform: 'translateZ(130px)' }}>
                <div className="flex items-center gap-2"><ShieldCheck size={18} className="text-emerald-500" /> LOCAL PROCESSING</div>
                <div className="flex items-center gap-2"><Zap size={18} className="text-yellow-500" /> ULTRA FAST</div>
                <div className="flex items-center gap-2"><Box size={18} className="text-violet-500" /> ALL FORMATS</div>
              </div>
          </div>
      </motion.header>

      <main className="pdf-pages-main p-8 pt-0 md:p-12 md:pt-0 w-full max-w-[1700px] mx-auto">
        <header className="mb-12 flex flex-col md:flex-row justify-between items-center bg-white/[0.02] backdrop-blur-3xl p-6 rounded-[32px] border border-white/5 gap-6">
          <div className="flex items-center gap-5">
            <div className="p-4 bg-violet-500/20 rounded-2xl border border-violet-500/20">
              <MonitorPlay className="text-violet-400" size={28} />
            </div>
            <div>
              <h2 className="text-2xl font-black text-white tracking-tight uppercase">Master Library</h2>
              <p className="text-sm font-bold text-slate-500 tracking-widest">{filteredTools.length} TRANSCODERS READY</p>
            </div>
          </div>

          <SearchBar 
            placeholder="Search format (e.g. mp4)"
            onSearch={(val) => setSearch(val)}
            className="w-full md:w-96"
          />
        </header>

        <AnimatePresence mode="popLayout">
          {filteredTools.length > 0 ? (
            <div className="portal-tools-main-grid-v4">
              {filteredTools.map((tool, idx) => (
                <ConversionToolCard key={tool.id} tool={tool} navigate={navigate} idx={idx} />
              ))}
            </div>
          ) : (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-40 text-slate-500 border border-dashed border-white/5 rounded-[48px] bg-white/[0.01]">
              <Film size={64} className="mx-auto mb-6 opacity-10" />
              <p className="text-2xl font-black tracking-tight">Format Registry Empty</p>
              <p className="text-slate-600 mt-2">No transcoders found matching "{search}"</p>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </section>
  );
};

export default VideoConversionDashboard;
