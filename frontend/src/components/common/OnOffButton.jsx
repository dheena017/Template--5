import React from 'react';
import './OnOffButton.css';

const OnOffButton = ({ checked, onChange, onLabel = "ON", offLabel = "OFF" }) => {
  return (
    <div 
      className={`aura-onoff-btn ${checked ? 'on' : 'off'}`}
      onClick={() => onChange?.(!checked)}
    >
      <div className="aura-onoff-track">
        <span className="aura-onoff-text-on">{onLabel}</span>
        <span className="aura-onoff-text-off">{offLabel}</span>
        <div className="aura-onoff-thumb" />
      </div>
    </div>
  );
};

export default OnOffButton;
