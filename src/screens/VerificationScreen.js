import { View, Keyboard, TouchableWithoutFeedback, TouchableOpacity, Text, ScrollView } from "react-native";
import { Button, Header, SegmentedInput, HeaderBack, Image } from "../components";
import { StyleSheet } from "react-native";
import { palette, themes } from "../style";

export default VerificationScreen = ({ navigation }) => {
    return (
        <TouchableWithoutFeedback>
                <View style={styles.page}>
                    <HeaderBack>Get Verified</HeaderBack>
                    <View style={styles.border} />
                    <Text style={styles.message}>Our aim is to provide a safe space for everyone.</Text>


                    <ScrollView contentContainerStyle={styles.scroll} scrollEnabled={true}>
                        <View style={styles.section}>
                            <Text style={styles.title}>1. Enter Verification Code*</Text>

                            <SegmentedInput
                                length={5}
                                style={styles.segmentedInput}
                                segmentStyle={styles.segment}
                                theme={themes.textInput}
                                mode='outlined'
                                label='Enter code'
                                keyboardType='numeric'
                            />
                            <Button
                                //TODO: call otp function on press
                                onPress={() => console.log("TBA func call on press")}
                                mode='text'
                                theme={themes.button}
                                style={styles.button}
                            >
                                Resend verification code
                            </Button>
                        </View>
                        <View style={styles.border} />

                        <View style={styles.section}>
                            <Text style={styles.title}>2. Add LinkedIn Profile*</Text>
                            <TouchableOpacity
                                style={styles.connectContainer}
                                //TODO: function call to connect to linkedin
                                onPress={() => console.log("TBA func call on press")}
                            >
                                <Image
                                    source={require("../../assets/icons/linkedin.png")}
                                    tintColor={palette.linkedinBlue}
                                />
                                <View paddingRight={20}>
                                    <Text style={styles.connectText}>Connect your Linkedin</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.border} />

                        <View style={styles.section} borderBottomWidth={0}>
                            <Text style={styles.title}>3. Add Profile Photo*</Text>

                            <TouchableOpacity
                                style={styles.photoContainer}
                                //TODO: function call to add photo
                                onPress={() => console.log("TBA func call on press")}
                            >
                                <Image
                                    source={require("../../assets/icons/camera.png")}
                                    tintColor={palette.purple}
                                />
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                    <Button
                        mode="container"
                        theme={themes.button}
                        style={styles.button}
                        onPress={() => navigation.replace('Chat')}
                    >
                        Verify Account
                    </Button>
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
        marginTop: 3 * vh,
        alignSelf: 'center',
        width: 85 * vmin,
        fontFamily: 'Lato-Regular',
        fontSize: 3.8 * vmin,
        color: palette.grey
    },
    segmentedInput: {
        width: 80 * vmin
    },
    segment: {
        height: 17 * vmin,
        backgroundColor: palette.white,
        fontSize: 5 * vmin
    },

    scroll: {
        paddingBottom: 50 * vh,
    },

    section: {
        width: "90%",
        padding: 25,

        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
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
      alignSelf: "center",
      width: 85 * vmin,
      fontFamily: "Lato-Regular",
      fontSize: 4.5 * vmin,
      fontWeight: "700",
      color: "#000000",
    },

    connectContainer: {
        display: 'flex',
        flexDirection: 'row',
        borderRadius: 5,
        borderWidth: 2,
        borderColor: palette.lightGrey,
        alignItems: 'center',
    },
    connectText: {
        color: palette.linkedinBlue,
        fontWeight: 'bold',
        fontSize: 3.2 * vmin,
    },


    photoContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 200,
        height: "50%",
        width: "70%",
        backgroundColor: palette.lightPurple,
    },

    buttonGroup: {
        gap: 2 * vmin,
        paddingTop: 5 * vh,
        marginTop: 'auto',
        marginBottom: 5 * vh,
    },
    button: {
        width: 80 * vmin,
        height: 14 * vmin,
        justifyContent: 'center',
        paddingBottom: 0.5 * vmin,
    },
})