import EbookConversionTool from './EbookConversionTool';
import './EbookConversionTool.css';

// EPUB → others
export const EpubToPdf  = () => <EbookConversionTool fromFormat="epub" toFormat="pdf"  />;
export const EpubToMobi = () => <EbookConversionTool fromFormat="epub" toFormat="mobi" />;
export const EpubToAzw3 = () => <EbookConversionTool fromFormat="epub" toFormat="azw3" />;

// MOBI → others
export const MobiToPdf  = () => <EbookConversionTool fromFormat="mobi" toFormat="pdf"  />;
export const MobiToEpub = () => <EbookConversionTool fromFormat="mobi" toFormat="epub" />;
export const MobiToAzw3 = () => <EbookConversionTool fromFormat="mobi" toFormat="azw3" />;

// PDF → eBooks
export const PdfToEpub  = () => <EbookConversionTool fromFormat="pdf"  toFormat="epub" />;
export const PdfToMobi  = () => <EbookConversionTool fromFormat="pdf"  toFormat="mobi" />;
export const PdfToAzw3  = () => <EbookConversionTool fromFormat="pdf"  toFormat="azw3" />;

// AZW3 → others
export const Azw3ToPdf  = () => <EbookConversionTool fromFormat="azw3" toFormat="pdf"  />;
export const Azw3ToEpub = () => <EbookConversionTool fromFormat="azw3" toFormat="epub" />;
export const Azw3ToMobi = () => <EbookConversionTool fromFormat="azw3" toFormat="mobi" />;
