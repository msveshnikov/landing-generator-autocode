import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWebsite } from '../contexts/WebsiteContext';
import { useAuth } from '../contexts/AuthContext';
import { fetchTemplates, saveTemplate, uploadImage } from '../services/api';
import ColorPicker from '../components/ColorPicker';
import ImageUploader from '../components/ImageUploader';

const Templates = () => {
    const [templates, setTemplates] = useState([]);
    const [selectedTemplate, setSelectedTemplate] = useState(null);
    const [customColors, setCustomColors] = useState({});
    const [heroImage, setHeroImage] = useState('');
    const [otherImages, setOtherImages] = useState([]);
    const [productDescription, setProductDescription] = useState('');
    const { setWebsiteData } = useWebsite();
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const loadTemplates = async () => {
            try {
                const fetchedTemplates = await fetchTemplates();
                setTemplates(fetchedTemplates);
            } catch (error) {
                console.error('Error loading templates:', error);
            }
        };
        loadTemplates();
    }, []);

    const handleTemplateSelect = (template) => {
        setSelectedTemplate(template);
        setCustomColors({});
        setHeroImage('');
        setOtherImages([]);
        setProductDescription('');
    };

    const handleColorChange = (key, color) => {
        setCustomColors((prevColors) => ({ ...prevColors, [key]: color }));
    };

    const handleHeroImageUpload = async (file) => {
        try {
            const imageUrl = await uploadImage(file);
            setHeroImage(imageUrl);
        } catch (error) {
            console.error('Error uploading hero image:', error);
        }
    };

    const handleOtherImageUpload = async (file) => {
        try {
            const imageUrl = await uploadImage(file);
            setOtherImages((prevImages) => [...prevImages, imageUrl]);
        } catch (error) {
            console.error('Error uploading other image:', error);
        }
    };

    const handleDescriptionChange = (e) => {
        setProductDescription(e.target.value);
    };

    const handleSaveTemplate = async () => {
        if (!selectedTemplate) return;

        const templateData = {
            ...selectedTemplate,
            customColors,
            heroImage,
            otherImages,
            productDescription
        };

        try {
            if (user) {
                await saveTemplate(user.id, templateData);
            }
            setWebsiteData(templateData);
            navigate('/builder');
        } catch (error) {
            console.error('Error saving template:', error);
        }
    };

    return (
        <div className="templates-page">
            <h1>Choose a Template</h1>
            <div className="template-list">
                {templates.map((template) => (
                    <div
                        key={template.id}
                        className={`template-item ${
                            selectedTemplate?.id === template.id ? 'selected' : ''
                        }`}
                        onClick={() => handleTemplateSelect(template)}
                    >
                        <img src={template.thumbnail} alt={template.name} />
                        <p>{template.name}</p>
                    </div>
                ))}
            </div>
            {selectedTemplate && (
                <div className="template-customization">
                    <h2>Customize Your Template</h2>
                    <div className="color-pickers">
                        {Object.keys(selectedTemplate.colors).map((colorKey) => (
                            <ColorPicker
                                key={colorKey}
                                label={colorKey}
                                color={customColors[colorKey] || selectedTemplate.colors[colorKey]}
                                onChange={(color) => handleColorChange(colorKey, color)}
                            />
                        ))}
                    </div>
                    <ImageUploader label="Hero Image" onImageUpload={handleHeroImageUpload} />
                    <ImageUploader
                        label="Other Images"
                        onImageUpload={handleOtherImageUpload}
                        multiple
                    />
                    <textarea
                        placeholder="Enter your product description"
                        value={productDescription}
                        onChange={handleDescriptionChange}
                    />
                    <button onClick={handleSaveTemplate}>Use This Template</button>
                </div>
            )}
        </div>
    );
};

export default Templates;
