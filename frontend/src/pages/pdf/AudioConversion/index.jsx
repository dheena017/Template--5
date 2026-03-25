import React from 'react'
import PDFPages from '../PDFPages'

// Core Audio Conversion Hub
export const AudioConversionHub = () => <PDFPages forcedTab="audio_conversion" />

// Individual Tool Pages
export { default as MP3toWAV } from './MP3toWAV'
export { default as MP3toFLAC } from './MP3toFLAC'
export { default as MP3toAAC } from './MP3toAAC'
export { default as MP3toAC3 } from './MP3toAC3'
export { default as MP3toOGG } from './MP3toOGG'
export { default as WAVtoMP3 } from './WAVtoMP3'
export { default as WAVtoFLAC } from './WAVtoFLAC'
export { default as WAVtoAC3 } from './WAVtoAC3'
export { default as WAVtoOGG } from './WAVtoOGG'
export { default as FLACtoWAV } from './FLACtoWAV'
export { default as FLACtoAAC } from './FLACtoAAC'
export { default as FLACtoAC3 } from './FLACtoAC3'
export { default as FLACtoOGG } from './FLACtoOGG'
export { default as AACtoWAV } from './AACtoWAV'
export { default as AACtoFLAC } from './AACtoFLAC'
export { default as AACtoAC3 } from './AACtoAC3'
export { default as AACtoMP3 } from './AACtoMP3'
export { default as AACtoOGG } from './AACtoOGG'
export { default as AC3toWAV } from './AC3toWAV'
export { default as AC3toFLAC } from './AC3toFLAC'
export { default as AC3toAAC } from './AC3toAAC'
export { default as AC3toMP3 } from './AC3toMP3'
export { default as AC3toOGG } from './AC3toOGG'
export { default as OGGtoWAV } from './OGGtoWAV'
export { default as OGGtoFLAC } from './OGGtoFLAC'
export { default as OGGtoAAC } from './OGGtoAAC'
export { default as OGGtoAC3 } from './OGGtoAC3'
export { default as OGGtoMP3 } from './OGGtoMP3'

export default AudioConversionHub
