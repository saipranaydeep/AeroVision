import React from "react";
import { StyleSheet, Text, View } from "react-native";

const Weather = ({ data }) => {
  return (
    <>
      <View>
        <Text>Weather</Text>
        <Text>Today</Text>
        <Text>
          {data[0]?.min_temp}/{data[0]?.max_temp}
        </Text>
        <Text>Humidity: 60%</Text>
        <Text>Wind: {data[0]?.max_wind_speed_kmh} km/h</Text>
        <Text>Precipitation: {data[0].precipitation_mm} mm</Text>
        <Text>Condition: Sunny</Text>
      </View>
      {data?.slice(1).map((item, index) => (
        <View key={index}>
          <Text>{item.day}</Text>
          <Text>Temp: {item.max_temp}°C</Text>
        </View>
      ))}
    </>
  );
};

export default Weather;

const styles = StyleSheet.create({});
