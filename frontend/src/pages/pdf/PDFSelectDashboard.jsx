import React, { useState, useCallback } from 'react';
import { 
    FileUp, Files, Combine, Split, Search, Trash2, 
    ArrowRight, CheckCircle2, LayoutGrid, List, Plus,
    FileText, Clock, Star, HardDrive, Shield
} from 'lucide-react';
import { useDropzone } from 'react-dropzone';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import '../../styles/pages/pdf/OrganizePDF.css';

const PDFSelectDashboard = () => {
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [viewMode, setViewMode] = useState('grid'); // grid, list
    const navigate = useNavigate();

    const onDrop = useCallback((acceptedFiles) => {
        const newFiles = acceptedFiles.map(file => ({
            id: Math.random().toString(36).substr(2, 9),
            file,
            name: file.name,
            size: (file.size / 1024 / 1024).toFixed(2) + ' MB',
            selected: true,
            timestamp: new Date().toLocaleTimeString()
        }));
        setSelectedFiles(prev => [...prev, ...newFiles]);
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { 'application/pdf': ['.pdf'] }
    });

    const toggleFileSelection = (id) => {
        setSelectedFiles(prev => prev.map(f => 
            f.id === id ? { ...f, selected: !f.selected } : f
        ));
    };

    const removeFile = (id, e) => {
        e.stopPropagation();
        setSelectedFiles(prev => prev.filter(f => f.id !== id));
    };

    const countSelected = selectedFiles.filter(f => f.selected).length;

    const RECOMMENDED_TOOLS = [
        { name: 'Merge Selected', icon: Combine, path: '/merge', color: '#e53935', enabled: countSelected > 1 },
        { name: 'Split PDF', icon: Split, path: '/split', color: '#ff5252', enabled: countSelected === 1 },
        { name: 'Compress PDF', icon: Plus, path: '/compress', color: '#43a047', enabled: countSelected >= 1 },
        { name: 'Organize Pages', path: '/organize-pdf', icon: LayoutGrid, color: '#42a5f5', enabled: countSelected === 1 },
    ];

    return (
        <div className="pdf-tools-wrapper min-h-screen bg-[#0a0b14]">
            <main className="pdf-tools-main max-w-7xl mx-auto px-6 py-12">
                <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                        <motion.h1 
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="text-5xl font-black text-white mb-4 tracking-tighter"
                        >
                            Select <span className="text-blue-500">Files</span>
                        </motion.h1>
                        <p className="text-slate-400 text-lg max-w-xl">
                            Upload your documents here to start. You can then choose which tool to apply to your selection.
                        </p>
                    </div>
                    
                    <div className="flex items-center gap-3 bg-slate-800/40 p-1.5 rounded-2xl border border-slate-700/50">
                        <button 
                            onClick={() => setViewMode('grid')}
                            className={`p-2 rounded-xl transition-all ${viewMode === 'grid' ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'text-slate-500 hover:text-slate-300'}`}
                        >
                            <LayoutGrid size={20} />
                        </button>
                        <button 
                            onClick={() => setViewMode('list')}
                            className={`p-2 rounded-xl transition-all ${viewMode === 'list' ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'text-slate-500 hover:text-slate-300'}`}
                        >
                            <List size={20} />
                        </button>
                    </div>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Main Upload Area */}
                    <div className="lg:col-span-3 space-y-8">
                        <div 
                            {...getRootProps()} 
                            className={`relative border-2 border-dashed rounded-[40px] p-12 transition-all duration-500 flex flex-col items-center justify-center min-h-[400px] overflow-hidden ${isDragActive ? 'border-blue-500 bg-blue-500/5 scale-[1.01]' : 'border-slate-800 bg-slate-900/20 hover:border-slate-600'}`}
                        >
                            <input {...getInputProps()} />
                            
                            <AnimatePresence mode="wait">
                                {selectedFiles.length === 0 ? (
                                    <motion.div 
                                        key="empty"
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        className="text-center"
                                    >
                                        <div className="w-24 h-24 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-8">
                                            <FileUp size={48} className="text-blue-500" />
                                        </div>
                                        <h2 className="text-3xl font-black text-white mb-3">Drop your PDFs here</h2>
                                        <p className="text-slate-500 mb-8 max-w-xs mx-auto text-sm font-medium">Click or drag and drop to start selecting files for your PDF operations.</p>
                                        <button className="px-10 py-4 bg-blue-600 hover:bg-blue-500 text-white font-black rounded-2xl shadow-xl shadow-blue-600/20 transition-all active:scale-95">
                                            Select Files
                                        </button>
                                    </motion.div>
                                ) : (
                                    <div className="w-full">
                                        <div className={`grid ${viewMode === 'grid' ? 'grid-cols-2 md:grid-cols-3 xl:grid-cols-4' : 'grid-cols-1'} gap-6`}>
                                            {selectedFiles.map((f, idx) => (
                                                <motion.div
                                                    key={f.id}
                                                    initial={{ opacity: 0, scale: 0.8 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    transition={{ delay: idx * 0.05 }}
                                                    onClick={() => toggleFileSelection(f.id)}
                                                    className={`group relative h-48 rounded-3xl p-6 border-2 transition-all cursor-pointer ${f.selected ? 'border-blue-500 bg-blue-500/10' : 'border-slate-800 bg-slate-900/40 hover:border-slate-700'}`}
                                                >
                                                    <div className="flex flex-col h-full justify-between">
                                                        <div className="flex justify-between items-start">
                                                            <div className={`p-3 rounded-2xl ${f.selected ? 'bg-blue-500 text-white' : 'bg-slate-800 text-slate-400'}`}>
                                                                <FileText size={24} />
                                                            </div>
                                                            <button 
                                                                onClick={(e) => removeFile(f.id, e)}
                                                                className="opacity-0 group-hover:opacity-100 p-2 hover:bg-red-500/20 text-slate-500 hover:text-red-500 rounded-lg transition-all"
                                                            >
                                                                <Trash2 size={16} />
                                                            </button>
                                                        </div>
                                                        <div>
                                                            <h3 className="text-white font-bold leading-tight truncate mb-1">{f.name}</h3>
                                                            <div className="flex items-center gap-2">
                                                                <span className="text-[10px] font-black text-slate-500 bg-slate-800/50 px-2 py-0.5 rounded-full">{f.size}</span>
                                                                <span className="text-[10px] font-medium text-slate-600">{f.timestamp}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    
                                                    {f.selected && (
                                                        <div className="absolute top-4 right-4 text-blue-500 bg-white rounded-full">
                                                            <CheckCircle2 size={18} fill="currentColor" className="text-white stroke-blue-500" />
                                                        </div>
                                                    )}
                                                </motion.div>
                                            ))}
                                            
                                            {/* Add More Cell */}
                                            <div className="border-2 border-dashed border-slate-800 rounded-3xl h-48 flex flex-col items-center justify-center text-slate-600 hover:border-slate-600 hover:text-slate-400 transition-all cursor-pointer">
                                                <Plus size={32} strokeWidth={1.5} />
                                                <span className="text-sm font-bold mt-2">Add Files</span>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* Sidebar / Actions Panel */}
                    <div className="space-y-6">
                        <div className="bg-slate-900/40 border border-slate-800 rounded-[32px] p-8 backdrop-blur-xl">
                            <h3 className="text-xl font-black text-white mb-6">Selection Hub</h3>
                            
                            <div className="space-y-4 mb-8">
                                <div className="flex justify-between text-sm">
                                    <span className="text-slate-500">Files Uploaded</span>
                                    <span className="text-white font-black">{selectedFiles.length}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-slate-500">Files Selected</span>
                                    <span className={`font-black ${countSelected > 0 ? 'text-blue-500' : 'text-slate-700'}`}>{countSelected}</span>
                                </div>
                                <div className="h-px bg-slate-800/50 w-full" />
                            </div>

                            <p className="text-[10px] font-black text-slate-600 tracking-widest uppercase mb-4">Recommended Actions</p>
                            
                            <div className="space-y-3">
                                {RECOMMENDED_TOOLS.map(tool => (
                                    <button
                                        key={tool.name}
                                        disabled={!tool.enabled}
                                        onClick={() => navigate(`${tool.path}?fromSelect=true`)}
                                        className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all ${tool.enabled ? 'bg-slate-800/80 hover:bg-slate-700 text-white' : 'opacity-30 cursor-not-allowed text-slate-600'}`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 rounded-xl bg-slate-900" style={{ color: tool.color }}>
                                                <tool.icon size={18} />
                                            </div>
                                            <span className="font-bold text-sm tracking-tight">{tool.name}</span>
                                        </div>
                                        <ArrowRight size={14} className={tool.enabled ? 'text-slate-500' : 'text-transparent'} />
                                    </button>
                                ))}
                            </div>

                            {countSelected > 0 && (
                                <motion.div 
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="mt-8"
                                >
                                    <button className="w-full py-4 bg-white text-black font-black rounded-2xl flex items-center justify-center gap-2 hover:scale-[1.02] shadow-xl shadow-white/5 active:scale-95 transition-all">
                                        Apply Tool to Selection
                                    </button>
                                </motion.div>
                            )}
                        </div>

                        <div className="bg-blue-600/10 border border-blue-500/20 rounded-[32px] p-6">
                            <div className="flex items-start gap-3 text-blue-400">
                                <Shield size={20} className="shrink-0" />
                                <div className="text-[11px] leading-relaxed">
                                    <p className="font-black uppercase tracking-wider mb-1">Privacy Guarantee</p>
                                    Your files stay on your machine. Selection and local processing are encrypted and 100% private.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-32">
                    <div className="flex items-center gap-12 text-slate-700 opacity-30 grayscale saturate-0 overflow-hidden whitespace-nowrap">
                        {[...Array(5)].map((_, i) => (
                            <div key={i} className="flex items-center gap-4 text-2xl font-black">
                                <FileText size={32} />
                                <span>PDF ENGINE PRO</span>
                                <div className="w-32 h-px bg-slate-700" />
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default PDFSelectDashboard;
