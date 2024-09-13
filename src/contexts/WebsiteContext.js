import React, { createContext, useState, useContext, useCallback } from 'react';
import {
    generateLandingPage,
    improveLandingPage,
    updateWebsite as apiUpdateWebsite
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
        generatedHtml: '',
        components: []
    });

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
            generatedHtml: '',
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
            updateWebsite({ id: websiteId, generatedHtml: html });
        } catch (error) {
            console.error('Error generating website:', error);
            throw error;
        }
    }, [website, updateWebsite]);

    const improveWebsite = useCallback(
        async (userFeedback) => {
            try {
                const { html } = await improveLandingPage(website.id, userFeedback);
                updateWebsite({ generatedHtml: html });
            } catch (error) {
                console.error('Error improving website:', error);
                throw error;
            }
        },
        [website.id, updateWebsite]
    );

    const saveWebsite = useCallback(async () => {
        try {
            const updatedWebsite = await apiUpdateWebsite(website.id, website);
            updateWebsite(updatedWebsite);
        } catch (error) {
            console.error('Error saving website:', error);
            throw error;
        }
    }, [website, updateWebsite]);

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
                saveWebsite
            }}
        >
            {children}
        </WebsiteContext.Provider>
    );
};

export default WebsiteContext;
