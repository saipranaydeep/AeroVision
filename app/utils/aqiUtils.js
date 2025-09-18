/**
 * Centralized AQI (Air Quality Index) utility functions and configurations
 * This ensures consistent AQI scale, colors, and ranges across all components
 */

// Standard AQI Scale as per specification
export const AQI_LEVELS = [
  {
    id: "good",
    name: "Good",
    min: 0,
    max: 50,
    color: "#22c55e", // Green
    bgColor: "#f0fdf4",
    darkColor: "#16a34a",
    icon: "smile",
  },
  {
    id: "satisfactory",
    name: "Satisfactory",
    min: 50,
    max: 100,
    color: "#fbbf24", // Yellow
    bgColor: "#fffbeb",
    darkColor: "#f59e0b",
    icon: "meh",
  },
  {
    id: "moderate",
    name: "Moderate",
    min: 100,
    max: 150,
    color: "#fb923c", // Orange
    bgColor: "#fff7ed",
    darkColor: "#f97316",
    icon: "meh",
  },
  {
    id: "poor",
    name: "Poor",
    min: 150,
    max: 200,
    color: "#ef4444", // Red
    bgColor: "#fef2f2",
    darkColor: "#dc2626",
    icon: "frown",
  },
  {
    id: "severe",
    name: "Severe",
    min: 200,
    max: 300,
    color: "#b91c1c", // Dark Red
    bgColor: "#fef2f2",
    darkColor: "#991b1b",
    icon: "frown",
  },
  {
    id: "hazardous",
    name: "Hazardous",
    min: 300,
    max: Infinity,
    color: "#8b4513", // Brown
    bgColor: "#fef2f2",
    darkColor: "#7f2d0e",
    icon: "alert-triangle",
  },
];

/**
 * Get AQI level information based on AQI value
 * @param {number} aqiValue - The AQI value
 * @returns {object} AQI level information including color, name, etc.
 */
export const getAQILevel = (aqiValue) => {
  if (typeof aqiValue !== "number" || aqiValue < 0) {
    return AQI_LEVELS[0]; // Default to Good if invalid value
  }

  for (const level of AQI_LEVELS) {
    if (aqiValue >= level.min && aqiValue < level.max) {
      return level;
    }
  }

  // If value is beyond all ranges, return the last level (Hazardous)
  return AQI_LEVELS[AQI_LEVELS.length - 1];
};

/**
 * Get AQI level by name/id
 * @param {string} levelName - The level name or id
 * @returns {object} AQI level information
 */
export const getAQILevelByName = (levelName) => {
  if (!levelName) return AQI_LEVELS[0];

  const name = levelName.toLowerCase().trim();

  // Legacy mapping for old category names
  const legacyMapping = {
    satisfactory: "moderate",
    "moderately polluted": "poor",
    "very poor": "severe",
    "very unhealthy": "severe",
    "unhealthy for sensitive groups": "poor",
    "unhealthy for sensitive": "poor",
  };

  const mappedName = legacyMapping[name] || name;

  return (
    AQI_LEVELS.find(
      (level) =>
        level.id === mappedName ||
        level.name.toLowerCase() === mappedName ||
        level.name.toLowerCase().includes(mappedName) ||
        level.id === name ||
        level.name.toLowerCase() === name ||
        level.name.toLowerCase().includes(name)
    ) || AQI_LEVELS[0]
  );
};

/**
 * Get all AQI levels for display purposes (e.g., legend, scale)
 * @returns {array} Array of all AQI levels
 */
export const getAllAQILevels = () => {
  return AQI_LEVELS;
};

/**
 * Get AQI color based on value
 * @param {number} aqiValue - The AQI value
 * @param {boolean} useDarkColor - Whether to use dark variant of color
 * @returns {string} Hex color code
 */
export const getAQIColor = (aqiValue, useDarkColor = false) => {
  const level = getAQILevel(aqiValue);
  return useDarkColor ? level.darkColor : level.color;
};

/**
 * Get AQI background color based on value
 * @param {number} aqiValue - The AQI value
 * @returns {string} Hex color code
 */
export const getAQIBackgroundColor = (aqiValue) => {
  const level = getAQILevel(aqiValue);
  return level.bgColor;
};

/**
 * Get AQI range string (e.g., "0-50")
 * @param {number} aqiValue - The AQI value
 * @returns {string} Range string
 */
