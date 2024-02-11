import { Text, View, StyleSheet } from "react-native";
import { dimensions, palette } from '../../style';

[vw, vh, vmin, vmax] = dimensions

const UserMessage = (props) => {
    const {style, children, ...rest} = props;
    const {time} = props;

    return(
        <View style={styles.messageContainer}>
            <View style={styles.messageBubble}>
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
    },
    messageBubble: {
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
    }
})

export default UserMessage;