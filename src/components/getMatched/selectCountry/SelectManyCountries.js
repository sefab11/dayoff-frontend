import React, { useEffect, useRef, useState, memo } from "react";
import { View, Image, Text, TouchableOpacity, StyleSheet, Modal } from "react-native";
import Checkbox from 'expo-checkbox';
import { palette, themes, flags } from "../../../style";
import CountryDropdown from "./CountryDropdown";


const CountryLabel = (props) => {
    const { country, removeCountry, isChecked } = props;

    return (
    <View style={styles.countryContainer}
    backgroundColor={isChecked ? palette.lightGrey2 : palette.lightPurple}
    borderColor={palette.lightPurple}
    key={country.code}>
        <Image style={styles.countryIcon}
        source={flags[country.code]}
        opacity={isChecked ? 0.25 : 1}/>

        <Text style={isChecked ? styles.countryTextInactive : styles.countryTextActive}>
            {country.name}
        </Text>

        <TouchableOpacity onPress={() => removeCountry(country)}>
            <Image style={styles.xIcon}
            tintColor={isChecked ? palette.grey : palette.black}
            source={require("../../../../assets/icons/x.png")} />
        </TouchableOpacity>
    </View>
    );
}


const SelectManyCountries = (props) => {
    const { title, titleStyle, label, labelStyle, boxWidth, isFlexible } = props;

    const [isModalVisible, setModalVisible] = useState(false);

    // keeping track of the value of the dropdown selector
    // init the value values to the codes of each country
    const [value, setValue] = useState(props.init.map(country => country.code));
    const [isChecked, setChecked] = useState(false);

    //for keeping track of which countries the user has added
    //each element should be a dictionary in format {'code': x, 'name': y}
    const [selectedCountries, setSelectedCountries] = useState(props.init);

    const toggleModal = () => setModalVisible(!isModalVisible);

    //update data in parent whenever countries are updated
    useEffect(() => {
        props.onSelectCountry(selectedCountries.map(country => country));
    }, [selectedCountries])

    function updateCountries(selected){
        if (!selected) return;

        setSelectedCountries(selected);
    }

    function removeCountry(countryCode){
        if (isChecked) return;

        selectedCountries.splice(selectedCountries.indexOf(countryCode), 1);

        setSelectedCountries(countries => [...countries]);
        setValue(value.filter(select => select != countryCode.code));
    }

    useEffect(() => {
        console.log("values:" + value);
    }, [value])


    return (
    <View>
        <View>
            <Text style={titleStyle}>{title}</Text>
        </View>
        <View>
            <Text style={labelStyle}>{label}</Text>
        </View>

        <View style={styles.countriesContainer} width={boxWidth}>
            {selectedCountries == null ? null
            : selectedCountries.map((country) =>
            <CountryLabel country={country}
            removeCountry={removeCountry} isChecked={isChecked}
            />)
            }

            <TouchableOpacity onPress={toggleModal} style={styles.globeIcon}>
                <Image style={styles.icon}
                tintColor={isChecked ? palette.grey : palette.purple}
                source={require("../../../../assets/icons/globe.png")} />
            </TouchableOpacity>
        </View>
        <CountryDropdown
        isModalVisible={isModalVisible}
        toggleModal={toggleModal}
        allowMultipleCountries={true}
        updateCountries={updateCountries}
        value={value} setValue={setValue}
        />
        {isFlexible
        ?
        <View style={styles.checkboxContainer}>
            <Checkbox style={styles.checkbox} value={isChecked} onValueChange={setChecked}
            color={isChecked ? palette.purple : undefined} />
            <Text style={styles.checkText}>I haven’t decided yet</Text>
        </View>
        : null
        }
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
    marginTop: 15,
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
  globeIcon: {
    marginLeft: 'auto',
    alignSelf: 'center',
  },
  checkboxContainer:{
    flexDirection:'row',
    alignItems:'center',
    marginTop:15,
  },
  checkText:{
    paddingLeft:10,
    fontFamily: "Lato-Regular",
    fontSize: 4 * vmin,
    fontWeight: '600',
    color: "#000000",
    letterSpacing: 1.5,
  }
});

export default SelectManyCountries;
