import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';

const HeaderContainer = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 2rem;
    background-color: ${({ theme }) => theme.colors.header.background};
    box-shadow: 0 2px 4px ${({ theme }) => theme.colors.shadow};
`;

const Logo = styled(Link)`
    font-size: 1.5rem;
    font-weight: bold;
    color: ${({ theme }) => theme.colors.header.text};
    text-decoration: none;
    font-family: 'Arial', sans-serif;
`;

const Nav = styled.nav`
    display: flex;
    gap: 1rem;
    align-items: center;
`;

const NavLink = styled(Link)`
    color: ${({ theme }) => theme.colors.header.text};
    text-decoration: none;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    transition: background-color 0.2s;
    font-family: 'Arial', sans-serif;

    &:hover {
        background-color: ${({ theme }) => theme.colors.primary}40;
    }
`;

const Button = styled.button`
    background-color: ${({ theme }) => theme.colors.button.background};
    color: ${({ theme }) => theme.colors.button.text};
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.2s;
    font-family: 'Arial', sans-serif;

    &:hover {
        opacity: 0.9;
    }
`;

const ThemeToggle = styled.button`
    background-color: transparent;
    border: none;
    color: ${({ theme }) => theme.colors.header.text};
    font-size: 1.5rem;
    cursor: pointer;
    padding: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Header = () => {
    const { isAuthenticated, logout } = useAuth();
    const { theme } = useTheme();

    return (
        <HeaderContainer theme={theme}>
            <Logo to="/" theme={theme}>
                Landing Page Generator
            </Logo>
            <Nav>
                <NavLink to="/templates" theme={theme}>
                    Templates
                </NavLink>
                <NavLink to="/builder" theme={theme}>
                    Builder
                </NavLink>
                {isAuthenticated ? (
                    <>
                        <NavLink to="/user-account" theme={theme}>
                            Account
                        </NavLink>
                        <Button onClick={logout} theme={theme}>
                            Logout
                        </Button>
                    </>
                ) : (
                    <>
                        <NavLink to="/login" theme={theme}>
                            Login
                        </NavLink>
                        <NavLink to="/register" theme={theme}>
                            Register
                        </NavLink>
                    </>
                )}
                <ThemeToggle onClick={theme.toggleTheme} theme={theme}>
                    {theme.isDarkMode ? '🌞' : '🌙'}
                </ThemeToggle>
            </Nav>
        </HeaderContainer>
    );
};

export default Header;