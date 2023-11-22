import { View, StyleSheet, Text, Image } from "react-native";
import { palette } from "../style";
import { themes } from "../style";
import { dimensions } from "../style";

export default MyProfileScreen = ({ navigation }) => {
  return (
    <View style={styles.page}>
      <View style={styles.profilePicContainer}>
        <Image
          style={styles.profilePic}
          source={require("../../assets/images/welcome_screen/profile-pic.png")}
        />
        <View style={styles.profileTextContainer}>
          <Text style={styles.profileName}>Jessica Wang</Text>
          <Text style={styles.profileEmail}>jessica@facebook.com</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    marginTop: 20 * vh,
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: palette.white,
  },
  profilePicContainer:{
    justifyContent:'center',
    alignItems:'center'
  },
  profilePic: {
    width: 140,
    height: 140,
    borderRadius: 70,
  },
  profileTextContainer:{
    marginTop: 2 * vh,
    justifyContent:"center",
    alignItems:"center",
  },
  profileName:{
    fontWeight:'700',
    fontFamily:'Lato-Regular',
    fontSize:  5 * vmin,

  },
  profileEmail:{
    color:'#8A8A8A',
    fontSize: 3.8 * vmin,
    letterSpacing:1,
    fontWeight:'600'
  }
});
