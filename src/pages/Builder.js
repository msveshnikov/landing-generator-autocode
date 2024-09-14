import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import ColorPicker from '../components/ColorPicker';
import ImageUploader from '../components/ImageUploader';
import { useWebsite } from '../contexts/WebsiteContext';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const BuilderContainer = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    font-family: 'Arial', sans-serif;
`;

const BuilderContent = styled.div`
    display: flex;
    flex: 1;
    background-color: #f0f4f8;
`;

const ComponentLibrary = styled.div`
    width: 200px;
    background-color: #ffffff;
    padding: 15px;
    overflow-y: auto;
    box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
`;

const Canvas = styled.div`
    flex: 1;
    padding: 15px;
    background-color: #ffffff;
    border: 2px dashed #ccc;
    min-height: 300px;
    margin: 15px;
    border-radius: 8px;
`;

const ComponentItem = styled.div`
    padding: 8px;
    margin-bottom: 8px;
    background-color: #f0f4f8;
    border: 1px solid #ddd;
    cursor: move;
    transition: all 0.3s ease;
    border-radius: 4px;

    &:hover {
        background-color: #e0e7ff;
        transform: translateY(-2px);
    }
`;

const CanvasItem = styled.div`
    padding: 8px;
    margin-bottom: 8px;
    background-color: #f9f9f9;
    border: 1px solid #ddd;
    transition: all 0.3s ease;
    border-radius: 4px;

    &:hover {
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    }
`;

const ControlPanel = styled.div`
    width: 250px;
    background-color: #ffffff;
    padding: 15px;
    box-shadow: -2px 0 5px rgba(0, 0, 0, 0.1);
`;

const Button = styled.button`
    margin-top: 10px;
    padding: 8px 12px;
    background-color: #4a90e2;
    color: white;
    border: none;
    cursor: pointer;
    transition: background-color 0.3s ease;
    border-radius: 4px;

    &:hover {
        background-color: #357abd;
    }

    &:disabled {
        background-color: #ccc;
        cursor: not-allowed;
    }
`;

const TextArea = styled.textarea`
    width: 100%;
    height: 80px;
    margin-bottom: 8px;
    padding: 8px;
    border: 1px solid #ddd;
    resize: vertical;
    border-radius: 4px;
`;

const SectionTitle = styled.h3`
    margin-top: 15px;
    margin-bottom: 8px;
    color: #333;
    font-size: 14px;
`;

const LoadingOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
`;

const Spinner = styled.div`
    border: 4px solid #f3f3f3;
    border-top: 4px solid #3498db;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    animation: spin 1s linear infinite;

    @keyframes spin {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
`;

const Select = styled.select`
    width: 100%;
    padding: 8px;
    margin-bottom: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
`;

const Input = styled.input`
    width: 100%;
    padding: 8px;
    margin-bottom: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
`;

