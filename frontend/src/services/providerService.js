export const providerService = {
    getStatus: async () => {
        return {
            image: {
                active: 'Flux 2 (Standard)',
                selected: 'Flux 2 (Standard)',
                available: ['Flux 2 (Standard)', 'Flux 2 Pro', 'DALL-E 3', 'Stable Diffusion XL']
            },
            avatarVideo: {
                active: 'Sora 1.0 (BETA)',
                selected: 'Sora 1.0 (BETA)',
                available: ['Sora 1.0 (BETA)', 'Kling 1.5', 'HeyGen Turbo']
            },
            textToSpeech: {
                active: 'ElevenLabs Multilingual',
                selected: 'ElevenLabs Multilingual',
                available: ['ElevenLabs Multilingual', 'Google Cloud TTS', 'Azure Neural']
            }
        };
    },
    updateStatus: async (config) => {
        // console.log('Mock: Updating provider config:', config);
        return {
            success: true,
            providers: {
                image: { active: config.image, selected: config.image, available: ['Flux 2 (Standard)', 'Flux 2 Pro', 'DALL-E 3', 'Stable Diffusion XL'] },
                avatarVideo: { active: config.avatarVideo, selected: config.avatarVideo, available: ['Sora 1.0 (BETA)', 'Kling 1.5', 'HeyGen Turbo'] },
                textToSpeech: { active: config.textToSpeech, selected: config.textToSpeech, available: ['ElevenLabs Multilingual', 'Google Cloud TTS', 'Azure Neural'] }
            }
        };
    }
};
