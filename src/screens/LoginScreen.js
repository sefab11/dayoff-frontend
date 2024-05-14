import { View, Keyboard, TouchableWithoutFeedback, Alert } from "react-native";
import {
  Button,
  Dialog,
  HeaderBack,
  PasswordInput,
  TextInput,
} from "../components";
import { StyleSheet } from "react-native";
import { palette, themes } from "../style";
import { useState } from "react";
import Modal from "react-native-modal";
import { useSessionContext } from "../contexts/SessionContext";
// Importing ResetPassword from the screens directory

import UserService from "../services/UserService";
const { loginUser, getUserData, forgotpassword } = UserService;

export default LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setSessionToken } = useSessionContext();

  const [dialogVisible, setDialogVisible] = useState(false);

  const toggleDialog = () => {
    setDialogVisible(!dialogVisible);
  };

  const forgotPasswordHandler = async () => {
    if (!email) {
      Alert.alert("Error", "Email is empty");
      return;
    }

    try {
      const data = await forgotpassword(email);
      console.log("Forgot password response:", data);
      if (data || data.statusCode == 200) {
        // Password reset email sent successfully
        Alert.alert("Success", "OTP sent to reset password");
        navigation.navigate("ResetPasswordScreen", { email });
      } else {
        // Error occurred while sending reset password email
        Alert.alert("Error", "Error sending reset password OTP");
      }
    } catch (error) {
      console.error("Forgot password error:", error);
      Alert.alert(
        "Error",
        "An error occurred while sending reset password OTP"
      );
    }
  };

  const login = async () => {
    if (!(email && password)) {
      toggleDialog();
      return;
    }

    await loginUser(email, password).then(async (data) => {
      if (data && data.statusCode === 200 && data.sessionToken) {
        setSessionToken(data.sessionToken);
        console.log("Session Token:", data.sessionToken);

        //update the global email address
        await getUserData(email).then((response) => {
          global.currentUser = response;
        });

        navigation.navigate("Home");
      } else {
        toggleDialog();
      }
    });
  };

  return (
    <>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.page}>
          <HeaderBack>Sign in</HeaderBack>
          <View style={styles.inputGroup}>
            <TextInput
              value={email}
              onChangeText={(text) => setEmail(text)}
              style={styles.textInput}
              theme={themes.textInput}
              mode="outlined"
              label="Email Address"
              placeholder="name@workmail.com"
            />
            <View>
              <PasswordInput
                value={password}
                onChangeText={(text) => setPassword(text)}
                style={styles.textInput}
                theme={themes.textInput}
                mode="outlined"
                label="Password"
              />
              <Button
                // TODO: add in functionality to reset password
                onPress={async () => forgotPasswordHandler()}
                mode="text"
                theme={themes.button}
                style={styles.forgotButton}
              >
                Forgot your password?
              </Button>
            </View>
          </View>
          <Button
            onPress={async () => login()}
            mode="contained"
            theme={themes.button}
            style={styles.button}
            labelStyle={{ marginHorizontal: 0 }}
          >
            Sign in
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
    paddingTop: 3 * vh,
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
  forgotButton: {
    alignSelf: "flex-end",
    margin: 0,
    padding: 0,
    borderWidth: 0,
    borderRadius: 0,
  },
  button: {
    width: 70 * vmin,
    height: 14 * vmin,
    justifyContent: "center",
    paddingBottom: 0.5 * vmin,
    marginTop: 5 * vh,
    marginBottom: 5 * vh,
  },
});
