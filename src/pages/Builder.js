import React, { useState, useCallback, useEffect } from 'react';
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
    width: 250px;
    background-color: #ffffff;
    padding: 20px;
    overflow-y: auto;
    box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
`;

const Canvas = styled.div`
    flex: 1;
    padding: 20px;
    background-color: #ffffff;
    border: 2px dashed #ccc;
    min-height: 400px;
    margin: 20px;
    border-radius: 8px;

`;

const ComponentItem = styled.div`
    padding: 10px;
    margin-bottom: 10px;
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
    padding: 10px;
    margin-bottom: 10px;
    background-color: #f9f9f9;
    border: 1px solid #ddd;
    transition: all 0.3s ease;
    border-radius: 4px;

    &:hover {
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    }
`;

const PreviewContainer = styled.div`
    margin-top: 20px;
    padding: 20px;
    background-color: #ffffff;
    border-radius: 8px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

const ControlPanel = styled.div`
    width: 300px;
    background-color: #ffffff;
    padding: 20px;
    box-shadow: -2px 0 5px rgba(0, 0, 0, 0.1);
`;

const Button = styled.button`
    margin-top: 10px;
    padding: 10px 15px;
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
    height: 100px;
    margin-bottom: 10px;
    padding: 10px;
    border: 1px solid #ddd;
    resize: vertical;
    border-radius: 4px;
`;

const SectionTitle = styled.h3`
    margin-top: 20px;
    margin-bottom: 10px;
    color: #333;
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
    width: 50px;
    height: 50px;
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

const TemplateSelector = styled.select`
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
`;

const Builder = () => {
    const {
        website,
        updateWebsite,
        addComponent,
        reorderComponents,
        generateWebsite,
        improveWebsite,
        loadTemplate,
        templates
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
    const [selectedTemplate, setSelectedTemplate] = useState('');

    useEffect(() => {
        if (templates?.length > 0 && !selectedTemplate) {
            setSelectedTemplate(templates[0].id);
        }
    }, [templates, selectedTemplate]);

    const onDragEnd = useCallback(
        (result) => {
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

    const handleImageUpload = useCallback(
        (imageUrl) => {
            updateWebsite({ heroImageUrl: imageUrl });
        },
        [updateWebsite]
    );

    const handleDescriptionChange = useCallback(
        (e) => {
            updateWebsite({ productDescription: e.target.value });
        },
        [updateWebsite]
    );

    const handleAdditionalInstructionsChange = useCallback((e) => {
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
        const blob = new Blob([website.generatedHtml], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'landing-page.html';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }, [website.generatedHtml]);

    const handleTemplateChange = useCallback(
        (e) => {
            const templateId = e.target.value;
            setSelectedTemplate(templateId);
            loadTemplate(templateId);
        },
        [loadTemplate]
    );

    return (
        <BuilderContainer>
            <BuilderContent>
                <DragDropContext onDragEnd={onDragEnd}>
                    <ComponentLibrary>
                        <h2>Components</h2>
                        <Droppable droppableId="componentLibrary" isDropDisabled={true}>
                            {(provided) => (
                                <div {...provided.droppableProps} ref={provided.innerRef}>
                                    {components.map((component, index) => (
                                        <Draggable
                                            key={component.id}
                                            draggableId={component.id}
                                            index={index}
                                        >
                                            {(provided) => (
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
                            {(provided) => (
                                <div {...provided.droppableProps} ref={provided.innerRef}>
                                    {website.components.map((item, index) => (
                                        <Draggable
                                            key={item.id}
                                            draggableId={item.id}
                                            index={index}
                                        >
                                            {(provided) => (
                                                <CanvasItem
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                >
                                                    {item.type}
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
                    <TemplateSelector value={selectedTemplate} onChange={handleTemplateChange}>
                        {templates?.map((template) => (
                            <option key={template.id} value={template.id}>
                                {template.name}
                            </option>
                        ))}
                    </TemplateSelector>
                    <SectionTitle>Colors</SectionTitle>
                    <ColorPicker
                        selectedColor={website.colors.primary}
                        onChange={(color) => handleColorChange(color, 'primary')}
                        label="Primary Color"
                    />
                    <ColorPicker
                        selectedColor={website.colors.secondary}
                        onChange={(color) => handleColorChange(color, 'secondary')}
                        label="Secondary Color"
                    />
                    <ColorPicker
                        selectedColor={website.colors.accent}
                        onChange={(color) => handleColorChange(color, 'accent')}
                        label="Accent Color"
                    />
                    <SectionTitle>Hero Image</SectionTitle>
                    <ImageUploader onUpload={handleImageUpload} />
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
                    {website.generatedHtml && (
                        <>
                            <Button onClick={handleImprovePage} disabled={isGenerating}>
                                Improve Landing Page
                            </Button>
                            <Button onClick={handleDownloadHtml}>Download HTML</Button>
                        </>
                    )}
                </ControlPanel>
            </BuilderContent>
            {website.generatedHtml && (
                <PreviewContainer>
                    <h2>Preview</h2>
                    <iframe
                        title="Landing Page Preview"
                        srcDoc={website.generatedHtml}
                        width="100%"
                        height="600px"
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
