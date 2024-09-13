# Landing Page Generator

## Overview

This project is a Landing Page Generator that allows users to create custom landing pages by
selecting design types, colors, hero image URLs, and other imagery. Users can also provide a brief
product description. The generator uses the Sonnet 3.5 model to create an `index.html` file, which
is then displayed in an iframe and available for download. Users can iteratively improve the
generated page with additional instructions until they are satisfied. Works fully in browser

## Features

-   User-friendly interface for selecting design elements
-   Multiple design types to choose from
-   Custom color selection
-   Option to add hero images and other imagery
-   Brief product description input
-   AI-powered HTML generation using Sonnet 3.5 model
-   Real-time preview in an iframe
-   Download option for the generated HTML file
-   Iterative improvement process with user feedback

## Technical Considerations

-   Implement a modular architecture for easy feature additions
-   react router v6
-   Ensure cross-browser compatibility
-   Consider implementing a backend API for more advanced features
-   Consider serverless architecture for scalability

## Getting Started

1. Clone the repository
2. Set REACT_APP_CLAUDE_KEY variable in .env
3. Install dependencies
4. Run the development server
5. Access the application through your web browser

# TODO

-   Fix ERROR
useAuth must be used within an AuthProvider
    at useAuth (http://localhost:3000/main.aa02d4e8e67abd057fec.hot-update.js:32:11)
    at Header (http://localhost:3000/main.f0759b045f59cdc68842.hot-update.js:79:78)

