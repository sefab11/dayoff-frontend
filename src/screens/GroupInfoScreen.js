// import {
//   StyleSheet,
//   Keyboard,
//   TouchableWithoutFeedback,
//   TouchableOpacity,
//   View,
//   Image,
//   ScrollView,
//   Text,
// } from "react-native";
// import { palette, dimensions } from "../style";
// import { useNavigation } from "@react-navigation/native";

// import TripsService from "../services/TripsService";
// import React, { useState, useEffect } from "react";

// const { leaveTrip } = TripsService;

// [vw, vh, vmin, vmax] = dimensions;

// const UserInfo = (props) => {
//   const { name, country, job, pic, isLastMember } = props;
//   const navigation = useNavigation();

//   return (
//     <TouchableOpacity
//       style={styles.memberContainer}
//       borderBottomWidth={isLastMember ? 0 : 1}
//       onPress={() => navigation.navigate("UserInfo")}
//     >
//       {pic == null ? (
//         <Text style={styles.emptyProfilePic}>{name[0]}</Text>
//       ) : (
//         <Image source={pic} style={styles.profilePic} />
//       )}
//       <View style={styles.memberInfo}>
//         <Text style={styles.memberName}>{name}</Text>
//         <Text style={styles.memberJob}>
//           {country} - {job}
//         </Text>
//       </View>
//     </TouchableOpacity>
//   );
// };

// export default GroupInfoScreen = ({ navigation }) => {
//   const emailAddress = global.currentUser.email_id;
//   const trip = global.currentTrip;

//   //TODO: get members data from chatscreen / backend
//   useEffect(() => {
//     const fetchMembers = async () => {
//       try {
//         const response = await fetch(
//           `http://127.0.0.1:8000/fetch_group_members?trip_id=${trip.trip_id}`,
//           {
//             method: "POST",
//             headers: {
//               Accept: "application/json",
//               "Content-Type": "application/json",
//             },
//             body: JSON.stringify({}),
//           }
//         );
//         const data = await response.json();
//         setMembers(data.group_members);
//       } catch (error) {
//         console.error("Error fetching group members:", error);
//       }
//     };
//     fetchMembers();
//   }, [trip.trip_id]);

//   // const currentUserId = "2";
//   // const members = [
//   //   {
//   //     id: "1",
//   //     name: "Jane",
//   //     countryOfOrigin: "USA",
//   //     job: "Product Manager @ Apple",
//   //     profilePic: require("../../assets/images/profilePics/1.jpg"),
//   //   },
//   //   {
//   //     id: "2",
//   //     name: "Gunpei",
//   //     countryOfOrigin: "UK",
//   //     job: "Brand Designer @ Meta",
//   //     profilePic: require("../../assets/images/profilePics/2.jpg"),
//   //   },
//   //   {
//   //     id: "3",
//   //     name: "Peter",
//   //     countryOfOrigin: "France",
//   //     job: "Backend Engineer @ Uber",
//   //     profilePic: require("../../assets/images/profilePics/3.jpg"),
//   //   },
//   //   {
//   //     id: "4",
//   //     name: "Summer",
//   //     countryOfOrigin: "Canada",
//   //     job: "Game Developer @ EA Sports",
//   //     profilePic: require("../../assets/images/profilePics/4.jpg"),
//   //   },
//   //   {
//   //     id: "5",
//   //     name: "Miryam",
//   //     countryOfOrigin: "USA",
//   //     job: "Recruiter @ Microsoft",
//   //     profilePic: require("../../assets/images/profilePics/5.jpg"),
//   //   },
//   //   {
//   //     id: "6",
//   //     name: "Ambuj",
//   //     countryOfOrigin: "UK",
//   //     job: "Game Developer @ Rockstar",
//   //     profilePic: require("../../assets/images/profilePics/6.jpg"),
//   //   },
//   //   {
//   //     id: "7",
//   //     name: "Craig",
//   //     countryOfOrigin: "Scotland",
//   //     job: "Front Developer @ DayOff",
//   //     profilePic: null,
//   //   },
//   // ];

//   const leaveFromTrip = async () => {
//     await leaveTrip(trip.trip_id, emailAddress).then((status) => {
//       if (status === 200) navigation.replace("Home");
//     });
//   };

//   //   const sendInvitation = async () => {
//   //     try {
//   //       const status = await inviteTrip(trip.trip_id, emailAddress);
//   //       if (status === 200) {
//   //         // Invitation sent successfully
//   //         console.log("Invitation sent successfully");
//   //       } else {
//   //         // Error handling if the invitation fails
//   //         console.error("Failed to send invitation");
//   //       }
//   //     } catch (error) {
//   //       console.error("Error sending invitation:", error);
//   //     }
//   //   };

