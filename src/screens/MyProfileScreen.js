import {
  View,
  StyleSheet,
  Text,
  Image,
  ScrollView,
  ImageBackground,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import { palette } from "../style";
import { themes } from "../style";
import { dimensions } from "../style";
import ProfileInfo from "../components/myProfile/ProfileInfo";
import EditDates from "../components/myProfile/EditDates";
import SelectCountries from "../components/getMatched/SelectCountries";
import VisitedCountries from "../components/myProfile/VisitedCountries";
import VolunteerBadges from "../components/myProfile/VolunteerBadges";
import { BottomNav, PhotoInput } from "../components";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import React, { useEffect, useState } from "react";
import { useNavigation, useNavigationState } from "@react-navigation/native";
const Tab = createMaterialTopTabNavigator();

import UserService from "../services/UserService";
const { logoutUser, putExtraData } = UserService;

const EditProfile = () => {
  const navigation = useNavigation();

  // updated by the photo input
  const [image, setImage] = useState(null);

  return (
    <>
      <ScrollView>
        <View style={styles.page}>
          <View style={styles.profilePicContainer}>
            <PhotoInput
              width={20 * vh}
              image={null}
              camRatio="25%"
              onPhotoSelected={setImage}
            />
            <View style={styles.profileTextContainer}>
              <Text style={styles.profileName}>
                {global.currentUser.user_name}
              </Text>
              <Text style={styles.profileEmail}>
                {global.currentUser.email_id}
              </Text>
            </View>
          </View>
          <ProfileInfo />
          <VisitedCountries />
          <VolunteerBadges />
        </View>
      </ScrollView>
    </>
  );
};

const Settings = (props) => {
  const navigation = useNavigation();
  const { email } = props;

  return (
    <View style={styles.page}>
      <View style={styles.logoContainer}>
        <Image
          source={require("../../assets/logo_umbrella.png")}
          style={styles.logo}
        />
        <Text style={styles.message} marginTop={-3.5 * vh}>
          Version 1.0
        </Text>
      </View>

      <View style={styles.border} />

      <View style={styles.infoContainer}>
        <View>
          <Text style={styles.headingText}>Change Email Address</Text>
        </View>

        <View style={styles.countryContainer}>
          <Text style={styles.message}>{global.currentUser.email_id}</Text>
        </View>
      </View>

      <View style={styles.infoContainer}>
        <View>
          <Text style={styles.headingText}>Change password</Text>
        </View>
      </View>

      <View style={styles.infoContainer}>
        <View>
          <Text style={styles.headingText}>Send Feedback or Report Bug</Text>
        </View>
      </View>

      <View style={styles.infoContainer}>
        <View>
          <Text style={styles.headingText}>
            Share App with Coworkers or Friends
          </Text>
        </View>

        <View style={styles.countryContainer}>
          <Text style={styles.link}>dayoff.space/mylink</Text>
        </View>
      </View>

      <View style={styles.logoutContainer}>
        <TouchableOpacity
          onPress={async () => {
            await logoutUser(global.currentUser.email_id).then((status) => {
              // if managed to log out then nullify global variables
              // and navigate back to welcome screen
              global.currentUser = null;
              global.currentTrip = null;
              navigation.replace("Welcome");
            });
          }}
          style={{ display: "flex", flexDirection: "row", columnGap: -10 }}
        >
          <Image
            source={require("../../assets/icons/exit.png")}
            tintColor={palette.lightRed}
            style={styles.exitLogo}
          />
          <Text style={styles.exitText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MyProfileScreen = ({ navigation }) => {
  return (
    <>
      <StatusBar></StatusBar>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarScrollEnabled: true,
          tabBarGap: 5 * vmin,
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
        <Tab.Screen
          name="Settings"
          component={Settings}
          email="name@workmail.com"
        />
      </Tab.Navigator>
      <BottomNav active="MyProfile" />
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
  logo: {
    resizeMode: "contain",
    width: 50 * vmin,
  },
  tabBar: {
    elevation: 0,
    paddingTop: 2 * vh,
    paddingLeft: 6 * vmin,
    backgroundColor: palette.white,
  },
  tab: {
    width: "auto",
    marginHorizontal: 0,
    paddingHorizontal: 0,
    overflow: "visible",
  },
  tabLabelInactive: {
    width: "auto",
    marginHorizontal: 0,
    paddingRight: 1.5 * vmin,
    fontSize: 5.6 * vmin,
    textTransform: "none",
    fontFamily: "Montserrat-Medium",
    color: palette.grey,
    overflow: "visible",
  },
  tabLabelActive: {
    fontSize: 5.6 * vmin,
    textTransform: "none",
    fontFamily: "Montserrat-SemiBold",
    color: palette.black,
    overflow: "visible",
  },
  tabIndicator: {
    marginLeft: 5.75 * vmin,
    backgroundColor: palette.yellow,
    height: 5,
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

    alignItems: "center",
    justifyContent: "center",
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
  logoContainer: {
    marginTop: 6 * vh,
    justifyContent: "center",
    alignItems: "center",
  },
  infoContainer: {},
  headingText: {
    alignSelf: "center",
    width: 85 * vmin,
    fontFamily: "Lato-Regular",
    fontSize: 4.5 * vmin,
    fontWeight: "700",
    color: "#000000",
  },
  message: {
    marginTop: 1 * vh,
    color: palette.grey,
    fontWeight: "normal",
    fontSize: 4.2 * vmin,
  },
  link: {
    marginTop: 1 * vh,
    color: palette.purple,
    fontWeight: "normal",
    fontSize: 4.2 * vmin,
  },
  logoutContainer: {
    alignSelf: "flex-start",
    width: 85 * vmin,
    marginBottom: 10 * vh,
    marginLeft: 4 * vmin,
  },
  border: {
    width: "80%",
    borderBottomWidth: 1,
    borderColor: palette.lightGrey,
  },
  exitLogo: {
    resizeMode: "contain",
    height: 4 * vh,
  },
  exitText: {
    color: palette.lightRed,
    alignSelf: "center",
    fontSize: 2.5 * vh,
    fontWeight: "bold",
  },
});
