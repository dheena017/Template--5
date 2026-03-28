import React from 'react';
import './Toggle.css';

const Toggle = ({ checked, onChange, onLabel = "ON", offLabel = "OFF" }) => {
  return (
    <div 
      className={`aura-toggle ${checked ? 'on' : 'off'}`}
      onClick={() => onChange?.(!checked)}
    >
      <span className="aura-toggle-text-on">{onLabel}</span>
      <span className="aura-toggle-text-off">{offLabel}</span>
      <div className="aura-toggle-thumb" />
    </div>
  );
};

export default Toggle;
