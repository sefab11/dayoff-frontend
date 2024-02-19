import React, { useEffect, useRef, useState, memo } from "react";
import { View, Image, Text, TouchableOpacity, StyleSheet, Modal } from "react-native";
import { palette, themes, flags } from "../../../style";
import CountryDropdown from "./CountryDropdown";


const CountryLabel = (props) => {
    const { country, removeCountry } = props;

    return (
    <View style={styles.countryContainer}
    backgroundColor={palette.lightPurple}
    borderColor={palette.lightPurple}
    key={country.code}>
        <Image style={styles.countryIcon}
        source={flags[country.code]} />

        <Text style={styles.countryTextActive}>{country.name}</Text>

        <TouchableOpacity onPress={() => removeCountry()}>
            <Image style={styles.xIcon}
            tintColor={palette.black}
            source={require("../../../../assets/icons/x.png")} />
        </TouchableOpacity>
    </View>
    );
}


const SelectOneCountry = (props) => {
    const { title, titleStyle, label, labelStyle, boxWidth } = props;

    const [isModalVisible, setModalVisible] = useState(false);

    // keeping track of the value of the dropdown selector
    const [value, setValue] = useState(null);

    //for keeping track of which countries the user has added
    //each element should be a dictionary in format {'code': x, 'name': y}
    const [selectedCountries, setSelectedCountries] = useState('');

    const toggleModal = () => setModalVisible(!isModalVisible);

    //updates the parent state every time selectedCountries is updated
    /*required as useState is asynchronous on its own so updating parent state
        without useEffect caused a delay and the previous state was updated.
    */
    useEffect(() => {
       props.onSelectCountry(selectedCountries);
    }, [selectedCountries])

    function updateCountries(selected){
        if (!selected) return;

        setSelectedCountries(selected[0]);
    }

    function removeCountry(){
        setSelectedCountries('');
    }


    return (
    <View style={styles.selectCountryWrap}>
        <View>
            <Text style={titleStyle}>{title}</Text>
        </View>
        <View>
            <Text style={labelStyle}>{label}</Text>
        </View>

        <View style={styles.countriesContainer} width={boxWidth}>
            {selectedCountries == '' ? null
            : <CountryLabel country={selectedCountries} removeCountry={removeCountry} />}

            <TouchableOpacity onPress={toggleModal} style={styles.globeIcon}>
                <Image style={styles.icon}
                tintColor={palette.purple}
                source={require("../../../../assets/icons/globe.png")} />
            </TouchableOpacity>
        </View>
        <CountryDropdown
        isModalVisible={isModalVisible}
        toggleModal={toggleModal}
        allowMultipleCountries={false}
        updateCountries={updateCountries}
        value={value} setValue={setValue}
        />
    </View>
    );
};


const styles = StyleSheet.create({
  selectCountryWrap: {
    marginTop: -20,
    paddingTop: 0,
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
    width: 85 * vmin,
    fontFamily: "Lato-Regular",
    fontSize: 3.8 * vmin,
    color: palette.grey,
  },
  buttonContainer: {
    marginTop: 80 * vh,
    flex: 1,
    justifyContent: "center"
  },
  button: {
    width: 80 * vmin,
    height: 14 * vmin,
    alignItems: 'center',
    justifyContent: "center",
    paddingBottom: 0.5 * vmin,
    borderRadius: 8,
    backgroundColor: palette.purple,
  },
  countriesContainer: {
    display: 'flex',
    flexDirection: "row",
    flexWrap:'wrap',
    borderColor: "#D7D7D7",
    borderWidth: 1,
    padding: 7,
    borderRadius: 5,
    alignItems: 'center',
    columnGap: 10,
    rowGap: 10,
    marginTop: 0,
  },
  countryContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 5,
    borderWidth: 1
  },
  countryIcon: {
    resizeMode: 'center',
    width: 10 * vmin,
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
  icon: {
    resizeMode: 'center',
    height: 4 * vh,
    width: 4 * vh,
  },
  xIcon: {
    resizeMode: 'contain',
    height: 1.5 * vh,
    width: 1.5 * vh,
    marginHorizontal: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    height: 100 * vh,
  },
  globeIcon: {
    marginLeft: 'auto',
    alignSelf: 'center',
  },

});

export default SelectOneCountry;
