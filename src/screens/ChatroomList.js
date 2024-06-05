import React, { useState, useEffect } from "react";
import { View, Button, TextInput, FlatList, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

const parseTripsToChatrooms = (trips) => {
  const chatrooms = [];

  trips.forEach((trip) => {
    const { location, startDate, endDate } = trip;

    // Add general chatroom for the trip
    const month = new Date(startDate).toLocaleString("default", {
      month: "long",
    });
    chatrooms.push({ name: `${location} ${month}`, tripId: trip.trip_id });

    // Calculate weekly chatrooms
    const start = new Date(startDate);
    const end = new Date(endDate);
    let current = new Date(start);

    let weekNumber = 1;
    while (current <= end) {
      const weekEnd = new Date(current);
      weekEnd.setDate(weekEnd.getDate() + 6);

      if (weekEnd > end) weekEnd.setDate(end.getDate());

      chatrooms.push({
        name: `${location} Week ${weekNumber}`,
        tripId: trip.trip_id,
      });

      weekNumber += 1;
      current.setDate(current.getDate() + 7);
    }
  });

  return chatrooms;
};

const trips = [
  {
    location: "Brazil",
    startDate: "2023-06-01",
    endDate: "2023-06-14",
    trip_id: "trip1",
  },
  // Add more trips as needed
];

const ChatroomList = () => {
  const navigation = useNavigation();
  const [customChatroomName, setCustomChatroomName] = useState("");
  const [chatrooms, setChatrooms] = useState([]);

  useEffect(() => {
    setChatrooms(parseTripsToChatrooms(trips));
  }, []);

  const createCustomChatroom = () => {
    if (customChatroomName.trim()) {
      setChatrooms((prevChatrooms) => [
        ...prevChatrooms,
        { name: customChatroomName, tripId: "custom" },
      ]);
      setCustomChatroomName("");
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={chatrooms}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <Button
            title={item.name}
            onPress={() =>
              navigation.navigate("Chat", {
                chatroomName: item.name,
                tripId: item.tripId,
              })
            }
          />
        )}
      />
      <TextInput
        value={customChatroomName}
        onChangeText={setCustomChatroomName}
        placeholder="Create a custom chatroom"
        style={styles.input}
      />
      <Button title="Create Chatroom" onPress={createCustomChatroom} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "gray",
    padding: 10,
    marginVertical: 10,
  },
});

export default ChatroomList;
