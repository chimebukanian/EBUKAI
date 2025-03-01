import React, { createContext, useState } from "react";

export const AIContext = createContext();

export const AIProvider = ({ children }) => {
  const [aiMessage, setAiMessage] = useState("");

  return (
    <AIContext.Provider value={{ aiMessage, setAiMessage }}>
      {children}
    </AIContext.Provider>
  );
};
