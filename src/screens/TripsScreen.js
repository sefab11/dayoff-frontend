import { View, Text, Keyboard, TouchableWithoutFeedback, StatusBar, ScrollView } from "react-native";
import { Button, BottomNav, TripChatView, TripsTopNav } from "../components";
import { StyleSheet } from "react-native";
import { palette, themes, dimensions, flags } from "../style";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React, { useEffect, useState } from "react";
import { useNavigation, useNavigationState } from "@react-navigation/native";

import { filterTrips } from "../services/TripsService";
import { getMessages } from "../services/MessageService";

const Tab = createMaterialTopTabNavigator();

[vw, vh, vmin, vmax] = dimensions;

async function getTrips(setTripsState, specificTrips){
    var messages = [];
    var pastTrips = [];
    var currentTrips = [];
    // get the current date
    let currentDate = new Date();

    // get all trips that the user has joined
    await filterTrips(null, 'sepehr@gmail.com', null, null, null)
    .then(async response => {
        // parse response to get array of trips
        response = JSON.parse(response)['trips'];
        if (response === []) return;

        // loop through each trip
        for (let i = 0; i < response.length; i++) {
            const trip = response[i];
            // get the messages of the group based on the trip id
            await getMessages(trip.trip_id)
            .then(response => {
                messages = JSON.parse(response).messages;
            })

            // get the current trip end date and compare with the current date
            // if end date < current date then add to past trips
            // else add to current trips
            let tripEndDate = new Date(trip.end_date);
            if (tripEndDate < currentDate) pastTrips.push([trip, messages]);
            else currentTrips.push([trip, messages]);
        }
    })
    .then(() => {
        if (specificTrips === 'past') setTripsState(pastTrips);
        else if (specificTrips === 'current') setTripsState(currentTrips);
    })
}


const MyTripsScreen = (props) => {
    const { navigation } = props;

    const [trips, setTrips] = useState(null);

    useEffect(() => {
        getTrips(setTrips, 'current');
        console.log("aa" + trips);
    }, [])

    return (
        <View style={styles.page}>
            <ScrollView contentContainerStyle={styles.scroll}>
                { trips
                ? trips.map((trip, index) => <TripChatView key={index} trip={trip[0]} messages={trip[1]} />)
                : null
                }
            </ScrollView>
        </View>
    )
}


const PastScreen = (props) => {
    const { navigation } = props;

    const [trips, setTrips] = useState(null);

    useEffect(() => {
        getTrips(setTrips, 'past');
        console.log("bb" + trips);
    }, [])

    return (
        <View style={styles.page}>
            <ScrollView contentContainerStyle={styles.scroll}>
                { trips
                ? trips.map((trip, index) => <TripChatView key={index} trip={trip[0]} messages={trip[1]} />)
                : null
                }
            </ScrollView>
        </View>
    )
}

export default TripsScreen = ({ navigation }) => {
    /* TODO:
        get all users joined trips and loop through each trip
        if enddate has passed then add trip to past trips
        else add to current trips
        pass past trips to pastscreen and current trips to mytripsscreen
    */

    return (<>
        <StatusBar></StatusBar>
            <TripsTopNav
                screen1={<MyTripsScreen navigation={navigation} />}
                screen2={<PastScreen navigation={navigation} />}
            />
        <BottomNav active={"Trips"} />
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