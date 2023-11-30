import { View, Text, StatusBar, ScrollView } from "react-native";
import { Button, TripViewMatch, TripView } from "../components";
import { StyleSheet } from "react-native";
import { palette, themes, dimensions, flags } from "../style";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();

[vw, vh, vmin, vmax] = dimensions;

const ForYouScreen = () => {
    return (
        <View style={styles.page}>
            <Text style={styles.message}>Shows trips happening in the same dates and countries you selected</Text>
            <ScrollView contentContainerStyle={styles.scroll}>
                <TripViewMatch />
                <TripViewMatch />
                <TripViewMatch />
            </ScrollView>
        </View>
    )
}

const ExploreScreen = () => {
    return (
        <View style={styles.page}>
            <Text style={styles.message}>Find or create trips that match your style</Text>
            <Button mode='contained' theme={themes.buttonBlack} style={styles.createTripButton}>Create trip</Button>
            <ScrollView contentContainerStyle={styles.scroll}>
                <TripView />
                <TripView />
            </ScrollView>
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
        width: 35 * vmin,
        height: 12 * vmin,
        justifyContent: 'center',
        alignContent: 'center',
        marginLeft: 7.5 * vmin,
        alignSelf: 'flex-start'
    }
})