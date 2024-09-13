import React from 'react';
import styled from 'styled-components';
import Header from '../components/Header';
import Footer from '../components/Footer';

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
    height: 80vh;
    border: 1px solid #ddd;
    border-radius: 4px;
    overflow: hidden;
`;

const StyledIframe = styled.iframe`
    width: 100%;
    height: 100%;
    border: none;
`;

const Preview = () => {
    const generatedHtml = localStorage.getItem('generatedHtml');

    return (
        <PreviewContainer>
            <Header />
            <PreviewContent>
                <h1>Landing Page Preview</h1>
                <IframeContainer>
                    <StyledIframe
                        title="Landing Page Preview"
                        srcDoc={generatedHtml}
                        sandbox="allow-scripts"
                    />
                </IframeContainer>
            </PreviewContent>
            <Footer />
        </PreviewContainer>
    );
};

export default Preview;
