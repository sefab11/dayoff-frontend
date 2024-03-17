import { View, Keyboard, TouchableWithoutFeedback } from "react-native";
import { Button, Dialog, HeaderBack, PasswordInput, TextInput } from "../components";
import { StyleSheet } from "react-native";
import { palette, themes } from "../style";
import { useState } from "react";
import Modal from "react-native-modal";
import UserService from "../services/UserService";
import { useSessionContext } from "../contexts/SessionContext";

const { loginUser } = UserService;

export default LoginScreen = ({ navigation }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const {setSessionToken} = useSessionContext();

    const [dialogVisible, setDialogVisible] = useState(false);

    const toggleDialog = () => {
        setDialogVisible(!dialogVisible);
    }

    const login = async () => {
        if(!(username && password)) {
            toggleDialog();
            return;
        }
        
        await loginUser(username, password)
        .then(data => {
            if(data && data.statusCode === 200 && data.sessionToken) {
                setSessionToken(data.sessionToken);

                //update the global email address
                global.emailAddress = username;

                navigation.navigate('Home');
            }
            else {
                toggleDialog();
            }
        });
    }

    return (<>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={styles.page}>
                <HeaderBack>Sign in</HeaderBack>
                <View style={styles.inputGroup}>
                    <TextInput value={username} onChangeText={text => setUsername(text)}
                    style={styles.textInput} theme={themes.textInput} mode='outlined'
                    label="Email Address" placeholder='name@workmail.com' />
                    <View>
                        <PasswordInput value={password} onChangeText={text => setPassword(text)}
                        style={styles.textInput} theme={themes.textInput} mode='outlined'
                        label="Password" />
                        <Button
                            // TODO: add in functionality to reset password
                            onPress={() => {}}
                            mode='text'
                            theme={themes.button}
                            style={styles.forgotButton}
                        >
                            Forgot your password?
                        </Button>
                    </View>
                    
                </View>
                <Button
                    onPress={async () => login()}
                    mode='contained'
                    theme={themes.button}
                    style={styles.button}
                    labelStyle={{ marginHorizontal: 0 }}
                >
                    Sign in
                </Button>
            </View>
        </TouchableWithoutFeedback>
        <View style={{position: "fixed"}}>
            <Modal
                transparent={true}
                isVisible={dialogVisible}
                onBackdropPress={toggleDialog}
            >
                <Dialog title={"Error"} details={"An error occurred."} buttonLabel={"OK"} onButtonPress={toggleDialog} />
            </Modal>
        </View>
    </>);
}

const styles = StyleSheet.create({
    page: {
        paddingTop: 3 * vh,
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