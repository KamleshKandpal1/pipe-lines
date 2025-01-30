import React, { useState, useEffect, useRef } from "react";
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

  // X-Axis Ruler (only positive values)
  for (let i = Math.max(0, Math.ceil(offsetX / cellSize)); i <= Math.ceil((width + offsetX) / cellSize); i++) {
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

  // Y-Axis Ruler (only positive values)
  for (let i = Math.max(0, Math.ceil(offsetY / cellSize)); i <= Math.ceil((height + offsetY) / cellSize); i++) {
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
  const [showMap, setShowMap] = useState(false);
  const [zoom, setZoom] = useState(1); // Added zoom state

  const mapContainerRef = useRef(null);

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

    // Constrain the offset to not go below 0
    setOffset((prev) => ({
      x: Math.max(prev.x - dx, 0),
      y: Math.max(prev.y - dy, 0),
    }));
    setLastPos({ x: clientX, y: clientY });
  };

  const handleMouseUp = () => {
    setDragging(false);
  };

  const handleWheel = (e) => {
    e.evt.preventDefault(); // Correct event handling
    const scaleAmount = e.evt.deltaY > 0 ? 0.9 : 1.1;
    setZoom((prevZoom) => Math.max(0.5, Math.min(prevZoom * scaleAmount, 3)));
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
    <>
      <button
        onClick={() => setShowMap((prev) => !prev)}
        style={{ position: "absolute", top: 10, left: 10, zIndex: 1000 }}
      >
        {showMap ? "Show Grid" : "Show Map"}
      </button>

      {showMap && (
        <div
          ref={mapContainerRef}
          style={{
            width: width - padding.left - padding.right,
            height: height - padding.top - padding.bottom,
            position: "absolute",
            top: padding.top,
            left: padding.left,
            zIndex: -1,
            cursor: "move",
          }}
        >
          <iframe
            width="100%"
            height="100%"
            src="https://www.google.com/maps/embed?pb=!1m24!1m12!1m3!1d31672.422981306725!2d76.60007622135552!3d28.89633931875722!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m9!3e3!4m3!3m2!1d28.8933157!2d76.6055238!4m3!3m2!1d28.893656!2d76.6116524!5e0!3m2!1sen!2sin!4v1737366128096!5m2!1sen!2sin"
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
          ></iframe>
        </div>
      )}

      <Stage
        width={width}
        height={height}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onWheel={handleWheel} // Added onWheel handler
      >
        {!showMap && (
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
        )}
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
    </>
  );
};

export default Diagram;
