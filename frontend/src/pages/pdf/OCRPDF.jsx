import React, { useState, useCallback } from 'react';
import { Scan } from 'lucide-react';
import { useDropzone } from 'react-dropzone';
import { AnimatePresence } from 'framer-motion';
import * as pdfjsLib from 'pdfjs-dist';
import '../../styles/pages/pdf/OrganizePDF.css';

import pdfWorker from 'pdfjs-dist/build/pdf.worker.min.mjs?url';
pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;

// Step Components
import UploadStep from './OCRPDFSteps/UploadStep';
import ConfigStep from './OCRPDFSteps/ConfigStep';
import ResultStep from './OCRPDFSteps/ResultStep';
import OCRHowTo from './OCRPDFSteps/OCRHowTo';

const OCRPDF = () => {
    const [isProcessing, setIsProcessing] = useState(false);
    const [pdfInfo, setPdfInfo] = useState(null);
    const [recognitionMode, setRecognitionMode] = useState('text'); // text, searchable, json
    const [progress, setProgress] = useState(0);
    const [resultData, setResultData] = useState(null);

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
            // Mock OCR Implementation for Frontend Demo
            // In a real scenario, this would send to FastAPI /api/pdf/ocr
            
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
        document.body.appendChild(element); // Required for this to work in FireFox
        element.click();
    };

    return (
        <div className="pdf-tools-wrapper min-h-screen bg-[#0f172a]">
            <main className="pdf-tools-main max-w-6xl mx-auto p-4 md:p-8">
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
            </main>
            
            <OCRHowTo />
        </div>
    );
};

export default OCRPDF;
