import React from 'react';
import { motion } from 'framer-motion';
import { Scan, Download } from 'lucide-react';

const ResultStep = ({ resultData, downloadTxtFile, reset }) => {
    return (
        <motion.div 
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-slate-800/50 border border-slate-700 rounded-3xl p-12 text-center w-full"
        >
            <div className="w-24 h-24 bg-pink-500/20 rounded-full flex items-center justify-center mx-auto mb-8">
                <Scan size={56} className="text-pink-500" />
            </div>
            <h2 className="text-4xl font-black text-white mb-4">Text Extracted!</h2>
            <div className="mb-10 bg-slate-900/50 p-6 rounded-2xl border border-slate-700 max-w-3xl mx-auto text-left overflow-auto max-h-60 shadow-inner">
                <pre className="text-slate-300 font-mono text-sm whitespace-pre-wrap">{resultData}</pre>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button 
                    onClick={downloadTxtFile}
                    className="px-12 py-5 bg-pink-600 hover:bg-pink-500 text-white font-bold rounded-2xl shadow-xl shadow-pink-600/30 transition-all flex items-center gap-3"
                >
                    <Download size={24} />
                    Download Output Data
                </button>
                <button onClick={reset} className="px-10 py-5 bg-slate-700 hover:bg-slate-600 text-white font-bold rounded-2xl transition-all">
                    Scan Another
                </button>
            </div>
        </motion.div>
    );
};

export default ResultStep;
