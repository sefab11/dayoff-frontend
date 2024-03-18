import { StyleSheet, View, Text, TouchableWithoutFeedback } from 'react-native'
import { Button } from '../button';
import { Image } from '../image';
import CountryCodes from '../../../assets/CountryCodes.json'
import { themes, flags } from '../../style';
import { dimensions } from '../../style';
import { palette } from '../../style';
import { createNavigationContainerRef, useNavigation } from '@react-navigation/native';

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

const formatTime = (time) => {
    // if theres no time then return null
    if (!time) return null;

    // if theres a date then parse it and format it into hh:mm am/pm
    var parsedTime = new Date(time);

    var hours = parsedTime.getHours();
    var mins = parsedTime.getMinutes();

    if (hours < 12){
        return ("0" + hours + ":" + mins + " AM");
    }
    else return ("0" + (hours-12) + ":" + mins + " PM");
}


const TripChatView = (props) => {
    const {style, label, children, ...rest} = props;
    const {trip, messages} = props;

    const country = trip.location;
    const date = formatDate(trip.start_date, trip.end_date);


    console.log(trip);
    console.log(messages);
    var lastMessage = {};
    try{
        if (messages.length > 0) lastMessage = messages[messages.length-1];
    } catch (e){}

    // TODO: work out how to get number of unread messages?
    const unread = 11

    const navigation = useNavigation();
    
    return (
        <TouchableWithoutFeedback onPress={() => {
            // update the current trip and navigate to chat screen
            global.currentTrip = trip;
            navigation.navigate('Chat');
        }}>
            <View style={{...styles.chat, ...style}}>
                {
                    flags[country.code] ?
                    <Image style={styles.flagIcon} source={flags[country.code]} /> :
                    <Text style={styles.countryText}>{country.code}</Text>
                }
                <View style={styles.middleGroup}>
                    <Text style={styles.countryText}>{country.name} | {date}</Text>
                    {
                        lastMessage.sender && lastMessage.message ?
                        <View style={styles.messageGroup}>
                            <Text style={styles.authorText}>{lastMessage.sender}: </Text>
                            <Text style={styles.messageText}>
                                {
                                    (lastMessage.sender.length + lastMessage.message.length) > 24 ?
                                    lastMessage.message.substring(0, 24 - lastMessage.sender.length) + '...' :
                                    lastMessage.message
                                }
                            </Text>
                        </View> :
                        null
                    }
                </View>
                {
                    <View style={styles.rightGroup}>
                        <Text style={styles.timeText}>{formatTime(lastMessage.timestamp)}</Text>
                        <Text style={styles.notification}>
                        {
                            unread > 0 ?
                            (unread > 9 ? '9+' : unread) :
                            null
                        }
                        </Text>
                    </View>
                }
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    chat: {
        flexDirection: 'row',
        width: 85 * vmin,
        paddingVertical: 3 * vh,
        borderTopStyle: 'solid',
        borderTopColor: palette.lightGrey,
        borderTopWidth: 1,
        gap: 5 * vmin,
        alignItems: 'center'
    },
    countryText: {
        fontFamily: 'Lato-Bold',
        fontSize: 2.2 * vh
    },
    flagIcon: {
        width: 5 * vh,
        resizeMode: 'contain'
    },
    middleGroup: {
        padding: 0,
        flexDirection: 'column',
        alignContent: 'flex-start',
        gap: 1 * vh
    },
    rightGroup: {
        marginLeft: 'auto',
        padding: 0,
        flexDirection: 'column',
        gap: 1 * vh,
        alignItems: 'flex-end'
    },
    messageGroup: {
        flexDirection: 'row'
    },
    authorText: {
        fontFamily: 'Lato-Regular',
        fontSize: 2 * vh,
        color: palette.black
    },
    messageText: {
        fontFamily: 'Lato-Regular',
        fontSize: 2 * vh,   
        color: palette.grey
    },
    timeText: {
        fontFamily: 'Lato-Regular',
        fontSize: 1.8 * vh,
        color: palette.grey
    },
    notification: {
        width: 3.2 * vh,
        height: 3.2 * vh,
        backgroundColor: palette.purple,
        color: palette.white,
        borderRadius: 1.6 * vh,
        textAlign: 'center',
        textAlignVertical: 'center',
        fontFamily: 'Lato-Bold',
        fontSize: 1.8 * vh,
    }
})

export default TripChatView;