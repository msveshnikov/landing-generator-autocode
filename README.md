# Landing Page Generator

## Overview

This project is a Landing Page Generator that allows users to create custom landing pages by
selecting design types, colors, hero image URLs, and other imagery. Users can also provide a brief
product description. The generator uses the Sonnet 3.5 model to create an `index.html` file, which
is then displayed in an iframe and available for download. Users can iteratively improve the
generated page with additional instructions until they are satisfied. Works fully in browser.

## Features

-   User-friendly interface for selecting design elements
-   Multiple design types to choose from
-   Custom color selection with ColorPicker component
-   Option to add hero images and other imagery using ImageUploader
-   Brief product description input
-   AI-powered HTML generation using Sonnet 3.5 model
-   Real-time preview in an iframe
-   Download option for the generated HTML file
-   Iterative improvement process with user feedback
-   Authentication system for user accounts
-   Persistent storage of user-generated websites

## Technical Considerations

-   Ensure cross-browser compatibility
-   Implement a backend API for more advanced features
-   Consider serverless architecture for scalability
-   Optimize image uploads and storage
-   Implement caching mechanisms for improved performance
-   Ensure secure authentication and data protection
-   Implement proper error handling and logging

## Project Structure

-   `src/`: Contains the main React application code
    -   `components/`: Reusable UI components
    -   `contexts/`: React context providers for state management
    -   `pages/`: Individual page components
    -   `services/`: API and external service integrations
-   `server/`: Backend server implementation
-   `public/`: Static assets and entry HTML file

## Getting Started

1. Clone the repository
2. Install dependencies for both client and server:
    ```
    npm install
    cd server && npm install
    ```
3. Set up environment variables
4. Run the development server:
    ```
    npm run dev
    ```
5. Access the application through your web browser at `http://localhost:3000`

## Future Enhancements

-   Implement drag-and-drop functionality for easier layout customization
-   Add support for custom CSS input
-   Integrate with popular CMS platforms
-   Implement A/B testing capabilities for landing pages
-   Add analytics integration for performance tracking
-   Develop a template marketplace for user-created designs
-   Implement multi-language support for generated pages

## Contributing

Contributions are welcome! Please read our contributing guidelines and code of conduct before
submitting pull requests.

## License

This project is licensed under the MIT License.

# TODO

-   use this instructions for Claude but adopt for landing!!

You are a master game developer specializing in creating fun and engaging mobile games using HTML5,
CSS, and JavaScript. You understand the intricacies of touch input and mobile screen sizes. You will
always prioritize a visually appealing and responsive design.

Here's how to approach each game creation request:

Understand the Game: Carefully analyze the user's request, identifying the game genre, mechanics,
and any specific features. Plan: Before coding, outline the game structure, including: Core
Mechanics: How the game is played, win/loss conditions. Visuals: Basic UI/UX, color schemes, assets
needed. Basic Setup: HTML structure, canvas, initial CSS, core game variables, load sounds (if any).
Start Menu: Always include an interactive start menu with game title, play button, and visually
appealing design. Core Gameplay: Implement the game loop, player controls, game mechanics, and basic
rendering. Polish: Add sound effects, game over conditions, scoring, visual enhancements, and mobile
responsiveness. Save to Artifact Storage: Always save the complete game code as a single artifact of
type """"""""html"""""""". Please never use base64 assets in data-urls, use some known http urls
from clouds

Important Considerations:

Mobile Responsiveness: Use CSS media queries to adapt to different screen sizes. Touch Input: Use
touchstart, touchmove, and touchend events for player controls. Performance: Optimize code for
smooth gameplay on mobile devices. Cordova/PhoneGap: Keep in mind that the code will be packaged
using Cordova for Android and iOS. Visual Appeal: Use appealing color schemes, simple and intuitive
UI.",
