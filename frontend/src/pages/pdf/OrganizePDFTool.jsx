import React, { useState, useCallback } from 'react';
import { 
    Layers, Download, FileUp, Settings2
} from 'lucide-react';
import { useDropzone } from 'react-dropzone';
import { AnimatePresence } from 'framer-motion';
import { PDFDocument } from 'pdf-lib';
import { usePDF } from '../../features/pdf/usePDF';
import FAQSection from '../../features/pdf/FAQSection';
import '../../styles/pages/pdf/OrganizePDF.css';
import ToolLayout from '../../components/layouts/ToolLayout';
import { OrganizePDFSettings } from '../../components/toolSettings';

// Separate step components
import SelectStep from './OrganizePDFSteps/SelectStep';
import EditorStep from './OrganizePDFSteps/EditorStep';
import ProcessingStep from './OrganizePDFSteps/ProcessingStep';
import DownloadStep from './OrganizePDFSteps/DownloadStep';
import StepIndicator from './MergePDFSteps/StepIndicator';

const STEPS = [
    { id: 'select', label: 'Select PDF', icon: FileUp },
    { id: 'reorder', label: 'Organize', icon: Layers },
    { id: 'merge', label: 'Processing', icon: Settings2 },
    { id: 'download', label: 'Download', icon: Download }
];

