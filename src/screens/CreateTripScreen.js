// import { View, Keyboard, TouchableWithoutFeedback, Text } from "react-native";
// import { Button, HeaderBack, MultilineInput, PasswordInput, TextInput, Dialog } from "../components";
// import { StyleSheet } from "react-native";
// import Modal from "react-native-modal";
// import { React, useState } from "react";
// import { palette, themes } from "../style";
// import { SelectOneDate, SelectOneCountry } from "../components";

// import FullValidationService from "../services/ValidationService";
// const { isDateValid, isCountryValid, isNumPeopleValid } = FullValidationService;
// import TripsService from "../services/TripsService";
// const { createNewTrip } = TripsService;

// //SCREEN TO CREATE A TRIP

// export default CreateTripScreen = ({ navigation }) => {
//     //TODO: set global email and fetch here
//     const emailAddress = "sepehr@gmail.com";

//     const [date, setDate] = useState({
//         'value': '',
//         'valid': null,
//         'required': true,
//     });
//     const [country, setCountry] = useState({
//         'value': '',
//         'valid': null,
//         'required': true,
//     });
//     const [numPeople, setNumPeople] = useState({
//         'value': '',
//         'valid': null,
//         'required': true,
//     });
//     const [desc, setDesc] = useState({
//         'value': '',
//         'required': false,
//     });

//     const updatedState = (stateDict, newVal) => {
//         return Object.assign({}, stateDict, {'value': newVal});
//     }

//     function areFieldsValid(){
//         //check date is valid
//         date.valid = isDateValid(date.value);
//         //check country is valid
//         country.valid = isCountryValid(country.value);
//         //check num people is valid
//         numPeople.valid = isNumPeopleValid(numPeople.value);

//         console.log(date.value);
//         console.log(country.value);
//         console.log(numPeople.value);
//         console.log(desc.value);

//         return (
//            (date.valid      || !date.required)
//         && (country.valid   || !country.required)
//         && (numPeople.valid || !numPeople.required)
//         )
//     }

//     const createTrip = async () => {
//         if (areFieldsValid()){
//             await createNewTrip(emailAddress, date.value, country.value, Number(numPeople.value), desc.value)
//             .then(status => {
//                 if (status === 200) navigation.navigate('Home');
//                 else toggleDialog();
//             })
//         }
//         else toggleDialog();
//     }

//     const toggleDialog = () => {
//         setDialogVisible(!dialogVisible);
//     }

//     const [dialogVisible, setDialogVisible] = useState(false);
//     var Filter = require('bad-words');
//     filter = new Filter();

//     return (
//         <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
//             <View style={styles.page}>
//                 <HeaderBack>Create a trip</HeaderBack>
//                 <View style={styles.inputGroup}>
//                     <View>
//                         <SelectOneDate
//                             title={null}
//                             titleStyle={null}
//                             label={"Select date*"}
//                             labelStyle={styles.selectLabel}

//                             isFlexible={false}
//                             boxWidth={80 * vmin}

//                             onSelectDate={(selectedDate) =>
//                             setDate(date => updatedState(date, selectedDate))}
//                         />

//                         <Text style={styles.invalidMessage}>
//                             {date.valid === false ? 'Invalid date.' : ''}
//                         </Text>

//                     </View>

//                     <View>
//                         <SelectOneCountry
//                             title={null}
//                             titleStyle={null}
//                             label={"Select country*"}
//                             labelStyle={styles.selectLabel}
//                             boxWidth={80 * vmin}

//                             onSelectCountry={(selectedCountry) =>
//                             setCountry(country => updatedState(country, selectedCountry))}
//                         />

//                         <Text style={styles.invalidMessage}>
//                             {country.valid === false ? 'Invalid country.' : ''}
//                         </Text>
//                     </View>

//                     <View>
//                         <TextInput style={styles.textInput} theme={themes.textInput}
//                         mode='outlined' label="Number of participants*"
//                         value={numPeople.value}
//                         onChangeText={text => setNumPeople(people => updatedState(people, text))}
//                         />

//                         <Text style={styles.invalidMessage}>
//                             {numPeople.valid === false ? 'Invalid number of participants.' : ''}
//                         </Text>
//                     </View>

//                     <View>
//                         <MultilineInput style={styles.multilineInput} theme={themes.textInput}
//                         mode='outlined' label="Description"
//                         placeholder="Describe the trip or anything else you want others to know"
//                         value={desc.value}
//                         //cleans out bad words with **
//                         onChangeText={text => setDesc(desc =>
//                             updatedState(desc, filter.clean(text))
//                             )}
//                         />

