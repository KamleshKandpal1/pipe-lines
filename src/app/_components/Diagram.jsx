"use client";
import React, { useState, useEffect } from "react";
import { Stage, Layer, Line, Rect, Text } from "react-konva";

const GridBackground = ({ width, height, cellSize, offsetX, offsetY, padding }) => {
  const lines = [];

  // Vertical lines
  for (let i = 0; i < width + cellSize; i += cellSize) {
    const x = i - (offsetX % cellSize);
    if (x >= padding.left && x <= width - padding.right) {
      lines.push(
        <Line
          key={`v-${x}`}
          points={[x, padding.top, x, height - padding.bottom]}
          stroke="#ccc"
          strokeWidth={1}
        />
      );
    }
  }

  // Horizontal lines
  for (let i = 0; i < height + cellSize; i += cellSize) {
    const y = i - (offsetY % cellSize);
    if (y >= padding.top && y <= height - padding.bottom) {
      lines.push(
        <Line
          key={`h-${y}`}
          points={[padding.left, y, width - padding.right, y]}
          stroke="#ccc"
          strokeWidth={1}
        />
      );
    }
  }

  return <>{lines}</>;
};

const AxisRuler = ({ width, height, cellSize, margin, offsetX, offsetY, padding }) => {
  const xAxis = [];
  const yAxis = [];
  const majorTickSize = 20;
  const mediumTickSize = 14;
  const minorTickSize = 8;
  const fontSize = 12;

  // X-Axis Ruler (positive values only)
  for (
    let i = Math.ceil(offsetX / cellSize);
    i <= Math.ceil((width + offsetX) / cellSize);
    i++
  ) {
    const position = margin.left + i * cellSize - offsetX;
    if (position < padding.left || position > width - padding.right) continue;

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
          <Text
            text={`${i}`}
            x={position - fontSize / 2}
            y={height - margin.bottom + 5}
            fontSize={fontSize}
            fill="black"
          />
        </React.Fragment>
      );
    } else if (i % 5 === 0) {
      // Medium Tick
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
    } else {
      // Minor Tick
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

  // Y-Axis Ruler (positive values only)
  for (
    let i = Math.ceil(offsetY / cellSize);
    i <= Math.ceil((height + offsetY) / cellSize);
    i++
  ) {
    const position = height - margin.bottom - i * cellSize + offsetY;
    if (position < padding.top || position > height - padding.bottom) continue;

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
          <Text
            text={`${i}`}
            x={margin.left - fontSize - 5}
            y={position - fontSize / 2}
            fontSize={fontSize}
            fill="black"
          />
        </React.Fragment>
      );
    } else if (i % 5 === 0) {
      // Medium Tick
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
    } else {
      // Minor Tick
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
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [lastPos, setLastPos] = useState({ x: 0, y: 0 });

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

  const handleMouseDown = (e) => {
    setDragging(true);
    setLastPos({ x: e.evt.clientX, y: e.evt.clientY });
  };

  const handleMouseMove = (e) => {
    if (!dragging) return;
    const { clientX, clientY } = e.evt;
    const dx = clientX - lastPos.x;
    const dy = clientY - lastPos.y;

    setOffset((prev) => ({
      x: prev.x - dx,
      y: prev.y - dy,
    }));
    setLastPos({ x: clientX, y: clientY });
  };

  const handleMouseUp = () => {
    setDragging(false);
  };

  const { width, height } = windowSize;
  const cellSize = 20;

  const margin = {
    left: 50,
    right: 20,
    top: 20,
    bottom: 50,
  };

  const padding = {
    left: 60,
    right: 60,
    top: 60,
    bottom: 60,
  };

  return (
    <Stage
      width={width}
      height={height}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      {/* Background Layer */}
      <Layer>
        <Rect width={width} height={height} fill="#e3f2c1" />
        <GridBackground
          width={width}
          height={height}
          cellSize={cellSize}
          offsetX={offset.x}
          offsetY={offset.y}
          padding={padding}
        />
      </Layer>

      {/* Ruler Layer */}
      <Layer>
        <AxisRuler
          width={width}
          height={height}
          cellSize={cellSize}
          margin={margin}
          offsetX={offset.x}
          offsetY={offset.y}
          padding={padding}
        />
      </Layer>
    </Stage>
  );
};

export default Diagram;
