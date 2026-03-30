import { mergePDFs } from '../utils/pdfMerge';
import { PDFSecurityService } from '../utils/pdfSecurity';
import { PDFIntelligenceService } from '../utils/pdfIntelligence';
import { PDFConverterService } from '../utils/pdfConverter';
import { PDFOptimizerService } from '../utils/pdfOptimizer';
const API_URL = 'http://localhost:8000';

const checkResponse = async (res, defaultMsg = 'Request failed') => {
    if (res.ok) return;
    let errorDetail = defaultMsg;
    try {
        const body = await res.json();
        errorDetail = body.detail || body.message || defaultMsg;
    } catch (e) {}
    throw new Error(errorDetail);
};

export const api = {
    // Core Profile & Auth
    getProfile: async () => {
        try {
            const res = await fetch(`${API_URL}/api/profile/me/`);
            if (res.ok) return await res.json();
            throw new Error('Profile fetch failed');
        } catch (e) {
            console.warn('[API] Fallback to mock profile due to error:', e.message);
            return {
                display_name: "Kj. Dheena (Offline)",
                username: "dheena_pro_offline",
                bio: "Offline mode: AI Engineer & Designer.",
                location: "Chennai, India",
                email: "dheena@aura.dev",
                status: "offline",
                joined_at: '2024-03-20',
                timezone: 'Asia/Kolkata',
                creator_tier: 'Pro Plan',
                response_time: '~30m'
            };
        }
    },
    updateProfile: async (data) => {
        try {
            const res = await fetch(`${API_URL}/api/profile/me/`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            await checkResponse(res, 'Could not update profile preferences');
            return await res.json();
        } catch (e) {
            console.error('[API] Profile update error:', e.message);
            return { status: 'mock_success', ...data };
        }
    },

    // Projects (for Content Tab)
    getProjects: async () => {
        try {
            const res = await fetch(`${API_URL}/api/projects/`);
            if (res.ok) return await res.json();
        } catch (e) {}
        return [
            { id: 1, title: 'Visual Synthesis Engine (Mock)', project_type: 'Image', status: 'Completed' },
            { id: 2, title: 'Neural Audio Generator (Mock)', project_type: 'Speech', status: 'Active' }
        ];
    },

    // Activities (for Overview Tab)
    getActivities: async () => {
        try {
            const res = await fetch(`${API_URL}/api/activities/`);
            if (res.ok) return await res.json();
        } catch (e) {}
        return [
            { id: 1, action: 'Updated profile metadata', action_type: 'SYSTEM', created_at: new Date().toISOString() }
        ];
    },
    
    // Auth
    login: async (username, password) => {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
        });
        if (!response.ok) throw new Error('Login failed');
        return response.json();
    },

    // Utilities
    fetchHealth: async () => {
        try {
            const response = await fetch(`${API_URL}/api/health`);
            if (!response.ok) return { status: 'Unhealthy' };
            return response.json();
        } catch (e) {
            return { status: 'Offline' };
        }
    },
    fetchFeatures: async () => {
        try {
            const response = await fetch(`${API_URL}/api/features/`);
            if (response.ok) return response.json();
        } catch (e) {}
        return [];
    },
    getImageOutputs: async () => {
        try {
            const res = await fetch(`${API_URL}/api/image/outputs/`);
            if (res.ok) return await res.json();
        } catch (e) {}
        return [];
    },
    // Assets & Files
    getFiles: async () => {
        try {
            const res = await fetch(`${API_URL}/api/files/`);
            if (res.ok) return await res.json();
        } catch (e) {
            console.error('[API] Failed to fetch assets:', e.message);
        }
        return [];
    },
    uploadFile: async (file) => {
        const formData = new FormData();
        formData.append('file', file);
        try {
            const res = await fetch(`${API_URL}/api/files/upload`, {
                method: 'POST',
                body: formData,
            });
            await checkResponse(res, 'File upload failed');
            return await res.json();
        } catch (e) {
            console.error('[API] File upload error:', e.message);
            throw e;
        }
    },
    deleteFile: async (id) => {
        try {
            const res = await fetch(`${API_URL}/api/files/${id}`, {
                method: 'DELETE',
            });
            await checkResponse(res, 'Failed to delete file from workspace');
            return await res.json();
        } catch (e) {
            console.error('[API] File deletion error:', e.message);
            throw e;
        }
    },

    // Billing & Credits
    billing: {
        getBalance: async () => {
            try {
                const res = await fetch(`${API_URL}/api/profile/me/`);
                if (res.ok) {
                    const data = await res.json();
                    return { 
                        credits: (data.experience_level || 0) * 10, 
                        stamina: 100, 
                        subscription: data.creator_tier || 'Trial',
                        history: []
                    };
                }
            } catch (e) {}
            return { 
                credits: 1250, 
                stamina: 145, 
                subscription: 'Trial',
                history: [
                    { type: 'Credit Purchase', amount: 5000, date: '2024-03-20' },
                    { type: 'Image Gen', tool: 'Flux 2', amount: -15, date: '2024-03-22' }
                ]
            };
        },
        topUp: async (amount) => {
            return { status: 'success', amount };
        },
        upgrade: async (tier) => {
            return { status: 'success', tier };
        }
    },

    // Image Generation
    generateImageAsset: async (data) => {
        // console.log('[API] Generating image asset:', data);
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    status: 'success',
                    output: {
                        id: Date.now(),
                        url: 'https://picsum.photos/1024/1024',
                        prompt: data.prompt,
                        model: data.model,
                        orientation: data.orientation,
                        created_at: new Date().toLocaleTimeString()
                    }
                });
            }, 2000);
        });
    },

    // Video & FaceSwap
    video: {
        faceswap: async (data) => {
            // console.log('[API] Initializing Face Swap:', data);
            return { job_id: 'job_' + Math.random().toString(36).substr(2, 9) };
        },
        getStatus: async (id) => {
            return { 
                status: 'Completed', 
                progress: 100, 
                url: 'https://picsum.photos/800/800' // Mock result
            };
        }
    },

    // PDF Tools (Client-Side First for Privacy)
    pdf: {
        merge: async (files) => {
            // console.log('[API] Executing secure client-side PDF merge...');
            // mergePDFs now returns a ready-to-use Blob
            return await mergePDFs(files);
        },
        imageToPdf: async (files) => {
            // console.log('[API] Converting images to PDF server-side...');
            const formData = new FormData();
            files.forEach(f => formData.append('files', f));
            const res = await fetch(`${API_URL}/api/pdf/to-pdf`, { method: 'POST', body: formData });
            return await res.blob();
        },
        optimize: async (file) => {
            const formData = new FormData();
            formData.append('file', file);
            const res = await fetch(`${API_URL}/api/pdf/optimize`, { method: 'POST', body: formData });
            return await res.blob();
        },
        extract: async (file) => {
            const formData = new FormData();
            formData.append('file', file);
            const res = await fetch(`${API_URL}/api/pdf/extract`, { method: 'POST', body: formData });
            return await res.json();
        },
        // --- High-Performance Logic Extensions ---
        lock: async (file, password) => {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('password', password);
            const res = await fetch(`${API_URL}/api/pdf/protect`, { method: 'POST', body: formData });
            if (!res.ok) throw new Error('Lock failed');
            return await res.blob();
        },
        unlock: async (file, password) => {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('password', password);
            const res = await fetch(`${API_URL}/api/pdf/unlock`, { method: 'POST', body: formData });
            if (!res.ok) throw new Error('Unlock failed');
            return await res.blob();
        },
        sign: async (file, name) => {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('name', name);
            const res = await fetch(`${API_URL}/api/pdf/sign`, { method: 'POST', body: formData });
            if (!res.ok) throw new Error('Signing failed');
            return await res.blob();
        },
        redact: async (file, keywords) => {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('keywords', keywords);
            const res = await fetch(`${API_URL}/api/pdf/redact`, { method: 'POST', body: formData });
            if (!res.ok) throw new Error('Redaction failed');
            return await res.blob();
        },
        ocr: async (file, lang) => {
            return await PDFIntelligenceService.runOCR(file, lang);
        },
        excelToPdf: async (buffer) => {
            return await PDFConverterService.excelToPDF(buffer);
        },
        wordToPdf: async (buffer) => {
            return await PDFConverterService.wordToPDF(buffer);
        },
        optimizeLocal: async (file) => {
            return await PDFOptimizerService.optimizePDF(file);
        }
    },

    // eBook Transformations
    ebook: {
        convert: async (file, fromFormat, toFormat, settings = {}) => {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('from_format', fromFormat);
            formData.append('to_format', toFormat);
            formData.append('font_size', settings.fontSize || 'Normal');
            formData.append('optimize_images', settings.optimizeImages !== false);

            const res = await fetch(`${API_URL}/api/ebook/convert`, {
                method: 'POST',
                body: formData,
            });
            if (!res.ok) throw new Error('eBook Engine: Conversion failed');
            return await res.blob();
        }
    }
};

export const logger = {
    log: (tag, msg, data = '') => {/* console.log(`[${tag}] ${msg}`, data); */},
    success: (tag, msg, data = '') => {/* console.log(`%c[${tag} SUCCESS] ${msg}`, 'color: #22c55e; font-weight: bold;', data); */},
    error: (tag, msg, err = '') => console.error(`[${tag} ERROR] ${msg}`, err),
    info: (tag, msg) => console.info(`[${tag}] ${msg}`)
};

export const resolveAssetUrl = (url) => {
    if (!url) return '';
    if (url.startsWith('http') || url.startsWith('blob:')) return url;
    return `${API_URL}${url}`;
};

export default api;
