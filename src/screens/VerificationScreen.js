import { View, Keyboard, TouchableWithoutFeedback, TouchableOpacity, Text, ScrollView } from "react-native";
import { Button, Header, SegmentedInput, HeaderBack, Image } from "../components";
import { LinkedinInput, PhotoInput } from "../components";
import { StyleSheet } from "react-native";
import { React, useState } from "react";
import { palette, themes } from "../style";

export default VerificationScreen = ({ navigation }) => {
    //TODO: get user's email address from their details
    const email_address = 'name@workmail.com';


    //TODO: change value depending on whether the user has already added a linkedin and photo
    const [hasLinkedin, setLinkedin] = useState(false);
    const [hasPhoto, setPhoto] = useState(false);



    return (
        <TouchableWithoutFeedback>
                <View style={styles.page}>
                    <HeaderBack>Get Verified</HeaderBack>
                    <View style={styles.border} />

                    <ScrollView contentContainerStyle={styles.scroll} >
                    <TouchableWithoutFeedback>
                    <View>
                        <Text style={styles.message}>Our aim is to provide a safe space for everyone.</Text>

                        <View style={styles.section}>
                            <Text style={styles.title}>1. Enter Verification Code*</Text>
                            <SegmentedInput
                                length={5}
                                style={styles.segmentedInput}
                                segmentStyle={styles.segment}
                                theme={themes.textInput}
                                mode='outlined'
                                label={'We’ve sent a verification code to ' + email_address}
                                labelStyle={styles.message}
                                keyboardType='numeric'
                            />
                            <TouchableOpacity
                                style={styles.resendContainer}
                                //TODO: call otp function on press
                                onPress={() => console.log("TBA otp on press")}
                            >
                                <Text style={styles.resendText}>Resend Verification Code</Text>
                            </TouchableOpacity>
                        </View>

                        {
                        !hasLinkedin ?
                        <>
                        <View style={styles.border} />

                        <View style={styles.section}>
                            <Text style={styles.title}>2. Add LinkedIn Profile*</Text>
                            <LinkedinInput horMargin={10} verMargin={5} />
                        </View>
                        </>
                        : null
                        }

                        {
                        !hasPhoto ?
                        <>
                        <View style={styles.border} />

                        <View style={styles.section} borderBottomWidth={0}>
                            <Text style={styles.title}>3. Add Profile Photo*</Text>
                            <PhotoInput width={12 * vh} camRatio={'40%'}/>
                        </View>
                        </>
                        : null
                        }
                    </View>
                    </TouchableWithoutFeedback>
                    </ScrollView>

                    <View style={styles.buttonGroup}>
                        <Button
                            mode="container"
                            theme={themes.button}
                            style={styles.button}
                            onPress={() => navigation.replace('Chat')}
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
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: palette.white
    },
    message: {
        alignSelf: 'flex-start',
        width: 85 * vmin,
        fontFamily: 'Lato-Regular',
        fontSize: 3.6 * vmin,
        color: palette.grey,
    },


    segmentedInput: {
        width: 80 * vmin,
    },
    segment: {
        height: 17 * vmin,
        backgroundColor: palette.white,
        fontSize: 5 * vmin,
    },

    resendContainer: {
        width: "100%",
        paddingTop: 10,
    },
    resendText: {
        color: palette.purple,
        fontWeight: 'bold',
    },

    scroll: {
        display: 'flex',
        paddingBottom: 4 * vh,
    },

    section: {
        width: "100%",

        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',

        paddingTop: 20,
        paddingBottom: 20,
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
      alignSelf: "center",
      width: 85 * vmin,
      fontFamily: "Lato-Regular",
      fontSize: 4.5 * vmin,
      fontWeight: "700",
      color: "#000000",
    },


    buttonGroup: {
        gap: 2 * vmin,
        margin: 10,
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
})