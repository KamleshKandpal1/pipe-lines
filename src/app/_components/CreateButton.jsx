import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"; // Ensure this import is correct
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { FaPen } from "react-icons/fa";
import {
  FaCog,
  FaPlusCircle,
  FaMinusCircle,
  FaTrash,
  FaEdit,
} from "react-icons/fa";

// JSON Data for Colors
const colorOptions = [
  { id: 1, name: "Red", value: "#ff0000" },
  { id: 2, name: "Green", value: "#00ff00" },
  { id: 3, name: "Blue", value: "#0000ff" },
  { id: 4, name: "Yellow", value: "#ffff00" },
  { id: 5, name: "Black", value: "#000000" },
  { id: 6, name: "White", value: "#ffffff" },
];

// JSON Data for Icons
const iconOptions = [
  { id: 1, value: "plus-circle", name: "Plus Circle", component: FaPlusCircle },
  { id: 2, value: "trash", name: "Trash", component: FaTrash },
  { id: 3, value: "edit", name: "Edit", component: FaEdit },
  // Add more icon options as needed
];

export function CreateButton({
  setColor,
  setName,
  setSize,
  setIcon,
  setPipesData,
}) {
  console.log("Icon Options:", iconOptions);
  iconOptions.forEach((option) => {
    console.log(
      `ID: ${option.id}, Name: ${option.name}, Value: ${option.value}`
    );
  });

  const [name, setNameState] = useState("");
  const [size, setSizeState] = useState("");
  const [color, setColorState] = useState("");
  const [icon, setIconState] = useState("");

  const handleSave = () => {
    setColor(color);
    setName(name);
    setSize(size);
    setIcon(icon);

    setPipesData((prevData) => [
      ...prevData,
      { pipesName: name, pipeSize: size, color: color, icon: icon },
    ]);
    <PopoverTrigger asChild>
      <Button className=" w-5 h-5 bg-transparent hover:bg-blue-400">
        <FaPen className="text-sm" />
      </Button>
    </PopoverTrigger>;
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className=" w-5 h-5 bg-transparent hover:bg-blue-400">
          <FaPen className="text-sm" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Inputs</h4>
          </div>
          <div className="grid gap-2">
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setNameState(e.target.value)}
                className="col-span-2 h-8"
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="size">Size</Label>
              <Input
                id="size"
                type="number"
                min="0"
                max="10"
                step="0.010"
                value={size}
                onChange={(e) => setSizeState(e.target.value)}
                className="col-span-2 h-8"
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="color">Color</Label>
              <select
                id="color"
                value={color}
                onChange={(e) => setColorState(e.target.value)}
                className="col-span-2 h-8"
              >
                <option>Select a color</option>
                {colorOptions.map((colorOption) => (
                  <option key={colorOption.id} value={colorOption.value}>
                    {colorOption.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="icon">Icon</Label>
              <select
                id="icon"
                value={icon}
                onChange={(e) => setIconState(e.target.value)}
                className="col-span-2 h-8"
              >
                <option>Select an icon</option>
                {iconOptions.map((iconOption) => (
                  <option key={iconOption.id} value={iconOption.value}>
                    {iconOption.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <Button onClick={handleSave}>Save</Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
