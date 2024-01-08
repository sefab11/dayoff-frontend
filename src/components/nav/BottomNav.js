import { View, Text, Image, TouchableWithoutFeedback } from "react-native";
import { StyleSheet } from "react-native";
import { dimensions, palette } from "../../style";
import { useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";

[vw, vh, vmin, vmax] = dimensions

const BottomNav = (props) => {
    const {style, children, active, ...rest} = props

    const route = useRoute()
    const navigation = useNavigation()
    const [activeNav, setActiveNav] = useState(active);

    const navUpdate = (value) => {
        if (value != route.name) {
            setActiveNav(value);
            navigation.navigate(value)
        }
    }

    return (
        <View style={{...styles.footer, ...style}} {...rest}>
            <TouchableWithoutFeedback onPress={() => navUpdate("Home")}>
                {
                    activeNav == "Home" ?
                    <View style={styles.navButton}>
                        <Image style={styles.navIconActive} source={require('../../../assets/icons/home_solid.png')} />
                        <Text style={styles.navLabelActive}>Home</Text>
                    </View> :
                    <View style={styles.navButton}>
                        <Image style={styles.navIcon} source={require('../../../assets/icons/home.png')} />
                        <Text style={styles.navLabel}>Home</Text>
                    </View>
                }
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={() => navUpdate("Trips")}>
                {
                    activeNav == "Trips" ?
                    <View style={styles.navButton}>
                        <Image style={styles.navIconActive} source={require('../../../assets/icons/people_solid.png')} />
                        <Text style={styles.navLabelActive}>My Trips</Text>
                    </View> :
                    <View style={styles.navButton}>
                        <Image style={styles.navIcon} source={require('../../../assets/icons/people.png')} />
                        <Text style={styles.navLabel}>My Trips</Text>
                    </View>
                }
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={() => navUpdate("MyProfile")}>
                {
                    activeNav == "MyProfile" ?
                    <View style={styles.navButton}>
                        <Text style={styles.profilePicActive} >J</Text>
                        <Text style={styles.navLabelActive}>Profile</Text>
                    </View> :
                    <View style={styles.navButton}>
                        <Text style={styles.profilePic} >J</Text>
                        <Text style={styles.navLabel}>Profile</Text>
                    </View>
                }
            </TouchableWithoutFeedback>
        </View>
    )
}

const styles = StyleSheet.create({
    footer: {
        height: 12 * vh,
        flexDirection: 'row',
        width: 100 * vw,
        backgroundColor: palette.black,
        borderTopLeftRadius: 4 * vw,
        borderTopRightRadius: 4 * vw,
        justifyContent: 'space-around',
        padding: 3.2 * vw
    },
    navButton: {
        width: 20 * vw,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: 0.5 * vh
    },
    navIcon: {
        tintColor: palette.white,
        height: 3.2 * vh,
        marginTop: 1 * vh,
        resizeMode: 'contain'
    },
    navIconActive: {
        tintColor: palette.purple,
        height: 3.2 * vh,
        marginTop: 1 * vh,
        resizeMode: 'contain'
    },
    navLabel: {
        color: palette.white,
        fontSize: 1.8 * vh
    },
    navLabelActive: {
        color: palette.purple,
        fontSize: 1.8 * vh
    },
    profilePic: {
        display: 'flex',
        width: 4.2 * vh,
        height: 4.2 * vh,
        borderRadius: 2.1 * vh,
        textAlign: 'center',
        textAlignVertical: 'center',
        fontFamily: 'Lato-Bold',
        fontSize: 2.1 * vh,
        color: palette.white,
        borderColor: palette.white,
        borderWidth: 0.3 * vh,
    },
    profilePicActive: {
        display: 'flex',
        width: 4.2 * vh,
        height: 4.2 * vh,
        borderRadius: 2.1 * vh,
        textAlign: 'center',
        textAlignVertical: 'center',
        fontFamily: 'Lato-Bold',
        fontSize: 2.1 * vh,
        color: palette.purple,
        borderColor: palette.purple,
        borderWidth: 0.3 * vh,
    }
})

export default BottomNav;