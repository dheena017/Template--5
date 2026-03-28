import * as pdfjsLib from 'pdfjs-dist';

// Expert Text Extraction Service
export async function extractTextFromPDF(file) {
  const arrayBuffer = await file.arrayBuffer();
  // Using the built-in loader for pdfjs-dist
  const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
  const pdfDoc = await loadingTask.promise;
  
  let fullText = '';
  const numPages = pdfDoc.numPages;

  console.log(`[PDF-Convert] Extracting high-fidelity text from ${numPages} pages...`);

  for (let i = 1; i <= numPages; i++) {
    const page = await pdfDoc.getPage(i);
    const textContent = await page.getTextContent();
    const pageText = textContent.items.map(item => item.str).join(' ');
    fullText += `--- Page ${i} ---\n${pageText}\n\n`;
  }

  return fullText;
}
