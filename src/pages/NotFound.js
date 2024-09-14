import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const NotFoundContainer = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
`;

const Content = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 2rem;
`;

const Title = styled.h1`
    font-size: 3rem;
    margin-bottom: 1rem;
`;

const Message = styled.p`
    font-size: 1.2rem;
    margin-bottom: 2rem;
`;

const StyledLink = styled(Link)`
    background-color: #007bff;
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    text-decoration: none;
    transition: background-color 0.2s;

    &:hover {
        background-color: #0056b3;
    }
`;

const NotFound = () => {
    return (
        <NotFoundContainer>
            <Content>
                <Title>404 - Page Not Found</Title>
                <Message>The page you are looking for does not exist.</Message>
                <StyledLink to="/">Return to Home</StyledLink>
            </Content>
        </NotFoundContainer>
    );
};

export default NotFound;
