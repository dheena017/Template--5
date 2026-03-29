import { useState, useCallback } from 'react';
import * as pdfjsLib from 'pdfjs-dist';
import { PDFDocument } from 'pdf-lib';

import pdfWorker from 'pdfjs-dist/build/pdf.worker.min.mjs?url';
pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;

export const usePDF = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [pdfInfo, setPdfInfo] = useState(null);

    const loadPDF = useCallback(async (file) => {
        setLoading(true);
        setError(null);
        try {
            const arrayBuffer = await file.arrayBuffer();
            
            // Check if password protected using pdf-lib
            try {
                await PDFDocument.load(arrayBuffer);
            } catch (pdfLibErr) {
                if (pdfLibErr.message.includes('encrypted') || pdfLibErr.message.includes('password')) {
                    setError("This PDF is password-protected. Please unlock it before merging.");
                    return null;
                }
            }

            // Load for thumbnail generation
            const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
            const pdf = await loadingTask.promise;
            
            const pages = [];
            console.log("Analyzing PDF with", pdf.numPages, "pages");
            for (let i = 1; i <= pdf.numPages; i++) {
                try {
                    // Only render thumbnail for the first page to speed up the selection process
                    let thumbnail = null;
                    if (i === 1) {
                        const page = await pdf.getPage(i);
                        const viewport = page.getViewport({ scale: 0.3 });
                        const canvas = document.createElement('canvas');
                        const context = canvas.getContext('2d');
                        canvas.width = viewport.width;
                        canvas.height = viewport.height;
                        await page.render({ canvasContext: context, viewport }).promise;
                        thumbnail = canvas.toDataURL();
                    }
                    
                    pages.push({
                        id: `page-${i}-${Date.now()}`,
                        originalNum: i,
                        thumbnail: thumbnail,
                        rotation: 0
                    });
                } catch (pageErr) {
                    console.error(`Error processing page ${i}:`, pageErr);
                    pages.push({ id: `page-${i}-error`, originalNum: i, thumbnail: null, rotation: 0 });
                }
            }

            setPdfInfo({
                name: file.name,
                size: file.size,
                numPages: pdf.numPages,
                pages,
                arrayBuffer
            });
            return { pages, arrayBuffer, name: file.name };
        } catch (err) {
            console.error("PDF Component Error:", err);
            setError("Failed to load PDF. The file may be invalid or its internal structure is unreadable.");
            return null;
        } finally {
            setLoading(false);
        }
    }, []);

    const resetPDF = useCallback(() => {
        setPdfInfo(null);
        setError(null);
        setLoading(false);
    }, []);

    return { loadPDF, resetPDF, loading, error, pdfInfo, setPdfInfo };
};
