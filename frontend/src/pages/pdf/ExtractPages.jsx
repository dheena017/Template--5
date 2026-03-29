import React, { useState, useCallback } from 'react';
import { 
    FileOutput, Download, FileUp, Scissors, CheckCircle2, Settings2
} from 'lucide-react';
import { ExtractPagesSettings } from '../../components/toolSettings';
import { useDropzone } from 'react-dropzone';
import { AnimatePresence } from 'framer-motion';
import { PDFDocument } from 'pdf-lib';
import { usePDF } from '../../features/pdf/usePDF';
import FAQSection from '../../features/pdf/FAQSection';
import '../../styles/pages/pdf/OrganizePDF.css';
import ToolLayout from '../../components/layouts/ToolLayout';

// Separate step components
import SelectStep from './ExtractPagesSteps/SelectStep';
import EditorStep from './ExtractPagesSteps/EditorStep';
import ProcessingStep from './ExtractPagesSteps/ProcessingStep';
import DownloadStep from './ExtractPagesSteps/DownloadStep';
import StepIndicator from './MergePDFSteps/StepIndicator';

const STEPS = [
    { id: 'select', label: 'Select PDF', icon: FileUp },
    { id: 'reorder', label: 'Pick Pages', icon: CheckCircle2 },
    { id: 'merge', label: 'Processing', icon: Scissors },
    { id: 'download', label: 'Download', icon: Download }
];

const ExtractPages = () => {
    const { loadPDF, loading: pdfLoading, error: pdfError } = usePDF();
    const [currentStep, setCurrentStep] = useState('select'); // 'select', 'reorder', 'processing', 'download'
    const [pdfInfo, setPdfInfo] = useState(null);
    const [selectedPages, setSelectedPages] = useState([]); // Pages to KEEP
    const [progress, setProgress] = useState(0);
    const [finalBlobUrl, setFinalBlobUrl] = useState(null);
    const [fileName, setFileName] = useState('');
    const [settingsOpen, setSettingsOpen] = useState(false);
    const [pdfSettings, setPdfSettings] = useState({});

    const activeTool = { name: 'Extract Pages', icon: FileOutput, color: '#06b6d4' };

    const processFile = async (file) => {
        if (!file) return;
        const data = await loadPDF(file);
        if (data) {
            setPdfInfo({
                name: file.name,
                size: file.size,
                numPages: data.pages.length,
                thumbnails: data.pages.map(p => p.thumbnail),
                arrayBuffer: data.arrayBuffer
            });
            setSelectedPages([]);
            setCurrentStep('reorder');
        }
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop: (acceptedFiles) => {
            if (acceptedFiles.length > 0) processFile(acceptedFiles[0]);
        },
        accept: { 'application/pdf': ['.pdf'] },
        multiple: false
    });

    const togglePage = (pageNum) => {
        setSelectedPages(prev => 
            prev.includes(pageNum) 
                ? prev.filter(p => p !== pageNum) 
                : [...prev, pageNum].sort((a, b) => a - b)
        );
    };

    const selectAll = () => {
        if (pdfInfo) {
            setSelectedPages(Array.from({ length: pdfInfo.numPages }, (_, i) => i + 1));
        }
    };

    const handleExecuteExtract = async () => {
        if (!pdfInfo || selectedPages.length === 0) return;

        setCurrentStep('processing');
        setProgress(0);
        try {
            const startTime = Date.now();
            const pdfDoc = await PDFDocument.load(pdfInfo.arrayBuffer);
            const newDoc = await PDFDocument.create();
            
            const pagesToCopy = selectedPages.map(p => p - 1); // 0-indexed
            const copiedPages = await newDoc.copyPages(pdfDoc, pagesToCopy);
            copiedPages.forEach(p => newDoc.addPage(p));

            const bytes = await newDoc.save();
            const blob = new Blob([bytes], { type: 'application/pdf' });
            const url = URL.createObjectURL(blob);
            
            const duration = Date.now() - startTime;
            if (duration < 1500) await new Promise(r => setTimeout(r, 1500 - duration));
            
            setFinalBlobUrl(url);
            setFileName(`extracted_${pdfInfo.name}`);

            // Report activity to backend
            try {
                fetch(`http://localhost:8000/api/analytics/record?action=PDF Extract Pages&target=${pdfInfo.name}&pages=${selectedPages.length}&engine=pdf`, { method: 'POST' })
                    .catch(err => console.warn("Analytics reporting failed:", err));
            } catch (err) {}

            setCurrentStep('download');
        } catch (error) {
            console.error(error);
            setCurrentStep('reorder');
        }
    };

    const resetTool = () => {
        if (finalBlobUrl) URL.revokeObjectURL(finalBlobUrl);
        setPdfInfo(null);
        setCurrentStep('select');
        setFinalBlobUrl(null);
        setProgress(0);
        setSelectedPages([]);
    };

    const renderCurrentStep = () => {
        switch (currentStep) {
            case 'select': return <SelectStep {...{ getRootProps, getInputProps, isDragActive, activeTool, pdfLoading, pdfError }} />;
            case 'reorder': return <EditorStep {...{ pdfInfo, selectedPages, togglePage, selectAll, handleExecute: handleExecuteExtract, isProcessing: false, activeTool, reset: resetTool }} />;
            case 'processing': return <ProcessingStep progress={100} activeTool={activeTool} />;
            case 'download': return <DownloadStep {...{ downloadFinal: () => { const a = document.createElement('a'); a.href = finalBlobUrl; a.download = fileName; a.click(); }, resetTool, fileName }} />;
            default: return null;
        }
    };

    return (
        <ToolLayout title={activeTool.name} subtitle="Visually harvest only the essential pages from your PDF bundle." icon={activeTool.icon} color={activeTool.color} category="Document Intelligence">
            <button onClick={() => setSettingsOpen(true)} className="tsp-edge-tab" style={{'--tool-accent': activeTool.color}} title="Extract Pages Settings">
                <Settings2 size={14} style={{color: activeTool.color}} />
                <span className="tab-label" style={{color: activeTool.color}}>Settings</span>
            </button>
            <ExtractPagesSettings open={settingsOpen} onClose={() => setSettingsOpen(false)} onApply={(s) => { setPdfSettings(s); setSettingsOpen(false); }} />
            <div className="tool-upload-center" style={{ width: '100%', maxWidth: 'none', minHeight: '600px' }}>
                <StepIndicator steps={STEPS} currentStep={currentStep} />
                <div className="w-full flex justify-center mt-12">
                    <AnimatePresence mode="wait">{renderCurrentStep()}</AnimatePresence>
                </div>
            </div>
            <div className="mt-32 border-t border-slate-800/50 pt-32">
                <FAQSection tool="extract" isDarkMode={true} />
            </div>
        </ToolLayout>
    );
};

export default ExtractPages;
