import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import Builder from './pages/Builder';
import Preview from './pages/Preview';
import Download from './pages/Download';
import LandingPage from './pages/LandingPage';
import NotFound from './pages/NotFound';
import Login from './pages/Login';
import Register from './pages/Register';
import UserAccount from './pages/UserAccount';
import Templates from './pages/Templates';
import { AuthProvider } from './contexts/AuthContext';
import { WebsiteProvider } from './contexts/WebsiteContext';

const AppWrapper = styled.div`
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    font-family: 'Roboto', sans-serif;
`;

const ContentWrapper = styled.div`
    flex: 1;
`;

const App = () => {
    return (
        <AuthProvider>
            <WebsiteProvider>
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
                                <Route path="*" element={<NotFound />} />
                            </Routes>
                        </ContentWrapper>
                    </AppWrapper>
                </Router>
            </WebsiteProvider>
        </AuthProvider>
    );
};

export default App;
