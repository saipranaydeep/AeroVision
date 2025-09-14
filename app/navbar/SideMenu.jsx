import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { useLanguage } from "../contexts/LanguageContext";
import { getTranslation } from "../utils/translations";

const SideMenu = () => {
  const { selectedLanguage, changeLanguage } = useLanguage();

  const languageOptions = [
    { label: getTranslation("english", selectedLanguage), value: "en" },
    { label: getTranslation("hindi", selectedLanguage), value: "hi" },
  ];

  const t = (key) => getTranslation(key, selectedLanguage);

  return (
    <View style={styles.container}>
      <Text style={styles.appTitle}>{t("appName")}</Text>
      <Text style={styles.appDescription}>{t("appDescription")}</Text>

      <View style={styles.languageSection}>
        <Text style={styles.sectionLabel}>{t("language")}</Text>
        <Dropdown
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          data={languageOptions}
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={t("language")}
          value={selectedLanguage}
          onChange={(item) => {
            changeLanguage(item.value);
          }}
        />
      </View>

      <Text style={styles.menuItem}>{t("needHelp")}</Text>
      <Text style={styles.menuItem}>{t("faq")}</Text>
      <Text style={styles.menuItem}>{t("whatIsAeroVision")}</Text>
      <Text style={styles.menuItem}>{t("whatIsAqi")}</Text>
      <Text style={styles.menuItem}>{t("whatIsPm25")}</Text>
      <Text style={styles.version}>{t("version")}</Text>
    </View>
  );
};
// };

export default SideMenu;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
    flex: 1,
  },
  appTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#333",
  },
  appDescription: {
    fontSize: 16,
    color: "#666",
    marginBottom: 20,
  },
  languageSection: {
    marginBottom: 20,
  },
  sectionLabel: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 10,
    color: "#333",
  },
  dropdown: {
    height: 50,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: "#f9f9f9",
  },
  placeholderStyle: {
    fontSize: 16,
    color: "#999",
  },
  selectedTextStyle: {
    fontSize: 16,
    color: "#333",
  },
  menuItem: {
    fontSize: 16,
    paddingVertical: 12,
    color: "#333",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  version: {
    fontSize: 14,
    color: "#999",
    marginTop: 20,
    textAlign: "center",
  },
});
