import React, { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { sendContactForm } from '../services/api';

const Contact = () => {
    const { isDarkMode } = useTheme();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            // await sendContactForm(formData);
            setSubmitted(true);
        } catch (err) {
            setError('Failed to send message. Please try again later.');
        }
    };

    return (
        <div className={`container ${isDarkMode ? 'dark-mode' : ''}`}>
            <h1>Contact Us</h1>
            {submitted ? (
                <p>Thank you for your message. We'll get back to you soon!</p>
            ) : (
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="name">Name:</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="message">Message:</label>
                        <textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            required
                        ></textarea>
                    </div>
                    {error && <p className="error">{error}</p>}
                    <button type="submit">Send Message</button>
                </form>
            )}
        </div>
    );
};

export default Contact;