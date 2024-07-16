import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { BASE_URL } from "../private.json";
const Conversationspage = () => {
  const [messages, setConversations] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    axios
      .get(`${BASE_URL}/conversations/1`)
      .then(() => {
        let workers = [];
        response.data.forEach((message) => {
          const conversationId = message.conversationId;
          if (
            message.Client &&
            message.Client.hasOwnProperty("idworker") &&
            !workers.some(
              (worker) => worker.idClient === message.Client.idworker
            )
          ) {
            workers.push({ ...message.Client, conversationId });
          }
          if (
            message.Worker &&
            message.Worker.hasOwnProperty("idworker") &&
            !workers.some(
              (worker) => worker.idworker === message.Worker.idworker
            )
          ) {
            workers.push({ ...message.Worker, conversationId });
          }
        });
        setConversations(workers);
      })
      .catch(() => {
        console.log(error);
      });
  }, []);

  const navigateToChat = (conversationId, idworker) => {
    navigation.navigate("Chat", {
      conversationId,
      idworker,
    });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.messageItem}
      onPress={() => navigateToChat(item.conversationId, item.idworker)}
    >
      {item.picture ? (
        <Image source={{ uri: item.picture }} style={styles.avatar} />
      ) : (
        <Image
          source={{
            uri: "https://t4.ftcdn.net/jpg/02/15/84/43/240_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg",
          }}
          style={styles.avatar}
        />
      )}
      <View style={styles.textContainer}>
        <Text style={styles.messageTitle}>{item.userName}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        keyExtractor={(item) => item.idworker.toString()}
        renderItem={renderItem}
      />
    </View>
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
});

export default Conversationspage;
