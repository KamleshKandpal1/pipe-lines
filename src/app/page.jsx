import Diagram from "./_components/Diagram.jsx";
import InputBox from "./_components/InputBox.jsx";
import SheetBox from "./_components/SheetBox.jsx";
import SymbolBox from "./_components/SymbolBox.jsx";
import ToolBox from "./_components/ToolBox.jsx";

export default function Home() {
  return (
    <div className="font-[family-name:var(--font-geist-sans)] flex justify-center overflow-hidden">
      <div className="relative">
        <Diagram />
        <div className="border w-full h-auto bg-contain bg-center rounded-md absolute top-0 left-0">
          <div className="flex w-[90%] ml-auto items-center justify-between p-2 sm:pr-2 pr-5 border">
            <div>
              <InputBox />
            </div>
            <div className="relative">
              <SymbolBox />
            </div>
          </div>
          <ToolBox />
          <SheetBox />
        </div>
      </div>
    </div>
  );
}
