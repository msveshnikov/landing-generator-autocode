import React from 'react';
import { useTheme } from '../contexts/ThemeContext';

const About = () => {
    const { isDarkMode } = useTheme();

    return (
        <div className={`about-page ${isDarkMode ? 'dark-mode' : ''}`}>
            <h1>About Landing Page Generator</h1>
            <section>
                <h2>Overview</h2>
                <p>
                    Landing Page Generator is a powerful tool that allows users to create custom
                    landing pages by selecting design types, colors, hero image URLs, and other
                    imagery. With a user-friendly interface and AI-powered generation, you can
                    quickly create professional landing pages tailored to your needs.
                </p>
            </section>
            <section>
                <h2>Key Features</h2>
                <ul>
                    <li>Multiple design types to choose from</li>
                    <li>Custom color selection with ColorPicker component</li>
                    <li>Hero image and additional imagery upload options</li>
                    <li>AI-powered HTML generation using Sonnet 3.5 model</li>
                    <li>Real-time preview and iterative improvement process</li>
                    <li>User authentication and account management</li>
                    <li>Persistent storage of user-generated websites</li>
                    <li>Template selection for quick start designs</li>
                </ul>
            </section>
            <section>
                <h2>Technology Stack</h2>
                <p>
                    Our landing page generator is built using modern web technologies, including
                    React for the frontend, Node.js for the backend, and MongoDB for data storage.
                    We utilize the Sonnet 3.5 model for AI-powered HTML generation and implement
                    various optimizations for performance and scalability.
                </p>
            </section>
            <section>
                <h2>Future Enhancements</h2>
                <p>
                    We are constantly working to improve our landing page generator. Some planned
                    enhancements include custom CSS input, CMS platform integration, A/B testing
                    capabilities, analytics integration, and a template marketplace for user-created
                    designs.
                </p>
            </section>
            <section>
                <h2>Get Started</h2>
                <p>
                    Ready to create your own landing page? Sign up for an account and start
                    designing your perfect landing page today!
                </p>
            </section>
        </div>
    );
};

export default About;
