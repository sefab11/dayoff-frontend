import { View, Keyboard, TouchableWithoutFeedback } from "react-native";
import { Button, HeaderBack, MultilineInput, PasswordInput, TextInput } from "../components";
import { StyleSheet } from "react-native";
import { palette, themes } from "../style";

import { SelectDates, SelectCountries } from "../components";


export default EditTripScreen = ({ navigation }) => {
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={styles.page}>
                <HeaderBack>Edit trip</HeaderBack>
                <View style={styles.inputGroup}>
                    <SelectDates
                        title={null}
                        subtitle={"Select date"}
                        subtitleStyle={2}
                        isFlexible={false}
                        showLine={false}
                        multipleDates={false}
                        showBorder={true}
                        boxWidth={80 * vmin}
                        editable={false}
                        initialDates={['10 - 19 Oct']}
                    />
                    <SelectCountries
                        title={null}
                        subtitle={"Select country"}
                        subtitleStyle={2}
                        editable={false}
                        multipleCountries={false}
                        boxWidth={80 * vmin}
                        initialCountries={[{'code': 'NL', 'name': 'Netherlands'}]}
                    />

                    <TextInput style={styles.textInput} theme={themes.textInput} mode='outlined' label="Number of participants" />
                    <MultilineInput style={styles.multilineInput} theme={themes.textInput} mode='outlined' />
                </View>
                <Button
                    onPress={() => navigation.replace('Home')}
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
    }
})