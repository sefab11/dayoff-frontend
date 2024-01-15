import { View, Keyboard, TouchableWithoutFeedback, TouchableOpacity, Text } from "react-native";
import {React, useState} from "react";
import Modal from "react-native-modal";
import { Button, HeaderBack, PasswordInput, TextInput, EmailModal } from "../components";
import { StyleSheet } from "react-native";
import { palette, themes } from "../style";

export default RegisterScreen = ({ navigation }) => {
    /*
        the valid elements need to be states so that the text elements
        ( for invalid messages ) are updated in the component
        the 0th index is the state, the 1st index is the setState
        the state can be changed without the setState BUT needs the setState to update
        where its used in the component

        the values also need to be states as they're passed to the text/password inputs

        the required elements DONT need to be states as theyre constants
    */
    /*TODO: 'required' values are FALSE to be able to run through the app quickly
        when releasing/ testing the input validation change the 'required' values to TRUE
    */
    const [inputs, setInputs] = useState([
        {'value': useState(''), 'required': false, 'valid': useState(null)},
        {'value': useState(''), 'required': false, 'valid': useState(null)},
        {'value': useState(''), 'required': false, 'valid': useState(null)},
        {'value': useState(''), 'required': false, 'valid': useState(null)},
    ]);

    //test setting 'valid' element to a state
    //test if using setState updates the text elements

    function areInputsValid(){
        //if name valid
        var nameValid = isNameValid();
        inputs[0]['valid'][0] = nameValid;
        inputs[0]['valid'][1](nameValid);

        //if email valid
        var emailValid = isEmailValid();
        inputs[1]['valid'][0] = emailValid;
        inputs[1]['valid'][1](emailValid);

        //if password meets requirements
        var passwordValid = isPasswordValid();
        inputs[2]['valid'][0] = passwordValid;
        inputs[2]['valid'][1](passwordValid);

        //if passwords match or not
        var passwordsMatch = doPasswordsMatch();
        inputs[3]['valid'][0] = passwordsMatch;
        inputs[3]['valid'][1](passwordsMatch);

        console.log(inputs);

        return (
           (inputs[0]['valid'][0] || !inputs[0]['required'])
        && (inputs[1]['valid'][0] || !inputs[1]['required'])
        && (inputs[2]['valid'][0] || !inputs[2]['required'])
        && (inputs[3]['valid'][0] || !inputs[3]['required'])
        );
    }

    function updateInput(index, text){
        inputs[index]['value'][0] = text;
        inputs[index]['value'][1](text);
    }

    /*TODO: verification to check if name is valid? e.g. have a space, first name
        + last name? etc, if not just return true/ is username in use? if using usernames
        instead of real names
    */
    function isNameValid(){
        return inputs[0]['value'][0] != '';
    }

    //TODO: method to validate work email by checking the database
    function isEmailValid(){
        return inputs[1]['value'][0] != '';
    }

    function doPasswordsMatch(){
        return inputs[2]['value'][0] == inputs[3]['value'][0];
    }

    function isPasswordValid(){
        const password = inputs[2]['value'][0];
        //check if password has at least 8 characters and 1 number
        if (password.length < 8) return false;
        else if (!hasNumber(password)) return false;

        return true;
    }

    function hasNumber(myString) {
        return /\d/.test(myString);
    }

    const register = async () => {
        // await fetch('https://kfp4azjcdschizn5hzklvqsr3u0faknn.lambda-url.eu-west-1.on.aws/putData?user_name=Bruno Romanski&email_id=romanskibruno@gmail.com&password_hash=password123', {
        //     method: 'GET',
        //     headers: {
        //         'Accept': 'application/json',
        //         'Content-Type': 'application/json'
        //     }
        // })
        // .then(response => {
        //     console.log(response);
        // })


        if (areInputsValid()) navigation.navigate('FinishProfile');
        else console.log('some inputs are invalid');
    }

    const [isModalVisible, setModalVisible] = useState(false);

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    }


    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={styles.page}>
                <HeaderBack>Register</HeaderBack>
                <View style={styles.inputGroup}>
                    <View>
                        <TextInput style={styles.textInput} theme={themes.textInput}
                        mode='outlined' label="Full name*" placeholder='John Doe'
                        value={inputs[0]['value']} onChangeText={text => updateInput(0, text)} />
                        <Text style={styles.invalidMessage}>
                            {inputs[0]['valid'][0] || inputs[0]['valid'][0] == null
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
                                {inputs[1]['valid'][0] || inputs[1]['valid'][0] == null
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
                            {inputs[2]['valid'][0] || inputs[2]['valid'][0] == null
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
                            {inputs[3]['valid'][0] || inputs[3]['valid'][0] == null
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
            <Modal
                animationType="slide"
                transparent={true}
                isVisible={isModalVisible}
                onBackdropPress={toggleModal}
            >
                <EmailModal exitFunc={toggleModal}/>
            </Modal>
            </View>
        </TouchableWithoutFeedback>
    );
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
})