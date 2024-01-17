import { ChatFooter, ChatHeader, JoinedMessage, UserMessage, Message } from "../components";
import { StyleSheet, Keyboard, TouchableWithoutFeedback, View } from "react-native";
import { palette, dimensions } from "../style";

[vw, vh, vmin, vmax] = dimensions

export default ChatScreen = ({ navigation }) => {
    const currentUserId = "2";

    const members = [
        {
            id: "1",
            name: 'Jane',
            profilePic: require('../../assets/images/profilePics/1.jpg'),
        },
        {
            id: "2",
            name: 'Gunpei',
            profilePic: require('../../assets/images/profilePics/2.jpg'),
        },
        {
            id: "3",
            name: 'Peter',
            profilePic: require('../../assets/images/profilePics/3.jpg'),
        },
        {
            id: "4",
            name: 'Summer',
            profilePic: require('../../assets/images/profilePics/4.jpg'),
        },
        {
            id: "5",
            name: 'Miryam',
            profilePic: require('../../assets/images/profilePics/5.jpg'),
        },
        {
            id: "6",
            name: 'Ambuj',
            profilePic: require('../../assets/images/profilePics/6.jpg'),
        },
        {
            id: "7",
            name: 'Craig',
            profilePic: null
        },
        {
            id: "8",
            name: 'Mary',
            profilePic: null
        }
    ]

    const messages = [
        {
            authorId: "1",
            message: "I found this group accommodation in Rio de Janeiro, check it out"
        },
        {
            authorId: "2",
            message: "looks great 😍"
        },
        {
            authorId: "3",
            message: "I love it, it’s so close to the beach and other attractions 🏝🎡"
        },
        {
            authorId: "7",
            joined: true
        }
    ]

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={styles.page}>
                <ChatHeader />
                <View style={styles.messagesGroup}>
                    {
                        messages.map((m) => {
                            if(m.joined)
                                return <JoinedMessage>{members.find((u) => u.id === m.authorId)}</JoinedMessage>
                            else if(m.authorId === currentUserId)
                                return(<UserMessage>{m.message}</UserMessage>)
                            else
                                return(<Message>{m.message}</Message>)
                        })
                    }
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