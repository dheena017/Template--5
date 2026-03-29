import React, { useState, useCallback } from 'react';
import { 
    Combine, Download, FileUp, Layers, Settings2
} from 'lucide-react';
import { MergePDFSettings } from '../../components/toolSettings';
import { useSettings } from '../../context/SettingsContext';
import { useDropzone } from 'react-dropzone';
import { AnimatePresence } from 'framer-motion';
import { PDFDocument } from 'pdf-lib';
import JSZip from 'jszip';
import { usePDF } from '../../features/pdf/usePDF';
import FAQSection from '../../features/pdf/FAQSection';
import '../../styles/pages/pdf/OrganizePDF.css';
import '../../styles/pages/pdf/MergePDF.css';

import ToolLayout from '../../components/layouts/ToolLayout';

// Separate step components
import SelectStep from './MergePDFSteps/SelectStep';
import ReorderStep from './MergePDFSteps/ReorderStep';
import MergingStep from './MergePDFSteps/MergingStep';
import DownloadStep from './MergePDFSteps/DownloadStep';
import StepIndicator from './MergePDFSteps/StepIndicator';

const STEPS = [
    { id: 'select', label: 'Select Files', icon: FileUp },
    { id: 'reorder', label: 'Reorder Files', icon: Layers },
    { id: 'merge', label: 'Merge Files', icon: Combine },
    { id: 'download', label: 'Download', icon: Download }
];

