import { View, Keyboard, TouchableWithoutFeedback, TouchableOpacity, Text } from "react-native";
import {React, useState} from "react";
import Modal from "react-native-modal";
import { Button, HeaderBack, PasswordInput, TextInput, EmailModal, Dialog } from "../components";
import { StyleSheet } from "react-native";
import { palette, themes } from "../style";
import UserService from "../services/UserService";

const { registerUser } = UserService;

export default RegisterScreen = ({ navigation }) => {
    function generateInputs(numInputs){
        var arr = [];
        /*
            valid elements and value elements need to be states so that they
            are updated in the component.
            required values don't need to be states as they are constants.
        */
        /*TODO: 'required' values are FALSE to be able to run through the app quickly
            when releasing/ testing the input validation change the 'required' values to TRUE
        */
        for (let i = 0; i < numInputs; i++){
            var [value, setValue] = useState('');
            var [valid, setValid] = useState(null);
            var required = false;
            var newInput = {
                'value': value, 'setValue': setValue,
                'valid': valid, 'setValid': setValid,
                'required': required
            }
            arr.push(newInput);
        }
        return arr;
    }

    //TODO: replace function with proper validation of data
    function isNameValid() { return inputs[0]['value'] != ''; }
    //TODO: replace function with validation of email with database
    function isEmailValid() { return inputs[1]['value'] != ''; }

    function isPasswordValid(){
        const password = inputs[2]['value'];
        //check if password has at least 8 characters and 1 number
        if (password.length < 8) return false;
        else if (!hasNumber(password)) return false;

        return true;
    }

    function doPasswordsMatch() { return inputs[2]['value'] == inputs[3]['value']; }
    function hasNumber(myString) { return /\d/.test(myString); }


    function areInputsValid(){
        //if name valid
        var nameValid = isNameValid();
        inputs[0]['valid'] = nameValid;
        inputs[0]['setValid'](nameValid);
        //if email valid
        var emailValid = isPasswordValid();
        inputs[1]['valid'] = emailValid
        inputs[1]['setValid'](emailValid);
        //if password meets requirements
        var passwordValid = isPasswordValid();
        inputs[2]['valid'] = passwordValid;
        inputs[2]['setValid'](passwordValid);
        //if passwords match or not
        var passwordsMatch = doPasswordsMatch();
        inputs[3]['valid'] = passwordsMatch;
        inputs[3]['setValid'](passwordsMatch);

        //for testing
        console.log(inputs);

        return (
           (inputs[0]['valid'] || !inputs[0]['required'])
        && (inputs[1]['valid'] || !inputs[1]['required'])
        && (inputs[2]['valid'] || !inputs[2]['required'])
        && (inputs[3]['valid'] || !inputs[3]['required'])
        );
    }

    function updateInput(index, text){
        inputs[index]['value'] = text;
        inputs[index]['setValue'](text);
    }

    const [dialogVisible, setDialogVisible] = useState(false);

    const toggleDialog = () => {
        setDialogVisible(!dialogVisible);
    }

    const register = async () => {
        if (areInputsValid()) {
            //TODO: remove this navigation here for release
            navigation.navigate("FinishProfile");

            await registerUser(inputs[0], inputs[1], inputs[2])
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

    const [inputs, setInputs] = useState(generateInputs(4));
    const [isModalVisible, setModalVisible] = useState(false);


    const [fieldEntered, setFieldsEntered] = useState([false, false, false, false]);

    return (<>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={styles.page}>
                <HeaderBack>Register</HeaderBack>
                <View style={styles.inputGroup}>
                    <View>
                        <TextInput style={styles.textInput} theme={themes.textInput}
                        mode='outlined' label="Full name*" placeholder='John Doe'
                        value={inputs[0]['value']} onChangeText={text => updateInput(0, text)} />
                        <Text style={styles.invalidMessage}>
                            {inputs[0]['valid'] || inputs[0]['valid'] == null
                            ? ''
                            : 'Invalid username.'
                            }
                        </Text>
                    </View>

                    <View>
                        <View>
                            <TextInput style={styles.textInput} theme={themes.textInput}
                            mode='outlined' label="Work email*" placeholder='name@workmail.com'
                            value={inputs[1]['value']} onChangeText={text => updateInput(1, text)} />
                            <TouchableOpacity onPress={() => toggleModal()}>
                                <Text style={styles.linkText}>Don’t have a work email?</Text>
                            </TouchableOpacity>
                            <Text style={styles.invalidMessage}>
                                {inputs[1]['valid'] || inputs[1]['valid'] == null
                                ? ''
                                : 'This email is already in use or invalid.'
                                }
                            </Text>
                        </View>
                    </View>

                    <View>
                        <PasswordInput style={styles.textInput} theme={themes.textInput}
                        mode='outlined' label="Password*"
                        value={inputs[2]['value']} onChangeText={text => updateInput(2, text)} />
                        <Text style={styles.invalidMessage}>
                            {inputs[2]['valid'] || inputs[2]['valid'] == null
                            ? ''
                            : 'Invalid password. Requires 8 characters and 1 number.'
                            }
                        </Text>
                    </View>

                    <View>
                        <PasswordInput style={styles.textInput} theme={themes.textInput}
                        mode='outlined' label="Repeat password*"
                        value={inputs[3]['value']} onChangeText={text => updateInput(3, text)} />
                        <Text style={styles.invalidMessage}>
                            {inputs[3]['valid'] || inputs[3]['valid'] == null
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
                <Dialog title={"Error"} details={"An error occurred."} buttonLabel={"OK"} onButtonPress={toggleDialog} />
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