import { View, Keyboard, TouchableWithoutFeedback, TouchableOpacity, Text, ScrollView } from "react-native";
import { Button, Header, SegmentedInput, HeaderBack, Image } from "../components";
import { StyleSheet } from "react-native";
import { palette, themes } from "../style";

export default VerificationScreen = ({ navigation }) => {
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <ScrollView>
            <View style={styles.page}>
                <View>
                    <HeaderBack>Get Verified</HeaderBack>
                    <Text style={styles.message}>Our aim is to provide a safe space for everyone.</Text>
                </View>

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
                        onPress={() => {}}
                        mode='text'
                        theme={themes.button}
                        style={styles.button}
                    >
                        Resend verification code
                    </Button>
                </View>

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


                <View style={styles.buttonGroup} borderBottomWidth={0}>

                    <Button
                        mode='contained'
                        theme={themes.button}
                        style={styles.button}
                        //use .replace() instead so that when returning, the screen goes
                        //to home instead of verification
                        onPress={() => navigation.replace('Chat')}
                    >
                        Verify account
                    </Button>
                </View>
            </View>
        </ScrollView>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    page: {
        paddingTop: 3 * vh,
        flex: 1,
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
    buttonGroup: {
        gap: 2 * vmin,
        marginTop: 5 * vh,
        marginBottom: 5 * vh,
        position: 'fixed',
    },
    button: {
        width: 80 * vmin,
        height: 14 * vmin,
        justifyContent: 'center',
        paddingBottom: 0.5 * vmin
    },

    section: {
        width: "90%",
        padding: 25,

        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        borderBottomWidth: 2,
        borderColor: palette.lightGrey,
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
        borderRadius: 100,
        backgroundColor: palette.lightPurple,
    },
})