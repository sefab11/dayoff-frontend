import {
  View,
  Keyboard,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Text,
} from "react-native";
import { React, useState } from "react";
import Modal from "react-native-modal";
import {
  Button,
  HeaderBack,
  PasswordInput,
  TextInput,
  EmailModal,
  Dialog,
} from "../components";
import { StyleSheet } from "react-native";
import { palette, themes } from "../style";
import { Alert } from "react-native";

import UserService from "../services/UserService";
const { registerUser } = UserService;
import FullValidationService from "../services/ValidationService";
const { isNameValid, isPasswordValid } = FullValidationService;

export default RegisterScreen = ({ navigation }) => {
  //TODO: for release, turn 'required' values to true for required field
  const [name, setName] = useState({
    value: "",
    valid: null,
    required: false, //true,
  });
  const [email, setEmail] = useState({
    value: "",
    required: false, //true,
  });
  const [password, setPassword] = useState({
    value: "",
    valid: null,
    required: false, //true,
  });
  const [confPassword, setConfPassword] = useState({
    value: "",
    valid: null,
    required: false, //true,
  });

  const doPasswordsMatch = () => password.value == confPassword.value;

  //   function areInputsValid() {
  //     //if name valid
  //     name.valid = isNameValid(name.value);
  //     console.log("Name Valid:", name.valid);
  //     email.required = true;
  //     //if password meets requirements
  //     password.valid =
  //       isPasswordValid(password.value) &&
  //       password.value.length >= 8 &&
  //       /\d/.test(password.value);
  //     //if passwords match or not
  //     confPassword.valid = doPasswordsMatch();

  //     //for testing
  //     console.log(email);

  //     return (
  //       (name.valid || !name.required) &&
  //       !email.required &&
  //       (password.valid || !password.required) &&
  //       (confPassword.valid || !confPassword.required)
  //     );
  //   }
  function areInputsValid() {
    const isNameValid = name.value.trim() !== "";
    const isEmailValid = /\S+@\S+\.\S+/.test(email.value.trim()); // Email format validation
    const isPasswordValid =
      password.value.length >= 8 && /\d/.test(password.value);
    const doPasswordsMatch = password.value === confPassword.value;

    return isNameValid && isEmailValid && isPasswordValid && doPasswordsMatch;
  }

  const updatedState = (stateDict, newVal) => {
    return Object.assign({}, stateDict, { value: newVal });
  };

  const register = async () => {
    console.log("Password Value:", password.value);
    console.log(
      "Password Validation:",
      isPasswordValid(password.value),
      password.value.length >= 8,
      /\d/.test(password.value)
    );
    if (areInputsValid()) {
      //TODO: remove this navigation here for release
      //navigation.navigate("VerifyEmail");

      await registerUser(name.value, email.value, password.value).then(
        (status) => {
          if (status === 200) {
            //update global current user
            global.currentUser = {
              email_id: email.value,
              user_name: name.value,
              profile_picture: null,
              country: null,
              job: null,
              linkedin: null,
            };

            navigation.navigate("VerifyEmail");
          } else {
            toggleDialog();
          }
        }
      );
    } else {
      toggleDialog();
      if (!isPasswordValid(password.value)) {
        Alert.alert(
          "Invalid Password",
          "Password requires 8 characters and 1 number."
        );
      } else if (password.value.length < 8) {
        Alert.alert(
          "Invalid Password",
          "Password must be at least 8 characters long."
        );
      } else if (!/\d/.test(password.value)) {
        Alert.alert(
          "Invalid Password",
          "Password must contain at least 1 number."
        );
      } else if (password.value !== confPassword.value) {
        Alert.alert(
          "Passwords Don't Match",
          "The passwords entered do not match."
        );
      }
    }
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const toggleDialog = () => {
    setDialogVisible(!dialogVisible);
  };

  const [isModalVisible, setModalVisible] = useState(false);
  const [dialogVisible, setDialogVisible] = useState(false);
  const isRequiredFieldsFilled = () => {
    return (
      name.value.trim() !== "" &&
      email.value.trim() !== "" &&
      password.value.trim() !== "" &&
      confPassword.value.trim() !== ""
    );
  };
  return (
    <>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.page}>
          <HeaderBack>Register</HeaderBack>
          <View style={styles.inputGroup}>
            <View>
              <TextInput
                style={styles.textInput}
                theme={themes.textInput}
                mode="outlined"
                label="Full name*"
                placeholder="John Doe"
                value={name.value}
                //merge name object with new object/dict with 'value': text
                //set name to merged object
                onChangeText={(text) =>
                  setName((name) => updatedState(name, text))
                }
              />

              <Text style={styles.invalidMessage}>
                {name.valid === false ? "Invalid username" : ""}
              </Text>
            </View>

            <View>
              <View>
                <TextInput
                  style={styles.textInput}
                  theme={themes.textInput}
                  mode="outlined"
                  label="Email Address*"
                  placeholder="name@workmail.com"
                  value={email.value}
                  onChangeText={(text) =>
                    setEmail((email) => updatedState(email, text))
                  }
                />

                <Text style={styles.invalidMessage}>
                  {email.valid === false ? "This email is invalid." : ""}
                </Text>
              </View>
            </View>

            <View>
              <PasswordInput
                style={styles.textInput}
                theme={themes.textInput}
                mode="outlined"
                label="Password*"
                value={password.value}
                onChangeText={(text) =>
                  setPassword((password) => updatedState(password, text))
                }
              />

              <Text style={styles.invalidMessage}>
                {password.valid === false
                  ? "Invalid password. Requires 8 characters and 1 number."
                  : ""}
              </Text>
            </View>

            <View>
              <PasswordInput
                style={styles.textInput}
                theme={themes.textInput}
                mode="outlined"
                label="Repeat password*"
                value={confPassword.value}
                onChangeText={(text) =>
                  setConfPassword((conf) => updatedState(conf, text))
                }
              />

              <Text style={styles.invalidMessage}>
                {confPassword.valid === false ? "Passwords do not match" : ""}
              </Text>
            </View>
          </View>
          <Button
            // onPress={async () => register()}
            onPress={async () => {
              if (areInputsValid() && isRequiredFieldsFilled()) {
                await register();
              } else {
                toggleDialog(); // Show error dialog if inputs are not valid
              }
            }}
            mode="contained"
            theme={themes.button}
            style={styles.button}
            disabled={!areInputsValid() || !isRequiredFieldsFilled()}
          >
            Create account
          </Button>
        </View>
      </TouchableWithoutFeedback>
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
    </>
  );
};

const styles = StyleSheet.create({
  page: {
    paddingTop: 6 * vh,
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
  linkText: {
    marginTop: 2,
    marginBottom: 0,
    color: palette.purple,
    fontWeight: "bold",
  },
  modalView: {
    backgroundColor: palette.white,
  },
  button: {
    width: 80 * vmin,
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
});
