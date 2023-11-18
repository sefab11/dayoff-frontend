import { useState } from "react";
import { View, Image, Text, TouchableOpacity } from "react-native";
import { palette, themes } from "../../style";
import { StyleSheet } from "react-native";

const SelecCountries = () => {

  return (
    <View>
      <View>
        <Text style={styles.headingText}>
          Select all your days off for the year
        </Text>
      </View>
      <View>
        <Text style={styles.message}>
          Which weeks of the months are you taking days off to go on a trip
        </Text>
      </View>
      <View>
      </View>
   
    </View>
  );
};
const styles = StyleSheet.create({
  headingText: {
    marginTop: 3 * vh,
    alignSelf: "center",
    width: 85 * vmin,
    fontFamily: "Lato-Regular",
    fontSize: 4.5 * vmin,
    fontWeight: "700",
    color: "#000000",
  },

  message: {
    marginTop: 1.5 * vh,
    alignSelf: "center",
    width: 85 * vmin,
    fontFamily: "Lato-Regular",
    fontSize: 3.8 * vmin,
    color: palette.grey,
  },
  buttonGroup: {
    gap: 2 * vmin,
    marginTop: 5 * vh,
    marginBottom: 5 * vh,
  },
  button: {
    width: 80 * vmin,
    height: 14 * vmin,
    justifyContent: "center",
    paddingBottom: 0.5 * vmin,
  },
  calenderIconContainer: {
    flexDirection: "row",
    borderColor: "#D7D7D7",
    borderWidth: 1,
    padding: 10,
    paddingLeft: 15,
    paddingRight: 15,
    marginTop: 15,
    borderRadius: 5,
    justifyContent: "space-between",
    lineHeight: "27px",
  },
  textContainer: {
    color: "#A9A9A9",
    backgroundColor: "#D7D7D7",
    padding: 5,
    borderRadius: 5,
    paddingLeft: 15,
    paddingRight: 15,
  },
});

export default SelecCountries;
