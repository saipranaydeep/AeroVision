import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Location from "expo-location";
import { useEffect, useState } from "react";
import {
  Alert,
  RefreshControl,
  ScrollView,
  StatusBar,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { fetchAirQualityData, weatherDetails } from "./api/API";
import BarLoader from "./components/BarLoader";
import ErrorPopup from "./components/ErrorPopup";
import { useLanguage } from "./contexts/LanguageContext";
import { useLoading } from "./contexts/LoadingContext";
import Navbar from "./navbar/Navbar";
import TabBar from "./tabs/TabBar";
import { getTranslation } from "./utils/translations";

export default function Index() {
  const { selectedLanguage } = useLanguage();
  const { isCityLoading, setCityLoading } = useLoading();
  const t = (key) => getTranslation(key, selectedLanguage);
  const [city, setCity] = useState("Indore");
  const [airQualityData, setAirQualityData] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [locationPermission, setLocationPermission] = useState(null);

  const getCacheKey = (cityName, dataType) => `${dataType}_${cityName}`;

  // Get city name from coordinates using reverse geocoding
  const getCityFromCoordinates = async (latitude, longitude) => {
    try {
      const [location] = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });

      return (
        location.city ||
        location.district ||
        location.subregion ||
        location.region ||
        t("unknownLocation")
      );
    } catch (error) {
      console.error("Error getting city from coordinates:", error);
      return t("unknownLocation");
    }
  };

  // Request location permission and get current location
  const getCurrentLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      setLocationPermission(status);

      if (status !== "granted") {
        Alert.alert(
          "Location Permission",
          "Location permission is required to detect your current city automatically.",
          [{ text: "OK", style: "default" }]
        );
        return null;
      }

      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });

      const { latitude, longitude } = location.coords;
      const detectedCity = await getCityFromCoordinates(latitude, longitude);

      // console.log(
      //   `Location detected: ${detectedCity} (${latitude}, ${longitude})`
      // );
      return detectedCity;
    } catch (error) {
      console.error("Error getting current location:", error);
      const locationError = new Error(
        "Unable to get your current location. Using default city."
      );
      locationError.code = "LOCATION_ERROR";
      setError(locationError);
      setShowErrorPopup(true);
      return null;
    }
  };

  // Initialize location detection
  const initializeLocation = async () => {
    const detectedCity = await getCurrentLocation();
    if (detectedCity && detectedCity !== "Unknown Location") {
      setCity(detectedCity);
      return detectedCity;
    }
    return city;
  };

  const loadCachedData = async (cityName) => {
    try {
      const airQualityCacheKey = getCacheKey(cityName, "airQuality");
      const weatherCacheKey = getCacheKey(cityName, "weather");

      const [cachedAirData, cachedWeatherData] = await Promise.all([
        AsyncStorage.getItem(airQualityCacheKey),
        AsyncStorage.getItem(weatherCacheKey),
      ]);

      if (cachedAirData) {
        setAirQualityData(JSON.parse(cachedAirData));
      }
      if (cachedWeatherData) {
        setWeatherData(JSON.parse(cachedWeatherData));
      }

      return {
        hasAirData: !!cachedAirData,
        hasWeatherData: !!cachedWeatherData,
      };
    } catch (err) {
      console.error("Error loading cached data:", err);
      return { hasAirData: false, hasWeatherData: false };
    }
  };

  const cacheData = async (cityName, airData, weatherInfo) => {
    try {
      const airQualityCacheKey = getCacheKey(cityName, "airQuality");
      const weatherCacheKey = getCacheKey(cityName, "weather");

      await Promise.all([
        AsyncStorage.setItem(airQualityCacheKey, JSON.stringify(airData)),
        AsyncStorage.setItem(weatherCacheKey, JSON.stringify(weatherInfo)),
      ]);
    } catch (err) {
      console.error("Error caching data:", err);
    }
  };

  const fetchData = async (
    cityName,
    isRefreshing = false,
    showLoading = true
  ) => {
    try {
      if (isRefreshing) {
        setRefreshing(true);
      } else if (showLoading) {
        setLoading(true);
        setCityLoading(true); // Start city loading
      }
      setError(null);
      setShowErrorPopup(false); // Clear error popup when starting new fetch

      const [airData, weatherInfo] = await Promise.all([
        fetchAirQualityData(cityName),
        weatherDetails(cityName),
      ]);

      setAirQualityData(airData);
      setWeatherData(weatherInfo);

      await cacheData(cityName, airData, weatherInfo);

      // Ensure error is cleared on successful fetch
      setError(null);
      setShowErrorPopup(false);
    } catch (err) {
      console.error("Error fetching data:", err);
      setError(err);
      setShowErrorPopup(true);
    } finally {
      setLoading(false);
      setRefreshing(false);
      setCityLoading(false); // End city loading
    }
  };

  const onRefresh = () => {
    setError(null);
    setShowErrorPopup(false);
    fetchData(city, true);
  };

  const handleErrorRetry = () => {
    setError(null);
    setShowErrorPopup(false);
    fetchData(city, false, true);
  };

  const handleErrorDismiss = () => {
    setShowErrorPopup(false);
  };

  const handleUseCurrentLocation = async () => {
    try {
      const detectedCity = await getCurrentLocation();
      if (detectedCity && detectedCity !== t("unknownLocation")) {
        setCity(detectedCity);
        // Optionally show a success message
        console.log(`Location updated to: ${detectedCity}`);
      } else {
        throw new Error("Could not detect current location");
      }
    } catch (error) {
      console.error("Error getting current location:", error);
      const locationError = new Error(
        "Unable to get your current location. Please check permissions and try again."
      );
      locationError.code = "LOCATION_ERROR";
      setError(locationError);
      setShowErrorPopup(true);
    }
  };

  useEffect(() => {
    const initializeData = async () => {
      const cacheResult = await loadCachedData(city);

      if (!cacheResult.hasAirData && !cacheResult.hasWeatherData) {
        await fetchData(city, false, true);
      } else {
        // Even with cached data, we want to show loading when city changes
        setCityLoading(true);
        await fetchData(city, false, false);
        setCityLoading(false);
      }
    };

    initializeData();
  }, [city]);

  useEffect(() => {
    const initializeApp = async () => {
      const detectedCity = await getCurrentLocation();
      if (detectedCity && detectedCity !== "Unknown Location") {
        setCity(detectedCity);
      }
    };

    initializeApp();
  }, []);

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.container}>
        <Navbar
          city={city}
          setCity={setCity}
          onUseCurrentLocation={handleUseCurrentLocation}
        />
        <BarLoader isVisible={isCityLoading} />
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={["#4a90e2"]}
              tintColor={"#4a90e2"}
              progressBackgroundColor={"#f0f0f0"}
            />
          }
          showsVerticalScrollIndicator={false}
        >
          <TabBar
            airQualityData={airQualityData}
            weatherData={weatherData}
            loading={loading}
            error={error}
            city={city}
          />
        </ScrollView>

        {/* Error Popup */}
        <ErrorPopup
          visible={showErrorPopup}
          error={error}
          onRetry={handleErrorRetry}
          onDismiss={handleErrorDismiss}
        />
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 20,
  },
});
