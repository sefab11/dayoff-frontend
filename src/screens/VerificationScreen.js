import {
  View,
  Keyboard,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Text,
  ScrollView,
} from "react-native";
import {
  Button,
  Header,
  SegmentedInput,
  HeaderBack,
  Image,
  TextInput,
  FileInput,
} from "../components";
import { LinkedinInput, PhotoInput, Dialog } from "../components";
import Modal from "react-native-modal";
import { SuccessModal, ReviewModal } from "../components";
import { StyleSheet } from "react-native";
import { React, useState, useEffect } from "react";
import { palette, themes } from "../style";
import { Alert } from "react-native";

import UserService from "../services/UserService";
import TripsService from "../services/TripsService";
const { getUserData, putExtraData, sendOtp, verifyOtp } = UserService;
const { joinTrip } = TripsService;

const VerifySection = (props) => {
  const { title, valid } = props;

  return (
    <View
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <Text style={styles.title}>{title}</Text>
      {valid ? (
        <Image
          source={require("../../assets/icons/checkmark.png")}
          style={styles.checkmark}
        />
      ) : null}
    </View>
  );
};

const CheckBox = (props) => {
  const { label, style } = props;

  return (
    <TouchableOpacity onPress={() => props.onPress()}>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          columnGap: 10,
          marginVertical: 10,
        }}
      >
        <View
          backgroundColor={palette.white}
          borderColor={palette.purple}
          borderWidth={2}
          borderRadius={100}
          padding={3}
        >
          <View style={style} />
        </View>
        <Text style={styles.checkText}>{label}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default VerificationScreen = ({ navigation }) => {
  //  useEffect(() => {
  //    sendOtp(global.currentUser.email_id, global.currentUser.user_name);
  //    getUserData(global.currentUser.email_id).then((response) => {
  //      setPhoto(response.profile_picture);
  //      setLinkedin(response.linkedin);
  //    });
  //  }, []);

  useEffect(() => {
    // whenever a photo or linkedin is added then update in the backend
    (async function () {
      await putExtraData(
        global.currentUser.email_id,
        global.currentUser.profile_picture,
        global.currentUser.country,
        global.currentUser.job,
        linkedin
      ).then((response) => {
        console.log(response);

        // also update locally
        global.currentUser.profile_picture = photo;
        global.currentUser.linkedin = linkedin;

        console.log(global.currentUser);
      });
    })();
  }, [photo, linkedin]);

  console.log(global.currentUser);

  const [photo, setPhoto] = useState(global.currentUser.profile_picture);
  const [linkedin, setLinkedin] = useState(global.currentUser.linkedin);

  const [emailChecked, setEmailChecked] = useState(true);
  const [idChecked, setIdChecked] = useState(false);

  const [code, setCode] = useState("");
  const [codeValid, setCodeValid] = useState(false);

  const trip = global.currentTrip;
  const [email, setEmail] = useState(global.currentUser.email_id);

  async function areFieldsValid() {
    await verifyOtp(email).then((status) => {
      if (status === 200) setCodeValid(true);
      else toggleDialog();
    });

    return !!photo && !!linkedin && codeValid;
  }

  const verify = async () => {
    if (areFieldsValid()) {
      await joinTrip(trip.trip_id, email).then((status) => {
        if (status === 200) navigation.replace("Chat");
        else navigation.replace("Home");
      });
    }
  };

  const toggleDialog = () => {
    setDialogVisible(!dialogVisible);
  };

  const [dialogVisible, setDialogVisible] = useState(false);

  return (
    <TouchableWithoutFeedback>
      <View style={styles.page}>
        <HeaderBack>Get Verified</HeaderBack>
        <View style={styles.border} />

        <ScrollView contentContainerStyle={styles.scroll}>
          <TouchableWithoutFeedback>
            <View>
              <Text style={styles.message}>
                Every user is required to go through verifications to build a
                more trusted and safer platform.
              </Text>

              <View style={styles.section} borderBottomWidth={0}>
                <VerifySection title="1. Add Profile Photo*" valid={!!photo} />
                <PhotoInput
                  width={12 * vh}
                  camRatio={"40%"}
                  image={photo}
                  onPhotoSelected={(data) => setPhoto(data)}
                />
              </View>

              <View style={styles.border} />

              <View style={styles.section}>
                <VerifySection
                  title="2. Add Linkedin Profile*"
                  valid={!!linkedin}
                />
                <TextInput
                  style={styles.textInput}
                  theme={themes.textInput}
                  mode="outlined"
                  placeholder="linked.com/name"
                  value={linkedin}
                  onChangeText={(data) => setLinkedin(data)}
                />
              </View>

              <View style={styles.border} />

              <View style={styles.section}>
                <VerifySection title="3. Verify With Your:" valid={codeValid} />

                <View marginBottom={5 * vh}>
                  <CheckBox
                    style={{
                      width: 3 * vmin,
                      height: 3 * vmin,
                      borderRadius: 50 * vmin,
                      backgroundColor: emailChecked
                        ? palette.purple
                        : palette.white,
                    }}
                    label="Work Email or School/Institution Email"
                    onPress={() => {
                      if (emailChecked) return;
                      setEmailChecked(!emailChecked);
                      if (!emailChecked) setIdChecked(false);
                    }}
                  />

                  <CheckBox
                    style={{
                      width: 3 * vmin,
                      height: 3 * vmin,
                      borderRadius: 50 * vmin,
                      backgroundColor: idChecked
                        ? palette.purple
                        : palette.white,
                    }}
                    label="Proof of Work or Work ID Card"
                    onPress={() => {
                      if (idChecked) return;
                      setIdChecked(!idChecked);
                      if (!idChecked) setEmailChecked(false);
                    }}
                  />
                </View>

                {emailChecked ? (
                  //render text input with code input
                  <View>
                    <View marginBottom={5 * vh}>
                      <TextInput
                        style={styles.textInput}
                        theme={themes.textInput}
                        mode="outlined"
                        label="Work Email or School/Institution Email*"
                        placeholder="name@organisation.com"
                        onChangeText={(data) => setEmail(data)}
                      />

                      <View
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          marginVertical: 10,
                        }}
                      >
                        <Button
                          style={{
                            backgroundColor: palette.purple,
                            paddingHorizontal: 10,
                          }}
                          onPress={async () => {
                            await sendOtp(email, global.currentUser.user_name);
                            Alert.alert(
                              "Success",
                              "OTP code sent successfully!",
                              [
                                {
                                  text: "OK",
                                  onPress: () => console.log("OK Pressed"),
                                },
                              ],
                              { cancelable: false }
                            );
                          }}
                        >
                          <Text style={{ color: palette.white }}>Get Code</Text>
                        </Button>

                        <Button
                          style={{ marginLeft: "auto" }}
                          onPress={async () => {
                            await sendOtp(email, global.currentUser.user_name);
                            Alert.alert(
                              "Success",
                              "OTP code sent successfully!",
                              [
                                {
                                  text: "OK",
                                  onPress: () => console.log("OK Pressed"),
                                },
                              ],
                              { cancelable: false }
                            );
                          }}
                        ></Button>
                      </View>
                    </View>

                    <View marginBottom={5 * vh}>
                      <SegmentedInput
                        length={6}
                        style={styles.segmentedInput}
                        segmentStyle={styles.segment}
                        theme={themes.textInput}
                        mode="outlined"
                        label="Enter verification code sent to your email here*"
                        labelStyle={styles.message}
                        keyboardType="numeric"
                        onCodeChange={(data) => setCode(data)}
                      />
                    </View>
                  </View>
                ) : (
                  //render link input / photo input
                  <View>
                    <View marginBottom={5 * vh}>
                      <Text style={styles.title}>
                        Proof of Work or Work ID card
                      </Text>
                      <Text style={styles.message}>
                        Take a photo of your work ID card or for proof of work
                        eg. an artiste can take a photo of their Spotify
                        account, a photographer can send URL of their website
                        portfolio etc.
                      </Text>
                    </View>

                    <View marginBottom={5 * vh}>
                      <FileInput
                        label="Upload documents or photos*"
                        labelStyle={styles.labelTitle}
                        boxWidth={80 * vmin}
                        initialLink="Work ID Card"
                      />
                    </View>

                    <View marginBottom={5 * vh}>
                      <TextInput
                        style={styles.textInput}
                        theme={themes.textInput}
                        mode="outlined"
                        label="Any Additional Links"
                      />
                    </View>
                  </View>
                )}
              </View>
            </View>
          </TouchableWithoutFeedback>
        </ScrollView>

        <View style={styles.buttonGroup}>
          <Button
            mode="container"
            theme={themes.button}
            style={styles.button}
            onPress={() => verify()}
          >
            <Text style={styles.buttonText}>Verify Account</Text>
          </Button>
        </View>
        <View style={{ position: "fixed" }}>
          {emailChecked ? (
            <SuccessModal
              transparent={true}
              isVisible={dialogVisible}
              onBackdropPress={toggleDialog}
            />
          ) : (
            <ReviewModal
              transparent={true}
              isVisible={dialogVisible}
              onBackdropPress={toggleDialog}
            />
          )}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  page: {
    paddingTop: 3 * vh,
    marginBottom: 3 * vh,
    display: "flex",
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: palette.white,
  },
  message: {
    alignSelf: "flex-start",
    width: 85 * vmin,
    fontFamily: "Lato-Regular",
    fontSize: 3.6 * vmin,
    color: palette.grey,
  },

  segmentedInput: {
    width: 85 * vmin,
    alignItems: "flex-start",
  },
  segment: {
    height: 17 * vmin,
    width: 13 * vmin,
    marginHorizontal: 1,
    backgroundColor: palette.white,
    fontSize: 7 * vmin,
    textAlign: "left",
    textAlignVertical: "center",
  },

  resendContainer: {
    width: "100%",
    paddingTop: 10,
  },
  resendText: {
    color: palette.purple,
    fontWeight: "bold",
  },

  scroll: {
    display: "flex",
    paddingBottom: 4 * vh,
  },

  section: {
    width: 85 * vmin,

    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",

    paddingTop: 20,
    paddingBottom: 20,
  },
  border: {
    width: 85 * vmin,
    paddingTop: 5,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#D7D7D7",
  },
  title: {
    marginTop: 3 * vh,
    paddingBottom: 20,
    alignSelf: "flex-start",
    fontFamily: "Lato-Regular",
    fontSize: 4.5 * vmin,
    fontWeight: "700",
    color: "#000000",
  },

  buttonGroup: {
    gap: 2 * vmin,
    margin: 10,
  },
  button: {
    width: 80 * vmin,
    height: 14 * vmin,
    justifyContent: "center",
    paddingBottom: 0.5 * vmin,
    backgroundColor: palette.purple,
  },
  buttonText: {
    color: palette.white,
  },
  checkmark: {
    marginLeft: "auto",
    resizeMode: "contain",
    height: "40%",
  },

  checkText: {
    textAlignVertical: "center",
    fontWeight: "normal",
    fontSize: 3.5 * vmin,
  },
  textInput: {
    width: 80 * vmin,
    backgroundColor: palette.white,
  },
  labelTitle: {
    fontFamily: "Lato-Regular",
    fontWeight: "bold",
  },
});