const PreviewContainer = styled.div`
    margin-top: 15px;
    padding: 15px;
    background-color: #ffffff;
    border-radius: 8px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

const Builder = () => {
    const {
        website,
        updateWebsite,
        addComponent,
        removeComponent,
        reorderComponents,
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
    const [components] = useState([
        { id: 'header', type: 'Header' },
        { id: 'hero', type: 'Hero' },
        { id: 'features', type: 'Features' },
        { id: 'cta', type: 'Call to Action' },
        { id: 'footer', type: 'Footer' }
    ]);
    const [additionalInstructions, setAdditionalInstructions] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [templateName, setTemplateName] = useState('');

    const onDragEnd = useCallback(
        result => {
            if (!result.destination) return;

            const { source, destination } = result;

            if (source.droppableId === 'componentLibrary' && destination.droppableId === 'canvas') {
                const draggedComponent = components[source.index];
                const newComponent = { ...draggedComponent, id: `canvas-${Date.now()}` };
                addComponent(newComponent);
            } else if (source.droppableId === 'canvas' && destination.droppableId === 'canvas') {
                reorderComponents(source.index, destination.index);
            }
        },
        [components, addComponent, reorderComponents]
    );

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
        if (!isAuthenticated) {
            alert('Please log in to generate a landing page.');
            navigate('/login');
            return;
        }

        setIsGenerating(true);
        try {
            await generateWebsite();
        } catch (error) {
            console.error('Error generating landing page:', error);
            alert('An error occurred while generating the landing page. Please try again.');
        } finally {
            setIsGenerating(false);
        }
    }, [isAuthenticated, navigate, generateWebsite]);

    const handleImprovePage = useCallback(async () => {
        if (!isAuthenticated) {
            alert('Please log in to improve the landing page.');
            navigate('/login');
            return;
        }

        setIsGenerating(true);
        try {
            await improveWebsite(additionalInstructions);
        } catch (error) {
            console.error('Error improving landing page:', error);
            alert('An error occurred while improving the landing page. Please try again.');
        } finally {
            setIsGenerating(false);
        }
    }, [isAuthenticated, navigate, improveWebsite, additionalInstructions]);

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
        <BuilderContainer>
            <BuilderContent>
                <DragDropContext onDragEnd={onDragEnd}>
                    <ComponentLibrary>
                        <h2>Components</h2>
                        <Droppable droppableId="componentLibrary" isDropDisabled={true}>
                            {provided => (
                                <div {...provided.droppableProps} ref={provided.innerRef}>
                                    {components.map((component, index) => (
                                        <Draggable
                                            key={component.id}
                                            draggableId={component.id}
                                            index={index}
                                        >
                                            {provided => (
                                                <ComponentItem
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                >
                                                    {component.type}
                                                </ComponentItem>
                                            )}
                                        </Draggable>
                                    ))}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    </ComponentLibrary>
                    <Canvas>
                        <h2>Website Canvas</h2>
                        <Droppable droppableId="canvas">
                            {provided => (
                                <div {...provided.droppableProps} ref={provided.innerRef}>
                                    {website.components.map((item, index) => (
                                        <Draggable
                                            key={item.id}
                                            draggableId={item.id}
                                            index={index}
                                        >
                                            {provided => (
                                                <CanvasItem
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                >
                                                    {item.type}
                                                    <button
                                                        onClick={() => removeComponent(item.id)}
                                                    >
                                                        Remove
                                                    </button>
                                                </CanvasItem>
                                            )}
                                        </Draggable>
                                    ))}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    </Canvas>
                </DragDropContext>
                <ControlPanel>
                    <h2>Customization</h2>
                    <SectionTitle>Template</SectionTitle>
                    <Select onChange={handleTemplateChange}>
                        <option value="">Select a template</option>
                        {templates.map(template => (
                            <option key={template._id} value={template._id}>
                                {template.name}
                            </option>
                        ))}
                    </Select>
                    <SectionTitle>Design Type</SectionTitle>
                    <Select value={website.designType} onChange={handleDesignTypeChange}>
                        <option value="">Select a design type</option>
                        {designTypes.map(type => (
                            <option key={type._id} value={type._id}>
                                {type.name}
                            </option>
                        ))}
                    </Select>
                    <SectionTitle>Color Palette</SectionTitle>
                    <Select onChange={handleColorPaletteChange}>
                        <option value="">Select a color palette</option>
                        {colorPalettes.map(palette => (
                            <option key={palette._id} value={palette._id}>
                                {palette.name}
                            </option>
                        ))}
                    </Select>
                    <SectionTitle>Colors</SectionTitle>
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
                    <SectionTitle>Hero Image URL</SectionTitle>
                    <Input
                        type="text"
                        placeholder="Enter hero image URL"
                        value={website.heroImageUrl}
                        onChange={handleHeroImageUrlChange}
                    />
                    <SectionTitle>Additional Images</SectionTitle>
                    <ImageUploader onUpload={handleAdditionalImageUpload} />
                    <SectionTitle>Product Description</SectionTitle>
                    <TextArea
                        placeholder="Enter product description"
                        value={website.productDescription}
                        onChange={handleDescriptionChange}
                    />
                    <SectionTitle>Additional Instructions</SectionTitle>
                    <TextArea
                        placeholder="Additional instructions"
                        value={additionalInstructions}
                        onChange={handleAdditionalInstructionsChange}
                    />
                    <Button onClick={handleGeneratePage} disabled={isGenerating}>
                        Generate Landing Page
                    </Button>
                    {website.html && (
                        <>
                            <Button onClick={handleImprovePage} disabled={isGenerating}>
                                Improve Landing Page
                            </Button>
                            <Button onClick={handleDownloadHtml}>Download HTML</Button>
                            <Button onClick={handleSaveWebsite}>Save Website</Button>
                            <Input
                                type="text"
                                placeholder="Enter template name"
                                value={templateName}
                                onChange={e => setTemplateName(e.target.value)}
                            />
                            <Button onClick={handleSaveTemplate}>Save as Template</Button>
                        </>
                    )}
                </ControlPanel>
            </BuilderContent>
            {website.html && (
                <PreviewContainer>
                    <h2>Preview</h2>
                    <iframe
                        title="Landing Page Preview"
                        srcDoc={website.html}
                        width="100%"
                        height="2600px"
                        style={{ border: '1px solid #ddd', borderRadius: '4px' }}
                    />
                </PreviewContainer>
            )}
            {isGenerating && (
                <LoadingOverlay>
                    <Spinner />
                </LoadingOverlay>
            )}
        </BuilderContainer>
    );
};

export default Builder;
