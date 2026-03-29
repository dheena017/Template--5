import React from 'react';
import { motion, Reorder } from 'framer-motion';
import { GripVertical, Plus, Trash2, Combine, ArrowRight, FileText } from 'lucide-react';
import Button from '../../../components/Button';
import './ReorderStep.css';

const ReorderStep = ({ selectedFiles, setSelectedFiles, activeTool, getRootProps, getInputProps, removeFile, handleExecuteMerge, formatSize }) => {
    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="w-full max-w-4xl"
        >
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/5">
                <div>
                    <h3 className="text-2xl font-black text-white">Arrange PDFs</h3>
                    <p className="text-slate-400 font-medium tracking-tight">Drag to set the order of your final document.</p>
                </div>
                <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <Button variant="secondary" size="sm" className="flex items-center gap-2">
                        <Plus size={18} /> Add More
                    </Button>
                </div>
            </div>

            <Reorder.Group axis="y" values={selectedFiles} onReorder={setSelectedFiles} className="reorder-list">
                {selectedFiles.map((file) => (
                    <Reorder.Item key={file.id} value={file} className="reorder-item-motion">
                        <div className="reorder-item-content">
                            <div className="drag-handle"><GripVertical size={20} /></div>
                            <div className="flex-1 flex items-center gap-6 overflow-hidden">
                                <div className="file-thumbnail-mini flex-shrink-0">
                                    {file.pages[0]?.thumbnail ? (
                                        <img src={file.pages[0].thumbnail} className="w-full h-full object-cover" />
                                    ) : <FileText size={20} className="text-red-500" />}
                                </div>
                                <div className="file-info-header">
                                    <span className="file-name">{file.name}</span>
                                    <div className="file-metadata">
                                        <span className="page-count-badge">
                                            {file.pages.length} Pages
                                        </span>
                                        <span className="file-size-text">{formatSize(file.size)}</span>
                                    </div>
                                </div>
                            </div>
                            <button 
                                onClick={() => removeFile(file.id)}
                                className="remove-file-btn"
                            >
                                <Trash2 size={20} />
                            </button>
                        </div>
                    </Reorder.Item>
                ))}
            </Reorder.Group>

            <div className="mt-12 flex justify-center">
                <Button 
                    onClick={handleExecuteMerge}
                    className="group"
                    style={{ backgroundColor: activeTool.color, width: '100%', maxWidth: '440px', height: '64px' }}
                >
                    <span className="flex items-center gap-3">
                        <Combine size={24} />
                        <span className="text-xl font-black tracking-tight">Combine All Documents</span>
                        <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                    </span>
                </Button>
            </div>
        </motion.div>
    );
};

export default ReorderStep;
