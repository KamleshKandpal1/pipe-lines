"use client";

import React, { useState, useEffect } from "react";
import { FaMinusCircle, FaPlusCircle, FaTrash, FaEdit } from "react-icons/fa";
import { CreateButton } from "./CreateButton";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { iconOptions, colorOptions } from "@/utils/options";

const SymbolBox = () => {
  const [dialogStatus, setDialogStatus] = useState(false);
  const [color, setColor] = useState("");
  const [pipesName, setPipesName] = useState("");
  const [icon, setIcon] = useState("");
  const [pipeSize, setPipeSize] = useState("");
  const [pipesData, setPipesData] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);

  useEffect(() => {
    // Retrieve data from localStorage on component mount
    const storedData = localStorage.getItem("pipesData");
    if (storedData) {
      setPipesData(JSON.parse(storedData));
    }
  }, []);

  useEffect(() => {
    // Save data to localStorage whenever pipesData changes
    localStorage.setItem("pipesData", JSON.stringify(pipesData));
  }, [pipesData]);

  const openDialogbox = () => {
    setDialogStatus((prev) => !prev);
  };

  // const handleEdit = (index) => {
  //   const item = pipesData[index];
  //   setColor(item.color);
  //   setPipesName(item.pipesName);
  //   setIcon(item.icon);
  //   setPipeSize(item.pipeSize);
  //   setEditingIndex(index);
  // };

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
          <div className="absolute right-0 top-12 bg-transparent border rounded-lg shadow-2xl p-2 w-60">
            <div className="mb-2 flex justify-end">
              <CreateButton
                color={color}
                name={pipesName}
                size={pipeSize}
                icon={icon}
                setColor={setColor}
                setName={setPipesName}
                setSize={setPipeSize}
                setIcon={setIcon}
                setPipesData={setPipesData}
                editingIndex={editingIndex}
                setEditingIndex={setEditingIndex}
                closeDialog={openDialogbox}
                colorOptions={colorOptions}
                iconOptions={iconOptions}
              />
            </div>
            <ScrollArea className="h-64 w-full rounded-md border border-gray-200">
              <div className="p-2 space-y-2">
                {pipesData.map((item, index) => {
                  const IconComponent = iconOptions.find(
                    (option) => option.value === item.icon
                  )?.component;

                  return (
                    <div
                      key={index}
                      className="flex items-center justify-between bg-gray-50 rounded-md p-2 transition-all duration-200 hover:bg-gray-100"
                    >
                      <div className="flex items-center space-x-3">
                        {IconComponent && (
                          <IconComponent
                            className="w-5 h-5"
                            style={{ color: item.color }}
                          />
                        )}
                        <div>
                          <p className="font-medium text-gray-800">
                            {item.pipesName}
                          </p>
                          <p className="text-sm text-gray-500">
                            {item.pipeSize} mtr
                          </p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Tooltip>
                          {/* <TooltipTrigger asChild>
                            <button
                              className="text-blue-500 hover:text-blue-600"
                              onClick={() => handleEdit(index)}
                            >
                              <FaEdit className="w-4 h-4" />
                            </button>
                          </TooltipTrigger> */}
                          <TooltipContent>
                            <p>Edit</p>
                          </TooltipContent>
                        </Tooltip>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <button
                              className="text-red-500 hover:text-red-600"
                              onClick={() => handleDelete(index)}
                            >
                              <FaTrash className="w-4 h-4" />
                            </button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Delete</p>
                          </TooltipContent>
                        </Tooltip>
                      </div>
                    </div>
                  );
                })}
              </div>
            </ScrollArea>
          </div>
        )}
      </div>
    </TooltipProvider>
  );
};

export default SymbolBox;
