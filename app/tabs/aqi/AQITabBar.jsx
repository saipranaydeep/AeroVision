import Feather from "@expo/vector-icons/Feather";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useLanguage } from "../../contexts/LanguageContext";
import { getTranslation } from "../../utils/translations";
import AQI from "./AQI";
import AQIForecast from "./AQIForecast";
import Weather from "./Weather";

const AQITabBar = ({ AQIData, weatherData, forecastData }) => {
  // console.log("AQITabBar AQIData:", AQIData); // Debugging line to check AQIData prop
  const [tab, setTab] = useState("AQI");
  const { selectedLanguage } = useLanguage();
  const t = (key) => getTranslation(key, selectedLanguage);

  const tabs = [
    { key: "AQI", label: t("aqi"), icon: "activity" },
    { key: "Weather", label: t("weather"), icon: "sun" },
    { key: "6-Day AQI", label: t("forecast"), icon: "bar-chart-2" },
  ];

  const renderContent = () => {
    switch (tab) {
      case "AQI":
        return <AQI data={AQIData} />;
      case "Weather":
        return <Weather data={weatherData} />;
      case "6-Day AQI":
        return <AQIForecast data={forecastData} />;
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      {/* Enhanced Tab Navigator with Gradient */}
      <LinearGradient
        colors={["#667eea", "#764ba2"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.gradientContainer}
      >
        <View style={styles.tabsContainer}>
          {tabs.map((tabItem) => (
            <TouchableOpacity
              key={tabItem.key}
              style={[
                styles.tab,
                {
                  backgroundColor:
                    tab === tabItem.key ? "white" : "transparent",
                  shadowColor: tab === tabItem.key ? "#000" : "transparent",
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: tab === tabItem.key ? 0.1 : 0,
                  shadowRadius: 4,
                  elevation: tab === tabItem.key ? 2 : 0,
                },
              ]}
              onPress={() => setTab(tabItem.key)}
            >
              <Feather
                name={tabItem.icon}
                size={16}
                color={
                  tab === tabItem.key ? "#667eea" : "rgba(255,255,255,0.8)"
                }
                style={{ marginRight: 6 }}
              />
              <Text
                style={[
                  styles.tabText,
                  {
                    color:
                      tab === tabItem.key ? "#667eea" : "rgba(255,255,255,0.9)",
                  },
                ]}
                numberOfLines={1}
              >
                {tabItem.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </LinearGradient>

      {/* Content Area */}
      <View style={styles.contentContainer}>{renderContent()}</View>
    </View>
  );
};

export default AQITabBar;

const styles = StyleSheet.create({
  container: {
    borderRadius: 24,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 8,
    overflow: "hidden",
  },
  gradientContainer: {
    paddingHorizontal: 6,
    paddingVertical: 8,
  },
  tabsContainer: {
    flexDirection: "row",
    backgroundColor: "rgba(255,255,255,0.15)",
    borderRadius: 20,
    padding: 4,
  },
  tab: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 16,
  },
  tabText: {
    fontSize: 13,
    fontWeight: "600",
  },
  contentContainer: {
    backgroundColor: "#fafbff",
  },
});
