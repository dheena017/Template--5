import React from 'react'
import PDFPages from '../PDFPages'

export const PDFConversionHub = () => <PDFPages forcedTab="pdf_conversion" />

export { default as PDFToWord } from './PDFToWord'
export { default as PDFToExcel } from './PDFToExcel'
export { default as PDFToPPT } from './PDFToPPT'
export { default as PDFToJPG } from './PDFToJPG'
export { default as PDFCompression } from './PDFCompression'
export { default as PDFToOFD } from './PDFToOFD'
export { default as PDFToLongImage } from './PDFToLongImage'
export { default as PDFToCAD } from './PDFToCAD'
export { default as PDFToEPUB } from './PDFToEPUB'
export { default as PDFToMobi } from './PDFToMobi'
export { default as PDFToAZW3 } from './PDFToAZW3'

export default PDFConversionHub
