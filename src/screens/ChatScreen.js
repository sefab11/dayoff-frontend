import { ChatFooter, ChatHeader, JoinedMessage, UserMessage, Message } from "../components";
import { StyleSheet, Keyboard, TouchableWithoutFeedback, View, Image, ScrollView } from "react-native";
import { palette, dimensions, flags } from "../style";
import React, { useState, useEffect } from "react";

import UserService from "../services/UserService";
const { getUserData } = UserService;
import TripsService from "../services/TripsService";
const { getTripInfo } = TripsService;
import MessageService from "../services/MessageService";
const { getMessages, sendMessage } = MessageService;


[vw, vh, vmin, vmax] = dimensions

const formatTime = (time) => {
    // if theres no time then return null
    if (!time) return null;

    // if theres a date then parse it and format it into hh:mm am/pm
    var parsedTime = new Date(time);

    var hours = parsedTime.getHours();
    var mins = parsedTime.getMinutes();

    if (hours < 12){
        return ("0" + hours + ":" + mins + " AM");
    }
    else return ("0" + (hours-12) + ":" + mins + " PM");
}


export default ChatScreen = ({ navigation }) => {
    const trip = global.currentTrip;
    // TODO: change to global.emailAddress
    const currentUserId = 'sepehr@gmail.com';

    // get messages based on current trip id
    async function getChatMessages(){
        var tempMessages = [];
        // get messages from backend
        await getMessages(trip.trip_id)
        .then(response => {
            response = JSON.parse(response).messages;

            // set tempMessages to all the messages;
            tempMessages = response;
        })
        .then(() => {
            // set messages to temp messages
            setMessages(tempMessages);
        })
    }

    async function sendChatMessage(){
        await sendMessage(trip.trip_id, 'sepehr@gmail.com', sentMessage)
        .then(status => {
            if (status === 200) console.log("message sent");
            else console.log("an error occurred");
        })
    }

    /* TODO:
        get participants based on trip id -> loop through each user email to get
        their user_name and profilePic from user db
    */
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
            id: "sepehrb@gmail.com",
            name: 'Miryam',
            profilePic: require('../../assets/images/profilePics/5.jpg'),
        },
        {
            id: "sepehr@gmail.com",
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

    const [messages, setMessages] = useState(null);
    const [sentMessage, setSentMessage] = useState("");

    useEffect(() => {
    // everytime sent message is updated then send message to db and refresh messages
        getChatMessages();
        if (sentMessage != "") sendChatMessage();
    }, [sentMessage])


    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={styles.page}>
                <ChatHeader
                images={members.map((member) =>
                member.profilePic != null
                ? <Image style={styles.profilePic} source={member.profilePic} />
                : null
                )}
                />
                <ScrollView>
                    <TouchableWithoutFeedback>
                        <View style={styles.messagesGroup}>
                            {messages ?
                                messages.map((m) => {
                                    // TODO: add joined boolean variable to message object in db
                                    if(m.joined)
                                        return (<JoinedMessage>{members.find((u) => u.id === m.sender).name}</JoinedMessage>)
                                    else if(m.sender === currentUserId)
                                        return(
                                        <UserMessage
                                        time={formatTime(m.timestamp)}>
                                            {m.message}
                                        </UserMessage>
                                        )
                                    else
                                        return(
                                        <Message
                                        imageSrc={members.find((u) => u.id === m.sender).profilePic}
                                        name={members.find((u) => u.id === m.sender).name}
                                        time={formatTime(m.timestamp)}>
                                            {m.message}
                                        </Message>
                                        )
                                })
                            : null
                            }
                        </View>
                    </TouchableWithoutFeedback>
                </ScrollView>
                <ChatFooter
                    setSentMessage={setSentMessage}
                />
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