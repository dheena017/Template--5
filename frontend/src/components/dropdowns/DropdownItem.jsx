import React from 'react';

const DropdownItem = ({ children, onClick, icon, active = false, className = '', ...props }) => {
  return (
    <button 
      className={`dropdown-item-aura ${active ? 'active' : ''} ${className}`}
      onClick={onClick}
      {...props}
    >
      {icon && <span className="dropdown-item-icon-aura" style={{ display: 'flex' }}>{icon}</span>}
      <span className="dropdown-item-label-aura">{children}</span>
    </button>
  );
};

export default DropdownItem;
