import { useState } from "react";
import { View, Image, Text, TouchableOpacity, StyleSheet } from "react-native";
import { palette, themes, flags } from "../../style";
import { Dropdown, SelectCountry } from 'react-native-element-dropdown';
import { Label } from "..";


const SelectCountries = (props) => {
  const [canEdit, setCanEdit] = useState(props.editable);
  const boxWidth = props.boxWidth;
  const allowMultipleCountries = props.multipleCountries;
  const title = props.title;
  const subtitle = props.subtitle;
  const subtitleStyle = props.subtitleStyle;


  //TODO: for triggering the dropdown/multiselect to be visible/invisible
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  //for keeping track of which countries the user has added
  //each element should be a dictionary in format {'code': x, 'name': y}
  const [selectedCountries, setSelectedCountries] = useState([]);


  //TODO: toggle the dropdown/multiselect to be visible/invisible
  function toggleModal(){
    console.log("edit pressed");
    setIsDropdownVisible(!isDropdownVisible);
  }

  //TODO: remove the country from selectedCountries based on the code passed
  function removeCountry(countryCode){
    return;
  }

  function updateCountries(newCountry){
    if (newCountry == null) return;
    //TODO: add in vertification to prevent adding in the same country
    //when adding a newCountry, a generated index is added so can't check
    //if array.includes(newCountry), need to check the codes and values

    if (allowMultipleCountries) setSelectedCountries(countries => [...countries, newCountry]);
    else setSelectedCountries([newCountry]);

    console.log(selectedCountries);
  }

  function deliverCountryLabels(){
    if (selectedCountries == null) return;

    const countryComponents = selectedCountries.map((country) =>
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

  function enableHeader(headerOpt){
    if (headerOpt == null) return;

    return (
        <View>
            <Text style={styles.headingText}>{title}</Text>
        </View>
    );
  }

  function enableSubheader(subheaderOpt){
    if (subheaderOpt == null) return;

    if (subtitleStyle == 1){
        return (
        <View>
            <Text style={styles.message}>{subtitle}</Text>
        </View>
        );
    }
    else if (subtitleStyle == 2){
        return (
        <View>
            <Label>{subtitle}</Label>
        </View>
        );
    };
  }

  //either return a multiselect or dropdown depending on allowMultipleCountries
  //TODO: add option to change the language + verification that language is supported
  function deliverDropdown(){
    var codes = require("i18n-iso-countries");
    codes.registerLocale(require("i18n-iso-countries/langs/en.json"));

    //array of dictionaries that contain {'code': code, 'name': name}
    var countryCodes = [];
    for (const [key, value] of Object.entries(codes.getNames('en', {select: 'official'}))){
        const newEntry = {'code': key, 'name': value};
        countryCodes.push(newEntry);
    }

    if (allowMultipleCountries){
        return (
        <View>
            <SelectCountry
            data={countryCodes}
            labelField="name"
            valueField="code"
            onChange={item => updateCountries(item)} />
        </View>
        )
    }
    else{
        return (
        <View>
            <Dropdown
            data={countryCodes}
            labelField="name"
            valueField="code"
            onChange={item => updateCountries(item)} />
        </View>
        )
    }
  }


  return (
    <View>
      {enableHeader(title)}
      {enableSubheader(subtitle)}

      <View style={styles.countriesContainer}
      width={boxWidth}
      marginTop={subtitleStyle == 2 ? 0 : 15}>
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
      {deliverDropdown()}
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
  countriesContainer: {
    display: 'flex',
    flexDirection: "row",
    flexWrap:'wrap',
    borderColor: "#D7D7D7",
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    columnGap: 10,
    rowGap: 10,
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
