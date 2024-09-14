# Builder Component Documentation

## Overview

The `Builder` component is a crucial part of the website builder application. It provides a drag-and-drop interface for users to construct and customize their landing pages. This component is located in `src/pages/Builder.js` and serves as the main page for the website building functionality.

## Key Features

1. Drag-and-drop interface for adding and reordering components
2. Color customization for primary, secondary, and accent colors
3. Template selection
4. Design type selection
5. Color palette selection
6. Hero image URL input
7. Product description input
8. Additional instructions for AI-assisted improvements
9. Generation and improvement of landing pages
10. HTML preview and download functionality

## Dependencies

- React and various hooks (useState, useCallback, useEffect)
- styled-components for styling
- react-beautiful-dnd for drag-and-drop functionality
- Custom hooks: useWebsite, useAuth
- React Router's useNavigate
- API services: fetchTemplates, getDesignTypes, getColorPalettes

## Component Structure

The component is structured with the following main sections:

1. Component Library
2. Website Canvas
3. Control Panel
4. Preview Container

## State Management

The component uses both local state and context-based state management:

- Local state for components, additional instructions, loading state, templates, design types, and color palettes
- WebsiteContext for managing the overall website state
- AuthContext for user authentication status

## Main Functions

### onDragEnd

Handles the drag-and-drop functionality for components.

Parameters:
- `result`: Object containing drag-and-drop information

### handleColorChange

Updates the website's color scheme.

Parameters:
- `color`: The selected color
- `type`: The color type (primary, secondary, or accent)

### handleGeneratePage

Triggers the landing page generation process.

### handleImprovePage

Initiates the AI-assisted improvement of the landing page.

### handleDownloadHtml

Allows users to download the generated HTML.

### handleTemplateChange, handleDesignTypeChange, handleColorPaletteChange

Handle the selection of templates, design types, and color palettes respectively.

## Usage

This component is typically rendered as the main content of the builder page. It should be wrapped in the necessary context providers (WebsiteContext and AuthContext) to function correctly.

Example:

```jsx
import React from 'react';
import { WebsiteProvider } from '../contexts/WebsiteContext';
import { AuthProvider } from '../contexts/AuthContext';
import Builder from './Builder';

const BuilderPage = () => (
  <AuthProvider>
    <WebsiteProvider>
      <Builder />
    </WebsiteProvider>
  </AuthProvider>
);

export default BuilderPage;
```

## Styling

The component uses styled-components for styling, with various styled elements defined at the top of the file. These styles create a responsive and visually appealing interface for the website builder.

## Error Handling

The component includes basic error handling for API calls and generation processes, displaying alerts to the user when errors occur.

## Accessibility

The component uses semantic HTML elements and ARIA attributes where applicable to enhance accessibility. However, further improvements could be made to ensure full accessibility compliance.

## Performance Considerations

The component uses React's `useCallback` hook to memoize functions, potentially improving performance by reducing unnecessary re-renders. Large lists (like templates or components) could benefit from virtualization techniques if they grow significantly.

## Future Improvements

1. Implement more granular component customization
2. Add undo/redo functionality
3. Implement auto-save feature
4. Enhance error handling and user feedback
5. Improve accessibility
6. Add more advanced preview options

This documentation provides an overview of the `Builder` component, its main functions, and its role within the larger website builder application. Developers working on this component should refer to this documentation for understanding its structure and functionality.