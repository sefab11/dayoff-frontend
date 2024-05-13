import { React, useState, useEffect } from "react";
import {
  View,
  Text,
  Keyboard,
  TouchableWithoutFeedback,
  StatusBar,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import Modal from "react-native-modal";
import {
  Button,
  TripViewMatch,
  TripView,
  BottomNav,
  TopNav,
} from "../components";
import { StyleSheet } from "react-native";
import { palette, themes, dimensions, flags } from "../style";

import UserService from "../services/UserService";
const { getUserPref } = UserService;
import TripsService from "../services/TripsService";
const { filterTrips } = TripsService;

[vw, vh, vmin, vmax] = dimensions;

const ForYouScreen = (props) => {
  const { navigation } = props;
  const email = global.currentUser.email_id;

  //call backend function to get list of specified trips to join
  //--trips/filter
  //get the date and country to filter by from the database
  //in getmatched, the users preferences should be updated into the db
  //get users preferences from db
  async function getMatchedTrips() {
    // get list of preferred dates and preferred countries
    var prefDates = [];
    var prefCountries = [];
    var tempTrips = [];

    // await getUserPref(global.currentUser.email_id).then((response) => {
    //   prefDates = response["preferred_dates"];
    //   prefDates.push([null, null]);
    //   prefCountries = response["preferred_countries"];
    //   prefCountries.push(null);
    // });
    // console.log("a" + prefDates);
    // console.log("a" + prefCountries);
    await getUserPref(global.currentUser.email_id).then((response) => {
      if (
        response &&
        response.preferred_dates &&
        response.preferred_dates.length > 0
      ) {
        prefDates = response.preferred_dates;
      }
      if (
        response &&
        response.preferred_countries &&
        response.preferred_countries.length > 0
      ) {
        prefCountries = response.preferred_countries;
      }
    });

    console.log("Preferred dates:", prefDates);
    console.log("Preferred countries:", prefCountries);

    // then pass the [[], []] dates and [{}, {}] countries arrays to filtertrips
    await filterTrips(null, null, prefDates, prefCountries).then((response) => {
      response = JSON.parse(response)["trips"];
      if (response === 0) return;
      console.log("tempTrips structure:", typeof tempTrips, tempTrips);

      response.forEach((newTrip) => {
        console.log("newTrip:", typeof newTrip, newTrip);
        // check if user email is in participants and if so then dont push
        if (newTrip.participants.includes(global.currentUser.email_id)) {
          return;
        } else {
          tempTrips.push(newTrip);
        }
      });
    });
    console.log("trips pushed");
    console.log("Trips pushed:", tempTrips);

    // set trips to temp trips
    setTrips(tempTrips);
    // console.log("d set trips");
    console.log("Set trips:", tempTrips);
    // await filterTrips(null, null, prefDates, prefCountries).then((response) => {
    //   response = JSON.parse(response).trips || [];

    //   response.forEach((newTrip) => {
    //     // Check if the user's email is in the participants and if so, push the trip
    //     if (newTrip.participants.includes(global.currentUser.email_id)) {
    //       tempTrips.push(newTrip);
    //     }
    //   });
    // });

    // console.log("Trips pushed:", tempTrips);

    // // Set trips to tempTrips
    // setTrips(tempTrips);
    // console.log("Set trips:", tempTrips);

    setRenderTrips(true);
  }
  // async function getMatchedTrips() {
  //   try {
  //     // Get user's preferred dates and countries from the database
  //     const { preferred_dates: prefDates, preferred_countries: prefCountries } =
  //       await getUserPref(global.currentUser.email_id);

  //     // Ensure prefDates is not empty and contains valid values
  //     if (!Array.isArray(prefDates) || prefDates.length === 0) {
  //       console.error("Preferred dates array is empty or invalid:", prefDates);
  //       return;
  //     }

  //     // Ensure prefCountries is not empty and contains valid values
  //     if (!Array.isArray(prefCountries) || prefCountries.length === 0) {
  //       console.error(
  //         "Preferred countries array is empty or invalid:",
  //         prefCountries
  //       );
  //       return;
  //     }

  //     console.log("Preferred dates:", prefDates);
  //     console.log("Preferred countries:", prefCountries);

  //     // Fetch all trips from the database
  //     const response = await filterTrips(null, null, null, null);
  //     const allTrips = JSON.parse(response).trips || [];

  //     // console.log("All trips:", allTrips);

  //     // Filter trips based on preferred dates and countries
  //     const filteredTrips = allTrips.filter((trip) => {
  //       // Check if the trip's start date is within any of the preferred date ranges
  //       const startDate = new Date(trip.start_date);
  //       const isDateMatch = prefDates.some((dateRange) => {
  //         const [startDatePref, endDatePref] = dateRange;
  //         const startDatePrefObj = new Date(startDatePref);
  //         const endDatePrefObj = new Date(endDatePref);
  //         return startDate >= startDatePrefObj && startDate <= endDatePrefObj;
  //       });

  //       // Check if the trip's country matches any of the preferred countries
  //       const isCountryMatch = prefCountries.some(
  //         (prefCountry) => prefCountry.code === trip.location.code
  //       );

  //       return isDateMatch && isCountryMatch;
  //     });

  //     console.log("Filtered trips:", filteredTrips);

  //     // Update state with filtered trips
  //     setTrips(filteredTrips);
  //     setRenderTrips(true);
  //   } catch (error) {
  //     console.error("Error fetching matched trips:", error);
  //   }
  // }

  const [maxTrips, setMaxTrips] = useState(5);
  const seeMoreTrips = () => setMaxTrips(maxTrips + 5);

  const [renderTrips, setRenderTrips] = useState(false);
  const [trips, setTrips] = useState([]); //fill trips with temptrips, IS RENDERED

  // makes the loop occur only once
  useEffect(() => {
    getMatchedTrips();
  }, []);

  return (
    <View style={styles.page}>
      <Text style={styles.message}>
        Shows trips happening in the same dates and countries you selected
      </Text>
      <ScrollView contentContainerStyle={styles.scroll}>
        {renderTrips
          ? trips.map((trip, index) => {
              if (index >= maxTrips) return null;
              return (
                <TripViewMatch
                  key={trip.trip_id}
                  trip={trip}
                  navigation={navigation}
                />
              );
            })
          : null}
        <View marginTop={3 * vh}>
          {trips.length > maxTrips ? (
            <TouchableOpacity onPress={() => seeMoreTrips()}>
              <Text style={styles.seeMoreText}>See More</Text>
            </TouchableOpacity>
          ) : null}
        </View>
      </ScrollView>
    </View>
  );
};

const ExploreScreen = (props) => {
  const { navigation } = props;
  const email = global.currentUser.email_id;

  //call backend function to get all trips with no filter
  //--filter but with 0 filter

  const [maxTrips, setMaxTrips] = useState(5);
  const seeMoreTrips = () => setMaxTrips(maxTrips + 5);

  const [trips, setTrips] = useState([]);

  const exploreTrips = async () => {
    await filterTrips(null, null, null, null).then((response) => {
      var fetchedTrips = JSON.parse(response)["trips"];
      var temp = [];

      fetchedTrips.forEach((newTrip) => {
        // check if user email is in participants and if so then dont push
        if (newTrip.participants.includes(global.currentUser.email_id)) {
          return;
        }

        temp.push(newTrip);
      });

      setTrips(temp);
    });
  };

  useEffect(() => {
    exploreTrips();
  }, []);

  return (
    <View style={styles.page}>
      <Text style={styles.message}>
        Find or create trips that match your style
      </Text>
      <Button
        mode="contained"
        theme={themes.buttonBlack}
        style={styles.createTripButton}
        labelStyle={{ marginHorizontal: 0 }}
        onPress={() => navigation.navigate("CreateTrip")}
      >
        Create a trip
      </Button>
      <ScrollView contentContainerStyle={styles.scroll}>
        {!trips
          ? null
          : trips.map((trip, index) => {
              if (index >= maxTrips) return null;
              return (
                <TripView
                  key={trip.trip_id}
                  trip={trip}
                  navigation={navigation}
                />
              );
            })}
        <View marginTop={3 * vh}>
          {trips.length > maxTrips ? (
            <TouchableOpacity onPress={() => seeMoreTrips()}>
              <Text style={styles.seeMoreText}>See More</Text>
            </TouchableOpacity>
          ) : null}
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeScreen = ({ navigation }) => {
  return (
    <>
      <StatusBar></StatusBar>
      <TopNav
        screen1={<ForYouScreen navigation={navigation} />}
        screen2={<ExploreScreen navigation={navigation} />}
      />
      <BottomNav active={"Home"} />
    </>
  );
};

const styles = StyleSheet.create({
  page: {
    flex: 1,
    alignItems: "flex-end",
    justifyContent: "top",
    gap: 3 * vh,
    backgroundColor: palette.white,
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
    paddingRight: 0.5 * vmin,
    fontSize: 5.6 * vmin,
    textTransform: "none",
    fontFamily: "Montserrat-Medium",
    color: palette.grey,
    overflow: "visible",
  },
  tabLabelActive: {
    fontSize: 5.6 * vmin,
    fontFamily: "Montserrat-SemiBold",
    color: palette.black,
    overflow: "visible",
  },
  tabIndicator: {
    marginLeft: 5.75 * vmin,
    backgroundColor: palette.yellow,
    height: 5,
  },
  scroll: {
    width: 100 * vmin,
    alignItems: "center",
    gap: 3 * vh,
    paddingBottom: 18 * vh,
  },
  message: {
    marginTop: 3 * vh,
    alignSelf: "center",
    width: 85 * vmin,
    fontFamily: "Lato-Regular",
    fontSize: 3.8 * vmin,
    color: palette.grey,
  },
  createTripButton: {
    width: 40 * vmin,
    height: 12 * vmin,
    justifyContent: "center",
    alignContent: "center",
    marginLeft: 7.5 * vmin,
    alignSelf: "flex-start",
  },
  iconContainer: {
    position: "absolute",
    display: "flex",
    top: -40,
    backgroundColor: "red",
  },
  seeMoreText: {
    fontFamily: "Lato-Bold",
    color: palette.purple,
    textDecorationLine: "underline",
    fontSize: 4.5 * vmin,
  },
});
