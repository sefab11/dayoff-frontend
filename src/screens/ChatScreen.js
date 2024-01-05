import { ChatFooter, ChatHeader, JoinedMessage, UserMessage, Message } from "../components";
import { StyleSheet, Keyboard, TouchableWithoutFeedback, View } from "react-native";
import { palette, dimensions } from "../style";

[vw, vh, vmin, vmax] = dimensions

export default ChatScreen = ({ navigation }) => {

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={styles.page}>
                <ChatHeader />
                <View style={styles.messagesGroup}>
                    <Message>I found this group accommodation in Rio de Janeiro, check it out</Message>
                    <UserMessage>looks great 😍</UserMessage>
                    <Message>I love it, it’s so close to the beach and other attractions 🏝🎡</Message>
                </View>
                <ChatFooter />
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    page: {
        paddingTop: 3 * vh,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: palette.white
    },
    messagesGroup: {
        width: 100 * vw,
        flex: 1,
        padding: 2 * vh,
        gap: 1 * vh
    }
})