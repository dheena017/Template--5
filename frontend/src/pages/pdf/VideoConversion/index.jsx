import React from 'react'
import PDFPages from '../PDFPages'

// Core Video Conversion Hub
export const VideoConversionHub = () => <PDFPages forcedTab="video_conversion" />

// Individual Tool Pages
export { default as AVItoMP4 } from './AVItoMP4'
export { default as AVItoMOV } from './AVItoMOV'
export { default as AVItoWMV } from './AVItoWMV'
export { default as AVItoMKV } from './AVItoMKV'
export { default as MP4toAVI } from './MP4toAVI'
export { default as MP4toMOV } from './MP4toMOV'
export { default as MP4toWMV } from './MP4toWMV'
export { default as MP4toMKV } from './MP4toMKV'
export { default as MOVtoMP4 } from './MOVtoMP4'
export { default as MOVtoAVI } from './MOVtoAVI'
export { default as MOVtoWMV } from './MOVtoWMV'
export { default as MOVtoMKV } from './MOVtoMKV'
export { default as WMVtoMP4 } from './WMVtoMP4'
export { default as WMVtoAVI } from './WMVtoAVI'
export { default as WMVtoMKV } from './WMVtoMKV'
export { default as MKVtoMP4 } from './MKVtoMP4'
export { default as MKVtoMOV } from './MKVtoMOV'
export { default as MKVtoWMV } from './MKVtoWMV'
export { default as MKVtoAVI } from './MKVtoAVI'

export default VideoConversionHub
