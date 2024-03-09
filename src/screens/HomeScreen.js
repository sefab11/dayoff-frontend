import { React, useState, useEffect } from "react";
import { View, Text, Keyboard, TouchableWithoutFeedback, StatusBar, ScrollView, Image, TouchableOpacity } from "react-native";
import Modal from "react-native-modal";
import { Button, TripViewMatch, TripView, BottomNav, TopNav } from "../components";
import { StyleSheet } from "react-native";
import { palette, themes, dimensions, flags } from "../style";
import UserService from "../services/UserService";
const { filterTrips, getUserData } = UserService;

[vw, vh, vmin, vmax] = dimensions;


const ForYouScreen = (props) => {
    const { navigation } = props;
    const email = global.emailAddress;

    //call backend function to get list of specified trips to join
    //--trips/filter
    //get the date and country to filter by from the database
    //in getmatched, the users preferences should be updated into the db
    //get users preferences from db
    //const [prefDates, setPrefDates] = useState([]);
    //const [prefCountries, setPrefCountries] = useState([]);

    //const getPreferred = async () => {
    //    await getUserData(email)
    //    .then(response => {
    //        setPrefDates(JSON.parse(response)['dates']);
    //        setPrefCountries(JSON.parse(response)['countries']);
    //    })
    //}

    //useEffect(() => {
    //    getPreferred();
    //}, []);

    const prefDates = [
        ["2024-01-10", "2024-01-14"],
        ["2024-02-02", "2024-02-09"],
        [null, null]
    ]
    const prefCountries = [
        {'code': 'AU', 'name': 'Australia'},
        {'code': 'CA', 'name': 'Canada'},
        null
    ]



    function seeMoreTrips(){
        /*TODO: limit the amount that the user can see at first e.g. 10
          increase the number to render, render when items index less than number
          when button pressed, the limit should increase by 10 more and render the rest*/
        console.log("see more trips");
    }

    var tempTrips = []; //used to get the trips and update easily, NOT RENDERED

    const getTrip = async (startDate, endDate, country) => {
        if (startDate === null && endDate === null && country === null) return;

        await filterTrips(null, null, startDate, endDate, country)
        .then(response => {
            response = JSON.parse(response)['trips'];
            // break out if the trips are empty
            if (response === []) return;

            response.forEach(async newTrip => {
                await tempTrips.push(newTrip);
            })
        })
    }

    const forLoop = async (dates, countries) => {
        console.log("start");
        for (let i = 0; i < dates.length; i++){
            for (let j = 0; j < countries.length; j++){
                await getTrip(dates[i][0], dates[i][1], countries[j]);
            }
        }
        removeDuplicates();
        setTrips(tempTrips);
    }

    // each element is an object so compare each trip id to remove duplicates
    const removeDuplicates = () => {
        for (let i = 0; i < tempTrips.length; i++){
            for (let j = i + 1; j < tempTrips.length; j++){
                const tripA = tempTrips[i];
                const tripB = tempTrips[j];

                if (tripA.trip_id == tripB.trip_id){
                    tempTrips.splice(j, 1);
                    j--;
                }
            }
        }
    }

    const [renderTrips, setRenderTrips] = useState(false);
    const [trips, setTrips] = useState([]); //fill trips with temptrips, IS RENDERED

    // makes the loop occur only once
    useEffect(() => {
        forLoop(prefDates, prefCountries);
        setRenderTrips(true);
    }, [])


    return (
        <View style={styles.page}>
            <Text style={styles.message}>Shows trips happening in the same dates and countries you selected</Text>
            <ScrollView contentContainerStyle={styles.scroll}>
                {renderTrips ?
                trips.map((trip) => {
                    return (<TripViewMatch key={trip.trip_id} trip={trip} navigation={navigation} />)
                })
                : null
                }
                {/*TODO: add more trips on press*/}
                <View marginTop={3 * vh}>
                    <TouchableOpacity onPress={() => seeMoreTrips()}>
                        <Text style={styles.seeMoreText}>See More</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    )
}

const ExploreScreen = (props) => {
    const { navigation } = props;
    const email = "name@workmail.com";

    //call backend function to get all trips with no filter
    //--filter but with 0 filter
    const [trips, setTrips] = useState([]);

    const exploreTrips = async () => {
        await filterTrips(null, null, null, null, null)
        .then(response => {
            setTrips(JSON.parse(response)['trips']);
        })
    }

    useEffect(() => {
        exploreTrips();
    }, [])

    return (
        <View style={styles.page}>
            <Text style={styles.message}>Find or create trips that match your style</Text>
            <Button mode='contained' theme={themes.buttonBlack} style={styles.createTripButton} labelStyle={{marginHorizontal: 0}} onPress={() => navigation.navigate('CreateTrip')}>Create a trip</Button>
            <ScrollView contentContainerStyle={styles.scroll}>
                {!trips ? null
                 :trips.map(trip => <TripView key={trip.trip_id} trip={trip} navigation={navigation} />) }
            </ScrollView>
        </View>
    )
}


export default HomeScreen = ({ navigation }) => {
    return (<>
        <StatusBar></StatusBar>
        <TopNav
            screen1={<ForYouScreen navigation={navigation} />}
            screen2={<ExploreScreen navigation={navigation} />}
        />
        <BottomNav active={"Home"} />
    </>);  
}

const styles = StyleSheet.create({
    page: {
        flex: 1,
        alignItems: 'flex-end',
        justifyContent: 'top',
        gap: 3 * vh,
        backgroundColor: palette.white,
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
    },
    iconContainer: {
        position: 'absolute',
        display: 'flex',
        top: -40,
        backgroundColor: 'red',
    },
    seeMoreText: {
        fontFamily: 'Lato-Bold',
        color: palette.purple,
        textDecorationLine: 'underline',
        fontSize: 4.5 * vmin,
    },
})