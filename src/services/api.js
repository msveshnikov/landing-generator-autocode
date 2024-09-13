import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3001';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const register = async (email, password) => {
    try {
        const response = await api.post('/register', { email, password });
        return response.data;
    } catch (error) {
        console.error('Error registering user:', error);
        throw error;
    }
};

export const login = async (email, password) => {
    try {
        const response = await api.post('/login', { email, password });
        localStorage.setItem('token', response.data.token);
        return response.data;
    } catch (error) {
        console.error('Error logging in:', error);
        throw error;
    }
};

export const logout = () => {
    localStorage.removeItem('token');
};

export const generateLandingPage = async (
    designType,
    colors,
    heroImageUrl,
    otherImagery,
    productDescription,
    components
) => {
    try {
        const response = await api.post('/generate', {
            designType,
            colors,
            heroImageUrl,
            otherImagery,
            productDescription,
            components
        });
        return response.data;
    } catch (error) {
        console.error('Error generating landing page:', error);
        throw error;
    }
};

export const improveLandingPage = async (websiteId, userFeedback) => {
    try {
        const response = await api.post('/improve', {
            websiteId,
            userFeedback
        });
        return response.data;
    } catch (error) {
        console.error('Error improving landing page:', error);
        throw error;
    }
};

export const getUserWebsites = async () => {
    try {
        const response = await api.get('/websites');
        return response.data;
    } catch (error) {
        console.error('Error fetching user websites:', error);
        throw error;
    }
};

export const uploadImage = async (file) => {
    try {
        const formData = new FormData();
        formData.append('image', file);
        const response = await api.post('/upload-image', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data.imageUrl;
    } catch (error) {
        console.error('Error uploading image:', error);
        throw error;
    }
};

export default api;