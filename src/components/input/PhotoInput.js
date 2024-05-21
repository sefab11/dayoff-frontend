import {
  View,
  Keyboard,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Text,
  ScrollView,
  Image,
} from "react-native";
import { StyleSheet, ImageBackground, Platform } from "react-native";
import { React, useState, useEffect } from "react";
import { palette, themes } from "../../style";
import * as ImagePicker from "expo-image-picker";

const PhotoInput = (props) => {
  const circleWidth = props.width;

  //    var initImg = null;
  //    if (props.image){
  //        var reader = new FileReader();
  //        reader.readAsDataURL(props.image);
  //        reader.onloadend = function(){
  //            var base64data = reader.result;
  //            initImg = URL.createObjectURL(base64data);
  //        }
  //    }

  const [img, setImg] = useState(props.image ? props.image : null);
  const children = props.children;
  const cameraRatio = (Number(props.camRatio.slice(0, -1)) * 1.25)
    .toString()
    .concat("%");

  const openImagePicker = async () => {
    await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    }).then(async (result) => {
      if (!result.canceled) {
        // Get the filename from the URI
        const filename = result.assets[0].uri;
        console.log("Selected file:", JSON.stringify(filename));
        // Convert the image data URI to Blob
        const blob = await fetch(result.assets[0].uri).then((res) =>
          res.blob()
        );
        props.onPhotoSelected(result.assets[0].uri);
        setImg(result.assets[0].uri);
      }
    });
  };

  return (
    <>
      <TouchableOpacity
        style={{
          width: circleWidth,
          height: circleWidth,
          borderRadius: circleWidth / 2,
          backgroundColor: palette.lightPurple,
          alignItems: "center",
          justifyContent: "center",
        }}
        onPress={() => openImagePicker()}
      >
        {img != null ? (
          <ImageBackground
            source={{ uri: img }}
            style={styles.imageBackground}
            imageStyle={{ borderRadius: 100 }}
          >
            <View
              style={styles.outerCameraContainer}
              width={cameraRatio}
              height={cameraRatio}
            >
              <View style={styles.innerCameraContainer}>
                <Image
                  source={require("../../../assets/icons/camera.png")}
                  style={styles.cameraIcon}
                ></Image>
              </View>
            </View>
          </ImageBackground>
        ) : (
          <>
            <Image
              source={require("../../../assets/icons/camera.png")}
              tintColor={palette.purple}
              style={{
                resizeMode: "contain",
                width: cameraRatio,
                height: cameraRatio,
              }}
            />
            {children}
          </>
        )}
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  imageBackground: {
    display: "flex",
    width: "100%",
    height: "100%",
    alignSelf: "center",
    alignItems: "flex-end",
    justifyContent: "flex-end",
  },
  outerCameraContainer: {
    borderRadius: 100,
    borderWidth: 1,
    borderColor: palette.white,
    marginRight: -10,
    marginBottom: -10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: palette.white,
  },
  innerCameraContainer: {
    width: "85%",
    height: "85%",
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: palette.lightPurple,
    elevation: 1,
  },
  cameraIcon: {
    resizeMode: "contain",
    width: "65%",
    height: "65%",
    opacity: 1,
    tintColor: palette.purple,
  },
});

export default PhotoInput;
