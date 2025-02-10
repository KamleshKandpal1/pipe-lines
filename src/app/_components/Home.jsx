import React, { useState, useEffect } from "react";

const Home = () => {
  // Initialize the state with a default value
  const [layer, setLayer] = useState(1);

  // Use useEffect to access localStorage on the client side
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedLayer = localStorage.getItem("layer");
      if (savedLayer) {
        setLayer(parseInt(savedLayer, 10));
      }
    }
  }, []);

  // Use useEffect to update localStorage whenever the layer state changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("layer", layer);
    }
  }, [layer]);

  return (
    <div>
      <h1>Current Layer: {layer}</h1>
      <button onClick={() => setLayer((prev) => prev + 1)}>Increase Layer</button>
    </div>
  );
};

export default Home;