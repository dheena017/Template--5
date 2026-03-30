import React from 'react';
import PDFSecurityTool from './PDFSecurityTool';
import { GitCompare } from 'lucide-react';

const ComparePDF = () => (
  <PDFSecurityTool 
    toolName="Compare PDF" 
    icon={GitCompare} 
    description="Compare two PDF files and quickly highlight the differences." 
  />
);

export default ComparePDF;
