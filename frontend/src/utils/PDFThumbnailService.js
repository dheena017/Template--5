import * as pdfjs from 'pdfjs-dist';

// Configure the worker for pdfjs-dist
// The worker is required for rendering PDFs in the browser
import pdfWorker from 'pdfjs-dist/build/pdf.worker.min.mjs?url';
pdfjs.GlobalWorkerOptions.workerSrc = pdfWorker;

/**
 * Thumbnail Generation Service
 * Captures the first page of a PDF as a high-quality data URL.
 */
export const PDFThumbnailService = {
  /**
   * Generates a thumbnail for a given PDF File object
   * @param {File} file - The PDF File object
   * @param {number} scale - Rendering scale (defaults to 0.4 for standard thumbnails)
   * @returns {Promise<string>} - Base64 Image Data URL
   */
  async generate(file, scale = 0.4) {
    try {
      const arrayBuffer = await file.arrayBuffer();
      const loadingTask = pdfjs.getDocument({ data: arrayBuffer });
      const pdf = await loadingTask.promise;
      
      // Select the first page
      const page = await pdf.getPage(1);
      
      // Set up canvas for rendering
      const viewport = page.getViewport({ scale });
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      canvas.height = viewport.height;
      canvas.width = viewport.width;

      const renderContext = {
        canvasContext: context,
        viewport: viewport,
      };

      // Perform the render
      await page.render(renderContext).promise;
      
      // Convert to efficient WEBP or PNG
      return canvas.toDataURL('image/webp', 0.8);
    } catch (error) {
      console.error('[Thumbnail Service] Failed to generate preview:', error.message);
      return null; // Return null if thumbnailing fails (will show fallback icon)
    }
  }
};
