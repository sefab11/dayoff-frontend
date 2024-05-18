import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
} from "react-native";
import { Button, Header, TextInput, PhotoInput } from "../components";
import { Dialog } from "../components";
import { palette, themes } from "../style";
import * as ImagePicker from "expo-image-picker";
import Modal from "react-native-modal";

import UserService from "../services/UserService";
import FullValidationService from "../services/ValidationService";
const { putExtraData } = UserService;
const { isCountryValid, isProfessionValid } = FullValidationService;

//const PhotoInput = ({ onPhotoSelected }) => {
//  const selectPhoto = async () => {
//    try {
//      const permissionResult =
//        await ImagePicker.requestMediaLibraryPermissionsAsync();
//      if (permissionResult.granted === false) {
//        alert("Permission to access camera roll is required!");
//        return;
//      }
//
//      const result = await ImagePicker.launchImageLibraryAsync({
//        mediaTypes: ImagePicker.MediaTypeOptions.Images,
//        allowsEditing: true,
//        aspect: [3, 3],
//        quality: 1,
//      });
//
//      if (!result.canceled) {
//        // Get the filename from the URI
//        const filename = result.uri.split("/").pop();
//        console.log("Selected file:", JSON.stringify(filename));
//        // Convert the image data URI to Blob
//        const blob = await fetch(result.uri).then((res) => res.blob());
//        onPhotoSelected(blob);
//      }
//    } catch (error) {
//      console.error("Error selecting photo:", error);
//    }
//  };
//
//  return (
//    <View>
//      <Text>Upload Image: </Text>
//      <TouchableOpacity onPress={selectPhoto} style={styles.container}>
//        <Image
//          source={{ uri: "https://via.placeholder.com/150" }}
//          style={styles.addPhotoIcon}
//        />
//      </TouchableOpacity>
//    </View>
//  );
//};

const FinishProfile = ({ navigation }) => {
  const [photo, setPhoto] = useState(null);
  const [country, setCountry] = useState("");
  const [job, setJob] = useState("");
  const [linkedin, setLinkedin] = useState("");

  const areInputsValid = () => {
    return !!photo && country.trim() !== "" && job.trim() !== "" && linkedin.trim() !== "";
  };

  const finishProfile = async () => {
    try {
      console.log("Email:", global.currentUser.email_id);
      console.log("Country:", country);
      console.log("Job:", job);
      console.log("Photo:", photo);
      console.log("Linkedin:", linkedin);

      if (!photo) {
        console.error("Photo is not set");
        return;
      }
//      const photoFile = new File([photo], "photo", { type: "image/*" });
//
//      const formData = new FormData();
//      formData.append("photo", photoFile);

      await putExtraData(global.currentUser.email_id, photo, country, job, null).then((data) => {
        console.log(data);

        // if successfully updated in db then also update locally

        global.currentUser.profile_picture = photo;
        global.currentUser.country = country;
        global.currentUser.job = job;
        global.currentUser.linkedin = linkedin;

        // navigate to next page
        navigation.navigate("GetMatched");
      })

//      const url = `http://127.0.0.1:8000/user/putExtra?email=${encodeURIComponent(
//        global.currentUser.email_id
//      )}&country=${encodeURIComponent(country)}&job=${encodeURIComponent(job)}`;
//
//      const response = await fetch(url, {
//        method: "POST",
//        body: formData,
//        headers: {
//          Accept: "application/json",
//          "Content-Type": "multipart/form-data",
//        },
//      });
//
//      const result = await response.json();
//
//      if (response.ok) {
//        navigation.navigate("GetMatched");
//      } else {
//        toggleDialog();
//      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toggleDialog();
    }
  };

  const toggleDialog = () => {
    setDialogVisible(!dialogVisible);
  };

  const [dialogVisible, setDialogVisible] = useState(false);

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
          width={40 * vmin} camRatio={'30%'}
          image={null}
          onPhotoSelected={(data) => setPhoto(data)}
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

            {/* No need for validation message here */}
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

            {/* No need for validation message here */}
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
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  addPhotoIcon: {
    width: 150,
    height: 150,
    marginBottom: 10,
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
  invalidMessage: {
    color: "red",
    textAlign: "left",
    flexWrap: "wrap",
    width: 80 * vmin,
  },
});

export default FinishProfile;
