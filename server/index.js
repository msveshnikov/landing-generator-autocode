import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import Anthropic from '@anthropic-ai/sdk';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const anthropic = new Anthropic({
    apiKey: process.env.CLAUDE_KEY
});

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
        const response = await anthropic.messages.create({
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
            Components: ${components?.map((c) => c.type).join(', ')}
            
            Create a responsive, modern, and visually appealing landing page. Include appropriate meta tags, CSS, and minimal JavaScript if necessary. Ensure the page is optimized for SEO and performance.`
                }
            ]
        });

        return response.content[0].text;
    } catch (error) {
        console.error('Error generating landing page:', error);
        throw error;
    }
};

const improveLandingPage = async (currentHtml, userFeedback) => {
    try {
        const response = await anthropic.messages.create({
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
        });

        return response.content[0].text;
    } catch (error) {
        console.error('Error improving landing page:', error);
        throw error;
    }
};

app.post('/generate', async (req, res) => {
    try {
        const { designType, colors, heroImageUrl, otherImagery, productDescription, components } =
            req.body;
        const generatedHtml = await generateLandingPage(
            designType,
            colors,
            heroImageUrl,
            otherImagery,
            productDescription,
            components
        );
        res.json({ html: generatedHtml });
    } catch (error) {
        res.status(500).json({ error: 'Error generating landing page' });
    }
});

app.post('/improve', async (req, res) => {
    try {
        const { currentHtml, userFeedback } = req.body;
        const improvedHtml = await improveLandingPage(currentHtml, userFeedback);
        res.json({ html: improvedHtml });
    } catch (error) {
        res.status(500).json({ error: 'Error improving landing page' });
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

export default app;
