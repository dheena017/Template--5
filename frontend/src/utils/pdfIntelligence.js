import { createWorker } from 'tesseract.js';

/**
 * Expert Neural OCR Engine
 * Uses Tesseract.js for high-fidelity text extraction and data recognition.
 * Designed to power the PDF Intelligence Hub.
 */
export const PDFIntelligenceService = {
  /**
   * Run OCR on an image file (e.g. from JPG-to-PDF or Scan-to-PDF).
   */
  async runOCR(imageFile, lang = 'eng') {
    const worker = await createWorker(lang);
    const { data: { text } } = await worker.recognize(imageFile);
    await worker.terminate();
    return text;
  },

  /**
   * Summarize OCR results by grabbing key headings and patterns.
   * Note: This is a front-end heuristic. Full AI summary calls the backend.
   */
  summarizeText(text) {
    if (!text) return 'No content to summarize.';
    const lines = text.split('\n').filter(l => l.trim().length > 5);
    const summary = lines.slice(0, 5).join('\n');
    return summary + (lines.length > 5 ? '\n...' : '');
  }
};
