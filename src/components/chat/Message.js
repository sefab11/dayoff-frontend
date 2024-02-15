import { Text, View, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { dimensions, palette } from '../../style';

[vw, vh, vmin, vmax] = dimensions

const Message = (props) => {
    const {style, children, ...rest} = props;
    const {imageSrc, name, time} = props;
    const navigation = useNavigation();

    return(
        <View style={styles.messageContainer}>
            <TouchableOpacity onPress={() => navigation.navigate('UserInfo')} style={styles.profileContainer}>
                <Image source={imageSrc} style={styles.profilePic}/>
                <Text style={styles.nameText}>{name}</Text>
            </TouchableOpacity>
            <View width='85%'>
                <View style={styles.messageBubble}>
                    <Text style={styles.message}>
                        {children}
                    </Text>
                </View>
                <Text style={styles.timeText}>{time}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    messageContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignSelf: 'flex-start',
        width: 85 * vmin,
    },
    profileContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        paddingRight: 2.5 * vmin,
    },
    profilePic: {
        resizeMode: 'contain',
        width: 10 * vmin,
        height: 10 * vmin,
        borderRadius: 5 * vmin,
    },
    nameText: {
        fontWeight: 'normal',
        fontSize: 4.5 * vmin,
    },
    messageBubble: {
        alignSelf: 'flex-start',
        backgroundColor: palette.lightPurple,
        padding: 2 * vh,
        borderRadius: 5 * vh,
        borderBottomLeftRadius: 0
    },
    message: {
        color: palette.black,
        fontFamily: "Lato-Regular",
        fontSize: 4.2 * vmin,
    },
    timeText: {
        color: palette.grey,
        fontSize: 3.8 * vmin,
        paddingTop: 1 * vh,
    },
})

export default Message;