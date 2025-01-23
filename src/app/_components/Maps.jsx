import React, { useState } from "react";

const Maps = () => {
  // const [zoom, setZoom] = useState(1);

  // const handleWheel = (e) => {
  //   e.preventDefault();
  //   const newZoom = e.deltaY > 0 ? zoom * 0.9 : zoom * 1.1;
  //   setZoom(Math.max(0.5, Math.min(2, newZoom))); // Limit zoom between 0.5 and 2
  // };

  return (
    <div
      className="h-screen w-full overflow-hidden"
      // onWheel={handleWheel}
      // style={{ transform: `scale(${zoom})`, transformOrigin: "center" }}
    >
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m24!1m12!1m3!1d31672.422981306725!2d76.60007622135552!3d28.89633931875722!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m9!3e3!4m3!3m2!1d28.8933157!2d76.6055238!4m3!3m2!1d28.893656!2d76.6116524!5e0!3m2!1sen!2sin!4v1737366128096!5m2!1sen!2sin"
        className="w-full h-full"
        loading="lazy"
      ></iframe>
    </div>
  );
};

export default Maps;
