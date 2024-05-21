import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { Button, Header, TextInput, PhotoInput } from "../components";
import { Dialog } from "../components";
import { palette, themes } from "../style";
import Modal from "react-native-modal";
import UserService from "../services/UserService";
import FullValidationService from "../services/ValidationService";

const { putExtraData } = UserService;
const { isCountryValid, isProfessionValid } = FullValidationService;

const FinishProfile = ({ navigation }) => {
  const [photo, setPhoto] = useState(null);
  const [country, setCountry] = useState("");
  const [job, setJob] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [dialogVisible, setDialogVisible] = useState(false);

  const areInputsValid = () => {
    return (
      !!photo &&
      country.trim() !== "" &&
      job.trim() !== "" &&
      linkedin.trim() !== ""
    );
  };

  const uploadProfilePicture = async (email, fileUri) => {
    try {
      const formData = new FormData();
      formData.append("email", email);
      formData.append("file", {
        uri: fileUri,
        type: "image/jpeg", // Assume JPEG, can be dynamic if needed
        name: "profile_picture.jpeg", // Can be dynamic if needed
      });

      const response = await fetch("http://127.0.0.1:8000/user/putProfpic", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
        body: formData,
      });

      const responseData = await response.json();
      const imageUrl = responseData.message.match(/https?:\/\/\S+/)[0]; // Extract URL from the response message

      return imageUrl;
    } catch (error) {
      console.error("Error:", error);
      throw new Error("Error occurred while uploading profile picture");
    }
  };

  const finishProfile = async () => {
    try {
      console.log("Email:", global.currentUser.email_id);
      console.log("Country:", country);
      console.log("Job:", job);
      console.log("Photo:", photo);
      console.log("Linkedin:", linkedin);

      if (!areInputsValid()) {
        console.error("Please fill in all required fields");
        return;
      }

      if (!photo) {
        console.error("Photo is not set");
        return;
      }

      const localFilePath = await uploadProfilePicture(
        global.currentUser.email_id,
        photo
      );

      //       await putExtraData(
      //         global.currentUser.email_id,
      //         localFilePath,
      //         country,
      //         job,
      //         linkedin
      //       );

      //       global.currentUser.profile_picture = localFilePath;
      //       global.currentUser.country = country;
      //       global.currentUser.job = job;
      //       global.currentUser.linkedin = linkedin;

      //       navigation.navigate("GetMatched");
      //     } catch (error) {
      //       console.error("Error updating profile:", error);
      //       toggleDialog();
      //     }
      //   };
      await putExtraData(
        global.currentUser.email_id,
        photo,
        country,
        job,
        linkedin
      ).then((data) => {
        console.log(data);

        // if successfully updated in db then also update locally

        global.currentUser.profile_picture = localFilePath;
        global.currentUser.country = country;
        global.currentUser.job = job;
        global.currentUser.linkedin = linkedin;

        // navigate to next page
        navigation.navigate("GetMatched");
      });
    } catch (error) {
      console.error("Error updating profile:", error);
      toggleDialog();
    }
  };

  const toggleDialog = () => {
    setDialogVisible(!dialogVisible);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.page}>
        <View>
          <Header>Finish Profile</Header>
          <Text style={styles.headingMessage}>
            Your profile helps us verify you and also builds trust among other
            DayOff members.
          </Text>
        </View>
        <PhotoInput
          width={40 * vmin}
          camRatio={"30%"}
          image={null}
          onPhotoSelected={async (fileUri) => {
            setPhoto(fileUri);
            await uploadProfilePicture(global.currentUser.email_id, fileUri);
          }}
        />

        <View style={styles.inputGroup}>
          <View>
            <TextInput
              style={styles.textInput}
              theme={themes.textInput}
              mode="outlined"
              label="Country of Residence*"
              placeholder="United States"
              value={country}
              onChangeText={(text) => setCountry(text)}
            />
          </View>

          <View>
            <TextInput
              style={styles.textInput}
              theme={themes.textInput}
              mode="outlined"
              label="Job Title & Company*"
              placeholder="eg.Software Developer @ Google"
              value={job}
              onChangeText={(text) => setJob(text)}
            />
          </View>

          <View>
            <TextInput
              style={styles.textInput}
              theme={themes.textInput}
              mode="outlined"
              label="Linkedin*"
              placeholder="linkedin.com/name"
              value={linkedin}
              onChangeText={(text) => setLinkedin(text)}
            />
          </View>
        </View>
        <View marginBottom={-6 * vh}>
          <Button
            onPress={() => finishProfile()}
            mode="contained"
            theme={themes.button}
            style={styles.button}
          >
            Done
          </Button>
        </View>
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
  headingMessage: {
    marginTop: 3 * vh,
    alignSelf: "center",
    width: 85 * vmin,
    fontFamily: "Lato-Regular",
    fontSize: 3.8 * vmin,
    color: palette.grey,
  },
  inputGroup: {
    gap: 3.5 * vh,
  },
  textInput: {
    width: 80 * vmin,
    height: 12 * vmin,
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
});

export default FinishProfile;
