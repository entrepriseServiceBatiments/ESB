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
import { BASE_URL } from "../private.json";
import WorkerChatModal from "./WorkerChat.jsx";

const Conversationspage = ({ modalVisible, setModalVisible }) => {
  const [conversations, setConversations] = useState([]);
  const [socket, setSocket] = useState(null);
  const [user, setUser] = useState(null);
  const [chatModalVisible, setChatModalVisible] = useState(false); // State for chat modal visibility
  const [selectedConversation, setSelectedConversation] = useState(null); // State for selected conversation
  const navigation = useNavigation();

  useEffect(() => {
    const setupSocket = async () => {
      if (modalVisible) {
        try {
          const userData = await AsyncStorage.getItem("user");
          if (userData) {
            const parsedUser = JSON.parse(userData);
            setUser(parsedUser);

            if (socket) {
              socket.off("convos");
              socket.disconnect();
            }

            const newSocket = io(BASE_URL, { transports: ["websocket"] });
            setSocket(newSocket);

            newSocket.emit("getconvos", {
              user: parsedUser.idClient || parsedUser.idworker,
            });

            newSocket.on("convos", (data) => {
              const uniqueConversations = Array.from(
                new Map(
                  data.map((item) => [item.conversationId, item])
                ).values()
              );
              setConversations(uniqueConversations);
            });

            return () => {
              newSocket.off("convos");
              newSocket.disconnect();
            };
          } else {
            console.log("No user data found in AsyncStorage");
          }
        } catch (error) {
          console.error("Error retrieving user data:", error);
        }
      }
    };

    setupSocket();
  }, [modalVisible]);

  const handleConversationPress = (workerId, clientId) => {
    setSelectedConversation({ workerId, clientId }); // Set the selected conversation
    setChatModalVisible(true);
    console.log(workerId, clientId, "77777777");
  };

  const renderItem = ({ item }) => {
    const isClient = user.idClient !== undefined;
    const id = isClient ? item.idworker : item.idClient;

    return (
      <TouchableOpacity
        style={styles.messageItem}
        onPress={() =>
          handleConversationPress(
            user.idworker || user.idClient,
            item.idClient || item.idworker
          )
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
  };

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
            keyExtractor={(item) => item.conversationId.toString()}
            renderItem={renderItem}
          />
        ) : (
          <Text style={styles.noConversationsText}>No conversations found</Text>
        )}
      </View>
      {selectedConversation && (
        <WorkerChatModal
          workerId={selectedConversation.workerId}
          clientId={selectedConversation.clientId}
          isVisible={chatModalVisible}
          onClose={() => setChatModalVisible(false)}
        />
      )}
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
