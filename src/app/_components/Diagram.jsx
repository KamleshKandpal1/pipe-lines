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

const AxisRuler = ({ width, height, cellSize, margin }) => {
  const xAxis = [];
  const yAxis = [];
  const majorTickSize = 20;
  const mediumTickSize = 14;
  const minorTickSize = 8;
  const fontSize = 12;

  // X-Axis Ruler
  for (let i = 0; i <= (width - margin.left - margin.right) / cellSize; i++) {
    const position = margin.left + i * cellSize;

    // Add "0" label at the origin for x-axis
    if (i === 0) {
      xAxis.push(
        <React.Fragment key={`x-origin`}>
          <Text
            text="0"
            x={margin.left - fontSize / 2}
            y={height - margin.bottom + 5} // Position below the tick
            fontSize={fontSize}
            fill="black"
          />
        </React.Fragment>
      );
    }

    // Major Tick
    if (i % 10 === 0) {
      xAxis.push(
        <React.Fragment key={`x-major-${i}`}>
          <Rect
            x={position - 1}
            y={height - majorTickSize - margin.bottom}
            width={2}
            height={majorTickSize}
            fill="black"
          />
          {/* Add labels for major ticks */}
          {i !== 0 && (
            <Text
              text={`${i}`}
              x={position - fontSize / 2}
              y={height - margin.bottom + 5} // Position below the tick
              fontSize={fontSize}
              fill="black"
            />
          )}
        </React.Fragment>
      );
    }
    // Medium Tick
    else if (i % 5 === 0) {
      xAxis.push(
        <Rect
          key={`x-medium-${i}`}
          x={position - 1}
          y={height - mediumTickSize - margin.bottom}
          width={2}
          height={mediumTickSize}
          fill="black"
        />
      );
    }
    // Minor Tick
    else {
      xAxis.push(
        <Rect
          key={`x-minor-${i}`}
          x={position - 1}
          y={height - minorTickSize - margin.bottom}
          width={2}
          height={minorTickSize}
          fill="black"
        />
      );
    }
  }

  // Y-Axis Ruler
  for (let i = 0; i <= (height - margin.top - margin.bottom) / cellSize; i++) {
    const position = height - margin.bottom - i * cellSize;

    // Add "0" label at the origin for y-axis
    if (i === 0) {
      yAxis.push(
        <React.Fragment key={`y-origin`}>
          <Text
            text=""
            x={margin.left - fontSize - 5} // Position left of the tick
            y={height - margin.bottom - fontSize / 2}
            fontSize={fontSize}
            fill="black"
          />
        </React.Fragment>
      );
    }

    // Major Tick
    if (i % 10 === 0) {
      yAxis.push(
        <React.Fragment key={`y-major-${i}`}>
          <Rect
            x={margin.left}
            y={position - 1}
            width={majorTickSize}
            height={2}
            fill="black"
          />
          {/* Add labels for major ticks */}
          {i !== 0 && (
            <Text
              text={`${i}`}
              x={margin.left - fontSize - 5} // Position left of the tick
              y={position - fontSize / 2}
              fontSize={fontSize}
              fill="black"
            />
          )}
        </React.Fragment>
      );
    }
    // Medium Tick
    else if (i % 5 === 0) {
      yAxis.push(
        <Rect
          key={`y-medium-${i}`}
          x={margin.left}
          y={position - 1}
          width={mediumTickSize}
          height={2}
          fill="black"
        />
      );
    }
    // Minor Tick
    else {
      yAxis.push(
        <Rect
          key={`y-minor-${i}`}
          x={margin.left}
          y={position - 1}
          width={minorTickSize}
          height={2}
          fill="black"
        />
      );
    }
  }

  return (
    <>
      {xAxis}
      {yAxis}
    </>
  );
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
      <Layer>
        <AxisRuler
          width={width}
          height={height}
          cellSize={cellSize}
          margin={margin}
        />
      </Layer>
    </Stage>
  );
};

export default Diagram;
