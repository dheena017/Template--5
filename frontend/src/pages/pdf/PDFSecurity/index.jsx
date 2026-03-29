import React from 'react';
import PDFSecurityTool from './PDFSecurityTool';
import { Lock, Unlock, PenTool, Eraser, GitCompare } from 'lucide-react';

export const ProtectPDF = () => <PDFSecurityTool toolName="Protect PDF" icon={Lock} description="Encrypt your PDF with a password to keep sensitive data confidential." />;
export const UnlockPDF = () => <PDFSecurityTool toolName="Unlock PDF" icon={Unlock} description="Remove PDF password security, giving you the freedom to use your PDFs as you want." />;
export const SignPDF = () => <PDFSecurityTool toolName="Sign PDF" icon={PenTool} description="Sign yourself or request electronic signatures from others." />;
export const RedactPDF = () => <PDFSecurityTool toolName="Redact PDF" icon={Eraser} description="Permanently remove visible text and graphics from a document." />;
export const ComparePDF = () => <PDFSecurityTool toolName="Compare PDF" icon={GitCompare} description="Compare two PDF files and quickly highlight the differences." />;
