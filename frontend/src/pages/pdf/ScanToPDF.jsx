import React, { useState, useCallback } from 'react';
import { 
    Scan, Download, FileUp, Settings2, FileText
} from 'lucide-react';
import { ScanToPDFSettings } from '../../components/toolSettings';
import { useDropzone } from 'react-dropzone';
import { AnimatePresence } from 'framer-motion';
import { api } from '../../services/api';
import FAQSection from '../../features/pdf/FAQSection';
import '../../styles/pages/pdf/OrganizePDF.css';

// Separate step components
import SelectStep from './ScanToPDFSteps/SelectStep';
import PreviewStep from './ScanToPDFSteps/PreviewStep';
import ProcessingStep from './ScanToPDFSteps/ProcessingStep';
import DownloadStep from './ScanToPDFSteps/DownloadStep';
import StepIndicator from './MergePDFSteps/StepIndicator';

const STEPS = [
    { id: 'select', label: 'Capture', icon: FileUp },
    { id: 'reorder', label: 'Preview', icon: Scan },
    { id: 'merge', label: 'Processing', icon: Settings2 },
    { id: 'download', label: 'Download', icon: Download }
];

const ScanToPDF = () => {
    const [currentStep, setCurrentStep] = useState('select'); // 'select', 'reorder', 'processing', 'download'
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [progress, setProgress] = useState(0);
    const [finalBlobUrl, setFinalBlobUrl] = useState(null);
    const [fileName, setFileName] = useState('');
    const [error, setError] = useState(null);
    const [settingsOpen, setSettingsOpen] = useState(false);
    const [pdfSettings, setPdfSettings] = useState({});

    const activeTool = { name: 'Scan to PDF', icon: Scan, color: '#ec4899' };

    const onDrop = useCallback(async (acceptedFiles) => {
        if (acceptedFiles.length > 0) {
            const newFiles = acceptedFiles.map(f => {
                f.id = Math.random().toString(36).substr(2, 9);
                return f;
            });
            setSelectedFiles(prev => [...prev, ...newFiles]);
            setCurrentStep('reorder');
        }
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { 'image/*': ['.jpg', '.jpeg', '.png', '.webp'] },
        multiple: true
    });

    const removeFile = (id) => {
        setSelectedFiles(prev => prev.filter(f => f.id !== id));
        if (selectedFiles.length <= 1) setCurrentStep('select');
    };

    const handleExecuteScan = async () => {
        if (selectedFiles.length === 0) return;
        
        setCurrentStep('processing');
        setProgress(30); // Initial progress
        try {
            const startTime = Date.now();
            const response = await api.pdf.imageToPdf(selectedFiles);
            
            setProgress(70);
            
            if (response instanceof Blob) {
                const url = window.URL.createObjectURL(response);
                
                const duration = Date.now() - startTime;
                if (duration < 1500) await new Promise(r => setTimeout(r, 1500 - duration));
                
                setProgress(100);
                setFinalBlobUrl(url);
                setFileName(`scanned_${Date.now()}.pdf`);

                // Report activity to backend
                try {
                    fetch(`http://localhost:8000/api/analytics/record?action=Scan To PDF&target=Image_Bundle&pages=${selectedFiles.length}&engine=api`, { method: 'POST' })
                        .catch(err => console.warn("Analytics reporting failed:", err));
                } catch (err) {}

                setCurrentStep('download');
            } else {
                throw new Error("Invalid response from scanning engine");
            }
        } catch (error) {
            console.error(error);
            setError("Document generation failed. Please try again.");
            setCurrentStep('reorder');
        }
    };

    const resetTool = () => {
        if (finalBlobUrl) URL.revokeObjectURL(finalBlobUrl);
        setSelectedFiles([]);
        setCurrentStep('select');
        setFinalBlobUrl(null);
        setProgress(0);
        setError(null);
    };

    const renderCurrentStep = () => {
        switch (currentStep) {
            case 'select': return <SelectStep {...{ getRootProps, getInputProps, isDragActive, activeTool, error }} />;
            case 'reorder': return <PreviewStep {...{ selectedFiles, setSelectedFiles, removeFile, handleExecute: handleExecuteScan, isProcessing: false, activeTool, reset: resetTool, getRootProps, getInputProps }} />;
            case 'processing': return <ProcessingStep progress={progress} activeTool={activeTool} />;
            case 'download': return <DownloadStep {...{ downloadFinal: () => { const a = document.createElement('a'); a.href = finalBlobUrl; a.download = fileName; a.click(); }, resetTool, fileName }} />;
            default: return null;
        }
    };

    return (
        <div className="pdf-tools-wrapper">
            <button onClick={() => setSettingsOpen(true)} className="tsp-edge-tab" style={{'--tool-accent': activeTool.color}} title="Scan to PDF Settings">
                <Settings2 size={14} style={{color: activeTool.color}} />
                <span className="tab-label" style={{color: activeTool.color}}>Settings</span>
            </button>
            <ScanToPDFSettings open={settingsOpen} onClose={() => setSettingsOpen(false)} onApply={(s) => { setPdfSettings(s); setSettingsOpen(false); }} />
            <main className="pdf-tools-main">
                <div className="pdf-tool-active-view">
                    <div className="tool-upload-center" style={{ width: '100%', maxWidth: 'none', minHeight: '600px' }}>
                        <StepIndicator steps={STEPS} currentStep={currentStep} />
                        <div className="tool-title-wrapper mb-12">
                            <activeTool.icon size={64} style={{ color: activeTool.color }} className="tool-main-icon" />
                            <h2 className="text-5xl font-black uppercase tracking-tighter text-white">{activeTool.name}</h2>
                            <p className="text-xl text-slate-400 mt-2">Professional pixel-to-vector conversion engine for ultimate document quality.</p>
                        </div>
                        <div className="w-full flex justify-center">
                            <AnimatePresence mode="wait">{renderCurrentStep()}</AnimatePresence>
                        </div>
                    </div>
                </div>
                <div className="mt-32 border-t border-slate-800/30 pt-32">
                    <FAQSection tool="scan" isDarkMode={true} />
                </div>
            </main>
        </div>
    );
};

export default ScanToPDF;