const OrganizePDFTool = () => {
    const { loadPDF, loading: pdfLoading, error: pdfError } = usePDF();
    const [currentStep, setCurrentStep] = useState('select');
    const [pdfInfoRaw, setPdfInfoRaw] = useState(null);
    const [pages, setPages] = useState([]);
    const [progress, setProgress] = useState(0);
    const [finalBlobUrl, setFinalBlobUrl] = useState(null);
    const [fileName, setFileName] = useState('');
    
    const [history, setHistory] = useState([]);
    const [historyIndex, setHistoryIndex] = useState(-1);
    const [zoomLevel, setZoomLevel] = useState(1);
    const [settingsOpen, setSettingsOpen] = useState(false);
    const [toolSettings, setToolSettings] = useState({});

    const activeTool = { name: 'Organize PDF', icon: Layers, color: '#42a5f5' };

    const addToHistory = useCallback((newPages) => {
        const nextHistory = history.slice(0, historyIndex + 1);
        nextHistory.push([...newPages]);
        setHistory(nextHistory);
        setHistoryIndex(nextHistory.length - 1);
        setPages(newPages);
    }, [history, historyIndex]);

    const undo = () => {
        if (historyIndex > 0) {
            setHistoryIndex(historyIndex - 1);
            setPages(history[historyIndex - 1]);
        }
    };

    const redo = () => {
        if (historyIndex < history.length - 1) {
            setHistoryIndex(historyIndex + 1);
            setPages(history[historyIndex + 1]);
        }
    };

    const processFile = async (file) => {
        if (!file) return;
        const data = await loadPDF(file);
        if (data) {
            setPdfInfoRaw({
                name: file.name,
                size: file.size,
                arrayBuffer: data.arrayBuffer
            });
            const initialPages = data.pages.map(p => ({
                ...p,
                id: Math.random().toString(36).substr(2, 9),
                rotation: 0,
                isBlank: false
            }));
            setPages(initialPages);
            setHistory([initialPages]);
            setHistoryIndex(0);
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

    const rotatePage = (id) => {
        const newPages = pages.map(p => 
            p.id === id ? { ...p, rotation: (p.rotation + 90) % 360 } : p
        );
        addToHistory(newPages);
    };

    const deletePage = (id) => {
        const newPages = pages.filter(p => p.id !== id);
        addToHistory(newPages);
    };

    const duplicatePage = (id) => {
        const pageIdx = pages.findIndex(p => p.id === id);
        const page = pages[pageIdx];
        const newPages = [
            ...pages.slice(0, pageIdx + 1),
            { ...page, id: Math.random().toString(36).substr(2, 9) },
            ...pages.slice(pageIdx + 1)
        ];
        addToHistory(newPages);
    };

    const addBlankPage = () => {
        const newPage = {
            id: Math.random().toString(36).substr(2, 9),
            isBlank: true,
            thumbnail: null,
            rotation: 0
        };
        addToHistory([...pages, newPage]);
    };

    const rotateSelected = (ids) => {
        const newPages = pages.map(p =>
            ids.includes(p.id) ? { ...p, rotation: (p.rotation + 90) % 360 } : p
        );
        addToHistory(newPages);
    };

    const deleteSelected = (ids) => {
        const newPages = pages.filter(p => !ids.includes(p.id));
        addToHistory(newPages);
    };

    const duplicateSelected = (ids) => {
        let newPages = [...pages];
        // Insert duplicates right after the originals
        ids.forEach(id => {
            const idx = newPages.findIndex(p => p.id === id);
            if (idx !== -1) {
                const clone = { ...newPages[idx], id: Math.random().toString(36).substr(2, 9) };
                newPages.splice(idx + 1, 0, clone);
            }
        });
        addToHistory(newPages);
    };

    const handleExecuteOrganize = async () => {
        if (!pages.length) return;
        setCurrentStep('processing');
        setProgress(0);
        try {
            const startTime = Date.now();
            const pdfDoc = await PDFDocument.load(pdfInfoRaw.arrayBuffer);
            const newPdf = await PDFDocument.create();

            for (let i = 0; i < pages.length; i++) {
                const pageItem = pages[i];
                if (pageItem.isBlank) {
                    newPdf.addPage([595.28, 841.89]); // A4
                } else {
                    const [copiedPage] = await newPdf.copyPages(pdfDoc, [pageItem.originalNum - 1]);
                    copiedPage.setRotation({ type: 'degrees', angle: pageItem.rotation });
                    newPdf.addPage(copiedPage);
                }
                setProgress(Math.round(((i + 1) / pages.length) * 100));
            }

            const bytes = await newPdf.save();
            const blob = new Blob([bytes], { type: 'application/pdf' });
            const url = URL.createObjectURL(blob);
            
            const duration = Date.now() - startTime;
            if (duration < 1500) await new Promise(r => setTimeout(r, 1500 - duration));
            
            setFinalBlobUrl(url);
            setFileName(`organized_${pdfInfoRaw.name}`);

            try {
                fetch(`http://localhost:8000/api/analytics/record?action=PDF Organize&target=${pdfInfoRaw.name}&pages=${pages.length}&engine=pdf`, { method: 'POST' })
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
        setPdfInfoRaw(null);
        setPages([]);
        setHistory([]);
        setHistoryIndex(-1);
        setCurrentStep('select');
        setFinalBlobUrl(null);
        setProgress(0);
    };

    const renderCurrentStep = () => {
        switch (currentStep) {
            case 'select': return <SelectStep {...{ getRootProps, getInputProps, isDragActive, activeTool, pdfLoading, pdfError }} />;
            case 'reorder': return (
                <EditorStep 
                    {...{ 
                        pages, 
                        setPages: addToHistory, 
                        undo, 
                        redo, 
                        canUndo: historyIndex > 0, 
                        canRedo: historyIndex < history.length - 1,
                        rotatePage, 
                        deletePage, 
                        duplicatePage, 
                        addBlankPage,
                        rotateSelected,
                        deleteSelected,
                        duplicateSelected,
                        zoomLevel,
                        setZoomLevel,
                        handleExecute: handleExecuteOrganize, 
                        isProcessing: false, 
                        activeTool, 
                        reset: resetTool 
                    }} 
                />
            );
            case 'processing': return <ProcessingStep progress={progress} activeTool={activeTool} />;
            case 'download': return <DownloadStep {...{ downloadFinal: () => { const a = document.createElement('a'); a.href = finalBlobUrl; a.download = fileName; a.click(); }, resetTool, fileName }} />;
            default: return null;
        }
    };

    return (
        <ToolLayout title={activeTool.name} subtitle="Visually reorder pages and restructure your document in seconds." icon={activeTool.icon} color={activeTool.color} category="Document Intelligence">
            <button onClick={() => setSettingsOpen(true)} className="tsp-edge-tab" style={{'--tool-accent': activeTool.color}} title="Organize PDF Settings">
                <Layers size={14} style={{color: activeTool.color}} />
                <span className="tab-label" style={{color: activeTool.color}}>Settings</span>
            </button>
            <OrganizePDFSettings open={settingsOpen} onClose={() => setSettingsOpen(false)} onApply={(s) => { setToolSettings(s); setSettingsOpen(false); }} />
            <div className="tool-upload-center" style={{ width: '100%', maxWidth: 'none', minHeight: '600px' }}>
                <StepIndicator steps={STEPS} currentStep={currentStep} />
                <div className="w-full flex justify-center mt-12">
                    <AnimatePresence mode="wait">{renderCurrentStep()}</AnimatePresence>
                </div>
            </div>
            <div className="mt-32 border-t border-slate-800/50 pt-32">
                <FAQSection tool="organize" isDarkMode={true} />
            </div>
        </ToolLayout>
    );
};

export default OrganizePDFTool;
