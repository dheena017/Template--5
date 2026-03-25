import React from 'react'
import PDFPages from '../PDFPages'

export const PopularConversionsHub = () => <PDFPages forcedTab="popular_conversions" />

// Highlight unique popular tools
export { default as PPTCompression } from './PPTCompression'
export { default as CAJtoPDF } from './CAJtoPDF'
export { default as OFDtoWord } from './OFDtoWord'
export { default as XPStoWord } from './XPStoWord'
export { default as HWPtoWord } from './HWPtoWord'
export { default as WordToOFD } from './WordToOFD'
export { default as WordMerge } from './WordMerge'
export { default as ExcelMerge } from './ExcelMerge'
export { default as ExcelSplit } from './ExcelSplit'

export default PopularConversionsHub
