import axios from 'axios';

const CLAUDE_API_URL = 'https://api.anthropic.com/v1/messages';
const CLAUDE_MODEL = 'claude-3-sonnet-20240229';

const generateLandingPage = async (
    designType,
    colors,
    heroImageUrl,
    otherImagery,
    productDescription,
    components
) => {
    try {
        const response = await axios.post(
            CLAUDE_API_URL,
            {
                model: CLAUDE_MODEL,
                max_tokens: 4000,
                messages: [
                    {
                        role: 'user',
                        content: `Generate an HTML landing page with the following specifications:
              Design Type: ${designType}
              Colors: ${JSON.stringify(colors)}
              Hero Image URL: ${heroImageUrl}
              Other Imagery: ${otherImagery}
              Product Description: ${productDescription}
              Components: ${components.map((c) => c.type).join(', ')}
              
              Create a responsive, modern, and visually appealing landing page. Include appropriate meta tags, CSS, and minimal JavaScript if necessary. Ensure the page is optimized for SEO and performance.`
                    }
                ]
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'X-API-Key': process.env.REACT_APP_CLAUDE_KEY
                }
            }
        );

        return response.data.content[0].text;
    } catch (error) {
        console.error('Error generating landing page:', error);
        throw error;
    }
};

const improveLandingPage = async (currentHtml, userFeedback) => {
    try {
        const response = await axios.post(
            CLAUDE_API_URL,
            {
                model: CLAUDE_MODEL,
                max_tokens: 4000,
                messages: [
                    {
                        role: 'user',
                        content: `Improve the following HTML landing page based on this user feedback: ${userFeedback}

              Current HTML:
              ${currentHtml}
              
              Please provide the updated HTML with the requested improvements.`
                    }
                ]
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'X-API-Key': process.env.REACT_APP_CLAUDE_KEY
                }
            }
        );

        return response.data.content[0].text;
    } catch (error) {
        console.error('Error improving landing page:', error);
        throw error;
    }
};

const generateContent = async (prompt) => {
    try {
        const response = await axios.post(
            CLAUDE_API_URL,
            {
                model: CLAUDE_MODEL,
                max_tokens: 4000,
                messages: [
                    {
                        role: 'user',
                        content: prompt
                    }
                ]
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'X-API-Key': process.env.REACT_APP_CLAUDE_KEY
                }
            }
        );

        return response.data.content[0].text;
    } catch (error) {
        console.error('Error generating content:', error);
        throw error;
    }
};

export { generateLandingPage, improveLandingPage, generateContent };
