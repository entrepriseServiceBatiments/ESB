// Chat.jsx
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import io from "socket.io-client";
import { BASE_URL } from "../private.json";
const Chat = ({ route }) => {
  const { workerId, clientId } = route.params;
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [conversationId, setConversationId] = useState(null);
  const socket = io(`${BASE_URL}`);

  useEffect(() => {
    socket.emit("joinconvo", { clientId, workerId });
    socket.on("conversationId", (id) => {
      setConversationId(id);
      fetchOldMessages(id);
    });

    socket.on("messagecoming", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const fetchOldMessages = (id) => {
    socket.emit("oldmsgs", { conversationid: id });
    socket.on("messages", (msgs) => {
      setMessages(msgs);
    });
  };

  const handleSend = () => {
    if (newMessage.trim()) {
      socket.emit("sendmsg", {
        workerId,
        clientId,
        content: newMessage,
        conversationid: conversationId,
        sender: clientId, // Assuming sender is the client
      });
      setNewMessage("");
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View
            style={
              item.sender === clientId ? styles.myMessage : styles.theirMessage
            }
          >
            <Text>{item.content}</Text>
          </View>
        )}
      />
      <TextInput
        style={styles.input}
        value={newMessage}
        onChangeText={setNewMessage}
      />
      <Button title="Send" onPress={handleSend} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  myMessage: {
    alignSelf: "flex-end",
    backgroundColor: "#dcf8c6",
    padding: 10,
    marginVertical: 5,
    borderRadius: 10,
  },
  theirMessage: {
    alignSelf: "flex-start",
    backgroundColor: "#f1f1f1",
    padding: 10,
    marginVertical: 5,
    borderRadius: 10,
  },
});

export default Chat;
