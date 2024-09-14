import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';
import { AuthContext } from '../contexts/AuthContext';
import { useWebsite } from '../contexts/WebsiteContext';
import { getUserWebsites, deleteWebsite, logout } from '../services/api';

const UserAccountContainer = styled.div`
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    font-family: Arial, sans-serif;
`;

const Title = styled.h1`
    color: #333;
    margin-bottom: 20px;
`;

const WelcomeMessage = styled.p`
    font-size: 18px;
    margin-bottom: 20px;
`;

const Button = styled.button`
    background-color: #4a90e2;
    color: white;
    border: none;
    padding: 10px 15px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
    margin-right: 10px;
    transition: background-color 0.3s;

    &:hover {
        background-color: #357abd;
    }
`;

const WebsiteList = styled.ul`
    list-style-type: none;
    padding: 0;
`;

const WebsiteItem = styled.li`
    background-color: #f5f5f5;
    border-radius: 4px;
    padding: 15px;
    margin-bottom: 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const WebsiteName = styled.h3`
    margin: 0;
    color: #333;
`;

const ActionButtons = styled.div`
    display: flex;
    gap: 10px;
`;

const StyledLink = styled(Link)`
    text-decoration: none;
    color: #4a90e2;
    font-weight: bold;
    transition: color 0.3s;

    &:hover {
        color: #357abd;
    }
`;

const UserAccount = () => {
    const { user, setUser } = useContext(AuthContext);
    const { loadWebsite } = useWebsite();
    const [websites, setWebsites] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchWebsites = async () => {
            try {
                const userWebsites = await getUserWebsites();
                setWebsites(userWebsites);
            } catch (error) {
                console.error('Error fetching user websites:', error);
            }
        };

        if (user) {
            fetchWebsites();
        }
    }, [user]);

    const handleDeleteWebsite = async websiteId => {
        try {
            await deleteWebsite(websiteId);
            setWebsites(websites.filter(website => website._id !== websiteId));
        } catch (error) {
            console.error('Error deleting website:', error);
        }
    };

    const handleEditWebsite = async websiteId => {
        try {
            await loadWebsite(websiteId);
            navigate('/builder');
        } catch (error) {
            console.error('Error loading website:', error);
        }
    };

    const handlePreviewWebsite = async websiteId => {
        try {
            await loadWebsite(websiteId);
            navigate('/preview');
        } catch (error) {
            console.error('Error loading website for preview:', error);
        }
    };

    const handleLogout = async () => {
        try {
            await logout();
            setUser(null);
            navigate('/login');
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    if (!user) {
        return (
            <UserAccountContainer>
                <Title>User Account</Title>
                <WelcomeMessage>Please log in to view your account.</WelcomeMessage>
                <StyledLink to="/login">Login</StyledLink>
            </UserAccountContainer>
        );
    }

    return (
        <UserAccountContainer>
            <Title>User Account</Title>
            <WelcomeMessage>Welcome, {user.email}!</WelcomeMessage>
            <Button onClick={handleLogout}>Logout</Button>
            <Title as="h2">Your Landings</Title>
            {websites.length > 0 ? (
                <WebsiteList>
                    {websites.map(website => (
                        <WebsiteItem key={website._id}>
                            <WebsiteName>{website.designType}</WebsiteName>
                            <ActionButtons>
                                <Button onClick={() => handleEditWebsite(website._id)}>Edit</Button>
                                <Button onClick={() => handlePreviewWebsite(website._id)}>
                                    Preview
                                </Button>
                                <Button onClick={() => handleDeleteWebsite(website._id)}>
                                    Delete
                                </Button>
                            </ActionButtons>
                        </WebsiteItem>
                    ))}
                </WebsiteList>
            ) : (
                <WelcomeMessage>You haven't created any websites yet.</WelcomeMessage>
            )}
            <StyledLink to="/templates">Create New Website</StyledLink>
        </UserAccountContainer>
    );
};

export default UserAccount;
