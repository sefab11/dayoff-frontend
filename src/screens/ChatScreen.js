import { ChatFooter, ChatHeader, JoinedMessage, UserMessage, Message } from "../components";
import { StyleSheet, Keyboard, TouchableWithoutFeedback, View } from "react-native";
import { palette } from "../style";

export default ChatScreen = ({ navigation }) => {

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={styles.page}>
                <ChatHeader />
                <View style={styles.inputGroup}>
                    <Message />
                    <UserMessage />
                    <JoinedMessage />
                </View>
                <ChatFooter />
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    page: {
        marginTop: 5 * vh,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: palette.white
    }
})