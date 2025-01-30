import React, { useState } from 'react';
import { Stage, Layer, Line } from 'react-konva';

const DrawLine = ({ width, height, padding }) => {
  const [lines, setLines] = useState([]); // To store the drawn lines
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentLine, setCurrentLine] = useState([]); // To track the line being drawn
  const [lastPos, setLastPos] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e) => {
    setIsDrawing(true);
    const { clientX, clientY } = e.evt;
    setLastPos({ x: clientX, y: clientY });
    setCurrentLine([clientX - padding.left, clientY - padding.top]); // Starting point of the line
  };

  const handleMouseMove = (e) => {
    if (!isDrawing) return;
    const { clientX, clientY } = e.evt;
    const newPos = [clientX - padding.left, clientY - padding.top];
    setCurrentLine((prev) => [...prev, ...newPos]); // Add new point as the line is drawn
  };

  const handleMouseUp = () => {
    if (isDrawing) {
      setLines((prev) => [...prev, currentLine]); // Add completed line to the list
      setIsDrawing(false);
      setCurrentLine([]); // Reset current line
    }
  };

  return (
    <Stage
      width={width}
      height={height}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <Layer>
        {/* Render the lines */}
        {lines.map((line, index) => (
          <Line
            key={`line-${index}`}
            points={line}
            stroke="black"
            strokeWidth={2}
            lineCap="round"
            lineJoin="round"
          />
        ))}
        {/* Render the current line being drawn */}
        {isDrawing && (
          <Line
            points={currentLine}
            stroke="black"
            strokeWidth={2}
            lineCap="round"
            lineJoin="round"
            dash={[5, 5]} // Optional dashed line while drawing
          />
        )}
      </Layer>
    </Stage>
  );
};

export default DrawLine;
