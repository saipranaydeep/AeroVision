import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import AQIMeter from "../../components/AQIMeter";
import TimestampDisplay from "../../components/TimestampDisplay";
import { useLanguage } from "../../contexts/LanguageContext";
import {
  getAQILevel,
  getAQILevelByName,
  getHealthRecommendations,
  getTranslatedAQIScale,
} from "../../utils/aqiUtils";
import { getTranslation } from "../../utils/translations";
// Helper to calculate cigarette equivalency based on PM2.5 levels
const calculateCigaretteEquivalency = (pm25Value) => {
  if (!pm25Value || pm25Value <= 0) return { daily: 0, weekly: 0, monthly: 0 };

  // One cigarette per day is equivalent to 22 μg/m3 of PM2.5 level
  const cigaretteEquivalent = 22; // μg/m3
  const dailyCigarettes =
    Math.round((pm25Value / cigaretteEquivalent) * 10) / 10;

  return {
    daily: dailyCigarettes,
    weekly: Math.round(dailyCigarettes * 7 * 10) / 10,
    monthly: Math.round(dailyCigarettes * 30 * 10) / 10,
  };
};

// Helper to get AQI info by AQI numerical value using centralized utility
const getAQIInfo = (aqiValue) => {
  const defaultInfo = {
    color: "#6b7280",
    bgColor: "#f3f4f6",
    icon: "help-circle",
  };

  if (typeof aqiValue !== "number" || aqiValue < 0) return defaultInfo;

  // Use the centralized utility function with numerical AQI value
  const levelInfo = getAQILevel(aqiValue);
  return {
    color: levelInfo.color,
    bgColor: levelInfo.bgColor,
    icon: levelInfo.icon,
    name: levelInfo.name,
  };
};

// Helper to get AQI info for pollutants using legacy category names
const getPollutantAQIInfo = (category) => {
  const defaultInfo = {
    color: "#6b7280",
    bgColor: "#f3f4f6",
    icon: "help-circle",
  };

  if (!category) return defaultInfo;

  // Use the centralized utility function with legacy name mapping
  const levelInfo = getAQILevelByName(category);
  return {
    color: levelInfo.color,
    bgColor: levelInfo.bgColor,
    icon: levelInfo.icon,
    name: levelInfo.name,
  };
};

// Helper to format pollutant names from backend
const formatPollutantName = (name, t) => {
  const nameMap = {
    pm2_5: t("pm2_5"),
    pm10: t("pm10"),
    no2: t("no2"),
    so2: t("so2"),
    o3: t("o3"),
    co: t("co"),
  };
  return nameMap[name] || name.toUpperCase();
};

// Health recommendations based on AQI value - using centralized utility
// (Function moved to aqiUtils.js)

// A styled header component for cards
const SectionHeader = ({ title }) => (
  <View style={styles.sectionHeader}>
    <View style={styles.headerAccent} />
    <Text style={styles.cardTitle}>{title}</Text>
  </View>
);

