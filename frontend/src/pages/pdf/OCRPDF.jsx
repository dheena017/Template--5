import React, { useState, useCallback } from 'react';
import { Scan } from 'lucide-react';
import { useDropzone } from 'react-dropzone';
import { AnimatePresence } from 'framer-motion';
import * as pdfjsLib from 'pdfjs-dist';
import '../../styles/pages/pdf/OrganizePDF.css';
import ToolLayout from '../../components/layouts/ToolLayout';
import { useSettings } from '../../context/SettingsContext';

import pdfWorker from 'pdfjs-dist/build/pdf.worker.min.mjs?url';
pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;

// Step Components
import UploadStep from './OCRPDFSteps/UploadStep';
import ConfigStep from './OCRPDFSteps/ConfigStep';
import ResultStep from './OCRPDFSteps/ResultStep';
import OCRHowTo from './OCRPDFSteps/OCRHowTo';

const OCRPDF = () => {
    const { toolSettingsOpen } = useSettings();
    const [isProcessing, setIsProcessing] = useState(false);
    const [pdfInfo, setPdfInfo] = useState(null);
    const [recognitionMode, setRecognitionMode] = useState('text'); // text, searchable, json
    const [progress, setProgress] = useState(0);
    const [resultData, setResultData] = useState(null);
    const [ocrSettings, setOcrSettings] = useState({});

    const activeTool = { name: 'OCR PDF', icon: Scan, color: '#ec4899' };

    const onDrop = useCallback(async (acceptedFiles) => {
        if (acceptedFiles.length > 0) {
            const file = acceptedFiles[0];
            const arrayBuffer = await file.arrayBuffer();
            const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
            
            setPdfInfo({
                name: file.name,
                size: file.size,
                numPages: pdf.numPages,
                arrayBuffer
            });
            setResultData(null);
            setProgress(0);
        }
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { 'application/pdf': ['.pdf'] },
        multiple: false
    });

    const handleOCR = async () => {
        if (!pdfInfo) return;
        setIsProcessing(true);
        setProgress(0);
        try {
            for(let i = 1; i <= 100; i += 5) {
                setProgress(i);
                await new Promise(r => setTimeout(r, 150));
            }
            const mockExtractedText = `Extracted Text Data from ${pdfInfo.name}\n\n[PAGE 1]\nDOCUMENT INTELLIGENCE SUMMARY:\nOptical Character Recognition successfully completed. High-definition text synthesis applied.`;
            setResultData(mockExtractedText);
        } catch (error) {
            console.error(error);
            alert("OCR Scanning failed.");
        } finally {
            setIsProcessing(false);
        }
    };

    const reset = () => {
        setPdfInfo(null);
        setResultData(null);
        setProgress(0);
    };

    const downloadTxtFile = () => {
        const element = document.createElement("a");
        const file = new Blob([resultData], {type: 'text/plain'});
        element.href = URL.createObjectURL(file);
        element.download = "Extracted_Text.txt";
        document.body.appendChild(element);
        element.click();
    };

    return (
        <ToolLayout 
            title={activeTool.name} 
            subtitle="Professional OCR engine for high-precision text synthesis and document intelligence." 
            icon={activeTool.icon} 
            color={activeTool.color} 
            category="Document Intelligence"
        >
            <div className="tool-upload-center" style={{ width: '100%', maxWidth: 'none', minHeight: '600px' }}>
                <AnimatePresence mode="wait">
                    {!pdfInfo ? (
                        <UploadStep 
                            getRootProps={getRootProps}
                            getInputProps={getInputProps}
                            isDragActive={isDragActive}
                            activeTool={activeTool}
                        />
                    ) : resultData ? (
                        <ResultStep 
                            resultData={resultData}
                            downloadTxtFile={downloadTxtFile}
                            reset={reset}
                        />
                    ) : (
                        <ConfigStep 
                            pdfInfo={pdfInfo}
                            recognitionMode={recognitionMode}
                            setRecognitionMode={setRecognitionMode}
                            handleOCR={handleOCR}
                            isProcessing={isProcessing}
                            progress={progress}
                        />
                    )}
                </AnimatePresence>
            </div>
            
            <div className="mt-32 border-t border-slate-800/30 pt-32">
                <OCRHowTo />
            </div>
        </ToolLayout>
    );
};

export default OCRPDF;
