"use client";

import React, { useState, useEffect } from "react";
import { FaMinusCircle, FaPlusCircle, FaTrash } from "react-icons/fa";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

// Symbol options: Water and Gas
const symbolOptions = [
  { name: "Water", symbol: "+", color: "blue" },
  { name: "Gas", symbol: "X", color: "black" },
];

const SymbolBox = () => {
  const [dialogStatus, setDialogStatus] = useState(false);
  const [selectedSymbol, setSelectedSymbol] = useState(symbolOptions[0]); // Default: Water
  const [pipeSize, setPipeSize] = useState("1");
  const [pipesData, setPipesData] = useState([]);

  useEffect(() => {
    const storedData = localStorage.getItem("pipesData");
    if (storedData) setPipesData(JSON.parse(storedData));
  }, []);

  useEffect(() => {
    localStorage.setItem("pipesData", JSON.stringify(pipesData));
  }, [pipesData]);

  const openDialogbox = () => setDialogStatus((prev) => !prev);

  const handleAddSymbol = () => {
    const newSymbol = {
      name: selectedSymbol.name,
      symbol: selectedSymbol.symbol,
      color: selectedSymbol.color,
      pipeSize,
    };
    setPipesData([...pipesData, newSymbol]);
  };

  const handleDelete = (index) => {
    setPipesData((prevData) => prevData.filter((_, i) => i !== index));
  };

  return (
    <TooltipProvider>
      <div className="relative">
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              className="text-3xl text-blue-500 hover:text-blue-600 transition-colors duration-200"
              onClick={openDialogbox}
            >
              {dialogStatus ? <FaMinusCircle /> : <FaPlusCircle />}
            </button>
          </TooltipTrigger>
          <TooltipContent>
            <p>{dialogStatus ? "Close" : "Add Symbol"}</p>
          </TooltipContent>
        </Tooltip>

        {dialogStatus && (
          <div className="absolute right-0 top-12 bg-[#1f1f1f7a] border rounded-lg shadow-2xl p-3 w-64">
            {/* Symbol Selector */}
            <label className="text-white text-sm">Select Symbol:</label>
            <select
              className="w-full p-2 my-1 border rounded-md"
              value={selectedSymbol.name}
              onChange={(e) => {
                const chosen = symbolOptions.find((s) => s.name === e.target.value);
                setSelectedSymbol(chosen);
              }}
            >
              {symbolOptions.map((option) => (
                <option key={option.name} value={option.name}>
                  {option.name} ({option.symbol})
                </option>
              ))}
            </select>

            {/* Pipe Size Input */}
            <label className="text-white text-sm">Pipe Size (mtr):</label>
            <input
              type="number"
              className="w-full p-2 my-1 border rounded-md"
              value={pipeSize}
              onChange={(e) => setPipeSize(e.target.value)}
              min="1"
            />

            {/* Add Button */}
            <button
              className="mt-2 w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-md"
              onClick={handleAddSymbol}
            >
              Add Symbol
            </button>

            {/* Symbols List */}
            <ScrollArea className="h-40 mt-3">
              {pipesData.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center bg-gray-50 rounded-md p-2 my-1"
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-lg font-bold" style={{ color: item.color }}>
                      {item.symbol}
                    </span>
                    <div>
                      <p className="font-medium text-gray-800">{item.name}</p>
                      <p className="text-sm text-gray-500">{item.pipeSize} mtr</p>
                    </div>
                  </div>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button className="text-red-500 hover:text-red-600" onClick={() => handleDelete(index)}>
                        <FaTrash className="w-4 h-4" />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Delete</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              ))}
            </ScrollArea>
          </div>
        )}
      </div>
    </TooltipProvider>
  );
};

export default SymbolBox;
