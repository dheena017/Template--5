import React, { useState, useCallback } from 'react';
import { Image as ImageIcon, FileUp, Settings2, Download, PlayCircle, Loader2 } from 'lucide-react';
import { useDropzone } from 'react-dropzone';
import { AnimatePresence } from 'framer-motion';
import { PDFDocument } from 'pdf-lib';

import ToolLayout from '../../../components/layouts/ToolLayout';
import StepIndicator from '../MergePDFSteps/StepIndicator';
import SelectStep from './ImageToPDFSteps/SelectStep';
import ConfigStep from './ImageToPDFSteps/ConfigStep';
import ResultStep from './ImageToPDFSteps/ResultStep';

const ImageToPDFTool = ({ fromFormat, isBatch = false }) => {
    const [currentStep, setCurrentStep] = useState('select');
    const [fileInfo, setFileInfo] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [progress, setProgress] = useState(0);
    const [resultData, setResultData] = useState(null);
    const [quality, setQuality] = useState('high');

    const activeTool = { 
        name: isBatch ? `Batch ${fromFormat} to PDF` : `${fromFormat} to PDF`, 
        icon: ImageIcon, 
        color: '#fbbf24',
        subtitle: `Convert your ${fromFormat} images to PDF rapidly while preserving image quality.`,
        category: 'Document Conversion'
    };

    const STEPS = [
        { id: 'select', label: `Upload ${fromFormat}`, icon: FileUp },
        { id: 'config', label: 'Settings', icon: Settings2 },
        { id: 'download', label: 'Download', icon: Download }
    ];

    const getFormatConfig = (fmt) => {
        const fmts = {
            'JPG': { mime: 'image/jpeg', ext: '.jpg' },
            'PNG': { mime: 'image/png', ext: '.png' },
            'Image': { mime: 'image/*', ext: '.img' }
        };
        return fmts[fmt] || { mime: 'image/*', ext: '.img' };
    };

    const onDrop = useCallback(async (acceptedFiles) => {
        if (acceptedFiles.length > 0) {
            const firstFile = acceptedFiles[0];
            setFileInfo({
                name: acceptedFiles.length > 1 ? `${acceptedFiles.length} Images Selected` : firstFile.name,
                size: (acceptedFiles.reduce((acc, f) => acc + f.size, 0) / (1024 * 1024)).toFixed(2) + ' MB',
                type: 'application/pdf',
                rawFiles: acceptedFiles
            });
            setResultData(null);
            setProgress(0);
            setCurrentStep('config');
        }
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { 'image/*': ['.jpg', '.jpeg', '.png', '.webp', '.svg'] },
        multiple: isBatch
    });

    const handleConvert = async () => {
        if (!fileInfo) return;
        setIsProcessing(true);
        setProgress(0);
        try {
            for(let i = 1; i <= 100; i += Math.floor(Math.random() * 20) + 10) {
                setProgress(Math.min(i, 100));
                await new Promise(r => setTimeout(r, 120));
            }
            setProgress(100);
            await new Promise(r => setTimeout(r, 400));
            
            const pdfDoc = await PDFDocument.create();
            for (const file of fileInfo.rawFiles) {
                const arrayBuffer = await file.arrayBuffer();
                let image;
                if (file.type === 'image/jpeg' || file.type === 'image/jpg') {
                    image = await pdfDoc.embedJpg(arrayBuffer);
                } else if (file.type === 'image/png') {
                    image = await pdfDoc.embedPng(arrayBuffer);
                } else {
                    continue; // Skip unsupported format for now
                }
                const page = pdfDoc.addPage([image.width, image.height]);
                page.drawImage(image, { x: 0, y: 0, width: image.width, height: image.height });
            }
            const pdfBytes = await pdfDoc.save();
            const blob = new Blob([pdfBytes], { type: 'application/pdf' });
            
            setResultData({
                url: URL.createObjectURL(blob),
                name: isBatch ? "Conversions.pdf" : fileInfo.name.replace(/\.[^/.]+$/, "") + ".pdf",
                size: (blob.size / (1024 * 1024)).toFixed(2) + ' MB'
            });
            setCurrentStep('download');

        } catch (error) {
            console.error(error);
            alert("Conversion failed.");
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
                return <SelectStep {...{ getRootProps, getInputProps, isDragActive, activeTool, fromFormat, toFormat: 'PDF' }} />;
            case 'config':
                return <ConfigStep {...{ fileInfo, fromFormat, toFormat: 'PDF', quality, setQuality, handleConvert, isProcessing, progress, reset, activeTool }} />;
            case 'download':
                return <ResultStep {...{ resultData, fromFormat, toFormat: 'PDF', activeTool, reset }} />;
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

export default ImageToPDFTool;
