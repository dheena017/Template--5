import React, { useState, useCallback } from 'react';
import { PenTool, FileUp, Settings2, Download, FileText, Loader2 } from 'lucide-react';
import { useDropzone } from 'react-dropzone';
import { AnimatePresence } from 'framer-motion';
import { PDFDocument, rgb } from 'pdf-lib';

import ToolLayout from '../../../components/layouts/ToolLayout';
import StepIndicator from '../MergePDFSteps/StepIndicator';
import SelectStep from './EditPDFSteps/SelectStep';
import ConfigStep from './EditPDFSteps/ConfigStep';
import ResultStep from './EditPDFSteps/ResultStep';

const EditPDFTool = ({ toolName, icon: ToolIcon, description }) => {
    const [currentStep, setCurrentStep] = useState('select'); // 'select', 'config', 'download'
    const [fileInfo, setFileInfo] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [progress, setProgress] = useState(0);
    const [resultData, setResultData] = useState(null);
    const [customization, setCustomization] = useState({ 
        text: 'Confidential', 
        color: '#f59e0b', 
        size: 48, 
        position: 'center',
        font: 'Inter',
        opacity: 100
    });

    const activeTool = { 
        name: toolName, 
        icon: ToolIcon || PenTool, 
        color: '#f59e0b',
        subtitle: description || `Professional ${toolName} tools running safely in your browser.`,
        category: 'Edit PDF'
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
                type: file.type || 'application/pdf',
                rawFile: file,
                url: URL.createObjectURL(file)
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

    const handleProcess = async () => {
        if (!fileInfo) return;
        setIsProcessing(true);
        setProgress(0);
        try {
            // Simulated processing
            for(let i = 1; i <= 100; i += Math.floor(Math.random() * 15) + 5) {
                setProgress(Math.min(i, 100));
                await new Promise(r => setTimeout(r, 100));
            }
            setProgress(100);
            await new Promise(r => setTimeout(r, 300));
            
            // Transform PDF with actual pdf-lib engine
            const arrayBuffer = await fileInfo.rawFile.arrayBuffer();
            const pdfDoc = await PDFDocument.load(arrayBuffer);
            
            if (['Add Watermark', 'Add Page Numbers', 'Edit PDF'].includes(activeTool.name) && customization.text) {
                const pages = pdfDoc.getPages();
                
                // Convert Hex to RGB
                const hex = customization.color || '#f59e0b';
                const textColor = rgb(
                    parseInt(hex.slice(1, 3), 16) / 255,
                    parseInt(hex.slice(3, 5), 16) / 255,
                    parseInt(hex.slice(5, 7), 16) / 255
                );
                
                pages.forEach((page) => {
                    const { width, height } = page.getSize();
                    const textWidth = customization.size * (customization.text.length * 0.5); // Approx calc
                    
                    let x = 50;
                    let y = 50;
                    
                    if (customization.position === 'center') {
                        x = (width / 2) - (textWidth / 2);
                        y = height / 2;
                    } else if (customization.position === 'top-left') {
                        x = 50; y = height - 50 - customization.size;
                    } else if (customization.position === 'top-right') {
                        x = width - textWidth - 50; y = height - 50 - customization.size;
                    } else if (customization.position === 'bottom-left') {
                        x = 50; y = 50;
                    } else if (customization.position === 'bottom-right') {
                        x = width - textWidth - 50; y = 50;
                    }

                    page.drawText(customization.text, {
                        x, y,
                        size: customization.size,
                        color: textColor,
                        opacity: (customization.opacity || 100) / 100
                    });
                });
            }
            
            // If Rotate PDF, rotate all pages
            if (activeTool.name === 'Rotate PDF') {
                const pages = pdfDoc.getPages();
                pages.forEach(page => page.setRotation(page.getRotation().angle + 90));
            }

            const pdfBytes = await pdfDoc.save();
            const blob = new Blob([pdfBytes], { type: 'application/pdf' });
            
            setResultData({
                url: URL.createObjectURL(blob),
                name: fileInfo.name.replace(/\.[^/.]+$/, "") + `_${toolName.replace(/\s+/g,'_')}.pdf`,
                size: (blob.size / (1024 * 1024)).toFixed(2) + ' MB'
            });
            setCurrentStep('download');

        } catch (error) {
            console.error(error);
            alert("Processing failed.");
            setCurrentStep('config');
        } finally {
            setIsProcessing(false);
        }
    };

    const reset = () => {
        setFileInfo(null);
        setResultData(null);
        setProgress(0);
        setCurrentStep('select');
    };

    const renderCurrentStep = () => {
        switch (currentStep) {
            case 'select':
                return <SelectStep {...{ getRootProps, getInputProps, isDragActive, activeTool }} />;
            case 'config':
                return <ConfigStep {...{ fileInfo, handleProcess, isProcessing, progress, reset, activeTool, customization, setCustomization }} />;
            case 'download':
                return <ResultStep {...{ resultData, activeTool, reset }} />;
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

export default EditPDFTool;
