import React from 'react';
import '../../styles/buttons/BaseButton.css';

const BaseButton = ({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  className = '',
  loading = false,
  disabled = false,
  iconLeft = null,
  iconRight = null,
  fullWidth = false,
  ariaLabel,
  ...props
}) => {
  return (
    <button
      className={`aura-btn aura-btn-${variant} aura-btn-${size}${fullWidth ? ' aura-btn-fullwidth' : ''} ${className}`}
      onClick={onClick}
      disabled={disabled || loading}
      aria-busy={loading}
      aria-label={ariaLabel}
      tabIndex={0}
      {...props}
    >
      <span className="aura-btn-shine"></span>
      {iconLeft && <span className="aura-btn-icon aura-btn-icon-left">{iconLeft}</span>}
      <span className="aura-btn-content">{children}</span>
      {iconRight && <span className="aura-btn-icon aura-btn-icon-right">{iconRight}</span>}
      {loading && (
        <span className="aura-btn-loader" aria-hidden="true"></span>
      )}
    </button>
  );
};

export default BaseButton;
