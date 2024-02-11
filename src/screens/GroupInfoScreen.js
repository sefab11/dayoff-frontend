import { StyleSheet, Keyboard, TouchableWithoutFeedback, TouchableOpacity, View, Image, ScrollView, Text } from "react-native";
import { palette, dimensions } from "../style";

[vw, vh, vmin, vmax] = dimensions

export default GroupInfoScreen = ({ navigation }) => {
    //TODO: get number of members from chat screen/ backend
    const numMembers = 5;

    //TODO: get members description and public data from chat screen/ backend
    const members = null;

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={styles.page}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()}
                    style={{justifyContent: 'center'}}>
                        <Image style={styles.returnButton}
                        source={require("../../assets/icons/chevron_left.png")} />
                    </TouchableOpacity>

                    <View style={styles.headerCenter}>
                        <Text style={styles.header1}>Group Info</Text>
                        <Text style={styles.header2}>{numMembers} Members</Text>
                    </View>

                    {/*TODO: add in function to remove user from group*/}
                    <TouchableOpacity onPress={() => {}}
                    style={{justifyContent: 'center'}}>
                        <Image style={styles.exitButton}
                        source={require("../../assets/icons/exit.png")} />
                    </TouchableOpacity>
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
    header: {
        width: 100 * vmin,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 2 * vmin,
    },
    headerMain: {
        alignSelf: 'center',
        display: 'flex',
        flexDirection: 'column',
    },

    header1: {
        fontFamily: 'Montserrat-Bold',
        fontSize: 3.25 * vh,
        paddingBottom: 0.5 * vh,
        letterSpacing: -0.2 * vh,
        textAlign: 'center',
    },
    header2: {
        fontFamily: 'Montserrat-Bold',
        fontSize: 2 * vh,
        paddingBottom: 0.5 * vh,
        letterSpacing: -0.2 * vh,
        textAlign: 'center',
        color: palette.grey,
    },

    returnButton: {
        resizeMode: 'contain',
        height: 4 * vh,
    },
    exitButton: {
        resizeMode: 'contain',
        height: 4 * vh,
        tintColor: palette.lightRed,
    },
})