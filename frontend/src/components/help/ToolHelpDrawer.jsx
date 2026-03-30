import React, { Suspense, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, BookOpen, Lightbulb, Info, FileText, Settings, PlayCircle, HelpCircle } from 'lucide-react';
import './ToolHelpDrawer.css';

// Lazy load help content files
const HelpRegistry = {
    'MP4 to AVI': React.lazy(() => import('./content/MP4ToAVIHelp')),
    'Merge PDF': React.lazy(() => import('./content/MergePDFHelp')),
    'Compress PDF': React.lazy(() => import('./content/CompressPDFHelp')),
    'Split PDF': React.lazy(() => import('./content/SplitPDFHelp')),
    'Remove Pages': React.lazy(() => import('./content/RemovePagesHelp')),
};

const ToolHelpDrawer = ({ isOpen, onClose, toolName, toolCategory, color }) => {
    
    const HelpContent = useMemo(() => {
        // Find matching help component or return a default one
        const LazyComp = HelpRegistry[toolName];
        if (LazyComp) return LazyComp;
        return null;
    }, [toolName]);

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div 
                        className="help-drawer-backdrop"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                    />

                    {/* Drawer */}
                    <motion.div 
                        className="aura-help-drawer"
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                    >
                        <div className="help-drawer-header" style={{ borderColor: `${color}20` }}>
                            <div className="help-header-title">
                                <div className="help-icon-pill" style={{ backgroundColor: `${color}15`, color: color }}>
                                    <BookOpen size={18} />
                                </div>
                                <div>
                                    <h3>Guide & Documentation</h3>
                                    <span className="help-subtitle">{toolName} • {toolCategory}</span>
                                </div>
                            </div>
                            <button className="help-close-btn" onClick={onClose}>
                                <X size={20} />
                            </button>
                        </div>

                        <div className="help-drawer-body">
                            <Suspense fallback={<div className="help-loading">Loading guide...</div>}>
                                {HelpContent ? (
                                    <HelpContent color={color} />
                                ) : (
                                    <div className="default-help-content">
                                        <div className="empty-help-state">
                                            <HelpCircle size={48} strokeWidth={1} />
                                            <h4>Generic Guide for {toolName}</h4>
                                            <p>Our team is currently crafting a detailed guide for this specific tool. Here are the general steps to get started:</p>
                                        </div>
                                        
                                        <div className="help-section">
                                            <div className="section-title">
                                                <PlayCircle size={16} /> <span>How to Use</span>
                                            </div>
                                            <ul className="help-steps">
                                                <li><strong>Upload:</strong> Drag and drop your files onto the workspace or click the upload area.</li>
                                                <li><strong>Configure:</strong> Adjust any settings or parameters shown in the second step.</li>
                                                <li><strong>Process:</strong> Click the primary action button to start the {toolCategory.toLowerCase()} engine.</li>
                                                <li><strong>Download:</strong> Once finished, your processed file will be available for instant download.</li>
                                            </ul>
                                        </div>

                                        <div className="help-section tip">
                                            <div className="section-title" style={{ color: '#fbbf24' }}>
                                                <Lightbulb size={16} /> <span>Pro Tip</span>
                                            </div>
                                            <p>You can access advanced tool-specific settings by clicking the <Settings size={12} style={{ display: 'inline', verticalAlign: 'middle' }} /> icon in the top right corner.</p>
                                        </div>
                                    </div>
                                )}
                            </Suspense>
                        </div>

                        <div className="help-drawer-footer">
                            <div className="help-footer-badge">
                                <Info size={14} />
                                <span>Part of Aura Platform Documentation</span>
                            </div>
                            <button className="help-feedback-btn">
                                Feedback?
                            </button>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default ToolHelpDrawer;
