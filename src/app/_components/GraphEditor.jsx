"use client";
import { useState, useRef } from "react";
import { Stage, Layer, Line, Circle, Text } from "react-konva";

const NODE_TYPES = {
  WATER: { color: "blue", symbol: "+", radius: 12 },
  GAS: { color: "black", symbol: "X", radius: 14 },
};

export default function GraphEditor() {
  const [nodes, setNodes] = useState([]);
  const [lines, setLines] = useState([]);
  const [selectedNode, setSelectedNode] = useState(null);
  const stageRef = useRef(null);

  const gridSize = 20;

  const snapToGrid = (value) => Math.round(value / gridSize) * gridSize;

  const handleStageClick = (e) => {
    const stage = stageRef.current;
    const pointer = stage.getPointerPosition();

    const newNode = {
      id: nodes.length + 1,
      x: snapToGrid(pointer.x),
      y: snapToGrid(pointer.y),
      type: nodes.length % 2 === 0 ? "WATER" : "GAS",
    };

    setNodes([...nodes, newNode]);
  };

  const handleNodeDragStart = (node) => {
    setSelectedNode(node);
  };

  const handleNodeDragEnd = (node) => {
    if (!selectedNode || selectedNode.id === node.id) return;
    setLines([...lines, { from: selectedNode.id, to: node.id }]);
    setSelectedNode(null);
  };

  /** 📌 Export Graph as JSON */
  const exportJSON = () => {
    const graphData = JSON.stringify({ nodes, lines }, null, 2);
    const blob = new Blob([graphData], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "graph.json";
    link.click();
  };

  /** 📌 Export Graph as Image */
  const exportImage = (format = "png") => {
    const uri = stageRef.current.toDataURL({ pixelRatio: 2 });
    const link = document.createElement("a");
    link.href = uri;
    link.download = `graph.${format}`;
    link.click();
  };

  return (
    <div className="relative w-full h-full border border-gray-300">
      <Stage
        ref={stageRef}
        width={window.innerWidth}
        height={window.innerHeight}
        onClick={handleStageClick}
      >
        <Layer>
          {[...Array(Math.ceil(window.innerWidth / gridSize))].map((_, i) => (
            <Line key={i} points={[i * gridSize, 0, i * gridSize, window.innerHeight]} stroke="#ddd" strokeWidth={1} />
          ))}
          {[...Array(Math.ceil(window.innerHeight / gridSize))].map((_, i) => (
            <Line key={`h-${i}`} points={[0, i * gridSize, window.innerWidth, i * gridSize]} stroke="#ddd" strokeWidth={1} />
          ))}
        </Layer>

        <Layer>
          {lines.map((line, index) => {
            const fromNode = nodes.find((n) => n.id === line.from);
            const toNode = nodes.find((n) => n.id === line.to);
            return (
              <Line
                key={index}
                points={[fromNode.x, fromNode.y, toNode.x, toNode.y]}
                stroke={fromNode.type === "WATER" ? "blue" : "black"}
                strokeWidth={3}
              />
            );
          })}
        </Layer>

        <Layer>
          {nodes.map((node) => (
            <Circle
              key={node.id}
              x={node.x}
              y={node.y}
              radius={NODE_TYPES[node.type].radius}
              fill={NODE_TYPES[node.type].color}
              draggable
              onDragStart={() => handleNodeDragStart(node)}
              onDragEnd={() => handleNodeDragEnd(node)}
            />
          ))}

          {nodes.map((node) => (
            <Text
              key={`text-${node.id}`}
              x={node.x - 5}
              y={node.y - 5}
              text={NODE_TYPES[node.type].symbol}
              fontSize={14}
              fill="white"
            />
          ))}
        </Layer>
      </Stage>

      {/* Export Buttons */}
      <div className="absolute top-4 right-4 bg-white p-2 rounded shadow-lg">
        <button
          className="bg-blue-500 text-white px-3 py-1 rounded mr-2"
          onClick={() => exportImage("png")}
        >
          Export PNG
        </button>
        <button
          className="bg-green-500 text-white px-3 py-1 rounded mr-2"
          onClick={() => exportImage("jpg")}
        >
          Export JPG
        </button>
        <button
          className="bg-gray-700 text-white px-3 py-1 rounded"
          onClick={exportJSON}
        >
          Export JSON
        </button>
      </div>
    </div>
  );
}


