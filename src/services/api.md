# API Service Documentation

## Overview

This file (`src/services/api.js`) contains the API service for the application. It sets up an Axios
instance for making HTTP requests to the backend server and provides various functions for
interacting with the API endpoints. The service handles authentication, user management, website
generation, and other core functionalities of the application.

## Configuration

-   The base URL for the API is set using the `REACT_APP_API_BASE_URL` environment variable or
    defaults to `'http://localhost:3001'`.
-   An Axios instance is created with the base URL and default headers.
-   Request and response interceptors are set up to handle authentication and token management.

## API Functions

### User Management

#### `registerUser(email, password)`

Registers a new user.

-   Parameters:
    -   `email`: User's email address
    -   `password`: User's password
-   Returns: Promise resolving to the registration response data

#### `loginUser(email, password)`

Logs in a user and stores the authentication token.

-   Parameters:
    -   `email`: User's email address
    -   `password`: User's password
-   Returns: Promise resolving to the login response data

#### `logout()`

Logs out the current user and removes the authentication token.

-   Returns: Promise resolving when logout is complete

#### `getCurrentUser()`

Fetches the current user's information.

-   Returns: Promise resolving to the current user's data

#### `updateUserProfile(profileData)`

Updates the user's profile information.

-   Parameters:
    -   `profileData`: Object containing updated profile information
-   Returns: Promise resolving to the updated user data

### Website Management

#### `generateLandingPage(designType, colors, heroImageUrl, otherImagery, productDescription, components)`

Generates a new landing page based on the provided parameters.

-   Parameters:
    -   `designType`: Type of design for the landing page
    -   `colors`: Color scheme for the page
    -   `heroImageUrl`: URL of the hero image
    -   `otherImagery`: Additional imagery for the page
    -   `productDescription`: Description of the product or service
    -   `components`: Components to include in the page
-   Returns: Promise resolving to the generated landing page data

#### `improveLandingPage(websiteId, userFeedback)`

Improves an existing landing page based on user feedback.

-   Parameters:
    -   `websiteId`: ID of the website to improve
    -   `userFeedback`: User's feedback for improvements
-   Returns: Promise resolving to the improved landing page data

#### `getUserWebsites()`

Fetches all websites associated with the current user.

-   Returns: Promise resolving to an array of user's websites

#### `getWebsiteById(websiteId)`

Fetches a specific website by its ID.

-   Parameters:
    -   `websiteId`: ID of the website to fetch
-   Returns: Promise resolving to the website data

#### `updateWebsite(websiteId, websiteData)`

Updates a specific website.

-   Parameters:
    -   `websiteId`: ID of the website to update
    -   `websiteData`: Object containing updated website information
-   Returns: Promise resolving to the updated website data

#### `deleteWebsite(websiteId)`

Deletes a specific website.

-   Parameters:
    -   `websiteId`: ID of the website to delete
-   Returns: Promise resolving when the website is deleted

#### `downloadWebsite(websiteId)`

Downloads a specific website.

-   Parameters:
    -   `websiteId`: ID of the website to download
-   Returns: Promise resolving to a Blob containing the website data

#### `getWebsiteAnalytics(websiteId)`

Fetches analytics data for a specific website.

-   Parameters:
    -   `websiteId`: ID of the website to get analytics for
-   Returns: Promise resolving to the website's analytics data

### Template Management

#### `fetchTemplates()`

Fetches all available templates.

-   Returns: Promise resolving to an array of templates

#### `saveTemplate(templateData)`

Saves a new template.

-   Parameters:
    -   `templateData`: Object containing template information
-   Returns: Promise resolving to the saved template data

### Utility Functions

#### `getDesignTypes()`

Fetches available design types.

-   Returns: Promise resolving to an array of design types

#### `getColorPalettes()`

Fetches available color palettes.

-   Returns: Promise resolving to an array of color palettes

#### `uploadImage(file)`

Uploads an image file.

-   Parameters:
    -   `file`: File object to upload
-   Returns: Promise resolving to the uploaded image data

## Usage

Import the required functions from this file in other parts of the application to interact with the
API. For example:

```javascript
import { loginUser, generateLandingPage } from '../services/api';

// Login a user
const login = async (email, password) => {
    try {
        const userData = await loginUser(email, password);
        console.log('Logged in successfully', userData);
    } catch (error) {
        console.error('Login failed', error);
    }
};

// Generate a landing page
const generate = async designParams => {
    try {
        const landingPage = await generateLandingPage(
            designParams.designType,
            designParams.colors,
            designParams.heroImageUrl,
            designParams.otherImagery,
            designParams.productDescription,
            designParams.components
        );
        console.log('Landing page generated', landingPage);
    } catch (error) {
        console.error('Generation failed', error);
    }
};
```

This API service is a crucial part of the application, handling all communication with the backend
server and providing a clean interface for other components to interact with the API.
