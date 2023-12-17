import { useState } from "react";
import { View, Image, Text, TouchableOpacity } from "react-native";
import { palette, themes, flags } from "../../style";
import { StyleSheet } from "react-native";


const SelectCountries = () => {
  const [canEdit, setCanEdit] = useState(true);

  const [newCountries, setCountries] = useState([
    {code: 'ES', name: 'Spain'},
    {code: 'BR', name: 'Brazil'},
    {code: 'MA', name: 'Morocco'},
    {code: 'JP', name: 'Japan'},
    {code: 'AU', name: 'Australia'},
    {code: 'GB', name: 'United Kingdom'}
  ]);

  function toggleModal(){
    console.log("edit pressed");
  }

  function removeCountry(countryCode){
    return;
  }

  function deliverCountryLabels(){
    if (newCountries == null) return;

    const countryComponents = newCountries.map((country) =>
        <View key={country.code} style={styles.countryContainer}
        backgroundColor={canEdit ? palette.lightPurple : palette.lightGrey2}
        borderColor={canEdit ? palette.lightPurple : palette.lightGrey2}>
            <Image
                style={styles.countryIcon}
                source={flags[country.code]}
            />

            <Text style={canEdit ? styles.countryTextActive : styles.countryTextInactive}>
            {country.name}</Text>

            <TouchableOpacity onPress={() => removeCountry(country.code)}>
                <Image
                    style={styles.xIcon}
                    //image should be around 32 x 32
                    source={require("../../../assets/images/welcome_screen/xIcon.png")}
                />
            </TouchableOpacity>
        </View>
    );

    return countryComponents;
  }

  return (
    <View>
      <View>
        <Text style={styles.headingText}>
          Select all countries you wish to visit
        </Text>
      </View>
      <View>
        <Text style={styles.message}>
          You can add more countries later in profile setting
        </Text>
      </View>

      <View style={styles.countriesContainer}>
          {deliverCountryLabels()}

          <TouchableOpacity onPress={toggleModal}
          style={{marginLeft: 'auto',
          padding: 10,
          alignSelf: 'center' }}>
            <Image
                style={styles.icon}
                tintColor={canEdit ? palette.purple : palette.grey}
                source={require("../../../assets/images/welcome_screen/edit.png")}
            />
          </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
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
    width: 85 * vmin,
    fontFamily: "Lato-Regular",
    fontSize: 3.8 * vmin,
    color: palette.grey,
  },
  buttonGroup: {
    gap: 2 * vmin,
    marginTop: 5 * vh,
    marginBottom: 5 * vh,
  },
  button: {
    width: 80 * vmin,
    height: 14 * vmin,
    justifyContent: "center",
    paddingBottom: 0.5 * vmin,
  },
  textContainer: {
    color: "#A9A9A9",
    backgroundColor: "#D7D7D7",
    padding: 5,
    borderRadius: 5,
    paddingLeft: 15,
    paddingRight: 15,
  },
  countriesContainer: {
    display: 'flex',
    flexDirection: "row",
    flexWrap:'wrap',
    borderColor: "#D7D7D7",
    borderWidth: 1,
    padding: 10,
    marginTop: 25,
    borderRadius: 5,
    alignItems:'center',
    margin:10,
    columnGap: 10,
    rowGap: 10,
  },
  country: {
    backgroundColor: "#EEECFA",
    width:'30%',
    padding:10,
    paddingLeft:15,
    paddingRight:25,
    alignItems:'center',
    margin:5
  },

  countryContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 5,
    borderWidth: 1,
  },
  countryIcon: {
    resizeMode: 'center',
    width: 8 * vmin,
    height: 10 * vmin,
  },
  countryTextActive: {
    color: palette.purple,
    fontSize: 3.8 * vmin,
    fontWeight: 'bold',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  countryTextInactive: {
    color: palette.grey,
    fontSize: 3.8 * vmin,
    fontWeight: 'bold',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  xIcon: {
    resizeMode: 'center',
  },
  

});

export default SelectCountries;
