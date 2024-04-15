import { Text, View, Image, StyleSheet } from "react-native";
import { dimensions, palette } from '../../style';

[vw, vh, vmin, vmax] = dimensions

const UserImageMessage = (props) => {
    const {style, children, ...rest} = props;
    const {time, photo} = props;

    // TODO: add image in this component and style it well

    return(
        <View style={styles.messageContainer}>
            <View style={styles.messageBubble}>
                <Image source={photo} style={styles.attachedPhoto} />
                <Text style={styles.message}>
                    {children}
                </Text>
            </View>
            <Text style={styles.timeText}>{time}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    messageContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignSelf: 'flex-end',
        width: 85 * vmin,
        height: 20 * vh,
    },
    messageBubble: {
        display: 'flex',
        flexDirection: 'column',
        alignSelf: 'flex-end',
        backgroundColor: palette.purple,
        padding: 2 * vh,
        borderRadius: 5 * vh,
        borderBottomRightRadius: 0
    },
    message: {
        color: palette.white,
        fontFamily: "Lato-Regular",
        fontSize: 4.5 * vmin,
    },
    timeText: {
        color: palette.grey,
        fontSize: 3.8 * vmin,
        paddingTop: 1 * vh,
        alignSelf: 'flex-end',
    },

    attachedPhoto: {
        flex: 1,
        width: undefined,
        height: undefined,
        borderRadius: 2.5 * vh,
        paddingBottom: 5 * vmin,
    }
})

export default UserImageMessage;