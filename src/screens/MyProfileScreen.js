import { View, StyleSheet, Text, Image } from "react-native";
import { palette } from "../style";
import { themes } from "../style";
import { dimensions } from "../style";

export default MyProfileScreen = ({ navigation }) => {
  return (
    <View style={styles.page}>
      <View>
        <Image
          style={styles.profilePic}
          source={require("../../assets/images/welcome_screen/profile-pic.png")}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    marginTop: 15 * vh,
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: palette.white,
  },
  profilePic: {
    width: 140,
    height: 140,
    borderRadius:70,
  },
});