//   return (
//     <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
//       <View style={styles.page}>
//         <View style={styles.header}>
//           <TouchableOpacity
//             style={{ justifyContent: "center" }}
//             onPress={() => navigation.goBack()}
//           >
//             <Image
//               style={styles.returnButton}
//               source={require("../../assets/icons/chevron_left.png")}
//             />
//           </TouchableOpacity>

//           <View style={styles.headerCenter}>
//             <Text style={styles.header1}>Group Info</Text>
//             <Text style={styles.header2}>{members.length} Members</Text>
//           </View>

//           <TouchableOpacity
//             onPress={() => leaveFromTrip()}
//             style={{ justifyContent: "center" }}
//           >
//             <Image
//               style={styles.exitButton}
//               source={require("../../assets/icons/exit.png")}
//             />
//           </TouchableOpacity>
//           {/* <TouchableOpacity
//             onPress={sendInvitation}
//             style={{ justifyContent: "center" }}
//           >
//             <Image
//               style={styles.exitButton}
//               source={require("../../assets/icons/exit.png")}
//             />
//           </TouchableOpacity> */}
//         </View>
//         <ScrollView width="100%">
//           <TouchableWithoutFeedback width="100%">
//             <View style={styles.members}>
//               {members.map((member) => (
//                 <UserInfo
//                   name={member.name}
//                   country={member.countryOfOrigin}
//                   job={member.job}
//                   pic={member.profilePic}
//                   isLastMember={member.id == members.length}
//                 />
//               ))}
//             </View>
//           </TouchableWithoutFeedback>
//         </ScrollView>

//         <View style={styles.footer}>
//           <Text style={styles.message}>
//             Share trip with anyone interested to join directly:{" "}
//             <Text style={styles.link} onPress={() => {}}>
//               dayoff.space/br101
//             </Text>
//           </Text>
//         </View>
//       </View>
//     </TouchableWithoutFeedback>
//   );
// };

// const styles = StyleSheet.create({
//   page: {
//     paddingTop: 3 * vh,
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "flex-start",
//     backgroundColor: palette.white,
//   },
//   header: {
//     width: 100 * vmin,
//     display: "flex",
//     flexDirection: "row",
//     justifyContent: "space-between",
//     paddingHorizontal: 2 * vmin,
//   },
//   headerMain: {
//     alignSelf: "center",
//     display: "flex",
//     flexDirection: "column",
//   },

//   header1: {
//     fontFamily: "Montserrat-Bold",
//     fontSize: 3.25 * vh,
//     paddingBottom: 0.5 * vh,
//     letterSpacing: -0.2 * vh,
//     textAlign: "center",
//   },
//   header2: {
//     fontFamily: "Montserrat-Bold",
//     fontSize: 2 * vh,
//     paddingBottom: 0.5 * vh,
//     letterSpacing: -0.2 * vh,
//     textAlign: "center",
//     color: palette.grey,
//   },

//   returnButton: {
//     resizeMode: "contain",
//     height: 4 * vh,
//   },
//   exitButton: {
//     resizeMode: "contain",
//     height: 4 * vh,
//     tintColor: palette.lightRed,
//   },

//   members: {
//     width: "80%",
//     alignSelf: "center",
//     display: "flex",
//     flexDirection: "column",
//   },

//   memberContainer: {
//     borderBottomWidth: 1,
//     borderColor: palette.lightGrey,
//     display: "flex",
//     flexDirection: "row",
//     paddingVertical: 2 * vh,
//   },
//   memberInfo: {
//     display: "flex",
//     flexDirection: "column",
//     justifyContent: "center",
//     textAlignVertical: "center",
//     marginHorizontal: 2 * vmin,
//   },
//   memberName: {
//     fontSize: 4.2 * vmin,
//     fontFamily: "Montserrat-Bold",
//   },
//   memberJob: {
//     fontSize: 3.2 * vmin,
//     fontFamily: "Montserrat-SemiBold",
//     color: palette.grey,
//   },

//   profilePic: {
//     resizeMode: "contain",
//     width: 12.5 * vmin,
//     height: 12.5 * vmin,
//     borderRadius: 10 * vmin,
//   },
//   emptyProfilePic: {
//     width: 12.5 * vmin,
//     height: 12.5 * vmin,
//     borderRadius: 10 * vmin,
//     textAlign: "center",
//     textAlignVertical: "center",
//     backgroundColor: palette.purple,
//     color: palette.white,
//     fontSize: 4.5 * vmin,
//   },

