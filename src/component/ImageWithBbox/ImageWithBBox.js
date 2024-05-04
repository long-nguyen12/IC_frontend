import React, { useRef, useEffect } from "react";

const ImageWithBBoxes = ({ imageUrl, bboxes }) => {
  const canvasRef = useRef(null);

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
        const { title, x, y, width, height } = bbox;
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
          ctx.font = "15px Arial"; // Set font size and type
          ctx.fillText(title, textX, textY); // Draw text
        }
      });
    };
    image.src = imageUrl;
  }, [imageUrl, bboxes]);

  return <canvas ref={canvasRef} style={{ width: "100%", height: 400 }} />;
};

export default ImageWithBBoxes;
