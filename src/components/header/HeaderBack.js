import { View, Text } from "react-native";
import { IconButton } from "react-native-paper";
import { palette } from "../../style";
import { StyleSheet } from "react-native";

const HeaderBack = (props) => {
    const {style, children, ...rest} = props
    return (
        <View style={{...styles.header, ...style}} {...rest}>
            <IconButton
                style={styles.icon}
                icon={require('../../../assets/icons/chevron_left.png')}
                iconColor={palette.black}
                size={4 * vh}
                onPress={() => console.log('Pressed')}
            />
            <Text style={styles.title}>{children}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        width: 100 * vw,
        alignItems: 'center'
    },
    icon: {
        margin: 0
    },
    title: {
        fontFamily: 'Montserrat-Bold',
        fontSize: 5 * vh,
        paddingBottom: 0.5 * vh,
        letterSpacing: -0.2 * vh
    }
})

export default HeaderBack;