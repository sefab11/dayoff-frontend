import {
  View,
  Text,
  Keyboard,
  TouchableWithoutFeedback,
  StatusBar,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { Button, BottomNav, TripChatView, TripsTopNav } from "../components";
import { StyleSheet } from "react-native";
import { palette, themes, dimensions, flags } from "../style";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import React, { useEffect, useState } from "react";
import { useNavigation, useNavigationState } from "@react-navigation/native";

import TripsService from "../services/TripsService";
const { filterTrips } = TripsService;
import MessageService from "../services/MessageService";
const { getMessages } = MessageService;

const Tab = createMaterialTopTabNavigator();

[vw, vh, vmin, vmax] = dimensions;

// async function getTrips(setTripsState, specificTrips) {
//   var messages = [];
//   var pastTrips = [];
//   var currentTrips = [];
//   // get the current date
//   let currentDate = new Date();

// get all trips that the user has joined
//   await filterTrips(null, global.currentUser.email_id, null, null)
//     .then(async (response) => {
//       // parse response to get array of trips
//       response = JSON.parse(response)["trips"];
//       if (response == []) return;

//       // loop through each trip
//       for (let i = 0; i < response.length; i++) {
//         const trip = response[i];
//         // get the messages of the group based on the trip id
//         await getMessages(trip.trip_id).then((response) => {
//           messages = JSON.parse(response).messages;
//         });

//         // get the current trip end date and compare with the current date
//         // if end date < current date then add to past trips
//         // else add to current trips
//         let tripEndDate = new Date(trip.end_date);
//         if (tripEndDate < currentDate) pastTrips.push([trip, messages]);
//         else currentTrips.push([trip, messages]);
//       }
//     })
//     .then(() => {
//       if (specificTrips === "past") setTripsState(pastTrips);
//       else if (specificTrips === "current") setTripsState(currentTrips);
//     });
// }

async function getTrips(setTripsState, specificTrips) {
  console.log("Fetching trips for:", specificTrips);

  var messages = [];
  var pastTrips = [];
  var currentTrips = [];
  // get the current date
  let currentDate = new Date();

  // get all trips that the user has joined
  await filterTrips(null, global.currentUser.email_id, null, null)
    .then(async (response) => {
      // parse response to get array of trips
      response = JSON.parse(response)["trips"];
      if (response.length === 0) return;

      // console.log("All trips:", response);

      // loop through each trip
      for (let i = 0; i < response.length; i++) {
        const trip = response[i];
        // get the messages of the group based on the trip id
        await getMessages(trip.trip_id).then((response) => {
          messages = JSON.parse(response).messages;
        });

        // get the current trip end date and compare with the current date
        // if end date < current date then add to past trips
        // else add to current trips
        let tripEndDate = new Date(trip.end_date);
        if (tripEndDate < currentDate) pastTrips.push([trip, messages]);
        else currentTrips.push([trip, messages]);
      }
    })
    .then(() => {
      if (specificTrips === "past") setTripsState(pastTrips);
      else if (specificTrips === "current") setTripsState(currentTrips);
    });

  console.log("Past trips:", pastTrips);
  console.log("Current trips:", currentTrips);
}

const MyTripsScreen = (props) => {
  const { navigation } = props;

  const [trips, setTrips] = useState(null);

  useEffect(() => {
    getTrips(setTrips, "current");
    console.log("aa" + trips);
  }, []);

  return (
    <View style={styles.page}>
      <ScrollView contentContainerStyle={styles.scroll}>
        {trips
          ? trips.map((trip, index) => (
              <TripChatView key={index} trip={trip[0]} messages={trip[1]} />
            ))
          : null}
      </ScrollView>
    </View>
  );
};

const PastScreen = (props) => {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = () => {
      getTrips(setTrips, "past");
      setLoading(false); // Set loading to false after triggering the fetch
    };

    fetchData();
  }, []);

  useEffect(() => {
    console.log("Trips in PastScreen:", trips);
  }, [trips]);

  return (
    <View style={styles.page}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000dd" /> // Show loading indicator while fetching data
      ) : (
        <ScrollView contentContainerStyle={styles.scroll}>
          {trips && trips.length > 0 ? (
            trips.map((trip, index) => (
              <TripChatView key={index} trip={trip[0]} messages={trip[1]} />
            ))
          ) : (
            <Text>No past trips</Text>
          )}
        </ScrollView>
      )}
    </View>
  );
};

export default TripsScreen = ({ navigation }) => {
  const [pastTrips, setPastTrips] = useState([]);
  const [currentTrips, setCurrentTrips] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const allTrips = await filterTrips(
          null,
          global.currentUser.email_id,
          null,
          null
        );
        const currentDate = new Date();

        const pastTrips = [];
        const currentTrips = [];

        if (Array.isArray(allTrips)) {
          allTrips.forEach((trip) => {
            const tripEndDate = new Date(trip.end_date);
            if (tripEndDate < currentDate) {
              pastTrips.push(trip);
            } else {
              currentTrips.push(trip);
            }
          });
        }
        setPastTrips(pastTrips);
        setCurrentTrips(currentTrips);
      } catch (error) {
        console.error("Error fetching trips:", error);
      }
    };

    fetchData();
  }, []);
  /* TODO-done:
        get all users joined trips and loop through each trip
        if enddate has passed then add trip to past trips
        else add to current trips
        pass past trips to pastscreen and current trips to mytripsscreen
    */

  return (
    <>
      <StatusBar></StatusBar>
      <TripsTopNav
        screen1={<MyTripsScreen navigation={navigation} />}
        screen2={<PastScreen navigation={navigation} pastTrips={pastTrips} />}
      />
      <BottomNav active={"Trips"} />
    </>
  );
};

const styles = StyleSheet.create({
  page: {
    flex: 1,
    alignItems: "center",
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
  scroll: {
    width: 100 * vmin,
    alignItems: "center",
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
});
