import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { FaPen } from "react-icons/fa";
import { colorOptions, iconOptions } from "@/utils/options";

export function CreateButton({
  setColor,
  setName,
  setSize,
  setIcon,
  setPipesData,
}) {
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

    // Reset local state
    setNameState("");
    setSizeState("");
    setColorState("");
    setIconState("");
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <FaPen className="text-lg bg-transparent text-white hover:text-blue-500 cursor-pointer" />
        {/* <Button className="w-5 h-5 bg-transparent hover:bg-blue-400">
        </Button> */}
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Create New Pipe</h4>
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
              <Label htmlFor="size">Size (mtr)</Label>
              <Input
                id="size"
                type="number"
                min="0"
                max="10"
                step="0.01"
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
                className="col-span-2 h-8 rounded-md border border-input bg-background px-3 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              >
                <option value="">Select a color</option>
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
                className="col-span-2 h-8 rounded-md border border-input bg-background px-3 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              >
                <option value="">Select an icon</option>
                {iconOptions.map((iconOption) => (
                  <option key={iconOption.id} value={iconOption.value}>
                    {iconOption.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <Button onClick={handleSave} className="w-full">
            Save
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
