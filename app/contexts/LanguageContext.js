import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useState } from "react";

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  const [selectedLanguage, setSelectedLanguage] = useState("en");

  const changeLanguage = async (language) => {
    setSelectedLanguage(language);
    try {
      await AsyncStorage.setItem("selectedLanguage", language);
    } catch (error) {
      console.error("Error saving language preference:", error);
    }
  };

  const loadLanguage = async () => {
    try {
      const savedLanguage = await AsyncStorage.getItem("selectedLanguage");
      if (savedLanguage) {
        setSelectedLanguage(savedLanguage);
      }
    } catch (error) {
      console.error("Error loading language preference:", error);
    }
  };

  React.useEffect(() => {
    loadLanguage();
  }, []);

  return (
    <LanguageContext.Provider
      value={{
        selectedLanguage,
        changeLanguage,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};
