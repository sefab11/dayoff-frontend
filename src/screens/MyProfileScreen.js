import { View, StyleSheet, Text, Image, ScrollView, ImageBackground } from "react-native";
import { palette } from "../style";
import { themes } from "../style";
import { dimensions } from "../style";
import ProfileInfo from "../components/myProfile/ProfileInfo";
import EditDates from "../components/myProfile/EditDates";
import SelectCountries from "../components/getMatched/SelectCountries";
import VisitedCountries from "../components/myProfile/VisitedCountries";
import VolunteerBadges from "../components/myProfile/VolunteerBadges";
import { BottomNav, PhotoInput } from "../components";


export default MyProfileScreen = ({ navigation }) => {

    return (<>
    <ScrollView>
        <View style={styles.page}>
            <View style={styles.profilePicContainer}>
                <PhotoInput
                    width={20 * vh}
                    image={require("../../assets/images/welcome_screen/profile-pic.png")}
                    camRatio='25%'
                />
                <View style={styles.profileTextContainer}>
                    <Text style={styles.profileName}>Jessica Wang</Text>
                    <Text style={styles.profileEmail}>jessica@facebook.com</Text>
                </View>
            </View>
            <ProfileInfo />
            <VisitedCountries />
            <VolunteerBadges />
        </View>
    </ScrollView>
    <BottomNav active='MyProfile' />
  </>);
};

const styles = StyleSheet.create({
  page: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: palette.white,
  },
  profilePicContainer: {
    marginTop: 10 * vh,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 5,
    paddingBottom: 35,
  },
  profilePic: {
    width: 140,
    height: 140,
    borderRadius: 70,

    alignItems: 'center',
    justifyContent: 'center',
  },
  profileChangeIcon: {
    opacity: 0.5,
  },

  profileTextContainer: {
    marginTop: 2 * vh,
    justifyContent: "center",
    alignItems: "center",
  },
  profileName: {
    fontWeight: "700",
    fontFamily: "Lato-Regular",
    fontSize: 5 * vmin,
  },
  profileEmail: {
    color: "#8A8A8A",
    fontSize: 3.8 * vmin,
    letterSpacing: 1,
    fontWeight: "600",
  },
});
