import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Trash2, X, FileMinus, ChevronLeft, 
    MousePointer2, Layers, AlertCircle
} from 'lucide-react';
import Button from '../../../components/Button';

const EditorStep = ({ 
    pdfInfo, selectedPages, togglePage, handleExecute, isProcessing, activeTool, reset 
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
                            <div className={`
                                px-6 py-3 rounded-2xl border-2 font-black text-sm uppercase transition-all
                                ${selectedPages.length > 0 ? 'bg-rose-500/10 border-rose-500 text-rose-500 shadow-lg shadow-rose-500/10' : 'bg-slate-800/50 border-slate-700 text-slate-500'}
                            `}>
                                {selectedPages.length} Marked for Deletion
                            </div>
                            
                            <Button 
                                onClick={handleExecute}
                                disabled={isProcessing || selectedPages.length === 0}
                                className="h-16 px-10 rounded-2xl font-black text-white tracking-widest uppercase transition-all shadow-2xl active:scale-95 disabled:grayscale"
                                style={{ backgroundColor: activeTool.color }}
                            >
                                {isProcessing ? <Trash2 className="animate-spin" size={20} /> : <Trash2 size={24} />}
                                <span className="ml-3">{isProcessing ? 'Processing' : 'Execute Deletion'}</span>
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
                                            ? 'border-rose-500 shadow-[0_20px_50px_rgba(244,63,94,0.3)] bg-rose-500/10' 
                                            : 'border-transparent hover:border-slate-600 bg-slate-800 shadow-xl'}
                                    `}
                                >
                                    <div className={`aspect-[3/4] relative overflow-hidden transition-all duration-700 ${isSelected ? 'opacity-30 grayscale blur-[1px]' : 'group-hover:brightness-110'}`}>
                                        <img src={thumb} alt={`Page ${pageNum}`} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                    </div>
                                    
                                    <div className="absolute top-4 right-4 z-20">
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-500 ${isSelected ? 'bg-rose-500 border-rose-400 rotate-0' : 'bg-black/30 border-white/20 -rotate-90 group-hover:rotate-0 group-hover:bg-slate-700'}`}>
                                            {isSelected ? <X size={20} className="text-white" /> : <MousePointer2 size={16} className="text-white opacity-0 group-hover:opacity-100 transition-opacity" />}
                                        </div>
                                    </div>

                                    <div className={`absolute bottom-0 left-0 right-0 py-3 bg-slate-950/90 text-center transition-colors ${isSelected ? 'bg-rose-950/90' : ''}`}>
                                        <span className={`text-[10px] font-black tracking-widest ${isSelected ? 'text-rose-400' : 'text-slate-500 group-hover:text-white'}`}>PAGE {pageNum}</span>
                                    </div>

                                    <AnimatePresence>
                                        {isSelected && (
                                            <motion.div 
                                                initial={{ opacity: 0, scale: 0.8 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                exit={{ opacity: 0, scale: 0.8 }}
                                                className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none px-4"
                                            >
                                                <div className="bg-rose-600/90 backdrop-blur-md text-white text-[10px] font-black px-4 py-2 rounded-xl shadow-2xl uppercase tracking-tighter border border-white/20">
                                                    Marked for deletion
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
                <div className="bg-amber-500/5 border border-amber-500/20 rounded-3xl p-8 flex items-start gap-6 backdrop-blur-sm">
                    <div className="w-14 h-14 bg-amber-500/10 rounded-2xl flex items-center justify-center text-amber-500 shrink-0 shadow-lg shadow-amber-500/10">
                        <AlertCircle size={32} />
                    </div>
                    <div>
                        <h4 className="text-xl font-black text-amber-100 mb-2 tracking-tight">Important!</h4>
                        <p className="text-amber-500/60 leading-relaxed font-medium">
                            Once you execute the deletion, a new version of your PDF will be created automatically. 
                            Your original file remains untouched on your device. You cannot remove all pages (the document must contain at least one page).
                        </p>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default EditorStep;
