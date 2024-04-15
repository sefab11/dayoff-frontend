import { Text, View, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { dimensions, palette } from '../../style';

[vw, vh, vmin, vmax] = dimensions

const ImageMessage = (props) => {
    const {style, children, ...rest} = props;
    const {profilePicSrc, name, time, photo} = props;
    const navigation = useNavigation();

    return(
        <View style={styles.main}>
            <View style={styles.row1}>
                <TouchableOpacity style={styles.profileContainer}
                onPress={() => navigation.navigate('UserInfo')}>
                    <Image source={profilePicSrc} style={styles.profilePic} />
                    <Text style={styles.nameText}>{name}</Text>
                </TouchableOpacity>

                <View style={styles.messageContainer}>
                    <Image source={photo} style={styles.attachedPhoto} />
                    <Text style={styles.message}>
                        {children}
                    </Text>
                </View>
            </View>
            <View style={styles.row2}>
                <View style={styles.empty} />
                <Text style={styles.timeContainer}>
                    {time}
                </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    main: {
        width: 85 * vmin,
        height: 20 * vh,

        display: 'flex',
        flexDirection: 'column',
    },
    row1: {
        flex: 5, //defines how much to flex the component

        display: 'flex',
        flexDirection: 'row',
    },
    profileContainer: {
        flex: 1,

        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    messageContainer: {
        flex: 5,
        alignSelf: 'flex-start',
        padding: 2 * vh,
        borderRadius: 5 * vh,
        borderBottomLeftRadius: 0,
        backgroundColor: palette.lightPurple,

        display: 'flex',
        flexDirection: 'column',
        gap: 5,
    },

    row2: {
        flex: 1,

        display: 'flex',
        flexDirection: 'row',
    },
    empty: {
        flex: 1,
    },
    timeContainer: {
        flex: 5,

        textAlign: 'left',
        color: palette.grey,
        fontWeight: 'bold',
        fontSize: 3.8 * vmin,
        paddingTop: 1 * vh,
    },

    attachedPhoto: {
        flex: 1,
        width: undefined,
        height: undefined,
        borderRadius: 2.5 * vh,
        paddingBottom: 5 * vmin,
    },

    profilePic: {
        marginTop: 'auto',
        resizeMode: 'contain',
        width: 10 * vmin,
        height: 10 * vmin,
        borderRadius: 5 * vmin,
    },
    nameText: {
        fontWeight: 'bold',
        fontSize: 3.8 * vmin,
    },
    message: {
        color: palette.black,
        fontFamily: "Lato-Regular",
        fontSize: 4.2 * vmin,
        marginRight: 'auto',
        marginLeft: 5,
    },
})

export default ImageMessage;