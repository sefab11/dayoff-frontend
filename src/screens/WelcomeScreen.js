import { ImageBackground, StyleSheet } from "react-native"
import { View, Text } from "react-native"
import { Button, Image } from "../components"
import { palette } from "../style"
import { themes } from "../style"
import { dimensions } from "../style"

[vw, vh, vmin, vmax] = dimensions

export default WelcomeScreen = ({ navigation }) => {
    return (
        <View style={styles.page}>
            <Image style={styles.logo} source={require('../../assets/logo.png')}></Image>
            <View style={styles.photoGroup}>
                <View style={{alignItems: 'flex-end', paddingTop: 3 * vh, ...styles.photoColumn}}>
                    <ImageBackground style={styles.photoContainerA} source={require('../../assets/images/welcome_screen/photo1.png')} />
                    <ImageBackground style={styles.photoContainerB} source={require('../../assets/images/welcome_screen/photo3.png')} />
                </View>
                <View style={styles.photoColumn}>
                    <ImageBackground style={styles.photoContainerB} source={require('../../assets/images/welcome_screen/photo2.png')} />
                    <ImageBackground style={styles.photoContainerA} source={require('../../assets/images/welcome_screen/photo4.png')} />
                </View>
            </View>
            <View style={styles.buttonGroup}>
                <Button
                    onPress={() => navigation.navigate('Login')}
                    mode='outlined'
                    theme={themes.buttonAlt}
                    style={styles.button}
                >
                    Sign in to account
                </Button>
                <Button
                    onPress={() => navigation.navigate('Register')}
                    mode='contained'
                    theme={themes.buttonAlt}
                    style={styles.button}
                >
                    Create account
                </Button>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    page: {
        backgroundColor: palette.purple,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    logo: {
        marginTop: 5 * vh,
        height: 30 * vmin,
    },
    photoGroup: {
        flexDirection: 'row',
        gap: 3 * vmin,
    },
    photoColumn: {
        flexDirection: 'column',
        gap: 3 * vmin,
    },
    photoContainerA: {
        width: 18 * vh,
        height: 25 * vh
    },
    photoContainerB: {
        width: 25 * vh,
        height: 20 * vh
    },
    buttonGroup: {
        gap: 5 * vmin,
        marginTop: 5 * vh,
        marginBottom: 5 * vh
    },
    button: {
        width: 80 * vmin,
        height: 14 * vmin,
        justifyContent: 'center',
        paddingBottom: 0.5 * vmin
    }
})