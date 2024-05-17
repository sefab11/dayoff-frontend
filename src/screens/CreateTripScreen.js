import {
  View,
  Keyboard,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Text,
  ScrollView,
  Image
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

const EmailLabel1 = (props) => {
    // TODO: add in option to remove email through pressing x button
    return (
    <View flexDirection="row" alignItems="center">
        <Text>{props.email}</Text>
        <TouchableOpacity
        onPress={() => {}}
        >
            <Image
                source={require("../../assets/icons/x.png")}
                resizeMode="center"
            />
        </TouchableOpacity>
    </View>
    )
}


const AddParticipantsModal = (props) => {
    const [newUser, setNewUser] = useState("");

    return (
    <Modal
        isVisible={props.isVisible}
        onBackdropPress={() => props.setVisible(false)}
    >
        <View width={"100%"} height={"100%"}
        backgroundColor={palette.white} padding={5 * vmin}
        flexDirection="column" justifyContent="flex-start">
            <TouchableOpacity
                onPress={() => props.setVisible(false)}
                style={{
                    alignItems: "flex-end",
                    height: 5 * vh,
                }}
            >
                <Image
                    source={require("../../assets/icons/x.png")}
                    resizeMode="center"
                    marginRight={-20}
                    marginTop={-20}
                />
            </TouchableOpacity>
            <TextInput
                label="Participant Email"
                value={newUser}
                onChangeText={(data) => setNewUser(data)}
            />
            <Button
                mode="contained"
                theme={themes.button}
                style={{
                    marginTop: 2.5 * vh,
                    marginBottom: 2.5 * vh,
                    width: 80 * vmin,
                    borderRadius: 5,
                }}
                onPress={() => {
                    props.onNewUser(newUser);
                    setNewUser("");
                }}
            >
                Add User
            </Button>
            {
            props.emails.map((em) => <EmailLabel1 email={em} />)
            }
        </View>
    </Modal>
    )
}


const EmailLabel2 = (props) => {
    // TODO: add in option of removing email through pressing x icon
    return (
    <View style={styles.emailLabel}>
        <Text>{props.email}</Text>
        <TouchableOpacity
        onPress={() => {}}
        >
            <Image
                source={require("../../assets/icons/x.png")}
                resizeMode="center"
            />
        </TouchableOpacity>
    </View>
    )
}


const ShowParticipants = (props) => {
    const [modalVisible, setModalVisible] = useState(false);

    console.log(props.emails);
    return (
    <View style={styles.peopleContainer}>
        {!!props.emails ?
        props.emails.map((em) => <EmailLabel2 email={em} />)
        : null
        }
        <TouchableOpacity
        onPress={() => setModalVisible(true)}
        >
            <Text>PRESS ME</Text>
        </TouchableOpacity>

        <AddParticipantsModal
            isVisible={modalVisible}
            setVisible={setModalVisible}
            onNewUser={(em) => {
                props.emails.push(em);
            }}
            emails={props.emails}
        />
    </View>
    )
}


export default CreateTripScreen = ({ navigation }) => {
  const emailAddress = global.currentUser.email_id;

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

    console.log(date.value);
    console.log(country.value);
    console.log(desc.value);

    return (
      (date.valid || !date.required) && (country.valid || !country.required)
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

    console.log(participants);
  };

  const removeParticipant = (email) => {
    setParticipants(participants.filter((p) => p !== email));
  };

  const createTrip = async () => {
    if (areFieldsValid()) {
      await createNewTrip(
        emailAddress,
        date.value,
        country.value,
        desc.value,
        participants
      ).then((status) => {
        if (status === 200) navigation.navigate("Home");
        else toggleDialog();
      });
    } else toggleDialog();
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
    justifyContent: "space-between",
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
