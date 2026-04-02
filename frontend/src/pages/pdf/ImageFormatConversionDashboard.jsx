import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Image, ImageIcon, Zap, ShieldCheck, FileImage, Layers, ChevronRight, ArrowUpRight, Sparkles } from 'lucide-react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { PrimaryButton } from '../../components/buttons';
import SearchBar from '../../components/common/SearchBar/SearchBar';
import '../../styles/pages/pdf/PDFPages.css';
import '../../styles/pages/dashboards/DashboardIndex.css';

const IMAGE_TOOLS = [
  { id: 'heic-to-jpg', name: 'HEIC to JPG', desc: 'Convert Apple HEIC photos to standard JPEG' },
  { id: 'heic-to-png', name: 'HEIC to PNG', desc: 'Convert HEIC photos to high-quality PNG' },
  { id: 'heic-to-webp', name: 'HEIC to WEBP', desc: 'Convert HEIC photos to modern WEBP format' },
  { id: 'heic-to-jpeg', name: 'HEIC to JPEG', desc: 'Convert HEIC to standard JPEG format' },
  { id: 'svg-to-png', name: 'SVG to PNG', desc: 'Render vector SVG graphics into PNG bitmapped images' },
  { id: 'svg-to-jpg', name: 'SVG to JPG', desc: 'Convert vector SVG graphics to JPEG photos' },
  { id: 'svg-to-jpeg', name: 'SVG to JPEG', desc: 'Convert vector SVG format to JPEG' },
  { id: 'svg-to-webp', name: 'SVG to WEBP', desc: 'Optimized conversion from SVG to WEBP' },
  { id: 'png-to-jpg', name: 'PNG to JPG', desc: 'Convert PNG images with transparency to solid JPEG' },
  { id: 'jpg-to-png', name: 'JPG to PNG', desc: 'Convert standard JPEG photos to high-quality PNG' },
  { id: 'webp-to-jpg', name: 'WEBP to JPG', desc: 'Convert modern WEBP format to standard JPEG' },
  { id: 'webp-to-png', name: 'WEBP to PNG', desc: 'Convert WEBP images to PNG format' },
  { id: 'webp-to-jpeg', name: 'WEBP to JPEG', desc: 'Convert WEBP to standard JPEG' },
  { id: 'jpg-to-webp', name: 'JPG to WEBP', desc: 'Optimize JPEG photos into modern WEBP format' },
];

const ImageToolCard = ({ tool, navigate, idx }) => {
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
            <div className="suite-icon-mini-v3" style={{ background: '#eab30830', color: '#eab308' }}>
              <FileImage size={14} />
            </div>
            <span className="suite-name-tag-v3">IMAGE ENGINE</span>
          </div>
          <div className="tool-action-indicator-v3">
            <ArrowUpRight size={16} />
          </div>
        </div>

        <div className="tool-card-body-v3">
          <h3 className="text-xl font-black text-white mb-2">{tool.name}</h3>
          <p className="text-sm text-slate-500 mb-6 font-medium line-clamp-2">{tool.desc}</p>

          <div className="tool-card-footer-v3">
            <div className="tool-status-dot-v3" style={{ backgroundColor: '#eab308' }}></div>
            <span className="tool-ready-text-v3">Rendering Engine Ready</span>
          </div>

          <div className="card-launch-aura-v3">
            <PrimaryButton
              className="launch-btn-premium-v3"
              style={{ backgroundColor: '#eab308' }}
            >
              Open Processor
            </PrimaryButton>
          </div>
        </div>
      </div>
      <div className="card-glare-effect-v3"></div>
      <div className="card-hover-bg-v3" style={{ background: `radial-gradient(circle at top right, rgba(234, 179, 8, 0.15), transparent)` }}></div>
    </motion.button>
  );
};

const ImageFormatConversionDashboard = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');

  // Hero Parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const heroRotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [5, -5]), { stiffness: 50, damping: 20 });
  const heroRotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-5, 5]), { stiffness: 50, damping: 20 });

  const filteredTools = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return IMAGE_TOOLS;

    return IMAGE_TOOLS.filter((tool) =>
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
          <img src="/assets/dashboards/image_hero.png" alt="Image Hero" className="hero-image-aura" style={{ opacity: 0.5 }} />
        </div>
        <div className="hero-content-aura" style={{ transformStyle: 'preserve-3d', padding: '6rem 8%' }}>
          <motion.div className="aura-chip-premium-v3" style={{ transform: 'translateZ(80px)' }}>
            <div className="status-dot-pulse-v3" style={{ backgroundColor: '#eab308' }}></div>
            <Sparkles size={14} className="text-amber-400" />
            <span>IMAGE ENGINE ACTIVE</span>
          </motion.div>
          <motion.h1
            className="text-6xl md:text-8xl font-black text-white mb-6 tracking-tighter"
            style={{ transform: 'translateZ(120px)', lineHeight: 0.9 }}
          >
            Universal <br /> <span className="text-amber-500">Image Hub.</span>
          </motion.h1>
          <motion.p
            className="text-xl text-slate-400 max-w-2xl mb-12 font-medium"
            style={{ transform: 'translateZ(100px)' }}
          >
            Professional browser-based image transformation.
            Zero server lag, 100% privacy, lossless quality.
          </motion.p>
          <div className="flex gap-8 text-sm font-black text-slate-500" style={{ transform: 'translateZ(130px)' }}>
            <div className="flex items-center gap-2"><ShieldCheck size={18} className="text-emerald-500" /> BIT-PERFECT</div>
            <div className="flex items-center gap-2"><Zap size={18} className="text-yellow-500" /> FAST FLOW</div>
            <div className="flex items-center gap-2"><Layers size={18} className="text-amber-500" /> MULTI-FORMAT</div>
          </div>
        </div>
      </motion.header>

      <main className="pdf-pages-main p-8 pt-0 md:p-12 md:pt-0 w-full max-w-[1700px] mx-auto">
        <header className="mb-12 flex flex-col md:flex-row justify-between items-center bg-white/[0.02] backdrop-blur-3xl p-6 rounded-[32px] border border-white/5 gap-6">
          <div className="flex items-center gap-5">
            <div className="p-4 bg-amber-500/20 rounded-2xl border border-amber-500/20">
              <FileImage className="text-amber-400" size={28} />
            </div>
            <div>
              <h2 className="text-2xl font-black text-white tracking-tight uppercase">Registry Suite</h2>
              <p className="text-sm font-bold text-slate-500 tracking-widest">{filteredTools.length} IMAGE ENGINES READY</p>
            </div>
          </div>

          <SearchBar
            placeholder="Search format (e.g. png)"
            onSearch={(val) => setSearch(val)}
            className="w-full md:w-96"
          />
        </header>

        <AnimatePresence mode="popLayout">
          {filteredTools.length > 0 ? (
            <div className="portal-tools-main-grid-v4">
              {filteredTools.map((tool, idx) => (
                <ImageToolCard key={tool.id} tool={tool} navigate={navigate} idx={idx} />
              ))}
            </div>
          ) : (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-40 text-slate-500 border border-dashed border-white/5 rounded-[48px] bg-white/[0.01]">
              <ImageIcon size={64} className="mx-auto mb-6 opacity-10" />
              <p className="text-2xl font-black tracking-tight">Format Registry Empty</p>
              <p className="text-slate-600 mt-2">No image formats matching "{search}"</p>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </section>
  );
};

export default ImageFormatConversionDashboard;
