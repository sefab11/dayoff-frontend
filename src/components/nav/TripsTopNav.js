import { View, Text, Image, TouchableWithoutFeedback } from "react-native";
import { StyleSheet } from "react-native";
import { dimensions, palette } from "../../style";
import { useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";

[vw, vh, vmin, vmax] = dimensions

const TripsTopNav = (props) => {
    const {style, children, ...rest} = props
    console.log("w");

    const myTripsScreen = props.screen1;
    const pastTripsScreen = props.screen2;

    console.log("x");

    const route = useRoute()
    const navigation = useNavigation()
    const [currentScreenName, setScreenName] = useState('MyTrips');
    const [currentScreen, setCurrentScreen] = useState(myTripsScreen);

    console.log("y");

    const screenUpdate = (value) => {
        setScreenName(value);
        if (value == 'MyTrips') setCurrentScreen(myTripsScreen);
        else setCurrentScreen(pastTripsScreen);
    }

    return (
        <>
            <View style={styles.tabBar} {...rest}>
                <TouchableWithoutFeedback onPress={() => screenUpdate('MyTrips')}>
                    {
                        <View style={styles.tab}>
                            <Text style={currentScreenName == 'MyTrips' ? styles.tabLabelActive
                            : styles.tabLabelInactive}>
                                My Trips
                            </Text>
                        </View>
                    }
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={() => screenUpdate('Past')}>
                    {
                        <View style={styles.tab}>
                            <Text
                            style={currentScreenName == 'Past' ? styles.tabLabelActive
                            : styles.tabLabelInactive}>
                                Past
                            </Text>
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

export default TripsTopNav;