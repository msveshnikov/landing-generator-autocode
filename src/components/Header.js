import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, IconButton, styled } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';
import { useTheme as useCustomTheme } from '../contexts/ThemeContext';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
    backgroundColor: theme.palette.background.paper
}));

const StyledToolbar = styled(Toolbar)({
    display: 'flex',
    justifyContent: 'space-between'
});

const NavLinks = styled('div')({
    display: 'flex',
    alignItems: 'center'
});

const StyledLink = styled(Link)(({ theme }) => ({
    color: theme.palette.text.primary,
    textDecoration: 'none',
    marginRight: theme.spacing(2),
    '&:hover': {
        textDecoration: 'underline'
    }
}));

const Header = () => {
    const { isAuthenticated, logout } = useAuth();
    const { theme, toggleTheme } = useCustomTheme();

    return (
        <StyledAppBar position="static">
            <StyledToolbar>
                <Typography
                    variant="h6"
                    component={Link}
                    to="/"
                    color="inherit"
                    sx={{ textDecoration: 'none' }}
                >
                    Landing Page Generator
                </Typography>
                <NavLinks>
                    <StyledLink to="/templates">Templates</StyledLink>
                    <StyledLink to="/builder">Builder</StyledLink>
                    {isAuthenticated ? (
                        <>
                            <StyledLink to="/user-account">Account</StyledLink>
                            <Button color="inherit" onClick={logout}>
                                Logout
                            </Button>
                        </>
                    ) : (
                        <>
                            <StyledLink to="/login">Login</StyledLink>
                            <StyledLink to="/register">Register</StyledLink>
                        </>
                    )}
                    <IconButton onClick={toggleTheme} color="inherit">
                        {theme.isDarkMode ? <Brightness7 /> : <Brightness4 />}
                    </IconButton>
                </NavLinks>
            </StyledToolbar>
        </StyledAppBar>
    );
};

export default Header;
