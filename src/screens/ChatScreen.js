// import {
//   ChatFooter,
//   ChatHeader,
//   JoinedMessage,
//   UserMessage,
//   Message,
//   ImageMessage,
//   UserImageMessage,
// } from "../components";
// import {
//   StyleSheet,
//   Keyboard,
//   TouchableWithoutFeedback,
//   View,
//   Image,
//   ScrollView,
// } from "react-native";
// import { palette, dimensions, flags } from "../style";
// import React, { useState, useEffect } from "react";

// import UserService from "../services/UserService";
// const { getUserData } = UserService;
// import MessageService from "../services/MessageService";
// const { getMessages, sendMessage } = MessageService;

// [vw, vh, vmin, vmax] = dimensions;

// const formatTime = (time) => {
//   // if theres no time then return null
//   if (!time) return null;

//   // if theres a date then parse it and format it into hh:mm am/pm
//   var parsedTime = new Date(time);
//   var formattedTime = "";
//   const hours = parsedTime.getHours();
//   if (hours < 10 || (hours > 12 && hours < 22)) formattedTime += "0";

//   formattedTime += parsedTime
//     .toLocaleTimeString()
//     .replace(/([\d]:[\d]{2})(:[\d]{2})(.*)/, "$1$3");

//   return formattedTime;
// };

// export default ChatScreen = ({ navigation }) => {
//   const trip = global.currentTrip;
//   //console.log(trip);
//   const currentUserId = global.currentUser?.email_id;
//   if (!currentUserId) {
//     // Handle the case where currentUser is undefined, such as redirecting to the login screen
//     return <LoginScreen />; // Adjust this to your actual login screen component
//   }

//   // get messages based on current trip id
//   async function getChatMessages() {
//     var tempMessages = [];
//     // get messages from backend
//     await getMessages(trip.trip_id)
//       .then((response) => {
//         response = JSON.parse(response).messages;

//         // set tempMessages to all the messages;
//         tempMessages = response;
//       })
//       .then(() => {
//         // set messages to temp messages
//         setMessages(tempMessages);
//       });
//   }

//   async function sendChatMessage() {
//     await sendMessage(trip.trip_id, currentUserId, sentMessage.msg).then(
//       (status) => {
//         if (status === 200) console.log("message sent");
//         else console.log("an error occurred");
//       }
//     );
//   }

//   /* TODO:
//         get participants based on trip id -> loop through each user email to get
//         their user_name and profilePic from user db
//     */

//   async function getMembers() {
//     for (let i = 0; i < trip.participants.length; i++) {
//       const member = trip.participants[i];
//       await getUserData(member).then((data) => {
//         setMembers((m) => [...m, data]);
//       });
//     }

//     //setMembers(members);
//     //console.log("b" + JSON.stringify(members));
//   }

//   const [members, setMembers] = useState([]);
//   const [messages, setMessages] = useState(null);
//   const [sentMessage, setSentMessage] = useState("");

//   useEffect(() => {
//     getMembers();
//   }, [members == []]);

//   useEffect(() => {
//     // everytime sent message is updated then send message to db and refresh messages
//     getChatMessages();
//     console.log(sentMessage);

//     if (sentMessage != "") sendChatMessage();
//     setSentMessage("");
//   }, [sentMessage]);

