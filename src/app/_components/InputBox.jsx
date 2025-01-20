"use client";
import React, { useState } from "react";

const InputBox = () => {
  const [coordinationData, setCoordinationData] = useState({
    latitude: "",
    longitude: "",
  });

  const handleChange = (e) => {
    setTimeout(() => {}, 1000); // 1000 ms delay
    setCoordinationData({
      ...coordinationData,
      [e.target.name]: e.target.value,
    });
  };

  // console.log(coordinationData);

  return (
    <div className="flex items-center gap-4 text-white">
      <div className="w-1/2">
        <input
          type="number"
          name="latitude"
          id="latitude"
          placeholder="Latitude"
          value={coordinationData.latitude}
          onChange={handleChange}
          className="p-1 rounded-lg outline-none bg-blue-500 text-white placeholder:text-white"
        />
      </div>
      <div className="w-1/2">
        <input
          type="number"
          name="longitude"
          id="longitude"
          placeholder="Longitude"
          value={coordinationData.longitude}
          onChange={handleChange}
          className="p-1 rounded-lg outline-none bg-blue-500 text-white placeholder:text-white"
        />
      </div>
    </div>
  );
};

export default InputBox;
