"use client";
import React, { useState, useEffect } from "react";
import { Stage, Layer, Line, Rect, Text } from "react-konva";

const GridBackground = ({ width, height, cellSize }) => {
  const lines = [];

  // Vertical lines
  for (let i = 0; i < width / cellSize; i++) {
    lines.push(
      <Line
        key={`v-${i}`}
        points={[i * cellSize, 0, i * cellSize, height]}
        stroke="#ccc"
        strokeWidth={1}
      />
    );
  }

  // Horizontal lines
  for (let i = 0; i < height / cellSize; i++) {
    lines.push(
      <Line
        key={`h-${i}`}
        points={[0, i * cellSize, width, i * cellSize]}
        stroke="#ccc"
        strokeWidth={1}
      />
    );
  }

  return <>{lines}</>;
};

const Diagram = () => {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const { width, height } = windowSize;
  const cellSize = 20;

  // Margin configuration for the rulers
  const margin = {
    left: 50, // Space from the left edge
    right: 20, // Space from the right edge
    top: 20, // Space from the top edge
    bottom: 50, // Space from the bottom edge
  };

  return (
    <Stage width={width} height={height}>
      {/* Background Layer */}
      <Layer>
        <Rect width={width} height={height} fill="#e3f2c1" />
        <GridBackground width={width} height={height} cellSize={cellSize} />
      </Layer>

      {/* Ruler Layer */}
      {/* <Layer>
        <AxisRuler
          width={width}
          height={height}
          cellSize={cellSize}
          margin={margin}
        />
      </Layer> */}
    </Stage>
  );
};

export default Diagram;
