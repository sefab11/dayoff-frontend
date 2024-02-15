import { StyleSheet, Keyboard, TouchableWithoutFeedback, TouchableOpacity, View, Image, ScrollView, Text } from "react-native";
import { palette, dimensions } from "../style";

[vw, vh, vmin, vmax] = dimensions

export default UserInfoScreen = ({ navigation }) => {
    //TODO: get users data from previous screen / backend
    const user = {
        name: 'Sarah Noah',
        countryOfOrigin: 'United Kingdom',
        job: 'Brand Designer @ Meta',
        countriesVisited: [
            'FR',
            'JP',
            'AU',
            'EG',
            'KE',
        ],
        badges: [
            {
            title: 'Planted a tree',
            country: 'BR',
            points: 100,
            }
        ]
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={styles.page}>

            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    page: {
        paddingTop: 3 * vh,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
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

    members: {
        width: '80%',
        alignSelf: 'center',
        display: 'flex',
        flexDirection: 'column',
    },

    memberContainer: {
        borderBottomWidth: 1,
        borderColor: palette.lightGrey,
        display: 'flex',
        flexDirection: 'row',
        paddingVertical: 2 * vh,
    },
    memberInfo: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        textAlignVertical: 'center',
        marginHorizontal: 2 * vmin,
    },
    memberName: {
        fontSize: 4.2 * vmin,
        fontFamily: 'Montserrat-Bold',
    },
    memberJob: {
        fontSize: 3.2 * vmin,
        fontFamily: 'Montserrat-SemiBold',
        color: palette.grey,
    },

    profilePic: {
        resizeMode: 'contain',
        width: 12.5 * vmin,
        height: 12.5 * vmin,
        borderRadius: 10 * vmin,
    },
    emptyProfilePic: {
        width: 12.5 * vmin,
        height: 12.5 * vmin,
        borderRadius: 10 * vmin,
        textAlign: 'center',
        textAlignVertical: 'center',
        backgroundColor: palette.purple,
        color: palette.white,
        fontSize: 4.5 * vmin,
    },

    footer: {
        width: '80%',
        borderTopWidth: 1,
        borderColor: palette.lightGrey,
        paddingTop: 2 * vh,
        paddingBottom: 8 * vh,
    },
    message: {
        fontSize: 3.5 * vmin,
        fontFamily: 'Montserrat-SemiBold',
    },
    link: {
        fontSize: 3.5 * vmin,
        fontFamily: 'Montserrat-SemiBold',
        color: palette.purple,
        textDecorationLine: 'underline',
    },
})