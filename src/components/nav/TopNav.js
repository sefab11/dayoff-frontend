import { View, Text, Image, TouchableWithoutFeedback } from "react-native";
import { StyleSheet } from "react-native";
import { dimensions, palette } from "../../style";
import { useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";

[vw, vh, vmin, vmax] = dimensions

const TopNav = (props) => {
    const {style, children, ...rest} = props
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
        if (currentScreenName == 'ForYou') navigation.replace('GetMatched');
        else navigation.replace('MyCreatedTrips');
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
                            currentScreenName == 'ForYou'
                            ?
                                <Image
                                    style={styles.tabIcon}
                                    source={require("../../../assets/icons/calender_globe.png")}
                                />
                            :
                                <Image
                                    style={styles.tabIcon}
                                    source={require("../../../assets/icons/mobile.png")}
                                />
                            }
                        </View>
                    }
                </TouchableWithoutFeedback>
            </View>
            {currentScreen}
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
        fontFamily: 'Montserrat-SemiBold',
        color: palette.black,
        overflow: 'visible',
        width: 'auto',
        borderBottomWidth: 5,
        borderColor: palette.yellow,
    },
    tabLabelInactive: {
        fontSize: 5.6 * vmin,
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
})

export default TopNav;