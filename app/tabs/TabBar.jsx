import React, { useMemo, useState } from "react";
import {
  Image,
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

// Import PNG images
const AQI_PNG = require("../../assets/images/aqi.png");
const CO_PNG = require("../../assets/images/co.png");
const NO2_PNG = require("../../assets/images/no2.png");
const O3_PNG = require("../../assets/images/o3.png");
const PM10_PNG = require("../../assets/images/pm10.png");
const PM2_5_PNG = require("../../assets/images/pm2_5.png");
const SO2_PNG = require("../../assets/images/so2.png");

const TabBar = ({ airQualityData, weatherData, city }) => {
  // console.log("TabBar airQualityData:", airQualityData); // Debugging line to check airQualityData prop
  const [activeTab, setActiveTab] = useState("AQI");
  const { selectedLanguage } = useLanguage();

  const t = (key) => getTranslation(key, selectedLanguage);

  const POLLUTANTS = useMemo(
    () => [
      {
        key: "AQI",
        label: t("aqi") || "AQI",
        icon: AQI_PNG,
      },
      {
        key: "pm2_5",
        label: t("pm2_5") || "PM2.5",
        icon: PM2_5_PNG,
      },
      {
        key: "pm10",
        label: t("pm10") || "PM10",
        icon: PM10_PNG,
      },
      {
        key: "no2",
        label: t("no2") || "NO2",
        icon: NO2_PNG,
      },
      {
        key: "so2",
        label: t("so2") || "SO2",
        icon: SO2_PNG,
      },
      {
        key: "co",
        label: t("co") || "CO",
        icon: CO_PNG,
      },
      {
        key: "o3",
        label: t("o3") || "O3",
        icon: O3_PNG,
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
              <Image
                source={pollutant.icon}
                style={[
                  styles.tabIcon,
                  activeTab === pollutant.key && styles.activeTabIcon,
                ]}
                resizeMode="contain"
                fadeDuration={0}
              />
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
              fetchedAt: airQualityData?.fetchedAt,
              city: city, // Pass city information
            }}
            weatherData={
              weatherData?.forecast
                ? weatherData.forecast.map((item, index) => ({
                    ...item,
                    fetchedAt: index === 0 ? weatherData?.fetchedAt : undefined,
                  }))
                : null
            }
            forecastData={
              airQualityData?.overall_daily_aqi
                ? airQualityData.overall_daily_aqi.map((item, index) => ({
                    ...item,
                    fetchedAt:
                      index === 0 ? airQualityData?.fetchedAt : undefined,
                  }))
                : null
            }
          />
        ) : (
          <Pollutant
            pollutant={activeTab}
            data={
              airQualityData?.predictions?.[activeTab]
                ? airQualityData.predictions[activeTab].map((item) => ({
                    ...item,
                    fetchedAt: airQualityData?.fetchedAt,
                  }))
                : null
            }
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
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginHorizontal: 5,
    borderRadius: 20,
    backgroundColor: "#f8f9ff",
    minWidth: 80,
  },
  activeTabButton: {
    backgroundColor: "#667eea",
  },
  tabIcon: {
    width: 32,
    height: 32,
    marginBottom: 4,
  },
  activeTabIcon: {
    opacity: 1,
    transform: [{ scale: 1.1 }],
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
