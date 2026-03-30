import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Film, MonitorPlay, Zap, ShieldCheck, Box, ChevronRight, ArrowUpRight } from 'lucide-react';
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

const VideoConversionDashboard = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');

  const filteredTools = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return VIDEO_TOOLS;

    return VIDEO_TOOLS.filter((tool) =>
      tool.name.toLowerCase().includes(query) || tool.desc.toLowerCase().includes(query)
    );
  }, [search]);

  return (
    <section className="pdf-pages-shell" style={{ width: '100%', height: '100%', overflowY: 'auto' }}>
      <div className="pdf-hero bg-gradient-to-br from-violet-900 via-indigo-950 to-black py-20 px-8 text-center border-b border-white/5 mb-12">
        <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight">
          Universal <span className="text-violet-500">Video</span> Conversion
        </h1>
        <p className="text-xl text-slate-400 max-w-3xl mx-auto mb-10">
          Professional video transcoding tools running directly in your browser. Blazing fast, format-perfect, and entirely private. No video is ever uploaded.
        </p>
        <div className="flex flex-wrap justify-center gap-8 text-sm font-bold text-slate-300">
          <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full border border-white/5">
            <ShieldCheck size={18} className="text-emerald-400" />
            OFFLINE PROCESSING
          </div>
          <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full border border-white/5">
            <Zap size={18} className="text-yellow-400" />
            HARDWARE ACCELERATED
          </div>
          <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full border border-white/5">
            <Box size={18} className="text-purple-400" />
            NO FILE SIZE LIMITS
          </div>
        </div>
      </div>

      <main className="pdf-pages-main p-8 pt-10 md:p-12 md:pt-12 w-full max-w-[1400px] mx-auto">
        <header className="pdf-pages-header mb-12 flex justify-between items-center bg-white/5 p-4 rounded-2xl border border-white/10">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-violet-500/20 rounded-xl">
              <MonitorPlay className="text-violet-400" size={24} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Video Format Tools</h2>
              <p className="text-sm text-slate-400">{filteredTools.length} formats available</p>
            </div>
          </div>

          <SearchBar 
            placeholder="Search format (e.g. mp4)"
            onSearch={(val) => setSearch(val)}
            className="w-72"
          />

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
                    <div className="suite-icon-mini" style={{ color: '#7c3aed' }}>
                      <Film size={14} />
                    </div>
                    <span className="suite-name-tag">VIDEO CONVERSION</span>
                  </div>
                  <div className="tool-action-indicator">
                    <ArrowUpRight size={14} />
                  </div>
                </div>

                <div className="tool-card-body">
                  <h3>{tool.name}</h3>
                  <div className="tool-card-footer">
                    <div className="tool-status-dot" style={{ backgroundColor: '#7c3aed' }}></div>
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
                <div className="card-hover-bg" style={{ background: `radial-gradient(circle at top right, #7c3aed15, transparent)` }}></div>
              </button>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-slate-400">
            <Film size={48} className="mx-auto mb-4 opacity-20" />
            <p className="text-xl">No video formats matching "{search}"</p>
          </div>
        )}
      </main>
    </section>
  );
};

export default VideoConversionDashboard;
