import {
  ChatFooter,
  ChatHeader,
  JoinedMessage,
  UserMessage,
  Message,
  ImageMessage,
  UserImageMessage,
} from "../components";
import {
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  Text,
} from "react-native";
import { palette, dimensions, flags } from "../style";
import React, { useState, useEffect } from "react";
// import { StreamChat } from "stream-chat";
// import { Chat } from "stream-chat-expo";

import UserService from "../services/UserService";
const { getUserData } = UserService;
import MessageService from "../services/MessageService";
const { getMessages, sendMessage } = MessageService;

[vw, vh, vmin, vmax] = dimensions;

const formatTime = (time) => {
  if (!time) return null;
  const parsedTime = new Date(time);
  let formattedTime = parsedTime
    .toLocaleTimeString()
    .replace(/([\d]:[\d]{2})(:[\d]{2})(.*)/, "$1$3");
  if (formattedTime.length === 7) formattedTime = "0" + formattedTime;
  return formattedTime;
};

const ChatScreen = ({ navigation }) => {
  const trip = global.currentTrip;
  const currentUserId = global.currentUser?.email_id;

  if (!currentUserId) {
    return <LoginScreen />;
  }

  const [members, setMembers] = useState([]);
  const [messages, setMessages] = useState(null);
  const [sentMessage, setSentMessage] = useState("");

  const [streamToken, setStreamToken] = useState(null);
  const [chatClient, setChatClient] = useState(null);
  const [channel, setChannel] = useState(null);

  useEffect(() => {
    getMembers();
    // getStreamToken();
  }, []);

  // useEffect(() => {
  //   if (streamToken) {
  //     const client = StreamChat.getInstance("9gz3ex6uev76");
  //     client.connectUser(
  //       {
  //         id: currentUserId,
  //         name: global.currentUser?.name,
  //         image: global.currentUser?.profile_picture,
  //       },
  //       streamToken
  //     );

  //     const newChannel = client.channel("messaging", trip.trip_id);
  //     newChannel.watch();

  //     setChatClient(client);
  //     setChannel(newChannel);

  //     getChatMessages(newChannel);
  //   }
  // }, [streamToken]);

  // async function getStreamToken() {
  //   try {
  //     const response = await fetch("http://127.0.0.1:8000/get-stream-token", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ user_id: currentUserId }),
  //     });
  //     const data = await response.json();
  //     const { token } = data;
  //     setStreamToken(token);
  //   } catch (error) {
  //     console.error("Error fetching Stream Chat token:", error);
  //   }
  // }

  useEffect(() => {
    getChatMessages();
    if (sentMessage) sendChatMessage();
  }, [sentMessage]);

  async function getMembers() {
    for (let i = 0; i < trip.participants.length; i++) {
      const member = trip.participants[i];
      await getUserData(member).then((data) => {
        setMembers((m) => [...m, data]);
      });
    }
  }

  async function getChatMessages() {
    await getMessages(trip.trip_id).then((response) => {
      response = JSON.parse(response).messages;
      setMessages(response);
    });
  }
  // async function handleSend(message) {
  //   if (channel) {
  //     channel.sendMessage({
  //       text: message,
  //     });
  //   }
  // }
  async function sendChatMessage() {
    await sendMessage(trip.trip_id, currentUserId, sentMessage.msg).then(
      (status) => {
        if (status === 200) console.log("Message sent");
        else console.log("An error occurred");
      }
    );
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.page}>
        <ChatHeader
          images={members.map((member, index) =>
            member && member.profile_picture != null ? (
              <Image
                key={index}
                style={styles.profilePic}
                // source={member.profile_picture}
                source={{ uri: member.profile_picture }}
              />
            ) : null
          )}
        />
        <ScrollView>
          {/* <Chat client={chatClient} style={styles.chat}>
            <Channel channel={channel}> */}
          <View style={styles.messagesGroup}>
            {members && members.length > 0 && messages
              ? messages.map((m) => {
                  const sender = members.find(
                    (u) => u && u.email_id === m.sender
                  );
                  if (!sender) return;
                  else if (m.joined) {
                    return (
                      <JoinedMessage key={m.id} username={sender.user_name} />
                    );
                  } else if (m.sender === currentUserId) {
                    return (
                      <UserImageMessage
                        key={m.id}
                        time={formatTime(m.timestamp)}
                        photo={require("../../assets/images/welcome_screen/photo2.png")}
                      >
                        {JSON.stringify(m.message)}{" "}
                        {/* Stringifying the 'm.message' object */}
                      </UserImageMessage>
                    );
                  } else {
                    return (
                      <Message
                        key={m.id}
                        profilePicSrc={sender ? sender.profile_picture : photo}
                        name={sender ? sender.user_name : "Unknown User"}
                        time={formatTime(m.timestamp)}
                      >
                        {JSON.stringify(m.message)}{" "}
                        {/* Stringifying the 'm.message' object */}
                      </Message>
                    );
                  }
                })
              : null}
          </View>
          {/* <MessageInput
                onSend={handleSend}
                styles={{ inputBox: styles.messageInput }}
                placeholder="Type a message..."
              />
            </Channel>
          </Chat> */}
        </ScrollView>
        <ChatFooter setSentMessage={sendChatMessage} />
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  page: {
    paddingTop: 3 * vh,
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: palette.white,
  },
  messagesGroup: {
    width: 100 * vmin,
    display: "flex",
    flexDirection: "column",
    padding: 2 * vh,
    gap: 1 * vh,
  },
  profilePic: {
    display: "flex",
    width: 12 * vmin,
    height: 12 * vmin,
    backgroundColor: palette.purple,
    borderRadius: 6 * vmin,
    borderColor: palette.white,
    borderWidth: 0.8 * vmin,
  },
});
export default ChatScreen;
