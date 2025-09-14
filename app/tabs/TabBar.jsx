import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useLanguage } from "../contexts/LanguageContext";
import { getTranslation } from "../utils/translations";
import Pollutant from "./Pollutant";
import AQITabBar from "./aqi/AQITabBar";

const TabBar = ({ airQualityData, weatherData }) => {
  const [tab, setTab] = useState("AQI");
  const { selectedLanguage } = useLanguage();

  const t = (key) => getTranslation(key, selectedLanguage);

  const POLLUTANTS = [
    {
      key: "AQI",
      label: t("aqi"),
    },
    {
      key: "pm2_5",
      label: t("pm2_5"),
    },
    {
      key: "pm10",
      label: t("pm10"),
    },
    {
      key: "o3",
      label: t("o3"),
    },
    {
      key: "no2",
      label: t("no2"),
    },
    {
      key: "so2",
      label: t("so2"),
    },
    {
      key: "co",
      label: t("co"),
    },
  ];

  return (
    <View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {POLLUTANTS.map((pollutant) => (
          <TouchableOpacity
            key={pollutant.key}
            style={{
              padding: 10,
              margin: 5,
            }}
            onPress={() => setTab(pollutant.key)}
          >
            <Text>{pollutant.label}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <Text>Selected Tab: {tab}</Text>
      {tab === "AQI" ? (
        <AQITabBar
          AQIData={{
            ...airQualityData?.overall_daily_aqi?.[0],
            pollutants: airQualityData?.today_pollutants,
          }}
          weatherData={weatherData?.forecast}
          forecastData={airQualityData?.overall_daily_aqi}
        />
      ) : (
        <Pollutant pollutant={tab} data={airQualityData?.predictions?.[tab]} />
      )}
    </View>
  );
};

export default TabBar;

const styles = StyleSheet.create({});
