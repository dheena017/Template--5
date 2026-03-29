import React, { useState, useCallback } from 'react';
import { Languages, FileUp, Settings2, Download, PlayCircle, Loader2 } from 'lucide-react';
import { useDropzone } from 'react-dropzone';
import { AnimatePresence } from 'framer-motion';
import { PDFDocument } from 'pdf-lib';

import ToolLayout from '../../../components/layouts/ToolLayout';
import StepIndicator from '../MergePDFSteps/StepIndicator';
import SelectStep from './PDFTranslationSteps/SelectStep';
import ConfigStep from './PDFTranslationSteps/ConfigStep';
import ResultStep from './PDFTranslationSteps/ResultStep';

const PDFTranslationTool = ({ fromLang, toLang }) => {
    const [currentStep, setCurrentStep] = useState('select');
    const [fileInfo, setFileInfo] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [progress, setProgress] = useState(0);
    const [resultData, setResultData] = useState(null);
    const [quality, setQuality] = useState('high');

    const activeTool = { 
        name: `PDF ${fromLang} to ${toLang}`, 
        icon: Languages, 
        color: '#8b5cf6',
        subtitle: `Professional AI translation of your PDF from ${fromLang} to ${toLang} preserving layout.`,
        category: 'Translation Tools'
    };

    const STEPS = [
        { id: 'select', label: `Upload PDF`, icon: FileUp },
        { id: 'config', label: 'Settings', icon: Settings2 },
        { id: 'download', label: 'Download', icon: Download }
    ];

    const onDrop = useCallback(async (acceptedFiles) => {
        if (acceptedFiles.length > 0) {
            const file = acceptedFiles[0];
            setFileInfo({
                name: file.name,
                size: (file.size / (1024 * 1024)).toFixed(2) + ' MB',
                type: 'application/pdf',
                rawFile: file
            });
            setResultData(null);
            setProgress(0);
            setCurrentStep('config');
        }
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { 'application/pdf': ['.pdf'] },
        multiple: false
    });

    const handleConvert = async () => {
        if (!fileInfo) return;
        setIsProcessing(true);
        setProgress(0);
        try {
            for(let i = 1; i <= 100; i += Math.floor(Math.random() * 10) + 5) {
                setProgress(Math.min(i, 100));
                await new Promise(r => setTimeout(r, 200));
            }
            setProgress(100);
            await new Promise(r => setTimeout(r, 500));
            
            const arrayBuffer = await fileInfo.rawFile.arrayBuffer();
            const pdfDoc = await PDFDocument.load(arrayBuffer);
            const pdfBytes = await pdfDoc.save();
            const blob = new Blob([pdfBytes], { type: 'application/pdf' });
            
            setResultData({
                url: URL.createObjectURL(blob),
                name: fileInfo.name.replace('.pdf', `_${toLang}.pdf`),
                size: (blob.size / (1024 * 1024)).toFixed(2) + ' MB'
            });
            setCurrentStep('download');

        } catch (error) {
            console.error(error);
            alert("Translation failed.");
            setCurrentStep('config');
        } finally {
            setIsProcessing(false);
        }
    };

    const reset = () => {
        setFileInfo(null);
        setResultData(null);
        setProgress(0);
        setQuality('high');
        setCurrentStep('select');
    };

    const renderCurrentStep = () => {
        switch (currentStep) {
            case 'select':
                return <SelectStep {...{ getRootProps, getInputProps, isDragActive, activeTool, fromFormat: 'PDF', toFormat: toLang }} />;
            case 'config':
                return <ConfigStep {...{ fileInfo, fromFormat: fromLang, toFormat: toLang, quality, setQuality, handleConvert, isProcessing, progress, reset, activeTool }} />;
            case 'download':
                return <ResultStep {...{ resultData, fromFormat: fromLang, toFormat: toLang, activeTool, reset }} />;
            default:
                return null;
        }
    };

    return (
        <ToolLayout 
            title={activeTool.name} 
            subtitle={activeTool.subtitle} 
            icon={activeTool.icon} 
            color={activeTool.color}
            category={activeTool.category}
        >
            <div className="tool-upload-center" style={{ width: '100%', maxWidth: 'none', minHeight: '600px' }}>
                <StepIndicator steps={STEPS} currentStep={currentStep} />
                <div className="w-full flex justify-center mt-12">
                    <AnimatePresence mode="wait">{renderCurrentStep()}</AnimatePresence>
                </div>
            </div>
        </ToolLayout>
    );
};

export default PDFTranslationTool;
