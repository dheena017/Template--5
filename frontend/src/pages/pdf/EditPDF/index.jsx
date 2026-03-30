import React from 'react';
import PDFPages from '../PDFPages';

// Global Dashboard
export const EditPDFHub = () => <PDFPages forcedTab="pdf_edit" />;

// Individual Tools
export { default as EditPDFPage } from './EditPDFPage';
export { default as RotatePDF } from './RotatePDF';
export { default as AddPageNumbers } from './AddPageNumbers';
export { default as AddWatermark } from './AddWatermark';
export { default as CropPDF } from './CropPDF';

export default EditPDFHub;
