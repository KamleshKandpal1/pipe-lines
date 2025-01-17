"use client";
import React, { useState } from "react";
import {
  FaMinusCircle,
  FaPlusCircle,
  FaTrash,
  FaPen,
  FaEdit,
  FaCog,
  FaPlusCircle as FaPlusIcon,
  FaMinusCircle as FaMinusIcon,
} from "react-icons/fa";
import { CreateButton } from "../_components/CreateButton";
import { ScrollArea } from "@/components/ui/scroll-area";
const iconOptions = [
  { id: 1, value: "plus-circle", name: "Plus Circle", component: FaPlusCircle },
  { id: 2, value: "trash", name: "Trash", component: FaTrash },
  { id: 3, value: "edit", name: "Edit", component: FaEdit },
  // Add more icon options as needed
];
const colorOptions = [
  { id: 1, name: "Red", value: "#ff0000" },
  { id: 2, name: "Green", value: "#00ff00" },
  { id: 3, name: "Blue", value: "#0000ff" },
  { id: 4, name: "Yellow", value: "#ffff00" },
  { id: 5, name: "Black", value: "#000000" },
  { id: 6, name: "White", value: "#ffffff" },
];
const SymbolBox = () => {
  const [dialogStatus, setDialogStatus] = useState(false);
  const [color, setColor] = useState("");
  const [pipesName, setPipesName] = useState("");
  const [icon, setIcon] = useState("");
  const [pipeSize, setPipeSize] = useState("");
  const [pipesData, setPipesData] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);

  const openDialogbox = () => {
    setDialogStatus((prev) => !prev);
  };

  const handleEdit = (index) => {
    const item = pipesData[index];
    setColor(item.color);
    setPipesName(item.pipesName);
    setIcon(item.icon);
    setPipeSize(item.pipeSize);
    setEditingIndex(index);
  };

  const handleDelete = (index) => {
    setPipesData((prevData) => prevData.filter((_, i) => i !== index));
  };

  return (
    <div className="">
      <div
        className="text-2xl cursor-pointer text-white relative"
        onClick={openDialogbox}
      >
        {dialogStatus ? <FaMinusCircle /> : <FaPlusCircle />}
      </div>
      {dialogStatus && (
        <div className="absolute right-1 top-10 border-2 rounded-lg p-1 h-[140px] w-[200px] border-white">
          <div className="text-end">
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
            />
          </div>
          <ScrollArea className="h-[111px] w-full rounded-md">
            <div className="flex flex-col gap-y-2">
              {pipesData.map((item, index) => {
                const IconComponent = iconOptions.find(
                  (option) => option.value === item.icon
                )?.component;

                return (
                  <div
                    key={index}
                    className="flex items-center gap-x-3 text-white font-medium p-0.5"
                  >
                    {IconComponent && (
                      <IconComponent className={`bg-[${item.color}] w-4 h-4`} />
                    )}
                    <p className="underline underline-offset-2">
                      {item.pipesName},
                    </p>
                    <p>{item.pipeSize} mtr</p>
                    <div className="flex flex-col gap-2 text-xs items-center">
                      <FaTrash
                        className="cursor-pointer hover:text-red-600"
                        onClick={() => handleDelete(index)}
                      />
                      <FaEdit
                        className="cursor-pointer hover:text-green-600"
                        onClick={() => handleEdit(index)}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </ScrollArea>
        </div>
      )}
    </div>
  );
};

export default SymbolBox;
