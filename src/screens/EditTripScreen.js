import { View, Keyboard, TouchableWithoutFeedback } from "react-native";
import { Button, HeaderBack, MultilineInput, PasswordInput, TextInput } from "../components";
import { StyleSheet } from "react-native";
import { palette, themes } from "../style";
import { useState } from "react";

import { ShowSelectedDate, SelectCountries } from "../components";


export default EditTripScreen = ({ route, navigation }) => {
    const { date, country } = route.params;

    //enables editable people and description in the sub components
    const [numPeople, setNumPeople] = useState(route.params.numPeople);
    const [description, setDescription] = useState(route.params.description);

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={styles.page}>
                <HeaderBack>Edit trip</HeaderBack>
                <View style={styles.inputGroup}>

                    <ShowSelectedDate
                        title={null}
                        titleStyle={null}
                        label={"Select date"}
                        labelStyle={styles.selectLabel}

                        boxWidth={80 * vmin}
                        initialDates={[date]}
                    />

                    <SelectCountries
                        title={null}
                        subtitle={"Select country"}
                        subtitleStyle={2}
                        editable={false}
                        multipleCountries={false}
                        boxWidth={80 * vmin}
                        initialCountries={[country]}
                    />

                    {/*TODO: return changed data to UserCreatedTripView?*/}
                    <TextInput style={styles.textInput} theme={themes.textInput}
                    mode='outlined' label="Number of participants"
                    value={numPeople.toString()} onChangeText={text => setNumPeople(Number(text))} />

                    <MultilineInput style={styles.multilineInput} theme={themes.textInput}
                    mode='outlined'
                    value={description} onChangeText={text => setDescription(text)} />

                </View>
                <Button
                    onPress={() => navigation.navigate('Home')}
                    mode='contained'
                    theme={themes.button}
                    style={styles.button}
                >
                    Create a trip
                </Button>
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
        gap: 3.5 * vh
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
        marginBottom: 0.5 * vh
    }
})