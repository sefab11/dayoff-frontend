import { React, useEffect, useRef, useState, memo } from "react";
import { View, Image, Text, TouchableOpacity, StyleSheet, Modal } from "react-native";
import { palette, themes, flags } from "../../style";
import { SelectCountry } from 'react-native-element-dropdown';
import DropDownPicker from 'react-native-dropdown-picker';

  //either return a multiselect or dropdown depending on allowMultipleCountries
  //TODO: add option to change the language + verification that language is supported
  const ModalDropdown = (props) => {
    const {value, setValue, isModalVisible, allowMultipleCountries, updateCountries, toggleModal} = props;
    var codes = require("i18n-iso-countries");
    codes.registerLocale(require("i18n-iso-countries/langs/en.json"));

    //array of dictionaries that contain {'code': code, 'name': name}
    var countryCodes = [];
    for (const [key, value] of Object.entries(codes.getNames('en', {select: 'official'}))){
        const newEntry = {'code': key, 'name': value};
        countryCodes.push(newEntry);
    }

    function formatSelected(code){
      return {'code': code, 'name': codes.getName(code, 'en')};
    }

    return (
      <Modal
          visible={isModalVisible}
          animationIn='slideInUp'
          animationOut='slideOutDown'
      >
        <View style={styles.modalContainer}>
            <DropDownPicker

            placeholder='Select a country'
            showArrowIcon={false}
            showTickIcon={true}
            searchable={true}
            searchPlaceholder='Search...'

            open={true}
            items={countryCodes}
            schema={{
                label: "name",
                value: "code",
            }}
            mode="SIMPLE"
            listMode="FLATLIST"

            multiple={allowMultipleCountries}
            min={0}
            max={10}

            value={value}
            setValue={setValue}
            onChangeValue={(item) => {
              if(allowMultipleCountries) updateCountries(item.map(code => formatSelected(code)));
              else updateCountries([formatSelected(item)]);
            }}

            //if make maxHeight 100% then it disables the scroll functionality
            //max height possible is 99%, don't make it 100%
            maxHeight={80 * vh}
            placeholderStyle={{
              color: palette.grey,
              fontWeight: 'bold',
              borderRadius: 0,
              borderWidth: 0,
            }}
            searchContainerStyle={{
              borderColor: palette.black,
            }}
            searchTextInputStyle={{
              color: palette.purple,
              borderColor: palette.black,
              fontWeight: 'bold',
            }}
            listItemContainer={{
              height: 50,
            }}
            listItemLabelStyle={{
              color: palette.purple,
              fontWeight: 'bold',
            }}
            />
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={() => toggleModal()}
              mode="contained"
              style={styles.button}
            >
              <Text
                style={{
                  fontFamily: 'Lato-Regular',
                  color: palette.white,
                  fontWeight: 'bold',
                }}
              >
                Confirm
              </Text>
            </TouchableOpacity>
          </View>
        </View>
    </Modal>
    )
}

const ModalDropdownMemo = memo(ModalDropdown, (prevProps, nextProps) => {
  return (
    prevProps.isModalVisible === nextProps.isModalVisible &&
    prevProps.allowMultipleCountries === nextProps.allowMultipleCountries &&
    prevProps.value === nextProps.value
  );
});

const SelectCountries = (props) => {
  const [canEdit, setCanEdit] = useState(props.editable);
  const boxWidth = props.boxWidth;
  const allowMultipleCountries = props.multipleCountries;
  const title = props.title;
  const subtitle = props.subtitle;
  const subtitleStyle = props.subtitleStyle;


  const [isModalVisible, setModalVisible] = useState(false);

  // keeping track of the value of the dropdown selector
  const [value, setValue] = useState(null);

  //for keeping track of which countries the user has added
  //each element should be a dictionary in format {'code': x, 'name': y}
  const [selectedCountries, setSelectedCountries] = useState(props.initialCountries);

  function toggleModal(){
    if (!canEdit) return;

    setModalVisible(!isModalVisible);
  }


  function removeCountry(countryCode){
    if (!canEdit) return;
    setSelectedCountries(selectedCountries.filter(country => country['code'] !== countryCode));

    if (!allowMultipleCountries) return;
    setValue(value.filter(code => code !== countryCode));
  }

  const updateCountries = (selected) => {
    if (!selected) return;

    setSelectedCountries(selected);
    props.onSelectCountry(selected.map(country => country.name));
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
                    source={require("../../../assets/icons/x.png")}
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
            <Text
              style={{
                fontFamily: 'Lato-Bold',
                marginTop: 1 * vh,
                marginBottom: 0.5 * vh
              }}
            >
                {subtitle}
            </Text>
        </View>
        );
    };
  }

  return (
    <View>
      {enableHeader(title)}
      {enableSubheader(subtitle)}

      <View style={styles.countriesContainer}
        width={boxWidth}
        marginTop={subtitleStyle == 2 ? 0 : 15}
      >
        {deliverCountryLabels()}

          <TouchableOpacity onPress={toggleModal}
            style={{
              marginLeft: 'auto',
              alignSelf: 'center'
            }}>
            <Image
                style={styles.icon}
                tintColor={canEdit ? palette.purple : palette.grey}
                source={require("../../../assets/icons/globe.png")}
            />
          </TouchableOpacity>
      </View>
      <ModalDropdownMemo
        isModalVisible={isModalVisible}
        allowMultipleCountries={allowMultipleCountries}
        updateCountries={(updateCountries)}
        toggleModal={toggleModal}
        value={value}
        setValue={setValue}
      />
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

});

export default SelectCountries;
