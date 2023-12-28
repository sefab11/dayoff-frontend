import { View, Text, Image, TouchableWithoutFeedback } from "react-native";
import { StyleSheet } from "react-native";
import { dimensions, palette } from "../../style";
import { useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";

[vw, vh, vmin, vmax] = dimensions

const TopNav = (props) => {
    const {style, children, active, ...rest} = props
    const forYouScreen = props.screen1;
    const exploreScreen = props.screen2;

    const route = useRoute()
    const navigation = useNavigation()
    const [currentScreenName, setScreenName] = useState('ForYou');
    const [currentScreen, setCurrentScreen] = useState(forYouScreen);

    const screenUpdate = (value) => {
        setScreenName(value);
        if (value == 'ForYou') setCurrentScreen(forYouScreen);
        else setCurrentScreen(exploreScreen);
    }

    const iconUpdate = () => {
        if (currentScreenName == 'ForYou') navigation.navigate('GetMatched');
        else navigation.navigate('CreatedTrips');
    }

    return (
        <>
            <View style={styles.tabBar} {...rest}>
                <TouchableWithoutFeedback onPress={() => screenUpdate('ForYou')}>
                    {
                        <View style={styles.tab}>
                            <Text style={currentScreenName == 'ForYou' ? styles.tabLabelActive
                            : styles.tabLabelInactive}>
                                For You
                            </Text>
                        </View>
                    }
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={() => screenUpdate('Explore')}>
                    {
                        <View style={styles.tab}>
                            <Text
                            style={currentScreenName == 'Explore' ? styles.tabLabelActive
                            : styles.tabLabelInactive}>
                                Explore
                            </Text>
                        </View>
                    }
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={() => iconUpdate()}>
                    {
                        <View style={styles.iconContainer}>
                            {
                            currentScreenName == 'ForYou' ?
                                <Image
                                style={styles.tabIcon}
                                source={require("../../../assets/icons/calender_globe.png")} />
                                :
                                <Image
                                style={styles.tabIcon}
                                source={require("../../../assets/icons/mobile.png")} />
                            }
                        </View>
                    }
                </TouchableWithoutFeedback>
            </View>
            {currentScreen == forYouScreen ? forYouScreen : exploreScreen}
        </>
    )
}

const styles = StyleSheet.create({
    tabBar: {
        elevation: 0,
        paddingTop: 2 * vh,
        paddingLeft: 6 * vmin,
        backgroundColor: palette.white,
        display: 'flex',
        flexDirection: 'row',
    },
    tab: {
        width: 'auto',
        marginHorizontal: 0,
        paddingHorizontal: 10,
        overflow: 'visible'
    },
    tabLabelActive: {
        fontSize: 5.6 * vmin,
        textTransform: 'none',
        fontFamily: 'Montserrat-SemiBold',
        color: palette.black,
        overflow: 'visible',
        width: 'auto',
        borderBottomWidth: 5,
        borderColor: palette.yellow,
    },
    tabLabelInactive: {
        fontSize: 5.6 * vmin,
        textTransform: 'none',
        fontFamily: 'Montserrat-SemiBold',
        color: palette.grey,
        overflow: 'visible',
        width: 'auto',
        borderBottomWidth: 5,
        borderColor: palette.white,
    },
    iconContainer: {
        marginLeft: 'auto',
        paddingRight: 8 * vmin,
    },




    footer: {
        height: 12 * vh,
        flexDirection: 'row',
        width: 100 * vw,
        backgroundColor: palette.black,
        borderTopLeftRadius: 4 * vw,
        borderTopRightRadius: 4 * vw,
        justifyContent: 'space-around',
        padding: 3.2 * vw
    },
    navButton: {
        width: 20 * vw,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: 0.5 * vh
    },
    navIcon: {
        tintColor: palette.white,
        height: 3.2 * vh,
        marginTop: 1 * vh,
        resizeMode: 'contain'
    },
    navIconActive: {
        tintColor: palette.purple,
        height: 3.2 * vh,
        marginTop: 1 * vh,
        resizeMode: 'contain'
    },
    navLabel: {
        color: palette.white,
        fontSize: 1.8 * vh
    },
    navLabelActive: {
        color: palette.purple,
        fontSize: 1.8 * vh
    },
    profilePic: {
        display: 'flex',
        width: 4.2 * vh,
        height: 4.2 * vh,
        borderRadius: 2.1 * vh,
        textAlign: 'center',
        textAlignVertical: 'center',
        fontFamily: 'Lato-Bold',
        fontSize: 2.1 * vh,
        color: palette.white,
        borderColor: palette.white,
        borderWidth: 0.3 * vh,
    },
    profilePicActive: {
        display: 'flex',
        width: 4.2 * vh,
        height: 4.2 * vh,
        borderRadius: 2.1 * vh,
        textAlign: 'center',
        textAlignVertical: 'center',
        fontFamily: 'Lato-Bold',
        fontSize: 2.1 * vh,
        color: palette.purple,
        borderColor: palette.purple,
        borderWidth: 0.3 * vh,
    }
})

export default TopNav;