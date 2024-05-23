// import { StyleSheet, View, Text } from "react-native";
// import { Button } from "../button";
// import { Image } from "../image";
// import CountryCodes from "../../../assets/CountryCodes.json";
// import { themes, flags } from "../../style";
// import { dimensions } from "../../style";
// import { palette } from "../../style";
// import { createNavigationContainerRef } from "@react-navigation/native";

// import TripsService from "../../services/TripsService";
// const { joinTrip } = TripsService;

// [vw, vh, vmin, vmax] = dimensions;

// function formatDate(startDate, endDate) {
//   const monthsIndices = {
//     1: "Jan",
//     2: "Feb",
//     3: "Mar",
//     4: "Apr",
//     5: "May",
//     6: "Jun",
//     7: "Jul",
//     8: "Aug",
//     9: "Sep",
//     10: "Oct",
//     11: "Nov",
//     12: "Dec",
//   };

//   var parsedStartDate = new Date(startDate);
//   let sDate = parsedStartDate.getDate();
//   if (sDate < 10) sDate = "0" + sDate.toString();
//   let sMonth = monthsIndices[parsedStartDate.getMonth() + 1];
//   let sYear = parsedStartDate.getYear();

//   console.log(sDate + sMonth + sYear);

//   var parsedEndDate = new Date(endDate);
//   let eDate = parsedEndDate.getDate();
//   if (eDate < 10) eDate = "0" + eDate.toString();
//   let eMonth = monthsIndices[parsedEndDate.getMonth() + 1];
//   let eYear = parsedEndDate.getYear();

//   console.log(eDate + eMonth + eYear);

//   if (sMonth == eMonth) {
//     return sDate + " - " + eDate + " " + sMonth;
//   } else return sDate + " " + sMonth + " - " + eDate + " " + eMonth;
// }

// const TripView = (props) => {
//   const { style, children, trip, ...rest } = props;
//   const email = global.currentUser.email_id;
//   const navigation = props.navigation;

//   country = trip.location;

//   //   const handleJoinTrip = async () => {
//   //     try {
//   //       const status = await _joinTrip(trip.trip_id, email);
//   //       if (status === 200) {
//   //         // Trip joined successfully, perform any additional actions if needed
//   //       } else {
//   //         // Handle other status codes or errors
//   //       }
//   //     } catch (error) {
//   //       console.log(error);
//   //       // Handle fetch error
//   //     }
//   //   };

//   return (
//     <View style={styles.trip}>
//       <View style={styles.topGroup}>
//         <View style={styles.countryGroup}>
//           {flags[country.code] ? (
//             <Image style={styles.flagIcon} source={flags[country.code]} />
//           ) : (
//             <Text style={styles.countryText}>{country.code}</Text>
//           )}
//           <Text style={styles.countryText}>{country.name}</Text>
//         </View>
//         <Text style={styles.dateText}>
//           {formatDate(trip["start_date"], trip["end_date"])}
//         </Text>
//       </View>
//       <Text style={styles.details}>{trip.description}</Text>
//       <Text style={styles.groupText}>Going:</Text>
//       <View style={styles.middleGroup}>
//         <View style={styles.profilePicsGroup}>
//           {(() => {
//             const profilePics = [];

//             for (let i = 0; trip.going && i < trip.going.length; i++) {
//               if (i == 6) break;

