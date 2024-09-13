import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3001';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

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
        return response.data.html;
    } catch (error) {
        console.error('Error generating landing page:', error);
        throw error;
    }
};

export const improveLandingPage = async (currentHtml, userFeedback) => {
    try {
        const response = await api.post('/improve', {
            currentHtml,
            userFeedback
        });
        return response.data.html;
    } catch (error) {
        console.error('Error improving landing page:', error);
        throw error;
    }
};

export const generateContent = async (prompt) => {
    try {
        const response = await api.post('/generate-content', { prompt });
        return response.data.content;
    } catch (error) {
        console.error('Error generating content:', error);
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
