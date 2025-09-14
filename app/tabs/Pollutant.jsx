import React from "react";
import { StyleSheet, Text, View } from "react-native";

const Pollutant = ({ pollutant, data }) => {
  console.log("Pollutant Data: ", data);
  return (
    <View>
      <Text>{pollutant}</Text>
      <Text>Current AQI Level: {data[0]?.aqi}</Text>
      <Text>{data[0]?.category}</Text>
      <Text>
        {pollutant} Level: {data[0]?.level}
      </Text>
      <Text>{data[0]?.value} µg/m³</Text>
      <Text>About {pollutant}</Text>
      <Text>
        {pollutant} is a harmful pollutant that can affect air quality and human
        health.
      </Text>
      <Text>Forecast</Text>
      <View>
        {data?.slice(1).map((item, index) => (
          <View key={index}>
            <Text>{item.day}</Text>
            <Text>AQI Level: {item.aqi}</Text>
            <Text>Current AQI Level: {item.aqi}</Text>
            <Text>{item?.category}</Text>
            <Text>
              {pollutant} Level: {item.level}
            </Text>
            <Text>{item.value} µg/m³</Text>
          </View>
        ))}
      </View>
      <Text>Scale</Text>
      <Text>0-50: Good</Text>
      <Text>51-100: Moderate</Text>
      <Text>101-150: Unhealthy for Sensitive Groups</Text>
      <Text>151-200: Unhealthy</Text>
      <Text>201-300: Very Unhealthy</Text>
      <Text>301-500: Hazardous</Text>
    </View>
  );
};

export default Pollutant;

const styles = StyleSheet.create({});
