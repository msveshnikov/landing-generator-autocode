import React, { createContext, useState, useContext, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};

export const ThemeProvider = ({ children }) => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            setIsDarkMode(savedTheme === 'dark');
        } else {
            setIsDarkMode(window.matchMedia('(prefers-color-scheme: dark)').matches);
        }
    }, []);

    useEffect(() => {
        document.documentElement.classList.toggle('dark', isDarkMode);
        localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    }, [isDarkMode]);

    const toggleTheme = () => {
        setIsDarkMode(prevMode => !prevMode);
    };

    const theme = {
        isDarkMode,
        toggleTheme,
        colors: {
            background: isDarkMode ? '#1a1a1a' : '#ffffff',
            text: isDarkMode ? '#ffffff' : '#000000',
            primary: '#3498db',
            secondary: '#2ecc71',
            accent: '#e74c3c',
            header: {
                background: isDarkMode ? '#2c3e50' : '#ecf0f1',
                text: isDarkMode ? '#ffffff' : '#2c3e50'
            },
            footer: {
                background: isDarkMode ? '#34495e' : '#bdc3c7',
                text: isDarkMode ? '#ecf0f1' : '#34495e'
            },
            button: {
                background: isDarkMode ? '#3498db' : '#2980b9',
                text: '#ffffff'
            },
            input: {
                background: isDarkMode ? '#2c3e50' : '#ecf0f1',
                text: isDarkMode ? '#ffffff' : '#2c3e50'
            },
            border: isDarkMode ? '#34495e' : '#bdc3c7',
            shadow: isDarkMode ? 'rgba(0, 0, 0, 0.3)' : 'rgba(0, 0, 0, 0.1)',
            success: '#27ae60',
            error: '#c0392b',
            warning: '#f39c12'
        }
    };

    return <ThemeContext.Provider value={{ theme }}>{children}</ThemeContext.Provider>;
};
