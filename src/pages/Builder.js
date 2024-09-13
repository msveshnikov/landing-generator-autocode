import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import Header from '../components/Header';
import Footer from '../components/Footer';
import ColorPicker from '../components/ColorPicker';
import ImageUploader from '../components/ImageUploader';
import { generateLandingPage, improveLandingPage } from '../claude';
import { WebsiteContext } from '../contexts/WebsiteContext';

const BuilderContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const BuilderContent = styled.div`
  display: flex;
  flex: 1;
`;

const ComponentLibrary = styled.div`
  width: 250px;
  background-color: #f0f0f0;
  padding: 20px;
  overflow-y: auto;
`;

const Canvas = styled.div`
  flex: 1;
  padding: 20px;
  background-color: #ffffff;
`;

const ComponentItem = styled.div`
  padding: 10px;
  margin-bottom: 10px;
  background-color: #ffffff;
  border: 1px solid #ddd;
  cursor: move;
`;

const CanvasItem = styled.div`
  padding: 10px;
  margin-bottom: 10px;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
`;

const PreviewContainer = styled.div`
  margin-top: 20px;
`;

const ControlPanel = styled.div`
  width: 250px;
  background-color: #f0f0f0;
  padding: 20px;
`;

const Button = styled.button`
  margin-top: 10px;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 100px;
  margin-bottom: 10px;
`;

const Builder = () => {
  const { website, updateWebsite } = useContext(WebsiteContext);
  const [components, setComponents] = useState([
    { id: 'header', type: 'Header' },
    { id: 'hero', type: 'Hero' },
    { id: 'features', type: 'Features' },
    { id: 'cta', type: 'Call to Action' },
    { id: 'footer', type: 'Footer' },
  ]);
  const [canvasItems, setCanvasItems] = useState([]);
  const [selectedColor, setSelectedColor] = useState('#ffffff');
  const [heroImageUrl, setHeroImageUrl] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [generatedHtml, setGeneratedHtml] = useState('');
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

  const handleColorChange = (color) => {
    setSelectedColor(color);
  };

  const handleImageUpload = (url) => {
    setHeroImageUrl(url);
  };

  const handleDescriptionChange = (e) => {
    setProductDescription(e.target.value);
  };

  const handleAdditionalInstructionsChange = (e) => {
    setAdditionalInstructions(e.target.value);
  };

  const generatePage = async () => {
    const prompt = `Create an HTML landing page with the following specifications:
      - Design type: ${canvasItems.map((item) => item.type).join(', ')}
      - Color scheme: ${selectedColor}
      - Hero image URL: ${heroImageUrl}
      - Product description: ${productDescription}
      - Additional instructions: ${additionalInstructions}
    `;

    try {
      const generatedHtml = await generateLandingPage(prompt);
      setGeneratedHtml(generatedHtml);
    } catch (error) {
      console.error('Error generating landing page:', error);
    }
  };

  const improvePage = async () => {
    try {
      const improvedHtml = await improveLandingPage(generatedHtml, additionalInstructions);
      setGeneratedHtml(improvedHtml);
    } catch (error) {
      console.error('Error improving landing page:', error);
    }
  };

  const downloadHtml = () => {
    const blob = new Blob([generatedHtml], { type: 'text/html' });
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
                    <Draggable key={component.id} draggableId={component.id} index={index}>
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
                    <Draggable key={item.id} draggableId={item.id} index={index}>
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
          <ColorPicker selectedColor={selectedColor} onChange={handleColorChange} />
          <ImageUploader onUpload={handleImageUpload} />
          <TextArea
            placeholder="Enter product description"
            value={productDescription}
            onChange={handleDescriptionChange}
          />
          <TextArea
            placeholder="Additional instructions"
            value={additionalInstructions}
            onChange={handleAdditionalInstructionsChange}
          />
          <Button onClick={generatePage}>Generate Landing Page</Button>
          {generatedHtml && (
            <>
              <Button onClick={improvePage}>Improve Landing Page</Button>
              <Button onClick={downloadHtml}>Download HTML</Button>
            </>
          )}
        </ControlPanel>
      </BuilderContent>
      {generatedHtml && (
        <PreviewContainer>
          <h2>Preview</h2>
          <iframe
            title="Landing Page Preview"
            srcDoc={generatedHtml}
            width="100%"
            height="600px"
            style={{ border: '1px solid #ddd' }}
          />
        </PreviewContainer>
      )}
      <Footer />
    </BuilderContainer>
  );
};

export default Builder;