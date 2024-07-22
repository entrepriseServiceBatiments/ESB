import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Easing,
} from "react-native";
import io from "socket.io-client";
import { BASE_URL } from "../private.json";

const Chat = ({ route }) => {
  const { workerId, clientId, userType } = route.params;
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [conversationId, setConversationId] = useState(null);
  // const [userType, setUserType] = useState(null);
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

  // const isMyMessage = (message) => {
  //   if (userType === "Client") {
  //     return message.sender === "Client";
  //   } else if (userType === "Worker") {
  //     return message.sender === "Worker";
  //   }
  //   console.log(userType);
  //   return false;
  // };
  useEffect(() => {
    const getUserType = async () => {
      const token = await AsyncStorage.getItem("token");
      const decodedToken = jwtDecode(token);
      setUserType(decodedToken.userType);
      console.log(decodedToken, "decoded token");
    };
  });
  console.log(userType);
  const handleSend = () => {
    if (newMessage.trim()) {
      socket.emit("sendmsg", {
        workerId,
        clientId,
        content: newMessage,
        conversationid: conversationId,
        sender: "Client",
      });
      setNewMessage("");
    }
  };
  console.log(messages, "messages");
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.messagesContainer}>
        {messages.map((message, index) => (
          <View
            key={index}
            style={
              message.sender === "Client" || message.sender === "Worker"
                ? styles.myMessage
                : styles.theirMessage
            }
          >
            <Text
              style={
                message.sender === "Client" || message.sender === "Worker"
                  ? styles.myMessageText
                  : styles.theirMessageText
              }
            >
              {console.log(message, "client msg")}
              {message.content}
            </Text>
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
const isMyMessage = (message, userType) => {
  return message.sender === userType;
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e6ede6",
  },
  messagesContainer: {
    padding: 10,
  },
  myMessage: {
    alignSelf: "flex-end",
    backgroundColor: "#042630",
    padding: 10,
    marginVertical: 5,
    borderRadius: 15,
    maxWidth: "80%",
    borderWidth: 1,
    borderColor: "#2c3e50",
  },
  theirMessage: {
    alignSelf: "flex-start",
    backgroundColor: "#042630",
    padding: 10,
    marginVertical: 5,
    borderRadius: 15,
    maxWidth: "80%",
  },
  myMessageText: {
    color: "#d0d6d6",
    fontSize: 16,
  },
  theirMessageText: {
    color: "#d0d6d6",
    fontSize: 16,
  },
  timestamp: {
    color: "#d0d6d6",
    fontSize: 12,
    marginTop: 5,
    alignSelf: "flex-end",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: "#042630",
  },
  input: {
    flex: 1,
    backgroundColor: "#d0d6d6",
    borderRadius: 20,
    padding: 10,
    color: "#042630",
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: "#042630",
    borderRadius: 20,
    width: 60,
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
