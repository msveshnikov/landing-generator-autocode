import React from 'react';
import styled from 'styled-components';
import { useWebsite } from '../contexts/WebsiteContext';
import { useNavigate } from 'react-router-dom';

const DownloadContainer = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
`;

const Content = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 2rem;
`;

const Title = styled.h1`
    font-size: 2rem;
    margin-bottom: 1rem;
`;

const Button = styled.button`
    background-color: #007bff;
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    font-size: 1rem;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.2s;
    margin: 0.5rem;

    &:hover {
        background-color: #0056b3;
    }
`;

const IframeContainer = styled.div`
    width: 100%;
    max-width: 800px;
    height: 400px;
    border: 1px solid #ddd;
    border-radius: 4px;
    overflow: hidden;
    margin-bottom: 1rem;
`;

const StyledIframe = styled.iframe`
    width: 100%;
    height: 100%;
    border: none;
`;

const Download = () => {
    const { website, downloadWebsiteHtml } = useWebsite();
    const navigate = useNavigate();

    const handleDownload = async () => {
        try {
            await downloadWebsiteHtml();
        } catch (error) {
            console.error('Error downloading website:', error);
        }
    };

    const handleEditWebsite = () => {
        navigate('/builder');
    };

    if (!website.html) {
        return (
            <DownloadContainer>
                <Content>
                    <Title>No Generated Website</Title>
                    <p>Please go back and generate a landing page first.</p>
                    <Button onClick={() => navigate('/builder')}>Go to Builder</Button>
                </Content>
            </DownloadContainer>
        );
    }

    return (
        <DownloadContainer>
            <Content>
                <Title>Download Your Landing Page</Title>
                <IframeContainer>
                    <StyledIframe
                        title="Landing Page Preview"
                        srcDoc={website.html}
                        sandbox="allow-scripts"
                    />
                </IframeContainer>
                <Button onClick={handleDownload}>Download HTML</Button>
                <Button onClick={handleEditWebsite}>Edit Website</Button>
            </Content>
        </DownloadContainer>
    );
};

export default Download;
