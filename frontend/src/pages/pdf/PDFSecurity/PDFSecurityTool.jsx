import React, { useState, useCallback } from 'react';
import { Lock, FileUp, Settings2, Download, FileText, Loader2 } from 'lucide-react';
import { useDropzone } from 'react-dropzone';
import { AnimatePresence } from 'framer-motion';
import { PDFDocument } from 'pdf-lib';

import ToolLayout from '../../../components/layouts/ToolLayout';
import StepIndicator from '../MergePDFSteps/StepIndicator';
import SelectStep from './SecuritySteps/SelectStep';
import ConfigStep from './SecuritySteps/ConfigStep';
import ResultStep from './SecuritySteps/ResultStep';
import SecuritySettingsHub from './SecuritySteps/SecuritySettingsHub';
import { useSettings } from '../../../context/SettingsContext';
import { api } from '../../../services/api';

const PDFSecurityTool = ({ toolName, icon: ToolIcon, description }) => {
    const [currentStep, setCurrentStep] = useState('select');
    const [fileInfo, setFileInfo] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [progress, setProgress] = useState(0);
    const [resultData, setResultData] = useState(null);
    const [securitySettings, setSecuritySettings] = useState({
        algorithm: 'AES-256',
        level: 'High',
        allowPrinting: true,
        allowCopying: false,
        sanitize: true
    });
    
    const { toolSettingsOpen, setToolSettingsOpen } = useSettings();

    const activeTool = { 
        name: toolName, 
        icon: ToolIcon || Lock, 
        color: '#10b981',
        subtitle: description || `Professional ${toolName} tools running safely in your browser.`,
        category: 'PDF Security'
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
        setProgress(10);
        try {
            let resultBlob;
            
            if (toolName === 'Protect PDF') {
                if (!securitySettings.password) {
                    alert("Please set a password in tool settings (gear icon) first.");
                    setToolSettingsOpen(true);
                    setIsProcessing(false);
                    return;
                }
                setProgress(30);
                resultBlob = await api.pdf.lock(fileInfo.rawFile, securitySettings.password);
            } else if (toolName === 'Unlock PDF') {
                if (!securitySettings.unlockPassword) {
                    alert("Please enter the current password in tool settings (gear icon).");
                    setToolSettingsOpen(true);
                    setIsProcessing(false);
                    return;
                }
                setProgress(30);
                resultBlob = await api.pdf.unlock(fileInfo.rawFile, securitySettings.unlockPassword);
            } else if (toolName === 'Sign PDF') {
                setProgress(40);
                resultBlob = await api.pdf.sign(fileInfo.rawFile, securitySettings.signeeName || "Aura Verified User");
            } else if (toolName === 'Redact PDF') {
                setProgress(40);
                const keywords = securitySettings.keywords || "";
                resultBlob = await api.pdf.redact(fileInfo.rawFile, keywords);
            } else {
                // Fallback basic load/save
                setProgress(50);
                const arrayBuffer = await fileInfo.rawFile.arrayBuffer();
                const pdfDoc = await PDFDocument.load(arrayBuffer);
                const pdfBytes = await pdfDoc.save();
                resultBlob = new Blob([pdfBytes], { type: 'application/pdf' });
            }

            setProgress(90);
            
            setResultData({
                url: URL.createObjectURL(resultBlob),
                name: fileInfo.name.replace(/\.[^/.]+$/, "") + `_${toolName.replace(/\s+/g,'_')}.pdf`,
                size: (resultBlob.size / (1024 * 1024)).toFixed(2) + ' MB'
            });
            setProgress(100);
            setCurrentStep('download');

        } catch (error) {
            console.error(error);
            alert(`Processing failed: ${error.message}`);
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
                return <ConfigStep {...{ fileInfo, handleProcess, isProcessing, progress, reset, activeTool }} />;
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

export default PDFSecurityTool;

