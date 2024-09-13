import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ColorPicker from '../components/ColorPicker';
import ImageUploader from '../components/ImageUploader';
import { useWebsite } from '../contexts/WebsiteContext';
import { useAuth } from '../contexts/AuthContext';
import { generateLandingPage, improveLandingPage } from '../services/api';

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

const Builder = () => {
    const { website, updateWebsite } = useWebsite();
    const { isAuthenticated } = useAuth();
    const [components] = useState([
        { id: 'header', type: 'Header' },
        { id: 'hero', type: 'Hero' },
        { id: 'features', type: 'Features' },
        { id: 'cta', type: 'Call to Action' },
        { id: 'footer', type: 'Footer' }
    ]);
    const [canvasItems, setCanvasItems] = useState([]);
    const [additionalInstructions, setAdditionalInstructions] = useState('');

    useEffect(() => {
        if (website.components) {
            setCanvasItems(website.components);
        }
    }, [website]);

    const onDragEnd = (result) => {
        if (!result.destination) return;

        const { source, destination } = result;

        if (source.droppableId === 'componentLibrary' && destination.droppableId === 'canvas') {
            const draggedComponent = components[source.index];
            const newCanvasItem = { ...draggedComponent, id: `canvas-${Date.now()}` };
            const newCanvasItems = [...canvasItems];
            newCanvasItems.splice(destination.index, 0, newCanvasItem);
            setCanvasItems(newCanvasItems);
            updateWebsite({ components: newCanvasItems });
        } else if (source.droppableId === 'canvas' && destination.droppableId === 'canvas') {
            const newCanvasItems = Array.from(canvasItems);
            const [reorderedItem] = newCanvasItems.splice(source.index, 1);
            newCanvasItems.splice(destination.index, 0, reorderedItem);
            setCanvasItems(newCanvasItems);
            updateWebsite({ components: newCanvasItems });
        }
    };

    const handleColorChange = (color, type) => {
        updateWebsite({ colors: { ...website.colors, [type]: color } });
    };

    const handleImageUpload = (url) => {
        updateWebsite({ heroImageUrl: url });
    };

    const handleDescriptionChange = (e) => {
        updateWebsite({ productDescription: e.target.value });
    };

    const handleAdditionalInstructionsChange = (e) => {
        setAdditionalInstructions(e.target.value);
    };

    const generatePage = async () => {
        if (!isAuthenticated) {
            alert('Please log in to generate a landing page.');
            return;
        }

        const designType = canvasItems.map((item) => item.type).join(', ');
        const { colors, heroImageUrl, additionalImages, productDescription } = website;

        try {
            const generatedHtml = await generateLandingPage(
                designType,
                Object.values(colors),
                heroImageUrl,
                additionalImages.join(', '),
                productDescription,
                canvasItems
            );
            updateWebsite({ generatedHtml });
        } catch (error) {
            console.error('Error generating landing page:', error);
            alert('An error occurred while generating the landing page. Please try again.');
        }
    };

    const improvePage = async () => {
        if (!isAuthenticated) {
            alert('Please log in to improve the landing page.');
            return;
        }

        try {
            const improvedHtml = await improveLandingPage(
                website.generatedHtml,
                additionalInstructions
            );
            updateWebsite({ generatedHtml: improvedHtml });
        } catch (error) {
            console.error('Error improving landing page:', error);
            alert('An error occurred while improving the landing page. Please try again.');
        }
    };

    const downloadHtml = () => {
        const blob = new Blob([website.generatedHtml], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'landing-page.html';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    return (
        <BuilderContainer>
            <Header />
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
                                    {canvasItems.map((item, index) => (
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
                    <Button onClick={generatePage}>Generate Landing Page</Button>
                    {website.generatedHtml && (
                        <>
                            <Button onClick={improvePage}>Improve Landing Page</Button>
                            <Button onClick={downloadHtml}>Download HTML</Button>
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
            <Footer />
        </BuilderContainer>
    );
};

export default Builder;
