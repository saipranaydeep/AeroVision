import { Feather } from "@expo/vector-icons";
import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import Modal from "react-native-modal";
import { useLanguage } from "../contexts/LanguageContext";
import { getCityTranslation, getTranslation } from "../utils/translations";
import SideMenu from "./SideMenu";

const Navbar = ({ city, setCity }) => {
  const [searchCity, setSearchCity] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const { selectedLanguage } = useLanguage();

  const t = (key) => getTranslation(key, selectedLanguage);
  const translateCity = (cityName) =>
    getCityTranslation(cityName, selectedLanguage);

  return (
    <View>
      <Text>{t("appName")}</Text>
      <TextInput
        value={searchCity}
        onChangeText={setSearchCity}
        onSubmitEditing={() => setCity(searchCity)}
        placeholder={t("searchPlaceholder")}
      />
      <Text>
        {t("currentCity")}: {translateCity(city)}
      </Text>
      <Feather
        name="menu"
        size={24}
        color="black"
        onPress={() => setIsOpen(!isOpen)}
      />
      <Modal
        isVisible={isOpen}
        onBackdropPress={() => setIsOpen(false)}
        animationIn="slideInRight"
        animationOut="slideOutRight"
        style={{
          margin: 0,
          justifyContent: "flex-start",
          alignItems: "flex-end",
        }}
        backdropOpacity={0.5}
        useNativeDriverForBackdrop
        hideModalContentWhileAnimating
      >
        <SideMenu />
      </Modal>
    </View>
  );
};

export default Navbar;

const styles = StyleSheet.create({});
