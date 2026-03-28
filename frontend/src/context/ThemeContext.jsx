import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState('dark');
    const [accentColor, setAccentColor] = useState('#8b5cf6');
    const [fontFamily, setFontFamily] = useState('Outfit');
    const [borderRadius, setBorderRadius] = useState('16px');
    const [glassStrength, setGlassStrength] = useState(0.12);
    const [animationsEnabled, setAnimationsEnabled] = useState(false);
    const [neonGlows, setNeonGlows] = useState(false);
    const [noiseOverlay, setNoiseOverlay] = useState(false);
    const [auraBackground, setAuraBackground] = useState(false);

    useEffect(() => {
        const root = document.documentElement;
        
        // Apply Accent Color
        root.style.setProperty('--accent-primary', accentColor);
        root.style.setProperty('--accent-gradient', `linear-gradient(135deg, ${accentColor} 0%, color-mix(in srgb, ${accentColor}, #000 40%) 100%)`);
        
        // Helper to get RGB from Hex for shadows
        const hexToRgb = (hex) => {
          const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
          return result ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` : '139, 92, 246';
        };
        root.style.setProperty('--accent-rgb', hexToRgb(accentColor));
        
        // Apply Border Radius
        root.style.setProperty('--radius-md', borderRadius);
        const brNum = parseInt(borderRadius);
        root.style.setProperty('--radius-sm', `${Math.max(4, brNum - 6)}px`);
        root.style.setProperty('--radius-lg', `${brNum + 8}px`);
        root.style.setProperty('--radius-xl', `${brNum + 16}px`);

        // Apply Font Family
        root.style.setProperty('--font-main', fontFamily);
        document.body.style.fontFamily = fontFamily;

        // Apply Glass Strength
        root.style.setProperty('--glass-opacity', glassStrength);
        root.style.setProperty('--glass-bg', `rgba(20, 21, 29, ${glassStrength})`);

        // Apply Theme Global Class
        document.body.className = theme === 'dark' ? 'dark-theme' : 'light-theme';
        
        // Handle Animations Site-Wide
        if (!animationsEnabled) {
            document.body.classList.add('no-animations');
        } else {
            document.body.classList.remove('no-animations');
        }

        // Apply Advanced Visual Toggles
        document.body.classList.toggle('neon-glows-active', neonGlows);
        document.body.classList.toggle('noise-overlay-active', noiseOverlay);
        document.body.classList.toggle('aura-bg-active', auraBackground);
    }, [theme, accentColor, fontFamily, borderRadius, glassStrength, animationsEnabled, neonGlows, noiseOverlay]);

    return (
        <ThemeContext.Provider value={{
            theme, setTheme,
            accentColor, setAccentColor,
            fontFamily, setFontFamily,
            borderRadius, setBorderRadius,
            glassStrength, setGlassStrength,
            animationsEnabled, setAnimationsEnabled,
            neonGlows, setNeonGlows,
            noiseOverlay, setNoiseOverlay,
            auraBackground, setAuraBackground
        }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);
