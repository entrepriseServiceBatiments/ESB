import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Modal,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import io from "socket.io-client";
import { BASE_URL } from "../private.json";
import WorkerChatModal from "./WorkerChat";

const AllChats = ({ modalVisible, setModalVisible, navigation }) => {
  const [conversations, setConversations] = useState([]);
  const [socket, setSocket] = useState(null);
  const [selectedWorkerId, setSelectedWorkerId] = useState(null);
  const [clientId, setClientId] = useState(null);
  const [workerChatModalVisible, setWorkerChatModalVisible] = useState(false);

  useEffect(() => {
    if (modalVisible) {
      const newSocket = io(BASE_URL);
      setSocket(newSocket);

      const setupSocket = async () => {
        const userId = JSON.parse(await AsyncStorage.getItem("user"));
        const { idworker, idclient } = userId;
        setClientId(idworker || idclient);

        newSocket.on("connect", () => {
          console.log("Connected to socket");
          newSocket.emit("getconvos", {
            clientId: idworker || idclient,
          });
        });

        newSocket.on("convos", (workers) => {
          setConversations(workers);
        });
      };

      setupSocket();

      return () => {
        newSocket.disconnect();
      };
    }
  }, [modalVisible]);

  const openChat = (workerId) => {
    setSelectedWorkerId(workerId);
    setWorkerChatModalVisible(true);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.conversationItem}
      onPress={() => openChat(item.idworker)}
    >
      <Text style={styles.clientName}>{item.userName}</Text>
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
        <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton}>
          <Text style={styles.closeButtonText}>Close</Text>
        </TouchableOpacity>
        <FlatList
          data={conversations}
          renderItem={renderItem}
          keyExtractor={(item) => item.idworker.toString()}
        />
        <WorkerChatModal
          isVisible={workerChatModalVisible}
          onClose={() => setWorkerChatModalVisible(false)}
          workerId={selectedWorkerId}
          clientId={clientId}
        />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e6ede6",
    paddingTop: 20,
  },
  conversationItem: {
    backgroundColor: "#042630",
    padding: 15,
    borderRadius:10,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
    width:'90%',
    alignSelf:'center'
  },
  clientName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
  closeButton: {
    alignSelf: 'flex-end',
    padding: 10,
    marginRight: 10,
  },
  closeButtonText: {
    fontSize: 16,
    color: "#042630",
    fontWeight: "bold",
  },
});

export default AllChats;