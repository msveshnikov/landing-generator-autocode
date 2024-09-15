import React from 'react';
import { Link } from 'react-router-dom';
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    IconButton,
    Box,
    useMediaQuery,
    Menu,
    MenuItem
} from '@mui/material';
import { Brightness4, Brightness7, Menu as MenuIcon } from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';

const Header = () => {
    const { isAuthenticated, logout } = useAuth();
    const { theme, toggleTheme } = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleMenuOpen = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const renderNavLinks = () => (
        <>
            <Button color="inherit" component={Link} to="/templates">
                Templates
            </Button>
            <Button color="inherit" component={Link} to="/builder">
                Builder
            </Button>
            {isAuthenticated ? (
                <>
                    <Button color="inherit" component={Link} to="/user-account">
                        Account
                    </Button>
                    <Button color="inherit" onClick={logout}>
                        Logout
                    </Button>
                </>
            ) : (
                <>
                    <Button color="inherit" component={Link} to="/login">
                        Login
                    </Button>
                    <Button color="inherit" component={Link} to="/register">
                        Register
                    </Button>
                </>
            )}
        </>
    );

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography
                    variant="h6"
                    component={Link}
                    to="/"
                    sx={{ flexGrow: 1, textDecoration: 'none', color: 'inherit' }}
                >
                    Landing Page Generator
                </Typography>
                {isMobile ? (
                    <>
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            onClick={handleMenuOpen}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={handleMenuClose}
                        >
                            {renderNavLinks()}
                            <MenuItem onClick={toggleTheme}>
                                {theme.palette.mode === 'dark' ? 'Light Mode' : 'Dark Mode'}
                            </MenuItem>
                        </Menu>
                    </>
                ) : (
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        {renderNavLinks()}
                        <IconButton onClick={toggleTheme} color="inherit">
                            {theme.palette.mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
                        </IconButton>
                    </Box>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default Header;
