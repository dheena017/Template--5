import React from 'react';
import EditPDFTool from './EditPDFTool';
import { Crop } from 'lucide-react';

const CropPDF = () => (
  <EditPDFTool 
    toolName="Crop PDF" 
    icon={Crop} 
    description="Trim PDF margins, change PDF page size and crop documents instantly." 
  />
);

export default CropPDF;
