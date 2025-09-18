import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, View } from "react-native";

const BarLoader = ({ isVisible = false, color = "#667eea" }) => {
  const animatedWidth = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isVisible) {
      // Start the loading animation
      const startAnimation = () => {
        Animated.sequence([
          Animated.timing(animatedWidth, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: false,
          }),
          Animated.timing(animatedWidth, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: false,
          }),
        ]).start((finished) => {
          if (finished && isVisible) {
            startAnimation(); // Loop the animation
          }
        });
      };
      startAnimation();
    } else {
      // Reset animation when not visible
      animatedWidth.setValue(0);
    }
  }, [isVisible, animatedWidth]);

  if (!isVisible) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.track}>
        <Animated.View
          style={[
            styles.bar,
            {
              backgroundColor: color,
              width: animatedWidth.interpolate({
                inputRange: [0, 1],
                outputRange: ["0%", "100%"],
              }),
            },
          ]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 4,
    backgroundColor: "transparent",
    zIndex: 10, // Lower than suggestions
  },
  track: {
    flex: 1,
    backgroundColor: "rgba(102, 126, 234, 0.1)",
    overflow: "hidden",
  },
  bar: {
    height: "100%",
    borderRadius: 2,
  },
});

export default BarLoader;
