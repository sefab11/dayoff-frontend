import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import { useState } from "react";
import { IconButton } from "react-native-paper";
import { Button } from '../button';
import { Image } from '../image';
import CountryCodes from '../../../assets/CountryCodes.json'
import { themes, flags } from '../../style';
import { dimensions } from '../../style';
import { palette } from '../../style';
import { createNavigationContainerRef } from '@react-navigation/native';
import UserService from "../../services/UserService";
const { joinTrip, deleteTrip } = UserService;

[vw, vh, vmin, vmax] = dimensions

function formatDate(startDate, endDate){
    const monthsIndices = {
        1: 'Jan', 2: 'Feb', 3: 'Mar',
        4: 'Apr', 5: 'May', 6: 'Jun',
        7: 'Jul', 8: 'Aug', 9: 'Sep',
        10: 'Oct', 11: 'Nov', 12: 'Dec',
    }

    var parsedStartDate = new Date(startDate);
    let sDate = parsedStartDate.getDate();
    if (sDate < 10) sDate = "0" + sDate.toString();
    let sMonth = monthsIndices[parsedStartDate.getMonth()+1];
    let sYear = parsedStartDate.getYear();

    console.log(sDate + sMonth + sYear);


    var parsedEndDate = new Date(endDate);
    let eDate = parsedEndDate.getDate();
    if (eDate < 10) eDate = "0" + eDate.toString();
    let eMonth = monthsIndices[parsedEndDate.getMonth()+1];
    let eYear = parsedEndDate.getYear();

    console.log(eDate + eMonth + eYear);

    if (sMonth == eMonth){
        return (sDate + " - " + eDate + " " + sMonth);
    }
    else return (sDate + " " + sMonth + " - " + eDate + " " + eMonth);
};



