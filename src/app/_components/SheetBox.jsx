"use client";
import React, { useState } from "react";
import { FaEye, FaEyeSlash, FaPlusCircle } from "react-icons/fa";

const SheetBox = ({ setLayer }) => {
  const [panels, setPanels] = useState(false);
  const [panelImg, setPanelImage] = useState([]);

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    setPanelImage(files);
    // You can call setLayer or perform other actions with files if needed
  };

  const handleToggleLayer = () => {
    setPanels((prevPanels) => !prevPanels);
  };

  const switchLayer = (id) => {
    setLayer(id);
    setPanels((prevPanels) => !prevPanels);
  };

  const isCollapsed = !panels;

  return (
    <div
      className={`absolute top-40 right-0 transition-transform duration-700 ${
        isCollapsed ? "transform translate-x-full" : ""
      }`}
    >
      <div className="border w-40 rounded-l-xl bg-white shadow-lg relative p-4">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-lg font-semibold text-blue-500">Layers</h1>
          <div className="text-blue-600 ">
            <label
              htmlFor="file-upload"
              className="flex items-center cursor-pointer text-lg"
            >
              <FaPlusCircle />
              <input
                type="file"
                id="file-upload"
                hidden
                onChange={handleFileChange}
              />
            </label>
          </div>
        </div>
        <div className="mb-2 flex flex-col items-start gap-y-4">
          <div
            className="flex gap-x-3 items-center cursor-pointer"
            onClick={() => switchLayer(1)}
          >
            <img
              src="/images/graph-paper.jpg"
              alt="Graph"
              className="w-[60%] rounded-lg"
            />
            <p className="font-medium">Graph</p>
          </div>
          <div
            className="flex gap-x-3 items-center cursor-pointer"
            onClick={() => switchLayer(2)}
          >
            <img
              src="/images/map.jpg"
              alt="Map"
              className="w-[60%] rounded-lg"
            />
            <p className="font-medium">Map</p>
          </div>
          <div
            className="flex gap-x-3 items-center cursor-pointer"
            onClick={() => switchLayer(3)}
          >
            <img
              src="/images/pipes.jpg"
              alt="Map"
              className="w-[60%] rounded-lg"
            />
            <p className="font-medium">Pipes</p>
          </div>
        </div>
      </div>
      <button
        onClick={handleToggleLayer}
        className={`absolute top-1/2 transform -translate-y-1/2 bg-white text-neutral-500 text-xl h-10 w-6 rounded-l-md transition-transform duration-700 pl-1 ${
          isCollapsed ? "right-40" : "-left-5"
        }`}
      >
        {isCollapsed ? (
          <FaEyeSlash
            className={`transition-transform duration-500 text-lg `}
          />
        ) : (
          <FaEye className={`transition-transform duration-500 text-lg `} />
        )}
      </button>
    </div>
  );
};

export default SheetBox;
