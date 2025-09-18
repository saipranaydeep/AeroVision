import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";
import { useLanguage } from "../../contexts/LanguageContext";
import { getTranslation } from "../../utils/translations";

const { width } = Dimensions.get("window");

const Weather = ({ data }) => {
  const { selectedLanguage } = useLanguage();

  // Enhanced weather condition logic with translations
  const getWeatherCondition = (minTemp, maxTemp, precipitation, windSpeed) => {
    const avgTemp = (minTemp + maxTemp) / 2;

    if (precipitation > 15) {
      return {
        condition: getTranslation("heavyRain", selectedLanguage),
        icon: "cloud-rain",
        gradient: ["#8b9cf7", "#9a7cc7"],
        bgColor: "#8b9cf7",
      };
    } else if (precipitation > 5) {
      return {
        condition: getTranslation("lightRain", selectedLanguage),
        icon: "cloud-drizzle",
        gradient: ["#8b9cf7", "#9a7cc7"],
        bgColor: "#8b9cf7",
      };
    } else if (precipitation > 0.5) {
      return {
        condition: getTranslation("drizzle", selectedLanguage),
        icon: "cloud-rain",
        gradient: ["#8b9cf7", "#9a7cc7"],
        bgColor: "#8b9cf7",
      };
    } else if (windSpeed > 30) {
      return {
        condition: getTranslation("veryWindy", selectedLanguage),
        icon: "wind",
        gradient: ["#8b9cf7", "#9a7cc7"],
        bgColor: "#8b9cf7",
      };
    } else if (windSpeed > 20) {
      return {
        condition: getTranslation("windy", selectedLanguage),
        icon: "wind",
        gradient: ["#8b9cf7", "#9a7cc7"],
        bgColor: "#8b9cf7",
      };
    } else if (avgTemp > 35) {
      return {
        condition: getTranslation("veryHot", selectedLanguage),
        icon: "thermometer",
        gradient: ["#8b9cf7", "#9a7cc7"],
        bgColor: "#8b9cf7",
      };
    } else if (avgTemp > 28) {
      return {
        condition: getTranslation("hot", selectedLanguage),
        icon: "sun",
        gradient: ["#8b9cf7", "#9a7cc7"],
        bgColor: "#8b9cf7",
      };
    } else if (avgTemp < 0) {
      return {
        condition: getTranslation("freezing", selectedLanguage),
        icon: "thermometer",
        gradient: ["#8b9cf7", "#9a7cc7"],
        bgColor: "#8b9cf7",
      };
    } else if (avgTemp < 10) {
      return {
        condition: getTranslation("cold", selectedLanguage),
        icon: "thermometer",
        gradient: ["#8b9cf7", "#9a7cc7"],
        bgColor: "#8b9cf7",
      };
    } else if (avgTemp > 20 && precipitation < 0.5 && windSpeed < 15) {
      return {
        condition: getTranslation("sunny", selectedLanguage),
        icon: "sun",
        gradient: ["#8b9cf7", "#9a7cc7"],
        bgColor: "#8b9cf7",
      };
    } else if (avgTemp > 15 && precipitation < 1) {
      return {
        condition: getTranslation("partlyCloudy", selectedLanguage),
        icon: "cloud",
        gradient: ["#8b9cf7", "#9a7cc7"],
        bgColor: "#8b9cf7",
      };
    } else {
      return {
        condition: getTranslation("cloudy", selectedLanguage),
        icon: "cloud",
        gradient: ["#8b9cf7", "#9a7cc7"],
        bgColor: "#8b9cf7",
      };
    }
  };

  if (!data || data.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>
          {getTranslation("noWeatherData", selectedLanguage)}
        </Text>
      </View>
    );
  }

  const todayWeather = getWeatherCondition(
    data[0]?.min_temp || 20,
    data[0]?.max_temp || 25,
    data[0]?.precipitation_mm || 0,
    data[0]?.max_wind_speed_kmh || 10
  );

  const avgTemp = ((data[0]?.min_temp || 20) + (data[0]?.max_temp || 25)) / 2;

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Main Weather Card with Gradient */}
      <LinearGradient
        colors={todayWeather.gradient}
        style={styles.mainCard}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.header}>
          <View>
            <Text style={styles.weatherTitle}>
              {getTranslation("todaysWeather", selectedLanguage)}
            </Text>
            <Text style={styles.locationText}>
              {getTranslation("currentLocation", selectedLanguage)}
            </Text>
          </View>
          <View style={styles.dateContainer}>
            <Text style={styles.todayLabel}>
              {new Date().toLocaleDateString("en-US", {
                weekday: "short",
                month: "short",
                day: "numeric",
              })}
            </Text>
          </View>
        </View>

        <View style={styles.mainWeatherContent}>
          <View style={styles.temperatureSection}>
            <View style={styles.iconContainer}>
              <Feather
                name={todayWeather.icon}
                size={80}
                color="rgba(255,255,255,0.9)"
              />
            </View>
            <View style={styles.tempContainer}>
              <Text style={styles.temperature}>{Math.round(avgTemp)}°</Text>
              <Text style={styles.tempRange}>
                {data[0]?.min_temp || 20}° / {data[0]?.max_temp || 25}°
              </Text>
              <Text style={styles.condition}>{todayWeather.condition}</Text>
            </View>
          </View>

          {/* Enhanced Details Grid */}
          <View style={styles.detailsContainer}>
            <View style={styles.detailsGrid}>
              {/* <View style={styles.detailItem}>
                <View style={styles.detailIconContainer}>
                  <Feather
                    name="droplet"
                    size={24}
                    color="rgba(255,255,255,0.8)"
                  />
                </View>
                <Text style={styles.detailLabel}>Humidity</Text>
                <Text style={styles.detailValue}>
                  {getHumidity(data[0]?.precipitation_mm || 0, avgTemp)}
                </Text>
              </View> */}

              <View style={styles.detailItem}>
                <View style={styles.detailIconContainer}>
                  <Feather
                    name="wind"
                    size={24}
                    color="rgba(255,255,255,0.8)"
                  />
                </View>
                <Text style={styles.detailLabel}>
                  {getTranslation("wind", selectedLanguage)}
                </Text>
                <Text style={styles.detailValue}>
                  {data[0]?.max_wind_speed_kmh || 10}{" "}
                  {getTranslation("kmh", selectedLanguage)}
                </Text>
              </View>

              <View style={styles.detailItem}>
                <View style={styles.detailIconContainer}>
                  <Feather
                    name="cloud-rain"
                    size={24}
                    color="rgba(255,255,255,0.8)"
                  />
                </View>
                <Text style={styles.detailLabel}>
                  {getTranslation("precipitation", selectedLanguage)}
                </Text>
                <Text style={styles.detailValue}>
                  {data[0]?.precipitation_mm || 0}{" "}
                  {getTranslation("mm", selectedLanguage)}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </LinearGradient>

      {/* 7-Day Forecast */}
      <View style={styles.forecastSection}>
        <View style={styles.forecastHeader}>
          <View style={styles.forecastTitleContainer}>
            <View style={styles.forecastTitleAccent} />
            <Text style={styles.forecastTitle}>
              {getTranslation("weatherForecast", selectedLanguage)}
            </Text>
          </View>
          <View style={styles.calendarIconContainer}>
            <Feather name="calendar" size={24} color="#667eea" />
          </View>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.forecastScroll}
          contentContainerStyle={styles.forecastScrollContent}
        >
          {data?.slice(1, 8).map((item, index) => {
            const weather = getWeatherCondition(
              item.min_temp || 20,
              item.max_temp || 25,
              item.precipitation_mm || 0,
              item.max_wind_speed_kmh || 10
            );

            return (
              <LinearGradient
                key={index}
                colors={["#ffffff", "#f8f9ff"]}
                style={styles.forecastCard}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <Text style={styles.forecastDay}>{item.day}</Text>

                <View style={styles.forecastIconContainer}>
                  <Feather name={weather.icon} size={36} color="#667eea" />
                </View>

                <View style={styles.forecastTempContainer}>
                  <View style={styles.tempHighContainer}>
                    <Text style={styles.tempLabel}>
                      {getTranslation("high", selectedLanguage)}
                    </Text>
                    <Text style={styles.forecastMaxTemp}>
                      {item.max_temp || 25}°
                    </Text>
                  </View>
                  <View style={styles.tempDivider} />
                  <View style={styles.tempLowContainer}>
                    <Text style={styles.tempLabel}>
                      {getTranslation("low", selectedLanguage)}
                    </Text>
                    <Text style={styles.forecastMinTemp}>
                      {item.min_temp || 20}°
                    </Text>
                  </View>
                </View>

                <Text style={styles.forecastCondition}>
                  {weather.condition}
                </Text>

                <View style={styles.forecastDetailsContainer}>
                  {(item.precipitation_mm || 0) > 0 && (
                    <View style={styles.precipitationContainer}>
                      <Feather name="cloud-rain" size={12} color="#667eea" />
                      <Text style={styles.forecastPrecip}>
                        {item.precipitation_mm || 0}
                        {getTranslation("mm", selectedLanguage)}
                      </Text>
                    </View>
                  )}

                  <View style={styles.windContainer}>
                    <Feather name="wind" size={12} color="#764ba2" />
                    <Text style={styles.forecastWind}>
                      {item.max_wind_speed_kmh || 10}
                      {getTranslation("kmh", selectedLanguage)}
                    </Text>
                  </View>
                </View>
              </LinearGradient>
            );
          })}
        </ScrollView>
      </View>
    </ScrollView>
  );
};

