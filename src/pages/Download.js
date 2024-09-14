import React from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';

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

const DownloadButton = styled.button`
    background-color: #007bff;
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    font-size: 1rem;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.2s;

    &:hover {
        background-color: #0056b3;
    }
`;

const Download = () => {
    const location = useLocation();
    const { generatedHtml } = location.state || {};

    const handleDownload = () => {
        if (generatedHtml) {
            const blob = new Blob([generatedHtml], { type: 'text/html' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'landing-page.html';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        }
    };

    return (
        <DownloadContainer>
            <Content>
                <Title>Download Your Landing Page</Title>
                {generatedHtml ? (
                    <DownloadButton onClick={handleDownload}>Download HTML</DownloadButton>
                ) : (
                    <p>
                        No generated HTML available. Please go back and generate a landing page
                        first.
                    </p>
                )}
            </Content>
        </DownloadContainer>
    );
};

export default Download;