//   footer: {
//     width: "80%",
//     borderTopWidth: 1,
//     borderColor: palette.lightGrey,
//     paddingTop: 2 * vh,
//     paddingBottom: 8 * vh,
//   },
//   message: {
//     fontSize: 3.5 * vmin,
//     fontFamily: "Montserrat-SemiBold",
//   },
//   link: {
//     fontSize: 3.5 * vmin,
//     fontFamily: "Montserrat-SemiBold",
//     color: palette.purple,
//     textDecorationLine: "underline",
//   },
// });

import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
  Text,
} from "react-native";
import { palette, dimensions } from "../style";
import { useNavigation } from "@react-navigation/native";
import { TextInput } from "react-native";

import TripsService from "../services/TripsService";
import { Alert } from "react-native";
import UserService from "../services/UserService";
const { fetchMembers } = UserService;

// Define UserInfo component
const UserInfo = ({
  user_name,
  country,
  job,
  profile_picture,
  isLastMember,
}) => {
  // Implementation of UserInfo component
  return (
    <View style={styles.memberContainer}>
      {/* Render user information */}
      <Image source={{ uri: profile_picture }} style={styles.profilePic} />
      <View style={styles.memberInfo}>
        <Text style={styles.memberName}>{user_name}</Text>
        <Text style={styles.memberCountry}>{country}</Text>
        <Text style={styles.memberJob}>{job}</Text>
      </View>
    </View>
  );
};

const { leaveTrip, inviteTrip } = TripsService;

