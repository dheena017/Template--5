import React from 'react';
import PDFPages from '../PDFPages';

// Global Dashboard
export const OfficeToolsHub = () => <PDFPages forcedTab="office_tools" />;

// Individual Tools
export { default as WordMerge } from './WordMerge';
export { default as ExcelMerge } from './ExcelMerge';
export { default as ExcelSplit } from './ExcelSplit';
export { default as WordCompress } from './WordCompress';
export { default as PptCompress } from './PptCompress';
export { default as ImgCompress } from './ImgCompress';

export default OfficeToolsHub;
