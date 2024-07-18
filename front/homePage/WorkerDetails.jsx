import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
const WorkerDetails = ({ navigation, route }) => {
  const { worker } = route.params;

  const handleChat = async () => {
    try {
      const clientData = await AsyncStorage.getItem("user");
      const client = JSON.parse(clientData);
      if (client) {
        navigation.navigate("Chat", {
          workerId: parseInt(worker.idworker),
          clientId: parseInt(client.idClient),
        });
      } else {
        console.error("Client ID not found");
      }
    } catch (error) {
      console.error("Error retrieving client ID:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Worker Details</Text>
      <Text style={styles.text}>{worker.name}</Text>
      <Button title="Chat with Worker" onPress={handleChat} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
  },
});

export default WorkerDetails;
