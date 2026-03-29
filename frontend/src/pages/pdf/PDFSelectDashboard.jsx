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
import ToolLayout from '../../components/layouts/ToolLayout';

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
        <ToolLayout 
            title="Select Files" 
            subtitle="Upload your documents here to start. You can then choose which tool to apply to your selection." 
            icon={FileText} 
            color="#3b82f6"
            category="Document Intelligence"
        >
                <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div />
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

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
                    {/* Main Upload Area */}
                    <div className="lg:col-span-3">
                        <div 
                            {...getRootProps()} 
                            className={`tool-upload-center min-h-[500px] transition-all duration-500 ${isDragActive ? 'border-blue-500 bg-blue-500/5 scale-[1.01]' : ''}`}
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
                                        <div className="w-24 h-24 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-8 border border-blue-500/20 shadow-lg shadow-blue-500/10">
                                            <FileUp size={48} className="text-blue-500" />
                                        </div>
                                        <h2 className="text-4xl font-black text-white mb-4 tracking-tighter">Drop your PDFs here</h2>
                                        <p className="text-slate-500 mb-10 max-w-sm mx-auto text-lg font-medium opacity-60">Click or drag and drop to start selecting files for your PDF operations.</p>
                                        <button className="btn-premium-aura" style={{ backgroundColor: '#2563eb' }}>
                                            Select Files
                                        </button>
                                    </motion.div>
                                ) : (
                                    <div className="w-full">
                                        <div className={`grid ${viewMode === 'grid' ? 'grid-cols-2 md:grid-cols-3 xl:grid-cols-4' : 'grid-cols-1'} gap-8`}>
                                            {selectedFiles.map((f, idx) => (
                                                <motion.div
                                                    key={f.id}
                                                    initial={{ opacity: 0, scale: 0.8 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    transition={{ delay: idx * 0.05 }}
                                                    onClick={() => toggleFileSelection(f.id)}
                                                    className={`group relative h-56 rounded-[32px] p-8 border transition-all cursor-pointer backdrop-blur-xl ${f.selected ? 'border-blue-500 bg-blue-500/10 shadow-2xl shadow-blue-900/20' : 'border-white/5 bg-white/[0.02] hover:border-white/10 hover:bg-white/[0.04]'}`}
                                                >
                                                    <div className="flex flex-col h-full justify-between relative z-10">
                                                        <div className="flex justify-between items-start">
                                                            <div className={`p-4 rounded-2xl transition-all duration-500 ${f.selected ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/30 rotate-6' : 'bg-white/5 text-slate-400'}`}>
                                                                <FileText size={28} />
                                                            </div>
                                                            <button 
                                                                onClick={(e) => removeFile(f.id, e)}
                                                                className="opacity-0 group-hover:opacity-100 p-2.5 hover:bg-red-500/20 text-slate-500 hover:text-red-500 rounded-xl transition-all"
                                                            >
                                                                <Trash2 size={20} />
                                                            </button>
                                                        </div>
                                                        <div>
                                                            <h3 className="text-white text-lg font-black leading-tight truncate mb-2">{f.name}</h3>
                                                            <div className="flex items-center gap-3">
                                                                <span className="text-[10px] font-black text-blue-400 bg-blue-500/10 border border-blue-500/20 px-3 py-1 rounded-full">{f.size}</span>
                                                                <span className="text-[10px] font-bold text-slate-500">{f.timestamp}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    
                                                    {f.selected && (
                                                        <motion.div 
                                                            initial={{ scale: 0 }}
                                                            animate={{ scale: 1 }}
                                                            className="absolute top-6 right-6 text-blue-500 bg-white rounded-full z-20"
                                                        >
                                                            <CheckCircle2 size={24} fill="currentColor" className="text-white stroke-blue-500" />
                                                        </motion.div>
                                                    )}
                                                </motion.div>
                                            ))}
                                            
                                            {/* Add More Cell */}
                                            <div className="border-2 border-dashed border-white/5 rounded-[32px] h-56 flex flex-col items-center justify-center text-slate-600 hover:border-white/20 hover:text-slate-300 transition-all cursor-pointer bg-white/[0.01]">
                                                <div className="p-4 rounded-2xl bg-white/5 mb-4 group-hover:scale-110 transition-transform">
                                                    <Plus size={32} strokeWidth={2} />
                                                </div>
                                                <span className="text-sm font-black uppercase tracking-widest">Add Files</span>
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
        </ToolLayout>
    );
};

export default PDFSelectDashboard;
