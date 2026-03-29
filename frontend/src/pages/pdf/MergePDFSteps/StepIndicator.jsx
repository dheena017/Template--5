import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

const StepIndicator = ({ steps, currentStep }) => {
    return (
        <div className="flex items-center justify-center mb-12 gap-4 sm:gap-8 px-4 overflow-x-auto pb-4">
            {steps.map((step, idx) => {
                const stepIdx = steps.findIndex(s => s.id === (['merging', 'processing'].includes(currentStep) ? 'merge' : currentStep));
                const isCompleted = steps.findIndex(s => s.id === step.id) < stepIdx;
                const isActive = step.id === (['merging', 'processing'].includes(currentStep) ? 'merge' : currentStep);

                return (
                    <React.Fragment key={step.id}>
                        <div className="flex flex-col items-center min-w-[100px]">
                            <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center transition-all duration-500 ${
                                isActive ? 'bg-red-600 shadow-[0_0_20px_rgba(229,57,53,0.5)] border-2 border-red-400' : 
                                isCompleted ? 'bg-green-500' : 'bg-slate-800 border border-slate-700'
                            }`}>
                                {isCompleted ? <Check size={24} className="text-white" /> : <step.icon size={22} className={isActive ? 'text-white' : 'text-slate-500'} />}
                            </div>
                            <span className={`text-[11px] sm:text-sm mt-4 font-bold uppercase tracking-wider transition-colors duration-300 ${isActive ? 'text-white' : 'text-slate-500'}`}>
                                {step.label}
                            </span>
                        </div>
                        {idx < steps.length - 1 && (
                            <div className="w-12 sm:w-24 h-[2px] bg-slate-800 mb-8 sm:mb-10">
                                <motion.div 
                                    className="h-full bg-red-600"
                                    initial={{ width: 0 }}
                                    animate={{ width: isCompleted ? '100%' : '0%' }}
                                    transition={{ duration: 0.5 }}
                                />
                            </div>
                        )}
                    </React.Fragment>
                );
            })}
        </div>
    );
};

export default StepIndicator;
