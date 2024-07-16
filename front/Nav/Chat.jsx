import React, { useEffect, useState, useRef, useCallback } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
} from "react-native";
import io from "socket.io-client";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import { BASE_URL } from "../private.json";
const Chatpage = ({ route }) => {
  const { conversationId, idworker } = route.params;
  const [socket, setSocket] = useState(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const ScrollViewRef = useRef();

  useEffect(() => {
    const socket = io(`${BASE_URL}/`, {
      transports: ["websocket"],
    });
    socket.on("connect", () => {
      console.log(socket.id);
    });
    socket.on("messages", (messages) => {
      console.log(messages);
      setMessages(messages);
    });

    socket.on("messagecoming", (newmessage) => {
      console.log("new msg", newmessage);
      setMessages((oldmsgs) => [...oldmsgs, newmessage]);
    });

    socket.on("error", (error) => {
      console.log(error);
    });
    setSocket(socket);

    socket.emit("oldmsgs", { conversationId });
    return () => {
      socket.disconnect();
    };
  }, [conversationId]);

  const sendmsg = () => {
    if (!message.length) return;
    socket.emit("sendmsg", {
      content: message,
      workerId: idworker,
      clientId: 1,
      conversationId,
      sender: "CLIENT",
    });
    setMessage("");
  };

  useFocusEffect(
    useCallback(() => {
      if (ScrollViewRef.current) {
        ScrollViewRef.current.scrollToEnd({ animated: true });
      }
    }, [messages])
  );

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        keyboardVerticalOffset={100}
        style={styles.flex1}
        enabled
      >
        <ScrollView style={styles.scrollView} ref={ScrollViewRef}>
          {messages.map((message, index) => (
            <View
              style={
                message.sender === "CLIENT"
                  ? styles.itemsStart
                  : styles.itemsEnd
              }
              key={index}
            >
              <View
                style={
                  message.sender === "CLIENT"
                    ? styles.senderMessage
                    : styles.receiverMessage
                }
              >
                <Text
                  style={
                    message.sender === "CLIENT"
                      ? styles.senderText
                      : styles.receiverText
                  }
                >
                  {message.content}
                </Text>
              </View>
              <Text style={styles.timestamp}>
                {String(new Date(message.createdat).getHours()).padStart(
                  2,
                  "0"
                )}
                :
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
            value={message}
            onChangeText={setMessage}
            placeholder="type your message"
          />
          <TouchableOpacity style={styles.sendButton} onPress={sendmsg}>
            <Ionicons name="send" size={24} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#042630",
  },
  flex1: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: "#ECEBEB",
  },
  itemsStart: {
    alignItems: "flex-start",
  },
  itemsEnd: {
    alignItems: "flex-end",
  },
  senderMessage: {
    backgroundColor: "#042630",
    flex: 1,
    marginBottom: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 24,
    borderBottomLeftRadius: 0,
  },
  receiverMessage: {
    backgroundColor: "#bfbdbd",
    flex: 1,
    marginBottom: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 24,
    borderBottomRightRadius: 0,
  },
  senderText: {
    textAlign: "left",
    color: "#ffffff",
    fontSize: 16,
  },
  receiverText: {
    textAlign: "left",
    color: "#042630",
    fontSize: 16,
  },
  timestamp: {
    textAlign: "right",
    color: "#808080",
    marginBottom: 2,
    marginRight: 8,
    fontSize: 12,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  input: {
    flex: 1,
    height: 30,
    borderRadius: 10,
    backgroundColor: "#ffffff",
    color: "#111111",
    paddingHorizontal: 10,
  },
});

export default Chatpage;
