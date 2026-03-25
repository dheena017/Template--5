import { PDFDocument } from 'pdf-lib';

// Convert PDF to another format (e.g., extract text)
export async function extractTextFromPDF(file) {
  const arrayBuffer = await file.arrayBuffer();
  const pdfDoc = await PDFDocument.load(arrayBuffer);
  let text = '';
  for (let i = 0; i < pdfDoc.getPageCount(); i++) {
    const page = pdfDoc.getPage(i);
    // pdf-lib does not support text extraction; use pdfjs-dist for this
    text += `Page ${i + 1}: [text extraction not supported by pdf-lib]`;
  }
  return text;
}
