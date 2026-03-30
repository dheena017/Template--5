import React from 'react';
import PDFSecurityTool from './PDFSecurityTool';
import { Eraser } from 'lucide-react';

const RedactPDF = () => (
  <PDFSecurityTool 
    toolName="Redact PDF" 
    icon={Eraser} 
    description="Permanently remove visible text and graphics from a document." 
  />
);

export default RedactPDF;
