import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Animated,
  Easing,
  Modal,
  SafeAreaView,
  StatusBar,
} from "react-native";
import io from "socket.io-client";
import { BASE_URL } from "../private.json";
import { FontAwesome } from "@expo/vector-icons";
import { jwtDecode } from "jwt-decode";
import AsyncStorage from "@react-native-async-storage/async-storage";
const WorkerChatModal = ({
  workerId,
  clientId,

  isVisible,
  onClose,
}) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [conversationId, setConversationId] = useState(null);
  const [socket, setSocket] = useState(null);
  const opacity = useState(new Animated.Value(0))[0];
  const [userType, setUserType] = useState("");
  useEffect(() => {
    if (isVisible) {
      const newSocket = io(BASE_URL);
      setSocket(newSocket);

      Animated.timing(opacity, {
        toValue: 1,
        duration: 500,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      }).start();

      newSocket.emit("joinconvo", { clientId, workerId });

      newSocket.on("conversationId", (id) => {
        setConversationId(id);
        fetchOldMessages(newSocket, id);
      });

      newSocket.on("messagecoming", (message) => {
        setMessages((prevMessages) => [...prevMessages, message]);
      });

      return () => {
        newSocket.disconnect();
      };
    }
  }, [isVisible]);
  useEffect(() => {
    const getUserType = async () => {
      const token = await AsyncStorage.getItem("token");
      const decodedToken = jwtDecode(token);
      setUserType(decodedToken.userType);
      console.log(decodedToken, "decoded token");
    };
  });

  console.log(userType, "user type");
  const fetchOldMessages = (socket, id) => {
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
        sender: "Client",
      });
      setNewMessage("");
    }
  };
  console.log(userType);

  const renderItem = ({ item }) => (
    <View
      style={
        isMyMessage(item, userType) ? styles.myMessage : styles.theirMessage
      }
    >
      <Text
        style={
          isMyMessage(item, userType)
            ? styles.myMessageText
            : styles.theirMessageText
        }
      >
        {item.content}
      </Text>
      <Text style={styles.timestamp}>
        {String(new Date(item.createdat).getHours()).padStart(2, "0")}:
        {String(new Date(item.createdat).getMinutes()).padStart(2, "0")}
      </Text>
    </View>
  );

  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      transparent={false}
      onRequestClose={onClose}
    >
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="dark-content" />
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <FontAwesome name="arrow-left" size={24} color="#042630" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Chat</Text>
        </View>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.container}
        >
          <FlatList
            data={messages}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderItem}
            contentContainerStyle={styles.messagesContainer}
          />
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={newMessage}
              onChangeText={setNewMessage}
              placeholder="Type a message"
              placeholderTextColor="#888"
            />
            <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
              <Text style={styles.sendButtonText}>Send</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </Modal>
  );
};

const isMyMessage = (message, userType) => {
  return message.sender === userType; 
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#FFFFFF",
  },
  closeButton: {
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#042630",
  },
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
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
    backgroundColor: "#FFFFFF",
  },
  input: {
    flex: 1,
    backgroundColor: "#e5e5e5",
    borderRadius: 20,
    padding: 10,
    color: "#000",
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: "#2c3e50",
    borderRadius: 20,
    width: 80,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  sendButtonText: {
    color: "#fff",
    fontSize: 18,
  },
});

export default WorkerChatModal;
