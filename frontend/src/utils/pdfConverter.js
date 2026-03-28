import { jsPDF } from 'jspdf';
import * as XLSX from 'xlsx';
import mammoth from 'mammoth';

/**
 * Universal PDF Conversion Suite
 * Powers Word, Excel, and Image to PDF first-class document tools.
 */
export const PDFConverterService = {
  /**
   * Convert Word (.docx) ArrayBuffer to PDF Blob.
   */
  async wordToPDF(arrayBuffer) {
    const { value: html } = await mammoth.convertToHtml({ arrayBuffer });
    const doc = new jsPDF();
    doc.html(html, {
      callback: (doc) => {
        return new Blob([doc.output('arraybuffer')], { type: 'application/pdf' });
      },
      x: 10,
      y: 10
    });
  },

  /**
   * Convert Excel (.xlsx) to PDF by taking the first sheet.
   */
  async excelToPDF(arrayBuffer) {
    const wb = XLSX.read(arrayBuffer, { type: 'array' });
    const ws = wb.Sheets[wb.SheetNames[0]];
    const csv = XLSX.utils.sheet_to_csv(ws);
    
    const doc = new jsPDF();
    doc.text(csv, 10, 10);
    const bytes = doc.output('arraybuffer');
    return new Blob([bytes], { type: 'application/pdf' });
  },

  /**
   * Quick Image to PDF (JPG/PNG).
   */
  async imageToPDF(imageDataUrl, filename = 'image.pdf') {
    const doc = new jsPDF();
    const props = doc.getImageProperties(imageDataUrl);
    const width = doc.internal.pageSize.getWidth();
    const height = (props.height * width) / props.width;
    doc.addImage(imageDataUrl, 'JPEG', 0, 0, width, height);
    const bytes = doc.output('arraybuffer');
    return new Blob([bytes], { type: 'application/pdf' });
  }
};
