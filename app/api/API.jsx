import axios from "axios";

const api = axios.create({
  baseURL: "https://backendairquality.onrender.com",
  timeout: 60000, // 60 seconds for Render cold starts (reduced from 120s)
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  validateStatus: function (status) {
    return status >= 200 && status < 500; // Resolve for all status codes less than 500
  },
});

// Add request interceptor for debugging
api.interceptors.request.use(
  (config) => {
    const timestamp = new Date().toISOString();
    console.log(
      `[${timestamp}] Making ${config.method.toUpperCase()} request to: ${
        config.baseURL
      }${config.url}`
    );
    console.log(`[${timestamp}] Timeout: ${config.timeout}ms`);
    return config;
  },
  (error) => {
    console.error("Request interceptor error:", error);
    return Promise.reject(error);
  }
);

// Add response interceptor for debugging
api.interceptors.response.use(
  (response) => {
    const timestamp = new Date().toISOString();
    console.log(
      `[${timestamp}] ✅ Response received from: ${response.config.url} - Status: ${response.status}`
    );
    return response;
  },
  (error) => {
    const timestamp = new Date().toISOString();
    console.error(
      `[${timestamp}] ❌ Response interceptor error:`,
      error.message
    );
    if (error.response) {
      console.error(
        `[${timestamp}] Error response:`,
        error.response.status,
        error.response.data
      );
    } else if (error.request) {
      console.error(`[${timestamp}] No response received. Request details:`, {
        url: error.config?.url,
        method: error.config?.method,
        timeout: error.config?.timeout,
      });
    }
    return Promise.reject(error);
  }
);

// Enhanced error handler
const handleApiError = (error, context = "") => {
  const timestamp = new Date().toISOString();
  console.error(`[${timestamp}] ❌ Error in ${context}:`, error.message);
  console.error(`[${timestamp}] Error details:`, {
    message: error.message,
    code: error.code,
    hasResponse: !!error.response,
    hasRequest: !!error.request,
    config: error.config
      ? {
          url: error.config.url,
          baseURL: error.config.baseURL,
          method: error.config.method,
          timeout: error.config.timeout,
        }
      : null,
  });

  // Network errors (no response received)
  if (error.code === "ECONNABORTED") {
    const networkError = new Error(
      `Request timeout after ${
        error.config?.timeout / 1000
      }s. The server might be experiencing a cold start (15-60s). Please try again.`
    );
    networkError.code = "TIMEOUT_ERROR";
    throw networkError;
  }

  if (error.code === "ERR_NETWORK" || error.message === "Network Error") {
    const networkError = new Error(
      "Network connection failed. Please check your internet connection and try again."
    );
    networkError.code = "NETWORK_ERROR";
    throw networkError;
  }

  if (!error.response) {
    const networkError = new Error(
      `Unable to reach server (${error.message}). The backend might be starting up. Please wait a moment and try again.`
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
    console.log(`🌍 Fetching air quality data for: ${city}`);
    const { data } = await api.post("/predict", {
      city: city,
    });

    // Validate response data
    if (!data || typeof data !== "object") {
      const dataError = new Error("Invalid data received from server");
      dataError.code = "DATA_ERROR";
      throw dataError;
    }

    console.log(`✅ Air quality data received for: ${city}`);
    return {
      ...data,
      fetchedAt: new Date().toISOString(),
      fetchedTime: Date.now(),
    };
  } catch (error) {
    console.error(`❌ Failed to fetch air quality data for: ${city}`);
    handleApiError(error, "Air Quality Data");
    // handleApiError already throws, but we add this to be explicit
    throw error;
  }
};

export const weatherDetails = async (city) => {
  try {
    console.log(`🌤️  Fetching weather data for: ${city}`);
    const { data } = await api.post("/weather", {
      city: city,
    });

    // Validate response data
    if (!data || typeof data !== "object") {
      const dataError = new Error("Invalid weather data received from server");
      dataError.code = "DATA_ERROR";
      throw dataError;
    }

    console.log(`✅ Weather data received for: ${city}`);
    return {
      ...data,
      fetchedAt: new Date().toISOString(),
      fetchedTime: Date.now(),
    };
  } catch (error) {
    console.error(`❌ Failed to fetch weather data for: ${city}`);
    handleApiError(error, "Weather Data");
    // handleApiError already throws, but we add this to be explicit
    throw error;
  }
};

export const fetchStationAQI = async (stationId) => {
  try {
    // Create axios instance for the station AQI API
    const stationApi = axios.create({
      baseURL: "https://erc.mp.gov.in",
      timeout: 10000,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    const { data } = await stationApi.post(
      `/EnvAlert/Wa-CityAQI?id=${stationId}`
    );

    // Validate response data
    if (!data) {
      const dataError = new Error("No data received for station");
      dataError.code = "DATA_ERROR";
      throw dataError;
    }

    return {
      stationId,
      ...data,
      fetchedAt: new Date().toISOString(),
      fetchedTime: Date.now(),
    };
  } catch (error) {
    // Log error but don't throw to prevent one failed station from breaking the whole map
    console.error(
      `Error fetching AQI for station ${stationId}:`,
      error.message
    );
    return {
      stationId,
      error: true,
      errorMessage: error.message,
      fetchedAt: new Date().toISOString(),
    };
  }
};

// Fetch AQI data for multiple stations
export const fetchMultipleStationsAQI = async (stationIds) => {
  try {
    const promises = stationIds.map((id) => fetchStationAQI(id));
    const results = await Promise.allSettled(promises);

    return results.map((result, index) => {
      if (result.status === "fulfilled") {
        return result.value;
      } else {
        return {
          stationId: stationIds[index],
          error: true,
          errorMessage: result.reason?.message || "Unknown error",
          fetchedAt: new Date().toISOString(),
        };
      }
    });
  } catch (error) {
    console.error("Error fetching multiple stations AQI:", error);
    return stationIds.map((id) => ({
      stationId: id,
      error: true,
      errorMessage: "Failed to fetch station data",
      fetchedAt: new Date().toISOString(),
    }));
  }
};

export default api;
