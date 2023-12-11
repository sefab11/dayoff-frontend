import { View, Text, Keyboard, TouchableWithoutFeedback, StatusBar, ScrollView } from "react-native";
import { Button, TripViewMatch, TripView, BottomNav, TripChatView } from "../components";
import { StyleSheet } from "react-native";
import { palette, themes, dimensions, flags } from "../style";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useEffect } from "react";
import { useNavigation, useNavigationState } from "@react-navigation/native";


const Tab = createMaterialTopTabNavigator();

[vw, vh, vmin, vmax] = dimensions;


const MyTripsScreen = (navigation) => {

    const chats = Array(5).fill(0)

    return (
        <View style={styles.page}>
            <ScrollView contentContainerStyle={styles.scroll}>
                {
                    chats.length > 0 ?
                    <TripChatView style={{borderTopWidth: 0}} /> :
                    null
                }
                { chats.slice(1).map((chat, i) => <TripChatView key={i} />) }
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
                tabBarScrollEnabled: true,
                tabBarGap: 5 * vmin,
                tabBarLabel: ({ tintColor, focused, item }) => {
                    return focused
                        ? (<Text style={styles.tabLabelActive}>{route.name}</Text>)
                        : (<Text style={styles.tabLabelInactive}>{route.name}</Text>)
                },
                tabBarItemStyle: styles.tab,
                tabBarStyle: styles.tabBar,
                tabBarIndicatorStyle: styles.tabIndicator,
            })}
        >
            <Tab.Screen name='My Trips' component={MyTripsScreen}
                listeners={{
                    tabPress: e => {}
                }}
            />
            <Tab.Screen name='Past' children={() => <PastScreen navigation={navigation} />}
                listeners={{
                    tabPress: e => {}
                }}
            />
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
        width: 'auto',
        marginHorizontal: 0,
        paddingHorizontal: 0,
        overflow: 'visible'
    },
    tabLabelInactive: {
        width: 'auto',
        marginHorizontal: 0,
        paddingRight: 0.5 * vmin,
        fontSize: 5.6 * vmin,
        textTransform: 'none',
        fontFamily: 'Montserrat-Medium',
        color: palette.grey,
        overflow: 'visible'
    },
    tabLabelActive: {
        fontSize: 5.6 * vmin,
        textTransform: 'none',
        fontFamily: 'Montserrat-SemiBold',
        color: palette.black,
        overflow: 'visible'
    },
    tabIndicator: {
        marginLeft: 5.75  * vmin,
        backgroundColor: palette.yellow,
        height: 5
    },
    scroll: {
        width: 100 * vmin,
        alignItems: 'center'
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