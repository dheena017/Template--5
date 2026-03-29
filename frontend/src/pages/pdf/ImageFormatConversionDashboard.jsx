import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Image, ImageIcon, Zap, ShieldCheck, FileImage, Layers, ChevronRight, ArrowUpRight } from 'lucide-react';
import { PrimaryButton } from '../../components/buttons';
import '../../styles/pages/pdf/PDFPages.css';

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

const ImageFormatConversionDashboard = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');

  const filteredTools = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return IMAGE_TOOLS;

    return IMAGE_TOOLS.filter((tool) =>
      tool.name.toLowerCase().includes(query) || tool.desc.toLowerCase().includes(query)
    );
  }, [search]);

  return (
    <section className="pdf-pages-shell" style={{ width: '100%', height: '100%', overflowY: 'auto' }}>
      <div className="pdf-hero bg-gradient-to-br from-amber-900 via-orange-950 to-black py-20 px-8 text-center border-b border-white/5 mb-12">
        <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight">
          Universal <span className="text-amber-500">Image</span> Hub
        </h1>
        <p className="text-xl text-slate-400 max-w-3xl mx-auto mb-10">
          Professional image processing and format tools running 100% in your browser. Perfect color accuracy, lossless rendering, and entirely private.
        </p>
        <div className="flex flex-wrap justify-center gap-8 text-sm font-bold text-slate-300">
          <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full border border-white/5">
            <ShieldCheck size={18} className="text-emerald-400" />
            LOSSLESS RENDERING
          </div>
          <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full border border-white/5">
            <Zap size={18} className="text-yellow-400" />
            GPU ACCELERATED
          </div>
          <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full border border-white/5">
            <Layers size={18} className="text-amber-400" />
            VECTORS & MASKING
          </div>
        </div>
      </div>

      <main className="pdf-pages-main p-8 pt-10 md:p-12 md:pt-12 w-full max-w-[1400px] mx-auto">
        <header className="pdf-pages-header mb-12 flex justify-between items-center bg-white/5 p-4 rounded-2xl border border-white/10">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-amber-500/20 rounded-xl">
              <FileImage className="text-amber-400" size={24} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Image Format Tools</h2>
              <p className="text-sm text-slate-400">{filteredTools.length} formats available</p>
            </div>
          </div>

          <div className="relative w-72 group">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-amber-500 transition-colors" />
            <input
              id="image-pages-search"
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search format (e.g. png)"
              autoComplete="off"
              spellCheck="false"
              style={{ paddingLeft: '3rem' }}
              className="w-full bg-black/40 border border-white/10 rounded-full py-3 pr-4 text-white placeholder:text-slate-500 focus:outline-none focus:border-amber-500 focus:bg-black/60 transition-all font-medium"
            />
          </div>
        </header>

        {filteredTools.length > 0 ? (
          <div className="portal-tools-main-grid">
            {filteredTools.map((tool, idx) => (
              <button
                key={tool.id}
                type="button"
                className="portal-tool-card"
                style={{
                  animationDelay: `${idx * 0.03}s`,
                  backgroundColor: '#0f1016',
                  border: '1px solid rgba(255, 255, 255, 0.04)'
                }}
                onClick={() => navigate(`/${tool.id}`)}
              >
                <div className="tool-card-top">
                  <div className="tool-suite-info">
                    <div className="suite-icon-mini" style={{ color: '#eab308' }}>
                      <FileImage size={14} />
                    </div>
                    <span className="suite-name-tag">IMAGE CONVERSION</span>
                  </div>
                  <div className="tool-action-indicator">
                    <ArrowUpRight size={14} />
                  </div>
                </div>

                <div className="tool-card-body">
                  <h3>{tool.name}</h3>
                  <div className="tool-card-footer">
                    <div className="tool-status-dot" style={{ backgroundColor: '#eab308' }}></div>
                    <span className="tool-ready-text">Ready to use</span>
                  </div>

                  <div className="card-launch-aura">
                    <PrimaryButton
                      className="launch-btn-premium"
                      size="md"
                      style={{ backgroundColor: '#7c3aed', color: '#fff', borderRadius: '100px', fontWeight: '800', border: 'none', boxShadow: '0 10px 20px rgba(124, 58, 237, 0.3)', paddingInline: '2rem' }}
                    >
                      Open Tool
                    </PrimaryButton>
                  </div>
                </div>
                <div className="card-hover-bg" style={{ background: `radial-gradient(circle at top right, #eab30815, transparent)` }}></div>
              </button>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-slate-400">
            <ImageIcon size={48} className="mx-auto mb-4 opacity-20" />
            <p className="text-xl">No image formats matching "{search}"</p>
          </div>
        )}
      </main>
    </section>
  );
};

export default ImageFormatConversionDashboard;
