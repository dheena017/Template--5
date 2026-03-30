import React, { useState, useCallback } from 'react';
import { Image as ImageIcon, FileUp, Settings2, Download, PlayCircle, Loader2 } from 'lucide-react';
import { useDropzone } from 'react-dropzone';
import { AnimatePresence } from 'framer-motion';

import ToolLayout from '../../../components/layouts/ToolLayout';
import StepIndicator from '../MergePDFSteps/StepIndicator';
import SelectStep from './ImageFormatConversionSteps/SelectStep';
import ConfigStep from './ImageFormatConversionSteps/ConfigStep';
import ResultStep from './ImageFormatConversionSteps/ResultStep';
import { ImageConversionSettings } from '../../../components/toolSettings';
import { useSettings } from '../../../context/SettingsContext';

const ImageFormatConversionTool = ({ fromFormat, toFormat }) => {
    const { toolSettingsOpen, setToolSettingsOpen } = useSettings();
    const [currentStep, setCurrentStep] = useState('select');
    const [fileInfo, setFileInfo] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [progress, setProgress] = useState(0);
    const [resultData, setResultData] = useState(null);
    
    const [imageSettings, setImageSettings] = useState({
        quality: 'High',
        progressive: true,
        stripMetadata: true,
        colorSpace: 'sRGB',
        sampling: '4:4:4'
    });

    const activeTool = { 
        name: `${fromFormat} to ${toFormat}`, 
        icon: ImageIcon, 
        color: '#fbbf24',
        subtitle: `Rapidly convert your ${fromFormat} images to ${toFormat} format directly in your browser.`,
        category: 'Image Tools'
    };

    const STEPS = [
        { id: 'select', label: `Upload ${fromFormat}`, icon: FileUp },
        { id: 'config', label: 'Settings', icon: Settings2 },
        { id: 'download', label: 'Download', icon: Download }
    ];

    const getFormatConfig = (fmt) => {
        const fmts = {
            'JPG': { mime: 'image/jpeg', ext: '.jpg' },
            'JPEG': { mime: 'image/jpeg', ext: '.jpeg' },
            'PNG': { mime: 'image/png', ext: '.png' },
            'WEBP': { mime: 'image/webp', ext: '.webp' },
            'SVG': { mime: 'image/svg+xml', ext: '.svg' },
            'HEIC': { mime: 'image/heic', ext: '.heic' }
        };
        return fmts[fmt] || { mime: 'image/*', ext: `.${fmt.toLowerCase()}` };
    };

    const onDrop = useCallback(async (acceptedFiles) => {
        if (acceptedFiles.length > 0) {
            const file = acceptedFiles[0];
            setFileInfo({
                name: file.name,
                size: (file.size / (1024 * 1024)).toFixed(2) + ' MB',
                type: file.type || fromFormat,
                rawFile: file
            });
            setResultData(null);
            setProgress(0);
            setCurrentStep('config');
        }
    }, [fromFormat]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { [getFormatConfig(fromFormat).mime]: [getFormatConfig(fromFormat).ext] },
        multiple: false
    });

    const handleConvert = async () => {
        if (!fileInfo) return;
        setIsProcessing(true);
        setProgress(0);
        try {
            for(let i = 1; i <= 100; i += Math.floor(Math.random() * 20) + 10) {
                setProgress(Math.min(i, 100));
                await new Promise(r => setTimeout(r, 100));
            }
            setProgress(100);
            await new Promise(r => setTimeout(r, 400));
            
            const img = new Image();
            const url = URL.createObjectURL(fileInfo.rawFile);
            
            await new Promise((resolve, reject) => {
                img.onload = resolve;
                img.onerror = reject;
                img.src = url;
            });
            
            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext('2d');
            
            if (getFormatConfig(toFormat).mime === 'image/jpeg') {
                ctx.fillStyle = '#FFFFFF';
                ctx.fillRect(0, 0, canvas.width, canvas.height);
            }
            ctx.drawImage(img, 0, 0);
            
            const finalBlob = await new Promise(resolve => canvas.toBlob(resolve, getFormatConfig(toFormat).mime, 0.95));
            URL.revokeObjectURL(url);
            
            setResultData({
                url: URL.createObjectURL(finalBlob),
                name: fileInfo.name.replace(getFormatConfig(fromFormat).ext, getFormatConfig(toFormat).ext),
                size: (finalBlob.size / (1024 * 1024)).toFixed(2) + ' MB'
            });
            setCurrentStep('download');

            try {
                fetch(`http://localhost:8000/api/analytics/record?action=${fromFormat} to ${toFormat}&target=Image File&pages=1&engine=local`, { method: 'POST' }).catch(() => {});
            } catch (err) {}

        } catch (error) {
            console.error(error);
            alert("Image conversion failed.");
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
                return <SelectStep {...{ getRootProps, getInputProps, isDragActive, activeTool, fromFormat, toFormat }} />;
            case 'config':
                return <ConfigStep {...{ fileInfo, fromFormat, toFormat, quality: imageSettings.quality, setQuality: (v) => setImageSettings(s => ({ ...s, quality: v })), handleConvert, isProcessing, progress, reset, activeTool }} />;
            case 'download':
                return <ResultStep {...{ resultData, fromFormat, toFormat, activeTool, reset }} />;
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
            <ImageConversionSettings 
                open={toolSettingsOpen} 
                onClose={() => setToolSettingsOpen(false)} 
                settings={imageSettings} 
                setSettings={setImageSettings} 
            />
            
            <div className="tool-upload-center" style={{ width: '100%', maxWidth: 'none', minHeight: '600px' }}>
                <StepIndicator steps={STEPS} currentStep={currentStep} />
                <div className="w-full flex justify-center mt-12">
                    <AnimatePresence mode="wait">{renderCurrentStep()}</AnimatePresence>
                </div>
            </div>
        </ToolLayout>
    );
};

export default ImageFormatConversionTool;
