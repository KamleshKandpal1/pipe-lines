"use client";
import React, { useState, useEffect } from "react";
import { FaEye, FaEyeSlash, FaPlusCircle, FaTrash } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { addImage, removeImage } from "../../store/imageSlice.js";

const SheetBox = ({ setLayer }) => {
  const dispatch = useDispatch();
  const panelImages = useSelector((state) => state.images.panelImages); // Access Redux state

  const [panels, setPanels] = useState(false);

  // Save images to localStorage
  const saveImagesToLocalStorage = () => {
    const imagesToSave = panelImages.map((file) => ({
      name: file.name,
      size: file.size,
      type: file.type,
      lastModified: file.lastModified,
    }));
    localStorage.setItem("panelImages", JSON.stringify(imagesToSave));
  };

  // Load images from localStorage on component mount
  useEffect(() => {
    const savedImages = localStorage.getItem("panelImages");
    if (savedImages) {
      const parsedImages = JSON.parse(savedImages);
      parsedImages.forEach((file) => {
        dispatch(addImage(file)); // Add images from localStorage to Redux store
      });
    }
  }, [dispatch]);

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    files.forEach((file) => {
      // Dispatch the actual file object
      dispatch(addImage(file));
    });
    saveImagesToLocalStorage(); // Save updated images to localStorage
  };

  const handleRemoveImage = (index) => {
    dispatch(removeImage(index)); // Remove image from Redux store
    saveImagesToLocalStorage(); // Save updated images to localStorage
    switchLayer(index - 1);
  };

  const switchLayer = (id) => {
    setLayer(id);
    setPanels((prevPanels) => !prevPanels); // Switch the panels view
  };

  const handleToggleLayer = () => {
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
          <div className="text-blue-600">
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
                multiple // Allow multiple file uploads
              />
            </label>
          </div>
        </div>
        <div className="mb-2 flex flex-col items-start gap-y-4">
          {/* Predefined Layers */}
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

          {/* Dynamic Layers (Uploaded Images) */}
          {panelImages.map((file, index) => (
            <div
              key={index}
              className="flex gap-x-3 items-center justify-between cursor-pointer"
              onClick={() => switchLayer(index + 4)} // Dynamically assign layer IDs
            >
              <img
                src={URL.createObjectURL(file)} // Create URL from file object
                alt={file.name}
                className="w-[60%] rounded-lg"
              />
              <FaTrash
                className="text-red-400 hover:text-red-500"
                onClick={() => handleRemoveImage(index)}
              />
            </div>
          ))}
        </div>
      </div>
      <button
        onClick={handleToggleLayer}
        className={`absolute top-1/2 transform -translate-y-1/2 bg-white text-neutral-500 text-xl h-10 w-6 rounded-l-md transition-transform duration-700 pl-1 ${
          isCollapsed ? "right-40" : "-left-5"
        }`}
      >
        {isCollapsed ? (
          <FaEyeSlash className="transition-transform duration-500 text-lg" />
        ) : (
          <FaEye className="transition-transform duration-500 text-lg" />
        )}
      </button>
    </div>
  );
};

export default SheetBox;
