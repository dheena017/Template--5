import React, { createContext, useContext, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, AlertCircle, CheckCircle, Info, ShieldAlert } from 'lucide-react';

const NotificationContext = createContext();

export const useNotifications = () => {
    const context = useContext(NotificationContext);
    if (!context) throw new Error('useNotifications must be used within NotificationProvider');
    return context;
};

export const NotificationProvider = ({ children }) => {
    const [notifications, setNotifications] = useState([]);

    const addNotification = useCallback((type, message, duration = 5000) => {
        const id = Date.now();
        setNotifications(prev => [...prev, { id, type, message }]);
        setTimeout(() => {
            setNotifications(prev => prev.filter(n => n.id !== id));
        }, duration);
    }, []);

    const notify = {
        error: (msg) => addNotification('error', msg),
        success: (msg) => addNotification('success', msg),
        info: (msg) => addNotification('info', msg),
        warning: (msg) => addNotification('warning', msg),
    };

    return (
        <NotificationContext.Provider value={notify}>
            {children}
            <div className="notification-toast-container">
                <AnimatePresence>
                    {notifications.map(n => (
                        <motion.div
                            key={n.id}
                            initial={{ opacity: 0, x: 50, scale: 0.9 }}
                            animate={{ opacity: 1, x: 0, scale: 1 }}
                            exit={{ opacity: 0, x: 20, scale: 0.95 }}
                            className={`toast-aura toast-${n.type}`}
                        >
                            <div className="toast-icon">
                                {n.type === 'error' && <ShieldAlert size={20} />}
                                {n.type === 'success' && <CheckCircle size={20} />}
                                {n.type === 'warning' && <AlertCircle size={20} />}
                                {n.type === 'info' && <Info size={20} />}
                            </div>
                            <div className="toast-content">
                                <span className="toast-type-label">{n.type} Signal</span>
                                <p className="toast-message">{n.message}</p>
                            </div>
                            <button 
                                className="toast-close" 
                                onClick={() => setNotifications(prev => prev.filter(item => item.id !== n.id))}
                            >
                                <X size={14} />
                            </button>
                            <div className="toast-progress-bar" />
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </NotificationContext.Provider>
    );
};
