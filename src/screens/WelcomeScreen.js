import { StyleSheet } from "react-native"
import { View, Text } from "react-native"
import { Button } from "../components"
import { palette } from "../style"
import { themes } from "../style"
import { dimensions } from "../style"

[vw, vh, vmin, vmax] = dimensions

export default WelcomeScreen = ({ navigation }) => {
    return (
        <View style={styles.page}>
            <View style={styles.buttonGroup}>
                <Button mode='outlined' theme={themes.buttonAlt} style={styles.button}>Sign in to account</Button>
                <Button mode='contained' theme={themes.buttonAlt} style={styles.button}>Create account</Button>
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
    buttonGroup: {
        gap: 5 * vmin
    },
    button: {
        width: 70 * vmin
    }
})