import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useLanguage } from "../contexts/LanguageContext";
import { formatTimestamp } from "../utils/aqiUtils";
import { getTranslation } from "../utils/translations";

const TimestampDisplay = ({ fetchedAt, style = {} }) => {
  const { selectedLanguage } = useLanguage();
  const t = (key) => getTranslation(key, selectedLanguage);

  // Only show timestamp if fetchedAt is actually provided
  if (!fetchedAt) {
    return null;
  }

  const timestampText = formatTimestamp(fetchedAt, selectedLanguage, t);

  // If formatting fails, don't show anything
  if (!timestampText) {
    return null;
  }

  return (
    <LinearGradient
      colors={["#f8fafc", "#e2e8f0"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[styles.container, style]}
    >
      <View style={styles.content}>
        <Feather name="clock" size={16} color="#64748b" style={styles.icon} />
        <Text style={styles.timestampText}>{timestampText}</Text>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    marginBottom: 10,
    borderRadius: 12,
    padding: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    marginRight: 8,
  },
  timestampText: {
    fontSize: 14,
    color: "#475569",
    fontWeight: "500",
    textAlign: "center",
  },
});

export default TimestampDisplay;
