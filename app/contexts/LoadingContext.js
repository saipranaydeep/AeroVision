import React, { createContext, useContext, useState } from "react";

const LoadingContext = createContext();

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error("useLoading must be used within a LoadingProvider");
  }
  return context;
};

export const LoadingProvider = ({ children }) => {
  const [isCityLoading, setIsCityLoading] = useState(false);

  const setCityLoading = (loading) => {
    setIsCityLoading(loading);
  };

  return (
    <LoadingContext.Provider
      value={{
        isCityLoading,
        setCityLoading,
      }}
    >
      {children}
    </LoadingContext.Provider>
  );
};

export default LoadingContext;
