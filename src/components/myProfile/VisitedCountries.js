import { View, Image, StyleSheet, Text } from "react-native";

export default VisitedCountries = () => {
  return (
    <View style={styles.visitedWrap}>
        <View>
            <Text style={styles.headingText}>Countries visited on DayOff</Text>
        </View>
      <View style={styles.imageContainer}>
        <Image
          source={require("../../../assets/images/profileScreen/AustraliaFlag.png")}
        />
        <Image
          source={require("../../../assets/images/profileScreen/FranceFlag.png")}
        />
        <Image
          source={require("../../../assets/images/profileScreen/JapanFlag.png")}
        />
        <Image
          source={require("../../../assets/images/profileScreen/BrazilFlag.png")}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
    visitedWrap:{
        
    },
    headingText: {
        marginTop: 3 * vh,
        marginBottom: 2.5 * vh,
        alignSelf: "center",
        width: 85 * vmin,
        fontFamily: "Lato-Regular",
        fontSize: 4.5 * vmin,
        fontWeight: "700",
        color: "#000000",
      },
  imageContainer: {
    flexDirection: "row",
    gap:15,
  },
});
