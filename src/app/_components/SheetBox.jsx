"use client";
import React, { useState } from "react";
import { FaChevronLeft } from "react-icons/fa";

const SheetBox = ({ setLayer }) => {
  const [panels, setPanels] = useState(false);

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
      className={`absolute top-1/2 right-0 transition-transform duration-700 ${
        isCollapsed ? "transform translate-x-full" : ""
      }`}
    >
      <div className="border w-40 rounded-l-xl bg-white shadow-lg relative p-4">
        <div className="flex justify-center items-center mb-4">
          <h1 className="text-lg font-semibold">Layers</h1>
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
        className={`absolute top-1/2 transform -translate-y-1/2 bg-white text-neutral-500 text-xl h-10 w-6 rounded-l-md transition-transform duration-700 ${
          isCollapsed ? "right-40" : "-left-5"
        }`}
      >
        <FaChevronLeft
          className={`transition-transform duration-500 ${
            isCollapsed ? "rotate-0" : "rotate-180"
          }`}
        />
      </button>
    </div>
  );
};

export default SheetBox;
