import React, { useRef, useEffect, useState } from "react";

const ImageWithBBoxes = ({ imageUrl, bboxes, onNewBbox }) => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [newBbox, setNewBbox] = useState(null);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0 });
  const [canvasDimensions, setCanvasDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const image = new Image();
    image.onload = () => {
      const parentWidth = canvas.parentElement.offsetWidth;
      const parentHeight = canvas.parentElement.offsetHeight;
      const aspectRatio = image.width / image.height;
      let newWidth = parentWidth;
      let newHeight = parentWidth / aspectRatio;

      if (newHeight > parentHeight) {
        newHeight = parentHeight;
        newWidth = parentHeight * aspectRatio;
      }

      canvas.width = newWidth;
      canvas.height = newHeight;

      setImageDimensions({ width: image.width, height: image.height });
      setCanvasDimensions({ width: newWidth, height: newHeight });

      ctx.drawImage(image, 0, 0, newWidth, newHeight);

      ctx.strokeStyle = "red";
      ctx.lineWidth = 2;
      bboxes.forEach((bbox) => {
        const { title, x, y, width, height } = bbox;
        const scaledX = x * (newWidth / image.width);
        const scaledY = y * (newHeight / image.height);
        const scaledWidth = width * (newWidth / image.width);
        const scaledHeight = height * (newHeight / image.height);

        ctx.strokeRect(scaledX, scaledY, scaledWidth, scaledHeight);

        const textX = scaledX + 2;
        const textY = scaledY + 12;

        if (scaledWidth > 20 && scaledHeight > 20) {
          ctx.fillStyle = "yellow";
          ctx.font = "15px Arial";
          ctx.fillText(title, textX, textY);
        }
      });

      if (newBbox) {
        ctx.strokeStyle = "blue";
        ctx.strokeRect(newBbox.x, newBbox.y, newBbox.width, newBbox.height);
      }
    };
    image.src = imageUrl;
  }, [imageUrl, bboxes, newBbox]);

  const handleMouseDown = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const startX = (e.clientX - rect.left) * (canvas.width / rect.width);
    const startY = (e.clientY - rect.top) * (canvas.height / rect.height);
    setStartPos({ x: startX, y: startY });
    setIsDrawing(true);
  };

  const handleMouseMove = (e) => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const currentX = (e.clientX - rect.left) * (canvas.width / rect.width);
    const currentY = (e.clientY - rect.top) * (canvas.height / rect.height);
    const width = currentX - startPos.x;
    const height = currentY - startPos.y;
    setNewBbox({ x: startPos.x, y: startPos.y, width, height });
  };

  const handleMouseUp = () => {
    if (!isDrawing) return;

    setIsDrawing(false);
    if (newBbox) {
      const scaledBbox = {
        title: "New Box",
        x: newBbox.x * (imageDimensions.width / canvasDimensions.width),
        y: newBbox.y * (imageDimensions.height / canvasDimensions.height),
        width: newBbox.width * (imageDimensions.width / canvasDimensions.width),
        height: newBbox.height * (imageDimensions.height / canvasDimensions.height),
      };
      onNewBbox(scaledBbox);
      setNewBbox(null);
    }
  };

  return (
    <canvas
      ref={canvasRef}
      style={{ width: "100%", height: 400 }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    />
  );
};

export default ImageWithBBoxes;
