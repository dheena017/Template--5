import React from 'react';
import EditPDFTool from './EditPDFTool';
import { Hash } from 'lucide-react';

const AddPageNumbers = () => (
  <EditPDFTool 
    toolName="Add Page Numbers" 
    icon={Hash} 
    description="Add page numbers to your document easily. Choose position, dimensions, and typography." 
  />
);

export default AddPageNumbers;
