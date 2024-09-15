import React, { createContext, useState, useContext, useEffect } from 'react';
import { createTheme } from '@mui/material/styles';

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
        localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    }, [isDarkMode]);

    const toggleTheme = () => {
        setIsDarkMode(prevMode => !prevMode);
    };

    const theme = createTheme({
        palette: {
            mode: isDarkMode ? 'dark' : 'light',
            primary: {
                main: '#3498db'
            },
            secondary: {
                main: '#2ecc71'
            },
            error: {
                main: '#e74c3c'
            },
            warning: {
                main: '#f39c12'
            },
            info: {
                main: '#3498db'
            },
            success: {
                main: '#27ae60'
            },
            background: {
                default: isDarkMode ? '#1a1a1a' : '#ffffff',
                paper: isDarkMode ? '#2c3e50' : '#ecf0f1'
            },
            text: {
                primary: isDarkMode ? '#ffffff' : '#000000',
                secondary: isDarkMode ? '#ecf0f1' : '#34495e'
            }
        },
        components: {
            MuiButton: {
                styleOverrides: {
                    root: {
                        textTransform: 'none'
                    }
                }
            }
        }
    });

    return (
        <ThemeContext.Provider value={{ theme, isDarkMode, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};