//               if (trip.going[i].profilePic)
//                 profilePics.push(
//                   <Image
//                     source={trip.going[i].profilePic}
//                     style={styles.profilePic}
//                     key={i}
//                   ></Image>
//                 );
//               else
//                 profilePics.push(
//                   <Text style={styles.profilePicName} key={i}>
//                     {trip.going[i].name[0]}
//                   </Text>
//                 );
//             }
//             return profilePics;
//           })()}
//         </View>
//         {trip.participants.length > 6 ? (
//           <Button
//             mode="text"
//             labelStyle={{ marginHorizontal: 0 }}
//             style={styles.showGroupButton}
//             theme={themes.button}
//           >
//             +{trip.participants.length - 6}
//           </Button>
//         ) : null}
//       </View>
//       <View style={styles.bottomGroup}>
//         <Button
//           mode="contained"
//           labelStyle={{ marginHorizontal: 0 }}
//           style={styles.joinButton}
//           theme={themes.button}
//           onPress={() => {
//             navigation.navigate("Verification");
//             global.currentTrip = trip;
//           }}
//         >
//           Join the trip
//         </Button>
//         <View style={styles.goingGroup}>
//           <Image
//             style={styles.goingIcon}
//             source={require("../../../assets/icons/people.png")}
//           />
//           <Text style={styles.goingText}>
//             {trip.participants ? trip.participants.length : 0}/{trip.max_people}
//           </Text>
//         </View>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   trip: {
//     width: 85 * vmin,
//     paddingVertical: 1 * vmin,
//     paddingHorizontal: 6 * vmin,
//     borderColor: palette.lightGrey2,
//     borderWidth: 2,
//     borderRadius: 18,
//     gap: 2 * vmin,
//   },
//   topGroup: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     gap: 0 * vmin,
//     alignItems: "center",
//     marginBottom: 1 * vmin,
//   },
//   countryGroup: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 1 * vmin,
//   },
//   countryText: {
//     fontFamily: "Lato-Bold",
//     fontSize: 2.2 * vh,
//   },
//   flagIcon: {
//     width: 4 * vh,
//     resizeMode: "contain",
//   },
//   dateText: {
//     fontFamily: "Lato-Regular",
//     fontSize: 2 * vh,
//   },
//   details: {
//     color: palette.black,
//     fontFamily: "Lato-Regular",
//     fontSize: 2 * vh,
//   },
//   groupText: {
//     color: palette.grey,
//     fontFamily: "Lato-Regular",
//     fontSize: 1.8 * vh,
//   },
//   middleGroup: {
//     padding: 0,
//     flexDirection: "row",
//     alignContent: "flex-start",
//     marginBottom: 1 * vmin,
//   },
//   profilePicsGroup: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: -1 * vh,
//   },
//   profilePic: {
//     display: "flex",
//     width: 12 * vmin,
//     height: 12 * vmin,
//     backgroundColor: palette.purple,
//     borderRadius: 6 * vmin,
//     borderColor: palette.white,
//     borderWidth: 0.8 * vmin,
//   },
//   profilePicName: {
//     display: "flex",
//     width: 12 * vmin,
//     height: 12 * vmin,
//     backgroundColor: palette.purple,
//     borderRadius: 6 * vmin,
//     textAlign: "center",
//     textAlignVertical: "center",
//     fontFamily: "Lato-Bold",
//     fontSize: 6 * vmin,
//     color: palette.white,
//     borderColor: palette.white,
//     borderWidth: 0.8 * vmin,
//   },
//   showGroupButton: {
//     minWidth: 0,
//     maxWidth: 5 * vh,
//     width: 5 * vh,
//   },
//   bottomGroup: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//   },
//   joinButton: {
//     width: 35 * vmin,
//     height: 12 * vmin,
//     justifyContent: "center",
//     alignContent: "center",
//   },
//   goingGroup: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 0.8 * vh,
//   },
//   goingIcon: {
//     width: 2.5 * vh,
//     resizeMode: "contain",
//     tintColor: palette.purple,
//   },
//   goingText: {
//     color: palette.purple,
//     fontSize: 2 * vh,
//     marginBottom: 0.4 * vh,
//   },
// });

// export default TripView;

import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import { Button } from "../button";
import { themes, flags } from "../../style";
import { dimensions, palette } from "../../style";
import TripsService from "../../services/TripsService";

const [vw, vh, vmin, vmax] = dimensions;

const formatDate = (startDate, endDate) => {
  const monthsIndices = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const parseDate = (date) => {
    const parsedDate = new Date(date);
    const day = String(parsedDate.getDate()).padStart(2, "0");
    const month = monthsIndices[parsedDate.getMonth()];
    const year = parsedDate.getFullYear();
    return { day, month, year };
  };

  const start = parseDate(startDate);
  const end = parseDate(endDate);

  return start.month === end.month
    ? `${start.day} - ${end.day} ${start.month}`
    : `${start.day} ${start.month} - ${end.day} ${end.month}`;
};

