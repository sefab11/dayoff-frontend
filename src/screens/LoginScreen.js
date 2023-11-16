import { View, Keyboard, TouchableWithoutFeedback } from "react-native";
import { Button, HeaderBack, PasswordInput, TextInput } from "../components";
import { StyleSheet } from "react-native";
import { palette, themes } from "../style";

export default LoginScreen = ({ navigation }) => {
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={styles.page}>
                <HeaderBack>Sign in</HeaderBack>
                <View style={styles.inputGroup}>
                    <TextInput style={styles.textInput} theme={themes.textInput} mode='outlined' label="Work email" placeholder='name@workmail.com'/>
                    <View>
                        <PasswordInput style={styles.textInput} theme={themes.textInput} mode='outlined' label="Password" />
                        <Button
                            onPress={() => {}}
                            mode='text'
                            theme={themes.button}
                            style={styles.forgotButton}
                        >
                            Forgot your password?
                        </Button>
                        <Button
                            onPress={() => navigation.navigate('profile')}
                            mode='text'
                            theme={themes.button}
                            style={styles.forgotButton}
                        >
                            TEST
                        </Button>
                    </View>
                    
                </View>
                <Button
                    onPress={() => {}}
                    mode='contained'
                    theme={themes.button}
                    style={styles.button}
                    labelStyle={{ marginHorizontal: 0 }}
                >
                    Sign in
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