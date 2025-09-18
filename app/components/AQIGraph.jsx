import PropTypes from "prop-types";
import React, { useCallback, useMemo, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { LineChart } from "react-native-chart-kit";
import { getAllAQILevels, getAQILevel } from "../utils/aqiUtils";

// Use centralized AQI levels
const aqiLevels = getAllAQILevels().map((level) => ({
  max: level.max === Infinity ? 400 : level.max, // Cap infinity for display
  color: level.color,
  label: level.name,
}));

const getAqiInfo = (aqiValue) => {
  return getAQILevel(aqiValue);
};
const screenWidth = Dimensions.get("window").width;

const AQIGraph = ({ data, isLoading, pollutant }) => {
  const [tooltip, setTooltip] = useState(null);

  const chartConfigAndData = useMemo(() => {
    if (!data || data.length === 0) {
      return null;
    }

    const labels = data.map((item) => {
      const d = new Date(item.date);
      return `${d.getMonth() + 1}/${d.getDate()}`;
    });
    const aqiValues = data.map((item) => item.aqi);

    const chartData = {
      labels,
      datasets: [
        {
          data: aqiValues,
          color: (opacity = 1) => `rgba(102, 126, 234, ${opacity})`, // Changed to theme color
          strokeWidth: 3, // Slightly thicker line
        },
      ],
    };

    // Use a gradient background matching the app theme
    const chartBackgroundColor = "#667eea";
    const chartBackgroundColorTo = "#764ba2";

    const chartConfig = {
      backgroundColor: chartBackgroundColor,
      backgroundGradientFrom: chartBackgroundColor,
      backgroundGradientTo: chartBackgroundColorTo, // Added gradient
      decimalPlaces: 0,
      color: (opacity = 1) => `rgba(255, 255, 255, ${opacity * 0.9})`, // Better contrast
      labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      style: {
        borderRadius: 16,
      },
      propsForDots: {
        r: "6", // Dot radius
        strokeWidth: "2",
        stroke: "#fff", // A white border to make the colored dots pop
      },
      propsForBackgroundLines: {
        stroke: "rgba(255, 255, 255, 0.2)",
      },
    };

    return { chartData, chartConfig };
  }, [data]);

  const handleDataPointClick = useCallback(
    (dataPoint) => {
      if (tooltip && tooltip.index === dataPoint.index) {
        setTooltip(null);
      } else {
        setTooltip({
          x: dataPoint.x,
          y: dataPoint.y,
          value: dataPoint.value,
          index: dataPoint.index,
          date: chartConfigAndData.chartData.labels[dataPoint.index],
        });
      }
    },
    [tooltip, chartConfigAndData]
  );

  if (isLoading) {
    return (
      <View
        style={[
          styles.centeredContainer,
          {
            backgroundColor: "#667eea",
            backgroundGradient: ["#667eea", "#764ba2"],
          },
        ]}
      >
        <ActivityIndicator size="large" color="#FFFFFF" />
        <Text style={[styles.infoText, { color: "white" }]}>
          Loading AQI Data...
        </Text>
      </View>
    );
  }

  if (!chartConfigAndData) {
    return (
      <View
        style={[
          styles.centeredContainer,
          {
            backgroundColor: "#667eea",
            backgroundGradient: ["#667eea", "#764ba2"],
          },
        ]}
      >
        <Text style={[styles.infoText, { color: "white" }]}>
          No AQI data available.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Enhanced header with accent and icon */}
      <View style={styles.headerContainer}>
        <View style={styles.headerAccent} />
        <View style={styles.headerContent}>
          <Text style={styles.graphHeader}>AQI Trend of {pollutant}</Text>
          <Text style={styles.graphSubtitle}>Air Quality Index Forecast</Text>
        </View>
      </View>
      <LineChart
        data={chartConfigAndData.chartData}
        width={screenWidth * 0.95}
        height={250}
        chartConfig={chartConfigAndData.chartConfig}
        bezier
        style={styles.chartStyle}
        onDataPointClick={handleDataPointClick}
        // This prop provides the color for each individual dot
        getDotColor={(dataPoint, dataPointIndex) => getAqiInfo(dataPoint).color}
        decorator={() => {
          if (!tooltip) return null;
          return (
            <View
              style={[
                styles.tooltip,
                { left: tooltip.x - 40, top: tooltip.y - 50 },
              ]}
            >
              <Text style={styles.tooltipText}>AQI: {tooltip.value}</Text>
              <Text style={styles.tooltipText}>Date: {tooltip.date}</Text>
            </View>
          );
        }}
        segments={4}
        fromZero
      />
    </View>
  );
};

AQIGraph.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.string.isRequired,
      aqi: PropTypes.number.isRequired,
    })
  ),
  isLoading: PropTypes.bool,
};

AQIGraph.defaultProps = {
  data: [],
  isLoading: false,
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 15,
    alignItems: "center",
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    paddingHorizontal: 16,
    width: "100%",
  },
  headerAccent: {
    width: 4,
    height: 40,
    backgroundColor: "#667eea",
    borderRadius: 2,
    marginRight: 12,
  },
  headerContent: {
    flex: 1,
  },
  graphHeader: {
    fontSize: 24,
    fontWeight: "800",
    color: "#2d3436",
    letterSpacing: -0.5,
  },
  graphSubtitle: {
    fontSize: 14,
    fontWeight: "500",
    color: "#667eea",
    marginTop: 2,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  chartStyle: {
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  centeredContainer: {
    height: 250,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 16,
    width: screenWidth * 0.95,
  },
  infoText: {
    color: "#2d3436", // Changed from white to dark color for visibility
    fontSize: 16,
    marginTop: 10,
  },
  tooltip: {
    position: "absolute",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    padding: 8,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.5)",
  },
  tooltipText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
});

export default AQIGraph;
