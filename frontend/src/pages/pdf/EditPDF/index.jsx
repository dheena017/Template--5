import React from 'react';
import EditPDFTool from './EditPDFTool';
import { PenTool, RotateCw, Hash, Droplet, Crop } from 'lucide-react';

export const EditPDFPage = () => <EditPDFTool toolName="Edit PDF" icon={PenTool} description="Add text, images, shapes or freehand annotations directly onto your PDF document." />;
export const RotatePDF = () => <EditPDFTool toolName="Rotate PDF" icon={RotateCw} description="Rotate your PDFs exactly as you need them. Rotate multiple PDFs at once." />;
export const AddPageNumbers = () => <EditPDFTool toolName="Add Page Numbers" icon={Hash} description="Add page numbers to your document easily. Choose position, dimensions, and typography." />;
export const AddWatermark = () => <EditPDFTool toolName="Add Watermark" icon={Droplet} description="Stamp an image or text over your PDF in seconds. Choose the typography, opacity and position." />;
export const CropPDF = () => <EditPDFTool toolName="Crop PDF" icon={Crop} description="Trim PDF margins, change PDF page size and crop documents instantly." />;
