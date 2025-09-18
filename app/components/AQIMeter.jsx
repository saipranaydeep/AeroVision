import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, Text, View } from "react-native";
import Svg, { Path, Text as SvgText } from "react-native-svg";
import { getAQIMeterLevels } from "../utils/aqiUtils";

// Helper function to calculate SVG arc path
const polarToCartesian = (centerX, centerY, radius, angleInDegrees) => {
  const angleInRadians = ((angleInDegrees - 180) * Math.PI) / 180.0;
  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians),
  };
};

const describeArc = (x, y, radius, startAngle, endAngle) => {
  const start = polarToCartesian(x, y, radius, endAngle);
  const end = polarToCartesian(x, y, radius, startAngle);
  const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
  const d = [
    "M",
    start.x,
    start.y,
    "A",
    radius,
    radius,
    0,
    largeArcFlag,
    0,
    end.x,
    end.y,
  ].join(" ");
  return d;
};

const AQIMeter = ({ value = 0, levels, size = 200 }) => {
  // Use standardized AQI levels if none provided
  const aqiLevels = levels || getAQIMeterLevels();
  const needleRotation = useRef(new Animated.Value(0)).current;
  const gaugeRadius = size / 2;
  const center = size / 2;
  const arcRadius = gaugeRadius - 40; // Radius for the colored arc
  const boundaryRadius = gaugeRadius - 20; // Radius for the boundary circle
  const numberRadius = gaugeRadius - 5; // Radius for numbers (closer to edge for full visibility)

  const totalMax = aqiLevels[aqiLevels.length - 1].max;

  useEffect(() => {
    const rotationDegree = (Math.min(value, totalMax) / totalMax) * 180;
    Animated.timing(needleRotation, {
      toValue: rotationDegree,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [value, totalMax, needleRotation]);

  const needleTransformStyle = {
    transform: [
      {
        rotate: needleRotation.interpolate({
          inputRange: [0, 180],
          outputRange: ["-90deg", "90deg"], // Start from left (-90°) to right (90°)
        }),
      },
    ],
  };

  // Function to calculate position for numbers (adjusted for better visibility at edges)
  const getNumberPosition = (angle) => {
    const radian = ((angle - 180) * Math.PI) / 180;
    // Add offset for edge numbers to be fully visible
    let xOffset = 0;
    if (angle === 0) xOffset = 8; // Move 0 slightly right
    if (angle === 180) xOffset = -8; // Move 400 slightly left

    return {
      x: center + numberRadius * Math.cos(radian) + xOffset,
      y: center + numberRadius * Math.sin(radian) + 8, // Increased vertical offset
    };
  };

  // AQI values to display
  const aqiNumbers = [0, 50, 100, 150, 200, 300, 400];

  let accumulatedMax = 0;

  return (
    <View style={[styles.gauge, { width: size, height: gaugeRadius }]}>
      <Svg width={size} height={gaugeRadius} style={styles.svg}>
        {/* Outer boundary arc */}
        <Path
          d={describeArc(center, center, boundaryRadius, 0, 180)}
          stroke="#ddd"
          strokeWidth={3}
          fill="none"
        />

        {/* Add tick marks for major values */}
        {aqiNumbers.map((number) => {
          const angle = (number / totalMax) * 180;
          const radian = ((angle - 180) * Math.PI) / 180;
          const innerRadius = boundaryRadius - 8;
          const outerRadius = boundaryRadius + 8;

          const innerX = center + innerRadius * Math.cos(radian);
          const innerY = center + innerRadius * Math.sin(radian);
          const outerX = center + outerRadius * Math.cos(radian);
          const outerY = center + outerRadius * Math.sin(radian);

          return (
            <Path
              key={`tick-${number}`}
              d={`M ${innerX} ${innerY} L ${outerX} ${outerY}`}
              stroke="#666"
              strokeWidth={2}
            />
          );
        })}

        {/* Render colored arcs */}
        {aqiLevels.map((level, index) => {
          const startAngle = (accumulatedMax / totalMax) * 180;
          const endAngle = (level.max / totalMax) * 180;
          accumulatedMax = level.max;

          return (
            <Path
              key={level.name}
              d={describeArc(center, center, arcRadius, startAngle, endAngle)}
              stroke={level.color}
              strokeWidth={45} // Much thicker colored band
              fill="none"
            />
          );
        })}

        {/* Render AQI numbers outside the boundary */}
        {aqiNumbers.map((number) => {
          const angle = (number / totalMax) * 180;
          const position = getNumberPosition(angle);

          return (
            <SvgText
              key={number}
              x={position.x}
              y={position.y}
              textAnchor="middle"
              fontSize={size * 0.055}
              fill="#444"
              fontWeight="700"
              stroke="#fff"
              strokeWidth="0.5"
            >
              {number}
            </SvgText>
          );
        })}
      </Svg>

      {/* Center area with AQI value display */}
      <View
        style={[
          styles.gaugeCenter,
          { width: "45%", height: "45%", right: "27.5%" }, // Smaller center area
        ]}
      >
        <Text style={[styles.valueText, { fontSize: size * 0.12 }]}>
          {Math.round(value)}
        </Text>
        {/* <Text style={[styles.labelText, { fontSize: size * 0.06 }]}>
          {label}
        </Text> */}
      </View>

      {/* Enhanced needle */}
      <Animated.View
        style={[
          styles.needleContainer,
          {
            left: center - 1, // Center the needle container (width is 2, so offset by half)
            bottom: 0, // Position at the bottom edge of the gauge
            width: 2,
            height: gaugeRadius * 0.7, // Adjusted for thicker color bands
          },
          needleTransformStyle,
        ]}
      >
        <View style={styles.needle} />
      </Animated.View>

      {/* Needle center hub */}
      <View
        style={[
          styles.needleHub,
          {
            width: size * 0.05,
            height: size * 0.05,
            borderRadius: size * 0.025,
            left: center - size * 0.025, // Center the hub horizontally
            bottom: -size * 0.025, // Center the hub vertically at the bottom
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  gauge: {
    backgroundColor: "#f0f0f0",
    borderRadius: 200,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    position: "relative",
    overflow: "hidden",
    shadowColor: "rgba(0, 0, 0, 0.15)",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 10,
  },
  svg: {
    position: "absolute",
    top: 0,
    left: 0,
  },
  gaugeCenter: {
    backgroundColor: "#1a1a1a",
    borderTopLeftRadius: 200,
    borderTopRightRadius: 200,
    position: "absolute",
    bottom: 0,
    shadowColor: "rgba(0, 0, 0, 0.3)",
    shadowOffset: { width: 0, height: -8 },
    shadowOpacity: 1,
    shadowRadius: 12,
    elevation: 8,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 15,
  },
  valueText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "800",
    marginBottom: -5,
  },
  labelText: {
    color: "#ccc",
    textAlign: "center",
    fontWeight: "500",
  },
  needleContainer: {
    position: "absolute",
    transformOrigin: "1px 100%", // Pivot from bottom center
  },
  needle: {
    position: "absolute",
    width: 4,
    height: "100%",
    backgroundColor: "#d32f2f",
    borderTopLeftRadius: 2,
    borderTopRightRadius: 2,
    shadowColor: "rgba(211, 47, 47, 0.6)",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 3,
    elevation: 8,
  },
  needleHub: {
    position: "absolute",
    backgroundColor: "#333",
    borderColor: "#d32f2f",
    borderWidth: 2,
    shadowColor: "rgba(0, 0, 0, 0.4)",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 3,
    elevation: 6,
  },
});

export default AQIMeter;
