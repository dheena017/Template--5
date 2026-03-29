import React from 'react';
import { motion } from 'framer-motion';
import { 
    Scissors, ListFilter, Files, Box, Bookmark, 
    Settings2, Download, Loader2, FileType
} from 'lucide-react';

const OptionsStep = ({ 
    pdfInfo, state, dispatch, handleExecute, processing, progress, activeTool 
}) => {
    const splitModes = [
        { id: 'EVERY', label: 'Every X pages', icon: Scissors, desc: 'Split into files of fixed page counts' },
        { id: 'CUSTOM', label: 'Custom ranges', icon: ListFilter, desc: 'Define specific page ranges (e.g. 1-5, 8)' },
        { id: 'ALL', label: 'Individual pages', icon: Files, desc: 'Export every page as a separate PDF' },
        { id: 'SIZE', label: 'By file size', icon: Box, desc: 'Automatically split based on target MB' },
        { id: 'BOOKMARKS', label: 'By bookmarks', icon: Bookmark, desc: 'Split based on existing chapter tags' },
    ];

    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="options-step-container grid grid-cols-1 lg:grid-cols-12 gap-10 w-full"
        >
            {/* Sidebar Controls */}
            <div className="lg:col-span-4 space-y-6">
                <div className="bg-slate-800/40 border border-white/5 backdrop-blur-xl rounded-2xl p-6 shadow-2xl">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="p-2 bg-red-500/10 rounded-lg">
                            <Settings2 size={20} className="text-red-500" />
                        </div>
                        <h3 className="font-black text-white uppercase tracking-wider text-sm">Split Strategy</h3>
                    </div>

                    <div className="space-y-3">
                        {splitModes.map(m => (
                            <button 
                                key={m.id}
                                onClick={() => dispatch({ type: 'SET_MODE', payload: m.id })}
                                className={`
                                    w-full flex items-start gap-4 p-4 rounded-xl text-left border transition-all group
                                    ${state.mode === m.id 
                                        ? 'bg-red-500/10 border-red-500 text-white shadow-lg shadow-red-500/5' 
                                        : 'bg-slate-900/40 border-slate-700/50 text-slate-400 hover:bg-slate-700/30'}
                                `}
                            >
                                <div className={`p-2 rounded-lg ${state.mode === m.id ? 'bg-red-500 text-white' : 'bg-slate-800'}`}>
                                    <m.icon size={18} />
                                </div>
                                <div>
                                    <div className="font-bold text-sm">{m.label}</div>
                                    <div className="text-[10px] opacity-60 mt-0.5">{m.desc}</div>
                                </div>
                            </button>
                        ))}
                    </div>

                    <div className="mt-8 pt-8 border-t border-white/5">
                        <AnimatePresence mode="wait">
                            <motion.div 
                                key={state.mode}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 10 }}
                                className="space-y-5"
                            >
                                {state.mode === 'EVERY' && (
                                    <div className="space-y-3">
                                        <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Pages per PDF</label>
                                        <div className="relative group">
                                            <input 
                                                type="number" 
                                                min="1" 
                                                value={state.interval}
                                                onChange={(e) => dispatch({ type: 'SET_INTERVAL', payload: e.target.value })}
                                                className="bg-slate-950/50 border border-slate-700 rounded-xl p-4 w-full text-white font-black text-lg focus:border-red-500 outline-none transition-all"
                                            />
                                            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 font-bold text-xs uppercase">Pages</div>
                                        </div>
                                    </div>
                                )}
                                {state.mode === 'CUSTOM' && (
                                    <div className="space-y-3">
                                        <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Page Ranges</label>
                                        <input 
                                            type="text" 
                                            placeholder="e.g. 1-3, 5, 8-10"
                                            value={state.ranges}
                                            onChange={(e) => dispatch({ type: 'SET_RANGES', payload: e.target.value })}
                                            className="bg-slate-950/50 border border-slate-700 rounded-xl p-4 w-full text-white font-bold focus:border-red-500 outline-none transition-all"
                                        />
                                        <p className="text-[10px] text-slate-500 leading-relaxed italic">Example: "1,5,8-10" will create 3 files containing those specific pages.</p>
                                    </div>
                                )}
                                {state.mode === 'SIZE' && (
                                    <div className="space-y-3">
                                        <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Max File Size</label>
                                        <div className="relative">
                                            <input 
                                                type="number" 
                                                step="0.1"
                                                value={state.targetSize}
                                                onChange={(e) => dispatch({ type: 'SET_SIZE', payload: e.target.value })}
                                                className="bg-slate-950/50 border border-slate-700 rounded-xl p-4 w-full text-white font-black text-lg focus:border-red-500 outline-none transition-all"
                                            />
                                            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 font-bold text-xs uppercase">MB</div>
                                        </div>
                                    </div>
                                )}
                                {state.mode === 'BOOKMARKS' && (
                                    <div className="p-4 bg-slate-950/30 rounded-xl text-xs text-slate-500 leading-relaxed border border-white/5">
                                        {pdfInfo.outline.length > 0 
                                            ? `Engine identified ${pdfInfo.outline.length} logic chunks via bookmarks.` 
                                            : 'No bookmarks/chapters found in this document.'}
                                    </div>
                                )}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>

                <button 
                    disabled={processing}
                    onClick={handleExecute}
                    style={{ backgroundColor: activeTool.color }}
                    className="w-full py-5 rounded-2xl font-black text-white uppercase tracking-wider flex items-center justify-center gap-4 hover:brightness-110 active:scale-95 transition-all shadow-2xl shadow-red-600/20 disabled:opacity-50"
                >
                    {processing ? (
                        <><Loader2 className="animate-spin" size={24} /> <span>Split {progress}%</span></>
                    ) : (
                        <><Scissors size={24} /> <span>Execute Split</span></>
                    )}
                </button>
            </div>

            {/* Document Preview */}
            <div className="lg:col-span-8">
                <div className="bg-slate-900/30 border border-white/5 rounded-3xl p-8 h-full backdrop-blur-md">
                    <div className="flex items-center justify-between mb-8 pb-8 border-b border-white/5">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-red-500/10 rounded-xl">
                                <FileType size={28} className="text-red-500" />
                            </div>
                            <div>
                                <h2 className="text-xl font-black text-white">{pdfInfo.name}</h2>
                                <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">
                                    {pdfInfo.numPages} Pages • {(pdfInfo.size / (1024 * 1024)).toFixed(2)} MB
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 max-h-[600px] overflow-y-auto pr-4 scrollbar-thin scrollbar-thumb-slate-700">
                        {pdfInfo.thumbnails.map((thumb, idx) => (
                            <div key={idx} className="group relative aspect-[3/4] bg-slate-800 rounded-xl overflow-hidden border border-slate-700/50 shadow-xl transition-all hover:border-red-500/50">
                                <img src={thumb} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                <div className="absolute top-2 left-2 px-2 py-1 bg-black/70 backdrop-blur-md rounded-md text-white text-[9px] font-black tracking-tighter shadow-lg">
                                    PG. {idx + 1}
                                </div>
                                <div className="absolute inset-x-0 bottom-0 py-2 bg-gradient-to-t from-black/80 to-transparent flex justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                    <span className="text-[10px] font-bold text-white uppercase tracking-widest">Preview Only</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default OptionsStep;
