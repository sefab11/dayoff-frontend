import { View, StyleSheet, Text, Image } from "react-native";
import { themes } from "../../style";
import { dimensions } from "../../style";
import { palette } from "../../style";

export default ProfileInfo = () => {
  return (
    <View>
      <View style={styles.infoContainer}>
        <View>
          <Text style={styles.headingText}>Country of Residence</Text>
        </View>

        <View style={styles.countryContainer}>
          <Text style={styles.message}>United States</Text>
          <Image
            source={require("../../../assets/images/welcome_screen/edit.png")}
          />
        </View>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.headingText}>Job Title & Company</Text>
        <View style={styles.countryContainer}>
          <Text style={styles.message}>Product Designer, Facebook</Text>
          <Image
            source={require("../../../assets/images/welcome_screen/edit.png")}
          />
        </View>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.headingText}>My LinkedIn URL</Text>
        <View style={styles.countryContainer}>
          <Text style={styles.message}>Linkedin.com/jessss</Text>
          <Image
            source={require("../../../assets/images/welcome_screen/edit.png")}
          />
        </View>
      </View>
      
    </View>
  );
};

const styles = StyleSheet.create({
  infoContainer: {},
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
    width: 78 * vmin,
    fontFamily: "Lato-Regular",
    fontSize: 3.8 * vmin,
    color: palette.grey,
  },
  countryContainer: {
    flexDirection: "row",
    marginLeftLeft: 5,
  },
});
