import { View, Keyboard, TouchableWithoutFeedback, TouchableOpacity, Text } from "react-native";
import {React, useState} from "react";
import Modal from "react-native-modal";
import { Button, HeaderBack, PasswordInput, TextInput, EmailModal, Dialog } from "../components";
import { StyleSheet } from "react-native";
import { palette, themes } from "../style";
import { registerUser } from "../services/UserService";
import { isNameValid, isPasswordValid } from "../services/ValidationService";


export default RegisterScreen = ({ navigation }) => {
    //TODO: for release, turn 'required' values to true for required field
    const [name, setName] = useState({
        'value': '',
        'valid': null,
        'required': false //true,
    });
    const [email, setEmail] = useState({
        'value': '',
        'required': false //true,
    });
    const [password, setPassword] = useState({
        'value': '',
        'valid': null,
        'required': false //true,
    });
    const [confPassword, setConfPassword] = useState({
        'value': '',
        'valid': null,
        'required': false //true,
    });

    const doPasswordsMatch = () => password.value == confPassword.value;


    function areInputsValid(){
        //if name valid
        name.valid = isNameValid(name.value);
        //if password meets requirements
        password.valid = isPasswordValid(password.value);
        //if passwords match or not
        confPassword.valid = doPasswordsMatch();

        //for testing
        console.log(email);

        return (
           (name.valid         || !name.required)
        && (!email.required)
        && (password.valid     || !password.required)
        && (confPassword.valid || !confPassword.required)
        );
    }

    const updatedState = (stateDict, newVal) => {
        return Object.assign({}, stateDict, {'value': newVal});
    }

    const register = async () => {
        if (areInputsValid()) {
            //TODO: remove this navigation here for release
            //navigation.navigate("VerifyEmail");

            await registerUser(name.value, email.value, password.value)
            .then(status => {
                if(status === 200) {
                    //update global email address
                    global.emailAddress = name.value;

                    navigation.navigate('VerifyEmail');
                }
                else {
                    toggleDialog();
                }
            });
        }
        else toggleDialog();
    }

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    }

    const toggleDialog = () => {
        setDialogVisible(!dialogVisible);
    }

    const [isModalVisible, setModalVisible] = useState(false);
    const [dialogVisible, setDialogVisible] = useState(false);


    return (<>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={styles.page}>
                <HeaderBack>Register</HeaderBack>
                <View style={styles.inputGroup}>
                    <View>
                        <TextInput style={styles.textInput} theme={themes.textInput}
                        mode='outlined' label="Full name*" placeholder='John Doe'
                        value={name.value}
                        //merge name object with new object/dict with 'value': text
                        //set name to merged object
                        onChangeText={text => setName(name => updatedState(name, text))}
                        />

                        <Text style={styles.invalidMessage}>
                            {name.valid === false ? 'Invalid username' : ''}
                        </Text>

                    </View>

                    <View>
                        <View>
                            <TextInput style={styles.textInput} theme={themes.textInput}
                            mode='outlined' label="Email Address*" placeholder='name@workmail.com'
                            value={email.value}
                            onChangeText={text => setEmail(email => updatedState(email, text))}
                            />

                            <Text style={styles.invalidMessage}>
                                {email.valid === false ? 'This email is invalid.' : ''}
                            </Text>

                        </View>
                    </View>

                    <View>
                        <PasswordInput style={styles.textInput} theme={themes.textInput}
                        mode='outlined' label="Password*"
                        value={password.value}
                        onChangeText={text => setPassword(password => updatedState(password, text))}
                        />

                        <Text style={styles.invalidMessage}>
                            {password.valid === false ?
                            'Invalid password. Requires 8 characters and 1 number.' : ''}
                        </Text>

                    </View>

                    <View>
                        <PasswordInput style={styles.textInput} theme={themes.textInput}
                        mode='outlined' label="Repeat password*"
                        value={confPassword.value}
                        onChangeText={text => setConfPassword(conf => updatedState(conf, text))}
                        />

                        <Text style={styles.invalidMessage}>
                            {confPassword.valid === false ? 'Passwords do not match' : ''}
                        </Text>

                    </View>


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
        <View style={{position: "fixed"}}>
            <Modal
                transparent={true}
                isVisible={dialogVisible}
                onBackdropPress={toggleDialog}
            >
                <Dialog title={"Error"} details={"An error occurred."}
                 buttonLabel={"OK"} onButtonPress={toggleDialog} />
            </Modal>
        </View>
    </>);
}

const styles = StyleSheet.create({
    page: {
        paddingTop: 6 * vh,
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
        backgroundColor: palette.white,
    },
    linkText: {
        marginTop: 2,
        marginBottom: 0,
        color: palette.purple,
        fontWeight: 'bold',
    },
    modalView: {
        backgroundColor: palette.white,
    },
    button: {
        width: 80 * vmin,
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
});