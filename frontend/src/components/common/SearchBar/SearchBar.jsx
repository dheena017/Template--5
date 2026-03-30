import React, { useState } from 'react';
import { Search, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../../context/ThemeContext';
import './SearchBar.css';


/**
 * SearchBar Component
 * A premium, animated search bar based on the Aura Design System.
 * Features a glowing border, smooth micro-animations, and glassmorphic styling.
 */
const SearchBar = ({ 
  placeholder = "Search organization tool...", 
  onSearch, 
  className = "" 
}) => {
  const { 
    accentColor, 
    fontFamily, 
    animationsEnabled, 
    neonGlows, 
    glassStrength,
    borderRadius 
  } = useTheme();

  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleClear = () => {
    setQuery('');
    if (onSearch) onSearch('');
  };

  const handleChange = (e) => {
    const val = e.target.value;
    setQuery(val);
    if (onSearch) onSearch(val);
  };

  // Helper to get RGB from Hex for shadows
  const hexToRgb = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` : '255, 82, 82';
  };

  const accentRgb = hexToRgb(accentColor);

  return (

    <div className={`aura-search-outer-container ${className}`}>
      <motion.div 
        className={`aura-search-pill ${isFocused ? 'focused' : ''}`}
        initial={animationsEnabled ? { opacity: 0, y: -10 } : { opacity: 1, y: 0 }}
        animate={{ opacity: 1, y: 0 }}
        transition={animationsEnabled ? { duration: 0.5, ease: [0.16, 1, 0.3, 1] } : { duration: 0 }}
        style={{ 
          fontFamily: fontFamily,
          borderRadius: borderRadius || '32px',
          backgroundColor: `rgba(20, 21, 29, ${glassStrength})`
        }}
      >
        <div className="aura-search-inner">
          <motion.div 
            className="search-icon-wrapper"
            animate={{ 
              color: isFocused ? accentColor : 'rgba(255, 255, 255, 0.4)',
              scale: isFocused && animationsEnabled ? 1.1 : 1
            }}
            transition={animationsEnabled ? { duration: 0.3 } : { duration: 0 }}
          >

            <Search size={18} strokeWidth={2.5} />
          </motion.div>

          <input
            type="text"
            className="aura-search-input"
            value={query}
            onChange={handleChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder={placeholder || 'Quick search...'}
            aria-label="Quick search"
          />

          <AnimatePresence>
            {query && (
              <motion.button
                className="aura-search-clear"
                onClick={handleClear}
                initial={animationsEnabled ? { opacity: 0, scale: 0.8 } : { opacity: 1, scale: 1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={animationsEnabled ? { opacity: 0, scale: 0.8 } : { opacity: 0 }}
                whileHover={animationsEnabled ? { scale: 1.1 } : {}}
                whileTap={animationsEnabled ? { scale: 0.9 } : {}}
                transition={animationsEnabled ? { duration: 0.2 } : { duration: 0 }}
              >
                <X size={14} strokeWidth={3} />
              </motion.button>
            )}
          </AnimatePresence>

        </div>

        {/* Animated Glow Border */}
        {neonGlows && (
          <motion.div 
            className="aura-search-glow"
            animate={{
              opacity: isFocused ? 1 : 0.4,
              boxShadow: isFocused 
                ? `0 0 15px rgba(${accentRgb}, 0.3), inset 0 0 10px rgba(${accentRgb}, 0.2)` 
                : `0 0 0px rgba(${accentRgb}, 0), inset 0 0 0px rgba(${accentRgb}, 0)`
            }}
            transition={animationsEnabled ? { duration: 0.3 } : { duration: 0 }}
            style={{ 
              borderRadius: borderRadius || '32px',
              border: isFocused ? `1.5px solid ${accentColor}` : '1.5px solid rgba(255, 255, 255, 0.1)'
            }}
          />
        )}

      </motion.div>
    </div>
  );
};

export default SearchBar;
