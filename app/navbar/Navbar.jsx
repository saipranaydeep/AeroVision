import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React, { useCallback, useMemo, useState } from "react";
import {
  FlatList,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Modal from "react-native-modal";
import { useLanguage } from "../contexts/LanguageContext";
import { getCityTranslation, getTranslation } from "../utils/translations";
import SideMenu from "./SideMenu";

// City suggestions
const CITY_SUGGESTIONS = [
  "Indore",
  "Bhopal",
  "Jabalpur",
  "Gwalior",
  "Ujjain",
  "Sagar",
  "Dewas",
  "Satna",
  "Ratlam",
  "Rewa",
];

const Navbar = ({ city, setCity, onUseCurrentLocation }) => {
  const [searchCity, setSearchCity] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isLocationLoading, setIsLocationLoading] = useState(false);
  const { selectedLanguage } = useLanguage();

  const t = useCallback(
    (key) => getTranslation(key, selectedLanguage),
    [selectedLanguage]
  );
  const translateCity = useCallback(
    (cityName) => getCityTranslation(cityName, selectedLanguage),
    [selectedLanguage]
  );

  const appName = useMemo(() => t("appName") || "AeroVision", [t]);
  const searchPlaceholder = useMemo(
    () => t("searchPlaceholder") || "Search city...",
    [t]
  );
  const useCurrentLocationText = useMemo(
    () => t("useCurrentLocation") || "Use current location",
    [t]
  );
  const gettingLocationText = useMemo(
    () => t("gettingLocation") || "Getting location...",
    [t]
  );

  const currentCityLabel = useMemo(() => t("currentCity") || "Current", [t]);
  const translatedCity = useMemo(
    () => translateCity(city) || city,
    [translateCity, city]
  );

  // Filter suggestions based on search input
  const filteredSuggestions = useMemo(() => {
    const suggestions = [];

    // Always show "Use current location" option as the first item
    suggestions.push({
      type: "current-location",
      text: useCurrentLocationText,
    });

    // Filter city suggestions based on search input
    if (!searchCity.trim()) {
      suggestions.push(
        ...CITY_SUGGESTIONS.map((city) => ({ type: "city", text: city }))
      );
    } else {
      const filtered = CITY_SUGGESTIONS.filter((suggestion) =>
        suggestion.toLowerCase().includes(searchCity.toLowerCase())
      );
      suggestions.push(
        ...filtered.map((city) => ({ type: "city", text: city }))
      );
    }

    return suggestions;
  }, [searchCity, useCurrentLocationText]);

  const handleSearch = useCallback(() => {
    const trimmedCity = searchCity.trim();
    if (trimmedCity) {
      Keyboard.dismiss(); // Dismiss keyboard
      setCity(trimmedCity);
      setSearchCity("");
      setShowSuggestions(false);
    }
  }, [searchCity, setCity]);

  const handleSuggestionPress = useCallback(
    (suggestion) => {
      // console.log("Suggestion pressed:", suggestion);
      Keyboard.dismiss(); // Dismiss keyboard
      setCity(suggestion);
      setSearchCity("");
      setShowSuggestions(false);
      setIsSearchFocused(false);
    },
    [setCity]
  );

  const handleCurrentLocationPress = useCallback(async () => {
    if (onUseCurrentLocation) {
      Keyboard.dismiss(); // Dismiss keyboard
      setIsLocationLoading(true);
      setShowSuggestions(false);
      setIsSearchFocused(false);
      try {
        await onUseCurrentLocation();
      } catch (error) {
        console.error("Error getting current location:", error);
      } finally {
        setIsLocationLoading(false);
      }
    }
  }, [onUseCurrentLocation]);

  const clearSearch = useCallback(() => {
    setSearchCity("");
    setShowSuggestions(false);
  }, []);
  const toggleMenu = useCallback(() => setIsMenuOpen((prev) => !prev), []);
  const closeMenu = useCallback(() => setIsMenuOpen(false), []);

  const handleFocus = useCallback(() => {
    setIsSearchFocused(true);
    setShowSuggestions(true);
  }, []);

  const handleBlur = useCallback(() => {
    // Delay hiding suggestions to allow for suggestion selection
    // Increased delay to ensure touch events are processed
    setTimeout(() => {
      setIsSearchFocused(false);
      setShowSuggestions(false);
    }, 200);
  }, []);

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#667eea", "#764ba2"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.navbar}
      >
        <View style={styles.topRow}>
          <View style={styles.logoContainer}>
            <LinearGradient
              colors={["#ffffff", "#f0f9ff"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.logoBackground}
            >
              <Text style={styles.logoText}>{appName}</Text>
            </LinearGradient>
          </View>

          <TouchableOpacity
            style={styles.menuButton}
            onPress={toggleMenu}
            activeOpacity={0.7}
            accessibilityLabel="Open menu"
          >
            <Feather name="menu" size={20} color="rgba(255,255,255,0.9)" />
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <View
            style={[
              styles.searchWrapper,
              isSearchFocused && styles.searchWrapperFocused,
            ]}
          >
            <Feather
              name="search"
              size={16}
              color="rgba(255,255,255,0.7)"
              style={styles.searchIcon}
            />
            <TextInput
              value={searchCity}
              onChangeText={setSearchCity}
              onSubmitEditing={handleSearch}
              onFocus={handleFocus}
              onBlur={handleBlur}
              placeholder={searchPlaceholder}
              placeholderTextColor="rgba(255,255,255,0.6)"
              style={styles.searchInput}
              returnKeyType="search"
            />
            {searchCity.length > 0 && (
              <TouchableOpacity
                onPress={clearSearch}
                style={styles.clearButton}
                activeOpacity={0.7}
                accessibilityLabel="Clear search"
              >
                <Feather name="x" size={14} color="rgba(255,255,255,0.7)" />
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* City Suggestions Dropdown */}
        {showSuggestions && filteredSuggestions.length > 0 && (
          <View style={styles.suggestionsContainer}>
            <FlatList
              data={filteredSuggestions}
              keyExtractor={(item, index) => `${item.type}-${index}`}
              showsVerticalScrollIndicator={true}
              style={styles.suggestionsList}
              keyboardShouldPersistTaps="handled" // Ensure taps work while keyboard is open
              nestedScrollEnabled={true} // Enable nested scrolling
              contentContainerStyle={{ paddingVertical: 4 }}
              renderItem={({ item, index }) => (
                <TouchableOpacity
                  style={[
                    styles.suggestionItem,
                    item.type === "current-location" &&
                      styles.currentLocationItem,
                    index === filteredSuggestions.length - 1 &&
                      styles.lastSuggestionItem,
                  ]}
                  onPress={() =>
                    item.type === "current-location"
                      ? handleCurrentLocationPress()
                      : handleSuggestionPress(item.text)
                  }
                  activeOpacity={0.7}
                  disabled={
                    item.type === "current-location" && isLocationLoading
                  }
                >
                  <Feather
                    name={
                      item.type === "current-location"
                        ? "navigation"
                        : "map-pin"
                    }
                    size={14}
                    color={
                      item.type === "current-location" ? "#28a745" : "#667eea"
                    }
                    style={styles.suggestionIcon}
                  />
                  <Text
                    style={[
                      styles.suggestionText,
                      item.type === "current-location" &&
                        styles.currentLocationText,
                    ]}
                  >
                    {item.type === "current-location"
                      ? isLocationLoading
                        ? gettingLocationText
                        : item.text
                      : translateCity(item.text) || item.text}
                  </Text>
                  {item.type === "current-location" && isLocationLoading && (
                    <Feather
                      name="loader"
                      size={14}
                      color="#28a745"
                      style={styles.loadingIcon}
                    />
                  )}
                </TouchableOpacity>
              )}
            />
          </View>
        )}

        {/* Current City Display */}
        <View style={styles.cityContainer}>
          <Feather
            name="map-pin"
            size={14}
            color="rgba(255,255,255,0.8)"
            style={styles.locationIcon}
          />
          <Text style={styles.cityLabel}>{currentCityLabel}:</Text>
          <Text style={styles.cityName} numberOfLines={1} ellipsizeMode="tail">
            {translatedCity}
          </Text>
        </View>
      </LinearGradient>

      {/* Side Menu Modal */}
      <Modal
        isVisible={isMenuOpen}
        onBackdropPress={closeMenu}
        animationIn="slideInRight"
        animationOut="slideOutRight"
        style={styles.modalStyle}
        backdropOpacity={0.5}
        useNativeDriverForBackdrop
        hideModalContentWhileAnimating
      >
        <SideMenu onClose={closeMenu} />
      </Modal>
    </View>
  );
};

export default Navbar;

const styles = StyleSheet.create({
  container: {
    position: "relative",
    zIndex: 20, // Higher than BarLoader
  },
  navbar: {
    paddingTop: 8,
    paddingBottom: 16,
    paddingHorizontal: 20,
    shadowColor: "#667eea",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  logoContainer: {
    borderRadius: 16,
    overflow: "hidden",
  },
  logoBackground: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 12,
  },
  logoText: {
    fontSize: 24,
    fontWeight: "900",
    color: "#667eea",
    letterSpacing: 0.5,
  },
  menuButton: {
    width: 44,
    height: 44,
    borderRadius: 16,
    backgroundColor: "rgba(255,255,255,0.15)",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
  },
  searchContainer: {
    marginBottom: 12,
  },
  searchWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.15)",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
    paddingHorizontal: 16,
    paddingVertical: 4,
    minHeight: 44,
  },
  searchWrapperFocused: {
    backgroundColor: "rgba(255,255,255,0.25)",
    borderColor: "rgba(255,255,255,0.4)",
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    fontWeight: "500",
    color: "white",
  },
  clearButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "rgba(255,255,255,0.1)",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 8,
  },
  suggestionsContainer: {
    position: "absolute",
    top: "100%",
    left: 20,
    right: 20,
    zIndex: 2000, // Higher than BarLoader and container
    backgroundColor: "rgba(255,255,255,0.98)",
    borderRadius: 12,
    marginTop: -8,
    maxHeight: 200, // Increased max height
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 20, // Higher elevation for Android
    borderWidth: 1,
    borderColor: "rgba(103, 126, 234, 0.2)",
  },
  suggestionsList: {
    borderRadius: 12,
    maxHeight: 200, // Ensure scrollability
  },
  suggestionItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(103, 126, 234, 0.1)",
    minHeight: 44, // Ensure touch target is large enough
  },
  lastSuggestionItem: {
    borderBottomWidth: 0, // Remove border from last item
  },
  suggestionIcon: {
    marginRight: 12,
    color: "#667eea",
  },
  suggestionText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#667eea",
    flex: 1,
  },
  currentLocationItem: {
    backgroundColor: "rgba(40, 167, 69, 0.05)",
    borderBottomColor: "rgba(40, 167, 69, 0.2)",
  },
  currentLocationText: {
    color: "#28a745",
    fontWeight: "600",
  },
  loadingIcon: {
    marginLeft: 8,
  },
  cityContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  locationIcon: {
    marginRight: 6,
  },
  cityLabel: {
    fontSize: 13,
    fontWeight: "500",
    color: "rgba(255,255,255,0.8)",
    marginRight: 4,
  },
  cityName: {
    fontSize: 13,
    fontWeight: "600",
    color: "white",
    flexShrink: 1,
  },
  modalStyle: {
    margin: 0,
    justifyContent: "flex-start",
    alignItems: "flex-end",
  },
});
