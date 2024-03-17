import { React, useState, useEffect } from "react";
import { View, Text, Keyboard, TouchableWithoutFeedback, StatusBar, ScrollView, Image, TouchableOpacity, StyleSheet } from "react-native";
import { UserCreatedTripView, HeaderBack } from "../components";
import { palette, themes, dimensions, flags } from "../style";
import UserService from "../services/UserService";
const { filterTrips } = UserService;

//SCREEN FOR THE USERS CREATED TRIPS

export default MyCreatedTrips = ({navigation}) => {
    const [trips, setTrips] = useState([]);

    const matchTrips = async () => {
        await filterTrips(global.emailAddress, null, null, null, null)
        .then(response => {
            setTrips(JSON.parse(response)['trips'])
        })
    }

    //use effect used to call this method only once
    useEffect(() => {
        matchTrips();
    }, []);


    return (
        <View style={styles.page}>
            <HeaderBack >My Created Trips </HeaderBack>
            <View style={styles.border}>
            </View>

            <ScrollView contentContainerStyle={styles.scroll}>
                {!trips ? null
                 :trips.map(trip => <UserCreatedTripView key={trip.trip_id} trip={trip} navigation={navigation} />) }
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    page: {
        marginTop: 5 * vh,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: palette.white,
    },
    border: {
        width: 85 * vmin,
        paddingTop:5,
        paddingBottom:15,
        borderBottomWidth:1,
        borderBottomColor:'#D7D7D7',
    },
    scroll: {
        width: 100 * vmin,
        alignItems: 'center',
        gap: 3 * vh,
        paddingTop: 5 * vh,
        paddingBottom: 18 * vh
    },
})