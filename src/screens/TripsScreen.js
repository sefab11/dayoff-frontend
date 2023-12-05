import { View, Text, Keyboard, TouchableWithoutFeedback, StatusBar, ScrollView } from "react-native";
import { Button, TripViewMatch, TripView, BottomNav } from "../components";
import { StyleSheet } from "react-native";
import { palette, themes, dimensions, flags } from "../style";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';


const Tab = createMaterialTopTabNavigator();

[vw, vh, vmin, vmax] = dimensions;

const MyTripsScreen = (navigation) => {
    return (
        <View style={styles.page}>
            <ScrollView contentContainerStyle={styles.scroll}>

            </ScrollView>
        </View>
    )
}

const PastScreen = (props) => {
    const { navigation } = props;
    return (
        <View style={styles.page}>
            <ScrollView contentContainerStyle={styles.scroll}>

            </ScrollView>
        </View>
    )
}

export default TripsScreen = ({ navigation }) => {
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
            <Tab.Screen name='My Trips' component={MyTripsScreen} />
            <Tab.Screen name='Past' children={() => <PastScreen navigation={navigation} />} />
        </Tab.Navigator>
        <BottomNav active={"Trips"}/>
    </>);  
}

const styles = StyleSheet.create({
    page: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'top',
        gap: 3 * vh,
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
    },
    scroll: {
        width: 100 * vmin,
        alignItems: 'center',
        gap: 3 * vh,
        paddingBottom: 18 * vh
    },
    message: {
        marginTop: 3 * vh,
        alignSelf: 'center',
        width: 85 * vmin,
        fontFamily: 'Lato-Regular',
        fontSize: 3.8 * vmin,
        color: palette.grey
    },
    createTripButton: {
        width: 40 * vmin,
        height: 12 * vmin,
        justifyContent: 'center',
        alignContent: 'center',
        marginLeft: 7.5 * vmin,
        alignSelf: 'flex-start'
    }
})