import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Builder from './pages/Builder';
import Preview from './pages/Preview';
import Download from './pages/Download';
import LandingPage from './pages/LandingPage';
import NotFound from './pages/NotFound';
import Login from './pages/Login';
import Register from './pages/Register';
import UserAccount from './pages/UserAccount';
import Templates from './pages/Templates';
import Documentation from './pages/Documentation';
import About from './pages/About';
import Contact from './pages/Contact';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';

import { AuthProvider } from './contexts/AuthContext';
import { WebsiteProvider } from './contexts/WebsiteContext';
import { ThemeProvider as CustomThemeProvider, useTheme } from './contexts/ThemeContext';
import Header from './components/Header';
import Footer from './components/Footer';

const App = () => {
    return (
        <AuthProvider>
            <WebsiteProvider>
                <CustomThemeProvider>
                    <AppContent />
                </CustomThemeProvider>
            </WebsiteProvider>
        </AuthProvider>
    );
};

const AppContent = () => {
    const { theme } = useTheme();

    const muiTheme = createTheme({
        palette: {
            mode: theme.isDarkMode ? 'dark' : 'light',
            primary: {
                main: theme.colors?.primary || '#1976d2'
            },
            secondary: {
                main: theme.colors?.secondary || '#dc004e'
            },
            background: {
                default: theme.colors?.background || '#fff',
                paper: theme.colors?.background || '#fff'
            },
            text: {
                primary: theme.colors?.text || '#000'
            }
        },
        components: {
            MuiButton: {
                styleOverrides: {
                    root: {
                        backgroundColor: theme.colors?.button?.background || '#1976d2',
                        color: theme.colors?.button?.text || '#fff',
                        '&:hover': {
                            backgroundColor: theme.colors?.button?.background || '#1976d2',
                            opacity: 0.9
                        }
                    }
                }
            },
            MuiAppBar: {
                styleOverrides: {
                    root: {
                        backgroundColor: theme.colors?.header?.background || '#1976d2',
                        color: theme.colors?.header?.text || '#fff'
                    }
                }
            }
        }
    });

    return (
        <MuiThemeProvider theme={muiTheme}>
            <CssBaseline />
            <Router>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        minHeight: '100vh',
                        fontFamily: '"Roboto", sans-serif',
                        backgroundColor: theme.colors?.background || '#fff',
                        color: theme.colors?.text || '#000'
                    }}
                >
                    <Helmet>
                        <title>Landing Page Generator</title>
                        <meta
                            name="description"
                            content="Create custom landing pages with AI-powered generation"
                        />
                        <link
                            href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;700&display=swap"
                            rel="stylesheet"
                        />
                    </Helmet>
                    <Header />
                    <Box component="main" sx={{ flexGrow: 1 }}>
                        <Routes>
                            <Route path="/" element={<LandingPage />} />
                            <Route path="/builder" element={<Builder />} />
                            <Route path="/preview" element={<Preview />} />
                            <Route path="/download" element={<Download />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Register />} />
                            <Route path="/user-account" element={<UserAccount />} />
                            <Route path="/templates" element={<Templates />} />
                            <Route path="/docs" element={<Documentation />} />
                            <Route path="/about" element={<About />} />
                            <Route path="/contact" element={<Contact />} />
                            <Route path="/terms" element={<Terms />} />
                            <Route path="/privacy" element={<Privacy />} />
                            <Route path="*" element={<NotFound />} />
                        </Routes>
                    </Box>
                    <Footer />
                </Box>
            </Router>
        </MuiThemeProvider>
    );
};

export default App;
