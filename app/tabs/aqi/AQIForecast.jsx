import { Feather } from "@expo/vector-icons";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import TimestampDisplay from "../../components/TimestampDisplay";
import { useLanguage } from "../../contexts/LanguageContext";
import { getAQILevel } from "../../utils/aqiUtils";
import { getTranslation } from "../../utils/translations";

const AQIForecast = ({ data }) => {
  const { selectedLanguage } = useLanguage();

  // Helper functions
  const getAverageAQI = () => {
    if (data.length === 0) return 0;
    const total = data.reduce((sum, item) => sum + item.aqi, 0);
    return Math.round(total / data.length);
  };

  const getHighestAQI = () => {
    if (data.length === 0) return 0;
    return Math.max(...data.map((item) => item.aqi));
  };

  const getWorstDay = () => {
    if (data.length === 0) return null;
    return data.reduce((worst, current) =>
      current.aqi > worst.aqi ? current : worst
    );
  };

  const getQualityInfo = (aqi) => {
    const level = getAQILevel(aqi);
    return {
      color: level.color,
      backgroundColor: level.bgColor,
      level: level.name,
    };
  };

  const averageAQI = getAverageAQI();
  const highestAQI = getHighestAQI();
  const worstDay = getWorstDay();

  if (data.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Feather name="cloud-off" size={48} color="#9CA3AF" />
        <Text style={styles.emptyText}>
          {getTranslation("noForecastData", selectedLanguage)}
        </Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.content}>
        {/* Header Section */}
        <View style={styles.header}>
          <View style={styles.headerRow}>
            <View style={styles.iconContainer}>
              <Feather name="activity" size={20} color="#3B82F6" />
            </View>
            <View style={styles.headerText}>
              <Text style={styles.title}>
                {getTranslation("aqiForecast", selectedLanguage)}
              </Text>
              <Text style={styles.subtitle}>
                {getTranslation("sixDayPredictions", selectedLanguage)}
              </Text>
            </View>
          </View>
        </View>

        {/* Quick Stats Cards */}
        <View style={styles.statsContainer}>
          {/* Average AQI Card */}
          <View style={styles.statCard}>
            <View style={styles.statHeader}>
              <Feather name="trending-up" size={16} color="#10B981" />
              <Text style={styles.statLabel}>
                {getTranslation("sixDayAverage", selectedLanguage)}
              </Text>
            </View>
            <Text style={styles.statValue}>{averageAQI}</Text>
            <Text style={styles.statUnit}>AQI</Text>
          </View>

          {/* Highest AQI Card */}
          <View style={styles.statCard}>
            <View style={styles.statHeader}>
              <Feather name="alert-triangle" size={16} color="#EF4444" />
              <Text style={styles.statLabel}>
                {getTranslation("highestAQI", selectedLanguage)}
              </Text>
            </View>
            <Text style={styles.statValue}>{highestAQI}</Text>
            {worstDay && (
              <Text style={styles.statSecondary}>{worstDay.day}</Text>
            )}
          </View>
        </View>

        {/* Daily Forecast Section */}
        <View style={styles.forecastSection}>
          <Text style={styles.sectionTitle}>
            {getTranslation("dailyForecast", selectedLanguage)}
          </Text>

          {data.map((item, index) => {
            const qualityInfo = getQualityInfo(item.aqi);

            return (
              <View
                key={index}
                style={[
                  styles.forecastCard,
                  { borderLeftColor: qualityInfo.color },
                ]}
              >
                {/* Header Row - Day and Level Badge */}
                <View style={styles.cardHeader}>
                  <View style={styles.dayInfo}>
                    <Text style={styles.dayText}>{item.day}</Text>
                  </View>

                  <View
                    style={[
                      styles.levelBadge,
                      { backgroundColor: qualityInfo.backgroundColor },
                    ]}
                  >
                    <Text
                      style={[styles.levelText, { color: qualityInfo.color }]}
                    >
                      {item.category === "Moderately Polluted"
                        ? getTranslation("moderate", selectedLanguage)
                        : getTranslation(
                            item.category.toLowerCase(),
                            selectedLanguage
                          ) || item.category}
                    </Text>
                  </View>
                </View>

                {/* Main Content Row */}
                <View style={styles.cardContent}>
                  {/* Left Side - AQI Value */}
                  <View style={styles.aqiSection}>
                    <View style={styles.aqiValueContainer}>
                      <View
                        style={[
                          styles.aqiIconContainer,
                          { backgroundColor: qualityInfo.backgroundColor },
                        ]}
                      >
                        <Feather
                          name="activity"
                          size={16}
                          color={qualityInfo.color}
                        />
                      </View>
                      <View>
                        <Text style={styles.aqiValue}>{item.aqi}</Text>
                        <Text style={styles.aqiLabel}>AQI</Text>
                      </View>
                    </View>
                  </View>

                  {/* Right Side - Details */}
                  <View style={styles.detailsSection}>
                    <View style={styles.detailRow}>
                      <View style={styles.detailItem}>
                        <Feather name="cpu" size={12} color="#6B7280" />
                        <Text style={styles.detailLabel}>
                          {getTranslation("mainPollutant", selectedLanguage)}
                        </Text>
                        <Text style={styles.detailValue}>
                          {item.main_pollutant}
                        </Text>
                      </View>

                      <View style={styles.detailItem}>
                        <Feather name="thermometer" size={12} color="#6B7280" />
                        <Text style={styles.detailLabel}>
                          {getTranslation("value", selectedLanguage)}
                        </Text>
                        <Text style={styles.detailValue}>{item.value}</Text>
                      </View>
                    </View>
                  </View>
                </View>

                {/* Health Recommendations */}
                <View style={styles.warningSection}>
                  <View style={styles.warningHeader}>
                    <Feather name="shield" size={14} color="#6B7280" />
                    <Text style={styles.warningTitle}>
                      {getTranslation("warning", selectedLanguage)}
                    </Text>
                  </View>
                  <Text style={styles.warningText}>{item.warning}</Text>
                </View>

                {/* Progress Indicator */}
                <View style={styles.progressContainer}>
                  <View
                    style={[
                      styles.progressBar,
                      {
                        width: `${Math.min((item.aqi / 500) * 100, 100)}%`,
                        backgroundColor: qualityInfo.color,
                      },
                    ]}
                  />
                </View>
              </View>
            );
          })}
        </View>

        {/* Timestamp */}
        <TimestampDisplay fetchedAt={data[0]?.fetchedAt} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  content: {
    padding: 16,
  },
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 32,
  },
  emptyText: {
    fontSize: 16,
    color: "#9CA3AF",
    marginTop: 16,
    textAlign: "center",
  },

  // Header Styles
  header: {
    marginBottom: 20,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconContainer: {
    width: 40,
    height: 40,
    backgroundColor: "#EBF8FF",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  headerText: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1F2937",
  },
  subtitle: {
    fontSize: 13,
    color: "#9CA3AF",
    marginTop: 2,
  },

  // Stats Cards
  statsContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  statCard: {
    flex: 1,
    backgroundColor: "white",
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
    borderWidth: 1,
    borderColor: "#F3F4F6",
  },
  statHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  statLabel: {
    fontSize: 12,
    color: "#9CA3AF",
    marginLeft: 6,
    fontWeight: "500",
  },
  statValue: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1F2937",
  },
  statUnit: {
    fontSize: 11,
    color: "#9CA3AF",
  },
  statSecondary: {
    fontSize: 11,
    color: "#EF4444",
    fontWeight: "600",
  },

  // Forecast Section
  forecastSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 12,
  },
  forecastCard: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: "#F3F4F6",
    borderLeftWidth: 4,
    position: "relative",
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  dayInfo: {
    flex: 1,
  },
  dayText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1F2937",
  },
  levelBadge: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 12,
  },
  levelText: {
    fontSize: 12,
    fontWeight: "bold",
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  aqiSection: {
    flex: 1,
  },
  aqiValueContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  aqiIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  aqiValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1F2937",
  },
  aqiLabel: {
    fontSize: 11,
    color: "#9CA3AF",
  },
  detailsSection: {
    flex: 1,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  detailItem: {
    alignItems: "center",
    flex: 1,
  },
  detailLabel: {
    fontSize: 10,
    color: "#9CA3AF",
    marginTop: 4,
    textAlign: "center",
  },
  detailValue: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#374151",
    marginTop: 2,
    textAlign: "center",
  },
  warningSection: {
    backgroundColor: "#FEF3C7",
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    borderLeftWidth: 3,
    borderLeftColor: "#F59E0B",
  },
  warningHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  warningTitle: {
    fontSize: 12,
    fontWeight: "600",
    color: "#92400E",
    marginLeft: 6,
  },
  warningText: {
    fontSize: 11,
    color: "#A16207",
    lineHeight: 16,
  },
  progressContainer: {
    position: "absolute",
    bottom: 0,
    left: 16,
    right: 16,
    height: 3,
    backgroundColor: "#F3F4F6",
    borderRadius: 2,
  },
  progressBar: {
    height: "100%",
    borderRadius: 2,
  },

  // Footer
  footer: {
    backgroundColor: "#F9FAFB",
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  footerHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  footerLabel: {
    fontSize: 12,
    color: "#9CA3AF",
    marginLeft: 6,
    fontWeight: "500",
  },
  footerText: {
    fontSize: 11,
    color: "#6B7280",
  },
});

export default AQIForecast;
