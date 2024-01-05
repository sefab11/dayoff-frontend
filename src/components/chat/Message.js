import { Text, View, StyleSheet } from "react-native";
import { dimensions, palette } from '../../style';

[vw, vh, vmin, vmax] = dimensions

const Message = (props) => {
    const {style, children, ...rest} = props;

    return(
        <View style={styles.messageBubble}>
            <Text style={styles.message}>
                {children}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
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
        fontSize: 4.5 * vmin,
    }
})

export default Message;