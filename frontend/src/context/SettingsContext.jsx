import React, { createContext, useContext, useState } from 'react';

const SettingsContext = createContext();

export const useSettings = () => {
    const context = useContext(SettingsContext);
    if (!context) throw new Error('useSettings must be used within SettingsProvider');
    return context;
};

export const SettingsProvider = ({ children }) => {
    const [appSettingsOpen, setAppSettingsOpen] = useState(false);
    const [toolSettingsOpen, setToolSettingsOpen] = useState(false);

    const toggleApp = () => setAppSettingsOpen(v => !v);
    const toggleTool = () => setToolSettingsOpen(v => !v);
    const closeAll = () => { setAppSettingsOpen(false); setToolSettingsOpen(false); };

    return (
        <SettingsContext.Provider value={{
            appSettingsOpen, setAppSettingsOpen, toggleApp,
            toolSettingsOpen, setToolSettingsOpen, toggleTool,
            closeAll
        }}>
            {children}
        </SettingsContext.Provider>
    );
};
