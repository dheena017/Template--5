import React from 'react';
import PDFPages from '../PDFPages';

// Global Dashboard
export const EbookConversionHub = () => <PDFPages forcedTab="ebook_conversion" />;

// Individual Tools
export { default as EpubToPdf } from './EpubToPdf';
export { default as EpubToMobi } from './EpubToMobi';
export { default as EpubToAzw3 } from './EpubToAzw3';
export { default as MobiToPdf } from './MobiToPdf';
export { default as MobiToEpub } from './MobiToEpub';
export { default as MobiToAzw3 } from './MobiToAzw3';
export { default as PdfToEpub } from './PdfToEpub';
export { default as PdfToMobi } from './PdfToMobi';
export { default as PdfToAzw3 } from './PdfToAzw3';
export { default as Azw3ToPdf } from './Azw3ToPdf';
export { default as Azw3ToEpub } from './Azw3ToEpub';
export { default as Azw3ToMobi } from './Azw3ToMobi';

export default EbookConversionHub;
