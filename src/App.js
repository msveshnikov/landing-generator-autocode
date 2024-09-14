import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import styled, { ThemeProvider } from 'styled-components';
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

const AppWrapper = styled.div`
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    font-family: 'Roboto', sans-serif;
    background-color: ${({ theme }) => theme.backgroundColor};
    color: ${({ theme }) => theme.textColor};
`;

const ContentWrapper = styled.div`
    flex: 1;
`;

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
    const theme = useTheme();

    return (
        <ThemeProvider theme={theme}>
            <Router>
                <AppWrapper>
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
                    <ContentWrapper>
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
                    </ContentWrapper>
                    <Footer />
                </AppWrapper>
            </Router>
        </ThemeProvider>
    );
};

export default App;
