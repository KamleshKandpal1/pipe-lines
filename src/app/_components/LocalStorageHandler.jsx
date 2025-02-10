import React, { useState, useEffect } from "react";

const LocalStorageHandler = ({ storageKey, defaultValue, children }) => {
  const [value, setValue] = useState(() => {
    if (typeof window !== "undefined") {
      const savedValue = localStorage.getItem(storageKey);
      return savedValue ? JSON.parse(savedValue) : defaultValue;
    }
    return defaultValue;
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(storageKey, JSON.stringify(value));
    }
  }, [value, storageKey]);

  return children(value, setValue);
};

export default LocalStorageHandler;