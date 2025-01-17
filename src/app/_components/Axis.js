"use client";
import React from "react";
import { Stage, Layer, Rect, Line, Text } from "react-konva";

const GridBackground = ({ width, height, cellSize }) => {
  const lines = [];
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

const AxisMeasurements = ({ width, height, cellSize }) => {
  const xAxis = [];
  const yAxis = [];

  // X-Axis Measurements
  for (let i = 0; i <= width / cellSize; i++) {
    xAxis.push(
      <Text
        key={`x-${i}`}
        text={`${i * cellSize}`}
        x={i * cellSize - 10}
        y={height - 20}
        fontSize={10}
        fill="black"
      />
    );
  }

  // Y-Axis Measurements
  for (let i = 0; i <= height / cellSize; i++) {
    yAxis.push(
      <Text
        key={`y-${i}`}
        text={`${i * cellSize}`}
        x={5}
        y={height - i * cellSize - 15}
        fontSize={10}
        fill="black"
      />
    );
  }

  return (
    <>
      {xAxis}
      {yAxis}
    </>
  );
};

const Axis = () => {
  const width = 800;
  const height = 600;
  const cellSize = 20;

  return (
    <Stage width={width} height={height}>
      {/* Background Layer */}
      <Layer>
        <Rect width={width} height={height} fill="#e3f2c1" />
        <GridBackground width={width} height={height} cellSize={cellSize} />
      </Layer>

      {/* Axis Measurements */}
      <Layer>
        <AxisMeasurements width={width} height={height} cellSize={cellSize} />
      </Layer>
    </Stage>
  );
};

export default Axis;
