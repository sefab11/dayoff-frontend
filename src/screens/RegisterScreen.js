import { View, Keyboard, TouchableWithoutFeedback, TouchableOpacity, Text } from "react-native";
import {React, useState} from "react";
import Modal from "react-native-modal";
import { Button, HeaderBack, PasswordInput, TextInput, EmailModal, Dialog } from "../components";
import { StyleSheet } from "react-native";
import { palette, themes } from "../style";
import UserService from "../services/UserService";
import { RegisterValidationService } from "../services/ValidationService";

const { registerUser } = UserService;
const { isNameValid, isEmailValid, isPasswordValid } = RegisterValidationService;

export default RegisterScreen = ({ navigation }) => {
    const [name, setName] = useState({
        'value': '',
        'valid': null,
        'required': true,
    });
    const [email, setEmail] = useState({
        'value': '',
        'valid': null,
        'required': true,
    });
    const [password, setPassword] = useState({
        'value': '',
        'valid': null,
        'required': true,
    });
    const [confPassword, setConfPassword] = useState({
        'value': '',
        'valid': null,
        'required': true,
    });

    const doPasswordsMatch = () => password.value == confPassword.value;


    function areInputsValid(){
        //if name valid
        var nameValid = isNameValid(name.value);
        name.valid = nameValid;
        //if email valid
        var emailValid = isEmailValid(email.value);
        email.valid = emailValid;
        //if password meets requirements
        var passwordValid = isPasswordValid(password.value);
        password.valid = passwordValid;
        //if passwords match or not
        var passwordsMatch = doPasswordsMatch();
        confPassword.valid = passwordsMatch;

        //for testing
        console.log(name);
        console.log(email);
        console.log(password);
        console.log(confPassword);

        return (
           (name.valid         || !name.required)
        && (email.valid        || !email.required)
        && (password.valid     || !password.required)
        && (confPassword.valid || !confPassword.required)
        );
    }

    const register = async () => {
        if (areInputsValid()) {
            //TODO: remove this navigation here for release
            navigation.navigate("FinishProfile");

            await registerUser(name.value, email.value, password.value)
            .then(status => {
                if(status === 200) {
                    navigation.navigate('FinishProfile');
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
                        onChangeText={text => setName(name =>
                            Object.assign({}, name, {'value': text}))
                        }
                        />

                        <Text style={styles.invalidMessage}>
                            {name.valid || name.valid == null
                            ? ''
                            : 'Invalid username.'
                            }
                        </Text>

                    </View>

                    <View>
                        <View>
                            <TextInput style={styles.textInput} theme={themes.textInput}
                            mode='outlined' label="Work email*" placeholder='name@workmail.com'
                            value={email.value}
                            onChangeText={text => setEmail(email =>
                                Object.assign({}, email, {'value': text}))
                            }
                            />

                            <TouchableOpacity onPress={() => toggleModal()}>
                                <Text style={styles.linkText}>Don’t have a work email?</Text>
                            </TouchableOpacity>

                            <Text style={styles.invalidMessage}>
                                {email.valid || email.valid == null
                                ? ''
                                : 'This email is already in use or invalid.'
                                }
                            </Text>

                        </View>
                    </View>

                    <View>
                        <PasswordInput style={styles.textInput} theme={themes.textInput}
                        mode='outlined' label="Password*"
                        value={password.value}
                        onChangeText={text => setPassword(password =>
                            Object.assign({}, password, {'value': text}))
                        }
                        />

                        <Text style={styles.invalidMessage}>
                            {password.valid || password.valid == null
                            ? ''
                            : 'Invalid password. Requires 8 characters and 1 number.'
                            }
                        </Text>

                    </View>

                    <View>
                        <PasswordInput style={styles.textInput} theme={themes.textInput}
                        mode='outlined' label="Repeat password*"
                        value={confPassword.value}
                        onChangeText={text => setConfPassword(confPassword =>
                            Object.assign({}, confPassword, {'value': text}))
                        }
                        />

                        <Text style={styles.invalidMessage}>
                            {confPassword.valid || confPassword.valid == null
                            ? ''
                            : 'Passwords do not match'
                            }
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
                animationType="slide"
                transparent={true}
                isVisible={isModalVisible}
                onBackdropPress={toggleModal}
            >
                <EmailModal exitFunc={toggleModal}/>
            </Modal>
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