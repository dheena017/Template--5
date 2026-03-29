import React, { useState, useCallback, useReducer } from 'react';
import { 
    Split, Download, FileUp, Scissors, Settings2, RotateCcw
} from 'lucide-react';
import { SplitPDFSettings } from '../../components/toolSettings';
import { useDropzone } from 'react-dropzone';
import { AnimatePresence } from 'framer-motion';
import { PDFDocument } from 'pdf-lib';
import JSZip from 'jszip';
import { usePDF } from '../../features/pdf/usePDF';
import FAQSection from '../../features/pdf/FAQSection';
import '../../styles/pages/pdf/OrganizePDF.css';

import ToolLayout from '../../components/layouts/ToolLayout';

// Separate step components
import SelectStep from './SplitPDFSteps/SelectStep';
import OptionsStep from './SplitPDFSteps/OptionsStep';
import ProcessingStep from './SplitPDFSteps/ProcessingStep';
import DownloadStep from './SplitPDFSteps/DownloadStep';
import StepIndicator from './MergePDFSteps/StepIndicator';

const STEPS = [
    { id: 'select', label: 'Select PDF', icon: FileUp },
    { id: 'reorder', label: 'Split Settings', icon: Scissors },
    { id: 'merge', label: 'Processing', icon: Settings2 },
    { id: 'download', label: 'Download', icon: Download }
];

const initialState = {
    mode: 'EVERY', // EVERY, CUSTOM, ALL, SIZE, BOOKMARKS
    interval: 1,
    ranges: '',
    targetSize: 1,
    selectedPages: [],
    namingTemplate: '{original}_{number}'
};

function splitReducer(state, action) {
    switch (action.type) {
        case 'SET_MODE': return { ...state, mode: action.payload };
        case 'SET_INTERVAL': return { ...state, interval: action.payload };
        case 'SET_RANGES': return { ...state, ranges: action.payload };
        case 'SET_SIZE': return { ...state, targetSize: action.payload };
        case 'SET_NAMING': return { ...state, namingTemplate: action.payload };
        case 'RESET': return initialState;
        default: return state;
    }
}

