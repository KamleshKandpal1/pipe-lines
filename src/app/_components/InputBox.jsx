"use client";
import React, { useState } from "react";

const InputBox = () => {
  const [coordinationData, setCoordinationData] = useState({
    latitude: "",
    longitude: "",
    altitude: "",
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
      <div className="">
        <input
          type="number"
          name="latitude"
          id="latitude"
          placeholder="Latitude"
          value={coordinationData.latitude}
          onChange={handleChange}
          className="py-1 pl-3 rounded-lg outline-none bg-blue-300 text-white placeholder:text-white"
        />
      </div>
      <div className="">
        <input
          type="number"
          name="longitude"
          id="longitude"
          placeholder="Longitude"
          value={coordinationData.longitude}
          onChange={handleChange}
          className="py-1 pl-3 rounded-lg outline-none bg-blue-300 text-white placeholder:text-white"
        />
      </div>
      <div className="">
        <input
          type="number"
          name="altitude"
          id="altitude"
          placeholder="Altitude"
          value={coordinationData.altitude}
          onChange={handleChange}
          className="py-1 pl-3 rounded-lg outline-none bg-blue-300 text-white placeholder:text-white"
        />
      </div>
    </div>
  );
};

export default InputBox;
