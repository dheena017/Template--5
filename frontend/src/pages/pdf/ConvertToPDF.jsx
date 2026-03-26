import React from 'react';
import PDFTools from '../../components/PDFTools';

const ConvertToPDF = () => {
    return (
        <div className="pdf-page-container">
            <PDFTools initialView="convert-to-pdf" />
        </div>
    );
};

export default ConvertToPDF;