const MergePDF = () => {
    const { loadPDF, loading: pdfLoading, error: pdfError } = usePDF();
    const [currentStep, setCurrentStep] = useState('select'); // 'select', 'reorder', 'merging', 'download'
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [progress, setProgress] = useState(0);
    const [mergedBlobUrl, setMergedBlobUrl] = useState(null);
    const [mergedFileName, setMergedFileName] = useState('');
    const { toolSettingsOpen, setToolSettingsOpen } = useSettings();
    const [resultData, setResultData] = useState(null);

    const activeTool = { 
        name: 'Merge PDF', 
        icon: Combine, 
        color: '#e53935',
        subtitle: 'The easiest way to combine PDF files into one high-quality document.',
        category: 'Document Intelligence'
    };

    const processFiles = async (files) => {
        if (!files || files.length === 0) return;
        
        const newFiles = [];
        try {
            for (const file of files) {
                if (file.name.endsWith('.zip')) {
                    const zip = await JSZip.loadAsync(file);
                    const zipFiles = Object.values(zip.files).filter(f => f.name.endsWith('.pdf') && !f.dir);
                    for (const zf of zipFiles) {
                        const blob = await zf.async('blob');
                        const pdfFile = new File([blob], zf.name, { type: 'application/pdf' });
                        const data = await loadPDF(pdfFile);
                        if (data) {
                            newFiles.push({
                                id: `file-${Math.random().toString(36).substr(2, 9)}`,
                                name: zf.name, size: pdfFile.size, pages: data.pages,
                                arrayBuffer: data.arrayBuffer, selectedPages: data.pages.map(p => p.originalNum)
                            });
                        }
                    }
                } else if (file.type === 'application/pdf' || file.name.endsWith('.pdf')) {
                    const data = await loadPDF(file);
                    if (data) {
                        newFiles.push({
                            id: `file-${Math.random().toString(36).substr(2, 9)}`,
                            name: file.name, size: file.size, pages: data.pages,
                            arrayBuffer: data.arrayBuffer, selectedPages: data.pages.map(p => p.originalNum)
                        });
                    }
                }
            }
            
            if (newFiles.length > 0) {
                setSelectedFiles(prev => [...prev, ...newFiles]);
                setCurrentStep('reorder');
            }
        } catch (err) {
            console.error("Error during file processing:", err);
        }
    };

    const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
        onDrop: (acceptedFiles) => {
            processFiles(acceptedFiles);
        },
        accept: { 'application/pdf': ['.pdf'], 'application/zip': ['.zip'] },
        multiple: true
    });

    const handleExecuteMerge = async () => {
        if (selectedFiles.length < 2) return;
        setCurrentStep('merging');
        setProgress(0);
        try {
            const startTime = Date.now();
            const mergedPdf = await PDFDocument.create();
            for (let i = 0; i < selectedFiles.length; i++) {
                const file = selectedFiles[i];
                const donorPdf = await PDFDocument.load(file.arrayBuffer);
                const pagesToCopy = file.selectedPages.map(p => p - 1);
                const copiedPages = await mergedPdf.copyPages(donorPdf, pagesToCopy);
                copiedPages.forEach(p => mergedPdf.addPage(p));
                setProgress(Math.round(((i + 1) / selectedFiles.length) * 100));
            }
            const bytes = await mergedPdf.save();
            const blob = new Blob([bytes], { type: 'application/pdf' });
            const url = URL.createObjectURL(blob);
            const duration = Date.now() - startTime;
            if (duration < 1500) await new Promise(r => setTimeout(r, 1500 - duration));
            setMergedBlobUrl(url);
            setMergedFileName(`merged_${Date.now()}.pdf`);

            // Report activity to backend
            try {
                const totalPages = selectedFiles.reduce((acc, f) => acc + f.selectedPages.length, 0);
                fetch(`http://localhost:8000/api/analytics/record?action=PDF Merge&target=${selectedFiles.length} files&pages=${totalPages}&engine=pdf`, { method: 'POST' })
                    .catch(err => console.warn("Analytics reporting failed:", err));
            } catch (analyticErr) {}

            setCurrentStep('download');
        } catch (error) {
            console.error(error);
            setCurrentStep('reorder');
        }
    };

    const removeFile = (id) => {
        const updated = selectedFiles.filter(f => f.id !== id);
        setSelectedFiles(updated);
        if (updated.length === 0) setCurrentStep('select');
    };

    const resetTool = () => {
        if (mergedBlobUrl) URL.revokeObjectURL(mergedBlobUrl);
        setSelectedFiles([]);
        setCurrentStep('select');
        setMergedBlobUrl(null);
        setProgress(0);
    };

    const formatSize = (bytes) => {
        if (bytes === 0) return '0 B';
        const k = 1024;
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + ['B', 'KB', 'MB', 'GB'][i];
    };

    const renderCurrentStep = () => {
        switch (currentStep) {
            case 'select': return <SelectStep {...{ getRootProps, getInputProps, isDragActive, activeTool, pdfLoading, pdfError, open }} />;
            case 'reorder': return <ReorderStep {...{ selectedFiles, setSelectedFiles, activeTool, getRootProps, getInputProps, removeFile, handleExecuteMerge, formatSize }} />;
            case 'merging': return <MergingStep progress={progress} />;
            case 'download': return <DownloadStep {...{ downloadFinal: () => { const a = document.createElement('a'); a.href = mergedBlobUrl; a.download = mergedFileName; a.click(); }, resetTool, mergedFileName }} />;
            default: return null;
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
            <MergePDFSettings 
                open={toolSettingsOpen} 
                onClose={() => setToolSettingsOpen(false)}
                onApply={handleExecuteMerge}
                onReset={() => {}}
                accentColor={activeTool.color}
                toolName={activeTool.name}
                toolIcon={activeTool.icon}
            />

            <div className="tool-upload-center" style={{ width: '100%', maxWidth: 'none', minHeight: '600px' }}>
                <StepIndicator steps={STEPS} currentStep={currentStep} />
                <div className="w-full flex justify-center mt-12">
                    <AnimatePresence mode="wait">{renderCurrentStep()}</AnimatePresence>
                </div>
            </div>
            <div className="mt-32 border-t border-slate-800/50 pt-32">
                <FAQSection tool="merge" isDarkMode={true} />
            </div>
        </ToolLayout>
    );
};

export default MergePDF;