//                         <Text style={styles.invalidMessage}>
//                             {desc.valid === false ?
//                             'The description contains harmful messages' : ''}
//                         </Text>
//                     </View>

//                 </View>
//                 <Button
//                     mode='contained'
//                     theme={themes.button}
//                     style={styles.button}
//                     onPress={() => createTrip()}
//                 >
//                     Create a trip
//                 </Button>
//                 <View style={{position: 'fixed'}}>
//                     <Modal
//                         transparent={true}
//                         isVisible={dialogVisible}
//                         onBackdropPress={toggleDialog}
//                     >
//                         <Dialog title={"Error"} details={"An error occurred."}
//                          buttonLabel={"OK"} onButtonPress={toggleDialog} />
//                     </Modal>
//                 </View>
//             </View>
//         </TouchableWithoutFeedback>
//     );
// }

// const styles = StyleSheet.create({
//     page: {
//         marginTop: 5 * vh,
//         flex: 1,
//         alignItems: 'center',
//         justifyContent: 'space-between',
//         backgroundColor: palette.white
//     },
//     inputGroup: {
//         gap: 2.5 * vh
//     },
//     textInput: {
//         width: 80 * vmin,
//         height: 12 * vmin,
//         backgroundColor: palette.white
//     },
//     multilineInput: {
//         width: 80 * vmin,
//         height: 40 * vmin,
//         backgroundColor: palette.white
//     },
//     button: {
//         width: 70 * vmin,
//         height: 14 * vmin,
//         justifyContent: 'center',
//         paddingBottom: 0.5 * vmin,
//         marginTop: 5 * vh,
//         marginBottom: 5 * vh
//     },
//     invalidMessage: {
//         color: 'red',
//         textAlign: 'left',
//         flexWrap: 'wrap',
//         width: 80 * vmin,
//     },

//     message: {
//       marginTop: 1.5 * vh,
//       alignSelf: "center",
//       width: 85 * vmin,
//       fontFamily: "Lato-Regular",
//       fontSize: 3.8 * vmin,
//       color: palette.grey,
//     },
//     selectLabel: {
//         fontFamily: 'Lato-Bold',
//         marginTop: 1 * vh,
//         marginBottom: 0.5 * vh,
//         color: palette.black,
//     },
// })

import {
  View,
  Keyboard,
  TouchableWithoutFeedback,
  Text,
  ScrollView,
} from "react-native";
import {
  Button,
  HeaderBack,
  MultilineInput,
  TextInput,
  Dialog,
} from "../components";
import { StyleSheet } from "react-native";
import Modal from "react-native-modal";
import { React, useState, useEffect } from "react";
import { palette, themes } from "../style";
import { SelectOneDate, SelectOneCountry } from "../components";

import FullValidationService from "../services/ValidationService";
const { isDateValid, isCountryValid, isNumPeopleValid } = FullValidationService;
import TripsService from "../services/TripsService";
const { createNewTrip } = TripsService;

