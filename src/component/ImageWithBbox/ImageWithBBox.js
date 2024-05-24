import React, { useRef, useEffect, useState } from "react";
import { Stage, Layer, Image, Rect, Text, Transformer } from "react-konva";
import useImage from "use-image";

const ImageWithBBoxes = ({ imageUrl, bboxes, onNewBbox, onUpdateBbox, categories }) => {
  const [image] = useImage(imageUrl);
  const [isDrawing, setIsDrawing] = useState(false);
  const [newBbox, setNewBbox] = useState(null);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [selectedBbox, setSelectedBbox] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showCategorySelect, setShowCategorySelect] = useState(false);
  const stageRef = useRef(null);
  const transformerRef = useRef(null);

  const handleMouseDown = (e) => {
    if (!image) return;

    const { x, y } = e.target.getStage().getPointerPosition();
    setStartPos({ x, y });
    setIsDrawing(true);
    setShowCategorySelect(false);

    // Deselect any selected bounding box
    setSelectedBbox(null);
    if (transformerRef.current) {
      transformerRef.current.nodes([]);
    }
  };

  const handleMouseMove = (e) => {
    if (!isDrawing || !image) return;

    const { x, y } = e.target.getStage().getPointerPosition();
    const width = x - startPos.x;
    const height = y - startPos.y;
    setNewBbox({ x: startPos.x, y: startPos.y, width, height });
  };

  const handleMouseUp = () => {
    if (!isDrawing) return;

    setIsDrawing(false);
    setShowCategorySelect(true);
  };

  const handleCategorySelect = () => {
    if (newBbox && selectedCategory) {
      const scaledBbox = {
        title: selectedCategory,
        x: newBbox.x,
        y: newBbox.y,
        width: newBbox.width,
        height: newBbox.height,
      };
      onNewBbox(scaledBbox);
      setNewBbox(null);
      setSelectedCategory('');
      setShowCategorySelect(false);
    } else if (selectedBbox && selectedCategory) {
      const updatedBbox = {
        ...selectedBbox,
        title: selectedCategory,
      };
      onUpdateBbox(updatedBbox);
      setSelectedBbox(null);
      setSelectedCategory('');
      setShowCategorySelect(false);
    }
  };

  const handleBboxClick = (bbox, index) => {
    setSelectedBbox({ ...bbox, index });
    setSelectedCategory(bbox.title);
    setShowCategorySelect(true);

    if (transformerRef.current) {
      transformerRef.current.nodes([stageRef.current.findOne(`#bbox-${index}`)]);
      transformerRef.current.getLayer().batchDraw();
    }
  };

  const handleDragEnd = (e, bbox, index) => {
    const { x, y } = e.target.position();
    const updatedBbox = {
      ...bbox,
      x,
      y,
      index,
    };
    onUpdateBbox(updatedBbox);
  };

  const handleTransformEnd = (e, bbox, index) => {
    const node = e.target;
    const { x, y, width, height } = node.attrs;
    const updatedBbox = {
      ...bbox,
      x,
      y,
      width,
      height,
      index,
    };
    onUpdateBbox(updatedBbox);
  };

  return (
    <div>
      <Stage
        width={window.innerWidth}
        height={window.innerHeight}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        ref={stageRef}
      >
        <Layer>
          <Image image={image} />
          {bboxes.map((bbox, index) => (
            <React.Fragment key={index}>
              <Rect
                id={`bbox-${index}`}
                x={bbox.x}
                y={bbox.y}
                width={bbox.width}
                height={bbox.height}
                stroke={selectedBbox && selectedBbox.index === index ? "blue" : "red"}
                strokeWidth={2}
                draggable
                onClick={() => handleBboxClick(bbox, index)}
                onDragEnd={(e) => handleDragEnd(e, bbox, index)}
                onTransformEnd={(e) => handleTransformEnd(e, bbox, index)}
              />
              <Text
                x={bbox.x + 2}
                y={bbox.y + 12}
                text={bbox.title}
                fontSize={15}
                fill="yellow"
              />
            </React.Fragment>
          ))}
          {newBbox && (
            <Rect
              x={newBbox.x}
              y={newBbox.y}
              width={newBbox.width}
              height={newBbox.height}
              stroke="blue"
              strokeWidth={2}
            />
          )}
          <Transformer ref={transformerRef} />
        </Layer>
      </Stage>
      {showCategorySelect && (
        <div style={{ position: 'absolute', top: 10, left: 10, background: 'white', padding: 10, borderRadius: 5 }}>
          <label>Select Category: </label>
          <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
            <option value="">--Select--</option>
            {categories.map((category, index) => (
              <option key={index} value={category}>{category}</option>
            ))}
          </select>
          <button onClick={handleCategorySelect}>Confirm</button>
        </div>
      )}
    </div>
  );
};

export default ImageWithBBoxes;
