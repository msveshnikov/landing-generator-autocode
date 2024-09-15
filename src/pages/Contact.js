import React, { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import {
    Container,
    Typography,
    TextField,
    Button,
    Box,
    Paper,
    Snackbar,
    Alert
} from '@mui/material';

const Contact = () => {
    const { isDarkMode } = useTheme();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState('');
    const [snackbarOpen, setSnackbarOpen] = useState(false);

    const handleChange = e => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async e => {
        e.preventDefault();
        setError('');
        try {
            //   await sendContactForm(formData);
            setSubmitted(true);
            setSnackbarOpen(true);
        } catch (err) {
            setError('Failed to send message. Please try again later.');
        }
    };

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbarOpen(false);
    };

    return (
        <Container maxWidth="sm">
            <Paper
                elevation={3}
                sx={{
                    p: 4,
                    mt: 4,
                    backgroundColor: isDarkMode ? 'grey.800' : 'background.paper'
                }}
            >
                <Typography variant="h4" component="h1" gutterBottom>
                    Contact Us
                </Typography>
                {submitted ? (
                    <Typography>Thank you for your message. We'll get back to you soon!</Typography>
                ) : (
                    <Box component="form" onSubmit={handleSubmit} noValidate>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="name"
                            label="Name"
                            name="name"
                            autoComplete="name"
                            value={formData.name}
                            onChange={handleChange}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="message"
                            label="Message"
                            id="message"
                            multiline
                            rows={4}
                            value={formData.message}
                            onChange={handleChange}
                        />
                        {error && (
                            <Typography color="error" sx={{ mt: 2 }}>
                                {error}
                            </Typography>
                        )}
                        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                            Send Message
                        </Button>
                    </Box>
                )}
            </Paper>
            <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
                    Message sent successfully!
                </Alert>
            </Snackbar>
        </Container>
    );
};

export default Contact;
