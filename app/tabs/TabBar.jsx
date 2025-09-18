import React, { useMemo, useState } from "react";
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
  const [activeTab, setActiveTab] = useState("AQI");
  const { selectedLanguage } = useLanguage();

  const t = (key) => getTranslation(key, selectedLanguage);

  const POLLUTANTS = useMemo(
    () => [
      {
        key: "AQI",
        label: t("aqi") || "AQI",
        icon: "🌤️",
      },
      {
        key: "pm2_5",
        label: t("pm2_5") || "PM2.5",
        icon: "💨",
      },
      {
        key: "pm10",
        label: t("pm10") || "PM10",
        icon: "🌫️",
      },
      {
        key: "no2",
        label: t("no2") || "NO2",
        icon: "🏭",
      },
      {
        key: "so2",
        label: t("so2") || "SO2",
        icon: "🔥",
      },
      {
        key: "co",
        label: t("co") || "CO",
        icon: "🚗",
      },
      {
        key: "o3",
        label: t("o3") || "O3",
        icon: "☀️",
      },
    ],
    [t]
  );

  const getAQICategory = (aqiValue) => {
    if (aqiValue <= 50) return { level: "Good", color: "#00E400" };
    if (aqiValue <= 100) return { level: "Satisfactory", color: "#FFFF00" };
    if (aqiValue <= 150) return { level: "Moderate", color: "#FF7E00" };
    if (aqiValue <= 200) return { level: "Poor", color: "#FF0000" };
    if (aqiValue <= 300) return { level: "Severe", color: "#8F3F97" };
    return { level: "Hazardous", color: "#7E0023" };
  };

  const currentAQI = airQualityData?.overall_daily_aqi?.[0]?.aqi || 0;
  const aqiCategory = getAQICategory(currentAQI);

  return (
    <View style={styles.container}>
      {/* Tab Navigation */}
      <View style={styles.tabContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.tabScrollContent}
        >
          {POLLUTANTS.map((pollutant) => (
            <TouchableOpacity
              key={pollutant.key}
              style={[
                styles.tabButton,
                activeTab === pollutant.key && styles.activeTabButton,
              ]}
              onPress={() => setActiveTab(pollutant.key)}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.tabIcon,
                  activeTab === pollutant.key && styles.activeTabIcon,
                ]}
              >
                {pollutant.icon}
              </Text>
              <Text
                style={[
                  styles.tabLabel,
                  activeTab === pollutant.key && styles.activeTabLabel,
                ]}
              >
                {pollutant.label}
              </Text>
              {activeTab === pollutant.key && (
                <View style={styles.activeTabIndicator} />
              )}
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Tab Content */}
      <View style={styles.contentContainer}>
        {activeTab === "AQI" ? (
          <AQITabBar
            AQIData={{
              ...airQualityData?.overall_daily_aqi?.[0],
              pollutants: airQualityData?.today_pollutants,
            }}
            weatherData={weatherData?.forecast}
            forecastData={airQualityData?.overall_daily_aqi}
          />
        ) : (
          <Pollutant
            pollutant={activeTab}
            data={airQualityData?.predictions?.[activeTab]}
          />
        )}
      </View>

      {/* AQI Summary (only shown for AQI tab) */}
      {/* {activeTab === "AQI" && currentAQI > 0 && (
        <LinearGradient
          colors={["#667eea", "#764ba2"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.aqiSummary}
        >
          <Text style={styles.aqiValue}>{currentAQI}</Text>
          <Text style={styles.aqiLevel} numberOfLines={1}>
            {aqiCategory.level}
          </Text>
          <View
            style={[
              styles.aqiColorIndicator,
              { backgroundColor: aqiCategory.color },
            ]}
          />
        </LinearGradient>
      )} */}
    </View>
  );
};

export default TabBar;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabContainer: {
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  tabScrollContent: {
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  tabButton: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginHorizontal: 5,
    borderRadius: 20,
    backgroundColor: "#f8f9ff",
    minWidth: 70,
  },
  activeTabButton: {
    backgroundColor: "#667eea",
  },
  tabIcon: {
    fontSize: 18,
    marginBottom: 4,
  },
  activeTabIcon: {
    color: "#fff",
  },
  tabLabel: {
    fontSize: 12,
    fontWeight: "500",
    color: "#667eea",
    textAlign: "center",
  },
  activeTabLabel: {
    color: "#fff",
    fontWeight: "600",
  },
  activeTabIndicator: {
    position: "absolute",
    bottom: -6,
    height: 3,
    width: "60%",
    backgroundColor: "#667eea",
    borderRadius: 2,
  },
  contentContainer: {
    flex: 1,
    paddingTop: 12,
    paddingHorizontal: 8,
  },
  aqiSummary: {
    position: "absolute",
    bottom: 20,
    right: 20,
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: 20,
    minWidth: 100,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  aqiValue: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginRight: 8,
  },
  aqiLevel: {
    fontSize: 12,
    fontWeight: "600",
    color: "#fff",
    flex: 1,
  },
  aqiColorIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginLeft: 8,
  },
});
