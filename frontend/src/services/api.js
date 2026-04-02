// @ts-nocheck
import { mergePDFs } from '../utils/pdfMerge';
import { PDFSecurityService } from '../utils/pdfSecurity';
import { PDFIntelligenceService } from '../utils/pdfIntelligence';
import { PDFConverterService } from '../utils/pdfConverter';
import { PDFOptimizerService } from '../utils/pdfOptimizer';
import { enqueueFetchRequest } from './offlineQueue';
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

const toQueryString = (params = {}) => {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
            searchParams.set(key, String(value));
        }
    });
    const query = searchParams.toString();
    return query ? `?${query}` : '';
};

const isOffline = () => typeof navigator !== 'undefined' && navigator.onLine === false;

const queueOfflineFormRequest = async (label, url, formData, method = 'POST', headers = undefined) => {
    await enqueueFetchRequest({ label, url, method, headers, formData });
    throw new Error('QUEUED_OFFLINE');
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
            const res = await fetch(`${API_URL}/api/activities`);
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

    // FAQ Support
    faq: {
        getFaqs: async (params = {}) => {
            const query = toQueryString({
                category_id: params.categoryId,
                search: params.search,
                user_role: params.userRole,
                language: params.language || 'en',
                skip: params.skip ?? 0,
                limit: params.limit ?? 100,
            });
            const res = await fetch(`${API_URL}/api/v1/faq/faqs${query}`);
            await checkResponse(res, 'Failed to fetch FAQs');
            return res.json();
        },
        getCategories: async () => {
            const res = await fetch(`${API_URL}/api/v1/faq/categories`);
            await checkResponse(res, 'Failed to fetch FAQ categories');
            return res.json();
        },
        getFaq: async (faqId) => {
            const res = await fetch(`${API_URL}/api/v1/faq/faqs/${faqId}`);
            await checkResponse(res, 'Failed to fetch FAQ');
            return res.json();
        },
        getRelatedFaqs: async (faqId) => {
            const res = await fetch(`${API_URL}/api/v1/faq/faqs/${faqId}/related`);
            await checkResponse(res, 'Failed to fetch related FAQs');
            return res.json();
        },
        getVoteStats: async (faqId) => {
            const res = await fetch(`${API_URL}/api/v1/faq/faqs/${faqId}/vote-stats`);
            await checkResponse(res, 'Failed to fetch vote stats');
            return res.json();
        },
        getComments: async (faqId, skip = 0, limit = 10) => {
            const query = toQueryString({ skip, limit });
            const res = await fetch(`${API_URL}/api/v1/faq/faqs/${faqId}/comments${query}`);
            await checkResponse(res, 'Failed to fetch comments');
            return res.json();
        },
        vote: async ({ faqId, helpful, feedback = '', userId }) => {
            const query = toQueryString({ helpful, feedback });
            const res = await fetch(`${API_URL}/api/v1/faq/faqs/${faqId}/vote${query}`, {
                method: 'POST',
                headers: { 'user-id': userId || '' },
            });
            await checkResponse(res, 'Failed to submit vote');
            return res.json();
        },
        addComment: async ({ faqId, text, authorName, authorAvatar = '', userId }) => {
            const query = toQueryString({
                text,
                author_name: authorName,
                author_avatar: authorAvatar,
            });
            const res = await fetch(`${API_URL}/api/v1/faq/faqs/${faqId}/comments${query}`, {
                method: 'POST',
                headers: { 'user-id': userId || '' },
            });
            await checkResponse(res, 'Failed to add comment');
            return res.json();
        },
        logSearch: async ({ query, categoryId = '', roleFilter = '', resultsCount = 0, clickedFaqId = '', userId = '' }) => {
            const params = toQueryString({
                query,
                category_id: categoryId,
                role_filter: roleFilter,
                results_count: resultsCount,
                clicked_faq_id: clickedFaqId,
            });
            const res = await fetch(`${API_URL}/api/v1/faq/search${params}`, {
                method: 'POST',
                headers: { 'user-id': userId },
            });
            await checkResponse(res, 'Failed to log FAQ search');
            return res.json();
        },
        getTrendingSearches: async (days = 7, limit = 10) => {
            const query = toQueryString({ days, limit });
            const res = await fetch(`${API_URL}/api/v1/faq/analytics/trending${query}`);
            await checkResponse(res, 'Failed to fetch trending searches');
            return res.json();
        },
        getUserPreferences: async (userId) => {
            const res = await fetch(`${API_URL}/api/v1/faq/user/preferences`, {
                headers: { 'user-id': userId },
            });
            await checkResponse(res, 'Failed to fetch FAQ preferences');
            return res.json();
        },
        addFavorite: async ({ faqId, userId }) => {
            const res = await fetch(`${API_URL}/api/v1/faq/user/favorites/${faqId}`, {
                method: 'POST',
                headers: { 'user-id': userId },
            });
            await checkResponse(res, 'Failed to add favorite');
            return res.json();
        },
        removeFavorite: async ({ faqId, userId }) => {
            const res = await fetch(`${API_URL}/api/v1/faq/user/favorites/${faqId}`, {
                method: 'DELETE',
                headers: { 'user-id': userId },
            });
            await checkResponse(res, 'Failed to remove favorite');
            return res.json();
        },
        subscribeCategory: async ({ categoryId, userId }) => {
            const res = await fetch(`${API_URL}/api/v1/faq/user/subscribe/${categoryId}`, {
                method: 'POST',
                headers: { 'user-id': userId },
            });
            await checkResponse(res, 'Failed to subscribe to category');
            return res.json();
        },
        unsubscribeCategory: async ({ categoryId, userId }) => {
            const res = await fetch(`${API_URL}/api/v1/faq/user/subscribe/${categoryId}`, {
                method: 'DELETE',
                headers: { 'user-id': userId },
            });
            await checkResponse(res, 'Failed to unsubscribe from category');
            return res.json();
        },
        createExport: async ({ faqId, exportType = 'pdf', userId }) => {
            const query = toQueryString({ export_type: exportType });
            const res = await fetch(`${API_URL}/api/v1/faq/exports/${faqId}${query}`, {
                method: 'POST',
                headers: { 'user-id': userId },
            });
            await checkResponse(res, 'Failed to create export');
            return res.json();
        },
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

    // System Telemetry
    getSystemPulse: async () => {
        try {
            const res = await fetch(`${API_URL}/api/system/pulse`);
            if (res.ok) return await res.json();
        } catch (e) {}
        return { cpu_usage: 0, memory_usage: 0, active_tasks: 0, engine_state: 'Offline' };
    },

    // Billing & Credits
    billing: {
        getBalance: async () => {
            try {
                const res = await fetch(`${API_URL}/api/billing/balance`);
                if (res.ok) return await res.json();
            } catch (e) {
                console.error('[Billing Engine] Balance fetch failed:', e);
            }
            return { credits: 0, subscription: 'Trial', history: [] };
        },
        topUp: async (amount) => {
            try {
                const res = await fetch(`${API_URL}/api/billing/top-up`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ amount })
                });
                await checkResponse(res, 'Credit injection failed');
                return await res.json();
            } catch (e) {
                console.error('[Billing Engine] Top-up error:', e);
                return { error: true, message: e.message };
            }
        },
        upgrade: async (tier) => {
            try {
                const res = await fetch(`${API_URL}/api/billing/upgrade`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ tier })
                });
                await checkResponse(res, 'Tier transition failed');
                return await res.json();
            } catch (e) {
                console.error('[Billing Engine] Upgrade error:', e);
                return { error: true, message: e.message };
            }
        }
    },

    // Image Generation
    generateImageAsset: async (data) => {
        const formData = new FormData();
        formData.append('prompt', data.prompt);
        formData.append('model', data.model || 'Flux.1 Pro');
        formData.append('orientation', data.orientation || 'Portrait');
        formData.append('settings', JSON.stringify(data.settings || {}));

        try {
            const res = await fetch(`${API_URL}/api/image/generate`, {
                method: 'POST',
                body: formData
            });
            return await res.json();
        } catch (e) {
            console.error('[API] Image Gen Error:', e);
            return { error: e.message };
        }
    },
    imageStatus: async (jobId) => {
        try {
            const res = await fetch(`${API_URL}/api/image/status/${jobId}`);
            return await res.json();
        } catch (e) {
            return { error: e.message };
        }
    },

    // Video & FaceSwap
    video: {
        faceswap: async (data) => {
            // console.log('[API] Initializing Face Swap:', data);
            return { job_id: 'job_' + Math.random().toString(36).substr(2, 9) };
        },
        status: async (id) => {
            try {
                const res = await fetch(`${API_URL}/api/video/status/${id}`);
                if (res.ok) return await res.json();
            } catch (e) {}
            return { 
                status: 'completed', 
                progress: 100, 
                video_url: 'https://cdn.pixabay.com/vimeo/327374737/city-22533.mp4?width=1280' // Mock result
            };
        },
        generate: async (data) => {
            const formData = new FormData();
            formData.append('prompt', data.prompt || '');
            formData.append('mode', data.mode || 'text-to-video');
            formData.append('settings', JSON.stringify(data.settings || {}));
            
            if (data.image_seed) {
                formData.append('image_seed', data.image_seed);
            }
            
            try {
                const res = await fetch(`${API_URL}/api/video/generate`, {
                    method: 'POST',
                    body: formData
                });
                if (res.ok) return await res.json();
            } catch (e) {
                console.error('[API] Video Hub Error:', e);
            }
            return { job_id: 'v_job_' + Date.now() };
        },
        refinePrompt: async (prompt) => {
            try {
                const res = await fetch(`${API_URL}/api/video/refine-prompt`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ prompt })
                });
                if (res.ok) return await res.json();
            } catch (e) {
                console.error('[API] Prompt Refinement Error:', e);
            }
            return { refined: prompt + " (enhanced)" };
        },
        breakdown: async (data) => {
            try {
                const res = await fetch(`${API_URL}/api/video/breakdown`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ prompt: data.prompt || data.script })
                });
                if (res.ok) return await res.json();
            } catch (e) {
                console.error('[API] Script Breakdown Error:', e);
            }
            return { scenes: [] };
        }
    },

    // PDF Tools (Client-Side First for Privacy)
    pdf: {
        merge: async (files) => {
            // console.log('[API] Executing secure client-side PDF merge...');
            // mergePDFs now returns a ready-to-use Blob
            return await mergePDFs(files);
        },
        getUniversalCatalog: async () => {
            const res = await fetch(`${API_URL}/api/pdf/tools`);
            if (!res.ok) throw new Error('Failed to load PDF tool catalog');
            return await res.json();
        },
        universalConvert: async (conversionKey, files, options = {}) => {
            const fileList = Array.isArray(files) ? files : [files];
            const normalizedKey = String(conversionKey || '').toLowerCase();

            if (normalizedKey === 'pdf_merge' || normalizedKey === 'merge') {
                const formData = new FormData();
                fileList.filter(Boolean).forEach((file) => formData.append('files', file));
                if (options.pageOrders) {
                    formData.append('page_orders', JSON.stringify(options.pageOrders));
                }
                const url = `${API_URL}/api/pdf/merge`;
                const execute = () => fetch(url, {
                    method: 'POST',
                    body: formData,
                });
                if (isOffline()) {
                    await queueOfflineFormRequest(`pdf:${normalizedKey}`, url, formData);
                }
                try {
                    return await execute();
                } catch (e) {
                    await queueOfflineFormRequest(`pdf:${normalizedKey}`, url, formData);
                }
            }

            if (normalizedKey === 'image_to_pdf' || normalizedKey === 'to_pdf' || normalizedKey === 'to-pdf') {
                const formData = new FormData();
                fileList.filter(Boolean).forEach((file) => formData.append('files', file));
                const url = `${API_URL}/api/pdf/to-pdf`;
                const execute = () => fetch(url, {
                    method: 'POST',
                    body: formData,
                });
                if (isOffline()) {
                    await queueOfflineFormRequest(`pdf:${normalizedKey}`, url, formData);
                }
                try {
                    return await execute();
                } catch (e) {
                    await queueOfflineFormRequest(`pdf:${normalizedKey}`, url, formData);
                }
            }

            const formData = new FormData();
            const primaryFile = fileList.find(Boolean);
            if (primaryFile) {
                formData.append('file', primaryFile);
            }

            const params = new URLSearchParams();
            params.set('target_format', normalizedKey);
            if (options.pages) params.set('pages', options.pages);
            if (options.degrees !== undefined) params.set('degrees', String(options.degrees));
            if (options.password) params.set('password', options.password);
            if (options.name) params.set('name', options.name);
            if (options.keywords) params.set('keywords', options.keywords);

            const url = `${API_URL}/api/pdf/convert?${params.toString()}`;
            const execute = () => fetch(url, {
                method: 'POST',
                body: formData,
            });
            if (isOffline()) {
                await queueOfflineFormRequest(`pdf:${normalizedKey}`, url, formData);
            }
            try {
                return await execute();
            } catch (e) {
                await queueOfflineFormRequest(`pdf:${normalizedKey}`, url, formData);
            }
        },
        pdfToWord: async (file) => {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('target_format', 'pdf_to_word');
            const res = await fetch(`${API_URL}/api/pdf/convert`, { method: 'POST', body: formData });
            if (!res.ok) throw new Error('PDF to Word conversion failed');
            return res;
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
        },
        // Conversion History (Phase 2)
        getHistory: async (conversionKey = null, limit = 20, days = 30) => {
            const params = new URLSearchParams();
            if (conversionKey) params.set('conversion_key', conversionKey);
            params.set('limit', String(limit));
            params.set('days', String(days));
            try {
                const res = await fetch(`${API_URL}/api/pdf/history?${params.toString()}`);
                if (!res.ok) throw new Error('Failed to fetch history');
                return await res.json();
            } catch (e) {
                console.warn('[API] Conversion history fetch failed:', e.message);
                return { status: 'error', items: [], total: 0 };
            }
        },
        saveToHistory: async (conversionKey, fromFormat, toFormat, fileName, fileSizeBytes = null, outputUrl = null, outputSizeBytes = null, processingTimeMs = null) => {
            const formData = new FormData();
            formData.append('conversion_key', conversionKey);
            formData.append('from_format', fromFormat);
            formData.append('to_format', toFormat);
            formData.append('file_name', fileName);
            if (fileSizeBytes !== null) formData.append('file_size_bytes', String(fileSizeBytes));
            if (outputUrl !== null) formData.append('output_url', outputUrl);
            if (outputSizeBytes !== null) formData.append('output_size_bytes', String(outputSizeBytes));
            if (processingTimeMs !== null) formData.append('processing_time_ms', String(processingTimeMs));
            try {
                const res = await fetch(`${API_URL}/api/pdf/history/save`, {
                    method: 'POST',
                    body: formData
                });
                if (!res.ok) throw new Error('Failed to save to history');
                return await res.json();
            } catch (e) {
                console.warn('[API] Save to history failed:', e.message);
                return { status: 'error', message: e.message };
            }
        },
        getHistoryStats: async () => {
            try {
                const res = await fetch(`${API_URL}/api/pdf/history/stats`);
                if (!res.ok) throw new Error('Failed to fetch history stats');
                return await res.json();
            } catch (e) {
                console.warn('[API] History stats fetch failed:', e.message);
                return { status: 'error', total_conversions: 0, successful: 0 };
            }
        },
        cleanupHistory: async (days = 90) => {
            try {
                const res = await fetch(`${API_URL}/api/pdf/history/cleanup?days=${days}`, {
                    method: 'POST'
                });
                if (!res.ok) throw new Error('Failed to cleanup history');
                return await res.json();
            } catch (e) {
                console.warn('[API] History cleanup failed:', e.message);
                return { status: 'error', message: e.message };
            }
        }
    },

    // Local AI (Ollama)
    ollama: {
        health: async () => {
            try {
                const res = await fetch(`${API_URL}/api/ollama/health`);
                if (res.ok) return await res.json();
            } catch (e) {}
            return { status: 'Offline' };
        },
        generate: async (prompt, model = 'llama3') => {
            try {
                const res = await fetch(`${API_URL}/api/ollama/generate`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ prompt, model })
                });
                return await res.json();
            } catch (e) {
                return { error: e.message };
            }
        },
        refine: async (prompt) => {
            try {
                const res = await fetch(`${API_URL}/api/ollama/refine-prompt`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ prompt })
                });
                return await res.json();
            } catch (e) {
                return { refined: prompt };
            }
        }
    },
    // eBook Transformations
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
