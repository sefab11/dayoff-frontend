import { useState } from "react";
import { View, Image, Text, TouchableOpacity } from "react-native";
import { palette, themes } from "../../style";
import { StyleSheet } from "react-native";

const SelecCountries = () => {
  const countries = [
    {
      id: "1",
      image: require("../../../assets/images/welcome_screen/Spain.png"),
    },
    {
      id: "2",
      image: require("../../../assets/images/welcome_screen/Brazil.png"),
    },
    {
      id: "3",
      image: require("../../../assets/images/welcome_screen/Morocco.png"),
    },
    {
        id: "4",
        image: require("../../../assets/images/welcome_screen/Japan.png"),
      },
      {
        id: "5",
        image: require("../../../assets/images/welcome_screen/Australia.png"),
      },
  ];

  return (
    <View>
      <View>
        <Text style={styles.headingText}>
          Select all countries you wish to visit
        </Text>
      </View>
      <View>
        <Text style={styles.message}>
          You can add more countries later in profile setting
        </Text>
      </View>
      <View style={styles.countriesCContainer}>
        
          {countries.map((country) => (
            <View style={styles.country}   key={country.id}>
            <Image
              style={styles.icon}
              source={country.image}
            />
             </View>
          ))}
       
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
  countriesCContainer: {
    flexDirection: "row",
    flexWrap:'wrap',
    borderColor: "#D7D7D7",
    borderWidth: 1,
    padding: 10,
    marginTop: 25,
    borderRadius: 5,
    alignItems:'center',
    margin:10,

  },
  country: {
    backgroundColor: "#EEECFA",
    width:'30%',
    padding:10,
    paddingLeft:15,
    paddingRight:25,
    alignItems:'center',
    margin:5
  },
  

});

export default SelecCountries;
