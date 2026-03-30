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
    const [trayOpen, setTrayOpen] = useState(false);

    const toggleApp = () => {
        if (!appSettingsOpen) {
            setToolSettingsOpen(false);
            setTrayOpen(false);
        }
        setAppSettingsOpen(v => !v);
    };

    const toggleTool = () => {
        if (!toolSettingsOpen) {
            setAppSettingsOpen(false);
            setTrayOpen(false);
        }
        setToolSettingsOpen(v => !v);
    };

    const toggleTray = () => {
        if (!trayOpen) {
            setAppSettingsOpen(false);
            setToolSettingsOpen(false);
        }
        setTrayOpen(v => !v);
    };

    const closeAll = () => { 
        setAppSettingsOpen(false); 
        setToolSettingsOpen(false); 
        setTrayOpen(false); 
    };

    return (
        <SettingsContext.Provider value={{
            appSettingsOpen, setAppSettingsOpen, toggleApp,
            toolSettingsOpen, setToolSettingsOpen, toggleTool,
            trayOpen, setTrayOpen, toggleTray,
            closeAll
        }}>
            {children}
        </SettingsContext.Provider>
    );
};
