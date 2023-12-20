import { useState } from "react";
import { View, Image, Text, TouchableOpacity, StyleSheet, Modal } from "react-native";
import { palette, themes, flags } from "../../style";
import { Dropdown, SelectCountry } from 'react-native-element-dropdown';
import DropDownPicker from 'react-native-dropdown-picker';
import { Label } from "..";


const SelectCountries = (props) => {
  const [canEdit, setCanEdit] = useState(props.editable);
  const boxWidth = props.boxWidth;
  const allowMultipleCountries = props.multipleCountries;
  const title = props.title;
  const subtitle = props.subtitle;
  const subtitleStyle = props.subtitleStyle;


  const [isModalVisible, setModalVisible] = useState(false);
  //for keeping track of which countries the user has added
  //each element should be a dictionary in format {'code': x, 'name': y}
  const [selectedCountries, setSelectedCountries] = useState([]);


  function toggleModal(){
    if (!canEdit) return;

    setModalVisible(!isModalVisible);
  }


  function removeCountry(countryCode){
    if (!canEdit) return;

    const index = indexOfCode(countryCode);
    if (index < selectedCountries.length && index > -1){
        selectedCountries.splice(index, 1);
        setSelectedCountries(countries => [...countries]);
    }
  }

  //return the index of the code, otherwise return -1 if code doesn't exist
  function indexOfCode(code){
    for (let i = 0; i < selectedCountries.length; i++){
        if (code == selectedCountries[i]['code']) return i;
    }
    return -1;
  }

  function updateCountries(newCountry){
    //when adding a newCountry, a generated index is added so can't check
    //if array.includes(newCountry), need to check the codes and values
    if (newCountry == null) return;
    else if (indexOfCode(newCountry['code']) != -1) return;

    if (allowMultipleCountries) setSelectedCountries(countries => [...countries, newCountry]);
    else setSelectedCountries([newCountry]);
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
                    tintColor={canEdit ? palette.black : palette.grey}
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

    function formatSelected(code){
        if (allowMultipleCountries){
            const newElement = code.pop();
            return {'code': newElement, 'name': codes.getName(newElement, 'en')};
        }
        else return {'code': code, 'name': codes.getName(code, 'en')};
    }

    const [value, setValue] = useState(null);


    return (
    <Modal
        visible={isModalVisible}
        animationIn='slideInUp'
        animationOut='slideOutDown'
        transparent={true}
    >
        <View style={styles.modalContainer}>
            <DropDownPicker
            open={true}
            items={countryCodes}
            schema={{
                label: "name",
                value: "code",
            }}
            multiple={allowMultipleCountries}
            min={0}
            max={5}
            value={value}
            setValue={setValue}
            onChangeValue={(item) => {
                updateCountries(formatSelected(item));
                toggleModal();
            }}
            maxHeight={"80%"}
            />
        </View>
    </Modal>
    )
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

  modalContainer: {
    flex: 1,
    width: "100%",
    height: "100%",
  },

});

export default SelectCountries;
