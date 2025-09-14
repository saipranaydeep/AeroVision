import React from "react";
import { StyleSheet, Text, View } from "react-native";

const AQIForecast = ({ data }) => {
  return (
    <View>
      <Text>AQIForecast</Text>
      <Text>
        6-Day Average:{" "}
        {data.length > 0
          ? (
              data.reduce((acc, item) => acc + item.aqi, 0) / data.length
            ).toFixed(0)
          : 0}
      </Text>
      <Text>Highest: {Math.max(...data.map((item) => item.aqi))}</Text>
      <Text>Daily Forecast</Text>
      {data?.map((item, index) => (
        <View key={index}>
          <Text>
            {item.day}: {item.aqi}
          </Text>
          <Text>Category: {item.category}</Text>
          <Text>Dominant Pollutant: {item.main_pollutant}</Text>
          <Text>Value: {item.value}</Text>
          <Text>Health Recommendations: {item.warning}</Text>
        </View>
      ))}
      <Text>Monday: 80</Text>
      <Text>Tuesday: 85</Text>
      <Text>Wednesday: 90</Text>
      <Text>Thursday: 88</Text>
      <Text>Friday: 92</Text>
    </View>
  );
};

export default AQIForecast;

const styles = StyleSheet.create({});
