import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../contexts/AuthContext';

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: #4a90e2;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Logo = styled(Link)`
  font-size: 1.5rem;
  font-weight: bold;
  color: white;
  text-decoration: none;
  font-family: 'Arial', sans-serif;
`;

const Nav = styled.nav`
  display: flex;
  gap: 1rem;
`;

const NavLink = styled(Link)`
  color: white;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: background-color 0.2s;
  font-family: 'Arial', sans-serif;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

const Button = styled.button`
  background-color: white;
  color: #4a90e2;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;
  font-family: 'Arial', sans-serif;

  &:hover {
    background-color: #f0f0f0;
  }
`;

const Header = () => {
  const { isAuthenticated, logout } = useAuth();

  return (
    <HeaderContainer>
      <Logo to="/">Landing Page Generator</Logo>
      <Nav>
        <NavLink to="/templates">Templates</NavLink>
        <NavLink to="/builder">Builder</NavLink>
        {isAuthenticated ? (
          <>
            <NavLink to="/user-account">Account</NavLink>
            <Button onClick={logout}>Logout</Button>
          </>
        ) : (
          <>
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/register">Register</NavLink>
          </>
        )}
      </Nav>
    </HeaderContainer>
  );
};

export default Header;