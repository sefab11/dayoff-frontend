import { View, Keyboard, TouchableWithoutFeedback, Text } from "react-native";
import { Button, HeaderBack, MultilineInput, PasswordInput, TextInput, Dialog } from "../components";
import { StyleSheet } from "react-native";
import Modal from "react-native-modal";
import { React, useState } from "react";
import { palette, themes } from "../style";
import { SelectOneDate, SelectOneCountry } from "../components";

import FullValidationService from "../services/ValidationService";
const { isDateValid, isCountryValid, isNumPeopleValid } = FullValidationService;
import TripsService from "../services/TripsService";
const { createNewTrip } = TripsService;


//SCREEN TO CREATE A TRIP

export default CreateTripScreen = ({ navigation }) => {
    const emailAddress = global.currentUser.email_id;

    const [date, setDate] = useState({
        'value': '',
        'valid': null,
        'required': true,
    });
    const [country, setCountry] = useState({
        'value': '',
        'valid': null,
        'required': true,
    });
    const [numPeople, setNumPeople] = useState({
        'value': '',
        'valid': null,
        'required': true,
    });
    const [desc, setDesc] = useState({
        'value': '',
        'required': false,
    });

    const updatedState = (stateDict, newVal) => {
        return Object.assign({}, stateDict, {'value': newVal});
    }

    function areFieldsValid(){
        //check date is valid
        date.valid = isDateValid(date.value);
        //check country is valid
        country.valid = isCountryValid(country.value);
        //check num people is valid
        numPeople.valid = isNumPeopleValid(numPeople.value);

        console.log(date.value);
        console.log(country.value);
        console.log(numPeople.value);
        console.log(desc.value);

        return (
           (date.valid      || !date.required)
        && (country.valid   || !country.required)
        && (numPeople.valid || !numPeople.required)
        )
    }

    const createTrip = async () => {
        if (areFieldsValid()){
            await createNewTrip(emailAddress, date.value, country.value, Number(numPeople.value), desc.value)
            .then(status => {
                if (status === 200) navigation.navigate('Home');
                else toggleDialog();
            })
        }
        else toggleDialog();
    }

    const toggleDialog = () => {
        setDialogVisible(!dialogVisible);
    }

    const [dialogVisible, setDialogVisible] = useState(false);
    var Filter = require('bad-words');
    filter = new Filter();


    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={styles.page}>
                <HeaderBack>Create a trip</HeaderBack>
                <View style={styles.inputGroup}>
                    <View>
                        <SelectOneDate
                            title={null}
                            titleStyle={null}
                            label={"Select date*"}
                            labelStyle={styles.selectLabel}

                            isFlexible={false}
                            boxWidth={80 * vmin}

                            onSelectDate={(selectedDate) =>
                            setDate(date => updatedState(date, selectedDate))}
                        />

                        <Text style={styles.invalidMessage}>
                            {date.valid === false ? 'Invalid date.' : ''}
                        </Text>

                    </View>

                    <View>
                        <SelectOneCountry
                            title={null}
                            titleStyle={null}
                            label={"Select country*"}
                            labelStyle={styles.selectLabel}
                            boxWidth={80 * vmin}

                            onSelectCountry={(selectedCountry) =>
                            setCountry(country => updatedState(country, selectedCountry))}
                        />

                        <Text style={styles.invalidMessage}>
                            {country.valid === false ? 'Invalid country.' : ''}
                        </Text>
                    </View>

                    <View>
                        <TextInput style={styles.textInput} theme={themes.textInput}
                        mode='outlined' label="Number of participants*"
                        value={numPeople.value}
                        onChangeText={text => setNumPeople(people => updatedState(people, text))}
                        />

                        <Text style={styles.invalidMessage}>
                            {numPeople.valid === false ? 'Invalid number of participants.' : ''}
                        </Text>
                    </View>

                    <View>
                        <MultilineInput style={styles.multilineInput} theme={themes.textInput}
                        mode='outlined' label="Description"
                        placeholder="Describe the trip or anything else you want others to know"
                        value={desc.value}
                        //cleans out bad words with **
                        onChangeText={text => setDesc(desc =>
                            updatedState(desc, filter.clean(text))
                            )}
                        />

                        <Text style={styles.invalidMessage}>
                            {desc.valid === false ?
                            'The description contains harmful messages' : ''}
                        </Text>
                    </View>

                </View>
                <Button
                    mode='contained'
                    theme={themes.button}
                    style={styles.button}
                    onPress={() => createTrip()}
                >
                    Create a trip
                </Button>
                <View style={{position: 'fixed'}}>
                    <Modal
                        transparent={true}
                        isVisible={dialogVisible}
                        onBackdropPress={toggleDialog}
                    >
                        <Dialog title={"Error"} details={"An error occurred."}
                         buttonLabel={"OK"} onButtonPress={toggleDialog} />
                    </Modal>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    page: {
        marginTop: 5 * vh,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: palette.white
    },
    inputGroup: {
        gap: 2.5 * vh
    },
    textInput: {
        width: 80 * vmin,
        height: 12 * vmin,
        backgroundColor: palette.white
    },
    multilineInput: {
        width: 80 * vmin,
        height: 40 * vmin,
        backgroundColor: palette.white
    },
    button: {
        width: 70 * vmin,
        height: 14 * vmin,
        justifyContent: 'center',
        paddingBottom: 0.5 * vmin,
        marginTop: 5 * vh,
        marginBottom: 5 * vh
    },
    invalidMessage: {
        color: 'red',
        textAlign: 'left',
        flexWrap: 'wrap',
        width: 80 * vmin,
    },

    message: {
      marginTop: 1.5 * vh,
      alignSelf: "center",
      width: 85 * vmin,
      fontFamily: "Lato-Regular",
      fontSize: 3.8 * vmin,
      color: palette.grey,
    },
    selectLabel: {
        fontFamily: 'Lato-Bold',
        marginTop: 1 * vh,
        marginBottom: 0.5 * vh,
        color: palette.black,
    },
})