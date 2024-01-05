import { View, Text } from "react-native";
import { IconButton } from "react-native-paper";
import { palette } from "../../style";
import { StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

const ChatHeader = (props) => {
    const {style, children, ...rest} = props;
    const navigation = useNavigation();
    
    return(
        <View style={{...styles.header, ...style}} {...rest}>
            <IconButton
                style={styles.icon}
                icon={require('../../../assets/icons/chevron_left.png')}
                iconColor={palette.black}
                size={4 * vh}
                onPress={() => navigation.goBack()}
            />
            <IconButton
                style={{...styles.icon, marginRight: 1 * vh}}
                icon={require('../../../assets/icons/hamburger.png')}
                iconColor={palette.black}
                size={4 * vh}
                onPress={() => {}}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        width: 100 * vw,
        justifyContent: 'space-between',
        paddingBottom: 2 * vh,
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


export default ChatHeader;