import { React } from "react";
import { View, Text, Keyboard, TouchableWithoutFeedback, StatusBar, ScrollView, Image, TouchableOpacity } from "react-native";
import Modal from "react-native-modal";
import { Button, TripViewMatch, TripView, BottomNav, TopNav } from "../components";
import { StyleSheet } from "react-native";
import { palette, themes, dimensions, flags } from "../style";

[vw, vh, vmin, vmax] = dimensions;

const ForYouScreen = (props) => {
    const { navigation } = props;

    function seeMoreTrips(){
        //TODO: pull more trips from backend and add to array
        console.log("see more trips");
    }

    const matched = [
        {
            id: 0,
            country: 'AU',
            limit: 9,
            matched: [
                {
                    name: 'Jane',
                    profilePic: require('../../assets/images/profilePics/1.jpg'),
                },
                {
                    name: 'Gunpei',
                    profilePic: require('../../assets/images/profilePics/2.jpg'),
                },
                {
                    name: 'Peter',
                    profilePic: require('../../assets/images/profilePics/3.jpg'),
                },
                {
                    name: 'Summer',
                    profilePic: require('../../assets/images/profilePics/4.jpg'),
                },
                {
                    name: 'Miryam',
                    profilePic: require('../../assets/images/profilePics/5.jpg'),
                },
                {
                    name: 'Ambuj',
                    profilePic: require('../../assets/images/profilePics/6.jpg'),
                },
                {
                    name: 'Craig',
                    profilePic: null
                },
                {
                    name: 'Mary',
                    profilePic: null
                }
            ],
            going: [
                {
                    name: 'Jane',
                    profilePic: require('../../assets/images/profilePics/1.jpg'),
                },
                {
                    name: 'Gunpei',
                    profilePic: require('../../assets/images/profilePics/2.jpg'),
                },
                {
                    name: 'Peter',
                    profilePic: require('../../assets/images/profilePics/3.jpg'),
                },
                {
                    name: 'Summer',
                    profilePic: require('../../assets/images/profilePics/4.jpg'),
                },
                {
                    name: 'Miryam',
                    profilePic: require('../../assets/images/profilePics/5.jpg'),
                },
                {
                    name: 'Ambuj',
                    profilePic: require('../../assets/images/profilePics/6.jpg'),
                },
                {
                    name: 'Craig',
                    profilePic: null
                },
                {
                    name: 'Mary',
                    profilePic: null
                }
            ]
        },
        {
            id: 1,
            country: 'BR',
            limit: 6,
            matched: [
                {
                    name: 'John',
                    profilePic: null
                }
            ],
            going: [
                {
                    name: 'John',
                    profilePic: null
                },
                {
                    name: 'Amy',
                    profilePic: null
                }
            ]
        },
    ]

    return (
        <View style={styles.page}>
            <Text style={styles.message}>Shows trips happening in the same dates and countries you selected</Text>
            <ScrollView contentContainerStyle={styles.scroll}>
                { matched.map(trip => <TripViewMatch key={trip.id} trip={trip} navigation={navigation}/>) }

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

    const trips = [
        {
            id: 0,
            country: 'EG',
            limit: 9,
            details: 'Let’s explore the tombs of the pharaohs, pyramids and cruise on the nile river. We will also take an hour to volunteer :)',
            going: [
                {
                    name: 'Sefa',
                    profilePic: null
                },
                {
                    name: 'Puspita',
                    profilePic: null
                },
                {
                    name: 'Nandini',
                    profilePic: null
                },
                {
                    name: 'Devarshi',
                    profilePic: null
                },
                {
                    name: 'Lee',
                    profilePic: null
                },
                {
                    name: 'Bruno',
                    profilePic: null
                },
                {
                    name: 'Craig',
                    profilePic: null
                },
                {
                    name: 'Mary',
                    profilePic: null
                }
            ]
        },
        {
            id: 1,
            country: 'NL',
            limit: 6,
            details: 'Join me and lets go experience the culture and arty vibe of Amsterdam.',
            going: [
                {
                    name: 'John',
                    profilePic: null
                },
                {
                    name: 'Amy',
                    profilePic: null
                }
            ]
        },
    ]

    return (
        <View style={styles.page}>
            <Text style={styles.message}>Find or create trips that match your style</Text>
            <Button mode='contained' theme={themes.buttonBlack} style={styles.createTripButton} labelStyle={{marginHorizontal: 0}} onPress={() => navigation.navigate('CreateTrip')}>Create a trip</Button>
            <ScrollView contentContainerStyle={styles.scroll}>
                { trips.map(trip => <TripView key={trip.id} trip={trip} navigation={navigation} />) }
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