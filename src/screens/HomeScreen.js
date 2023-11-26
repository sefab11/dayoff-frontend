import { View, Text, Keyboard, TouchableWithoutFeedback, StatusBar } from "react-native";
import { Button, TripView } from "../components";
import { StyleSheet } from "react-native";
import { palette, themes, dimensions, flags } from "../style";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();

[vw, vh, vmin, vmax] = dimensions;

const ForYouScreen = () => {
    return (
        <View style={styles.page}>
            <TripView />
        </View>
    )
}

const ExploreScreen = () => {
    return (
        <View style={styles.page}>
            <Text>Explore</Text>
        </View>
    )
}

export default HomeScreen = ({ navigation }) => {
    return (<>
        <StatusBar></StatusBar>
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarLabel: ({ tintColor, focused, item }) => {
                    return focused
                        ? (<Text style={styles.tabLabelActive}>{route.name}</Text>)
                        : (<Text style={styles.tabLabelInactive}>{route.name}</Text>)
                },
                tabBarItemStyle: styles.tab,
                tabBarStyle: styles.tabBar,
                tabBarIndicatorStyle: styles.tabIndicator
            })}
        >
            <Tab.Screen name='For You' component={ForYouScreen} />
            <Tab.Screen name='Explore' component={ExploreScreen} />
        </Tab.Navigator>
    </>);
}

const styles = StyleSheet.create({
    page: {
        paddingTop: 5 * vh,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: palette.white
    },
    tabBar: {
        elevation: 0,
        paddingTop: 2 * vh,
        paddingLeft: 6 * vmin,
        backgroundColor: palette.white,
    },
    tab: {
        width: 28 * vmin,
    },
    tabLabelInactive: {
        paddingHorizontal: 0,
        width: 28 * vmin,
        fontSize: 5.6 * vmin,
        textTransform: 'none',
        fontFamily: 'Montserrat-Medium',
        color: palette.grey
    },
    tabLabelActive: {
        width: 28 * vmin,
        fontSize: 5.6 * vmin,
        textTransform: 'none',
        fontFamily: 'Montserrat-SemiBold',
        color: palette.black
    },
    tabIndicator: {
        marginLeft: 6 * vmin,
        backgroundColor: palette.yellow,
        width: 22 * vmin,
        height: 5
    }
})