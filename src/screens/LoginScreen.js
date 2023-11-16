import { View } from "react-native";
import { StyleSheet } from "react-native";
import { HeaderBack } from "../components";

export default LoginScreen = ({ navigation }) => {
    return (
        <View style={styles.page}>
            <HeaderBack>Login</HeaderBack>
        </View>
    );
}

const styles = StyleSheet.create({
    page: {
        marginTop: 5 * vh,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between'
    }
})