const SplitPDF = () => {
    const { loadPDF, loading: pdfLoading, error: pdfError } = usePDF();
    const [currentStep, setCurrentStep] = useState('select');
    const [pdfInfo, setPdfInfo] = useState(null);
    const [progress, setProgress] = useState(0);
    const [zipBlobUrl, setZipBlobUrl] = useState(null);
    const [zipFileName, setZipFileName] = useState('');
    const [state, dispatch] = useReducer(splitReducer, initialState);
    const [settingsOpen, setSettingsOpen] = useState(false);
    const [pdfSettings, setPdfSettings] = useState({});

    const activeTool = { name: 'Split PDF', icon: Split, color: '#ff5252' };

    const processFile = async (file) => {
        if (!file) return;
        const data = await loadPDF(file);
        if (data) {
            setPdfInfo({
                name: file.name,
                size: file.size,
                numPages: data.pages.length,
                thumbnails: data.pages.map(p => p.thumbnail),
                arrayBuffer: data.arrayBuffer,
                outline: [] // Outline logic can be extended if needed
            });
            setCurrentStep('reorder');
        }
    };

    const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
        onDrop: (acceptedFiles) => {
            if (acceptedFiles.length > 0) processFile(acceptedFiles[0]);
        },
        accept: { 'application/pdf': ['.pdf'] },
        multiple: false
    });

    const handleExecuteSplit = async () => {
        if (!pdfInfo) return;
        setCurrentStep('processing');
        setProgress(0);
        try {
            const startTime = Date.now();
            const pdfDoc = await PDFDocument.load(pdfInfo.arrayBuffer);
            const totalPages = pdfDoc.getPageCount();
            const zip = new JSZip();
            
            let splitRanges = [];

            if (state.mode === 'EVERY') {
                const interval = parseInt(state.interval) || 1;
                for (let i = 0; i < totalPages; i += interval) {
                    const range = [];
                    for (let j = i; j < Math.min(i + interval, totalPages); j++) range.push(j);
                    splitRanges.push(range);
                }
            } else if (state.mode === 'CUSTOM') {
                const rangeStr = state.ranges || "";
                const parts = rangeStr.split(',').map(s => s.trim());
                for (const part of parts) {
                    const [start, end] = part.split('-').map(s => parseInt(s.trim()));
                    if (isNaN(start)) continue;
                    const range = [];
                    if (isNaN(end)) {
                        if (start >= 1 && start <= totalPages) range.push(start - 1);
                    } else {
                        for (let i = Math.max(1, start); i <= Math.min(totalPages, end); i++) range.push(i - 1);
                    }
                    if (range.length > 0) splitRanges.push(range);
                }
            } else if (state.mode === 'ALL') {
                for (let i = 0; i < totalPages; i++) splitRanges.push([i]);
            } else if (state.mode === 'SIZE') {
                const targetSizeMB = parseFloat(state.targetSize) || 1;
                const avgPageSize = pdfInfo.arrayBuffer.byteLength / totalPages;
                const pagesPerFile = Math.max(1, Math.floor((targetSizeMB * 1024 * 1024) / avgPageSize));
                for (let i = 0; i < totalPages; i += pagesPerFile) {
                    const range = [];
                    for (let j = i; j < Math.min(i + pagesPerFile, totalPages); j++) range.push(j);
                    splitRanges.push(range);
                }
            }

            const totalGroups = splitRanges.length;
            if (totalGroups === 0) throw new Error("No ranges found");

            for (let i = 0; i < totalGroups; i++) {
                const newDoc = await PDFDocument.create();
                const pagesToCopy = await newDoc.copyPages(pdfDoc, splitRanges[i]);
                pagesToCopy.forEach(p => newDoc.addPage(p));
                const bytes = await newDoc.save();
                
                let fileName = state.namingTemplate
                    .replace('{original}', pdfInfo.name.replace('.pdf', ''))
                    .replace('{number}', (i + 1).toString().padStart(2, '0'));
                
                if (!fileName.endsWith('.pdf')) fileName += '.pdf';
                zip.file(fileName, bytes);
                setProgress(Math.round(((i + 1) / totalGroups) * 100));
            }

            const zipBlob = await zip.generateAsync({ type: "blob" });
            const url = URL.createObjectURL(zipBlob);
            
            const duration = Date.now() - startTime;
            if (duration < 1500) await new Promise(r => setTimeout(r, 1500 - duration));
            
            setZipBlobUrl(url);
            setZipFileName(`split_${pdfInfo.name}.zip`);

            // Report activity to backend
            try {
                fetch(`http://localhost:8000/api/analytics/record?action=PDF Split&target=${pdfInfo.name}&pages=${totalPages}&engine=pdf`, { method: 'POST' })
                    .catch(err => console.warn("Analytics reporting failed:", err));
            } catch (err) {}

            setCurrentStep('download');
        } catch (error) {
            console.error(error);
            setCurrentStep('reorder');
        }
    };

    const resetTool = () => {
        if (zipBlobUrl) URL.revokeObjectURL(zipBlobUrl);
        setPdfInfo(null);
        setCurrentStep('select');
        setZipBlobUrl(null);
        setProgress(0);
        dispatch({ type: 'RESET' });
    };

    const renderCurrentStep = () => {
        switch (currentStep) {
            case 'select': return <SelectStep {...{ getRootProps, getInputProps, isDragActive, activeTool, pdfLoading, pdfError }} />;
            case 'reorder': return <OptionsStep {...{ pdfInfo, state, dispatch, handleExecute: handleExecuteSplit, processing: false, progress, activeTool }} />;
            case 'processing': return <ProcessingStep progress={progress} activeTool={activeTool} />;
            case 'download': return <DownloadStep {...{ downloadFinal: () => { const a = document.createElement('a'); a.href = zipBlobUrl; a.download = zipFileName; a.click(); }, resetTool, zipFileName }} />;
            default: return null;
        }
    };

    return (
        <ToolLayout 
            title={activeTool.name} 
            subtitle="Precision extraction for every page of your document." 
            icon={activeTool.icon} 
            color={activeTool.color}
            category="Document Intelligence"
        >
            <button onClick={() => setSettingsOpen(true)} className="tsp-edge-tab" style={{'--tool-accent': activeTool.color}} title="Split PDF Settings">
                <Settings2 size={14} style={{color: activeTool.color}} />
                <span className="tab-label" style={{color: activeTool.color}}>Settings</span>
            </button>
            <SplitPDFSettings open={settingsOpen} onClose={() => setSettingsOpen(false)} onApply={(s) => { setPdfSettings(s); setSettingsOpen(false); }} />
            <div className="tool-upload-center" style={{ width: '100%', maxWidth: 'none', minHeight: '600px' }}>
                <StepIndicator steps={STEPS} currentStep={currentStep} />
                <div className="w-full flex justify-center mt-12">
                    <AnimatePresence mode="wait">{renderCurrentStep()}</AnimatePresence>
                </div>
            </div>
            <div className="mt-32 border-t border-slate-800/50 pt-32">
                <FAQSection tool="split" isDarkMode={true} />
            </div>
        </ToolLayout>
    );
};

export default SplitPDF;
