import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import Builder from './pages/Builder';
import Preview from './pages/Preview';
import Download from './pages/Download';
import LandingPage from './pages/LandingPage';
import NotFound from './pages/NotFound';
import { AuthProvider } from './contexts/AuthContext';
import { WebsiteProvider } from './contexts/WebsiteContext';
import Header from './components/Header';
import Footer from './components/Footer';

const AppWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
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
            </Helmet>
            <Header />
            <ContentWrapper>
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/builder" element={<Builder />} />
                <Route path="/preview" element={<Preview />} />
                <Route path="/download" element={<Download />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </ContentWrapper>
            <Footer />
          </AppWrapper>
        </Router>
      </WebsiteProvider>
    </AuthProvider>
  );
};

export default App;