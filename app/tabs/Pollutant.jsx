import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import AQIGraph from "../components/AQIGraph";
import GaugeMeter from "../components/AQIMeter";
import TimestampDisplay from "../components/TimestampDisplay";
import { useLanguage } from "../contexts/LanguageContext";
import { getTranslation } from "../utils/translations";
const Pollutant = ({ pollutant, data }) => {
  const { selectedLanguage } = useLanguage();

  const pollutantNames = {
    pm2_5: getTranslation("pm2_5", selectedLanguage),
    pm10: getTranslation("pm10", selectedLanguage),
    o3: getTranslation("o3", selectedLanguage),
    no2: getTranslation("no2", selectedLanguage),
    so2: getTranslation("so2", selectedLanguage),
    co: getTranslation("co", selectedLanguage),
  };

  const pollutantFullNames = {
    pm2_5:
      selectedLanguage === "hi"
        ? "पार्टिकुलेट मैटर 2.5"
        : "Particulate Matter 2.5",
    pm10:
      selectedLanguage === "hi"
        ? "पार्टिकुलेट मैटर 10"
        : "Particulate Matter 10",
    o3: selectedLanguage === "hi" ? "ओज़ोन" : "Ozone",
    no2:
      selectedLanguage === "hi" ? "नाइट्रोजन डाइऑक्साइड" : "Nitrogen Dioxide",
    so2: selectedLanguage === "hi" ? "सल्फर डाइऑक्साइड" : "Sulphur Dioxide",
    co: selectedLanguage === "hi" ? "कार्बन मोनोऑक्साइड" : "Carbon Monoxide",
  };

  // Pollutant ranges with air quality categories
  const getPollutantRanges = (pollutantKey) => {
    const ranges = {
      pm2_5: {
        unit: "µg/m³",
        ranges: [
          { category: "Good", min: 0, max: 30, color: "#22c55e" },
          { category: "Satisfactory", min: 31, max: 60, color: "#fbbf24" },
          { category: "Moderate", min: 61, max: 90, color: "#fb923c" },
          { category: "Poor", min: 91, max: 120, color: "#ef4444" },
          { category: "Severe", min: 121, max: 250, color: "#b91c1c" },
          { category: "Hazardous", min: 250, max: null, color: "#8b4513" },
        ],
      },
      pm10: {
        unit: "µg/m³",
        ranges: [
          { category: "Good", min: 0, max: 50, color: "#22c55e" },
          { category: "Satisfactory", min: 51, max: 100, color: "#fbbf24" },
          { category: "Moderate", min: 101, max: 250, color: "#fb923c" },
          { category: "Poor", min: 251, max: 350, color: "#ef4444" },
          { category: "Severe", min: 351, max: 430, color: "#b91c1c" },
          { category: "Hazardous", min: 430, max: null, color: "#8b4513" },
        ],
      },
      o3: {
        unit: "ppb",
        ranges: [
          { category: "Good", min: 0, max: 25.5, color: "#22c55e" },
          { category: "Satisfactory", min: 26, max: 51, color: "#fbbf24" },
          { category: "Moderate", min: 51, max: 85, color: "#fb923c" },
          { category: "Poor", min: 86, max: 106, color: "#ef4444" },
          { category: "Severe", min: 107, max: 381, color: "#b91c1c" },
          { category: "Hazardous", min: 381, max: null, color: "#8b4513" },
        ],
      },
      co: {
        unit: "ppb",
        ranges: [
          { category: "Good", min: 0, max: 873, color: "#22c55e" },
          { category: "Satisfactory", min: 960, max: 1746, color: "#fbbf24" },
          { category: "Moderate", min: 1834, max: 8732, color: "#fb923c" },
          { category: "Poor", min: 8820, max: 14844, color: "#ef4444" },
          { category: "Severe", min: 14931, max: 29709, color: "#b91c1c" },
          { category: "Hazardous", min: 29709, max: null, color: "#8b4513" },
        ],
      },
      so2: {
        unit: "ppb",
        ranges: [
          { category: "Good", min: 0, max: 15, color: "#22c55e" },
          { category: "Satisfactory", min: 16, max: 31, color: "#fbbf24" },
          { category: "Moderate", min: 31, max: 145, color: "#fb923c" },
          { category: "Poor", min: 145, max: 305, color: "#ef4444" },
          { category: "Severe", min: 305, max: 610, color: "#b91c1c" },
          { category: "Hazardous", min: 610, max: null, color: "#8b4513" },
        ],
      },
      no2: {
        unit: "ppb",
        ranges: [
          { category: "Good", min: 0, max: 21, color: "#22c55e" },
          { category: "Satisfactory", min: 22, max: 43, color: "#fbbf24" },
          { category: "Moderate", min: 43, max: 96, color: "#fb923c" },
          { category: "Poor", min: 96, max: 149, color: "#ef4444" },
          { category: "Severe", min: 149, max: 213, color: "#b91c1c" },
          { category: "Hazardous", min: 213, max: null, color: "#8b4513" },
        ],
      },
    };
    return ranges[pollutantKey] || null;
  };

  // Get specific description and health effects for each pollutant
  const getPollutantInfo = (pollutantKey) => {
    const descriptions = {
      pm2_5: {
        description: getTranslation("pm25Description", selectedLanguage),
        healthEffects: getTranslation("pm25HealthEffects", selectedLanguage),
      },
      pm10: {
        description: getTranslation("pm10Description", selectedLanguage),
        healthEffects: getTranslation("pm10HealthEffects", selectedLanguage),
      },
      o3: {
        description: getTranslation("o3Description", selectedLanguage),
        healthEffects: getTranslation("o3HealthEffects", selectedLanguage),
      },
      no2: {
        description: getTranslation("no2Description", selectedLanguage),
        healthEffects: getTranslation("no2HealthEffects", selectedLanguage),
      },
      so2: {
        description: getTranslation("so2Description", selectedLanguage),
        healthEffects: getTranslation("so2HealthEffects", selectedLanguage),
      },
      co: {
        description: getTranslation("coDescription", selectedLanguage),
        healthEffects: getTranslation("coHealthEffects", selectedLanguage),
      },
    };
    return (
      descriptions[pollutantKey] || {
        description: "Information not available",
        healthEffects: "Health effects information not available",
      }
    );
  };

  // Function to get AQI color based on value - matching Navbar/Weather palette
  const getAQIColor = (aqi) => {
    if (aqi <= 50) return "#667eea"; // Good - Primary blue
    if (aqi <= 100) return "#8b9cf7"; // Moderate - Light purple
    if (aqi <= 150) return "#9a7cc7"; // Unhealthy for Sensitive Groups - Purple
    if (aqi <= 200) return "#764ba2"; // Unhealthy - Dark purple
    if (aqi <= 300) return "#6366f1"; // Very Unhealthy - Indigo
    return "#4338ca"; // Hazardous - Dark indigo
  };

  const pollutantInfo = getPollutantInfo(pollutant);
  const pollutantRangesData = getPollutantRanges(pollutant);
  const displayPollutantName = pollutantNames[pollutant] || pollutant;
  const displayPollutantFullName = pollutantFullNames[pollutant] || pollutant;
  return (
    <View style={styles.container}>
      {/* Header with gradient background matching Navbar style */}
      <LinearGradient
        colors={["#667eea", "#764ba2"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.headerGradient}
      >
        <Text style={styles.pollutantTitle}>{displayPollutantFullName}</Text>
      </LinearGradient>

      <View style={styles.sideBySideContainer}>
        <LinearGradient
          colors={["#ffffff", "#f0f9ff"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[
            styles.card,
            styles.halfCard,
            { borderLeftColor: getAQIColor(data[0]?.aqi) },
          ]}
        >
          <Text
            style={[
              styles.concentrationValue,
              { color: getAQIColor(data[0]?.aqi) },
            ]}
          >
            {data[0]?.value}{" "}
            {displayPollutantName ===
              getTranslation("pm2_5", selectedLanguage) ||
            displayPollutantName === getTranslation("pm10", selectedLanguage)
              ? getTranslation("ugm3", selectedLanguage)
              : getTranslation("ppb", selectedLanguage)}
          </Text>
          <Text style={styles.concentrationLabel}>
            {getTranslation("currentConcentration", selectedLanguage)}
          </Text>
        </LinearGradient>
        <LinearGradient
          colors={["#ffffff", "#f0f9ff"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[
            styles.card,
            styles.halfCard,
            { borderLeftColor: getAQIColor(data[0]?.aqi) },
          ]}
        >
          <Text
            style={[styles.statusValue, { color: getAQIColor(data[0]?.aqi) }]}
          >
            {data[0]?.category}
          </Text>
          <Text style={styles.statusLabel}>
            {getTranslation("airQualityStatus", selectedLanguage)}
          </Text>
        </LinearGradient>
      </View>

      <LinearGradient
        colors={["#ffffff", "#f8f9ff"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[
          styles.gaugeContainer,
          { borderLeftColor: getAQIColor(data[0]?.aqi) },
        ]}
      >
        <Text style={[styles.aqiText, { color: getAQIColor(data[0]?.aqi) }]}>
          AQI: {data[0]?.aqi}
        </Text>
        <GaugeMeter value={data[0]?.aqi} />
      </LinearGradient>

      <LinearGradient
        colors={["#ffffff", "#f8f9ff"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.infoContainer}
      >
        <Text style={styles.infoTitle}>
          {selectedLanguage === "hi"
            ? `${displayPollutantName} ${getTranslation(
                "about",
                selectedLanguage
              )}`
            : `${getTranslation(
                "about",
                selectedLanguage
              )} ${displayPollutantName}`}
        </Text>
        <Text style={styles.infoText}>{pollutantInfo.description}</Text>
      </LinearGradient>

      <LinearGradient
        colors={["#ffffff", "#fff5f5"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.healthEffectsContainer}
      >
        <Text style={styles.healthEffectsTitle}>
          {getTranslation("healthEffects", selectedLanguage)}
        </Text>
        <Text style={styles.healthEffectsText}>
          {pollutantInfo.healthEffects}
        </Text>
      </LinearGradient>

      <LinearGradient
        colors={["#ffffff", "#f8f9ff"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.graphContainer}
      >
        <View style={styles.graphWrapper}>
          <AQIGraph data={data} pollutant={displayPollutantName} />
        </View>
      </LinearGradient>

      {/* Pollutant Ranges Section - Moved below graph */}
      {pollutantRangesData && (
        <LinearGradient
          colors={["#ffffff", "#f0f9ff"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.rangesContainer}
        >
          <Text style={styles.rangesTitle}>
            {getTranslation("concentrationRanges", selectedLanguage) ||
              "Concentration Ranges"}{" "}
            ({pollutantRangesData.unit})
          </Text>
          <View style={styles.rangesGrid}>
            {pollutantRangesData.ranges.map((range, index) => (
              <View
                key={index}
                style={[styles.rangeItem, { borderLeftColor: range.color }]}
              >
                <View style={styles.rangeHeader}>
                  <View
                    style={[
                      styles.rangeColorIndicator,
                      { backgroundColor: range.color },
                    ]}
                  />
                  <Text style={[styles.rangeCategory, { color: range.color }]}>
                    {range.category}
                  </Text>
                </View>
                <Text style={styles.rangeValues}>
                  {range.min} - {range.max ? range.max : "∞"}{" "}
                  {pollutantRangesData.unit}
                </Text>
              </View>
            ))}
          </View>
        </LinearGradient>
      )}

      {/* Timestamp */}
      <TimestampDisplay fetchedAt={data[0]?.fetchedAt} />
    </View>
  );
};

export default Pollutant;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9ff", // Consistent with app theme
    padding: 16,
  },
  headerGradient: {
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#667eea",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 8,
  },
  sideBySideContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    gap: 12,
  },
  cardContainer: {
    marginBottom: 20,
  },
  card: {
    borderRadius: 20, // Increased to match Weather.jsx style
    padding: 20,
    marginVertical: 8,
    shadowColor: "#667eea", // Matching Weather.jsx shadow color
    shadowOffset: {
      width: 0,
      height: 8, // Enhanced shadow like Weather.jsx
    },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 10,
    borderLeftWidth: 4,
  },
  halfCard: {
    flex: 1,
    marginVertical: 0,
  },
  pollutantTitle: {
    fontSize: 26,
    fontWeight: "800", // Matching Weather.jsx font weight
    color: "white",
    textAlign: "center",
    textShadowColor: "rgba(0, 0, 0, 0.3)", // Matching Weather.jsx text shadow
    textShadowOffset: { width: 1, height: 2 },
    textShadowRadius: 4,
  },
  concentrationValue: {
    fontSize: 18, // Decreased from 22 to 18
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 6,
  },
  concentrationLabel: {
    fontSize: 12,
    color: "#6b7280", // Consistent gray
    textAlign: "center",
    fontWeight: "500",
  },
  statusValue: {
    fontSize: 18, // Adjusted size
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 6,
    textTransform: "capitalize",
  },
  statusLabel: {
    fontSize: 12,
    color: "#6b7280", // Consistent gray
    textAlign: "center",
    fontWeight: "500",
  },
  gaugeContainer: {
    backgroundColor: "#ffffff",
    borderRadius: 16, // Consistent with cards
    padding: 24, // Increased padding
    marginVertical: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    alignItems: "center",
    borderLeftWidth: 4,
  },
  aqiText: {
    fontSize: 20, // Slightly larger
    fontWeight: "bold",
    marginBottom: 18,
  },
  infoContainer: {
    backgroundColor: "#ffffff",
    borderRadius: 16, // Consistent
    padding: 20, // Increased padding
    marginVertical: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1f2937", // Consistent with app theme
    marginBottom: 10,
  },
  infoText: {
    fontSize: 14,
    color: "#374151", // Better contrast
    lineHeight: 22, // Improved readability
  },
  healthEffectsContainer: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 20,
    marginVertical: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    borderLeftWidth: 4,
    borderLeftColor: "#ef4444", // Red accent for health warnings
  },
  healthEffectsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#dc2626", // Red color for health effects title
    marginBottom: 10,
  },
  healthEffectsText: {
    fontSize: 14,
    color: "#374151",
    lineHeight: 22,
  },
  rangesContainer: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 20,
    marginVertical: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    borderLeftWidth: 4,
    borderLeftColor: "#667eea",
  },
  rangesTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: 16,
    textAlign: "center",
  },
  rangesGrid: {
    flexDirection: "column",
    gap: 10,
  },
  rangeItem: {
    backgroundColor: "#f8f9ff",
    borderRadius: 12,
    padding: 12,
    borderLeftWidth: 4,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  rangeHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  rangeColorIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  rangeCategory: {
    fontSize: 14,
    fontWeight: "bold",
    flex: 1,
  },
  rangeValues: {
    fontSize: 12,
    color: "#6b7280",
    fontWeight: "500",
    marginLeft: 20,
  },
  graphContainer: {
    backgroundColor: "#ffffff",
    borderRadius: 16, // Consistent
    padding: 20, // Increased padding
    marginVertical: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    flex: 1,
    minHeight: 200,
    overflow: "hidden",
    width: "100%",
    alignSelf: "stretch",
  },
  graphWrapper: {
    flex: 1,
    width: "100%",
    height: "100%",
    overflow: "hidden",
  },
});
