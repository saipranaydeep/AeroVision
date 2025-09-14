import axios from "axios";

const api = axios.create({
  baseURL: "https://backendairquality.onrender.com",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export const fetchAirQualityData = async (city) => {
  try {
    const { data } = await api.post("/predict", {
      city: city,
    });
    return {
      ...data,
      fetchedAt: new Date().toISOString(),
      fetchedTime: Date.now(),
    };
  } catch (error) {
    console.error("Error fetching air quality data:", error);
    throw error;
  }
};

export const weatherDetails = async (city) => {
  try {
    const { data } = await api.post("/weather", {
      city: city,
    });
    return {
      ...data,
      fetchedAt: new Date().toISOString(),
      fetchedTime: Date.now(),
    };
  } catch (error) {
    console.error("Error fetching weather data:", error);
    throw error;
  }
};

export default api;
