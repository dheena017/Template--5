import React from 'react';
import PDFSecurityTool from './PDFSecurityTool';
import { Unlock } from 'lucide-react';

const UnlockPDF = () => (
  <PDFSecurityTool 
    toolName="Unlock PDF" 
    icon={Unlock} 
    description="Remove PDF password security, giving you the freedom to use your PDFs as you want." 
  />
);

export default UnlockPDF;
