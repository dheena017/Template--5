import { useState, useCallback } from 'react';
import * as pdfjsLib from 'pdfjs-dist';
import { PDFDocument } from 'pdf-lib';

// Set up pdfjs worker
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
            const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
            
            const pages = [];
            for (let i = 1; i <= pdf.numPages; i++) {
                const page = await pdf.getPage(i);
                const viewport = page.getViewport({ scale: 0.3 });
                const canvas = document.createElement('canvas');
                const context = canvas.getContext('2d');
                canvas.width = viewport.width;
                canvas.height = viewport.height;
                await page.render({ canvasContext: context, viewport }).promise;
                
                pages.push({
                    id: `page-${i}-${Date.now()}`,
                    originalNum: i,
                    thumbnail: canvas.toDataURL(),
                    rotation: 0
                });
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
            console.error("PDF Load Error:", err);
            setError("Failed to load PDF. It might be corrupted or password-protected.");
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