export default CreateTripScreen = ({ navigation }) => {
  const [emailAddress, setEmailAddress] = useState(null);

  useEffect(() => {
    if (global.currentUser && global.currentUser.email_id) {
      setEmailAddress(global.currentUser.email_id);
    } else {
      Alert.alert("Error", "User not logged in or email not found.");
      navigation.navigate("Login");
    }
  }, []);

  const [date, setDate] = useState({
    value: "",
    valid: null,
    required: true,
  });
  const [country, setCountry] = useState({
    value: "",
    valid: null,
    required: true,
  });
  // const [numPeople, setNumPeople] = useState({
  //   value: "",
  //   valid: null,
  //   required: true,
  // });
  const [desc, setDesc] = useState({
    value: "",
    required: false,
  });
  const [participantEmail, setParticipantEmail] = useState("");
  const [participants, setParticipants] = useState([]);

  const updatedState = (stateDict, newVal) => {
    return Object.assign({}, stateDict, { value: newVal });
  };

  function areFieldsValid() {
    date.valid = isDateValid(date.value);
    country.valid = isCountryValid(country.value);
    // numPeople.valid = isNumPeopleValid(numPeople.value);

    console.log(date.value);
    console.log(country.value);
    // console.log(numPeople.value);
    console.log(desc.value);

    return (
      (date.valid || !date.required) && (country.valid || !country.required)
      // (numPeople.valid || !numPeople.required)
    );
  }

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

  const createTrip = async () => {
    if (areFieldsValid()) {
      try {
        const response = await createNewTrip(
          emailAddress,
          date.value,
          country.value,
          desc.value,
          participants
        );

        const responseBody = await response.json(); // Parse response as JSON

        console.log("Response data:", responseBody);

        if (responseBody.body && responseBody.body.unregistered_participants) {
          const unregisteredParticipants =
            responseBody.body.unregistered_participants;
          Alert.alert(
            "Warning",
            `The following participants are not registered: ${unregisteredParticipants.join(
              ", "
            )}`
          );
        }

        if (response.status === 201) {
          // Check if there are unregistered participants
          if (
            responseBody.body &&
            responseBody.body.unregistered_participants
          ) {
            const unregisteredParticipants =
              responseBody.body.unregistered_participants;
            Alert.alert(
              "Participants are unregistered",
              `The following participants are not registered: ${unregisteredParticipants.join(
                ", "
              )}`
            );
          } else {
            // If no unregistered participants, show success message
            Alert.alert(
              "Created Trip Successfully.",
              responseBody.body.message
            );
            navigation.navigate("Home");
          }
        } else {
          Alert.alert(
            responseBody.body && responseBody.body.message
              ? responseBody.body.message
              : "An error occurred."
          );
          navigation.navigate("Home");
        }
      } catch (error) {
        console.error("Error creating trip:", error);
        Alert.alert("Error", "An error occurred while creating the trip.");
      }
    } else {
      Alert.alert("Error", "Please fill in all required fields correctly.");
    }
  };

  const toggleDialog = () => {
    setDialogVisible(!dialogVisible);
  };

  const [dialogVisible, setDialogVisible] = useState(false);
  var Filter = require("bad-words");
  filter = new Filter();

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.page}>
          <HeaderBack>Create a trip</HeaderBack>
          <View style={styles.inputGroup}>
            <View>
              <SelectOneDate
                title={null}
                titleStyle={null}
                label={"Select date*"}
                labelStyle={styles.selectLabel}
                isFlexible={false}
                boxWidth={80 * vmin}
                onSelectDate={(selectedDate) =>
                  setDate((date) => updatedState(date, selectedDate))
                }
              />
              <Text style={styles.invalidMessage}>
                {date.valid === false ? "Invalid date." : ""}
              </Text>
            </View>
            <View>
              <SelectOneCountry
                title={null}
                titleStyle={null}
                label={"Select country*"}
                labelStyle={styles.selectLabel}
                boxWidth={80 * vmin}
                onSelectCountry={(selectedCountry) =>
                  setCountry((country) =>
                    updatedState(country, selectedCountry)
                  )
                }
              />
              <Text style={styles.invalidMessage}>
                {country.valid === false ? "Invalid country." : ""}
              </Text>
            </View>
            {/* <View>
              <TextInput
                style={styles.textInput}
                mode="outlined"
                label="Number of participants*"
                value={numPeople.value}
                onChangeText={(text) =>
                  setNumPeople((people) => updatedState(people, text))
                }
              />
              <Text style={styles.invalidMessage}>
                {numPeople.valid === false
                  ? "Invalid number of participants."
                  : ""}
              </Text>
            </View> */}
            <View>
              <MultilineInput
                style={styles.multilineInput}
                mode="outlined"
                label="Description"
                placeholder="Describe the trip or anything else you want others to know"
                value={desc.value}
                onChangeText={(text) =>
                  setDesc((desc) => updatedState(desc, text))
                }
              />
              <Text style={styles.invalidMessage}>
                {desc.valid === false
                  ? "The description contains harmful messages"
                  : ""}
              </Text>
            </View>

            <View>
              <ShowParticipants emails={participants} />
            </View>
          </View>
          <Button
            mode="contained"
            theme={themes.button}
            style={styles.button}
            onPress={() => createTrip()}
          >
            Create a trip
          </Button>
          <View style={{ position: "fixed" }}>
            <Modal
              transparent={true}
              isVisible={dialogVisible}
              onBackdropPress={toggleDialog}
            >
              <Dialog
                title={"Error"}
                details={"An error occurred."}
                buttonLabel={"OK"}
                onButtonPress={toggleDialog}
              />
            </Modal>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
    // justifyContent: "space-between",
    paddingBottom: 1000,
  },
  page: {
    marginTop: 5 * vh,
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: palette.white,
  },
  inputGroup: {
    gap: 2.5 * vh,
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
  invalidMessage: {
    color: "red",
    textAlign: "left",
    flexWrap: "wrap",
    width: 80 * vmin,
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
    color: palette.black,
  },

   peopleContainer: {
     width: 80 * vmin,
     flexDirection: "row",
     flexWrap: "wrap",
     alignItems: "center",
     justifyContent: "flex-start",
   },
   emailLabel: {
     color: palette.purple,
     fontSize: 3.8 * vmin,
     fontWeight: 'bold',
     textAlign: 'center',
     textAlignVertical: 'center',
     flexDirection: "row",
   },
});
