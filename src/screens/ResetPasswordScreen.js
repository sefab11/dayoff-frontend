import React, { useState } from "react";
import { View, Keyboard, TouchableWithoutFeedback } from "react-native";
import { Button, Dialog, PasswordInput, TextInput } from "../components";
import { StyleSheet } from "react-native";
import { palette, themes } from "../style";
import UserService from "../services/UserService";
import Modal from "react-native-modal";
const { resetpassword } = UserService;

const ResetPasswordScreen = ({ navigation, route }) => {
  const { email } = route.params;
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [dialogVisible, setDialogVisible] = useState(false);

  const toggleDialog = () => {
    setDialogVisible(!dialogVisible);
  };

  const resetPasswordHandler = async () => {
    if (!(otp && newPassword)) {
      toggleDialog();
      return;
    }

    await resetpassword(email, otp, newPassword).then((response) => {
      if (response || response.statusCode === 200) {
        // Password reset successfully
        console.log("Password reset successfully");
        navigation.navigate("Login");
      } else {
        // Error occurred while resetting password
        toggleDialog();
      }
    });
  };

  return (
    <>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.page}>
          <View style={styles.inputGroup}>
            <TextInput
              value={otp}
              onChangeText={(text) => setOtp(text)}
              style={styles.textInput}
              theme={themes.textInput}
              mode="outlined"
              label="Enter OTP"
            />
            <PasswordInput
              value={newPassword}
              onChangeText={(text) => setNewPassword(text)}
              style={styles.textInput}
              theme={themes.textInput}
              mode="outlined"
              label="New Password"
            />
          </View>
          <Button
            onPress={resetPasswordHandler}
            mode="contained"
            theme={themes.button}
            style={styles.button}
            labelStyle={{ marginHorizontal: 0 }}
          >
            Reset Password
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
    justifyContent: "center",
    backgroundColor: palette.white,
  },
  inputGroup: {
    marginVertical: 20,
    width: "80%",
  },
  textInput: {
    marginBottom: 20,
  },
  button: {
    width: "80%",
    marginTop: 20,
  },
});

export default ResetPasswordScreen;
