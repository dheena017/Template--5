import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, RefreshCw, Home, Terminal, Shield, Download } from 'lucide-react';
import '../styles/components/ErrorBoundary.css';

const ERROR_REPORTING_ENABLED = String(import.meta.env.VITE_ERROR_REPORTING ?? 'true').toLowerCase() !== 'false';
const ERROR_REPORT_ENDPOINT = import.meta.env.VITE_ERROR_REPORT_ENDPOINT || '/api/client-errors';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false,
            error: null,
            errorInfo: null,
            showDiagnostics: false,
            copyStatus: 'Copy Diagnostics',
            summaryCopyStatus: 'Copy Summary',
            downloadStatus: 'Download Report',
            reportStatus: ERROR_REPORTING_ENABLED ? 'Queued' : 'Disabled',
            technicalId: Math.random().toString(36).substring(2, 10).toUpperCase(),
            sessionId: `AURA-${Date.now().toString().slice(-6)}`
        };
    }

    static getDerivedStateFromError(error) {
        return {
            hasError: true,
            error,
            showDiagnostics: false,
            copyStatus: 'Copy Diagnostics',
            summaryCopyStatus: 'Copy Summary',
            downloadStatus: 'Download Report',
            reportStatus: ERROR_REPORTING_ENABLED ? 'Queued' : 'Disabled'
        };
    }

    componentDidCatch(error, errorInfo) {
        this.setState({ errorInfo });
        console.error('Critical Render Error Captured:', error, errorInfo);
        if (ERROR_REPORTING_ENABLED) {
            void this.reportError(error, errorInfo);
        }
    }

    handleReset = () => {
        this.setState({
            hasError: false,
            error: null,
            errorInfo: null,
            showDiagnostics: false,
            copyStatus: 'Copy Diagnostics',
            summaryCopyStatus: 'Copy Summary',
            downloadStatus: 'Download Report',
            reportStatus: ERROR_REPORTING_ENABLED ? 'Queued' : 'Disabled'
        });
        window.location.href = '/';
    }

    toggleDiagnostics = () => {
        this.setState((prevState) => ({ showDiagnostics: !prevState.showDiagnostics }));
    }

    buildDiagnosticText = () => {
        const { error, errorInfo, technicalId, sessionId } = this.state;
        const parts = [
            `Support ID: ${technicalId}`,
            `Session Token: ${sessionId}`,
            `Error Name: ${error?.name || 'UnknownError'}`,
            `Error Message: ${error?.message || 'No message provided'}`,
            `Timestamp: ${new Date().toISOString()}`,
            `Route: ${window?.location?.pathname || '/'}`,
            `URL: ${window?.location?.href || 'n/a'}`,
            `User Agent: ${navigator?.userAgent || 'n/a'}`,
            `Viewport: ${window?.innerWidth || 0}x${window?.innerHeight || 0}`
        ];

        if (error?.stack) {
            parts.push(`Stack:\n${error.stack}`);
        }

        if (errorInfo?.componentStack) {
            parts.push(`Component Stack:\n${errorInfo.componentStack}`);
        }

        return parts.join('\n\n');
    }

    getLikelyCauses = (errorName, errorMessage) => {
        const message = String(errorMessage || '').toLowerCase();
        const name = String(errorName || '').toLowerCase();
        const hints = [];

        if (message.includes('cannot read properties of undefined') || message.includes('cannot read property')) {
            hints.push('A value is undefined at render time. Check optional chaining and default props/state.');
        }
        if (message.includes('is not a function')) {
            hints.push('A function call target is not callable. Verify imports and callback prop wiring.');
        }
        if (message.includes('failed to fetch') || message.includes('networkerror')) {
            hints.push('Network request failed. Verify backend is running and API URL is reachable.');
        }
        if (message.includes('chunk') || message.includes('loading chunk')) {
            hints.push('A code-split chunk failed to load. Hard refresh and confirm latest frontend build assets.');
        }
        if (name.includes('referenceerror')) {
            hints.push('ReferenceError indicates missing variable/symbol. Check recent refactors and renamed imports.');
        }

        if (hints.length === 0) {
            hints.push('Open diagnostics and inspect Runtime Stack first. The top stack frame usually points to the failing module.');
        }

        return hints;
    }

    getPrimaryStackSource = (stack) => {
        const raw = String(stack || '');
        const lines = raw.split('\n').map((line) => line.trim()).filter(Boolean);
        const frameLine = lines.find((line) => line.startsWith('at '));
        if (!frameLine) {
            return 'No primary source extracted';
        }

        const wrappedMatch = frameLine.match(/\(([^)]+)\)/);
        if (wrappedMatch?.[1]) {
            return wrappedMatch[1];
        }

        return frameLine.replace(/^at\s+/, '');
    }

    copySummary = async () => {
        const { error, technicalId, sessionId } = this.state;
        const payload = [
            `Support ID: ${technicalId}`,
            `Session Token: ${sessionId}`,
            `Error: ${error?.name || 'UnknownError'}`,
            `Message: ${error?.message || 'No message provided'}`,
            `Route: ${window?.location?.pathname || '/'}`,
            `Timestamp: ${new Date().toISOString()}`
        ].join('\n');

        try {
            if (navigator?.clipboard?.writeText) {
                await navigator.clipboard.writeText(payload);
                this.setState({ summaryCopyStatus: 'Summary Copied' });
            } else {
                this.setState({ summaryCopyStatus: 'Clipboard Unavailable' });
            }
        } catch {
            this.setState({ summaryCopyStatus: 'Copy Failed' });
        }

        setTimeout(() => {
            this.setState({ summaryCopyStatus: 'Copy Summary' });
        }, 1600);
    }

    buildDiagnosticPayload = (errorArg = this.state.error, errorInfoArg = this.state.errorInfo) => {
        const { technicalId, sessionId } = this.state;
        return {
            supportId: technicalId,
            sessionToken: sessionId,
            errorName: errorArg?.name || 'UnknownError',
            errorMessage: errorArg?.message || 'No message provided',
            stack: errorArg?.stack || null,
            componentStack: errorInfoArg?.componentStack || null,
            route: window?.location?.pathname || '/',
            url: window?.location?.href || 'n/a',
            userAgent: navigator?.userAgent || 'n/a',
            viewport: `${window?.innerWidth || 0}x${window?.innerHeight || 0}`,
            timestamp: new Date().toISOString()
        };
    }

    reportError = async (errorArg = this.state.error, errorInfoArg = this.state.errorInfo, pendingStatus = 'Sending') => {
        if (!ERROR_REPORTING_ENABLED) {
            this.setState({ reportStatus: 'Disabled' });
            return;
        }

        this.setState({ reportStatus: pendingStatus });
        const payload = this.buildDiagnosticPayload(errorArg, errorInfoArg);

        try {
            const response = await fetch(ERROR_REPORT_ENDPOINT, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }

            this.setState({ reportStatus: 'Sent' });
        } catch {
            this.setState({ reportStatus: 'Failed' });
        }
    }

    retryReport = async () => {
        await this.reportError(this.state.error, this.state.errorInfo, 'Retrying');
    }

    copyDiagnostics = async () => {
        const payload = this.buildDiagnosticText();
        try {
            if (navigator?.clipboard?.writeText) {
                await navigator.clipboard.writeText(payload);
                this.setState({ copyStatus: 'Copied' });
            } else {
                this.setState({ copyStatus: 'Clipboard Unavailable' });
            }
        } catch {
            this.setState({ copyStatus: 'Copy Failed' });
        }

        setTimeout(() => {
            this.setState({ copyStatus: 'Copy Diagnostics' });
        }, 1600);
    }

    downloadDiagnostics = () => {
        try {
            const payload = this.buildDiagnosticText();
            const blob = new Blob([payload], { type: 'text/plain;charset=utf-8' });
            const url = URL.createObjectURL(blob);
            const anchor = document.createElement('a');
            anchor.href = url;
            anchor.download = `aura-error-${this.state.technicalId}.txt`;
            document.body.appendChild(anchor);
            anchor.click();
            anchor.remove();
            URL.revokeObjectURL(url);
            this.setState({ downloadStatus: 'Downloaded' });
        } catch {
            this.setState({ downloadStatus: 'Download Failed' });
        }

        setTimeout(() => {
            this.setState({ downloadStatus: 'Download Report' });
        }, 1600);
    }

    render() {
        if (this.state.hasError) {
            const { error, errorInfo, showDiagnostics, copyStatus, summaryCopyStatus, downloadStatus, reportStatus } = this.state;
            const errorName = error?.name || 'UnknownError';
            const errorMessage = error?.message || 'No error message was provided by the runtime.';
            const errorStack = error?.stack || 'No runtime stack available.';
            const componentStack = errorInfo?.componentStack || 'No component stack available.';
            const primarySource = this.getPrimaryStackSource(errorStack);
            const likelyCauses = this.getLikelyCauses(errorName, errorMessage);
            const currentPath = window?.location?.pathname || '/';

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

                                                <div className="error-summary-box">
                                                     <div className="error-summary-row">
                                                         <label>Error Type</label>
                                                         <span>{errorName}</span>
                                                     </div>
                                                     <div className="error-summary-row">
                                                         <label>Message</label>
                                                         <span>{errorMessage}</span>
                                                     </div>
                                                </div>
                        
                        <div className="tech-details-v2">
                           <div className="tech-row">
                             <label><Terminal size={12} /> Support ID</label>
                             <span>{this.state.technicalId}</span>
                           </div>
                           <div className="tech-row">
                             <label><Shield size={12} /> Session Token</label>
                             <span>{this.state.sessionId}</span>
                           </div>
                           <div className="tech-row">
                             <label>Route</label>
                             <span>{currentPath}</span>
                           </div>
                                                     <div className="tech-row">
                                                         <label>Report</label>
                                                         <span>{reportStatus}</span>
                                                     </div>
                        </div>

                        <div className="likely-cause-panel">
                            <h3>Likely Causes</h3>
                            <ul>
                                {likelyCauses.map((hint) => (
                                    <li key={hint}>{hint}</li>
                                ))}
                            </ul>
                        </div>

                        <div className="primary-source-panel">
                            <h3>Primary Source</h3>
                            <code>{primarySource}</code>
                        </div>

                        <div className="diagnostic-tools">
                            <button className="diag-toggle-btn" onClick={this.toggleDiagnostics}>
                                {showDiagnostics ? 'Hide Diagnostics' : 'Show Diagnostics'}
                            </button>
                            <button className="diag-summary-btn" onClick={this.copySummary}>
                                {summaryCopyStatus}
                            </button>
                            <button className="diag-copy-btn" onClick={this.copyDiagnostics}>
                                {copyStatus}
                            </button>
                            <button className="diag-download-btn" onClick={this.downloadDiagnostics}>
                                <Download size={15} />
                                {downloadStatus}
                            </button>
                            {(reportStatus === 'Failed' || reportStatus === 'Retrying') && (
                                <button
                                    className="diag-retry-btn"
                                    onClick={this.retryReport}
                                    disabled={reportStatus === 'Retrying'}
                                >
                                    {reportStatus === 'Retrying' ? 'Retrying...' : 'Retry Report'}
                                </button>
                            )}
                        </div>

                        {showDiagnostics && (
                            <div className="diagnostic-panel">
                                <h3>Runtime Stack</h3>
                                <pre>{errorStack}</pre>
                                <h3>Component Stack</h3>
                                <pre>{componentStack}</pre>
                            </div>
                        )}

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