//   return (
//     <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
//       <View style={styles.page}>
//         <ChatHeader
//           images={members.map((member, index) =>
//             member && member.profile_picture != null ? (
//               <Image
//                 key={index}
//                 style={styles.profilePic}
//                 source={member.profile_picture}
//               />
//             ) : null
//           )}
//         />
//         <ScrollView>
//           {/* <TouchableWithoutFeedback>
//             <View style={styles.messagesGroup}>
//               {messages && members.length > 0
//                 ? messages.map((m) => {
//                     //console.log("a" + JSON.stringify(m));
//                     if (!m) return;
//                     // TODO: add joined/left boolean variable to message object in db
//                     else if (m.joined)
//                       return (
//                         <JoinedMessage>
//                           {
//                             members.find((u) => u.email_id === m.sender)
//                               .username
//                           }
//                         </JoinedMessage>
//                       );
//                     else if (m.sender === currentUserId)
//                       return (
//                         <UserImageMessage
//                           time={formatTime(m.timestamp)}
//                           photo={require("../../assets/images/welcome_screen/photo2.png")}
//                         >
//                           {m.message}
//                         </UserImageMessage>
//                       );
//                     //console.log("b" + members.length);
//                     else
//                       return (
//                         <Message
//                           profilePicSrc={
//                             members.find((u) => u.email_id === m.sender)
//                               .profile_picture
//                           }
//                           name={
//                             members.find((u) => u.email_id === m.sender)
//                               .username
//                           }
//                           time={formatTime(m.timestamp)}
//                         >
//                           {m.message}
//                         </Message>
//                       );
//                   })
//                 : null}
//             </View>
//           </TouchableWithoutFeedback> */}
//           <TouchableWithoutFeedback>
//             <View style={styles.messagesGroup}>
//               {members && members.length > 0 && messages
//                 ? messages.map((m) => {
//                     // const sender = members.find((u) => u.email_id === m.sender);
//                     const sender = members.find(
//                       (u) => u && u.email_id === m.sender
//                     );

//                     if (!sender) return;
//                     else if (m.joined) {
//                       // return <JoinedMessage>{sender.username}</JoinedMessage>;
//                       <JoinedMessage key={m.id} username={sender.user_name} />;
//                     } else if (m.sender === currentUserId) {
//                       return (
//                         <UserImageMessage
//                           time={formatTime(m.timestamp)}
//                           photo={require("../../assets/images/welcome_screen/photo2.png")}
//                         >
//                           {m.message}
//                         </UserImageMessage>
//                       );
//                     } else {
//                       return (
//                         <Message
//                           // profilePicSrc={sender.profile_picture}
//                           // name={sender.username}
//                           // time={formatTime(m.timestamp)}
//                           profilePicSrc={sender ? sender.profile_picture : null}
//                           name={sender ? sender.user_name : "Unknown User"}
//                           time={formatTime(m.timestamp)}
//                         >
//                           {m.message}
//                         </Message>
//                       );
//                     }
//                   })
//                 : null}
//             </View>
//           </TouchableWithoutFeedback>
//         </ScrollView>
//         <ChatFooter setSentMessage={setSentMessage} />
//       </View>
//     </TouchableWithoutFeedback>
//   );
// };

// const styles = StyleSheet.create({
//   page: {
//     paddingTop: 3 * vh,
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "space-between",
//     backgroundColor: palette.white,
//   },
//   messagesGroup: {
//     width: 100 * vmin,
//     display: "flex",
//     flexDirection: "column",
//     padding: 2 * vh,
//     gap: 1 * vh,
//   },
//   profilePic: {
//     display: "flex",
//     width: 12 * vmin,
//     height: 12 * vmin,
//     backgroundColor: palette.purple,
//     borderRadius: 6 * vmin,
//     borderColor: palette.white,
//     borderWidth: 0.8 * vmin,
//   },
// });

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
} from "react-native";
import { palette, dimensions, flags } from "../style";
import React, { useState, useEffect } from "react";

import UserService from "../services/UserService";
const { getUserData } = UserService;
import MessageService from "../services/MessageService";
const { getMessages, sendMessage } = MessageService;

[vw, vh, vmin, vmax] = dimensions;

// const formatTime = (time) => {
//   // if theres no time then return null
//   if (!time) return null;

//   // if theres a date then parse it and format it into hh:mm am/pm
//   var parsedTime = new Date(time);
//   var formattedTime = "";
//   const hours = parsedTime.getHours();
//   if (hours < 10 || (hours > 12 && hours < 22)) formattedTime += "0";

//   formattedTime += parsedTime
//     .toLocaleTimeString()
//     .replace(/([\d]:[\d]{2})(:[\d]{2})(.*)/, "$1$3");

//   return formattedTime;
// };

// export default ChatScreen = ({ navigation }) => {
//   const trip = global.currentTrip;
//   //console.log(trip);
//   const currentUserId = global.currentUser.email_id;

