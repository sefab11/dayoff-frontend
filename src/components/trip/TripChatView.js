import { StyleSheet, View, Text, TouchableWithoutFeedback } from 'react-native'
import { Button } from '../button';
import { Image } from '../image';
import CountryCodes from '../../../assets/CountryCodes.json'
import { themes, flags } from '../../style';
import { dimensions } from '../../style';
import { palette } from '../../style';
import { createNavigationContainerRef, useNavigation } from '@react-navigation/native';

[vw, vh, vmin, vmax] = dimensions

const TripChatView = (props) => {
    const {style, label, children, ...rest} = props;

    tripchat = {}
    tripchat.country = 'KE'
    tripchat.lastMessage = {
        author: 'Bruno',
        message: "Let's stay in touch",
        time: '9:39 AM',
    }
    tripchat.unread = 11

    country = CountryCodes.filter(c => c.code == tripchat.country)[0];    

    const navigation = useNavigation();
    
    return (
        <TouchableWithoutFeedback onPress={() => navigation.navigate("Chat")}>
            <View style={{...styles.chat, ...style}}>
                {
                    flags[country.code] ?
                    <Image style={styles.flagIcon} source={flags[country.code]} /> :
                    <Text style={styles.countryText}>{country.code}</Text>
                }
                <View style={styles.middleGroup}>
                    <Text style={styles.countryText}>{country.name} | 14 - 21 Jul</Text>
                    {
                        tripchat.lastMessage ?
                        <View style={styles.messageGroup}>
                            <Text style={styles.authorText}>{tripchat.lastMessage.author}: </Text>
                            <Text style={styles.messageText}>
                                {
                                    tripchat.lastMessage.message.length > 26 ?
                                    tripchat.lastMessage.message.substring(0, 26) + '...' :
                                    tripchat.lastMessage.message
                                }
                            </Text>
                        </View> :
                        null
                    }
                </View>
                {
                    <View style={styles.rightGroup}>
                        <Text style={styles.timeText}>{tripchat.lastMessage.time}</Text>
                        <Text style={styles.notification}>
                        {
                            tripchat.unread > 0 ?
                            (tripchat.unread > 9 ? '9+' : tripchat.unread) :
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