const AQI = ({ data = MOCK_DATA }) => {
  const { selectedLanguage } = useLanguage();
  const t = (key) => getTranslation(key, selectedLanguage);

  const aqiScale = getTranslatedAQIScale(t);
  const aqiInfo = getAQIInfo(data.aqi); // Use numerical AQI value instead of category
  const recommendations = getHealthRecommendations(data.aqi, t);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ padding: 20 }}
      showsVerticalScrollIndicator={false}
    >
      {/* Live Data Header */}
      <View style={styles.headerContainer}>
        <View style={styles.liveDataBadge}>
          <View style={styles.liveDot} />
          <Text style={styles.liveDataText}>{t("liveDataBadge")}</Text>
        </View>
      </View>
      {/* Main AQI Display */}
      <LinearGradient
        colors={[`${aqiInfo.color}1A`, `${aqiInfo.color}05`]}
        style={[
          styles.card,
          styles.aqiCard,
          { borderColor: `${aqiInfo.color}40` },
        ]}
      >
        <Text style={styles.cardSubTitle}>{t("aqi")}</Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-start",
          }}
        >
          <View
            style={{
              backgroundColor: aqiInfo.bgColor,
              borderRadius: 25,
              padding: 20,
              borderWidth: 1,
              borderColor: "rgba(255, 255, 255, 0.2)",
            }}
          >
            <Feather name={aqiInfo.icon} size={80} color={aqiInfo.color} />
          </View>
          <Text style={[styles.aqiValue, { color: aqiInfo.color }]}>
            {data.aqi}
          </Text>
        </View>
        <View
          style={[
            styles.aqiLevelBadge,
            {
              backgroundColor: aqiInfo.bgColor,
              borderColor: `${aqiInfo.color}50`,
            },
          ]}
        >
          <Text style={[styles.aqiLevelText, { color: aqiInfo.color }]}>
            {aqiInfo.name}
          </Text>
        </View>
      </LinearGradient>
      <View
        style={{
          ...styles.card,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <AQIMeter value={data.aqi} />
      </View>
      {/* Pollutant Levels */}
      <View style={styles.card}>
        <SectionHeader title={t("pollutantLevels")} />
        <View style={styles.pollutantGrid}>
          {data.pollutants?.map((p, index) => {
            const pollutantInfo = getPollutantAQIInfo(p.category);
            return (
              <View
                key={index}
                style={[
                  styles.pollutantItem,
                  {
                    backgroundColor: pollutantInfo.bgColor,
                    borderColor: pollutantInfo.color,
                  },
                ]}
              >
                <Text style={styles.pollutantName}>
                  {formatPollutantName(p.pollutant, t)}
                </Text>
                <Text
                  style={[
                    styles.pollutantValue,
                    { color: pollutantInfo.color },
                  ]}
                >
                  {p.value}
                </Text>
                <Text style={styles.pollutantUnit}>
                  {p.pollutant === "pm2_5" || p.pollutant === "pm10"
                    ? t("ugm3")
                    : t("ppb")}
                </Text>
              </View>
            );
          })}
        </View>
      </View>
      {/* Health Recommendations */}
      <View style={styles.card}>
        <SectionHeader title={t("healthRecommendations")} />
        {recommendations.map((rec, index) => (
          <View key={index} style={styles.recommendationItem}>
            <Feather name="shield" size={18} color="#3b82f6" />
            <Text style={styles.recommendationText}>{rec}</Text>
          </View>
        ))}
      </View>

      {/* Cigarette Equivalency */}
      {(() => {
        const pm25Pollutant = data.pollutants?.find(
          (p) => p.pollutant === "pm2_5"
        );
        const cigaretteData = calculateCigaretteEquivalency(
          pm25Pollutant?.value
        );

        if (pm25Pollutant && cigaretteData.daily > 0) {
          return (
            <View style={styles.card}>
              <SectionHeader
                title={t("cigaretteEquivalency") || "Cigarette Equivalency"}
              />

              <View style={styles.cigaretteContainer}>
                <View style={styles.cigaretteHeader}>
                  <Feather name="alert-triangle" size={20} color="#f59e0b" />
                  <Text style={styles.cigaretteHeaderText}>
                    {t("exposureEquivalent") || "Exposure Equivalent"}
                  </Text>
                </View>

                <View style={styles.cigaretteCenterIcon}>
                  <View style={styles.cigaretteMainIconContainer}>
                    <Text style={styles.cigaretteMainIcon}>🚬</Text>
                  </View>
                </View>

                <View style={styles.cigaretteVerticalList}>
                  <View
                    style={[
                      styles.cigaretteVerticalItem,
                      styles.cigaretteDaily,
                    ]}
                  >
                    <View style={styles.cigaretteItemContent}>
                      <Text style={styles.cigaretteValue}>
                        {cigaretteData.daily}
                      </Text>
                      <Text style={styles.cigaretteLabel}>
                        {cigaretteData.daily === 1
                          ? t("cigarettePerDay") || "Cigarette/Day"
                          : t("cigarettesPerDay") || "Cigarettes/Day"}
                      </Text>
                    </View>
                    <Text style={styles.cigarettePeriod}>
                      {t("daily") || "Daily"}
                    </Text>
                  </View>

                  <View
                    style={[
                      styles.cigaretteVerticalItem,
                      styles.cigaretteWeekly,
                    ]}
                  >
                    <View style={styles.cigaretteItemContent}>
                      <Text style={styles.cigaretteValue}>
                        {cigaretteData.weekly}
                      </Text>
                      <Text style={styles.cigaretteLabel}>
                        {cigaretteData.weekly === 1
                          ? t("cigarettePerWeek") || "Cigarette/Week"
                          : t("cigarettesPerWeek") || "Cigarettes/Week"}
                      </Text>
                    </View>
                    <Text style={styles.cigarettePeriod}>
                      {t("weekly") || "Weekly"}
                    </Text>
                  </View>

                  <View
                    style={[
                      styles.cigaretteVerticalItem,
                      styles.cigaretteMonthly,
                    ]}
                  >
                    <View style={styles.cigaretteItemContent}>
                      <Text style={styles.cigaretteValue}>
                        {cigaretteData.monthly}
                      </Text>
                      <Text style={styles.cigaretteLabel}>
                        {cigaretteData.monthly === 1
                          ? t("cigarettePerMonth") || "Cigarette/Month"
                          : t("cigarettesPerMonth") || "Cigarettes/Month"}
                      </Text>
                    </View>
                    <Text style={styles.cigarettePeriod}>
                      {t("monthly") || "Monthly"}
                    </Text>
                  </View>
                </View>

                <View style={styles.disclaimerContainer}>
                  <Feather name="info" size={14} color="#6b7280" />
                  <Text style={styles.disclaimerText}>
                    <Text style={styles.disclaimerTitle}>
                      {t("disclaimer") || "Disclaimer"}:
                    </Text>
                    {" " +
                      (t("cigaretteDisclaimerText") ||
                        "This cigarette-equivalent estimate is based on the average PM2.5 concentration over the last 24 hours, assuming continuous exposure during that time.")}
                  </Text>
                </View>
              </View>
            </View>
          );
        }
        return null;
      })()}
      {/* AQI Reference Scale */}
      <View style={styles.card}>
        <SectionHeader title={t("aqiReferenceScale")} />
        <View style={styles.scaleContainer}>
          <View style={styles.scaleValuesContainer}>
            <Text style={[styles.scaleValueText, { left: "2%" }]}>0</Text>
            <Text style={[styles.scaleValueText, { left: "10%" }]}>50</Text>
            <Text style={[styles.scaleValueText, { left: "20%" }]}>100</Text>
            <Text style={[styles.scaleValueText, { left: "40%" }]}>200</Text>
            <Text style={[styles.scaleValueText, { left: "60%" }]}>300</Text>
            <Text style={[styles.scaleValueText, { left: "80%" }]}>400</Text>
            <Text style={[styles.scaleValueText, { right: 0 }]}>500</Text>
          </View>
          <View style={styles.scaleBar}>
            {aqiScale.map((item) => (
              <View
                key={item.level}
                style={{ flex: item.flex, backgroundColor: item.color }}
              />
            ))}
          </View>
          <View style={styles.scaleLabelsContainer}>
            {aqiScale.map((item) => (
              <Text
                key={item.level}
                style={{ ...styles.scaleLabelText, flex: item.flex }}
              >
                {item.level}
              </Text>
            ))}
          </View>
        </View>
      </View>

      {/* Timestamp */}
      <TimestampDisplay fetchedAt={data.fetchedAt} />
    </ScrollView>
  );
};

