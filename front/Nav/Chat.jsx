import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Animated,
  Easing,
} from "react-native";
import io from "socket.io-client";
import { BASE_URL } from "../private.json";

const Chat = ({ route }) => {
  const { workerId, clientId } = route.params;
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [conversationId, setConversationId] = useState(null);
  const socket = io(`${BASE_URL}`);
  const opacity = useState(new Animated.Value(0))[0];

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 500,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: true,
    }).start();

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
        sender: "client",
      });
      setNewMessage("");
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.messagesContainer}>
        {messages.map((message, index) => (
          <View
            key={index}
            style={
              message.sender === "client"
                ? styles.myMessage
                : styles.theirMessage
            }
          >
            {console.log(message, "message")}
            <View>
              <Text
                style={
                  message.sender === "client"
                    ? styles.myMessageText
                    : styles.theirMessageText
                }
              >
                {message.content}
              </Text>
            </View>
            <Text style={styles.timestamp}>
              {String(new Date(message.createdat).getHours()).padStart(2, "0")}:
              {String(new Date(message.createdat).getMinutes()).padStart(
                2,
                "0"
              )}
            </Text>
          </View>
        ))}
      </ScrollView>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={newMessage}
          onChangeText={setNewMessage}
          placeholder="Type a message"
          placeholderTextColor="#888"
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
          <Text style={styles.sendButtonText}>{">"}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1c2733",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#2c3e50",
  },
  backButton: {
    color: "#fff",
    fontSize: 24,
    marginRight: 10,
  },
  headerTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    flex: 1,
  },
  infoButton: {
    color: "#fff",
    fontSize: 24,
  },
  messagesContainer: {
    padding: 10,
  },
  myMessage: {
    alignSelf: "flex-end",
    backgroundColor: "#1c2733",
    padding: 10,
    marginVertical: 5,
    borderRadius: 15,
    maxWidth: "80%",
    borderWidth: 1,
    borderColor: "#2c3e50",
  },
  theirMessage: {
    alignSelf: "flex-start",
    backgroundColor: "#2c3e50",
    padding: 10,
    marginVertical: 5,
    borderRadius: 15,
    maxWidth: "80%",
  },
  myMessageText: {
    color: "#fff",
    fontSize: 16,
  },
  theirMessageText: {
    color: "#fff",
    fontSize: 16,
  },
  timestamp: {
    color: "#7f8c8d",
    fontSize: 12,
    marginTop: 5,
    alignSelf: "flex-end",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: "#2c3e50",
  },
  input: {
    flex: 1,
    backgroundColor: "#2c3e50",
    borderRadius: 20,
    padding: 10,
    color: "#fff",
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: "#2c3e50",
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  sendButtonText: {
    color: "#fff",
    fontSize: 18,
  },
});

export default Chat;
