import React from 'react';
import PDFSecurityTool from './PDFSecurityTool';
import { PenTool } from 'lucide-react';

const SignPDF = () => (
  <PDFSecurityTool 
    toolName="Sign PDF" 
    icon={PenTool} 
    description="Sign yourself or request electronic signatures from others." 
  />
);

export default SignPDF;
