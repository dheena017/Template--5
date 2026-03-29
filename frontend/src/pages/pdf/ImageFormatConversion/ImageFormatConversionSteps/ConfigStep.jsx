import React from 'react';
import { motion } from 'framer-motion';
import { Image, Settings2, Loader2, ImageIcon, HardDrive, Zap } from 'lucide-react';
import Button from '../../../../components/Button';
import './ConfigStep.css';
import './ImageCard.css';

const ConfigStep = ({
    fileInfo,
    fromFormat,
    toFormat,
    quality,
    setQuality,
    handleConvert,
    isProcessing,
    progress,
    reset,
    activeTool
}) => {
    return (
        <motion.div 
            key="config"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="config-step-container w-full max-w-4xl mx-auto image-conversion-card"
        >
            <div className="p-0">
                {/* File Info Header */}
                <div className="image-file-card-header">
                    <div className="image-icon-container">
                        <div className="image-icon-glow" style={{ backgroundColor: activeTool.color }} />
                        <Image size={30} style={{ color: activeTool.color }} className="z-10" />
                    </div>
                    <div className="flex-1 min-w-0 flex flex-col gap-1">
                        <h2 className="text-xl font-black text-white truncate" title={fileInfo.name}>{fileInfo.name}</h2>
                        <div className="flex items-center gap-3">
                            <span className="image-meta-badge">{fileInfo.size}</span>
                            <span className="image-meta-badge" style={{ color: activeTool.color }}>{fromFormat} VIDEO</span>
                        </div>
                    </div>
                    <button onClick={reset} className="text-slate-400 hover:text-white px-5 py-2 hover:bg-white/5 border border-transparent hover:border-white/10 rounded-xl transition-all text-sm font-bold shadow-sm flex items-center gap-2">
                        Change File
                    </button>
                </div>

                {/* Settings Block */}
                <div className="mb-10 block">
                    <h3 className="text-white font-bold mb-6 opacity-70 uppercase tracking-widest text-xs flex items-center gap-2">
                        <Settings2 size={16} /> Output Quality Settings
                    </h3>
                    <div className="quality-card-grid">
                        {[
                            { id: 'high', label: 'Maximum Quality', desc: 'Preserves native resolution', icon: Zap },
                            { id: 'medium', label: 'Balanced', desc: 'Optimal size and quality', icon: Settings2 },
                            { id: 'low', label: 'Small File', desc: 'Max compression for web', icon: HardDrive },
                        ].map(level => (
                            <button 
                                key={level.id}
                                onClick={() => setQuality(level.id)}
                                className={`quality-option-card ${quality === level.id ? 'active' : ''}`}
                                style={{ 
                                    borderColor: quality === level.id ? activeTool.color : 'rgba(255,255,255,0.05)',
                                    backgroundColor: quality === level.id ? `${activeTool.color}15` : '' 
                                }}
                            >
                                <div className="icon-circle" style={{ backgroundColor: quality === level.id ? activeTool.color : '' }}>
                                    <level.icon size={20} style={{ color: quality === level.id ? '#fff' : '#94a3b8' }} />
                                </div>
                                <span className={`text-base font-black tracking-tight ${quality === level.id ? 'text-white' : 'text-slate-300'}`}>{level.label}</span>
                                <p className={`text-sm font-medium ${quality === level.id ? 'text-slate-200' : 'text-slate-500'}`}>{level.desc}</p>
                            </button>
                        ))}
                    </div>
                </div>

                <Button 
                    onClick={handleConvert}
                    disabled={isProcessing}
                    variant="primary"
                    className="w-full btn-premium-aura shadow-xl flex items-center justify-center"
                    style={{ backgroundColor: activeTool.color, marginTop: '24px', padding: '20px 0', fontSize: '1.25rem' }}
                >
                    {isProcessing ? (
                        <div className="w-full relative z-10">
                            <div className="flex items-center justify-between mb-2 px-1">
                                <span className="flex items-center gap-2 text-white font-bold">
                                    <Loader2 className="animate-spin" size={20} />
                                    Converting...
                                </span>
                                <span className="text-white font-black">{progress}%</span>
                            </div>
                            <div className="image-progress-bar-bg">
                                <div className="image-progress-bar-fill" style={{ width: `${progress}%` }} />
                            </div>
                        </div>
                    ) : (
                        <span className="flex items-center gap-4 w-full justify-center relative z-10">
                            <ImageIcon size={28} />
                            Convert to {toFormat}
                        </span>
                    )}
                </Button>
            </div>
        </motion.div>
    );
};

export default ConfigStep;
