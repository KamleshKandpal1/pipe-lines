"use client";
import { useEffect, useState } from "react";
import Diagram from "./_components/Diagram.jsx";
import InputBox from "./_components/InputBox.jsx";
import Maps from "./_components/Maps.jsx";
import SheetBox from "./_components/SheetBox.jsx";
import SymbolBox from "./_components/SymbolBox.jsx";
import ToolBox from "./_components/ToolBox.jsx";
import UploadFile from "./_components/UploadFile.jsx";
import Axis from "./_components/Axis.jsx";

export default function Home() {
  const [layer, setLayer] = useState(() => {
    const savedLayer = localStorage.getItem("layer");
    return savedLayer ? parseInt(savedLayer, 10) : 1;
  });

  useEffect(() => {
    localStorage.setItem("layer", layer);
  }, [layer]);

  return (
    <div className="flex justify-center overflow-hidden">
      <div className="relative w-full h-full">
        {layer === 1 ? (
          <Diagram />
        ) : layer === 2 ? (
          <div>
            <Maps />
          </div>
        ) : (
          <UploadFile />
        )}

        <div className="w-full absolute top-0 left-0 z-10">
          {/* Ensure Axis doesn't block interactions */}
          <Axis className="pointer-events-none" />
          <div className="absolute top-0 left-0 w-full">
            <div className="flex w-[90%] ml-auto items-center justify-between p-2 sm:pr-2 pr-5 z-20">
              <InputBox />
              <SymbolBox />
            </div>
            <ToolBox />
            <SheetBox setLayer={setLayer} />
          </div>
        </div>
      </div>
    </div>
  );
}
