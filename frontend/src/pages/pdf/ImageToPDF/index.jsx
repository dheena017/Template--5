import React from 'react'
import PDFPages from '../PDFPages'

export const ImageToPDFHub = () => <PDFPages forcedTab="image_to_pdf" />

export { default as BatchImageToPDF } from './BatchImageToPDF'
export { default as SingleImageToPDFBatch } from './SingleImageToPDFBatch'
export { default as MultiplePicturesToPDFBatch } from './MultiplePicturesToPDFBatch'
export { default as BatchJPGToPDF } from './BatchJPGToPDF'
export { default as BatchPNGToPDF } from './BatchPNGToPDF'

export default ImageToPDFHub
