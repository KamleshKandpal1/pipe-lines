"use client";
import { useEffect, useState } from "react";
import Diagram from "./_components/Diagram.jsx";
import InputBox from "./_components/InputBox.jsx";
import Maps from "./_components/Maps.jsx";
import SheetBox from "./_components/SheetBox.jsx";
import SymbolBox from "./_components/SymbolBox.jsx";
import ToolBox from "./_components/ToolBox.jsx";
import Pipes from "./_components/Pipes.jsx";

export default function Home() {
  // Retrieve the initial value from localStorage or default to 1
  const [layer, setLayer] = useState(() => {
    const savedLayer = localStorage.getItem("layer");
    return savedLayer ? parseInt(savedLayer, 10) : 1;
  });

  // Update localStorage whenever the layer changes
  useEffect(() => {
    localStorage.setItem("layer", layer);
  }, [layer]);

  return (
    <div className="flex justify-center overflow-hidden">
      <div className="relative w-full h-full">
        {/* Conditionally render Diagram or Maps based on the layer state */}
        {layer === 1 ? <Diagram /> : layer === 2 ? <Maps /> : <Pipes />}

        <div className="w-full h-auto bg-contain bg-center rounded-md absolute top-0 left-0">
          {/* Wrapper for input box and symbol box */}
          <div className="flex w-[90%] ml-auto items-center justify-between p-2 sm:pr-2 pr-5">
            <div>
              <InputBox />
            </div>
            <div className="relative">
              <SymbolBox />
            </div>
          </div>

          {/* ToolBox */}
          <ToolBox />

          {/* SheetBox passes setLayer to allow switching layers */}
          <SheetBox setLayer={setLayer} />
        </div>
      </div>
    </div>
  );
}
