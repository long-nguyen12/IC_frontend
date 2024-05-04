import React, { useRef, useEffect, useState } from "react";

const ImageWithBBoxes = ({ imageUrl, bboxes, title }) => {
  const canvasRef = useRef(null);
  const [drawing, setDrawing] = useState(false);
  const [bbox, setBbox] = useState(null);

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

      ctx.drawImage(image, 0, 0, newWidth, newHeight);

      ctx.strokeStyle = "red";
      ctx.lineWidth = 2;
      bboxes.forEach((bbox) => {
        const { x, y, width, height } = bbox;
        const scaledX = x * (newWidth / image.width);
        const scaledY = y * (newHeight / image.height);
        const scaledWidth = width * (newWidth / image.width);
        const scaledHeight = height * (newHeight / image.height);

        ctx.strokeRect(scaledX, scaledY, scaledWidth, scaledHeight);

        // Calculate text position
        const textX = scaledX + 2; // Add a margin from the left edge of the bbox
        const textY = scaledY + 12; // Position text below the top edge of the bbox

        // Draw text inside bbox if the bbox is large enough
        if (scaledWidth > 20 && scaledHeight > 20) {
          ctx.fillStyle = "black"; // Set text color to black
          ctx.font = "12px Arial"; // Set font size and type
          ctx.fillText(title, textX, textY); // Draw text
        }
      });
    };
    image.src = imageUrl;
  }, [imageUrl, bboxes]);

  const handleMouseDown = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setBbox({
      x,
      y,
      width: 0,
      height: 0,
      imageWidth: canvas.width,
      imageHeight: canvas.height,
    });
    setDrawing(true);
  };

  const drawBBoxes = (ctx, bboxes, newWidth, newHeight) => {
    ctx.strokeStyle = "red";
    ctx.lineWidth = 2;
    bboxes.forEach((bbox) => {
      ctx.strokeRect(
        bbox.x * (newWidth / bbox.imageWidth), // Scale bbox x coordinate
        bbox.y * (newHeight / bbox.imageHeight), // Scale bbox y coordinate
        bbox.width * (newWidth / bbox.imageWidth), // Scale bbox width
        bbox.height * (newHeight / bbox.imageHeight) // Scale bbox height
      );
    });
  };

  const handleMouseMove = (e) => {
    if (drawing) {
      const canvas = canvasRef.current;
      const rect = canvas.getBoundingClientRect();
      const width = e.clientX - rect.left - bbox.x;
      const height = e.clientY - rect.top - bbox.y;
      setBbox((prevBbox) => ({ ...prevBbox, width, height }));
    }
  };

  const handleMouseUp = () => {
    setDrawing(false);
    // Add the drawn bbox to the list of bboxes
    if (bbox.width > 0 && bbox.height > 0) {
      const updatedBboxes = [...bboxes, bbox];
      // Redraw the canvas with the updated list of bboxes
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      drawBBoxes(ctx, updatedBboxes, canvas.width, canvas.height);
    }
    console.log(bbox);
  };

  return (
    <canvas
      ref={canvasRef}
      // onMouseDown={handleMouseDown}
      // onMouseMove={handleMouseMove}
      // onMouseUp={handleMouseUp}
      style={{ width: "100%", height: 400 }}
    />
  );
};

export default ImageWithBBoxes;
