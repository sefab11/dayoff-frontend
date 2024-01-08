import { View, Keyboard, TouchableWithoutFeedback, Text } from "react-native";
import { Button, Header, SegmentedInput } from "../components";
import { StyleSheet } from "react-native";
import { palette, themes } from "../style";

export default VerificationScreen = ({ navigation }) => {
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={styles.page}>
                <View>
                    <Header>Verification</Header>
                    <Text style={styles.message}>We’ve sent a verification code to your work email. It’s our aim to provide a safe space for everyone.</Text>
                </View>
                <SegmentedInput
                    length={5}
                    style={styles.segmentedInput}
                    segmentStyle={styles.segment}
                    theme={themes.textInput}
                    mode='outlined'
                    label='Enter code'
                    keyboardType='numeric'
                />
                <View style={styles.buttonGroup}>
                    <Button
                        onPress={() => {}}
                        mode='text'
                        theme={themes.button}
                        style={styles.button}
                    >
                        Resend verification code
                    </Button>
                    <Button
                        onPress={() => navigation.navigate('profile')}
                        mode='contained'
                        theme={themes.button}
                        style={styles.button}
                    >
                        Verify account
                    </Button>
                </View>
            </View>
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
        marginBottom: 5 * vh
    },
    button: {
        width: 80 * vmin,
        height: 14 * vmin,
        justifyContent: 'center',
        paddingBottom: 0.5 * vmin
    }
})