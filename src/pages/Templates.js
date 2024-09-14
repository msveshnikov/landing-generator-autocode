import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useWebsite } from '../contexts/WebsiteContext';
import { useAuth } from '../contexts/AuthContext';
import { fetchTemplates, saveTemplate, uploadImage } from '../services/api';
import ColorPicker from '../components/ColorPicker';
import ImageUploader from '../components/ImageUploader';

const TemplatesContainer = styled.div`
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
`;

const TemplateGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 20px;
`;

const TemplateItem = styled.div`
    border: 1px solid #ddd;
    border-radius: 8px;
    overflow: hidden;
    cursor: pointer;
    transition: transform 0.2s;

    &:hover {
        transform: translateY(-5px);
    }

    ${({ selected }) =>
        selected &&
        `
    border-color: #4a90e2;
    box-shadow: 0 0 10px rgba(74, 144, 226, 0.5);
  `}
`;

const TemplateImage = styled.img`
    width: 100%;
    height: 200px;
    object-fit: cover;
`;

const TemplateName = styled.p`
    padding: 10px;
    text-align: center;
    font-weight: bold;
`;

const CustomizationPanel = styled.div`
    margin-top: 30px;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 8px;
`;

const Button = styled.button`
    background-color: #4a90e2;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
    margin-top: 20px;

    &:hover {
        background-color: #357abd;
    }
`;

const TextArea = styled.textarea`
    width: 100%;
    height: 100px;
    margin-top: 10px;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    resize: vertical;
`;

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
        setCustomColors(template.colors);
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
                await saveTemplate(user._id, templateData);
            }
            setWebsiteData(templateData);
            navigate('/builder');
        } catch (error) {
            console.error('Error saving template:', error);
        }
    };

    return (
        <TemplatesContainer>
            <h1>Choose a Template</h1>
            <TemplateGrid>
                {templates.map((template) => (
                    <TemplateItem
                        key={template._id}
                        onClick={() => handleTemplateSelect(template)}
                        selected={selectedTemplate?._id === template._id}
                    >
                        <TemplateImage src={template.thumbnail} alt={template.name} />
                        <TemplateName>{template.name}</TemplateName>
                    </TemplateItem>
                ))}
            </TemplateGrid>
            {selectedTemplate && (
                <CustomizationPanel>
                    <h2>Customize Your Template</h2>
                    {Object.entries(customColors).map(([key, color]) => (
                        <ColorPicker
                            key={key}
                            label={key}
                            color={color}
                            onChange={(newColor) => handleColorChange(key, newColor)}
                        />
                    ))}
                    <ImageUploader label="Hero Image" onImageUpload={handleHeroImageUpload} />
                    <ImageUploader
                        label="Other Images"
                        onImageUpload={handleOtherImageUpload}
                        multiple
                    />
                    <TextArea
                        placeholder="Enter your product description"
                        value={productDescription}
                        onChange={handleDescriptionChange}
                    />
                    <Button onClick={handleSaveTemplate}>Use This Template</Button>
                </CustomizationPanel>
            )}
        </TemplatesContainer>
    );
};

export default Templates;
