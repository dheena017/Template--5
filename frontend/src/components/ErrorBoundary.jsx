import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, RefreshCw, Home, Terminal, Shield } from 'lucide-react';
import '../styles/components/ErrorBoundary.css';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            hasError: false, 
            error: null,
            technicalId: Math.random().toString(36).substring(2, 10).toUpperCase(),
            sessionId: `AURA-${Date.now().toString().slice(-6)}`
        };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.error("Critical Render Error Captured:", error, errorInfo);
    }

    handleReset = () => {
        this.setState({ hasError: false, error: null });
        window.location.href = '/';
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="error-fallback-container">
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, type: 'spring' }}
                        className="error-card"
                    >
                        <div className="error-icon-wrapper">
                            <AlertTriangle size={80} className="glitch-icon" />
                        </div>
                        
                        <h1>System Interruption</h1>
                        <p>An unexpected error occurred within the Aura Engine. We've captured the technical details and our team is monitoring the stability.</p>
                        
                        <div className="tech-details-v2">
                           <div className="tech-row">
                             <label><Terminal size={12} /> Support ID</label>
                             <span>{this.state.technicalId}</span>
                           </div>
                           <div className="tech-row">
                             <label><Shield size={12} /> Session Token</label>
                             <span>{this.state.sessionId}</span>
                           </div>
                        </div>

                        <div className="error-actions">
                            <motion.button 
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="recovery-btn" 
                                onClick={this.handleReset}
                            >
                                <RefreshCw size={22} />
                                Try Recovery
                            </motion.button>
                            <motion.button 
                                whileHover={{ background: 'rgba(255,255,255,0.1)' }}
                                className="restart-btn" 
                                onClick={() => window.location.reload()}
                            >
                                <Home size={22} />
                                Restart Hub
                            </motion.button>
                        </div>
                    </motion.div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