const GroupInfoScreen = ({ navigation }) => {
  const emailAddress = global.currentUser.email_id;
  const trip = global.currentTrip;

  const [members, setMembers] = useState([]);
  const [invitedUserEmail, setInvitedUserEmails] = useState(
    trip.inviteduseremail
  );
  const [leftTrip, setLeftTrip] = useState(false);
  // const [participantsEmail, setParticipantsEmail] = useState([]);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/fetch_group_members?trip_id=${trip.trip_id}`,
          {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({}),
          }
        );
        const data = await response.json();
        setMembers(data.group_members);
        // setParticipantsEmail(data.participants_email);
      } catch (error) {
        console.error("Error fetching group members:", error);
      }
    };
    // if (!leftTrip) {
    // Check if the user hasn't left the trip before fetching members
    fetchMembers();
    // }
  }, [trip.trip_id]);

  // const ParticipantEmail = ({ email }) => {
  //   return (
  //     <View style={styles.participantContainer}>
  //       <Text style={styles.participantEmail}>{email}</Text>
  //     </View>
  //   );
  // };

  const leaveFromTrip = async () => {
    try {
      const status = await leaveTrip(trip.trip_id, emailAddress);
      if (status === 200) {
        // setLeftTrip(true); // Set leftTrip to true when the user leaves the trip
        navigation.replace("Home");
        fetchMembers();
      }
    } catch (error) {
      console.error("Error leaving trip:", error);
    }
  };

  const sendInvitation = async () => {
    try {
      const status = await inviteTrip(trip.trip_id, invitedUserEmail);
      if (status === 200) {
        console.log("Invitation sent successfully");
      } else if (status === 500) {
        console.error("Failed to send invitation. Status:", status);
        // Handle the 500 error accordingly
      } else {
        console.error("Unexpected status code:", status);
      }
    } catch (error) {
      console.error("Error sending invitation:", error.message);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.page}>
        <View style={styles.header}>
          <TouchableOpacity
            style={{ justifyContent: "center" }}
            onPress={() => navigation.goBack()}
          >
            <Image
              style={styles.returnButton}
              source={require("../../assets/icons/chevron_left.png")}
            />
          </TouchableOpacity>

          <View style={styles.headerCenter}>
            <Text style={styles.header1}>Group Info</Text>
            <Text style={styles.header2}>
              {members ? members.length : 0} Members
            </Text>
          </View>

          <TouchableOpacity
            onPress={() => leaveFromTrip()}
            style={{ justifyContent: "center" }}
          >
            <Image
              style={styles.exitButton}
              source={require("../../assets/icons/exit.png")}
            />
          </TouchableOpacity>
        </View>
        <ScrollView width="100%">
          <TouchableWithoutFeedback width="100%">
            <View style={styles.members}>
              {members &&
                members.map((member) => (
                  <UserInfo
                    key={member.id}
                    user_name={member.user_name}
                    country={member.country}
                    job={member.job}
                    profile_picture={member.profilePic}
                    isLastMember={member.id == members.length}
                  />
                ))}
              {/* <View style={styles.participantsContainer}>
                <Text style={styles.participantsHeader}>
                  Participants Email:
                </Text>
                {participantsEmail &&
                  participantsEmail.map((email, index) => (
                    <Text key={index} style={styles.participantEmail}>
                      {email}
                    </Text>
                  ))}
              </View> */}
            </View>
          </TouchableWithoutFeedback>
        </ScrollView>
        <View style={styles.inviteContainer}>
          <TextInput
            style={styles.inviteInput}
            placeholder="Enter email addresses to send invited"
            value={invitedUserEmail}
            onChangeText={setInvitedUserEmails}
            multiline
          />
          {/* <TouchableOpacity onPress={sendInvitation}>
            <Text style={styles.inviteButton}>Send Invite</Text>
          </TouchableOpacity> */}
        </View>

        {/* <View style={styles.footer}>
          <Text style={styles.message}>
            Share trip with anyone interested to join directly:{" "}
            <Text
              style={styles.link}
              onPress={() => sendInvitation(trip.trip_id, invitedUserEmail)}
            >
              dayoff.space/br101
            </Text>
          </Text>
        </View> */}
        <View style={styles.footer}>
          <Text style={styles.message}>
            Share trip with anyone interested to join directly:{" "}
            <Text
              style={styles.link}
              onPress={() => {
                sendInvitation(trip.trip_id, invitedUserEmail)
                  .then(() => {
                    // If invitation sent successfully, show success alert
                    Alert.alert(
                      "Invitation Sent",
                      "Invitation has been sent successfully.",
                      [
                        {
                          text: "OK",
                          onPress: () => {
                            // Clear the invitedUserEmail after successful invitation
                            setInvitedUserEmails("");
                          },
                        },
                      ]
                    );
                  })
                  .catch(() => {
                    // If there was an error in sending invitation, show error alert
                    Alert.alert(
                      "Error",
                      "Failed to send invitation. Please try again later."
                    );
                  });
              }}
            >
              dayoff.space/br101
            </Text>
          </Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default GroupInfoScreen;

const styles = StyleSheet.create({
  page: {
    paddingTop: 3 * vh,
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: palette.white,
  },
  header: {
    width: 100 * vmin,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 2 * vmin,
  },
  headerMain: {
    alignSelf: "center",
    display: "flex",
    flexDirection: "column",
  },

  header1: {
    fontFamily: "Montserrat-Bold",
    fontSize: 3.25 * vh,
    paddingBottom: 0.5 * vh,
    letterSpacing: -0.2 * vh,
    textAlign: "center",
  },
  header2: {
    fontFamily: "Montserrat-Bold",
    fontSize: 2 * vh,
    paddingBottom: 0.5 * vh,
    letterSpacing: -0.2 * vh,
    textAlign: "center",
    color: palette.grey,
  },

  returnButton: {
    resizeMode: "contain",
    height: 4 * vh,
  },
  exitButton: {
    resizeMode: "contain",
    height: 4 * vh,
    tintColor: palette.lightRed,
  },

  members: {
    width: "80%",
    alignSelf: "center",
    display: "flex",
    flexDirection: "column",
  },

  memberContainer: {
    borderBottomWidth: 1,
    borderColor: palette.lightGrey,
    display: "flex",
    flexDirection: "row",
    paddingVertical: 2 * vh,
  },
  memberInfo: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    textAlignVertical: "center",
    marginHorizontal: 2 * vmin,
  },
  memberName: {
    fontSize: 4.2 * vmin,
    fontFamily: "Montserrat-Bold",
  },
  memberJob: {
    fontSize: 3.2 * vmin,
    fontFamily: "Montserrat-SemiBold",
    color: palette.grey,
  },

  profilePic: {
    resizeMode: "contain",
    width: 12.5 * vmin,
    height: 12.5 * vmin,
    borderRadius: 10 * vmin,
  },
  emptyProfilePic: {
    width: 12.5 * vmin,
    height: 12.5 * vmin,
    borderRadius: 10 * vmin,
    textAlign: "center",
    textAlignVertical: "center",
    backgroundColor: palette.purple,
    color: palette.white,
    fontSize: 4.5 * vmin,
  },

  footer: {
    width: "80%",
    borderTopWidth: 1,
    borderColor: palette.lightGrey,
    paddingTop: 2 * vh,
    paddingBottom: 8 * vh,
  },
  message: {
    fontSize: 3.5 * vmin,
    fontFamily: "Montserrat-SemiBold",
  },
  link: {
    fontSize: 3.5 * vmin,
    fontFamily: "Montserrat-SemiBold",
    color: palette.purple,
    textDecorationLine: "underline",
  },
});
