import { View, Text, Image } from "react-native";
import { IconButton } from "react-native-paper";
import { palette } from "../../style";
import { StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

const ChatHeader = (props) => {
    const {style, children, images, location, date, ...rest} = props;
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

            <View style={styles.main}>
                <View style={styles.profilePicsGroup}>
                    {images}
                </View>
                <View style={styles.mainText}>
                    <Image source={location.flag} style={styles.mainImg}/>
                    <Text style={styles.title}>{location.name} | {date}</Text>
                </View>
            </View>

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
        borderBottomWidth: 1,
        borderColor: palette.lightGrey,
    },
    icon: {
        margin: 0
    },
    title: {
        fontFamily: 'Montserrat-Bold',
        fontSize: 2.8 * vh,
        paddingBottom: 0.5 * vh,
        letterSpacing: -0.2 * vh
    },
    main: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    mainImg: {
        resizeMode: 'contain',
        height: '70%',
    },
    mainText: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 3 * vh,
    },
    profilePicsGroup: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: -2 * vh
    },
})


export default ChatHeader;