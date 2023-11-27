import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

const VolunteerBadges = () => {
  return (
    <View>
      <Text style={styles.headingText}>
        Volunteer Badges | <Text style={styles.spanContent}>100pts</Text>
      </Text>
      <View></View>
      <View style={styles.badgeContainer}>
        <View style={styles.badgeFlag}>
        <Image
            source={require("../../../assets/images/profileScreen/BrazilFlag.png")}
          />
        </View>
        <View style={styles.badgeWrapper}>
          <Image
            source={require("../../../assets/images/profileScreen/badge.png")}
          />
  
        </View>
        <View style={styles.badgeText}>
          <Text>Planted a tree</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headingText: {
    marginTop: 5 * vh,
    marginBottom: 2.5 * vh,
    alignSelf: "center",
    width: 85 * vmin,
    fontFamily: "Lato-Regular",
    fontSize: 4.5 * vmin,
    fontWeight: "700",
    color: "#000000",
  },
  spanContent: {
    color: "#503cc8",
  },
  badgeContainer:{
    borderColor: "#D7D7D7",
    borderWidth: 1,
    padding: 10,
    marginTop: 15,
    borderRadius: 5,
    width: "50%",
  },
  badgeWrapper: {
    flexDirection: "row",
    justifyContent:'center'
  },
  badgeText:{
    alignSelf: "center",
    fontFamily: "Lato-Regular",
    fontSize: 4.5 * vmin,
    fontWeight: "700",
    color: "#000000",
  }
});

export default VolunteerBadges;
