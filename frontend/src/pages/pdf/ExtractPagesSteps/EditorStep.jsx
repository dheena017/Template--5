import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    FileOutput, Scissors, ChevronLeft, 
    MousePointer2, Check, CheckCircle2, AlertCircle
} from 'lucide-react';
import Button from '../../../components/Button';

const EditorStep = ({ 
    pdfInfo, selectedPages, togglePage, selectAll, handleExecute, isProcessing, activeTool, reset 
}) => {
    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="editor-step-container w-full"
        >
            <div className="flex flex-col gap-10">
                {/* Visual Selection Area */}
                <div className="bg-slate-900/40 backdrop-blur-3xl border border-white/5 rounded-[40px] p-10 shadow-2xl">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12 pb-10 border-b border-white/5">
                        <div className="flex items-center gap-6">
                            <button 
                                onClick={reset}
                                className="w-12 h-12 rounded-full bg-slate-800/80 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-700 transition-all active:scale-90"
                            >
                                <ChevronLeft size={24} />
                            </button>
                            <div>
                                <h2 className="text-2xl font-black text-white">{pdfInfo.name}</h2>
                                <p className="text-slate-500 text-xs font-black uppercase tracking-[0.2em] mt-1">
                                    {pdfInfo.numPages} Pages • {(pdfInfo.size / (1024 * 1024)).toFixed(2)} MB
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <button 
                                onClick={selectAll} 
                                className="text-xs font-black text-cyan-500 hover:text-cyan-400 uppercase tracking-widest px-6 h-12 rounded-xl transition-all"
                            >
                                Select All
                            </button>
                            
                            <div className={`
                                px-6 py-3 rounded-2xl border-2 font-black text-sm uppercase transition-all
                                ${selectedPages.length > 0 ? 'bg-cyan-500/10 border-cyan-500 text-cyan-500 shadow-lg shadow-cyan-500/10' : 'bg-slate-800/50 border-slate-700 text-slate-500'}
                            `}>
                                {selectedPages.length} Pages to Extract
                            </div>
                            
                            <Button 
                                onClick={handleExecute}
                                disabled={isProcessing || selectedPages.length === 0}
                                className="h-16 px-12 rounded-2xl font-black text-white tracking-widest uppercase transition-all shadow-2xl active:scale-95 disabled:grayscale"
                                style={{ backgroundColor: activeTool.color }}
                            >
                                {isProcessing ? <Loader2 className="animate-spin" size={20} /> : <Scissors size={24} />}
                                <span className="ml-3">{isProcessing ? 'Processing' : 'Build New PDF'}</span>
                            </Button>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-8 max-h-[700px] overflow-y-auto pr-6 custom-scrollbar">
                        {pdfInfo.thumbnails.map((thumb, idx) => {
                            const pageNum = idx + 1;
                            const isSelected = selectedPages.includes(pageNum);
                            return (
                                <motion.div
                                    key={pageNum}
                                    whileHover={{ y: -8, scale: 1.02 }}
                                    onClick={() => togglePage(pageNum)}
                                    className={`
                                        relative group cursor-pointer rounded-[24px] overflow-hidden border-4 transition-all duration-500
                                        ${isSelected 
                                            ? 'border-cyan-500 shadow-[0_20px_50px_rgba(6,182,212,0.3)] bg-cyan-500/10' 
                                            : 'border-transparent hover:border-slate-600 bg-slate-800 shadow-xl opacity-60 hover:opacity-100'}
                                    `}
                                >
                                    <div className={`aspect-[3/4] relative overflow-hidden transition-all duration-700 ${isSelected ? 'group-hover:brightness-110' : 'grayscale-[40%] group-hover:grayscale-0'}`}>
                                        <img src={thumb} alt={`Page ${pageNum}`} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                    </div>
                                    
                                    <div className="absolute top-4 right-4 z-20">
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-500 ${isSelected ? 'bg-cyan-500 border-cyan-400 rotate-0' : 'bg-black/30 border-white/20 -rotate-90 group-hover:rotate-0 group-hover:bg-slate-700'}`}>
                                            {isSelected ? <Check size={20} className="text-white" strokeWidth={3} /> : <MousePointer2 size={16} className="text-white opacity-0 group-hover:opacity-100 transition-opacity" />}
                                        </div>
                                    </div>

                                    <div className={`absolute bottom-0 left-0 right-0 py-3 bg-slate-950/90 text-center transition-colors ${isSelected ? 'bg-cyan-950/90' : ''}`}>
                                        <span className={`text-[10px] font-black tracking-widest ${isSelected ? 'text-cyan-400' : 'text-slate-500 group-hover:text-white'}`}>PAGE {pageNum}</span>
                                    </div>

                                    <AnimatePresence>
                                        {isSelected && (
                                            <motion.div 
                                                initial={{ opacity: 0, scale: 0.8 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                exit={{ opacity: 0, scale: 0.8 }}
                                                className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none px-4"
                                            >
                                                <div className="bg-cyan-600/90 backdrop-blur-md text-white text-[10px] font-black px-4 py-2 rounded-xl shadow-2xl uppercase tracking-tighter border border-white/20">
                                                    Part of Result
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>

                {/* Info Card */}
                <div className="bg-cyan-500/5 border border-cyan-500/20 rounded-3xl p-8 flex items-start gap-6 backdrop-blur-sm">
                    <div className="w-14 h-14 bg-cyan-500/10 rounded-2xl flex items-center justify-center text-cyan-500 shrink-0 shadow-lg shadow-cyan-500/10">
                        <CheckCircle2 size={32} />
                    </div>
                    <div>
                        <h4 className="text-xl font-black text-cyan-100 mb-2 tracking-tight">How it works!</h4>
                        <p className="text-cyan-500/60 leading-relaxed font-medium">
                            Selecting pages marks them for inclusion in your new document. Any pages not selected will be left out. 
                            The resulting PDF is generated on your machine, ensuring total privacy and data ownership.
                        </p>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default EditorStep;
