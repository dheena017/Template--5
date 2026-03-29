import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import './MergingStep.css';

const MergingStep = ({ progress }) => {
    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="merging-step-wrapper"
        >
            <div className="merging-animation-container">
                <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    className="spinner-outer"
                />
                <div className="spinner-inner">
                    <Sparkles className="w-12 h-12 text-red-500 animate-pulse" />
                </div>
            </div>
            
            <h3 className="merging-status-label">Merging Together</h3>
            <p className="merging-description">Creating your final document. Hang tight!</p>
            
            <div className="w-full max-w-sm">
                <div className="progress-track">
                    <motion.div 
                        className="progress-bar-fill"
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                    />
                </div>
                <div className="text-center">
                    <span className="progress-percentage">{progress}%</span>
                </div>
            </div>
        </motion.div>
    );
};

export default MergingStep;