export default Weather;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9ff",
  },

  errorText: {
    fontSize: 18,
    color: "#667eea",
    textAlign: "center",
    marginTop: 50,
  },

  mainCard: {
    margin: 20,
    marginBottom: 15,
    borderRadius: 32,
    padding: 28,
    shadowColor: "#667eea",
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.25,
    shadowRadius: 25,
    elevation: 15,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 25,
  },

  weatherTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: "white",
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 1, height: 2 },
    textShadowRadius: 4,
    // letterSpacing: -0.5,
  },

  locationText: {
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.8)",
    fontWeight: "500",
    marginTop: 4,
  },

  dateContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.25)",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.3)",
  },

  todayLabel: {
    fontSize: 14,
    color: "white",
    fontWeight: "600",
    textAlign: "center",
  },

  mainWeatherContent: {
    gap: 25,
  },

  temperatureSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: 25,
  },

  iconContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    borderRadius: 25,
    padding: 20,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
  },

  tempContainer: {
    flex: 1,
  },

  temperature: {
    fontSize: 64,
    fontWeight: "800",
    color: "white",
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
    letterSpacing: -2,
  },

  tempRange: {
    fontSize: 18,
    color: "rgba(255, 255, 255, 0.8)",
    fontWeight: "600",
    marginTop: 2,
  },

  condition: {
    fontSize: 22,
    color: "rgba(255, 255, 255, 0.95)",
    fontWeight: "600",
    marginTop: 6,
    letterSpacing: 0.5,
  },

  detailsContainer: {
    gap: 20,
  },

  detailsGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.25)",
  },

  detailItem: {
    alignItems: "center",
    flex: 1,
  },

  detailIconContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 15,
    padding: 12,
    marginBottom: 10,
  },

  detailLabel: {
    fontSize: 13,
    color: "rgba(255, 255, 255, 0.8)",
    fontWeight: "600",
    marginBottom: 6,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },

  detailValue: {
    fontSize: 18,
    color: "white",
    fontWeight: "700",
  },

  additionalDetailsGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },

  additionalDetailItem: {
    alignItems: "center",
    flex: 1,
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    borderRadius: 15,
    padding: 15,
    marginHorizontal: 5,
  },

  additionalDetailLabel: {
    fontSize: 11,
    color: "rgba(255, 255, 255, 0.8)",
    fontWeight: "600",
    marginTop: 8,
    marginBottom: 4,
    textAlign: "center",
  },

  additionalDetailValue: {
    fontSize: 14,
    color: "white",
    fontWeight: "700",
    textAlign: "center",
  },

  forecastSection: {
    margin: 20,
    marginTop: 5,
  },

  forecastHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },

  forecastTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  forecastTitleAccent: {
    width: 4,
    height: 28,
    backgroundColor: "#667eea",
    borderRadius: 2,
    marginRight: 12,
  },

  forecastTitle: {
    fontSize: 28,
    fontWeight: "800",
    color: "#2d3436",
    letterSpacing: -0.8,
  },

  calendarIconContainer: {
    backgroundColor: "rgba(102, 126, 234, 0.1)",
    borderRadius: 16,
    padding: 12,
    borderWidth: 1,
    borderColor: "rgba(102, 126, 234, 0.2)",
  },

  forecastScroll: {
    flexDirection: "row",
  },

  forecastScrollContent: {
    paddingRight: 20,
  },

  forecastCard: {
    borderRadius: 24,
    padding: 20,
    marginRight: 16,
    alignItems: "center",
    minWidth: 140,
    borderWidth: 2,
    borderColor: "rgba(102, 126, 234, 0.2)",
    shadowColor: "#667eea",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 12,
  },

  forecastDay: {
    fontSize: 14,
    fontWeight: "800",
    color: "#667eea",
    marginBottom: 16,
    textTransform: "uppercase",
    letterSpacing: 1.2,
    backgroundColor: "rgba(102, 126, 234, 0.1)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    textAlign: "center",
    borderWidth: 1,
    borderColor: "rgba(102, 126, 234, 0.2)",
  },

  forecastIconContainer: {
    backgroundColor: "rgba(102, 126, 234, 0.15)",
    borderRadius: 20,
    padding: 18,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "rgba(102, 126, 234, 0.2)",
  },

  forecastTempContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: "rgba(102, 126, 234, 0.05)",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(102, 126, 234, 0.1)",
  },

  tempHighContainer: {
    alignItems: "center",
    flex: 1,
  },

  tempLowContainer: {
    alignItems: "center",
    flex: 1,
  },

  tempDivider: {
    width: 1,
    height: 32,
    backgroundColor: "rgba(102, 126, 234, 0.2)",
    marginHorizontal: 12,
  },

  tempLabel: {
    fontSize: 10,
    fontWeight: "700",
    color: "#667eea",
    marginBottom: 4,
    letterSpacing: 0.8,
    textTransform: "uppercase",
  },

  forecastMaxTemp: {
    fontSize: 20,
    fontWeight: "900",
    color: "#2d3436",
  },

  forecastMinTemp: {
    fontSize: 18,
    fontWeight: "700",
    color: "#636e72",
  },

  conditionContainer: {
    backgroundColor: "rgba(102, 126, 234, 0.1)",
    borderRadius: 16,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "rgba(102, 126, 234, 0.2)",
  },

  forecastCondition: {
    fontSize: 12,
    color: "#667eea",
    fontWeight: "700",
    textAlign: "center",
    lineHeight: 14,
    letterSpacing: 0.3,
    textTransform: "uppercase",
  },

  forecastDetailsContainer: {
    width: "100%",
    alignItems: "center",
    gap: 8,
  },

  precipitationContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(102, 126, 234, 0.1)",
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: "rgba(102, 126, 234, 0.2)",
  },

  forecastPrecip: {
    fontSize: 12,
    color: "#667eea",
    marginLeft: 6,
    fontWeight: "700",
  },

  windContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(118, 75, 162, 0.1)",
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: "rgba(118, 75, 162, 0.2)",
  },

  forecastWind: {
    fontSize: 12,
    color: "#764ba2",
    marginLeft: 6,
    fontWeight: "700",
  },
});
