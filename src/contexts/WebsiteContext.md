# WebsiteContext.js Documentation

## Overview

`WebsiteContext.js` is a crucial file in the project, located in `src/contexts/WebsiteContext.js`.
It provides a React Context for managing website-related state and operations across the
application. This context encapsulates all the functionality related to creating, editing, saving,
and managing websites and templates.

## Context Provider

### WebsiteProvider

The `WebsiteProvider` is a React component that wraps the application and provides the
WebsiteContext to all child components.

#### Props

-   `children`: React nodes to be wrapped by the provider.

#### Usage

```jsx
import { WebsiteProvider } from './contexts/WebsiteContext';

function App() {
    return <WebsiteProvider>{/* Your app components */}</WebsiteProvider>;
}
```

## Hook

### useWebsite

A custom hook to access the WebsiteContext from any component within the provider.

#### Usage

```jsx
import { useWebsite } from '../contexts/WebsiteContext';

function MyComponent() {
    const { website, updateWebsite } = useWebsite();
    // Use context values and functions
}
```

## Context Values and Functions

### State

-   `website`: Object containing the current website data.
-   `userWebsites`: Array of user's websites.
-   `templates`: Array of available templates.

### Functions

#### updateWebsite(updates)

Updates the current website state.

-   Parameters:
    -   `updates`: Object with properties to update.

#### resetWebsite()

Resets the website state to default values.

#### addComponent(component)

Adds a new component to the website.

-   Parameters:
    -   `component`: Object representing the new component.

#### removeComponent(componentId)

Removes a component from the website.

-   Parameters:
    -   `componentId`: ID of the component to remove.

#### updateComponent(componentId, updates)

Updates a specific component in the website.

-   Parameters:
    -   `componentId`: ID of the component to update.
    -   `updates`: Object with properties to update.

#### reorderComponents(startIndex, endIndex)

Reorders components in the website.

-   Parameters:
    -   `startIndex`: Starting index of the component.
    -   `endIndex`: Ending index for the component.

#### generateWebsite()

Generates a new website based on current state.

-   Returns: Promise that resolves when the website is generated.

#### improveWebsite(userFeedback)

Improves the website based on user feedback.

-   Parameters:
    -   `userFeedback`: String containing user feedback.
-   Returns: Promise that resolves when the website is improved.

#### saveWebsite()

Saves the current website state to the server.

-   Returns: Promise that resolves when the website is saved.

#### loadWebsite(websiteId)

Loads a website by its ID.

-   Parameters:
    -   `websiteId`: ID of the website to load.
-   Returns: Promise that resolves when the website is loaded.

#### downloadWebsiteHtml()

Downloads the current website as an HTML file.

-   Returns: Promise that resolves when the download is initiated.

#### fetchUserWebsites()

Fetches all websites belonging to the user.

-   Returns: Promise that resolves with the user's websites.

#### deleteWebsite(websiteId)

Deletes a specific website.

-   Parameters:
    -   `websiteId`: ID of the website to delete.
-   Returns: Promise that resolves when the website is deleted.

#### loadTemplates()

Loads available templates.

-   Returns: Promise that resolves when templates are loaded.

#### loadTemplate(templateId)

Loads a specific template into the current website state.

-   Parameters:
    -   `templateId`: ID of the template to load.

#### saveAsTemplate(templateName)

Saves the current website as a new template.

-   Parameters:
    -   `templateName`: Name for the new template.
-   Returns: Promise that resolves when the template is saved.

## Usage Examples

### Updating Website Colors

```jsx
const { updateWebsite } = useWebsite();

updateWebsite({
    colors: {
        primary: '#ff0000',
        secondary: '#00ff00',
        accent: '#0000ff'
    }
});
```

### Adding a New Component

```jsx
const { addComponent } = useWebsite();

addComponent({
    id: 'new-component-1',
    type: 'header',
    content: 'Welcome to my website'
});
```

### Generating and Saving a Website

```jsx
const { generateWebsite, saveWebsite } = useWebsite();

async function createAndSaveWebsite() {
    try {
        await generateWebsite();
        await saveWebsite();
        console.log('Website generated and saved successfully');
    } catch (error) {
        console.error('Error creating website:', error);
    }
}
```

## Conclusion

The `WebsiteContext.js` file is essential for managing website-related state and operations
throughout the application. It provides a centralized way to handle website data, components, and
templates, making it easier to build and maintain the website builder functionality across different
components and pages of the application.
