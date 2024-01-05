import { Text, View, StyleSheet } from "react-native";
import { dimensions, palette } from '../../style';

[vw, vh, vmin, vmax] = dimensions

const UserMessage = (props) => {
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
    }
})

export default UserMessage;