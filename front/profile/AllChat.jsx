import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
  Modal,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import io from "socket.io-client";

const SERVER_URL = "http://192.168.56.1:3000";

const Conversationspage = ({ modalVisible, setModalVisible }) => {
  const [conversations, setConversations] = useState([]);
  const [socket, setSocket] = useState(null);
  const [user, setUser] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const setupSocket = async () => {
      if (modalVisible) {
        try {
          const userData = await AsyncStorage.getItem("user");
          if (userData) {
            const parsedUser = JSON.parse(userData);
            setUser(parsedUser);

            const newSocket = io(SERVER_URL, { transports: ["websocket"] });
            setSocket(newSocket);

            newSocket.emit("getconvos", {
              user: parsedUser.idClient || parsedUser.idworker,
            });
            console.log("Requesting conversations for user:", parsedUser);

            newSocket.on("convos", (data) => {
              console.log("Received conversations data:", data);
              setConversations(data);
            });
          } else {
            console.log("No user data found in AsyncStorage");
          }
        } catch (error) {
          console.error("Error retrieving user data:", error);
        }
      }
    };

    setupSocket();

    return () => {
      if (socket) {
        socket.off("convos");
        socket.disconnect();
      }
    };
  }, [modalVisible]);

  const navigateToChat = (conversationId, userId) => {
    setModalVisible(false);
    navigation.navigate("Chat", {
      conversationId,
      userId,
    });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.messageItem}
      onPress={() =>
        navigateToChat(item.conversationId, item.idworker || item.idClient)
      }
    >
      <Image
        source={{
          uri:
            item.picture ||
            "https://t4.ftcdn.net/jpg/02/15/84/43/240_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg",
        }}
        style={styles.avatar}
      />
      <View style={styles.textContainer}>
        <Text style={styles.messageTitle}>
          {item.userName || item.name || "Unknown User"}
        </Text>
      </View>
    </TouchableOpacity>
  );

  if (!modalVisible) return null;

  return (
    <Modal
      visible={modalVisible}
      animationType="slide"
      transparent={false}
      onRequestClose={() => setModalVisible(false)}
    >
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => setModalVisible(false)}
          style={styles.closeButton}
        >
          <Text style={styles.closeButtonText}>Close</Text>
        </TouchableOpacity>
        {conversations.length > 0 ? (
          <FlatList
            data={conversations}
            keyExtractor={(item) => (item.idworker || item.idClient).toString()}
            renderItem={renderItem}
          />
        ) : (
          <Text style={styles.noConversationsText}>No conversations found</Text>
        )}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#042630",
  },
  messageItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#555555",
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  messageTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  lastMessage: {
    fontSize: 14,
    color: "#cccccc",
  },
  closeButton: {
    alignSelf: "flex-end",
    padding: 10,
    marginBottom: 10,
  },
  closeButtonText: {
    fontSize: 16,
    color: "white",
    fontWeight: "bold",
  },
  noConversationsText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
    marginTop: 20,
  },
});

export default Conversationspage;