export const getAQIRange = (aqiValue) => {
  const level = getAQILevel(aqiValue);
  if (level.max === Infinity) {
    return `${level.min}+`;
  }
  return `${level.min}-${level.max}`;
};

/**
 * Get health recommendations based on AQI value
 * @param {number} aqiValue - The AQI value
 * @param {function} t - Translation function
 * @returns {array} Array of health recommendation strings
 */
export const getHealthRecommendations = (aqiValue, t) => {
  if (aqiValue <= 50) {
    return [
      t ? t("excellentAir") : "Air quality is excellent.",
      t ? t("perfectOutdoor") : "Perfect for outdoor activities.",
    ];
  }
  if (aqiValue <= 100) {
    return [
      t ? t("acceptableAir") : "Air quality is acceptable.",
      t ? t("limitExertion") : "Limit prolonged outdoor exertion.",
    ];
  }
  if (aqiValue <= 150) {
    return [
      t ? t("unhealthySensitive") : "Unhealthy for sensitive groups.",
      t ? t("limitOutdoor") : "Limit outdoor activities if sensitive.",
    ];
  }
  if (aqiValue <= 200) {
    return [
      t ? t("unhealthy") : "Unhealthy for everyone.",
      t ? t("avoidProlonged") : "Avoid prolonged outdoor activities.",
    ];
  }
  if (aqiValue <= 300) {
    return [
      t ? t("veryUnhealthy") : "Very unhealthy for everyone.",
      t ? t("avoidAllOutdoor") : "Avoid all outdoor activities.",
    ];
  }
  return [
    t ? t("hazardous") : "Hazardous air quality.",
    t ? t("stayIndoors") : "Stay indoors and keep windows closed.",
  ];
};

/**
 * Format AQI value for display
 * @param {number} aqiValue - The AQI value
 * @returns {number} Formatted AQI value
 */
export const formatAQIValue = (aqiValue) => {
  return Math.round(aqiValue || 0);
};

/**
 * Get AQI meter levels for gauge display
 * @returns {array} Array of levels formatted for AQI meter
 */
export const getAQIMeterLevels = () => {
  return AQI_LEVELS.map((level) => ({
    name: level.name,
    max: level.max === Infinity ? 400 : level.max, // Cap infinity at 400 for meter display
    color: level.color,
  }));
};

/**
 * Get AQI scale for translations
 * @param {function} t - Translation function
 * @returns {array} Translated AQI scale
 */
export const getTranslatedAQIScale = (t) => {
  return AQI_LEVELS.map((level) => ({
    sl: level.id,
    level: t ? t(level.id) : level.name,
    range:
      level.max === Infinity ? `${level.min}+` : `${level.min}-${level.max}`,
    color: level.color,
    bgColor: level.bgColor,
    icon: level.icon,
    flex: level.max === Infinity ? 100 : level.max - level.min,
  }));
};

/**
 * Format timestamp for display
 * @param {string} fetchedAt - ISO string timestamp
 * @param {string} selectedLanguage - Language code
 * @param {function} t - Translation function
 * @returns {string} - Formatted timestamp string
 */
export const formatTimestamp = (fetchedAt, selectedLanguage, t) => {
  if (!fetchedAt) return "";

  try {
    const date = new Date(fetchedAt);

    if (selectedLanguage === "hindi") {
      // Hindi format: DD/MM/YYYY को HH:MM पर
      const dateStr = date.toLocaleDateString("hi-IN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
      const timeStr = date.toLocaleTimeString("hi-IN", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
      return `${t("updatedOn")} ${dateStr} ${t("at")} ${timeStr}`;
    } else {
      // English format: Updated on DD/MM/YYYY at HH:MM AM/PM
      const dateStr = date.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
      const timeStr = date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
      return `${t("updatedOn")} ${dateStr} ${t("at")} ${timeStr}`;
    }
  } catch (error) {
    console.error("Error formatting timestamp:", error);
    return "";
  }
};

export default {
  getAQILevel,
  getAQILevelByName,
  getAllAQILevels,
  getAQIColor,
  getAQIBackgroundColor,
  getAQIRange,
  getHealthRecommendations,
  formatAQIValue,
  getAQIMeterLevels,
  getTranslatedAQIScale,
  formatTimestamp,
};
