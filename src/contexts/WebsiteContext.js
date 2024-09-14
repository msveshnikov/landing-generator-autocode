import React, { createContext, useState, useContext, useCallback } from 'react';
import {
    generateLandingPage,
    improveLandingPage,
    updateWebsite as apiUpdateWebsite,
    getWebsiteById,
    downloadWebsite,
    getUserWebsites,
    deleteWebsite as apiDeleteWebsite
} from '../services/api';

const WebsiteContext = createContext();

export const useWebsite = () => useContext(WebsiteContext);

export const WebsiteProvider = ({ children }) => {
    const [website, setWebsite] = useState({
        id: null,
        designType: '',
        colors: {
            primary: '#000000',
            secondary: '#ffffff',
            accent: '#cccccc'
        },
        heroImageUrl: '',
        additionalImages: [],
        productDescription: '',
        html: '',
        components: []
    });

    const [userWebsites, setUserWebsites] = useState([]);

    const updateWebsite = useCallback((updates) => {
        setWebsite((prevWebsite) => ({
            ...prevWebsite,
            ...updates
        }));
    }, []);

    const resetWebsite = useCallback(() => {
        setWebsite({
            id: null,
            designType: '',
            colors: {
                primary: '#000000',
                secondary: '#ffffff',
                accent: '#cccccc'
            },
            heroImageUrl: '',
            additionalImages: [],
            productDescription: '',
            html: '',
            components: []
        });
    }, []);

    const addComponent = useCallback((component) => {
        setWebsite((prevWebsite) => ({
            ...prevWebsite,
            components: [...prevWebsite.components, component]
        }));
    }, []);

    const removeComponent = useCallback((componentId) => {
        setWebsite((prevWebsite) => ({
            ...prevWebsite,
            components: prevWebsite.components.filter((c) => c.id !== componentId)
        }));
    }, []);

    const updateComponent = useCallback((componentId, updates) => {
        setWebsite((prevWebsite) => ({
            ...prevWebsite,
            components: prevWebsite.components.map((c) =>
                c.id === componentId ? { ...c, ...updates } : c
            )
        }));
    }, []);

    const reorderComponents = useCallback((startIndex, endIndex) => {
        setWebsite((prevWebsite) => {
            const newComponents = Array.from(prevWebsite.components);
            const [removed] = newComponents.splice(startIndex, 1);
            newComponents.splice(endIndex, 0, removed);
            return { ...prevWebsite, components: newComponents };
        });
    }, []);

    const generateWebsite = useCallback(async () => {
        try {
            const { html, websiteId } = await generateLandingPage(
                website.designType,
                website.colors,
                website.heroImageUrl,
                website.additionalImages,
                website.productDescription,
                website.components
            );
            updateWebsite({ id: websiteId, html: html });
        } catch (error) {
            console.error('Error generating website:', error);
            throw error;
        }
    }, [website, updateWebsite]);

    const improveWebsite = useCallback(
        async (userFeedback) => {
            try {
                const { html } = await improveLandingPage(website._id, userFeedback);
                updateWebsite({ html: html });
            } catch (error) {
                console.error('Error improving website:', error);
                throw error;
            }
        },
        [website._id, updateWebsite]
    );

    const saveWebsite = useCallback(async () => {
        try {
            const updatedWebsite = await apiUpdateWebsite(website._id, website);
            updateWebsite(updatedWebsite);
        } catch (error) {
            console.error('Error saving website:', error);
            throw error;
        }
    }, [website, updateWebsite]);

    const loadWebsite = useCallback(async (websiteId) => {
        try {
            const loadedWebsite = await getWebsiteById(websiteId);
            setWebsite(loadedWebsite);
        } catch (error) {
            console.error('Error loading website:', error);
            throw error;
        }
    }, []);

    const downloadWebsiteHtml = useCallback(async () => {
        try {
            console.log(website)
            const htmlBlob = await downloadWebsite(website._id);
            const url = window.URL.createObjectURL(htmlBlob);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `website_${website._id}.html`);
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
        } catch (error) {
            console.error('Error downloading website:', error);
            throw error;
        }
    }, [website]);

    const fetchUserWebsites = useCallback(async () => {
        try {
            const websites = await getUserWebsites();
            setUserWebsites(websites);
        } catch (error) {
            console.error('Error fetching user websites:', error);
            throw error;
        }
    }, []);

    const deleteWebsite = useCallback(async (websiteId) => {
        try {
            await apiDeleteWebsite(websiteId);
            setUserWebsites((prevWebsites) =>
                prevWebsites.filter((website) => website._id !== websiteId)
            );
        } catch (error) {
            console.error('Error deleting website:', error);
            throw error;
        }
    }, []);

    return (
        <WebsiteContext.Provider
            value={{
                website,
                updateWebsite,
                resetWebsite,
                addComponent,
                removeComponent,
                updateComponent,
                reorderComponents,
                generateWebsite,
                improveWebsite,
                saveWebsite,
                loadWebsite,
                downloadWebsiteHtml,
                userWebsites,
                fetchUserWebsites,
                deleteWebsite
            }}
        >
            {children}
        </WebsiteContext.Provider>
    );
};

export default WebsiteContext;
