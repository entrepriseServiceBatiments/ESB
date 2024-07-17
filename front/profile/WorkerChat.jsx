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
  StatusBar
} from "react-native";
import io from "socket.io-client";
import { BASE_URL } from "../private.json";
import { FontAwesome } from "@expo/vector-icons";
const WorkerChatModal = ({ workerId, clientId, isVisible, onClose }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [conversationId, setConversationId] = useState(null);
  const [socket, setSocket] = useState(null);
  const opacity = useState(new Animated.Value(0))[0];

  useEffect(() => {
    if (isVisible) {
      const newSocket = io(`${BASE_URL}`);
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
        fetchOldMessages(id);
      });

      newSocket.on("messagecoming", (message) => {
        setMessages((prevMessages) => [...prevMessages, message]);
      });

      return () => {
        newSocket.disconnect();
      };
    }
  }, [isVisible]);

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
        sender: workerId.toString(),
      });
      setNewMessage("");
    }
  };

  const renderItem = ({ item }) => (
    <View
      style={
        item.sender === workerId.toString()
          ? styles.myMessage
          : styles.theirMessage
      }
    >
      <Text
        style={
          item.sender === workerId.toString()
            ? styles.myMessageText
            : styles.theirMessageText
        }
      >
        {item.content}
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
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderItem}
            contentContainerStyle={styles.messagesContainer}
          />
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={newMessage}
              onChangeText={setNewMessage}
              placeholder="Type a message..."
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

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#e6ede6",
  },
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e6ede6',
  },
  closeButton: {
    padding: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 20,
    color: '#042630',
  },
  messagesContainer: {
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderTopWidth: 1,
    borderColor: "#d1d5db",
    backgroundColor: "#e6ede6",
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#d1d5db",
    padding: 10,
    borderRadius: 30,
    backgroundColor: "#d0d6d6",
    marginRight: 10,
    fontSize: 16,
  },
  sendButton: {
    backgroundColor: "#042630",
    borderRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  sendButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  myMessage: {
    alignSelf: "flex-end",
    backgroundColor: "#042630",
    padding: 15,
    marginVertical: 5,
    borderRadius: 20,
    maxWidth: "80%",
  },
  theirMessage: {
    alignSelf: "flex-start",
    backgroundColor: "#042680",
    padding: 15,
    marginVertical: 5,
    borderRadius: 20,
    maxWidth: "80%",
  },
  myMessageText: {
    color: "#fff",
    fontSize: 16,
  },
  theirMessageText: {
    color: "#000",
    fontSize: 16,
  },
});

export default WorkerChatModal;
