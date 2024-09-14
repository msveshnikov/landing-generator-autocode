import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useWebsite } from '../contexts/WebsiteContext';

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
    border-radius: 4px;
    transition: background-color 0.3s;

    &:hover {
        background-color: #0056b3;
    }
`;

const Preview = () => {
    const navigate = useNavigate();
    const { website, improveWebsite, saveWebsite, downloadWebsiteHtml } = useWebsite();
    const [additionalInstructions, setAdditionalInstructions] = useState('');

    useEffect(() => {
        if (!website.html) {
            navigate('/builder');
        }
    }, [website.html, navigate]);

    const handleAdditionalInstructionsChange = (e) => {
        setAdditionalInstructions(e.target.value);
    };

    const handleImprovePage = async () => {
        try {
            await improveWebsite(additionalInstructions);
            setAdditionalInstructions('');
        } catch (error) {
            console.error('Error improving landing page:', error);
        }
    };

    const handleSave = async () => {
        try {
            await saveWebsite();
            alert('Website saved successfully!');
        } catch (error) {
            console.error('Error saving website:', error);
            alert('Failed to save website. Please try again.');
        }
    };

    const handleDownload = async () => {
        try {
            await downloadWebsiteHtml();
        } catch (error) {
            console.error('Error downloading website:', error);
            alert('Failed to download website. Please try again.');
        }
    };

    const handleBackToBuilder = () => {
        navigate('/builder');
    };

    return (
        <PreviewContainer>
            <PreviewContent>
                <h1>Landing Page Preview</h1>
                <IframeContainer>
                    <StyledIframe
                        title="Landing Page Preview"
                        srcDoc={website.html}
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
                    <Button onClick={handleSave}>Save</Button>
                    <Button onClick={handleDownload}>Download HTML</Button>
                    <Button onClick={handleBackToBuilder}>Back to Builder</Button>
                </ControlPanel>
            </PreviewContent>
        </PreviewContainer>
    );
};

export default Preview;