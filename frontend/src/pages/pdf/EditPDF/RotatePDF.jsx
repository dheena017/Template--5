import React from 'react';
import EditPDFTool from './EditPDFTool';
import { RotateCw } from 'lucide-react';

const RotatePDF = () => (
  <EditPDFTool 
    toolName="Rotate PDF" 
    icon={RotateCw} 
    description="Rotate your PDFs exactly as you need them. Rotate multiple PDFs at once." 
  />
);

export default RotatePDF;