//   // get messages based on current trip id
//   async function getChatMessages() {
//     var tempMessages = [];
//     // get messages from backend
//     await getMessages(trip.trip_id)
//       .then((response) => {
//         response = JSON.parse(response).messages;

//         // set tempMessages to all the messages;
//         tempMessages = response;
//       })
//       .then(() => {
//         // set messages to temp messages
//         setMessages(tempMessages);
//       });
//   }

//   async function sendChatMessage() {
//     await sendMessage(trip.trip_id, currentUserId, sentMessage.msg).then(
//       (status) => {
//         if (status === 200) console.log("message sent");
//         else console.log("an error occurred");
//       }
//     );
//   }

//   /* TODO:
//         get participants based on trip id -> loop through each user email to get
//         their user_name and profilePic from user db
//     */

//   async function getMembers() {
//     for (let i = 0; i < trip.participants.length; i++) {
//       const member = trip.participants[i];
//       await getUserData(member).then((data) => {
//         setMembers((m) => [...m, data]);
//       });
//     }

//     //setMembers(members);
//     //console.log("b" + JSON.stringify(members));
//   }

//   const [members, setMembers] = useState([]);
//   const [messages, setMessages] = useState(null);
//   const [sentMessage, setSentMessage] = useState("");

//   useEffect(() => {
//     getMembers();
//   }, [members == []]);

//   useEffect(() => {
//     // everytime sent message is updated then send message to db and refresh messages
//     getChatMessages();
//     console.log(sentMessage);

//     if (sentMessage != "") sendChatMessage();
//     setSentMessage("");
//   }, [sentMessage]);

//   return (
//     <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
//       <View style={styles.page}>
//         <ChatHeader
//           images={members.map((member) =>
//             member.profile_picture != null ? (
//               <Image
//                 style={styles.profilePic}
//                 source={member.profile_picture}
//               />
//             ) : null
//           )}
//         />
//         <ScrollView>
//           <TouchableWithoutFeedback>
//             <View style={styles.messagesGroup}>
//               {messages && members.length > 0
//                 ? messages.map((m) => {
//                     //console.log("a" + JSON.stringify(m));
//                     if (!m) return;
//                     // TODO: add joined/left boolean variable to message object in db
//                     else if (m.joined)
//                       return (
//                         <JoinedMessage>
//                           {
//                             members.find((u) => u.email_id === m.sender)
//                               .user_name
//                           }
//                         </JoinedMessage>
//                       );
//                     else if (m.sender === currentUserId)
//                       return (
//                         <UserImageMessage
//                           time={formatTime(m.timestamp)}
//                           photo={require("../../assets/images/welcome_screen/photo2.png")}
//                         >
//                           {m.message}
//                         </UserImageMessage>
//                       );
//                     //console.log("b" + members.length);
//                     else
//                       return (
//                         <Message
//                           profilePicSrc={
//                             members.find((u) => u.email_id === m.sender)
//                               ?.profile_picture
//                           }
//                           name={
//                             members.find((u) => u.email_id === m.sender)
//                               .user_name
//                           }
//                           time={formatTime(m.timestamp)}
//                         >
//                           {m.message}
//                         </Message>
//                       );
//                   })
//                 : null}
//             </View>
//           </TouchableWithoutFeedback>
//         </ScrollView>
//         <ChatFooter setSentMessage={setSentMessage} />
//       </View>
//     </TouchableWithoutFeedback>
//   );
// };
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

  useEffect(() => {
    getMembers();
  }, []);

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
                        {m.message}
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
                        {m.message}
                      </Message>
                    );
                  }
                })
              : null}
          </View>
        </ScrollView>
        <ChatFooter setSentMessage={setSentMessage} />
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
// import React, { useState, useEffect } from "react";
// import {
//   StyleSheet,
//   Keyboard,
//   TouchableWithoutFeedback,
//   View,
//   Image,
//   ScrollView,
// } from "react-native";
// import {
//   ChatFooter,
//   ChatHeader,
//   JoinedMessage,
//   UserImageMessage,
//   Message,
// } from "../components";
// import { palette, dimensions } from "../style";
// import UserService from "../services/UserService";
// import MessageService from "../services/MessageService";

