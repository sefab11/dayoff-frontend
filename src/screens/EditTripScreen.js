// import {
//   View,
//   Keyboard,
//   TouchableWithoutFeedback,
//   ScrollView,
// } from "react-native";
// import {
//   Button,
//   HeaderBack,
//   MultilineInput,
//   PasswordInput,
//   TextInput,
// } from "../components";
// import { StyleSheet } from "react-native";
// import { palette, themes } from "../style";
// import { useState } from "react";
// import { ShowSelectedDate, ShowSelectedCountry } from "../components";

// import TripsService from "../services/TripsService";
// const { updateTrip } = TripsService;

// export default EditTripScreen = ({ navigation }) => {
//   const email = global.currentUser.email_id;
//   const trip = global.currentTrip;

//   // fixed values
//   const date = [trip.start_date, trip.end_date];
//   const country = [trip.location];

//   //enables editable people and description in the sub components
//   // variables
//   const [numPeople, setNumPeople] = useState(trip.participants.length);
//   const [description, setDescription] = useState(trip.description);
//   const [participants, setParticipants] = useState(trip.participants);

//   // Function to update trip details
//   const handleUpdateTrip = async () => {
//     try {
//       const status = await updateTrip({
//         trip_id: trip.trip_id,
//         num_people: numPeople,
//         description: description,
//         participants: participants, // Pass participants directly to the backend
//       });
//       if (status === 200) {
//         navigation.replace("Home");
//       } else {
//         console.log("Error occurred updating the trip");
//       }
//     } catch (error) {
//       console.error("Error occurred:", error);
//     }
//   };
//   // State variables for managing participant emails
//   const [participantEmail, setParticipantEmail] = useState("");

//   // Function to handle change in participant email
//   // const handleParticipantEmailChange = (index, email) => {
//   //   const newParticipantEmails = [...participantEmails];
//   //   newParticipantEmails[index] = email;
//   //   setParticipantEmails(newParticipantEmails);
//   // };

//   // const addParticipant = () => {
//   //   if (
//   //     participantEmail.trim() !== "" &&
//   //     participants.indexOf(participantEmail) === -1
//   //   ) {
//   //     setParticipants([...participants, participantEmail]);
//   //     setParticipantEmail("");
//   //   }
//   // };

//   // const removeParticipant = (email) => {
//   //   setParticipants(participants.filter((p) => p !== email));
//   // };

//   return (
//     <ScrollView contentContainerStyle={styles.scrollViewContainer}>
//       <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
//         <View style={{ flex: 1 }}>
//           {" "}
//           {/* Wrap all content within a single View */}
//           <View style={styles.page}>
//             <HeaderBack>Edit trip</HeaderBack>
//             <View style={styles.inputGroup}>
//               <ShowSelectedDate
//                 title={null}
//                 titleStyle={null}
//                 label={"Select date"}
//                 labelStyle={styles.selectLabel}
//                 boxWidth={80 * vmin}
//                 initialDates={[date]}
//               />
//               <ShowSelectedCountry
//                 title={null}
//                 titleStyle={null}
//                 label={"Select country"}
//                 labelStyle={styles.selectLabel}
//                 boxWidth={80 * vmin}
//                 initialCountries={country}
//               />
//               {participants.map((participant, index) => (
//                 <View key={index}>
//                   <Text>{participant}</Text>
//                   <Button
//                     onPress={() =>
//                       setParticipants(
//                         participants.filter((p, i) => i !== index)
//                       )
//                     }
//                   >
//                     Remove
//                   </Button>
//                 </View>
//               ))}
//               <View>
//                 <TextInput
//                   style={styles.textInput}
//                   mode="outlined"
//                   label="Participant Email"
//                   value={participantEmail}
//                   onChangeText={(text) => setParticipantEmail(text)}
//                 />
//                 <Button
//                   mode="contained"
//                   onPress={() =>
//                     setParticipants([...participants, participantEmail])
//                   }
//                 >
//                   Add Participant
//                 </Button>
//               </View>
//             </View>
//             <TextInput
//               style={styles.textInput}
//               theme={themes.textInput}
//               mode="outlined"
//               label="Number of participants"
//               value={numPeople.toString()}
//               onChangeText={(text) => setNumPeople(Number(text))}
//             />
//             <MultilineInput
//               style={styles.multilineInput}
//               theme={themes.textInput}
//               mode="outlined"
//               label="Description"
//               value={description}
//               onChangeText={(text) => setDescription(text)}
//             />
//             <Button
//               onPress={handleUpdateTrip}
//               mode="contained"
//               theme={themes.button}
//               style={styles.button}
//             >
//               Update a trip
//             </Button>
//           </View>
//         </View>
//       </TouchableWithoutFeedback>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   page: {
//     marginTop: 5 * vh,
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "space-between",
//     backgroundColor: palette.white,
//   },
//   inputGroup: {
//     gap: 3.5 * vh,
//   },
//   textInput: {
//     width: 80 * vmin,
//     height: 12 * vmin,
//     backgroundColor: palette.white,
//   },
//   multilineInput: {
//     width: 80 * vmin,
//     height: 40 * vmin,
//     backgroundColor: palette.white,
//   },
//   button: {
//     width: 70 * vmin,
//     height: 14 * vmin,
//     justifyContent: "center",
//     paddingBottom: 0.5 * vmin,
//     marginTop: 5 * vh,
//     marginBottom: 5 * vh,
//   },
//   message: {
//     marginTop: 1.5 * vh,
//     alignSelf: "center",
//     width: 85 * vmin,
//     fontFamily: "Lato-Regular",
//     fontSize: 3.8 * vmin,
//     color: palette.grey,
//   },
//   selectLabel: {
//     fontFamily: "Lato-Bold",
//     marginTop: 1 * vh,
//     marginBottom: 0.5 * vh,
//   },
// });

