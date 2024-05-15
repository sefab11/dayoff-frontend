import React, { useEffect, useRef, useState, memo } from "react";
import { View, Image, Text, TouchableOpacity, StyleSheet, Modal } from "react-native";
import { palette, themes, flags } from "../../../style";
import { SelectCountry } from 'react-native-element-dropdown';
import DropDownPicker from 'react-native-dropdown-picker';

//TODO: add option to change the language + verify that language is supported?
const ModalDropdown = (props) => {
    const {value, setValue, isModalVisible, toggleModal,
    allowMultipleCountries, updateCountries} = props;

    var countryCodes = require("i18n-iso-countries");
    countryCodes.registerLocale(require("i18n-iso-countries/langs/en.json"));

    //generate array of dictionaries that contain the code and name of each country
    const englishCountryCodes = countryCodes.getNames('en', {select: 'official'});
    var englishDropdownValues = [];
    Object.keys(countryCodes.getNames('en', {select: 'official'})).forEach((key) => {
        var newEntry = {'code': key, 'name': englishCountryCodes[key]};
        englishDropdownValues.push(newEntry);
    })

    function formatSelected(code){
        return {'code': code, 'name': countryCodes.getName(code, 'en')};
    }

    return (
    <Modal
    visible={isModalVisible}
    animationOut='slideInUp'
    animationOut='slideOutDown'>
        <View style={styles.modalContainer}>
            <DropDownPicker
            placeholder='Select a country'
            showArrowIcon={false} showTickIcon={true}
            searchable={true}
            searchPlaceholder='Search...'

            open={true}
            items={englishDropdownValues}
            schema={{
                label: 'name',
                value: 'code',
            }}
            mode="SIMPLE"
            listMode="FLATLIST"

            multiple={allowMultipleCountries}
            min={0}
            max={10}

            value={value} setValue={setValue}
            onChangeValue={(item) => {
                if (allowMultipleCountries) updateCountries(item.map(code => formatSelected(code)));
                else updateCountries([formatSelected(item)]);
            }}

            maxHeight={80 * vh}
            placeholderStyle={{
                color: palette.grey,
                fontWeight: 'bold',
                borderRadius: 0,
                borderWidth: 0,
            }}
            searchContainerStyle={{borderColor: palette.black}}
            searchTextInputStyle={{
                color: palette.purple,
                borderColor: palette.black,
                fontWeight: 'bold',
            }}
            listItemContainer={{height: 50}}
            listItemLabelStyle={{
                color: palette.purple,
                fontWeight: 'bold',
            }}
            />

            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button}
                mode='contained'
                onPress={toggleModal}>
                    <Text style={{
                        fontFamily: 'Lato-Regular',
                        color: palette.white,
                        fontWeight: 'bold',
                    }}>
                        Confirm
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    </Modal>
    )
}

const CountryDropdown = React.memo(ModalDropdown, (prevProps, nextProps) => {
    return (
        prevProps.isModalVisible === nextProps.isModalVisible &&
        prevProps.allowMultipleCountries === nextProps.allowMultipleCountries &&
        prevProps.value === nextProps.value
    );
})

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    height: 100 * vh,
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
})

export default CountryDropdown;