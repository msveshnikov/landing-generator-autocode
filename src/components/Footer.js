import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Container, Grid, Typography, Link as MuiLink } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const Footer = () => {
    const theme = useTheme();

    const footerSections = [
        {
            title: 'Features',
            links: [
                { to: '/builder', text: 'Website Builder' },
                { to: '/templates', text: 'Templates' },
                { to: '/download', text: 'Download' }
            ]
        },
        {
            title: 'Resources',
            links: [
                { to: '/docs', text: 'Documentation' },

                
            ]
        },
        {
            title: 'Company',
            links: [
                { to: '/about', text: 'About Us' },
                { to: '/contact', text: 'Contact' },
                { to: '/terms', text: 'Terms of Service' },
                { to: '/privacy', text: 'Privacy Policy' }
            ]
        },
        {
            title: 'Connect',
            links: [
                { href: 'https://twitter.com/landingpagegen', text: 'Twitter' },
                { href: 'https://facebook.com/landingpagegen', text: 'Facebook' },
                { href: 'https://linkedin.com/company/landingpagegen', text: 'LinkedIn' }
            ]
        }
    ];

    return (
        <Box
            component="footer"
            sx={{
                backgroundColor: theme.palette.background.paper,
                py: 6,
                mt: 'auto'
            }}
        >
            <Container maxWidth="lg">
                <Grid container spacing={4} justifyContent="space-evenly">
                    {footerSections.map(section => (
                        <Grid item xs={12} sm={6} md={3} key={section.title}>
                            <Typography variant="h6" color="text.primary" gutterBottom>
                                {section.title}
                            </Typography>
                            <ul style={{ listStyle: 'none', padding: 0 }}>
                                {section.links.map(link => (
                                    <li key={link.text}>
                                        {link.to ? (
                                            <MuiLink
                                                component={Link}
                                                to={link.to}
                                                variant="body2"
                                                color="text.secondary"
                                                sx={{ display: 'inline-block', mb: 0.5 }}
                                            >
                                                {link.text}
                                            </MuiLink>
                                        ) : (
                                            <MuiLink
                                                href={link.href}
                                                variant="body2"
                                                color="text.secondary"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                sx={{ display: 'inline-block', mb: 0.5 }}
                                            >
                                                {link.text}
                                            </MuiLink>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </Grid>
                    ))}
                </Grid>
                <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 5 }}>
                    © {new Date().getFullYear()} MaxSoft. All rights reserved.
                </Typography>
            </Container>
        </Box>
    );
};

export default Footer;
