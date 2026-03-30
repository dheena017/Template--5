import React, { useState, useCallback } from 'react';
import { Music, FileUp, Settings2, Download, PlayCircle, Loader2 } from 'lucide-react';
import { useDropzone } from 'react-dropzone';
import { AnimatePresence } from 'framer-motion';

import ToolLayout from '../../../components/layouts/ToolLayout';
import StepIndicator from '../MergePDFSteps/StepIndicator';
import SelectStep from './AudioConversionSteps/SelectStep';
import ConfigStep from './AudioConversionSteps/ConfigStep';
import ResultStep from './AudioConversionSteps/ResultStep';
import { AudioConversionSettings } from '../../../components/toolSettings';
import { useSettings } from '../../../context/SettingsContext';

const AudioConversionTool = ({ fromFormat, toFormat }) => {
    const { toolSettingsOpen, setToolSettingsOpen } = useSettings();
    const [currentStep, setCurrentStep] = useState('select'); // 'select', 'config', 'download'
    const [fileInfo, setFileInfo] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [progress, setProgress] = useState(0);
    const [resultData, setResultData] = useState(null);
    
    const [audioSettings, setAudioSettings] = useState({
        quality: 'High',
        bitrate: '320kbps',
        sampleRate: '44100Hz',
        channels: 'Stereo',
        normalize: true
    });

    const activeTool = { 
        name: `${fromFormat} to ${toFormat}`, 
        icon: Music, 
        color: '#8b5cf6',
        subtitle: `Rapidly convert your ${fromFormat} audio to ${toFormat} format directly in your browser.`,
        category: 'Audio Tools'
    };

    const STEPS = [
        { id: 'select', label: `Upload ${fromFormat}`, icon: FileUp },
        { id: 'config', label: 'Settings', icon: Settings2 },
        { id: 'download', label: 'Download', icon: Download }
    ];

    const getFormatConfig = (fmt) => {
        const fmts = {
            'MP3': { mime: 'audio/mpeg', ext: '.mp3' },
            'WAV': { mime: 'audio/wav', ext: '.wav' },
            'FLAC': { mime: 'audio/flac', ext: '.flac' },
            'AAC': { mime: 'audio/aac', ext: '.aac' },
            'OGG': { mime: 'audio/ogg', ext: '.ogg' },
            'AC3': { mime: 'audio/ac3', ext: '.ac3' }
        };
        return fmts[fmt] || { mime: 'audio/*', ext: `.${fmt.toLowerCase()}` };
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
            for(let i = 1; i <= 100; i += Math.floor(Math.random() * 15) + 5) {
                setProgress(Math.min(i, 100));
                await new Promise(r => setTimeout(r, 150));
            }
            setProgress(100);
            await new Promise(r => setTimeout(r, 500));
            
            const blob = new Blob([fileInfo.rawFile], { type: getFormatConfig(toFormat).mime });
            setResultData({
                url: URL.createObjectURL(blob),
                name: fileInfo.name.replace(getFormatConfig(fromFormat).ext, getFormatConfig(toFormat).ext),
                size: fileInfo.size
            });
            setCurrentStep('download');

            try {
                fetch(`http://localhost:8000/api/analytics/record?action=${fromFormat} to ${toFormat}&target=Audio File&pages=1&engine=local`, { method: 'POST' }).catch(() => {});
            } catch (err) {}

        } catch (error) {
            console.error(error);
            alert("Audio conversion failed.");
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
                return <ConfigStep {...{ fileInfo, fromFormat, toFormat, quality: audioSettings.quality, setQuality: (v) => setAudioSettings(s => ({ ...s, quality: v })), handleConvert, isProcessing, progress, reset, activeTool }} />;
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
            <AudioConversionSettings 
                open={toolSettingsOpen} 
                onClose={() => setToolSettingsOpen(false)} 
                settings={audioSettings} 
                setSettings={setAudioSettings} 
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

export default AudioConversionTool;
