import { View, StyleSheet, Text, Image, ScrollView , Button} from "react-native";
import { palette, themes, dimensions } from "../style";
import ProfileInfo from "../components/myProfile/ProfileInfo";
import EditDates from "../components/myProfile/EditDates";
import VisitedCountries from "../components/myProfile/VisitedCountries";
import VolunteerBadges from "../components/myProfile/VolunteerBadges";
import EditCountries from "../components/myProfile/EditCountries";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
const Tab = createMaterialTopTabNavigator();


const EditProfile = () => {
  return (
      <View style={styles.page}>
        <ScrollView>
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
      <ProfileInfo />
      <EditDates />
      <EditCountries />
      <VisitedCountries />
      <VolunteerBadges />
      </ScrollView>
      </View>
  )
}

export default MyProfileScreen = ({ navigation }) => {
  return (<>
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarLabel: ({ tintColor, focused, item }) => {
          return focused ? (
            <Text style={styles.tabLabelActive}>{route.name}</Text>
          ) : (
            <Text style={styles.tabLabelInactive}>{route.name}</Text>
          );
        },
        tabBarItemStyle: styles.tab,
        tabBarStyle: styles.tabBar,
        tabBarIndicatorStyle: styles.tabIndicator,
      })}
    >
      <Tab.Screen name="My Profile" component={EditProfile} />
      <Tab.Screen name="Settings" component={EditProfile} />
    </Tab.Navigator>
    </>
  );
};

const styles = StyleSheet.create({
  page: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: palette.white,
  },
  tabBar: {
    elevation: 0,
    paddingTop: 2 * vh,
    paddingLeft: 6 * vmin,
    backgroundColor: palette.white,
},
tab: {
    width: 28 * vmin,
},
tabLabelInactive: {
    paddingHorizontal: 0,
    width: 28 * vmin,
    fontSize: 5.6 * vmin,
    textTransform: 'none',
    fontFamily: 'Montserrat-Medium',
    color: palette.grey
},
tabLabelActive: {
    width: 28 * vmin,
    fontSize: 5.6 * vmin,
    textTransform: 'none',
    fontFamily: 'Montserrat-SemiBold',
    color: palette.black
},
tabIndicator: {
    marginLeft: 6 * vmin,
    backgroundColor: palette.yellow,
    width: 22 * vmin,
    height: 5
},

  profilePicContainer: {
    marginTop: 20 * vh,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 5,
    paddingBottom: 35,
  },
  profilePic: {
    width: 140,
    height: 140,
    borderRadius: 70,
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
