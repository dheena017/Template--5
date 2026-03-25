const API_URL = 'http://localhost:8000';

export async function fetchHealth() {
    const response = await fetch(`${API_URL}/api/health`);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
}

export async function login(username, password) {
    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);

    const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        body: formData,
    });

    if (!response.ok) {
        throw new Error('Login failed');
    }
    return response.json();
}

export async function fetchFeatures() {
    const response = await fetch(`${API_URL}/api/features/`);
    if (!response.ok) {
        throw new Error('Failed to fetch features');
    }
    return response.json();
}
