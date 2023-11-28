import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

const VolunteerBadges = () => {
  return (
    <View style={styles.VolunteerBadgesContainer}>
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
        <View>
          <Text style={styles.badgeText}>Planted a tree</Text>
          <View style={styles.badgeWrapper}>
            <Text style={styles.spanContent}>100 pts</Text>
          </View>
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
  badgeContainer: {
    borderColor: "#D7D7D7",
    borderWidth: 1,
    padding: 10,
    paddingLeft: 25,
    paddingRight: 25,
    marginTop: 15,
    borderRadius: 10,
    width: "50%",
  },
  badgeWrapper: {
    flexDirection: "row",
    justifyContent: "center",
  },
  badgeText: {
    alignSelf: "center",
    fontFamily: "Lato-Regular",
    fontSize: 3.5 * vmin,
    fontWeight: "600",
    color: "#494949",
    paddingTop: 10,
  },
  badgeFlag: {
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  VolunteerBadgesContainer: {
    marginBottom: 35,
  },
});

export default VolunteerBadges;
