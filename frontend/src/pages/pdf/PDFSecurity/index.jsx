import React from 'react';
import PDFPages from '../PDFPages';

// Global Dashboard
export const PDFSecurityHub = () => <PDFPages forcedTab="pdf_security" />;

// Individual Tools
export { default as ProtectPDF } from './ProtectPDF';
export { default as UnlockPDF } from './UnlockPDF';
export { default as SignPDF } from './SignPDF';
export { default as RedactPDF } from './RedactPDF';
export { default as ComparePDF } from './ComparePDF';

export default PDFSecurityHub;
