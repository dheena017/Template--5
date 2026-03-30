import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Music, Headphones, Zap, ShieldCheck, Volume2, Disc, ChevronRight, ArrowUpRight } from 'lucide-react';
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

const AudioConversionDashboard = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');

  const filteredTools = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return AUDIO_TOOLS;

    return AUDIO_TOOLS.filter((tool) => 
      tool.name.toLowerCase().includes(query) || tool.desc.toLowerCase().includes(query)
    );
  }, [search]);

  return (
    <section className="pdf-pages-shell" style={{ width: '100%', height: '100%', overflowY: 'auto' }}>
      <div className="pdf-hero bg-gradient-to-br from-purple-900 via-violet-950 to-black py-20 px-8 text-center border-b border-white/5">
        <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight">
            Universal <span className="text-purple-500">Audio</span> Conversion
        </h1>
        <p className="text-xl text-slate-400 max-w-3xl mx-auto mb-10">
            Professional high-fidelity audio tools running 100% in your browser. Blazing fast, studio-quality, and entirely private. No audio is ever uploaded.
        </p>
        <div className="flex flex-wrap justify-center gap-8 text-sm font-bold text-slate-300">
            <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full border border-white/5">
                <ShieldCheck size={18} className="text-emerald-400" />
                HID FIDELITY
            </div>
            <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full border border-white/5">
                <Zap size={18} className="text-yellow-400" />
                INSTANT PROCESSING
            </div>
            <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full border border-white/5">
                <Disc size={18} className="text-purple-400" />
                MULTIPLE CHANNELS
            </div>
        </div>
      </div>

      <main className="pdf-pages-main p-8 md:p-12 w-full max-w-[1400px] mx-auto">
        <header className="pdf-pages-header mb-12 flex justify-between items-center bg-white/5 p-4 rounded-2xl border border-white/10">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-purple-500/20 rounded-xl">
               <Music className="text-purple-400" size={24} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Audio Format Tools</h2>
              <p className="text-sm text-slate-400">{filteredTools.length} formats available</p>
            </div>
          </div>

          <SearchBar 
            placeholder="Search format (e.g. mp3)"
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
                        <div className="suite-icon-mini" style={{ color: '#a855f7' }}>
                            <Volume2 size={14} />
                        </div>
                        <span className="suite-name-tag">AUDIO CONVERSION</span>
                    </div>
                    <div className="tool-action-indicator">
                        <ArrowUpRight size={14} />
                    </div>
                </div>

                <div className="tool-card-body">
                    <h3>{tool.name}</h3>
                    <div className="tool-card-footer">
                        <div className="tool-status-dot" style={{ backgroundColor: '#a855f7' }}></div>
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
                <div className="card-hover-bg" style={{ background: `radial-gradient(circle at top right, #a855f715, transparent)` }}></div>
              </button>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-slate-400">
             <Headphones size={48} className="mx-auto mb-4 opacity-20" />
             <p className="text-xl">No audio formats matching "{search}"</p>
          </div>
        )}
      </main>
    </section>
  );
};

export default AudioConversionDashboard;
