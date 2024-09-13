import React, { createContext, useState, useContext } from 'react';

const WebsiteContext = createContext();

export const useWebsite = () => useContext(WebsiteContext);

export const WebsiteProvider = ({ children }) => {
    const [website, setWebsite] = useState({
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

    const updateWebsite = (updates) => {
        setWebsite((prevWebsite) => ({
            ...prevWebsite,
            ...updates
        }));
    };

    const resetWebsite = () => {
        setWebsite({
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
    };

    const addComponent = (component) => {
        setWebsite((prevWebsite) => ({
            ...prevWebsite,
            components: [...prevWebsite.components, component]
        }));
    };

    const removeComponent = (componentId) => {
        setWebsite((prevWebsite) => ({
            ...prevWebsite,
            components: prevWebsite.components.filter((c) => c.id !== componentId)
        }));
    };

    const updateComponent = (componentId, updates) => {
        setWebsite((prevWebsite) => ({
            ...prevWebsite,
            components: prevWebsite.components.map((c) =>
                c.id === componentId ? { ...c, ...updates } : c
            )
        }));
    };

    const reorderComponents = (startIndex, endIndex) => {
        setWebsite((prevWebsite) => {
            const newComponents = Array.from(prevWebsite.components);
            const [removed] = newComponents.splice(startIndex, 1);
            newComponents.splice(endIndex, 0, removed);
            return { ...prevWebsite, components: newComponents };
        });
    };

    return (
        <WebsiteContext.Provider
            value={{
                website,
                updateWebsite,
                resetWebsite,
                addComponent,
                removeComponent,
                updateComponent,
                reorderComponents
            }}
        >
            {children}
        </WebsiteContext.Provider>
    );
};