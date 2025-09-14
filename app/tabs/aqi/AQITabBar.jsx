import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useLanguage } from "../../contexts/LanguageContext";
import { getTranslation } from "../../utils/translations";
import AQI from "./AQI";
import AQIForecast from "./AQIForecast";
import Weather from "./Weather";

const AQITabBar = ({ AQIData, weatherData, forecastData }) => {
  const [tab, setTab] = useState("AQI");
  const { selectedLanguage } = useLanguage();

  const t = (key) => getTranslation(key, selectedLanguage);

  return (
    <>
      <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
        <TouchableOpacity onPress={() => setTab("AQI")}>
          <Text>{t("aqi")}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setTab("Weather")}>
          <Text>{t("weather")}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setTab("6-Day AQI")}>
          <Text>{t("forecast")}</Text>
        </TouchableOpacity>
      </View>
      {tab === "AQI" ? (
        <AQI data={AQIData} />
      ) : tab === "Weather" ? (
        <Weather data={weatherData} />
      ) : (
        <AQIForecast data={forecastData} />
      )}
    </>
  );
};

export default AQITabBar;

const styles = StyleSheet.create({});
