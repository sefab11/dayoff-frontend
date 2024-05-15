import { View, StyleSheet, Text, Image, TouchableOpacity } from "react-native";
import { TextInput } from "../../components/textinput";
import React, { useState, useEffect } from "react";
import { themes } from "../../style";
import { dimensions } from "../../style";
import { palette } from "../../style";


export default ProfileInfo = (props) => {
  const [country, setCountry] = useState(props.initCountry);
  const [job, setJob] = useState(props.initJob);
  const [url, setURL] = useState(props.initURL);


  useEffect(() => {
    props.onChangeCountry(country);
    props.onChangeJob(job);
    props.onChangeURL(url);

  }, [country, job, url])


  return (
    <View style={styles.profileInfoContainer}>
      <View style={styles.infoContainer}>
        <View style={{flexDirection: "row", alignItems: "flex-end"}}>
          <Text style={styles.headingText}>Country of Residence</Text>
          <Image
            source={require("../../../assets/icons/pencil.png")}
            tintColor={palette.purple}
            style={styles.editIcon}
          />
        </View>

        <View style={styles.countryContainer}>
          <TextInput
            editable={true}
            numberOfLines={1}
            maxLength={50}
            onChangeText={text => setCountry(text)}
            value={country}
            style={styles.textInput}
          />
        </View>
      </View>

      <View style={styles.infoContainer}>
        <View style={{flexDirection: "row", alignItems: "flex-end"}}>
          <Text style={styles.headingText}>Job Title & Company</Text>
          <Image
            source={require("../../../assets/icons/pencil.png")}
            tintColor={palette.purple}
            style={styles.editIcon}
          />
        </View>

        <View style={styles.countryContainer}>
          <TextInput
            editable={true}
            numberOfLines={1}
            maxLength={50}
            onChangeText={text => setJob(text)}
            value={job}
            style={styles.textInput}
          />
        </View>
      </View>

      <View style={styles.infoContainer}>
        <View style={{flexDirection: "row", alignItems: "flex-end"}}>
          <Text style={styles.headingText}>My LinkedIn URL</Text>
          <Image
            source={require("../../../assets/icons/pencil.png")}
            tintColor={palette.purple}
            style={styles.editIcon}
          />
        </View>

        <View style={styles.countryContainer}>
          <TextInput
            editable={true}
            numberOfLines={1}
            maxLength={50}
            onChangeText={text => setURL(text)}
            value={url}
            style={styles.textInput}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  profileInfoContainer: {
    width: 85 * vmin,
    paddingBottom: 35,
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderColor: "#D7D7D7",
    marginBottom: 20,
    paddingTop: 25,
  },
  infoContainer: {
    marginBottom: 15,
    alignItems: "flex-start",
  },
  headingText: {
    marginTop: 3 * vh,
    alignSelf: "center",
    width: 85 * vmin,
    fontFamily: "Lato-Regular",
    fontSize: 4.5 * vmin,
    fontWeight: "700",
    color: "#000000",
  },
  message: {
    marginTop: 1.5 * vh,
    alignSelf: "center",
    width: 78 * vmin,
    fontFamily: "Lato-Regular",
    fontSize: 3.8 * vmin,
    color: palette.grey,
  },
  countryContainer: {
    flexDirection: "row",
    marginLeft: 5,
  },
  editIcon: {
    resizeMode: "contain",
    height: 2 * vh,
    width: 2 * vh,
    marginLeft: "auto",
  },
  textInput: {
    width: 85 * vmin,
    alignSelf: 'flex-start',
    marginLeft: -5,
  },
});