const UserCreatedTripView = (props) => {
    const {style, label, children, trip, ...rest} = props;
    const email = global.emailAddress;
    const navigation = props.navigation;

    const country = trip.location;

    return (
        <View style={styles.trip}>
            <View style={styles.topGroup}>
                <View style={styles.countryGroup}>
                    {
                        flags[country.code] ?
                        <Image style={styles.flagIcon} source={flags[country.code]} /> :
                        <Text style={styles.countryText}>{country.code}</Text>
                    }
                    <Text style={styles.countryText}>{country.name}</Text>
                </View>
                <Text style={styles.dateText}>{formatDate(trip['start_date'], trip['end_date'])}</Text>
            </View>
            <Text style={styles.details}>
                {trip.description}
            </Text>
            <Text style={styles.groupText}>Going:</Text>
            <View style={styles.middleGroup}>
                <View style={styles.profilePicsGroup}>
                    {(() => {
                        const profilePics = [];
                        for(let i = 0; trip.going && i < trip.going.length; i++) {
                            if(i == 6) break;

                            if(trip.going[i].profilePic)
                                profilePics.push(<Image style={styles.profilePic} key={i}></Image>);
                            else
                                profilePics.push(<Text style={styles.profilePic} key={i}>{trip.going[i].name[0]}</Text>);
                        }
                        return profilePics;
                    })()}
                </View>
                {
                    trip.participants.length > 6 ?
                    <Button
                        mode="text"
                        labelStyle={{marginHorizontal: 0}}
                        style={styles.showGroupButton}
                        theme={themes.button}
                    >
                        +{trip.participants.length - 6}
                    </Button> :
                    null
                }

            </View>
            <View style={styles.bottomGroup}>
                <TouchableOpacity
                style={styles.chatButton}
                onPress={() => {
                    global.currentTrip = trip;
                    navigation.navigate('Chat');
                }}>
                    <Text style={styles.chatText}>Open chat</Text>
                </TouchableOpacity>
                <IconButton
                    style={styles.editButton}
                    backgroundColor={palette.purple}
                    icon={require('../../../assets/icons/pencil.png')}
                    iconColor={palette.white}
                    size={2 * vh}
                    onPress={() => {
                        navigation.navigate('EditTrip');
                        global.currentTrip = trip;
                    }}
                />

                <IconButton
                    style={styles.deleteButton}
                    backgroundColor={trip.participants.length <= 1 ? palette.lightRed : palette.lightGrey}
                    icon={require('../../../assets/icons/trash.png')}
                    iconColor={trip.participants.length <= 1 ? palette.white : palette.grey}
                    size={2 * vh}
                    onPress={async() => {
                        await deleteTrip(trip.trip_id, trip.participants.length)
                        .then(status => {
                            // if deleted then renavigate to screen to reload data
                            if (status === 200) navigation.replace('MyCreatedTrips');
                            else console.log("not possible to remove");
                        })
                    }}
                    // disable the onpress function based on if theres too many people
                    disabled={trip.participants.length > 1}
                />

                <View style={styles.goingGroup}>
                    <Image style={styles.goingIcon} source={require("../../../assets/icons/people.png")} />
                    <Text style={styles.goingText}>
                        {trip.participants.length}/{trip.participants.length}
                    </Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    trip: {
        width: 85 * vmin,
        paddingVertical: 1 * vmin,
        paddingHorizontal: 6 * vmin,
        borderColor: palette.lightGrey2,
        borderWidth: 2,
        borderRadius: 18,
        gap: 2 * vmin
    },
    topGroup: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 0 * vmin,
        alignItems: 'center',
        marginBottom: 1 * vmin
    },
    countryGroup: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 1 * vmin
    },
    countryText: {
        fontFamily: 'Lato-Bold',
        fontSize: 2.2 * vh
    },
    flagIcon: {
        width: 4 * vh,
        resizeMode: 'contain'
    },
    dateText: {
        fontFamily: 'Lato-Regular',
        fontSize: 2 * vh
    },
    details: {
        color: palette.black,
        fontFamily: 'Lato-Regular',
        fontSize: 2 * vh
    },
    groupText: {
        color: palette.grey,
        fontFamily: 'Lato-Regular',
        fontSize: 1.8 * vh
    },
    middleGroup: {
        padding: 0,
        flexDirection: 'row',
        alignContent: 'flex-start',
        marginBottom: 1 * vmin
    },
    profilePicsGroup: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: -1 * vh
    },
    profilePic: {
        display: 'flex',
        width: 12 * vmin,
        height: 12 * vmin,
        backgroundColor: palette.purple,
        borderRadius: 6 * vmin,
        textAlign: 'center',
        textAlignVertical: 'center',
        fontFamily: 'Lato-Bold',
        fontSize: 6 * vmin,
        color: palette.white,
        borderColor: palette.white,
        borderWidth: 0.8 * vmin,
    },
    showGroupButton: {
        minWidth: 0,
        maxWidth: 5 * vh,
        width: 5 * vh
    },
    bottomGroup: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        columnGap: 5,
    },
    chatButton: {
        width: 25 * vmin,
        height: 10 * vmin,
        justifyContent: 'center',
        alignContent: 'center',
        margin: 0,
        backgroundColor: palette.purple,
        borderRadius: 6,
    },
    chatText: {
        color: palette.white,
        textAlign: 'center',
        textAlignVertical: 'center',
    },
    editButton: {
        width: 10 * vmin,
        height: 10 * vmin,
        borderRadius: 6,
        margin: 0,
    },
    deleteButton: {
        width: 10 * vmin,
        height: 10 * vmin,
        borderRadius: 6,
        margin: 0,
    },
    goingGroup: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 0.8 * vh,
        marginLeft: 'auto',
    },
    goingIcon: {
        width: 2.5 * vh,
        resizeMode: 'contain',
        tintColor: palette.purple
    },
    goingText: {
        color: palette.purple,
        fontSize: 2 * vh,
        marginBottom: 0.4 * vh
    }
})

export default UserCreatedTripView;