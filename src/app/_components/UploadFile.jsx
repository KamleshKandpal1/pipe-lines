"use client";
import { useSelector } from "react-redux";

const BackgroundComponent = () => {
  const panelImages = useSelector((state) => state.images.panelImages);

  return (
    <div
      style={{
        backgroundImage: `url(${
          panelImages[0] ? URL.createObjectURL(panelImages[0]) : ""
        })`,
        // backgroundSize: "c",
        backgroundPosition: "center",
        height: "100vh",
        width: "100%",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Your content */}
    </div>
  );
};

export default BackgroundComponent;
