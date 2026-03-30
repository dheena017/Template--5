import React from 'react';
import PDFSecurityTool from './PDFSecurityTool';
import { Lock } from 'lucide-react';

const ProtectPDF = () => (
  <PDFSecurityTool 
    toolName="Protect PDF" 
    icon={Lock} 
    description="Encrypt your PDF with a password to keep sensitive data confidential." 
  />
);

export default ProtectPDF;
