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
const { joinTrip } = UserService;

[vw, vh, vmin, vmax] = dimensions


const formatDate = (startDate, endDate) => {
    const monthNames = {
        0: 'Jan', 1: 'Feb',
        2: 'Mar', 3: 'Apr',
        4: 'May', 5: 'Jun',
        6: 'Jul', 7: 'Aug',
        8: 'Sep', 9: 'Oct',
        10: 'Nov', 11: 'Dec'
    };

    //parse the details of each string date inputs
    //convert to date then get date, month, year of each
    const parsedStartDate = new Date(startDate);
    const parsedEndDate = new Date(endDate);

    const dateDetails = {
        startDate: parsedStartDate.getDate(),
        startMonth: monthNames[parsedStartDate.getMonth()],
        endDate: parsedEndDate.getDate(),
        endMonth: monthNames[parsedEndDate.getMonth()],
    }

    var dateString = "";
    //check if months are the same
    if (dateDetails.startMonth == dateDetails.endMonth){
        //change the string as day1 - day2 month
        dateString = dateDetails.startDate + " - " + dateDetails.endDate
        + " " + dateDetails.startMonth;
    }
    else{
        //change the string as day1 month1 - day2 month2
        dateString = dateDetails.startDate + " " + dateDetails.startMonth + " - "
        + dateDetails.endDate + " " + dateDetails.endMonth;
    }

    return dateString;
}


const UserCreatedTripView = (props) => {
    const {email, style, label, children, trip, ...rest} = props;
    const navigation = props.navigation;


    const country = trip.location;

    function deleteTrip(){
        //don't delete trip if theres more than 1 person going
        if (trip.participants.length > 1) return;

        console.log("delete");
        //TODO: remove trip from array on CreatedTripsScreen.
    }

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
                onPress={() => console.log("open chat")}>
                    <Text style={styles.chatText}>Open chat</Text>
                </TouchableOpacity>
                <IconButton
                    style={styles.editButton}
                    backgroundColor={palette.purple}
                    icon={require('../../../assets/icons/pencil.png')}
                    iconColor={palette.white}
                    size={2 * vh}
                    onPress={() => navigation.navigate('EditTrip', {
                        email: email,
                        trip: trip,
                    })}
                />

                <IconButton
                    style={styles.deleteButton}
                    backgroundColor={trip.participants.length <= 1 ? palette.lightRed : palette.lightGrey}
                    icon={require('../../../assets/icons/trash.png')}
                    iconColor={trip.participants.length <= 1 ? palette.white : palette.grey}
                    size={2 * vh}
                    onPress={() => deleteTrip(trip.id)}
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
        gap: 16 * vmin,
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