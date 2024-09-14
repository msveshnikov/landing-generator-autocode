# Server Documentation (server/index.js)

## Overview

This file serves as the main entry point for the server-side application of a web-based landing page generator. It sets up an Express.js server, connects to a MongoDB database, and defines various routes and middleware for user authentication, website generation, and management.

## Key Components

1. **Dependencies**: The file imports necessary modules such as Express, Mongoose, bcrypt, JWT, and Anthropic AI SDK.

2. **Database Models**: Defines Mongoose schemas and models for User, Website, Template, Palette, and DesignType.

3. **AI Integration**: Utilizes the Anthropic AI API for generating and improving landing pages.

4. **Authentication**: Implements user registration, login, and token-based authentication.

5. **File Upload**: Configures Multer for handling image uploads.

6. **API Routes**: Defines various API endpoints for website generation, management, and user operations.

7. **Data Initialization**: Includes functions to load initial data for templates, color palettes, and design types.

## Key Functions and Routes

### Authentication

#### `POST /register`
Registers a new user.
- Parameters: `email`, `password`
- Returns: Success message or error

#### `POST /login`
Authenticates a user and returns a JWT.
- Parameters: `email`, `password`
- Returns: JWT token or error

#### `authenticateToken` (Middleware)
Verifies the JWT for protected routes.

### Website Generation and Management

#### `POST /generate`
Generates a new landing page using AI.
- Parameters: `designType`, `colors`, `heroImageUrl`, `otherImagery`, `productDescription`, `components`
- Returns: Generated HTML and website ID

#### `POST /improve`
Improves an existing landing page based on user feedback.
- Parameters: `websiteId`, `userFeedback`
- Returns: Improved HTML

#### `GET /websites`
Retrieves all websites for the authenticated user.

#### `GET /websites/:id`
Retrieves a specific website by ID.

#### `PUT /websites/:id`
Updates a specific website.

#### `DELETE /websites/:id`
Deletes a specific website.

### Templates and Design Resources

#### `POST /templates`
Creates a new template.

#### `GET /templates`
Retrieves all available templates.

#### `GET /design-types`
Retrieves all design types.

#### `GET /color-palettes`
Retrieves all color palettes.

### File Upload

#### `POST /upload-image`
Handles image file uploads.
- Returns: URL of the uploaded image

### AI Integration

#### `generateLandingPage`
Generates a landing page using the Anthropic AI API.

#### `improveLandingPage`
Improves an existing landing page using the Anthropic AI API.

### Data Initialization

#### `loadTemplates`, `loadPalettes`, `loadDesignTypes`
Functions to load initial data from JSON files and HTML templates.

## Usage

1. Set up environment variables (MONGODB_URI, JWT_SECRET, CLAUDE_KEY, etc.).
2. Run `npm install` to install dependencies.
3. Start the server with `node server/index.js`.

The server will initialize, connect to the database, and load initial data. It will then listen for incoming requests on the specified port (default: 3001).

## Project Structure Integration

This file is the core of the server-side application, interacting with the database and providing API endpoints for the front-end (located in the `src` directory) to consume. It works in conjunction with the React components and services defined in the client-side code to provide a full-stack solution for the landing page generator application.