const TripView = (props) => {
  const { trip, navigation } = props;
  const country = trip.location;
  const [participants, setParticipants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchParticipants = async () => {
      try {
        const response = await TripsService.getParticipants(trip.trip_id);
        if (response.status === 200) {
          setParticipants(response.data.profile_pics);
        } else {
          console.error("Failed to fetch participants:", response.status);
        }
      } catch (error) {
        console.error("Error fetching participants:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchParticipants();
  }, [trip.trip_id]);

  const participantsArray = participants
    ? Object.entries(participants).map(([email, profilePic]) => ({
        email,
        profilePic,
      }))
    : [];
  return (
    <View style={styles.trip}>
      <View style={styles.topGroup}>
        <View style={styles.countryGroup}>
          {flags[country.code] ? (
            <Image style={styles.flagIcon} source={flags[country.code]} />
          ) : (
            <Text style={styles.countryText}>{country.code}</Text>
          )}
          <Text style={styles.countryText}>{country.name}</Text>
        </View>
        <Text style={styles.dateText}>
          {formatDate(trip.start_date, trip.end_date)}
        </Text>
      </View>
      <Text style={styles.details}>{trip.description}</Text>
      <Text style={styles.groupText}>{` ${participantsArray.length} ${
        participantsArray.length > 0 ? "Going" : "No one has joined yet"
      }`}</Text>
      <View style={styles.middleGroup}>
        <View style={styles.profilePicsGroup}>
          {participantsArray.slice(0, 6).map((participant, index) =>
            participant.profilePic ? (
              <Image
                source={{ uri: participant.profilePic }}
                style={styles.profilePic}
                key={index}
              />
            ) : (
              <Text style={styles.profilePicName} key={index}>
                {participant.email[0]}
              </Text>
            )
          )}
        </View>
        {participantsArray.length > 6 && (
          <Button
            mode="text"
            labelStyle={{ marginHorizontal: 0 }}
            style={styles.showGroupButton}
            theme={themes.button}
          >
            +{participants.length - 6}
          </Button>
        )}
      </View>
      <View style={styles.bottomGroup}>
        <Button
          mode="contained"
          labelStyle={{ marginHorizontal: 0 }}
          style={styles.joinButton}
          theme={themes.button}
          onPress={() => {
            navigation.navigate("Verification");
            global.currentTrip = trip;
          }}
        >
          Join the trip
        </Button>
        <View style={styles.goingGroup}>
          <Image
            style={styles.goingIcon}
            source={require("../../../assets/icons/people.png")}
          />
          <Text style={styles.goingText}>
            {participantsArray.length}/{trip.max_people}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  trip: {
    width: 85 * vmin,
    paddingVertical: 1 * vmin,
    paddingHorizontal: 6 * vmin,
    borderColor: palette.lightGrey2,
    borderWidth: 2,
    borderRadius: 18,
    gap: 2 * vmin,
  },
  topGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 1 * vmin,
  },
  countryGroup: {
    flexDirection: "row",
    alignItems: "center",
    gap: 1 * vmin,
  },
  countryText: {
    fontFamily: "Lato-Bold",
    fontSize: 2.2 * vh,
  },
  flagIcon: {
    width: 4 * vh,
    resizeMode: "contain",
  },
  dateText: {
    fontFamily: "Lato-Regular",
    fontSize: 2 * vh,
  },
  details: {
    color: palette.black,
    fontFamily: "Lato-Regular",
    fontSize: 2 * vh,
  },
  groupText: {
    color: palette.grey,
    fontFamily: "Lato-Regular",
    fontSize: 1.8 * vh,
  },
  middleGroup: {
    flexDirection: "row",
    alignContent: "flex-start",
    marginBottom: 1 * vmin,
  },
  profilePicsGroup: {
    flexDirection: "row",
    alignItems: "center",
    gap: -1 * vh,
  },
  profilePic: {
    width: 12 * vmin,
    height: 12 * vmin,
    backgroundColor: palette.purple,
    borderRadius: 6 * vmin,
    borderColor: palette.white,
    borderWidth: 0.8 * vmin,
  },
  profilePicName: {
    width: 12 * vmin,
    height: 12 * vmin,
    backgroundColor: palette.purple,
    borderRadius: 6 * vmin,
    textAlign: "center",
    textAlignVertical: "center",
    fontFamily: "Lato-Bold",
    fontSize: 6 * vmin,
    color: palette.white,
    borderColor: palette.white,
    borderWidth: 0.8 * vmin,
  },
  showGroupButton: {
    minWidth: 0,
    maxWidth: 5 * vh,
    width: 5 * vh,
  },
  bottomGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  joinButton: {
    width: 35 * vmin,
    height: 12 * vmin,
    justifyContent: "center",
    alignContent: "center",
  },
  goingGroup: {
    flexDirection: "row",
    alignItems: "center",
    gap: 0.8 * vh,
  },
  goingIcon: {
    width: 2.5 * vh,
    resizeMode: "contain",
    tintColor: palette.purple,
  },
  goingText: {
    color: palette.purple,
    fontSize: 2 * vh,
    marginBottom: 0.4 * vh,
  },
});

export default TripView;

