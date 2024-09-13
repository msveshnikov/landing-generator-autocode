import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useWebsite } from '../contexts/WebsiteContext';
import { improveLandingPage } from '../claude';

const PreviewContainer = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
`;

const PreviewContent = styled.div`
    flex: 1;
    padding: 20px;
`;

const IframeContainer = styled.div`
    width: 100%;
    height: 60vh;
    border: 1px solid #ddd;
    border-radius: 4px;
    overflow: hidden;
`;

const StyledIframe = styled.iframe`
    width: 100%;
    height: 100%;
    border: none;
`;

const ControlPanel = styled.div`
    margin-top: 20px;
`;

const TextArea = styled.textarea`
    width: 100%;
    height: 100px;
    margin-bottom: 10px;
`;

const Button = styled.button`
    margin-right: 10px;
    padding: 10px;
    background-color: #007bff;
    color: white;
    border: none;
    cursor: pointer;
`;

const Preview = () => {
    const navigate = useNavigate();
    const { website, updateWebsite } = useWebsite();
    const [additionalInstructions, setAdditionalInstructions] = useState('');

    useEffect(() => {
        if (!website.generatedHtml) {
            navigate('/builder');
        }
    }, [website.generatedHtml, navigate]);

    const handleAdditionalInstructionsChange = (e) => {
        setAdditionalInstructions(e.target.value);
    };

    const handleImprovePage = async () => {
        try {
            const improvedHtml = await improveLandingPage(website.generatedHtml, additionalInstructions);
            updateWebsite({ generatedHtml: improvedHtml });
        } catch (error) {
            console.error('Error improving landing page:', error);
        }
    };

    const handleDownload = () => {
        const blob = new Blob([website.generatedHtml], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'landing-page.html';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    return (
        <PreviewContainer>
            <Header />
            <PreviewContent>
                <h1>Landing Page Preview</h1>
                <IframeContainer>
                    <StyledIframe
                        title="Landing Page Preview"
                        srcDoc={website.generatedHtml}
                        sandbox="allow-scripts"
                    />
                </IframeContainer>
                <ControlPanel>
                    <TextArea
                        placeholder="Enter additional instructions for improvement"
                        value={additionalInstructions}
                        onChange={handleAdditionalInstructionsChange}
                    />
                    <Button onClick={handleImprovePage}>Improve Landing Page</Button>
                    <Button onClick={handleDownload}>Download HTML</Button>
                </ControlPanel>
            </PreviewContent>
            <Footer />
        </PreviewContainer>
    );
};

export default Preview;