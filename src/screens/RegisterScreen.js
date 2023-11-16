import { View, Text } from "react-native";
import { Header } from "../components";
import { StyleSheet } from "react-native";

export default RegisterScreen = ({ navigation }) => {
    return (
        <View style={styles.page}>
            <Header>Register</Header>
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