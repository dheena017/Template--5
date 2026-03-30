import React from 'react';
import EditPDFTool from './EditPDFTool';
import { PenTool } from 'lucide-react';

const EditPDFPage = () => (
  <EditPDFTool 
    toolName="Edit PDF" 
    icon={PenTool} 
    description="Add text, images, shapes or freehand annotations directly onto your PDF document." 
  />
);

export default EditPDFPage;
