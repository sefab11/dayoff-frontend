import { Text, View, StyleSheet } from "react-native";
import { dimensions, palette } from '../../style';

[vw, vh, vmin, vmax] = dimensions

const JoinedMessage = (props) => {
    const {style, children, ...rest} = props;

    return(
        <View style={styles.messageBubble}>
            <Text style={styles.message}>
                ➡️  <Text style={styles.name}>{children}</Text> joined
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    messageBubble: {
        alignSelf: 'center',
        padding: 2 * vh,
        borderRadius: 5 * vh,
        borderBottomLeftRadius: 0
    },
    message: {
        color: palette.black,
        fontFamily: "Lato-Regular",
        fontSize: 4.5 * vmin,
    },
    name: {
        color: palette.black,
        fontFamily: "Lato-Bold",
        fontSize: 4.5 * vmin,
    }
})

export default JoinedMessage;