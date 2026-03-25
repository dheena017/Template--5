import { PDFDocument } from 'pdf-lib';

// Compress a PDF file (by reducing image quality)
export async function compressPDF(file) {
  const arrayBuffer = await file.arrayBuffer();
  const pdfDoc = await PDFDocument.load(arrayBuffer);
  // pdf-lib does not support image compression directly, but you can remove metadata and unused objects
  pdfDoc.setTitle('Compressed PDF');
  // For real compression, use a backend or a more advanced library
  const compressedPdfBytes = await pdfDoc.save({ useObjectStreams: true });
  return compressedPdfBytes;
}
