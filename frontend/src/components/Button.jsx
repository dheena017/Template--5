import React from 'react';
import '../styles/Button.css';

const Button = ({ children, onClick, variant = 'primary', size = 'md', className = '', ...props }) => {
  return (
    <button 
      className={`aura-btn aura-btn-${variant} aura-btn-${size} ${className}`}
      onClick={onClick}
      {...props}
    >
      <span className="aura-btn-shine"></span>
      <span className="aura-btn-content">{children}</span>
    </button>
  );
};

export default Button;
