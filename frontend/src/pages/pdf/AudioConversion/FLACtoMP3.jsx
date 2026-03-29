import React from 'react';
import AudioConversionTool from './AudioConversionTool';

const FLACtoMP3 = () => {
    return (
        <AudioConversionTool 
            fromFormat="FLAC" 
            toFormat="MP3" 
            title="Convert FLAC to MP3"
            description="Extract high-quality MP3 audio from lossless FLAC files."
        />
    );
};

export default FLACtoMP3;