import React, { useState } from "react";
import {
  View,
  Keyboard,
  TouchableWithoutFeedback,
  ScrollView,
  Text, // Import Text component
} from "react-native";
import { Button, HeaderBack, MultilineInput, TextInput } from "../components";
import { StyleSheet } from "react-native";
import { palette, themes } from "../style";
import { ShowSelectedDate, ShowSelectedCountry } from "../components";
import TripsService from "../services/TripsService";
const { updateTrip } = TripsService;

const EditTripScreen = ({ navigation }) => {
  const email = global.currentUser.email_id;
  const trip = global.currentTrip;

  // fixed values
  const date = [trip.start_date, trip.end_date];
  const country = [trip.location];

  //enables editable people and description in the sub components
  // variables
  const [numPeople, setNumPeople] = useState(trip.participants.length);
  const [description, setDescription] = useState(trip.description);
  const [participants, setParticipants] = useState(trip.participants);
  const [participantEmail, setParticipantEmail] = useState("");

  // Function to update trip details
  const handleUpdateTrip = async () => {
    try {
      const status = await TripsService.updateTrip({
        trip_id: trip.trip_id,
        num_people: numPeople,
        description: description,
        participants: participants,
      });
      if (status === 200) {
        navigation.replace("Home");
      } else {
        console.log("Error occurred updating the trip");
      }
    } catch (error) {
      console.error("Error occurred:", error);
    }
  };
  const addParticipant = () => {
    if (
      participantEmail.trim() !== "" &&
      participants.indexOf(participantEmail) === -1
    ) {
      setParticipants([...participants, participantEmail]);
      setParticipantEmail("");
    }
  };

  const removeParticipant = (email) => {
    setParticipants(participants.filter((p) => p !== email));
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.page}>
          <HeaderBack>Edit trip</HeaderBack>
          <View style={styles.inputGroup}>
            <ShowSelectedDate
              title={null}
              titleStyle={null}
              label={"Select date"}
              labelStyle={styles.selectLabel}
              boxWidth={80 * vmin}
              initialDates={[date]}
            />
            <ShowSelectedCountry
              title={null}
              titleStyle={null}
              label={"Select country"}
              labelStyle={styles.selectLabel}
              boxWidth={80 * vmin}
              initialCountries={country}
            />
            {participants.map((participant, index) => (
              <View key={index}>
                <Text>{participant}</Text>
                {/* Wrap participant within Text component */}
                <Button onPress={() => removeParticipant(participant)}>
                  Remove
                </Button>
              </View>
            ))}
            <View>
              <TextInput
                style={styles.textInput}
                mode="outlined"
                label="Participant Email"
                value={participantEmail}
                onChangeText={(text) => setParticipantEmail(text)}
              />
              <Button mode="contained" onPress={addParticipant}>
                Add Participant
              </Button>
            </View>
          </View>
          <TextInput
            style={styles.textInput}
            theme={themes.textInput}
            mode="outlined"
            label="Number of participants"
            value={numPeople.toString()}
            onChangeText={(text) => setNumPeople(Number(text))}
          />
          <MultilineInput
            style={styles.multilineInput}
            theme={themes.textInput}
            mode="outlined"
            label="Description"
            value={description}
            onChangeText={(text) => setDescription(text)}
          />
          <View>
            {/*TODO: update new data in the db*/}
            <Button
              onPress={async () => {
                await updateTrip(
                  trip.trip_id,
                  numPeople,
                  description,
                  participants
                ).then((status) => {
                  if (status === 200) navigation.replace("Home");
                  else console.log("error occurred updating a trip");
                });
              }}
              mode="contained"
              theme={themes.button}
              style={styles.button}
            >
              Update a trip
            </Button>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  page: {
    marginTop: 5 * vh,
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: palette.white,
  },
  inputGroup: {
    gap: 3.5 * vh,
  },
  textInput: {
    width: 80 * vmin,
    height: 12 * vmin,
    backgroundColor: palette.white,
  },
  multilineInput: {
    width: 80 * vmin,
    height: 40 * vmin,
    backgroundColor: palette.white,
  },
  button: {
    width: 70 * vmin,
    height: 14 * vmin,
    justifyContent: "center",
    paddingBottom: 0.5 * vmin,
    marginTop: 5 * vh,
    marginBottom: 5 * vh,
  },
  message: {
    marginTop: 1.5 * vh,
    alignSelf: "center",
    width: 85 * vmin,
    fontFamily: "Lato-Regular",
    fontSize: 3.8 * vmin,
    color: palette.grey,
  },
  selectLabel: {
    fontFamily: "Lato-Bold",
    marginTop: 1 * vh,
    marginBottom: 0.5 * vh,
  },
});

export default EditTripScreen;
