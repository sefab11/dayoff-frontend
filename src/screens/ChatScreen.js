import { ChatFooter, ChatHeader, JoinedMessage, UserMessage, Message } from "../components";
import { StyleSheet, Keyboard, TouchableWithoutFeedback, View, Image, ScrollView } from "react-native";
import { palette, dimensions, flags } from "../style";
import UserService from "../services/UserService";

const { getMessages, sendMessage } = UserService;
[vw, vh, vmin, vmax] = dimensions

export default ChatScreen = ({ navigation }) => {
    const trip = global.currentTrip;

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
        },
    ]

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={styles.page}>
                <ChatHeader
                images={members.map((member) =>
                member.profilePic != null
                ? <Image style={styles.profilePic} source={member.profilePic} />
                : null
                )}
                location={{'flag': flags.BR, 'name': 'Brazil'}}
                date={'02 - 10 Oct'}
                />
                <ScrollView>
                    <TouchableWithoutFeedback>
                        <View style={styles.messagesGroup}>
                            {
                                messages.map((m) => {
                                    if(m.joined)
                                        return (<JoinedMessage>{members.find((u) => u.id === m.authorId).name}</JoinedMessage>)
                                    else if(m.authorId === currentUserId)
                                        return(
                                        <UserMessage
                                        time={'9:50AM'}>
                                            {m.message}
                                        </UserMessage>
                                        )
                                    else
                                        return(
                                        <Message
                                        imageSrc={members.find((u) => u.id === m.authorId).profilePic}
                                        name={members.find((u) => u.id === m.authorId).name}
                                        time={'9:22AM'}>
                                            {m.message}
                                        </Message>
                                        )
                                })
                            }
                        </View>
                    </TouchableWithoutFeedback>
                </ScrollView>
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
        width: 100 * vmin,
        display: 'flex',
        flexDirection: 'column',
        padding: 2 * vh,
        gap: 1 * vh
    },
    profilePic: {
        display: 'flex',
        width: 12 * vmin,
        height: 12 * vmin,
        backgroundColor: palette.purple,
        borderRadius: 6 * vmin,
        borderColor: palette.white,
        borderWidth: 0.8 * vmin,
    },
})