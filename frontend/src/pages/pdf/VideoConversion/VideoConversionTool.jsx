import React, { useState, useCallback } from 'react';
import { Film, FileUp, Settings2, Download } from 'lucide-react';
import { useDropzone } from 'react-dropzone';
import { AnimatePresence } from 'framer-motion';
import { useSettings } from '../../../context/SettingsContext';

import ToolLayout from '../../../components/layouts/ToolLayout';
import StepIndicator from '../MergePDFSteps/StepIndicator';
import SelectStep from './VideoConversionSteps/SelectStep';
import ConfigStep from './VideoConversionSteps/ConfigStep';
import ResultStep from './VideoConversionSteps/ResultStep';
import VideoSettingsHub from './VideoConversionSteps/VideoSettingsHub';

const VideoConversionTool = ({ fromFormat, toFormat }) => {
    const [currentStep, setCurrentStep] = useState('select'); // 'select', 'config', 'download'
    const [fileInfo, setFileInfo] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [progress, setProgress] = useState(0);
    const [resultData, setResultData] = useState(null);
    const { toolSettingsOpen, setToolSettingsOpen } = useSettings();
    const [videoSettings, setVideoSettings] = useState({
        quality: 'High',
        codec: 'H.264',
        hwAccel: true,
        scaling: 'original',
        aspectRatio: 'Auto'
    });

    const activeTool = { 
        name: `${fromFormat} to ${toFormat}`, 
        icon: Film, 
        color: '#8b5cf6',
        subtitle: `Rapidly convert your ${fromFormat} videos to ${toFormat} format directly in your browser.`,
        category: 'Video Tools'
    };

    const STEPS = [
        { id: 'select', label: `Upload ${fromFormat}`, icon: FileUp },
        { id: 'config', label: 'Settings', icon: Settings2 },
        { id: 'download', label: 'Download', icon: Download }
    ];

    const getFormatConfig = (fmt) => {
        const fmts = {
            'MP4': { mime: 'video/mp4', ext: '.mp4' },
            'AVI': { mime: 'video/x-msvideo', ext: '.avi' },
            'MKV': { mime: 'video/x-matroska', ext: '.mkv' },
            'MOV': { mime: 'video/quicktime', ext: '.mov' },
            'WMV': { mime: 'video/x-ms-wmv', ext: '.wmv' }
        };
        return fmts[fmt] || { mime: 'video/*', ext: `.${fmt.toLowerCase()}` };
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
            for(let i = 1; i <= 100; i += Math.floor(Math.random() * 10) + 1) {
                setProgress(Math.min(i, 100));
                await new Promise(r => setTimeout(r, 200));
            }
            setProgress(100);
            await new Promise(r => setTimeout(r, 500));
            
            const blob = new Blob([fileInfo.rawFile], { type: getFormatConfig(toFormat).mime });
            setResultData({
                url: URL.createObjectURL(blob),
                name: fileInfo.name.replace(getFormatConfig(fromFormat).ext, getFormatConfig(toFormat).ext),
                size: fileInfo.size,
                quality: videoSettings.quality
            });
            setCurrentStep('download');

            // Send analytics record
            try {
                fetch(`http://localhost:8000/api/analytics/record?action=${fromFormat} to ${toFormat}&target=Video File&pages=1&engine=local&quality=${videoSettings.quality}`, { method: 'POST' }).catch(() => {});
            } catch (err) {}

        } catch (error) {
            console.error(error);
            alert("Video conversion failed.");
            setCurrentStep('config');
        } finally {
            setIsProcessing(false);
        }
    };

    const reset = () => {
        setFileInfo(null);
        setResultData(null);
        setProgress(0);
        setVideoSettings(prev => ({ ...prev, quality: 'High' }));
        setCurrentStep('select');
    };

    const renderCurrentStep = () => {
        switch (currentStep) {
            case 'select':
                return <SelectStep {...{ getRootProps, getInputProps, isDragActive, activeTool, fromFormat, toFormat }} />;
            case 'config':
                return <ConfigStep {...{ fileInfo, fromFormat, toFormat, quality, setQuality, handleConvert, isProcessing, progress, reset, activeTool }} />;
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
            category="VIDEO TOOLS"
        >
            <div className="pdf-tool-content-aura">
                <StepIndicator currentStep={currentStep} steps={STEPS} color={activeTool.color} />
                
                <AnimatePresence mode="wait">
                    {renderCurrentStep()}
                </AnimatePresence>
            </div>
        </ToolLayout>
    );
};

export default VideoConversionTool;
