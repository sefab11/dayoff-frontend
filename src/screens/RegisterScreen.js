import { View, Keyboard, TouchableWithoutFeedback } from "react-native";
import { Button, HeaderBack, PasswordInput, TextInput } from "../components";
import { StyleSheet } from "react-native";
import { palette, themes } from "../style";

export default RegisterScreen = ({ navigation }) => {
    const register = async () => {
        await fetch('https://kfp4azjcdschizn5hzklvqsr3u0faknn.lambda-url.eu-west-1.on.aws/putData?user_name=Bruno Romanski&email_id=romanskibruno@gmail.com&password_hash=password123', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            console.log(response);
        })
        navigation.replace('Verification');
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={styles.page}>
                <HeaderBack>Register</HeaderBack>
                <View style={styles.inputGroup}>
                    <TextInput style={styles.textInput} theme={themes.textInput} mode='outlined' label="Full name" placeholder='John Doe'/>
                    <TextInput style={styles.textInput} theme={themes.textInput} mode='outlined' label="Work email" placeholder='name@workmail.com'/>
                    <PasswordInput style={styles.textInput} theme={themes.textInput} mode='outlined' label="Password" />
                    <PasswordInput style={styles.textInput} theme={themes.textInput} mode='outlined' label="Repeat password" />
                </View>
                <Button
                    onPress={async () => register()}
                    mode='contained'
                    theme={themes.button}
                    style={styles.button}
                >
                    Create account
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
    button: {
        width: 70 * vmin,
        height: 14 * vmin,
        justifyContent: 'center',
        paddingBottom: 0.5 * vmin,
        marginTop: 5 * vh,
        marginBottom: 5 * vh
    }
})