import { View, Keyboard, TouchableWithoutFeedback, TouchableOpacity, Text, ScrollView } from "react-native";
import { Button, Header, SegmentedInput, HeaderBack, Image } from "../components";
import { StyleSheet } from "react-native";
import { React, useState, useEffect } from "react";
import { palette, themes } from "../style";


import UserService from "../services/UserService";
const { sendOtp, verifyOtp } = UserService;


export default VerifyEmailScreen = ({ navigation }) => {
    const [code, setCode] = useState('');

    const updatedState = (stateDict, newVal) => {
        return Object.assign({}, stateDict, {'value': newVal});
    }

    async function verify(){
        await verifyOtp(global.currentUser.email_id, code.value)
        .then(status => {
            if (status === 200) navigation.navigate('FinishProfile');
        })
    }

    useEffect(() => {
        sendOtp(global.currentUser.email_id, global.currentUser.user_name);
    }, [])

    return (
        <TouchableWithoutFeedback>
                <View style={styles.page}>
                    <HeaderBack>Verify Email</HeaderBack>
                    <Text style={styles.message}>We’ve sent a verification code to  {global.currentUser.email_id}</Text>

                    <View style={styles.section}>
                        <SegmentedInput
                            length={6}
                            style={styles.segmentedInput}
                            segmentStyle={styles.segment}
                            theme={themes.textInput}
                            mode='outlined'
                            label={'Enter code'}
                            labelStyle={styles.title}
                            keyboardType='numeric'
                            onCodeChange={(data) => setCode(code => code + data)}
                        />
                    </View>

                    <View style={styles.resendContainer}>
                        <TouchableOpacity
                            onPress={() => sendOtp(global.currentUser.email_id, global.currentUser.user_name)}
                        >
                            <Text style={styles.resendText}>
                                Resend Verification Code
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.buttonGroup}>
                        <Button
                            mode="container"
                            theme={themes.button}
                            style={styles.button}
                            onPress={() => verify()}
                        >
                            <Text style={styles.buttonText}>Verify Account</Text>
                        </Button>
                    </View>
                </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    page: {
        paddingTop: 3 * vh,
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        gap: 2.5 * vh,
        alignItems: 'stretch',
        justifyContent: 'flex-start',
        backgroundColor: palette.white,
    },
    message: {
        alignSelf: 'center',
        width: 85 * vmin,
        fontFamily: 'Lato-Regular',
        fontSize: 3.6 * vmin,
        color: palette.grey,
    },


    segmentedInput: {
        width: 85 * vmin,
        alignItems: 'flex-start',
    },
    segment: {
        height: 17 * vmin,
        marginHorizontal: 1,
        backgroundColor: palette.white,
        fontSize: 7 * vmin,
        textAlign: 'left',
        textAlignVertical: 'center',
    },

    resendContainer: {
        width: "100%",
        alignItems: 'center',
        marginTop: 'auto',
        marginBottom: 2 * vh,
    },
    resendText: {
        color: palette.purple,
        fontWeight: 'bold',
        fontSize: 4.2 * vmin,
    },

    scroll: {
        display: 'flex',
        paddingBottom: 4 * vh,
    },

    section: {
        width: "100%",

        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        alignSelf: 'center',

        marginTop: 'auto',
        marginBottom: 'auto',
    },
    border: {
        width: 85 * vmin,
        paddingTop:5,
        paddingBottom:15,
        borderBottomWidth:1,
        borderBottomColor:'#D7D7D7',
    },
    title: {
      marginTop: 3 * vh,
      paddingBottom: 20,
      width: 85 * vmin,
      fontFamily: "Lato-Regular",
      fontSize: 4.5 * vmin,
      fontWeight: "700",
      color: "#000000",
    },


    buttonGroup: {
        gap: 2 * vmin,
        margin: 10,
        alignItems: 'center',
        marginBottom: 5 * vh,
    },
    button: {
        width: 80 * vmin,
        height: 14 * vmin,
        justifyContent: 'center',
        paddingBottom: 0.5 * vmin,
        backgroundColor: palette.purple,
    },
    buttonText: {
        color: palette.white,
    },

    invalidMessage: {
        color: 'red',
        textAlign: 'left',
        flexWrap: 'wrap',
        width: 85 * vmin,
    },
})