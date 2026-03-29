import React from 'react';
import { motion, Reorder, AnimatePresence } from 'framer-motion';
import { 
    Trash2, Plus, FileText, ChevronLeft, 
    GripVertical, Image as ImageIcon, Sparkles, Download
} from 'lucide-react';
import Button from '../../../components/Button';

const PreviewStep = ({ 
    selectedFiles, setSelectedFiles, removeFile, 
    handleExecute, isProcessing, activeTool, reset, getRootProps, getInputProps 
}) => {
    return (
        <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="preview-step-container w-full"
        >
            <div className="flex flex-col gap-8">
                {/* Header Action Bar */}
                <div className="bg-slate-900/60 backdrop-blur-3xl border border-white/5 rounded-[40px] p-8 shadow-3xl flex flex-wrap items-center justify-between gap-6 transition-all">
                    <div className="flex items-center gap-6">
                        <button 
                            onClick={reset}
                            className="w-14 h-14 rounded-2xl bg-slate-800/80 flex items-center justify-center text-slate-400 hover:text-white transition-all shadow-lg active:scale-90"
                        >
                            <ChevronLeft size={28} />
                        </button>
                        <div>
                            <h2 className="text-3xl font-black text-white tracking-tight">Capture Workspace</h2>
                            <p className="text-pink-500/60 text-xs font-black uppercase tracking-[0.3em] mt-1">
                                {selectedFiles.length} Images Ready for PDF
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-6">
                        <div {...getRootProps()}>
                            <input {...getInputProps()} />
                            <button className="h-14 px-8 flex items-center gap-3 bg-white/5 hover:bg-white/10 text-white font-black text-xs uppercase tracking-widest rounded-2xl border border-white/10 transition-all active:scale-95 shadow-xl">
                                <Plus size={20} /> Add More
                            </button>
                        </div>

                        <Button 
                            onClick={handleExecute} 
                            disabled={isProcessing || selectedFiles.length === 0}
                            className="h-20 px-14 rounded-[28px] font-black text-white tracking-widest uppercase transition-all shadow-2xl active:scale-95 disabled:grayscale"
                            style={{ backgroundColor: activeTool.color }}
                        >
                            {isProcessing ? <Sparkles className="animate-spin" size={24} /> : <FileText size={24} />}
                            <span className="ml-4">Generate PDF</span>
                        </Button>
                    </div>
                </div>

                {/* Sorting/Managing Area */}
                <div className="workspace-grid-container min-h-[600px] border-4 border-dashed border-slate-700/30 rounded-[64px] p-12 bg-slate-900/20 backdrop-blur-xl group relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 to-transparent pointer-events-none group-hover:opacity-100 transition-opacity" />
                    
                    <Reorder.Group 
                        axis="y" 
                        values={selectedFiles} 
                        onReorder={setSelectedFiles} 
                        className="grid gap-12 justify-center"
                        style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))' }}
                    >
                        {selectedFiles.map((file, idx) => (
                            <Reorder.Item 
                                key={file.id} 
                                value={file}
                                className="relative group/item cursor-grab active:cursor-grabbing"
                                whileHover={{ y: -10, scale: 1.02 }}
                                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                            >
                                <div className="page-surface relative aspect-[3/4] bg-slate-800 rounded-[32px] overflow-hidden border-[6px] border-transparent group-hover/item:border-pink-500/40 transition-all shadow-[0_40px_80px_-20px_rgba(0,0,0,0.6)] duration-500">
                                    <img 
                                        src={URL.createObjectURL(file)} 
                                        alt="captured scan" 
                                        className="w-full h-full object-cover pointer-events-none transition-transform duration-700 group-hover/item:scale-105" 
                                    />
                                    
                                    {/* Action Overlays */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-0 group-hover/item:opacity-100 transition-all duration-300 flex flex-col justify-end p-6">
                                        <div className="flex justify-between items-center">
                                            <div className="px-4 py-2 bg-pink-500 text-white font-black text-xs tracking-widest rounded-xl shadow-2xl">
                                                PAGE {idx + 1}
                                            </div>
                                            <button 
                                                onClick={(e) => { e.stopPropagation(); removeFile(file.id); }} 
                                                className="w-12 h-12 bg-white/10 hover:bg-rose-600 text-white rounded-2xl backdrop-blur-md flex items-center justify-center transition-all active:scale-90"
                                                title="Delete Capture"
                                            >
                                                <Trash2 size={24} />
                                            </button>
                                        </div>
                                    </div>

                                    {/* Grip Handle */}
                                    <div className="absolute top-6 left-6 p-2 bg-black/40 backdrop-blur-sm rounded-xl opacity-0 group-hover/item:opacity-100 transition-opacity text-white">
                                        <GripVertical size={20} />
                                    </div>
                                    
                                    {/* Index Badge (Constant) */}
                                    <div className="absolute top-6 right-6 w-10 h-10 bg-black/40 backdrop-blur-sm rounded-xl flex items-center justify-center text-white font-black group-hover/item:scale-0 transition-all duration-500">
                                        {idx + 1}
                                    </div>
                                </div>
                            </Reorder.Item>
                        ))}
                    </Reorder.Group>
                </div>

                <div className="bg-pink-500/5 border border-pink-500/20 rounded-[32px] p-10 flex items-start gap-8 backdrop-blur-md">
                    <div className="w-16 h-16 bg-pink-500/10 rounded-3xl flex items-center justify-center text-pink-500 shrink-0 shadow-2xl">
                        <ImageIcon size={32} />
                    </div>
                    <div>
                        <h4 className="text-2xl font-black text-pink-100 mb-2 tracking-tight">Optimization Engine Active</h4>
                        <p className="text-pink-100/40 font-medium text-lg leading-relaxed">
                            Images will be automatically scaled to standard document sizes while maintaining extreme clarity. 
                            Drag images to reorder them in your final PDF document.
                        </p>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default PreviewStep;
