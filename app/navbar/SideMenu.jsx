import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React, { useMemo, useState } from "react";
import {
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { useLanguage } from "../contexts/LanguageContext";
import { getTranslation } from "../utils/translations";

const SideMenu = ({ onClose }) => {
  const { selectedLanguage, changeLanguage } = useLanguage();
  const [expandedSections, setExpandedSections] = useState({});
  const [activeDropdown, setActiveDropdown] = useState(false);

  const languageOptions = useMemo(
    () => [
      { label: getTranslation("english", selectedLanguage), value: "en" },
      { label: getTranslation("hindi", selectedLanguage), value: "hi" },
    ],
    [selectedLanguage]
  );

  const faqSections = useMemo(
    () => [
      {
        title: getTranslation("whatIsAeroVision", selectedLanguage),
        content: getTranslation("whatIsAeroVisionContent", selectedLanguage),
      },
      {
        title: getTranslation("whatIsAqi", selectedLanguage),
        content: getTranslation("whatIsAqiContent", selectedLanguage),
      },
      {
        title: getTranslation("whatIsPm25", selectedLanguage),
        content: getTranslation("whatIsPm25Content", selectedLanguage),
      },
      {
        title: getTranslation("howIsAqiCalculated", selectedLanguage),
        content: getTranslation("howIsAqiCalculatedContent", selectedLanguage),
      },
      {
        title: getTranslation(
          "howDoesAirQualityAffectHealth",
          selectedLanguage
        ),
        content: getTranslation(
          "howDoesAirQualityAffectHealthContent",
          selectedLanguage
        ),
      },
      {
        title: getTranslation("whatAreAqiCategories", selectedLanguage),
        content: getTranslation(
          "whatAreAqiCategoriesContent",
          selectedLanguage
        ),
      },
    ],
    [selectedLanguage]
  );

  const toggleSection = (index) => {
    setExpandedSections((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const handleContactSupport = () => {
    Linking.openURL(`mailto:kuldeeprautela007@gmail.com?subject=Help Request`);
  };

  return (
    <LinearGradient colors={["#f8f9ff", "#e8f0ff"]} style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Header with close button */}
        <LinearGradient
          colors={["#667eea", "#764ba2"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.header}
        >
          <View style={styles.headerRow}>
            <View style={styles.titleContainer}>
              <Text style={styles.appTitle}>
                {getTranslation("appName", selectedLanguage)}
              </Text>
              <Text style={styles.appDescription}>
                {getTranslation("appDescription", selectedLanguage)}
              </Text>
            </View>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={onClose}
              activeOpacity={0.7}
            >
              <Feather name="x" size={24} color="white" />
            </TouchableOpacity>
          </View>
        </LinearGradient>

        {/* Language Selector */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>
            {getTranslation("language", selectedLanguage)}
          </Text>
          <Dropdown
            style={[styles.dropdown, activeDropdown && styles.dropdownActive]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            data={languageOptions}
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={getTranslation("selectLanguage", selectedLanguage)}
            value={selectedLanguage}
            onChange={(item) => changeLanguage(item.value)}
            onFocus={() => setActiveDropdown(true)}
            onBlur={() => setActiveDropdown(false)}
            renderItem={(item) => (
              <View style={styles.dropdownItem}>
                <Text style={styles.dropdownItemText}>{item.label}</Text>
              </View>
            )}
          />
        </View>

        {/* FAQ Section */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>
            {getTranslation("frequentlyAskedQuestions", selectedLanguage)}
          </Text>
          {faqSections.map((faq, index) => (
            <View key={index} style={styles.faqItem}>
              <TouchableOpacity
                style={styles.faqHeader}
                onPress={() => toggleSection(index)}
                activeOpacity={0.7}
              >
                <Text style={styles.faqQuestion}>{faq.title}</Text>
                <Feather
                  name={expandedSections[index] ? "chevron-up" : "chevron-down"}
                  size={20}
                  color="#667eea"
                />
              </TouchableOpacity>
              {expandedSections[index] && (
                <View style={styles.faqContent}>
                  <Text style={styles.faqAnswer}>{faq.content}</Text>
                </View>
              )}
            </View>
          ))}
        </View>

        {/* Support Section */}
        <View style={styles.section}>
          <TouchableOpacity
            style={styles.supportButton}
            onPress={handleContactSupport}
            activeOpacity={0.7}
          >
            <Feather
              name="help-circle"
              size={20}
              color="#fff"
              style={styles.supportIcon}
            />
            <Text style={styles.supportButtonText}>
              {getTranslation("needHelpContact", selectedLanguage)}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Version Info */}
        <View style={styles.versionContainer}>
          <Text style={styles.version}>
            {getTranslation("version", selectedLanguage)}
          </Text>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

export default SideMenu;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: 300,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: 20,
    paddingTop: 40,
    marginBottom: 15,
    borderBottomLeftRadius: 12, // Reduced border radius
    borderBottomRightRadius: 12, // Reduced border radius
    shadowColor: "#667eea",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  titleContainer: {
    flex: 1,
  },
  appTitle: {
    fontSize: 26,
    fontWeight: "900",
    color: "white",
    marginBottom: 5,
  },
  appDescription: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.9)",
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
  },
  section: {
    backgroundColor: "white",
    marginHorizontal: 15,
    marginBottom: 15,
    borderRadius: 12,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  sectionLabel: {
    fontSize: 16,
    fontWeight: "700",
    color: "#667eea",
    marginBottom: 12,
  },
  dropdown: {
    height: 50,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 12,
    backgroundColor: "#f9f9f9",
  },
  dropdownActive: {
    borderColor: "#667eea",
    borderWidth: 1.5,
  },
  placeholderStyle: {
    fontSize: 14,
    color: "#999",
  },
  selectedTextStyle: {
    fontSize: 14,
    color: "#333",
  },
  dropdownItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  dropdownItemText: {
    fontSize: 14,
    color: "#333",
  },
  faqItem: {
    marginBottom: 10,
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: "#f8f9ff",
  },
  faqHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 12,
  },
  faqQuestion: {
    flex: 1,
    fontSize: 14,
    fontWeight: "500",
    color: "#333",
    marginRight: 10,
  },
  faqContent: {
    padding: 12,
    paddingTop: 0,
    backgroundColor: "#fff",
  },
  faqAnswer: {
    fontSize: 13,
    color: "#666",
    lineHeight: 20,
  },
  supportButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#667eea",
    padding: 12,
    borderRadius: 10,
    marginTop: 5,
  },
  supportIcon: {
    marginRight: 8,
  },
  supportButtonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "600",
  },
  versionContainer: {
    alignItems: "center",
    marginVertical: 20,
  },
  version: {
    fontSize: 12,
    color: "#999",
  },
});
