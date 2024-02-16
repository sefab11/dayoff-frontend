import { StyleSheet, Keyboard, TouchableWithoutFeedback, TouchableOpacity, View, Image, ScrollView, Text } from "react-native";
import { VisitedCountries, VolunteerBadges } from "../components";
import { palette, dimensions, flags } from "../style";

[vw, vh, vmin, vmax] = dimensions

export default UserInfoScreen = ({ navigation }) => {
    //TODO: get users data from previous screen / backend
    const user = {
        name: 'Sarah Noah',
        countryOfOrigin: ['UK', 'United Kingdom'],
        job: 'Brand Designer @ Meta',
        image: require('../../assets/images/profilePics/2.jpg'),
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
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.header}>
                    <Image source={require("../../assets/icons/chevron_left.png")}
                    style={styles.returnButton} />
                </TouchableOpacity>

                <View style={styles.infoContainer}>
                    <Image source={user.image} style={styles.image}/>
                    <Text style={styles.header1}>{user.name}</Text>
                    <Text style={styles.header2}>From: {user.countryOfOrigin[1]}</Text>
                    <Text style={styles.message}>{user.job}</Text>

                    <VisitedCountries />
                    <VolunteerBadges />
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
    infoContainer: {
        position: 'absolute',
        width: 100 * vmin,
        display: 'flex',
        flexDirection: 'column',
        marginVertical: 2 * vh,
        alignItems: 'center',
    },
    image: {
        resizeMode: 'contain',
        width: 50 * vmin,
        height: 50 * vmin,
        borderRadius: 25 * vmin,
    },

    header1: {
        fontFamily: 'Montserrat-Bold',
        fontSize: 3.25 * vh,
        paddingBottom: 0.5 * vh,
        letterSpacing: -0.2 * vh,
        textAlign: 'center',
    },
    header2: {
        fontFamily: 'Montserrat-SemiBold',
        fontSize: 2 * vh,
        paddingBottom: 0.5 * vh,
        letterSpacing: -0.2 * vh,
        textAlign: 'center',
        color: palette.grey,
    },
    message: {
        fontSize: 3.5 * vmin,
        fontFamily: 'Montserrat-SemiBold',
        textAlign: 'center',
        width: 90 * vmin,
        paddingVertical: 3 * vh,
        borderBottomWidth: 1,
        borderColor: palette.lightGrey
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
})