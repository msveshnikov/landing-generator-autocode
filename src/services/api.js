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

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            localStorage.removeItem('token');
        }
        return Promise.reject(error);
    }
);

export const registerUser = async (email, password) => {
    const response = await api.post('/register', { email, password });
    return response.data;
};

export const loginUser = async (email, password) => {
    const response = await api.post('/login', { email, password });
    localStorage.setItem('token', response.data.token);
    return response.data;
};

export const logout = async () => {
    await api.post('/logout');
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
    const response = await api.post('/generate', {
        designType,
        colors,
        heroImageUrl,
        otherImagery,
        productDescription,
        components
    });
    return response.data;
};

export const improveLandingPage = async (websiteId, userFeedback) => {
    const response = await api.post('/improve', { websiteId, userFeedback });
    return response.data;
};

export const getUserWebsites = async () => {
    const response = await api.get('/websites');
    return response.data;
};

export const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append('image', file);
    const response = await api.post('/upload-image', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
    return response.data.imageUrl;
};

export const fetchTemplates = async () => {
    const response = await api.get('/templates');
    return response.data;
};

export const saveTemplate = async (templateData) => {
    const response = await api.post('/templates', templateData);
    return response.data;
};

export const deleteWebsite = async (websiteId) => {
    await api.delete(`/websites/${websiteId}`);
};

export const getDesignTypes = async () => {
    const response = await api.get('/design-types');
    return response.data;
};

export const getColorPalettes = async () => {
    const response = await api.get('/color-palettes');
    return response.data;
};

export const downloadWebsite = async (websiteId) => {
    const response = await api.get(`/websites/${websiteId}/download`, { responseType: 'blob' });
    return response.data;
};

export const getWebsiteAnalytics = async (websiteId) => {
    const response = await api.get(`/websites/${websiteId}/analytics`);
    return response.data;
};

export const getCurrentUser = async () => {
    const response = await api.get('/user');
    return response.data;
};

export const updateUserProfile = async (profileData) => {
    const response = await api.put('/user', profileData);
    return response.data;
};

export const getWebsiteById = async (websiteId) => {
    const response = await api.get(`/websites/${websiteId}`);
    return response.data;
};

export const updateWebsite = async (websiteId, websiteData) => {
    const response = await api.put(`/websites/${websiteId}`, websiteData);
    return response.data;
};

export default api;
