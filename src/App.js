import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
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

    return (
        <MuiThemeProvider theme={theme}>
            <CssBaseline />
            <Router>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        minHeight: '100vh',
                        fontFamily: '"Roboto", sans-serif',
                        backgroundColor: theme.palette.background.default,
                        color: theme.palette.text.primary
                    }}
                >
                    <Helmet>
                        <title>Landing Page Generator</title>
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
