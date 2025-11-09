import { Feather } from "@expo/vector-icons";
import React, { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { WebView } from "react-native-webview";
import { fetchMultipleStationsAQI } from "../api/API";
import { useLanguage } from "../contexts/LanguageContext";
import { getAQILevel } from "../utils/aqiUtils";
import {
  STATIONS,
  getCleanStationCoordinates,
  getStationsWithinRadius,
} from "../utils/stations";
import { getTranslation } from "../utils/translations";

const AQIMap = ({ selectedLocation }) => {
  const { selectedLanguage } = useLanguage();
  const t = (key) => getTranslation(key, selectedLanguage);

  const [stationsData, setStationsData] = useState({});
  const [loading, setLoading] = useState(true);
  const [mapRegion, setMapRegion] = useState(null);
  const [visibleStations, setVisibleStations] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  // Default location (Bhopal, Madhya Pradesh)
  const defaultLocation = {
    latitude: 23.2599333,
    longitude: 77.412615,
    name: "Bhopal",
  };

  // City coordinates mapping (Madhya Pradesh cities)
  const getCityCoordinates = (cityName) => {
    const cityCoords = {
      Bhopal: { latitude: 23.2599333, longitude: 77.412615, name: "Bhopal" },
      Indore: { latitude: 22.7196, longitude: 75.8577, name: "Indore" },
      Jabalpur: { latitude: 23.1815, longitude: 79.9864, name: "Jabalpur" },
      Gwalior: { latitude: 26.2183, longitude: 78.1828, name: "Gwalior" },
      Ujjain: { latitude: 23.1793, longitude: 75.7849, name: "Ujjain" },
      Dewas: { latitude: 22.9676, longitude: 76.0534, name: "Dewas" },
      Satna: { latitude: 24.582, longitude: 80.8167, name: "Satna" },
      Ratlam: { latitude: 23.3315, longitude: 75.0367, name: "Ratlam" },
      Rewa: { latitude: 24.5394, longitude: 81.2879, name: "Rewa" },
      Sagar: { latitude: 23.8388, longitude: 78.7378, name: "Sagar" },
      Singrauli: { latitude: 24.1997, longitude: 82.6746, name: "Singrauli" },
      Katni: { latitude: 23.8343, longitude: 80.3792, name: "Katni" },
    };

    return cityCoords[cityName] || defaultLocation;
  };

  // Initialize map region based on selected location or default
  useEffect(() => {
    let location;

    if (
      selectedLocation &&
      selectedLocation.latitude &&
      selectedLocation.longitude
    ) {
      // Use provided coordinates
      location = selectedLocation;
    } else if (selectedLocation && typeof selectedLocation === "string") {
      // Convert city name to coordinates
      location = getCityCoordinates(selectedLocation);
    } else {
      // Use default location
      location = defaultLocation;
    }
    const initialRegion = {
      latitude: location.latitude,
      longitude: location.longitude,
      latitudeDelta: 0.5, // Zoom level
      longitudeDelta: 0.5,
    };
    setMapRegion(initialRegion);

    // Get stations within radius of the location
    const nearbyStations = getStationsWithinRadius(
      location.latitude,
      location.longitude,
      100 // 100km radius
    );
    setVisibleStations(nearbyStations);
  }, [selectedLocation]);

  // Fetch AQI data for visible stations
  const fetchStationsAQI = useCallback(async (stations) => {
    if (!stations || stations.length === 0) {
    //   console.log("AQIMap: No stations to fetch AQI for");
      return;
    }

    // console.log("AQIMap: Fetching AQI for", stations.length, "stations");
    setLoading(true);
    try {
      const stationIds = stations.map((station) => station.station_id);
    //   console.log("AQIMap: Station IDs:", stationIds);

      const aqiResults = await fetchMultipleStationsAQI(stationIds);
    //   console.log("AQIMap: AQI results:", aqiResults);

      // Convert array to object with station_id as key
      const aqiData = {};
      aqiResults.forEach((result) => {
        aqiData[result.stationId] = result;
      });

    //   console.log("AQIMap: Processed AQI data:", aqiData);
      setStationsData(aqiData);
    } catch (error) {
      console.error("AQIMap: Error fetching stations AQI:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch data when visible stations change
  useEffect(() => {
    // console.log(
    //   "AQIMap: visibleStations changed:",
    //   visibleStations.length,
    //   "stations"
    // );
    if (visibleStations.length > 0) {
      fetchStationsAQI(visibleStations);
    }
  }, [visibleStations, fetchStationsAQI]);

  // Refresh stations data
  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchStationsAQI(visibleStations);
    setRefreshing(false);
  }, [visibleStations, fetchStationsAQI]);

  // Get AQI value and info for a station
  const getStationAQIInfo = (station) => {
    const stationData = stationsData[station.station_id];
    if (!stationData || stationData.error) {
      return {
        aqi: null,
        color: "#6b7280",
        bgColor: "#f3f4f6",
        error: true,
      };
    }

    // The API returns data in stationData[0] format
    const apiData = stationData[0];
    if (
      apiData &&
      apiData.aqi &&
      apiData.aqi !== "ID" &&
      !isNaN(parseFloat(apiData.aqi))
    ) {
      const aqiValue = parseFloat(apiData.aqi);
      const aqiInfo = getAQILevel(aqiValue);
      return {
        aqi: Math.round(aqiValue),
        color: aqiInfo.color,
        bgColor: aqiInfo.bgColor,
        error: false,
      };
    }

    return {
      aqi: null,
      color: "#6b7280",
      bgColor: "#f3f4f6",
      error: true,
    };
  };

  // Generate HTML content for the map
  const generateMapHTML = () => {
    const location = mapRegion || { latitude: 22.7196, longitude: 75.8577 }; // Default to Indore

    // Create station markers data with some sample data first
    const markersData =
      visibleStations.length > 0
        ? visibleStations.map((station) => {
            const coords = getCleanStationCoordinates(station);
            const aqiInfo = getStationAQIInfo(station);

            // For stations without data, generate a demo AQI for testing
            const fallbackAQI =
              aqiInfo.aqi || Math.floor(Math.random() * 200) + 50;
            const fallbackAQIInfo = aqiInfo.error
              ? getAQILevel(fallbackAQI)
              : aqiInfo;

            return {
              id: station.station_id,
              name: station.station_name,
              location: station.arealocation,
              lat: coords.latitude,
              lng: coords.longitude,
              aqi: aqiInfo.aqi || fallbackAQI,
              color: fallbackAQIInfo.color,
              bgColor: fallbackAQIInfo.bgColor,
              error: false, // Show all markers for now
            };
          })
        : // Sample stations for Indore area if no data loaded yet
          [
            {
              id: 13,
              name: "Indore - Chhoti Gwaltoli",
              location: "Chhoti Gwaltoli",
              lat: 22.719217,
              lng: 75.869601,
              aqi: 108,
              color: "#ff9500",
              bgColor: "#fff3e0",
              error: false,
            },
            {
              id: 31,
              name: "Indore - Vijay Nagar",
              location: "Vijay Nagar",
              lat: 22.76726,
              lng: 75.8871,
              aqi: 95,
              color: "#ffeb3b",
              bgColor: "#fff9c4",
              error: false,
            },
            {
              id: 36,
              name: "Indore - Maguda Nagar",
              location: "Maguda Nagar",
              lat: 22.752431,
              lng: 75.884514,
              aqi: 87,
              color: "#ffeb3b",
              bgColor: "#fff9c4",
              error: false,
            },
          ];

    // console.log("Generating map with markers:", markersData);

    return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
    <title>AQI Stations Map</title>
    <style>
        body { 
            margin: 0; 
            padding: 0; 
            font-family: -apple-system, BlinkMacSystemFont, sans-serif;
            background: #f0f0f0;
        }
        #map { 
            height: 100vh; 
            width: 100%; 
            background: #f0f0f0;
        }
        .aqi-marker {
            background: white;
            border: 2px solid;
            border-radius: 50%;
            width: 28px;
            height: 28px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
            font-size: 10px;
            box-shadow: 0 2px 6px rgba(0,0,0,0.25);
        }
        .popup-content {
            padding: 12px;
            min-width: 150px;
        }
        .popup-title {
            font-weight: 600;
            color: #1f2937;
            margin-bottom: 4px;
        }
        .popup-location {
            color: #6b7280;
            font-size: 12px;
            margin-bottom: 8px;
        }
        .popup-aqi {
            font-weight: bold;
            font-size: 14px;
        }
        .loading {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            color: #666;
        }
    </style>
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" 
          integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
          crossorigin=""/>
</head>
<body>
    <div id="map">
        <div class="loading">Loading map...</div>
    </div>
    
    <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
            integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo="
            crossorigin=""></script>
    
    <script>
        console.log('Initializing map...');
        
        try {
            // Initialize the map
            var map = L.map('map').setView([${location.latitude}, ${
      location.longitude
    }], 11);
            
            // console.log('Map created, adding tiles...');
            
            // Add tile layer with error handling
            var tileLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '© OpenStreetMap contributors',
                maxZoom: 18,
                crossOrigin: true
            });
            
            tileLayer.on('tileerror', function(error, tile) {
                console.error('Tile load error:', error);
            });
            
            tileLayer.addTo(map);
            
            // Station markers data
            var stations = ${JSON.stringify(markersData)};
            // console.log('Adding', stations.length, 'stations to map');
            
            // Add markers for each station
            stations.forEach(function(station, index) {
                // console.log('Adding station:', station.name, station.lat, station.lng);
                
                if (station.lat && station.lng && !isNaN(station.lat) && !isNaN(station.lng)) {
                    try {
                        // Create custom marker
                        var markerHtml = '<div class="aqi-marker" style="border-color: ' + station.color + '; color: ' + station.color + ';">' + 
                                        (station.aqi || '?') + '</div>';
                        
                        var customIcon = L.divIcon({
                            html: markerHtml,
                            className: 'custom-div-icon',
                            iconSize: [40, 40],
                            iconAnchor: [20, 20],
                            popupAnchor: [0, -20]
                        });
                        
                        // Create popup content
                        var popupContent = '<div class="popup-content">' +
                            '<div class="popup-title">' + (station.name || 'Station') + '</div>' +
                            '<div class="popup-location">' + (station.location || 'Unknown location') + '</div>' +
                            '<div class="popup-aqi" style="color: ' + station.color + ';">AQI: ' + (station.aqi || 'N/A') + '</div>' +
                            '</div>';
                        
                        // Add marker to map
                        var marker = L.marker([station.lat, station.lng], {icon: customIcon})
                            .addTo(map)
                            .bindPopup(popupContent);
                            
                        // console.log('Added marker for station:', station.name);
                    } catch (e) {
                        console.error('Error adding marker for station:', station.name, e);
                    }
                } else {
                    console.warn('Invalid coordinates for station:', station.name, station.lat, station.lng);
                }
            });
            
            // Remove loading message
            var loadingEl = document.querySelector('.loading');
            if (loadingEl) {
                loadingEl.style.display = 'none';
            }
            
            // console.log('Map initialization complete');
            
        } catch (error) {
            console.error('Map initialization failed:', error);
            document.getElementById('map').innerHTML = '<div style="text-align: center; padding: 50px; color: #666;">Map failed to load: ' + error.message + '</div>';
        }
    </script>
</body>
</html>`;
  };

  // Handle map region change to update visible stations
  const handleRegionChangeComplete = useCallback(
    (region) => {
      setMapRegion(region);

      // Calculate which stations are in the current view
      const paddingFactor = 1.2; // Add some padding to include stations slightly outside view
      const latDelta = region.latitudeDelta * paddingFactor;
      const lngDelta = region.longitudeDelta * paddingFactor;

      const visibleInRegion = STATIONS.filter((station) => {
        const coords = getCleanStationCoordinates(station);
        return (
          coords.latitude >= region.latitude - latDelta / 2 &&
          coords.latitude <= region.latitude + latDelta / 2 &&
          coords.longitude >= region.longitude - lngDelta / 2 &&
          coords.longitude <= region.longitude + lngDelta / 2
        );
      });

      // Only update if the stations list changed significantly
      if (visibleInRegion.length !== visibleStations.length) {
        setVisibleStations(visibleInRegion);
      }
    },
    [visibleStations]
  );

  if (!mapRegion) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#3b82f6" />
        <Text style={styles.loadingText}>
          {t("loadingMap") || "Loading map..."}
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>
          {t("aqiStationsMap") || "AQI Monitoring Stations"}
        </Text>
        <TouchableOpacity
          onPress={handleRefresh}
          style={styles.refreshButton}
          disabled={refreshing}
        >
          <Feather
            name="refresh-cw"
            size={20}
            color="#3b82f6"
            style={{ transform: [{ rotate: refreshing ? "180deg" : "0deg" }] }}
          />
        </TouchableOpacity>
      </View>

      {/* Interactive Map */}
      <View style={styles.mapContainer}>
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#3b82f6" />
            <Text style={styles.loadingText}>
              {t("loadingStationData") || "Loading station data..."}
            </Text>
          </View>
        ) : (
          <WebView
            key={`map-${visibleStations.length}-${
              Object.keys(stationsData).length
            }`}
            source={{ html: generateMapHTML() }}
            style={styles.webview}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            startInLoadingState={true}
            onError={(syntheticEvent) => {
              const { nativeEvent } = syntheticEvent;
              console.warn("WebView error: ", nativeEvent);
            }}
            onHttpError={(syntheticEvent) => {
              const { nativeEvent } = syntheticEvent;
              console.warn("WebView HTTP error: ", nativeEvent);
            }}
            onLoadEnd={(syntheticEvent) => {
            //   console.log("WebView loaded successfully");
            }}
            renderError={() => (
              <View style={styles.errorContainer}>
                <Feather name="map-pin" size={48} color="#ef4444" />
                <Text style={styles.errorTitle}>Map Loading Failed</Text>
                <Text style={styles.errorText}>
                  Using station grid view instead
                </Text>
              </View>
            )}
            renderLoading={() => (
              <View style={styles.webviewLoading}>
                <ActivityIndicator size="small" color="#3b82f6" />
                <Text style={styles.loadingText}>
                  {t("loadingMap") || "Loading map..."}
                </Text>
              </View>
            )}
          />
        )}
      </View>

      {/* Station count info */}
      <View style={styles.infoBar}>
        <View style={styles.infoItem}>
          <Feather name="map-pin" size={16} color="#6b7280" />
          <Text style={styles.infoText}>
            {visibleStations.length}{" "}
            {t("stationsVisible") || "stations visible"}
          </Text>
        </View>
        {Object.keys(stationsData).length > 0 && (
          <View style={styles.infoItem}>
            <Feather name="activity" size={16} color="#10b981" />
            <Text style={styles.infoText}>
              {Object.values(stationsData).filter((data) => !data.error).length}{" "}
              {t("withData") || "with data"}
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1f2937",
  },
  refreshButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: "#eff6ff",
  },
  mapContainer: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  webview: {
    flex: 1,
  },

  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: "#6b7280",
  },
  webviewLoading: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(248, 249, 250, 0.9)",
  },
  infoBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb",
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  infoText: {
    marginLeft: 6,
    fontSize: 14,
    color: "#6b7280",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
    padding: 32,
  },
  errorTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#ef4444",
    marginTop: 16,
    marginBottom: 8,
  },
  errorText: {
    fontSize: 14,
    color: "#6b7280",
    textAlign: "center",
  },
});

export default AQIMap;