// const { getUserData } = UserService;
// const { getMessages, sendMessage } = MessageService;
// const { vw, vh, vmin, vmax } = dimensions;

// const formatTime = (time) => {
//   if (!time) return null;
//   const parsedTime = new Date(time);
//   let formattedTime = parsedTime
//     .toLocaleTimeString()
//     .replace(/([\d]:[\d]{2})(:[\d]{2})(.*)/, "$1$3");
//   if (formattedTime.length === 7) formattedTime = "0" + formattedTime;
//   return formattedTime;
// };

// const ChatScreen = ({ navigation }) => {
//   const trip = global.currentTrip;
//   const currentUserId = global.currentUser?.email_id;

//   if (!currentUserId) {
//     return <LoginScreen />;
//   }

//   const [members, setMembers] = useState([]);
//   const [messages, setMessages] = useState(null);
//   const [sentMessage, setSentMessage] = useState("");

//   useEffect(() => {
//     getMembers();
//   }, []);

//   useEffect(() => {
//     getChatMessages();
//     if (sentMessage) sendChatMessage();
//   }, [sentMessage]);

//   async function getMembers() {
//     for (let i = 0; i < trip.participants.length; i++) {
//       const member = trip.participants[i];
//       await getUserData(member).then((data) => {
//         setMembers((m) => [...m, data]);
//       });
//     }
//   }

//   async function getChatMessages() {
//     await getMessages(trip.trip_id).then((response) => {
//       response = JSON.parse(response).messages;
//       setMessages(response);
//     });
//   }

//   async function sendChatMessage() {
//     await sendMessage(trip.trip_id, currentUserId, sentMessage.msg).then(
//       (status) => {
//         if (status === 200) console.log("Message sent");
//         else console.log("An error occurred");
//       }
//     );
//   }

//   return (
//     <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
//       <View style={styles.page}>
//         <ChatHeader
//           images={members.map((member, index) =>
//             member && member.profile_picture != null ? (
//               <Image
//                 key={index}
//                 style={styles.profilePic}
//                 source={member.profile_picture}
//               />
//             ) : null
//           )}
//         />
//         <ScrollView>
//           <View style={styles.messagesGroup}>
//             {members && members.length > 0 && messages
//               ? messages.map((m) => {
//                   const sender = members.find(
//                     (u) => u && u.email_id === m.sender
//                   );
//                   if (!sender) return;
//                   else if (m.joined) {
//                     return (
//                       <JoinedMessage key={m.id} username={sender.user_name} />
//                     );
//                   } else if (m.sender === currentUserId) {
//                     return (
//                       <UserImageMessage
//                         key={m.id}
//                         time={formatTime(m.timestamp)}
//                         photo={require("../../assets/images/welcome_screen/photo2.png")}
//                       >
//                         {m.message}
//                       </UserImageMessage>
//                     );
//                   } else {
//                     return (
//                       <Message
//                         key={m.id}
//                         profilePicSrc={sender ? sender.profile_picture : null}
//                         name={sender ? sender.user_name : "Unknown User"}
//                         time={formatTime(m.timestamp)}
//                       >
//                         {m.message}
//                       </Message>
//                     );
//                   }
//                 })
//               : null}
//           </View>
//         </ScrollView>
//         <ChatFooter setSentMessage={setSentMessage} />
//       </View>
//     </TouchableWithoutFeedback>
//   );
// };

// const styles = StyleSheet.create({
//   page: {
//     paddingTop: 3 * vh,
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "space-between",
//     backgroundColor: palette.white,
//   },
//   messagesGroup: {
//     width: 100 * vmin,
//     display: "flex",
//     flexDirection: "column",
//     padding: 2 * vh,
//     gap: 1 * vh,
//   },
//   profilePic: {
//     display: "flex",
//     width: 12 * vmin,
//     height: 12 * vmin,
//     backgroundColor: palette.purple,
//     borderRadius: 6 * vmin,
//     borderColor: palette.white,
//     borderWidth: 0.8 * vmin,
//   },
// });

export default ChatScreen;
