import React, { createContext, useState, useContext, useCallback, useEffect } from 'react';
import {
    generateLandingPage,
    improveLandingPage,
    updateWebsite as apiUpdateWebsite,
    getWebsiteById,
    downloadWebsite,
    getUserWebsites,
    deleteWebsite as apiDeleteWebsite,
    fetchTemplates,
    saveTemplate,
    getDesignTypes,
    getColorPalettes
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
    const [templates, setTemplates] = useState([]);
    const [designTypes, setDesignTypes] = useState([]);
    const [colorPalettes, setColorPalettes] = useState([]);

    const updateWebsite = useCallback(updates => {
        setWebsite(prevWebsite => ({
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

    const addComponent = useCallback(component => {
        setWebsite(prevWebsite => ({
            ...prevWebsite,
            components: [...prevWebsite.components, component]
        }));
    }, []);

    const removeComponent = useCallback(componentId => {
        setWebsite(prevWebsite => ({
            ...prevWebsite,
            components: prevWebsite.components.filter(c => c.id !== componentId)
        }));
    }, []);

    const updateComponent = useCallback((componentId, updates) => {
        setWebsite(prevWebsite => ({
            ...prevWebsite,
            components: prevWebsite.components.map(c =>
                c.id === componentId ? { ...c, ...updates } : c
            )
        }));
    }, []);

    const reorderComponents = useCallback((startIndex, endIndex) => {
        setWebsite(prevWebsite => {
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
        async userFeedback => {
            try {
                const { html } = await improveLandingPage(website.id, userFeedback);
                updateWebsite({ html: html });
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

    const loadWebsite = useCallback(async websiteId => {
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
            const htmlBlob = await downloadWebsite(website.id);
            const url = window.URL.createObjectURL(htmlBlob);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `website_${website.id}.html`);
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
        } catch (error) {
            console.error('Error downloading website:', error);
            throw error;
        }
    }, [website.id]);

    const fetchUserWebsites = useCallback(async () => {
        try {
            const websites = await getUserWebsites();
            setUserWebsites(websites);
        } catch (error) {
            console.error('Error fetching user websites:', error);
            throw error;
        }
    }, []);

    const deleteWebsite = useCallback(async websiteId => {
        try {
            await apiDeleteWebsite(websiteId);
            setUserWebsites(prevWebsites =>
                prevWebsites.filter(website => website.id !== websiteId)
            );
        } catch (error) {
            console.error('Error deleting website:', error);
            throw error;
        }
    }, []);

    const loadTemplates = useCallback(async () => {
        try {
            const fetchedTemplates = await fetchTemplates();
            setTemplates(fetchedTemplates);
        } catch (error) {
            console.error('Error loading templates:', error);
            throw error;
        }
    }, []);

    const loadTemplate = useCallback(
        templateId => {
            const template = templates.find(t => t.id === templateId);
            if (template) {
                updateWebsite(template);
            }
        },
        [templates, updateWebsite]
    );

    const saveAsTemplate = useCallback(
        async templateName => {
            try {
                const newTemplate = await saveTemplate({ ...website, name: templateName });
                setTemplates(prevTemplates => [...prevTemplates, newTemplate]);
            } catch (error) {
                console.error('Error saving template:', error);
                throw error;
            }
        },
        [website]
    );

    const loadDesignTypes = useCallback(async () => {
        try {
            const fetchedDesignTypes = await getDesignTypes();
            setDesignTypes(fetchedDesignTypes);
        } catch (error) {
            console.error('Error loading design types:', error);
            throw error;
        }
    }, []);

    const loadColorPalettes = useCallback(async () => {
        try {
            const fetchedColorPalettes = await getColorPalettes();
            setColorPalettes(fetchedColorPalettes);
        } catch (error) {
            console.error('Error loading color palettes:', error);
            throw error;
        }
    }, []);

    useEffect(() => {
        loadTemplates();
        loadDesignTypes();
        loadColorPalettes();
    }, [loadTemplates, loadDesignTypes, loadColorPalettes]);

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
                deleteWebsite,
                templates,
                loadTemplate,
                saveAsTemplate,
                designTypes,
                colorPalettes
            }}
        >
            {children}
        </WebsiteContext.Provider>
    );
};

export default WebsiteContext;
