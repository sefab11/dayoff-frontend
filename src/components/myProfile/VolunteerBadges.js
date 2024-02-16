import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

const Badge = (props) => {
    const { flag, badge, achievement, points } = props;


    return (
    <View style={styles.badgeContainer}>
        <View style={styles.badgeFlag}>
            <Image
                source={flag}
            />
        </View>

        <View style={styles.badgeWrapper}>
            <Image
                source={badge}
            />
        </View>

        <View>
            <Text style={styles.badgeText}>{achievement}</Text>
            <View style={styles.badgeWrapper}>
                <Text style={styles.spanContent}>{points} pts</Text>
            </View>
        </View>
    </View>
    )
}



const VolunteerBadges = () => {
    return (
    <>
    <Text style={styles.headingText}>
        Volunteer Badges | <Text style={styles.spanContent}>100pts</Text>
    </Text>

    <View style={styles.VolunteerBadgesContainer}>
        <Badge
            flag={require("../../../assets/images/profileScreen/BrazilFlag.png")}
            badge={require("../../../assets/images/profileScreen/badge.png")}
            achievement='Planted a tree'
            points={100}
        />
        <Badge
            flag={require("../../../assets/images/profileScreen/FranceFlag.png")}
            badge={require("../../../assets/images/profileScreen/badge.png")}
            achievement='Tour Guide'
            points={50}
        />
        {/*<Badge
            flag={require("../../../assets/images/profileScreen/JapanFlag.png")}
            badge={require("../../../assets/images/profileScreen/badge.png")}
            achievement='Visited Japan'
            points={10}
        />*/}
    </View>

    </>
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
    margin: 10,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 10,
    width: "40%",
  },
  badgeWrapper: {
    flexDirection: "row",
    justifyContent: "center",
  },
  badgeText: {
    alignSelf: "center",
    textAlign: 'center',
    fontFamily: "Lato-Regular",
    fontSize: 3.5 * vmin,
    fontWeight: "600",
    color: "#494949",
    paddingTop: 10,
  },
  badgeFlag: {
    justifyContent: "flex-end",
    alignItems: "flex-end",
    marginRight: 10,
  },
  VolunteerBadgesContainer: {
    marginBottom: 50,
    marginLeft: 10,
    marginRight: 10,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    rowGap: 10,
    columnGap: 10,
    justifyContent: 'flex-start',
  },
});

export default VolunteerBadges;
