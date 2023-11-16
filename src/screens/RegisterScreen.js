import { View, Text } from "react-native";
import { Button, HeaderBack, TextInput } from "../components";
import { StyleSheet } from "react-native";
import { themes } from "../style";

export default RegisterScreen = ({ navigation }) => {
    return (
        <View style={styles.page}>
            <HeaderBack>Register</HeaderBack>
            <TextInput style={styles.textInput} mode='outlined' label="Full name" placeholder='John Doe'/>
            <TextInput style={styles.textInput} mode='outlined' label="Work email" placeholder='name@workmail.com'/>
            <Button
                onPress={() => {}}
                mode='contained'
                theme={themes.button}
                style={styles.button}
            >
                Create account
            </Button>
        </View>
    );
}

const styles = StyleSheet.create({
    page: {
        marginTop: 5 * vh,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    textInput: {
        width: 70 * vmin
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