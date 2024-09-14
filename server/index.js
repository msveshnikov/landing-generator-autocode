import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import Anthropic from '@anthropic-ai/sdk';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import multer from 'multer';
import path from 'path';
import morgan from 'morgan';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

mongoose.connect(process.env.MONGODB_URI, {});

const UserSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

const WebsiteSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    html: { type: String, required: true },
    designType: String,
    colors: Object,
    heroImageUrl: String,
    otherImagery: [String],
    productDescription: String,
    components: [Object],
    name: String
});

const TemplateSchema = new mongoose.Schema({
    name: { type: String, required: true },
    html: { type: String, required: true },
    designType: String,
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    isPublic: { type: Boolean, default: false }
});

const User = mongoose.model('User', UserSchema);
const Website = mongoose.model('Website', WebsiteSchema);
const Template = mongoose.model('Template', TemplateSchema);

const anthropic = new Anthropic({
    apiKey: process.env.CLAUDE_KEY
});

const CLAUDE_MODEL = 'claude-3-5-sonnet-20240620';

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
          Other Imagery: ${otherImagery.join(', ')}
          Product Description: ${productDescription}
          Components: ${components.map((c) => c.type).join(', ')}
          
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

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.sendStatus(401);

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

app.post('/register', async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ email, password: hashedPassword });
        await user.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ error: 'Error registering user' });
    }
});

app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: '14d'
        });
        res.json({ token });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ error: 'Error logging in' });
    }
});

app.get('/user', authenticateToken, async (req, res) => {
    try {
        const user = await User.findById(req.user.userId).select('-password');
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ error: 'Error fetching user' });
    }
});

app.post('/generate', authenticateToken, async (req, res) => {
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
        const website = new Website({
            userId: req.user.userId,
            html: generatedHtml,
            designType,
            colors,
            heroImageUrl,
            otherImagery,
            productDescription,
            components
        });
        await website.save();
        res.json({ html: generatedHtml, websiteId: website._id });
    } catch (error) {
        console.error('Error generating landing page:', error);
        res.status(500).json({ error: 'Error generating landing page' });
    }
});

app.post('/improve', authenticateToken, async (req, res) => {
    try {
        const { websiteId, userFeedback } = req.body;
        const website = await Website.findById(websiteId);
        if (!website) {
            return res.status(404).json({ error: 'Website not found' });
        }
        const improvedHtml = await improveLandingPage(website.html, userFeedback);
        website.html = improvedHtml;
        await website.save();
        res.json({ html: improvedHtml });
    } catch (error) {
        console.error('Error improving landing page:', error);
        res.status(500).json({ error: 'Error improving landing page' });
    }
});

app.get('/websites', authenticateToken, async (req, res) => {
    try {
        const websites = await Website.find({ userId: req.user.userId });
        res.json(websites);
    } catch (error) {
        console.error('Error fetching websites:', error);
        res.status(500).json({ error: 'Error fetching websites' });
    }
});

app.post('/upload-image', authenticateToken, upload.single('image'), (req, res) => {
    if (req.file) {
        res.json({ imageUrl: `/uploads/${req.file.filename}` });
    } else {
        res.status(400).json({ error: 'No image file uploaded' });
    }
});

app.post('/templates', authenticateToken, async (req, res) => {
    try {
        const { name, html, designType, isPublic } = req.body;
        const template = new Template({
            name,
            html,
            designType,
            createdBy: req.user.userId,
            isPublic
        });
        await template.save();
        res.status(201).json(template);
    } catch (error) {
        console.error('Error creating template:', error);
        res.status(500).json({ error: 'Error creating template' });
    }
});

app.get('/templates', authenticateToken, async (req, res) => {
    try {
        const templates = await Template.find({
            $or: [{ createdBy: req.user.userId }, { isPublic: true }]
        });
        res.json(templates);
    } catch (error) {
        console.error('Error fetching templates:', error);
        res.status(500).json({ error: 'Error fetching templates' });
    }
});

app.delete('/websites/:id', authenticateToken, async (req, res) => {
    try {
        const website = await Website.findOneAndDelete({
            _id: req.params.id,
            userId: req.user.userId
        });
        if (!website) {
            return res.status(404).json({ error: 'Website not found' });
        }
        res.json({ message: 'Website deleted successfully' });
    } catch (error) {
        console.error('Error deleting website:', error);
        res.status(500).json({ error: 'Error deleting website' });
    }
});

app.post('/logout', authenticateToken, (req, res) => {
    res.json({ message: 'Logged out successfully' });
});

app.get('/websites/:id', authenticateToken, async (req, res) => {
    try {
        const website = await Website.findOne({ _id: req.params.id, userId: req.user.userId });
        if (!website) {
            return res.status(404).json({ error: 'Website not found' });
        }
        res.json(website);
    } catch (error) {
        console.error('Error fetching website:', error);
        res.status(500).json({ error: 'Error fetching website' });
    }
});

app.put('/websites/:id', authenticateToken, async (req, res) => {
    try {
        const {
            name,
            designType,
            colors,
            heroImageUrl,
            otherImagery,
            productDescription,
            components
        } = req.body;
        const website = await Website.findOneAndUpdate(
            { _id: req.params.id, userId: req.user.userId },
            {
                name,
                designType,
                colors,
                heroImageUrl,
                otherImagery,
                productDescription,
                components
            },
            { new: true }
        );
        if (!website) {
            return res.status(404).json({ error: 'Website not found' });
        }
        res.json(website);
    } catch (error) {
        console.error('Error updating website:', error);
        res.status(500).json({ error: 'Error updating website' });
    }
});

app.use('/uploads', express.static('uploads'));

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
