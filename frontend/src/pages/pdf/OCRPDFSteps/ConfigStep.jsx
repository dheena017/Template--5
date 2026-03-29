import React from 'react';
import { motion } from 'framer-motion';
import { FileText, FileSearch, FileJson, Lock, Loader2, Sparkles } from 'lucide-react';

const ConfigStep = ({ 
    pdfInfo, 
    recognitionMode, 
    setRecognitionMode, 
    handleOCR, 
    isProcessing, 
    progress 
}) => {
    return (
        <motion.div 
            key="config"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full max-w-4xl mx-auto"
        >
            <div className="bg-slate-800/80 p-8 rounded-[2rem] border border-white/10 shadow-2xl backdrop-blur-xl">
                <div className="flex items-center gap-6 mb-10">
                    <div className="w-16 h-16 bg-slate-700/50 rounded-2xl flex items-center justify-center border border-white/5">
                        <FileText size={32} className="text-pink-500" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-black text-white">{pdfInfo.name}</h2>
                        <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">
                            {pdfInfo.numPages} Pages • Neural OCR Standby
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
                    {[
                        { id: 'text', label: 'Extract Text', desc: 'Raw plaintext data output', icon: FileText },
                        { id: 'searchable', label: 'Searchable PDF', desc: 'Rebuils PDF with text layer', icon: FileSearch },
                        { id: 'json', label: 'Structured JSON', desc: 'Outputs intelligence coordinates', icon: FileJson },
                    ].map(level => (
                        <button 
                            key={level.id}
                            onClick={() => setRecognitionMode(level.id)}
                            className={`
                                p-6 rounded-2xl text-left border-2 transition-all flex flex-col gap-3
                                ${recognitionMode === level.id ? 'bg-pink-500/10 border-pink-500' : 'bg-slate-900/50 border-transparent hover:border-slate-700'}
                            `}
                        >
                            <level.icon size={24} className={recognitionMode === level.id ? 'text-pink-500' : 'text-slate-500'} />
                            <div>
                                <p className={`font-black tracking-tight ${recognitionMode === level.id ? 'text-white' : 'text-slate-400'}`}>{level.label}</p>
                                <p className="text-xs text-slate-500 font-medium">{level.desc}</p>
                            </div>
                        </button>
                    ))}
                </div>

                <button 
                    onClick={handleOCR}
                    disabled={isProcessing}
                    className="w-full py-6 bg-pink-600 hover:bg-pink-500 disabled:opacity-50 text-white font-black text-xl rounded-2xl shadow-xl shadow-pink-600/30 transition-all flex items-center justify-center gap-4"
                >
                    {isProcessing ? (
                        <>
                            <Loader2 className="animate-spin" size={28} />
                            <span>Scanning Document {progress}%</span>
                        </>
                    ) : (
                        <>
                            <Sparkles size={28} />
                            <span>Start Intelligence Scan</span>
                        </>
                    )}
                </button>
                
                <div className="mt-6 flex items-center justify-center gap-3 text-slate-500 text-xs font-bold uppercase tracking-widest">
                    <Lock size={12} className="text-green-500" />
                    100% Client-Side Neural Process
                </div>
            </div>
        </motion.div>
    );
};

export default ConfigStep;
