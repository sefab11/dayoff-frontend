import { View, Keyboard, TouchableWithoutFeedback, TouchableOpacity, Text } from "react-native";
import {React, useState} from "react";
import Modal from "react-native-modal";
import { Button, HeaderBack, PasswordInput, TextInput, EmailModal, Dialog } from "../components";
import { StyleSheet } from "react-native";
import { palette, themes } from "../style";
import UserService from "../services/UserService";

const { registerUser } = UserService;

export default RegisterScreen = ({ navigation }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmedPassword] = useState("");

    const register = async () => {
        if(!(name && email && password && confirmPassword && password === confirmPassword))
            return;

        console.log(name, email, password, confirmPassword)

        await registerUser(name, email, password)
        .then(status => {
            console.log(status);
            if(status === 200) {
                navigation.navigate('FinishProfile');
            }
        });
    }

    const [isModalVisible, setModalVisible] = useState(false);

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    }

    const [fieldEntered, setFieldsEntered] = useState([false, false, false, false]);

    return (<>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={styles.page}>
                <HeaderBack>Register</HeaderBack>
                <View style={styles.inputGroup}>
                    <TextInput value={name} onChangeText={text => setName(text)} style={styles.textInput} theme={themes.textInput} mode='outlined' label="Full name*" placeholder='John Doe'/>
                    <View>
                        <TextInput value={email} onChangeText={text => setEmail(text)} style={styles.textInput} theme={themes.textInput} mode='outlined' label="Work email*" placeholder='name@workmail.com'/>
                        <TouchableOpacity onPress={() => toggleModal()}>
                            <Text style={styles.linkText}>Don’t have a work email?</Text>
                        </TouchableOpacity>
                    </View>
                    <PasswordInput value={password} onChangeText={text => setPassword(text)} style={styles.textInput} theme={themes.textInput} mode='outlined' label="Password*" />
                    <PasswordInput value={confirmPassword} onChangeText={text => setConfirmedPassword(text)} style={styles.textInput} theme={themes.textInput} mode='outlined' label="Repeat password*" />
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
        width: 70 * vmin,
        height: 14 * vmin,
        justifyContent: 'center',
        paddingBottom: 0.5 * vmin,
        marginTop: 5 * vh,
        marginBottom: 5 * vh
    }
})