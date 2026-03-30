import React from 'react';
import EditPDFTool from './EditPDFTool';
import { Droplet } from 'lucide-react';

const AddWatermark = () => (
  <EditPDFTool 
    toolName="Add Watermark" 
    icon={Droplet} 
    description="Stamp an image or text over your PDF in seconds. Choose the typography, opacity and position." 
  />
);

export default AddWatermark;
