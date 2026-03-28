import React, { useState, useRef, useEffect } from 'react';
import '../../styles/dropdowns/BaseDropdown.css';
import '../../styles/dropdowns/SidebarDropdown.css';
import '../../styles/dropdowns/ToolbarDropdown.css';
import '../../styles/dropdowns/PagesDropdown.css';

const Dropdown = ({ trigger, children, className = '', align = 'right', stayOpen = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen && !stayOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, stayOpen]);

  return (
    <div className={`dropdown-container-aura ${className}`} ref={dropdownRef} style={{ position: 'relative', display: 'inline-block' }}>
      <div onClick={() => setIsOpen(!isOpen)} className="dropdown-trigger-wrapper-aura" style={{ cursor: 'pointer' }}>
        {typeof trigger === 'function' ? trigger(isOpen) : trigger}
      </div>
      
      {isOpen && (
        <div className={`dropdown-aura dropdown-menu-aura align-${align}`}>
          {typeof children === 'function' ? children(() => setIsOpen(false)) : children}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
