import { Text, View, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { dimensions, palette } from '../../style';

[vw, vh, vmin, vmax] = dimensions

const ImageMessage = (props) => {
    const {style, children, ...rest} = props;
    const {imageSrc, name, time, photo} = props;
    const navigation = useNavigation();

    return(
        <View style={styles.messageContainer}>
            <TouchableOpacity onPress={() => navigation.navigate('UserInfo')} style={styles.profileContainer}>
                <Image source={imageSrc} style={styles.profilePic}/>
                <Text style={styles.nameText}>{name}</Text>
            </TouchableOpacity>
            <View width='85%'>
                <View style={styles.messageBubble}>
                    <Image source={photo} style={styles.attachedPhoto}/>
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
    attachedPhoto: {
        resizeMode: 'center',
        width: 60 * vmin,
        height: null,
        aspectRatio: 1.5,
        borderRadius: 2.5 * vh,
        padding: 2 * vh,
        marginBottom: 1.5 * vh,
    },
    nameText: {
        marginTop: 'auto',
        fontWeight: 'normal',
        fontSize: 4.5 * vmin,
    },
    messageBubble: {
        alignSelf: 'flex-start',
        backgroundColor: palette.lightPurple,
        padding: 2 * vh,
        borderRadius: 5 * vh,
        borderBottomLeftRadius: 0,
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

export default ImageMessage;