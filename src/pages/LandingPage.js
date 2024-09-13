import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../components/Header';
import Footer from '../components/Footer';

const LandingContainer = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
`;

const MainContent = styled.main`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 2rem;
`;

const Title = styled.h1`
    font-size: 3rem;
    margin-bottom: 1rem;
`;

const Subtitle = styled.p`
    font-size: 1.5rem;
    margin-bottom: 2rem;
`;

const CTAButton = styled(Link)`
    background-color: #007bff;
    color: white;
    padding: 1rem 2rem;
    border-radius: 4px;
    text-decoration: none;
    font-size: 1.2rem;
    transition: background-color 0.2s;

    &:hover {
        background-color: #0056b3;
    }
`;

const FeatureSection = styled.section`
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    margin-top: 3rem;
`;

const FeatureCard = styled.div`
    width: 250px;
    padding: 1.5rem;
    margin: 1rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    text-align: left;
`;

const FeatureTitle = styled.h3`
    font-size: 1.2rem;
    margin-bottom: 0.5rem;
`;

const FeatureDescription = styled.p`
    font-size: 1rem;
`;

const LandingPage = () => {
    return (
        <LandingContainer>
            <Header />
            <MainContent>
                <Title>Landing Page Generator</Title>
                <Subtitle>Create stunning landing pages with ease</Subtitle>
                <CTAButton to="/builder">Get Started</CTAButton>
                <FeatureSection>
                    <FeatureCard>
                        <FeatureTitle>User-Friendly Interface</FeatureTitle>
                        <FeatureDescription>
                            Easily select design elements and customize your landing page
                        </FeatureDescription>
                    </FeatureCard>
                    <FeatureCard>
                        <FeatureTitle>AI-Powered Generation</FeatureTitle>
                        <FeatureDescription>
                            Utilize the Sonnet 3.5 model to create professional HTML
                        </FeatureDescription>
                    </FeatureCard>
                    <FeatureCard>
                        <FeatureTitle>Real-Time Preview</FeatureTitle>
                        <FeatureDescription>
                            See your changes instantly with our live preview feature
                        </FeatureDescription>
                    </FeatureCard>
                    <FeatureCard>
                        <FeatureTitle>Iterative Improvement</FeatureTitle>
                        <FeatureDescription>
                            Refine your landing page with additional instructions
                        </FeatureDescription>
                    </FeatureCard>
                </FeatureSection>
            </MainContent>
            <Footer />
        </LandingContainer>
    );
};

export default LandingPage;
