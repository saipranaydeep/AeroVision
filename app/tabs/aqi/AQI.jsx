import Feather from "@expo/vector-icons/Feather";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
const AQI = ({ data }) => {
  return (
    <View>
      <View>
        <Text>Live Data</Text>
        <Text>AQI</Text>
        <Text>{data.aqi}</Text>
        <Text>{data.category}</Text>
        <Feather name="smile" size={24} color="black" />
      </View>
      <View>
        <Text>Pollutant Levels</Text>
        {data?.pollutants?.map((pollutant, index) => (
          <View key={index}>
            <Text>{pollutant.pollutant}</Text>
            <Text>{pollutant.value}</Text>
            <Text>{pollutant.category}</Text>
          </View>
        ))}
        <Text>AQI Reference Scale</Text>
        <Text>0-50: Good</Text>
        <Text>51-100: Satisfactory</Text>
        <Text>101-200: Moderately Polluted</Text>
        <Text>201-300: Poor</Text>
        <Text>301-400: Very Poor</Text>
        <Text>401-500: Severe</Text>
      </View>
      <View>
        <Text>Health Recommendations</Text>
        <Text>
          Breathing in this area is at this AQI is same as pm2.5 / 22 cigarettes
        </Text>
        <Text>Air quality is satisfactory.</Text>
        <Text>Enjoy your outdoor activities.</Text>
        <Text>Stay hydrated.</Text>
        <Text>Avoid strenuous activities if you have respiratory issues.</Text>
      </View>
    </View>
  );
};

export default AQI;

const styles = StyleSheet.create({});
