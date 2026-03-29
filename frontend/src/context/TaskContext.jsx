import React, { createContext, useContext, useState, useCallback } from 'react';

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
    const [tasks, setTasks] = useState([]);
    const [recentCompletion, setRecentCompletion] = useState(null); // { toolId, resultUrl, timestamp }

    const addTask = useCallback((task) => {
        setTasks(prev => [...prev, {
            id: task.id || `task-${Date.now()}`,
            name: task.name || 'AI Process',
            status: task.status || 'running', 
            toolId: task.toolId,
            progress: task.progress || 0,
            startTime: Date.now()
        }]);
    }, []);

    const updateTask = useCallback((id, updates) => {
        setTasks(prev => {
            const next = prev.map(t => t.id === id ? { ...t, ...updates } : t);
            // If just finished, set recent
            const task = next.find(t => t.id === id);
            if (task && task.status === 'completed') {
               setRecentCompletion({
                  toolId: task.toolId,
                  name: task.name,
                  timestamp: Date.now()
               });
            }
            return next;
        });
    }, []);

    const removeTask = useCallback((id) => {
        setTasks(prev => prev.filter(t => t.id !== id));
    }, []);

    const clearCompleted = useCallback(() => {
        setTasks(prev => prev.filter(t => t.status === 'running'));
    }, []);

    return (
        <TaskContext.Provider value={{ 
            tasks, addTask, updateTask, removeTask, clearCompleted,
            recentCompletion, setRecentCompletion 
        }}>
            {children}
        </TaskContext.Provider>
    );
};

export const useTasks = () => {
    const context = useContext(TaskContext);
    if (!context) throw new Error('useTasks must be used within a TaskProvider');
    return context;
};
