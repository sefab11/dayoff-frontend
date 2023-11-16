import { View, Text } from "react-native";
import { StyleSheet } from "react-native";
import { dimensions } from "../../style";

[vw, vh, vmin, vmax] = dimensions

const Header = (props) => {
    const {style, children, ...rest} = props
    return (
        <View style={{...styles.header, ...style}} {...rest}>
            <Text style={styles.title}>{children}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        paddingLeft: 4 * vmin,
        width: 100 * vw
    },
    title: {
        fontFamily: 'Montserrat-Bold',
        fontSize: 5 * vh,
        letterSpacing: -0.2 * vh,
        marginLeft: 2 * vmin
    }
})

export default Header;