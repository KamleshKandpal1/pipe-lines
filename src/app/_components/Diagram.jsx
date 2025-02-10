import React, { useState, useEffect, useRef } from "react";
import { Stage, Layer, Line, Rect, Text, Circle } from "react-konva";

const GridBackground = ({
  width,
  height,
  cellSize,
  offsetX,
  offsetY,
}) => {
  const lines = [];

  // Vertical lines
  for (let i = 0; i < width + cellSize; i += cellSize) {
    const x = i - (offsetX % cellSize);
    lines.push(
      <Line
        key={`v-${x}`}
        points={[x, 0, x, height]}
        stroke="#ccc"
        strokeWidth={1}
      />
    );
  }

  // Horizontal lines
  for (let i = 0; i < height + cellSize; i += cellSize) {
    const y = i - (offsetY % cellSize);
    lines.push(
      <Line
        key={`h-${y}`}
        points={[0, y, width, y]}
        stroke="#ccc"
        strokeWidth={1}
      />
    );
  }

  return <>{lines}</>;
};

const AxisRuler = ({
  width,
  height,
  cellSize,
  margin,
  offsetX,
  offsetY,
}) => {
  const xAxis = [];
  const yAxis = [];
  const majorTickSize = 20;
  const mediumTickSize = 14;
  const minorTickSize = 8;
  const fontSize = 12;

  // X-Axis Ruler (only positive values)
  for (
    let i = Math.max(0, Math.ceil(offsetX / cellSize));
    i <= Math.ceil((width + offsetX) / cellSize);
    i++
  ) {
    const position = margin.left + i * cellSize - offsetX;

    // Major Tick & Label
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
  for (
    let i = Math.max(0, Math.ceil(offsetY / cellSize));
    i <= Math.ceil((height + offsetY) / cellSize);
    i++
  ) {
    const position = height - margin.bottom - i * cellSize + offsetY;

    // Major Tick & Label
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
  // State for window dimensions, panning offset, and zooming
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [lastPos, setLastPos] = useState({ x: 0, y: 0 });
  const [showMap, setShowMap] = useState(false);
  const [zoom, setZoom] = useState(1);

  // States for drawing lines
  const [drawnLines, setDrawnLines] = useState([]);
  const [lineHistory, setLineHistory] = useState([]);

  // State for coordinate display mode
  const [showCoordinates, setShowCoordinates] = useState(false);

  // State for straight line drawing
  const [startPoint, setStartPoint] = useState(null);
  const [endPoint, setEndPoint] = useState(null);

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

  // Combined event handlers for panning and drawing.
  const handleMouseDown = (e) => {
    if (showCoordinates) {
      // Check if clicking on the end circle of an existing line
      const pos = e.target.getStage().getPointerPosition();
      const adjustedPos = { x: pos.x - offset.x, y: pos.y - offset.y };
      let clickedOnEndCircle = false;

      drawnLines.forEach((line) => {
        const endX = line[2];
        const endY = line[3];
        const distance = Math.sqrt(
          Math.pow(adjustedPos.x - endX, 2) + Math.pow(adjustedPos.y - endY, 2)
        );
        if (distance < 10) {
          setStartPoint({ x: endX, y: endY });
          setEndPoint({ x: endX, y: endY });
          clickedOnEndCircle = true;
        }
      });

      if (!clickedOnEndCircle) {
        // Begin straight line drawing
        setStartPoint(adjustedPos);
        setEndPoint(adjustedPos);
      }
    } else {
      // Begin panning
      setDragging(true);
      setLastPos({ x: e.evt.clientX, y: e.evt.clientY });
    }
  };

  const handleMouseMove = (e) => {
    if (dragging) {
      // Panning logic
      const { clientX, clientY } = e.evt;
      const dx = clientX - lastPos.x;
      const dy = clientY - lastPos.y;
      setOffset((prev) => ({
        x: Math.max(prev.x - dx, 0),
        y: Math.max(prev.y - dy, 0),
      }));
      setLastPos({ x: clientX, y: clientY });
    } else if (showCoordinates && startPoint) {
      // Update the end point of the straight line
      const pos = e.target.getStage().getPointerPosition();
      setEndPoint({ x: Math.max(pos.x - offset.x, 0), y: Math.max(pos.y - offset.y, 0) });
    }
  };

  const handleMouseUp = (e) => {
    if (showCoordinates && startPoint) {
      // Finalize the straight line
      const pos = e.target.getStage().getPointerPosition();
      setDrawnLines((prev) => [
        ...prev,
        [startPoint.x, startPoint.y, Math.max(pos.x - offset.x, 0), Math.max(pos.y - offset.y, 0)],
      ]);
      setStartPoint(null);
      setEndPoint(null);
    } else {
      setDragging(false);
    }
  };

  const handleWheel = (e) => {
    e.evt.preventDefault();
    const scaleAmount = e.evt.deltaY > 0 ? 0.9 : 1.1;
    setZoom((prevZoom) => Math.max(0.5, Math.min(prevZoom * scaleAmount, 3)));
  };

  const handleUndo = () => {
    setDrawnLines((prev) => {
      const newLines = prev.slice(0, -1);
      setLineHistory(newLines);
      return newLines;
    });
  };

  const { width, height } = windowSize;
  const cellSize = 20;

  const margin = {
    left: 50,
    right: 20,
    top: 20,
    bottom: 50,
  };

  return (
    <>
      {/* Button to toggle between map and grid */}
      <button
        onClick={() => setShowMap((prev) => !prev)}
        style={{ position: "absolute", top: 10, left: 10, zIndex: 1000 }}
      >
        {showMap ? "Show Grid" : "Show Map"}
      </button>

      {/* Button to undo the last drawn line */}
      <button
        onClick={handleUndo}
        style={{ position: "absolute", top: 40, left: 10, zIndex: 1000 }}
        disabled={drawnLines.length === 0}
      >
        Undo
      </button>

      {/* Button to toggle coordinate display mode */}
      <button
        onClick={() => setShowCoordinates((prev) => !prev)}
        style={{ position: "absolute", top: 70, left: 10, zIndex: 1000 }}
      >
        {showCoordinates ? "Hide Coordinates" : "Show Coordinates"}
      </button>

      {/* Google Maps iframe (if toggled on) */}
      {showMap && (
        <div
          ref={mapContainerRef}
          style={{
            width: width - margin.left - margin.right,
            height: height - margin.top - margin.bottom,
            position: "absolute",
            top: margin.top,
            left: margin.left,
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
        onWheel={handleWheel}
      >
        <Layer>
          {/* Background Grid Layer (only visible when map is off) */}
          {!showMap && (
            <>
              <Rect width={width} height={height} fill="#e3f2c1" />
              <GridBackground
                width={width}
                height={height}
                cellSize={cellSize}
                offsetX={offset.x}
                offsetY={offset.y}
              />
            </>
          )}

          {/* Layer for drawn lines */}
          {drawnLines.map((line, i) => (
            <React.Fragment key={i}>
              <Line
                points={line.map((point, index) =>
                  index % 2 === 0 ? point + offset.x : point + offset.y
                )}
                stroke="red"
                strokeWidth={2}
                lineCap="round"
                lineJoin="round"
              />
              <Circle x={line[0] + offset.x} y={line[1] + offset.y} radius={5} fill="blue" />
              <Circle x={line[2] + offset.x} y={line[3] + offset.y} radius={5} fill="blue" />
              <Text
                text={`(${Math.round(line[0] / cellSize)}, ${Math.round(line[1] / cellSize)})`}
                x={line[0] + offset.x}
                y={line[1] + offset.y}
                fontSize={12}
                fill="blue"
              />
              <Text
                text={`(${Math.round(line[2] / cellSize)}, ${Math.round(line[3] / cellSize)})`}
                x={line[2] + offset.x}
                y={line[3] + offset.y}
                fontSize={12}
                fill="blue"
              />
            </React.Fragment>
          ))}
          {startPoint && endPoint && (
            <React.Fragment>
              <Line
                points={[
                  startPoint.x + offset.x,
                  startPoint.y + offset.y,
                  endPoint.x + offset.x,
                  endPoint.y + offset.y,
                ]}
                stroke="red"
                strokeWidth={2}
                lineCap="round"
                lineJoin="round"
              />
              <Circle x={startPoint.x + offset.x} y={startPoint.y + offset.y} radius={5} fill="blue" />
              <Circle x={endPoint.x + offset.x} y={endPoint.y + offset.y} radius={5} fill="blue" />
              <Text
                text={`(${Math.round(startPoint.x / cellSize)}, ${Math.round(startPoint.y / cellSize)})`}
                x={startPoint.x + offset.x}
                y={startPoint.y + offset.y}
                fontSize={12}
                fill="blue"
              />
              <Text
                text={`(${Math.round(endPoint.x / cellSize)}, ${Math.round(endPoint.y / cellSize)})`}
                x={endPoint.x + offset.x}
                y={endPoint.y + offset.y}
                fontSize={12}
                fill="blue"
              />
            </React.Fragment>
          )}

          {/* Axis Ruler Layer */}
          <AxisRuler
            width={width}
            height={height}
            cellSize={cellSize}
            margin={margin}
            offsetX={offset.x}
            offsetY={offset.y}
          />

          {/* Coordinate Display Layer */}
          {showCoordinates && (
            <>
              {drawnLines.map((line, i) => (
                <Text
                  key={`coord-${i}`}
                  text={`(${Math.round(line[0] / cellSize)}, ${Math.round(line[1] / cellSize)})`}
                  x={line[0] + offset.x}
                  y={line[1] + offset.y}
                  fontSize={12}
                  fill="blue"
                />
              ))}
            </>
          )}
        </Layer>
      </Stage>
    </>
  );
};

export default Diagram;