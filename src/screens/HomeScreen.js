import { View, Text, Keyboard, TouchableWithoutFeedback } from "react-native";
import { Button, TripView } from "../components";
import { StyleSheet } from "react-native";
import { palette, themes } from "../style";

export default HomeScreen = ({ navigation }) => {
    return (
        <View style={styles.page}>
            <TripView />
        </View>
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
    forgotButton: {
        alignSelf: 'flex-end',
        margin: 0, padding: 0, borderWidth: 0, borderRadius: 0,
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