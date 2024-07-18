// Conversation.jsx
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import io from "socket.io-client";
import { BASE_URL } from "../private.json";
const Conversation = ({ navigation }) => {
  const [conversations, setConversations] = useState([]);
  const socket = io(`${BASE_URL}`);

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const clientData = await AsyncStorage.getItem("user");
        const client = JSON.parse(clientData);
        if (client) {
          socket.emit("getconvos", { clientId: client.idClient });
          socket.on("convos", (convos) => {
            setConversations(convos);
          });
        }
      } catch (error) {
        console.error("Error retrieving client ID:", error);
      }
    };

    fetchConversations();

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={conversations}
        keyExtractor={(item) => item.conversationId.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.conversationItem}
            onPress={() =>
              navigation.navigate("Chat", {
                workerId: item.idworker,
                clientId: item.clientId,
              })
            }
          >
            <Text>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  conversationItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
});

export default Conversation;