export default AQI;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8f9fa" },
  headerContainer: { alignItems: "center", marginBottom: 20 },
  liveDataBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fef2f2",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#fecaca",
  },
  liveDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#ef4444",
    marginRight: 8,
  },
  liveDataText: { color: "#dc2626", fontSize: 12, fontWeight: "700" },
  card: {
    backgroundColor: "white",
    borderRadius: 24,
    padding: 24,
    marginBottom: 20,
    shadowColor: "#9ca3af",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  aqiCard: { alignItems: "center", borderWidth: 1.5, paddingVertical: 24 },
  cardSubTitle: {
    fontSize: 26,
    fontWeight: "600",
    color: "#6b7280",
    textShadowColor: "rgba(37, 37, 37, 0.3)",
    textShadowOffset: { width: 1, height: 2 },
    textShadowRadius: 4,
    marginBottom: 4,
  },
  aqiValue: { fontSize: 84, fontWeight: "900", lineHeight: 90 },
  aqiLevelBadge: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 16,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    borderWidth: 1,
  },
  aqiLevelText: { fontSize: 18, fontWeight: "700", marginLeft: 8 },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  headerAccent: {
    width: 4,
    height: 20,
    backgroundColor: "#667eea",
    borderRadius: 2,
    marginRight: 10,
  },
  cardTitle: { fontSize: 18, fontWeight: "700", color: "#1f2937" },
  pollutantGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  pollutantItem: {
    width: "48%",
    borderRadius: 16,
    padding: 16,
    alignItems: "center",
    marginBottom: 12,
    borderWidth: 1.5,
  },
  pollutantName: { fontSize: 14, fontWeight: "600", color: "#374151" },
  pollutantValue: { fontSize: 24, fontWeight: "800", marginVertical: 4 },
  pollutantUnit: { fontSize: 12, color: "#6b7280" },
  recommendationItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#eff6ff",
    padding: 14,
    borderRadius: 12,
    marginBottom: 10,
  },
  recommendationText: {
    flex: 1,
    marginLeft: 12,
    fontSize: 14,
    color: "#374151",
    lineHeight: 20,
  },
  cigaretteContainer: {
    marginTop: 8,
  },
  cigaretteHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    paddingHorizontal: 4,
  },
  cigaretteHeaderText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#f59e0b",
    marginLeft: 8,
  },
  cigaretteCenterIcon: {
    alignItems: "center",
    marginBottom: 20,
  },
  cigaretteMainIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },
  cigaretteMainIcon: {
    fontSize: 28,
  },
  cigaretteVerticalList: {
    marginBottom: 16,
  },
  cigaretteVerticalItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    marginBottom: 12,
    borderRadius: 12,
    borderWidth: 1.5,
  },
  cigaretteItemContent: {
    flex: 1,
  },
  cigaretteDaily: {
    backgroundColor: "#fef3c7",
    borderColor: "#f59e0b",
  },
  cigaretteWeekly: {
    backgroundColor: "#fee2e2",
    borderColor: "#ef4444",
  },
  cigaretteMonthly: {
    backgroundColor: "#fce7f3",
    borderColor: "#ec4899",
  },
  cigaretteValue: {
    fontSize: 24,
    fontWeight: "800",
    color: "#1f2937",
    marginBottom: 2,
  },
  cigaretteLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#374151",
  },
  cigarettePeriod: {
    fontSize: 12,
    color: "#6b7280",
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  disclaimerContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "#f9fafb",
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  disclaimerText: {
    flex: 1,
    marginLeft: 8,
    fontSize: 11,
    color: "#6b7280",
    lineHeight: 16,
  },
  disclaimerTitle: {
    fontWeight: "600",
    color: "#374151",
  },
  scaleContainer: { marginTop: 8 },
  scaleValuesContainer: {
    position: "relative",
    height: 16,
    marginBottom: 4,
  },
  scaleValueText: {
    position: "absolute",
    fontSize: 11,
    color: "#6b7280",
    fontWeight: "500",
    transform: [{ translateX: -6 }],
  },
  scaleBar: {
    flexDirection: "row",
    height: 12,
    borderRadius: 6,
    overflow: "hidden",
  },
  scaleLabelsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 4,
    marginTop: 8,
  },
  scaleLabelText: {
    fontSize: 11,
    color: "#374151",
    fontWeight: "600",
    textAlign: "center",
    lineHeight: 14,
  },
});
