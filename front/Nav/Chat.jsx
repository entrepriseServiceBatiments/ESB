import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
} from "react-native";
import io from "socket.io-client";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwtDecode from "jwt-decode";

const Chat = () => {
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [clientId, setClientId] = useState(null);
  const [conversationId, setConversationId] = useState(null);

  useEffect(() => {
    const initSocket = async () => {
      const token = await AsyncStorage.getItem("token");
      if (token) {
        const decodedToken = jwtDecode(token);
        setClientId(decodedToken.idClient);

        const newSocket = io("http://192.168.11.225:3000");
        setSocket(newSocket);

        newSocket.emit("joinconvo", { conversationId: null });

        newSocket.on("message", (message) => {
          setMessages((prevMessages) => [...prevMessages, message]);
        });

        return () => newSocket.close();
      }
    };

    initSocket();
  }, []);

  const sendMessage = () => {
    if (socket && message.trim()) {
      socket.emit("sendmsg", {
        recipientId: clientId, // Adjust according to your needs
        senderId: clientId, // Adjust according to your needs
        content: message,
        conversationId: conversationId,
      });
      setMessage("");
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.message}>
            <Text>{item.content}</Text>
          </View>
        )}
      />
      <TextInput
        style={styles.input}
        value={message}
        onChangeText={setMessage}
        placeholder="Type your message"
      />
      <Button title="Send" onPress={sendMessage} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  message: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: "#f1f1f1",
    borderRadius: 5,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});

export default Chat;
