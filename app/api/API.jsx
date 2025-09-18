import axios from "axios";

const api = axios.create({
  baseURL: "https://backendairquality.onrender.com",
  timeout: 15000, // 15 second timeout
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Enhanced error handler
const handleApiError = (error, context = "") => {
  console.error(`Error in ${context}:`, error);

  // Network errors (no response received)
  if (error.code === "ECONNABORTED" || error.code === "NETWORK_ERROR") {
    const networkError = new Error(
      "Network connection timeout. Please check your internet connection."
    );
    networkError.code = "NETWORK_ERROR";
    throw networkError;
  }

  if (!error.response) {
    const networkError = new Error(
      "Unable to connect to server. Please check your internet connection."
    );
    networkError.code = "NETWORK_ERROR";
    throw networkError;
  }

  // HTTP error responses
  const { status, statusText, data } = error.response;

  let errorMessage = "";
  let errorCode = "";

  switch (status) {
    case 400:
      errorMessage = data?.message || "Invalid request. Please try again.";
      errorCode = "CLIENT_ERROR";
      break;
    case 401:
      errorMessage = "Authentication failed. Please try again.";
      errorCode = "AUTH_ERROR";
      break;
    case 403:
      errorMessage = "Access denied. Please try again later.";
      errorCode = "AUTH_ERROR";
      break;
    case 404:
      errorMessage = `${context} not found. Please check the city name.`;
      errorCode = "NOT_FOUND";
      break;
    case 429:
      errorMessage = "Too many requests. Please wait a moment and try again.";
      errorCode = "RATE_LIMIT";
      break;
    case 500:
    case 502:
    case 503:
    case 504:
      errorMessage =
        "Server is temporarily unavailable. Please try again later.";
      errorCode = "SERVER_ERROR";
      break;
    default:
      errorMessage = data?.message || `Server error (${status}): ${statusText}`;
      errorCode = "SERVER_ERROR";
  }

  const enhancedError = new Error(errorMessage);
  enhancedError.code = errorCode;
  enhancedError.status = status;
  enhancedError.response = error.response;
  throw enhancedError;
};

export const fetchAirQualityData = async (city) => {
  try {
    const { data } = await api.post("/predict", {
      city: city,
    });

    // Validate response data
    if (!data || typeof data !== "object") {
      const dataError = new Error("Invalid data received from server");
      dataError.code = "DATA_ERROR";
      throw dataError;
    }

    return {
      ...data,
      fetchedAt: new Date().toISOString(),
      fetchedTime: Date.now(),
    };
  } catch (error) {
    handleApiError(error, "Air Quality Data");
  }
};

export const weatherDetails = async (city) => {
  try {
    const { data } = await api.post("/weather", {
      city: city,
    });

    // Validate response data
    if (!data || typeof data !== "object") {
      const dataError = new Error("Invalid weather data received from server");
      dataError.code = "DATA_ERROR";
      throw dataError;
    }

    return {
      ...data,
      fetchedAt: new Date().toISOString(),
      fetchedTime: Date.now(),
    };
  } catch (error) {
    handleApiError(error, "Weather Data");
  }
};

export default api;
