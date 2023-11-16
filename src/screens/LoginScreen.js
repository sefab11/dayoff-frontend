import { View } from "react-native";
import { StyleSheet } from "react-native";
import { Header } from "../components";

export default LoginScreen = ({ navigation }) => {
    return (
        <View style={styles.page}>
            <Header>Login</Header>
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