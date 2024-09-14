# Landing Page Generator - Project Documentation

## Table of Contents

1. [Project Overview](#project-overview)
2. [Architecture](#architecture)
3. [Features](#features)
4. [Installation](#installation)
5. [Usage](#usage)
6. [Module Interactions](#module-interactions)
7. [Technical Considerations](#technical-considerations)
8. [Future Enhancements](#future-enhancements)
9. [Contributing](#contributing)
10. [License](#license)

## Project Overview

The Landing Page Generator is a web application that enables users to create custom landing pages
without coding knowledge. It leverages the power of AI, specifically the Sonnet 3.5 model, to
generate HTML based on user inputs and preferences. The project aims to simplify the process of
creating professional-looking landing pages for marketers, entrepreneurs, and small businesses.

Key aspects of the project include:

-   User-friendly interface for selecting design elements
-   AI-powered HTML generation
-   Real-time preview of generated pages
-   Iterative improvement process
-   User authentication and account management
-   Persistent storage of user-generated websites

## Architecture

The Landing Page Generator follows a client-server architecture with a React frontend and a Node.js
backend. The project structure is organized as follows:

```
landing-page-generator/
├── src/                 # React application source code
│   ├── components/      # Reusable UI components
│   ├── contexts/        # React context providers
│   ├── pages/           # Individual page components
│   └── services/        # API and external service integrations
├── server/              # Backend server implementation
├── public/              # Static assets and entry HTML file
├── docs/                # Additional documentation
└── docker-compose.yml   # Docker configuration for deployment
```

The application uses:

-   React for the frontend
-   Node.js and Express for the backend
-   MongoDB for data persistence
-   Docker for containerization and deployment

## Features

1. Multiple design types to choose from
2. Custom color selection with ColorPicker component
3. Image upload functionality for hero images and other visuals
4. AI-powered HTML generation using Sonnet 3.5 model
5. Real-time preview in an iframe
6. Download option for generated HTML files
7. Iterative improvement process with user feedback
8. User authentication system
9. Persistent storage of user-generated websites
10. Template selection for quick start designs
11. User account management

## Installation

To set up the project locally, follow these steps:

1. Clone the repository:

    ```
    git clone https://github.com/your-repo/landing-page-generator.git
    cd landing-page-generator
    ```

2. Install dependencies for both client and server:

    ```
    npm install
    cd server && npm install
    ```

3. Set up environment variables in `/server/.env`:

    ```
    CLAUDE_KEY=your_claude_api_key
    MONGODB_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret
    ```

4. Run the development server:

    ```
    npm run dev
    ```

5. Access the application through your web browser at `http://localhost:3000`

## Usage

1. Register for an account or log in if you already have one.
2. Choose a design type or start with a template.
3. Customize colors using the ColorPicker component.
4. Upload images for the hero section and other areas.
5. Provide a brief product description.
6. Use the AI-powered generator to create your landing page.
7. Preview the generated page in real-time.
8. Iteratively improve the page by providing additional instructions.
9. Once satisfied, download the generated HTML file.
10. Optionally, save your project for future editing.

## Module Interactions

-   `AuthContext.js`: Manages user authentication state across the application.
-   `WebsiteContext.js`: Stores and provides access to the current website design state.
-   `api.js`: Handles communication with the backend server.
-   `Builder.js`: Main page for customizing and generating landing pages.
-   `Preview.js`: Displays real-time preview of the generated landing page.
-   `Download.js`: Handles the download process for generated HTML files.
-   `ColorPicker.js`: Component for selecting custom colors.
-   `ImageUploader.js`: Manages image uploads for the landing page.

The backend server (`server/index.js`) processes requests from the frontend, interacts with the
database, and communicates with the Sonnet 3.5 model for HTML generation.

## Technical Considerations

-   Cross-browser compatibility
-   Responsive design for mobile devices
-   Secure authentication and data protection
-   Error handling and logging
-   Use of React Context API for state management
-   Optimization of API calls to reduce latency
-   Implementation of lazy loading for improved performance
-   Progressive Web App (PWA) features

## Future Enhancements

1. Custom CSS input support
2. Integration with popular CMS platforms
3. A/B testing capabilities
4. Analytics integration
5. Template marketplace
6. Multi-language support
7. SEO optimization tools
8. Social media integration
9. Email marketing integration
10. Version control for user-generated pages

## Contributing

Contributions to the Landing Page Generator project are welcome. Please read our contributing
guidelines and code of conduct before submitting pull requests.

## License

This project is licensed under the MIT License. See the LICENSE file for details.
