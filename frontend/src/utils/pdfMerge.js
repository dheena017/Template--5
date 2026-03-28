import { PDFDocument } from 'pdf-lib';

/**
 * Expert PDF Merge Function (Client-Side)
 * 
 * Merges multiple PDF File objects into a single document entirely in the browser.
 * Uses pdf-lib for privacy-first, high-performance manipulation.
 * 
 * @param {File[]} files - An ordered array of browser File objects to merge.
 * @param {Object} options - Configuration options.
 * @param {Function} options.onProgress - Optional callback(current, total) for UI progress bars.
 * @param {boolean} options.ignoreCorrupted - If true, skips files that fail to load instead of throwing.
 * @returns {Promise<Blob>} - Combined PDF as a downloadable Blob.
 */
export async function mergePDFs(files, options = {}) {
    const { onProgress, ignoreCorrupted = false, pageOrders = [] } = options;
    const totalFiles = files.length;
    
    // 1. Initialize the master document
    const mergedPdf = await PDFDocument.create();
    
    // Metadata can be customized for SEO and identification
    mergedPdf.setTitle('Merged Document');
    mergedPdf.setCreator('Aura PDF Studio');
    mergedPdf.setSubject('Combined PDF generated client-side');
    
    // 2. Process each file in the provided order
    for (let i = 0; i < totalFiles; i++) {
        const file = files[i];
        
        // Progress update before starting each file
        if (onProgress) onProgress(i, totalFiles);
        
        try {
            // Basic validation
            if (file.type !== 'application/pdf' && !file.name.toLowerCase().endsWith('.pdf')) {
                throw new Error(`Invalid file type: ${file.name} is not a PDF.`);
            }

            // Read file into memory as an ArrayBuffer
            const arrayBuffer = await file.arrayBuffer();
            
            // 3. Load the source document
            const pdf = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });
            
            // Determine which pages to copy and in what order
            // If pageOrders[i] is provided (e.g. [2, 0, 1]), only those pages are pulled in that order
            const targetIndices = (pageOrders[i] && pageOrders[i].length > 0)
                ? pageOrders[i]
                : pdf.getPageIndices();
            
            // 4. Extract pages from the source
            const copiedPages = await mergedPdf.copyPages(pdf, targetIndices);
            
            // 5. Add them to the master document
            copiedPages.forEach((page) => {
                mergedPdf.addPage(page);
            });
            
        } catch (error) {
            console.error(`[PDF Service] Error processing ${file.name}:`, error.message);
            if (!ignoreCorrupted) {
                throw new Error(`Failed to process "${file.name}". The file might be corrupted or password protected.`);
            }
        }
    }
    
    // Final progress update
    if (onProgress) onProgress(totalFiles, totalFiles);

    // 6. Serialize the PDF to U8Array
    // save() optimizes the document structure
    const mergedPdfBytes = await mergedPdf.save();
    
    // 7. Convert to Blob for easy browser download/preview
    return new Blob([mergedPdfBytes], { type: 'application/pdf' });
}

/**
 * Utility to trigger a browser download of a PDF Blob
 * @param {Blob} blob - The PDF data.
 * @param {string} filename - Desired name for the download.
 */
export function downloadBlob(blob, filename = 'merged.pdf') {
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    
    // Cleanup to prevent memory leaks
    setTimeout(() => {
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }, 100);
}
