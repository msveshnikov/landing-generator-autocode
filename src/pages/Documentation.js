import React from 'react';
import { useTheme } from '../contexts/ThemeContext';

const Documentation = () => {
    const { isDarkMode } = useTheme();

    const sections = [
        {
            title: 'Overview',
            content: `The Landing Page Generator is a powerful tool that allows users to create custom landing pages by selecting design types, colors, hero image URLs, and other imagery. Users can provide a brief product description, and the generator uses the Sonnet 3.5 model to create a landing page and allow download. The process is iterative, allowing users to improve the generated page with additional instructions until they are satisfied.`
        },
        {
            title: 'Features',
            content: (
                <ul>
                    <li>User-friendly interface for selecting design elements</li>
                    <li>Multiple design types to choose from</li>
                    <li>Custom color selection with ColorPicker component</li>
                    <li>Option to add hero images and other imagery using ImageUploader</li>
                    <li>Brief product description input</li>
                    <li>AI-powered HTML generation using Sonnet 3.5 model</li>
                    <li>Real-time preview in an iframe</li>
                    <li>Download option for the generated HTML file</li>
                    <li>Iterative improvement process with user feedback</li>
                    <li>Authentication system for user accounts</li>
                    <li>Persistent storage of user-generated websites</li>
                    <li>Template selection for quick start designs</li>
                    <li>User account management</li>
                </ul>
            )
        },
        {
            title: 'Technical Considerations',
            content: (
                <ul>
                    <li>Cross-browser compatibility</li>
                    <li>Backend API for advanced features</li>
                    <li>Serverless architecture for scalability</li>
                    <li>Secure authentication and data protection</li>
                    <li>Proper error handling and logging</li>
                    <li>Context API for state management</li>
                    <li>Responsive design for mobile compatibility</li>
                    <li>Optimized API calls to reduce latency</li>
                    <li>Lazy loading for improved performance</li>
                    <li>Progressive web app (PWA) features</li>
                </ul>
            )
        },
        {
            title: 'Project Structure',
            content: (
                <pre>
                    {`
- src/: Contains the main React application code
  - components/: Reusable UI components
  - contexts/: React context providers for state management
  - pages/: Individual page components
  - services/: API and external service integrations
- server/: Backend server implementation
- public/: Static assets and entry HTML file
          `}
                </pre>
            )
        },
        {
            title: 'Getting Started',
            content: (
                <ol>
                    <li>Clone the repository</li>
                    <li>
                        Install dependencies for both client and server:
                        <pre>
                            {`
npm install
cd server && npm install
              `}
                        </pre>
                    </li>
                    <li>
                        Set up environment variables in /server/.env
                        <ul>
                            <li>CLAUDE_KEY</li>
                            <li>MONGODB_URI</li>
                            <li>JWT_SECRET</li>
                        </ul>
                    </li>
                    <li>
                        Run the development server:
                        <pre>npm run dev</pre>
                    </li>
                    <li>
                        Access the application through your web browser at http://localhost:3000
                    </li>
                </ol>
            )
        },
        {
            title: 'Future Enhancements',
            content: (
                <ul>
                    <li>Support for custom CSS input</li>
                    <li>Integration with popular CMS platforms</li>
                    <li>A/B testing capabilities for landing pages</li>
                    <li>Analytics integration for performance tracking</li>
                    <li>Template marketplace for user-created designs</li>
                    <li>Multi-language support for generated pages</li>
                    <li>SEO optimization tools for generated pages</li>
                    <li>Social media integration for sharing and promotion</li>
                    <li>Email marketing integration for lead capture</li>
                    <li>Version control for user-generated pages</li>
                    <li>Support for custom domains and hosting</li>
                </ul>
            )
        },
        {
            title: 'Design Ideas',
            content: (
                <ul>
                    <li>Dark mode toggle for improved user experience</li>
                    <li>Guided tour for new users to showcase features</li>
                    <li>Live chat support system for user assistance</li>
                    <li>Dashboard for users to manage multiple landing pages</li>
                    <li>Feedback system for users to rate and review templates</li>
                    <li>Notification system for updates and new features</li>
                    <li>Blog section for landing page design tips and tricks</li>
                    <li>Community forum for users to share ideas and get help</li>
                    <li>Recommendation system for design elements based on user preferences</li>
                    <li>Drag-and-drop interface for easier layout customization</li>
                    <li>Color scheme generator based on uploaded images</li>
                    <li>Mobile app version for on-the-go editing</li>
                    <li>Integration with popular design tools (e.g., Figma, Sketch)</li>
                    <li>AI-powered content suggestions for landing page copy</li>
                    <li>Feature for exporting designs to popular e-commerce platforms</li>
                    <li>Collaborative editing feature for team projects</li>
                    <li>Design history feature to track and revert changes</li>
                    <li>Support for custom fonts and typography options</li>
                    <li>Performance optimization tool for generated pages</li>
                </ul>
            )
        },
        {
            title: 'DevOps and Deployment',
            content: (
                <ul>
                    <li>Continuous integration and deployment (CI/CD) pipeline</li>
                    <li>Docker containerization for easy deployment and scaling</li>
                    <li>Automated testing for both frontend and backend</li>
                    <li>Monitoring and logging for production environment</li>
                    <li>Database backups and disaster recovery plans</li>
                    <li>Load balancing for high availability</li>
                    <li>Caching strategies for improved performance</li>
                    <li>Staging environments for testing before production deployment</li>
                    <li>Infrastructure as code (IaC) for reproducible deployments</li>
                </ul>
            )
        },
        {
            title: 'Security Considerations',
            content: (
                <ul>
                    <li>HTTPS for secure communication</li>
                    <li>Rate limiting to prevent abuse</li>
                    <li>Input validation and sanitization</li>
                    <li>Secure session management</li>
                    <li>Regular updates of dependencies to patch security vulnerabilities</li>
                    <li>CSRF protection</li>
                    <li>Security headers (e.g., Content Security Policy)</li>
                    <li>Regular security audits and penetration testing</li>
                </ul>
            )
        },
        {
            title: 'Contributing',
            content:
                'Contributions are welcome! Please read our contributing guidelines and code of conduct before submitting pull requests.'
        },
        {
            title: 'License',
            content: 'This project is licensed under the MIT License.'
        }
    ];

    return (
        <div className={`documentation ${isDarkMode ? 'dark' : 'light'}`}>
            <h1>Documentation</h1>
            {sections.map((section, index) => (
                <section key={index}>
                    <h2>{section.title}</h2>
                    {typeof section.content === 'string' ? (
                        <p>{section.content}</p>
                    ) : (
                        section.content
                    )}
                </section>
            ))}
        </div>
    );
};

export default Documentation;
