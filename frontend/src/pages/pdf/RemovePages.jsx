import React, { useState, useCallback } from 'react';
import { 
    FileMinus, Download, FileUp, Scissors, Trash2, CheckCircle2, Settings2
} from 'lucide-react';
import { RemovePagesSettings } from '../../components/toolSettings';
import { useDropzone } from 'react-dropzone';
import { AnimatePresence } from 'framer-motion';
import { PDFDocument } from 'pdf-lib';
import { usePDF } from '../../features/pdf/usePDF';
import FAQSection from '../../features/pdf/FAQSection';
import '../../styles/pages/pdf/OrganizePDF.css';
import ToolLayout from '../../components/layouts/ToolLayout';

// Separate step components
import SelectStep from './RemovePagesSteps/SelectStep';
import EditorStep from './RemovePagesSteps/EditorStep';
import ProcessingStep from './RemovePagesSteps/ProcessingStep';
import DownloadStep from './RemovePagesSteps/DownloadStep';
import StepIndicator from './MergePDFSteps/StepIndicator';

const STEPS = [
    { id: 'select', label: 'Select PDF', icon: FileUp },
    { id: 'reorder', label: 'Pick Pages', icon: Trash2 },
    { id: 'merge', label: 'Processing', icon: Scissors },
    { id: 'download', label: 'Download', icon: Download }
];

const RemovePages = () => {
    const { loadPDF, loading: pdfLoading, error: pdfError } = usePDF();
    const [currentStep, setCurrentStep] = useState('select'); // 'select', 'reorder', 'processing', 'download'
    const [pdfInfo, setPdfInfo] = useState(null);
    const [selectedPages, setSelectedPages] = useState([]); // Pages to REMOVE
    const [progress, setProgress] = useState(0);
    const [finalBlobUrl, setFinalBlobUrl] = useState(null);
    const [fileName, setFileName] = useState('');
    const [settingsOpen, setSettingsOpen] = useState(false);
    const [pdfSettings, setPdfSettings] = useState({});

    const activeTool = { name: 'Remove Pages', icon: FileMinus, color: '#f43f5e' };

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
                : [...prev, pageNum]
        );
    };

    const handleExecuteRemove = async () => {
        if (!pdfInfo || selectedPages.length === 0) return;
        if (selectedPages.length === pdfInfo.numPages) {
            alert("A PDF must contain at least one page. You cannot remove all pages.");
            return;
        }

        setCurrentStep('processing');
        setProgress(0);
        try {
            const startTime = Date.now();
            const pdfDoc = await PDFDocument.load(pdfInfo.arrayBuffer);
            const totalPages = pdfDoc.getPageCount();
            
            const newDoc = await PDFDocument.create();
            const pagesToKeep = [];
            for (let i = 1; i <= totalPages; i++) {
                if (!selectedPages.includes(i)) pagesToKeep.push(i - 1);
            }
            
            const copiedPages = await newDoc.copyPages(pdfDoc, pagesToKeep);
            copiedPages.forEach(p => newDoc.addPage(p));

            const bytes = await newDoc.save();
            const blob = new Blob([bytes], { type: 'application/pdf' });
            const url = URL.createObjectURL(blob);
            
            const duration = Date.now() - startTime;
            if (duration < 1500) await new Promise(r => setTimeout(r, 1500 - duration));
            
            setFinalBlobUrl(url);
            setFileName(`removed_${pdfInfo.name}`);

            // Report activity to backend
            try {
                fetch(`http://localhost:8000/api/analytics/record?action=PDF Remove Pages&target=${pdfInfo.name}&pages=${selectedPages.length}&engine=pdf`, { method: 'POST' })
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
            case 'reorder': return <EditorStep {...{ pdfInfo, selectedPages, togglePage, handleExecute: handleExecuteRemove, isProcessing: false, activeTool, reset: resetTool }} />;
            case 'processing': return <ProcessingStep progress={100} activeTool={activeTool} />;
            case 'download': return <DownloadStep {...{ downloadFinal: () => { const a = document.createElement('a'); a.href = finalBlobUrl; a.download = fileName; a.click(); }, resetTool, fileName }} />;
            default: return null;
        }
    };

    return (
        <ToolLayout title={activeTool.name} subtitle="Prune your documents with surgical precision." icon={activeTool.icon} color={activeTool.color} category="Document Intelligence">
            <button onClick={() => setSettingsOpen(true)} className="tsp-edge-tab" style={{'--tool-accent': activeTool.color}} title="Remove Pages Settings">
                <Settings2 size={14} style={{color: activeTool.color}} />
                <span className="tab-label" style={{color: activeTool.color}}>Settings</span>
            </button>
            <RemovePagesSettings open={settingsOpen} onClose={() => setSettingsOpen(false)} onApply={(s) => { setPdfSettings(s); setSettingsOpen(false); }} />
            <div className="tool-upload-center" style={{ width: '100%', maxWidth: 'none', minHeight: '600px' }}>
                <StepIndicator steps={STEPS} currentStep={currentStep} />
                <div className="w-full flex justify-center mt-12">
                    <AnimatePresence mode="wait">{renderCurrentStep()}</AnimatePresence>
                </div>
            </div>
            <div className="mt-32 border-t border-slate-800/50 pt-32">
                <FAQSection tool="remove" isDarkMode={true} />
            </div>
        </ToolLayout>
    );
};

export default RemovePages;
