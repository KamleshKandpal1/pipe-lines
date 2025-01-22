import { FaPlusCircle, FaTrash, FaEdit } from "react-icons/fa";

export const iconOptions = [
  { id: 1, value: "plus-circle", name: "Plus Circle", component: FaPlusCircle },
  { id: 2, value: "trash", name: "Trash", component: FaTrash },
  { id: 3, value: "edit", name: "Edit", component: FaEdit },
  // Add more icon options as needed
];

export const colorOptions = [
  { id: 1, name: "Red", value: "#f87171" },
  { id: 2, name: "Green", value: "#4ade80" },
  { id: 3, name: "Blue", value: "#60a5fa" },
  { id: 4, name: "Yellow", value: "#fbbf24" },
  { id: 5, name: "Purple", value: "#a78bfa" },
  { id: 6, name: "Pink", value: "#f472b6" },
];

export const textureOptions = [
  {
    id: 1,
    name: "Smooth Steel Pipe",
    material: "Steel",
    value: "smooth_steel_pipe",
  },
  {
    id: 2,
    name: "Corrugated Metal Pipe",
    material: "Metal",
    value: "corrugated_metal_pipe",
  },
  {
    id: 3,
    name: "PVC Pipe",
    material: "PVC",
    value: "pvc_pipe",
  },
  {
    id: 4,
    name: "Rusty Iron Pipe",
    material: "Iron",
    value: "rusty_iron_pipe",
  },
];
