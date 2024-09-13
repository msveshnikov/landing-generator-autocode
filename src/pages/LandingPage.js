import React from 'react';
import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import Header from '../components/Header';
import Footer from '../components/Footer';

const gradientAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const LandingContainer = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
    background-size: 400% 400%;
    animation: ${gradientAnimation} 15s ease infinite;
`;

const MainContent = styled.main`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 2rem;
    color: white;
`;

const Title = styled.h1`
    font-size: 4rem;
    margin-bottom: 1rem;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
`;

const Subtitle = styled.p`
    font-size: 1.8rem;
    margin-bottom: 2rem;
    max-width: 600px;
`;

const CTAButton = styled(Link)`
    background-color: rgba(255, 255, 255, 0.2);
    color: white;
    padding: 1rem 2rem;
    border-radius: 50px;
    text-decoration: none;
    font-size: 1.4rem;
    transition: all 0.3s ease;
    border: 2px solid white;

    &:hover {
        background-color: white;
        color: #e73c7e;
        transform: translateY(-3px);
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
    }
`;

const FeatureSection = styled.section`
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    margin-top: 4rem;
    max-width: 1200px;
`;

const FeatureCard = styled.div`
    width: 250px;
    padding: 2rem;
    margin: 1rem;
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: 15px;
    backdrop-filter: blur(10px);
    transition: transform 0.3s ease;

    &:hover {
        transform: translateY(-10px);
    }
`;

const FeatureTitle = styled.h3`
    font-size: 1.4rem;
    margin-bottom: 1rem;
    color: white;
`;

const FeatureDescription = styled.p`
    font-size: 1rem;
    color: rgba(255, 255, 255, 0.8);
`;

const LandingPage = () => {
    return (
        <LandingContainer>
            <Header />
            <MainContent>
                <Title>Landing Page Generator</Title>
                <Subtitle>
                    Create stunning, professional landing pages in minutes with AI-powered
                    technology
                </Subtitle>
                <CTAButton to="/builder">Start Creating</CTAButton>
                <FeatureSection>
                    <FeatureCard>
                        <FeatureTitle>Intuitive Design Interface</FeatureTitle>
                        <FeatureDescription>
                            Drag-and-drop elements and customize your page with ease
                        </FeatureDescription>
                    </FeatureCard>
                    <FeatureCard>
                        <FeatureTitle>AI-Powered Generation</FeatureTitle>
                        <FeatureDescription>
                            Leverage Sonnet 3.5 model to create professional-grade HTML
                        </FeatureDescription>
                    </FeatureCard>
                    <FeatureCard>
                        <FeatureTitle>Real-Time Preview</FeatureTitle>
                        <FeatureDescription>
                            See your changes instantly with our live preview feature
                        </FeatureDescription>
                    </FeatureCard>
                    <FeatureCard>
                        <FeatureTitle>Iterative Refinement</FeatureTitle>
                        <FeatureDescription>
                            Perfect your landing page with AI-assisted improvements
                        </FeatureDescription>
                    </FeatureCard>
                </FeatureSection>
            </MainContent>
            <Footer />
        </LandingContainer>
    );
};

export default LandingPage;
