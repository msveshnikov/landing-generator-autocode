import React, { useState, useCallback, useEffect } from 'react';
import {
    Box,
    Container,
    Grid,
    Typography,
    Button,
    TextField,
    Select,
    MenuItem,
    Paper,
    CircularProgress
} from '@mui/material';
import ColorPicker from '../components/ColorPicker';
import ImageUploader from '../components/ImageUploader';
import { useWebsite } from '../contexts/WebsiteContext';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Builder = () => {
    const {
        website,
        updateWebsite,
        generateWebsite,
        improveWebsite,
        saveWebsite,
        loadTemplate,
        saveAsTemplate,
        templates,
        designTypes,
        colorPalettes
    } = useWebsite();
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const [additionalInstructions, setAdditionalInstructions] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [templateName, setTemplateName] = useState('');

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login');
        }
    }, [isAuthenticated, navigate]);

    const handleColorChange = useCallback(
        (color, type) => {
            updateWebsite({ colors: { ...website.colors, [type]: color } });
        },
        [website.colors, updateWebsite]
    );

    const handleHeroImageUrlChange = useCallback(
        e => {
            updateWebsite({ heroImageUrl: e.target.value });
        },
        [updateWebsite]
    );

    const handleDescriptionChange = useCallback(
        e => {
            updateWebsite({ productDescription: e.target.value });
        },
        [updateWebsite]
    );

    const handleAdditionalInstructionsChange = useCallback(e => {
        setAdditionalInstructions(e.target.value);
    }, []);

    const handleGeneratePage = useCallback(async () => {
        setIsGenerating(true);
        try {
            await generateWebsite();
        } catch (error) {
            console.error('Error generating landing page:', error);
            alert('An error occurred while generating the landing page. Please try again.');
        } finally {
            setIsGenerating(false);
        }
    }, [generateWebsite]);

    const handleImprovePage = useCallback(async () => {
        setIsGenerating(true);
        try {
            await improveWebsite(additionalInstructions);
        } catch (error) {
            console.error('Error improving landing page:', error);
            alert('An error occurred while improving the landing page. Please try again.');
        } finally {
            setIsGenerating(false);
        }
    }, [improveWebsite, additionalInstructions]);

    const handleDownloadHtml = useCallback(() => {
        const blob = new Blob([website.html], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'landing-page.html';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }, [website.html]);

    const handleTemplateChange = useCallback(
        e => {
            const templateId = e.target.value;
            loadTemplate(templateId);
        },
        [loadTemplate]
    );

    const handleDesignTypeChange = useCallback(
        e => {
            updateWebsite({ designType: e.target.value });
        },
        [updateWebsite]
    );

    const handleColorPaletteChange = useCallback(
        e => {
            const paletteId = e.target.value;
            const selectedPalette = colorPalettes.find(palette => palette._id === paletteId);
            if (selectedPalette) {
                updateWebsite({ colors: selectedPalette.colors });
            }
        },
        [colorPalettes, updateWebsite]
    );

    const handleSaveTemplate = useCallback(async () => {
        if (!templateName) {
            alert('Please enter a template name');
            return;
        }
        try {
            await saveAsTemplate(templateName);
            alert('Template saved successfully');
            setTemplateName('');
        } catch (error) {
            console.error('Error saving template:', error);
            alert('An error occurred while saving the template. Please try again.');
        }
    }, [saveAsTemplate, templateName]);

    const handleSaveWebsite = useCallback(async () => {
        try {
            await saveWebsite();
            alert('Website saved successfully');
        } catch (error) {
            console.error('Error saving website:', error);
            alert('An error occurred while saving the website. Please try again.');
        }
    }, [saveWebsite]);

    const handleAdditionalImageUpload = useCallback(
        imageUrl => {
            updateWebsite({
                additionalImages: [...website.additionalImages, imageUrl]
            });
        },
        [website.additionalImages, updateWebsite]
    );

    return (
        <Container maxWidth="xl">
            <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                    <Paper elevation={3} sx={{ p: 2, height: '100%' }}>
                        <Typography variant="h6" gutterBottom>
                            Design Options
                        </Typography>
                        <Select
                            fullWidth
                            value=""
                            onChange={handleTemplateChange}
                            displayEmpty
                            sx={{ mb: 2 }}
                        >
                            <MenuItem value="" disabled>
                                Select a template
                            </MenuItem>
                            {templates.map(template => (
                                <MenuItem key={template._id} value={template._id}>
                                    {template.name}
                                </MenuItem>
                            ))}
                        </Select>
                        <Select
                            fullWidth
                            value={website.designType}
                            onChange={handleDesignTypeChange}
                            displayEmpty
                            sx={{ mb: 2 }}
                        >
                            <MenuItem value="" disabled>
                                Select a design type
                            </MenuItem>
                            {designTypes.map(type => (
                                <MenuItem key={type._id} value={type._id}>
                                    {type.name}
                                </MenuItem>
                            ))}
                        </Select>
                        <Select
                            fullWidth
                            value=""
                            onChange={handleColorPaletteChange}
                            displayEmpty
                            sx={{ mb: 2 }}
                        >
                            <MenuItem value="" disabled>
                                Select a color palette
                            </MenuItem>
                            {colorPalettes.map(palette => (
                                <MenuItem key={palette._id} value={palette._id}>
                                    {palette.name}
                                </MenuItem>
                            ))}
                        </Select>
                        <Typography variant="subtitle1" gutterBottom>
                            Colors
                        </Typography>
                        <ColorPicker
                            selectedColor={website.colors.primary}
                            onChange={color => handleColorChange(color, 'primary')}
                            label="Primary Color"
                        />
                        <ColorPicker
                            selectedColor={website.colors.secondary}
                            onChange={color => handleColorChange(color, 'secondary')}
                            label="Secondary Color"
                        />
                        <ColorPicker
                            selectedColor={website.colors.accent}
                            onChange={color => handleColorChange(color, 'accent')}
                            label="Accent Color"
                        />
                    </Paper>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Paper elevation={3} sx={{ p: 2, height: '100%' }}>
                        <Typography variant="h6" gutterBottom>
                            Content
                        </Typography>
                        <TextField
                            fullWidth
                            label="Hero Image URL"
                            value={website.heroImageUrl}
                            onChange={handleHeroImageUrlChange}
                            sx={{ mb: 2 }}
                        />
                        <Typography variant="subtitle1" gutterBottom>
                            Additional Images
                        </Typography>
                        <ImageUploader onUpload={handleAdditionalImageUpload} />
                        <br/>
                        
                        <TextField
                            fullWidth
                            multiline
                            rows={4}
                            label="Product Description"
                            value={website.productDescription}
                            onChange={handleDescriptionChange}
                            sx={{ mb: 2 }}
                        />
                        <TextField
                            fullWidth
                            multiline
                            rows={4}
                            label="Additional Instructions"
                            value={additionalInstructions}
                            onChange={handleAdditionalInstructionsChange}
                            sx={{ mb: 2 }}
                        />
                    </Paper>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Paper elevation={3} sx={{ p: 2, height: '100%' }}>
                        <Typography variant="h6" gutterBottom>
                            Actions
                        </Typography>
                        <Button
                            fullWidth
                            variant="contained"
                            onClick={handleGeneratePage}
                            disabled={isGenerating}
                            sx={{ mb: 1 }}
                        >
                            Generate Landing Page
                        </Button>
                        {website.html && (
                            <>
                                <Button
                                    fullWidth
                                    variant="contained"
                                    onClick={handleImprovePage}
                                    disabled={isGenerating}
                                    sx={{ mb: 1 }}
                                >
                                    Improve Landing Page
                                </Button>
                                <Button
                                    fullWidth
                                    variant="contained"
                                    onClick={handleDownloadHtml}
                                    sx={{ mb: 1 }}
                                >
                                    Download HTML
                                </Button>
                                <Button
                                    fullWidth
                                    variant="contained"
                                    onClick={handleSaveWebsite}
                                    sx={{ mb: 1 }}
                                >
                                    Save Website
                                </Button>
                                <TextField
                                    fullWidth
                                    label="Template Name"
                                    value={templateName}
                                    onChange={e => setTemplateName(e.target.value)}
                                    sx={{ mb: 1 }}
                                />
                                <Button fullWidth variant="contained" onClick={handleSaveTemplate}>
                                    Save as Template
                                </Button>
                            </>
                        )}
                    </Paper>
                </Grid>
            </Grid>
            {website.html && (
                <Box mt={3}>
                    <Typography variant="h6" gutterBottom>
                        Preview
                    </Typography>
                    <Paper elevation={3} sx={{ p: 2 }}>
                        <iframe
                            title="Landing Page Preview"
                            srcDoc={website.html}
                            width="100%"
                            height="600px"
                            style={{ border: 'none' }}
                        />
                    </Paper>
                </Box>
            )}
            {isGenerating && (
                <Box
                    sx={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        zIndex: 9999
                    }}
                >
                    <CircularProgress />
                </Box>
            )}
        </Container>
    );
};

export default Builder;