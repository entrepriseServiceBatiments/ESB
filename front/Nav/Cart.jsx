import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const Cart = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [clientId, setClientId] = useState(null);

  const retrieveData = async () => {
    try {
      let user = await AsyncStorage.getItem("user");
      if (user) {
        user = JSON.parse(user);
        setClientId(user.idClient);
      }
    } catch (error) {
      console.error("Error retrieving data:", error);
    }
  };

  useEffect(() => {
    retrieveData();
  }, []);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!clientId) return;

      try {
        const response = await axios.get(
          `http://192.168.104.3:3000/client/${clientId}`
        );
        setOrders(response.data[0]?.Products || []);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchOrders();
  }, [clientId]);

  if (loading) {
    return (
      <View style={styles.center}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text>Error: {error.message}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Orders</Text>
      {orders.length === 0 ? (
        <Text style={styles.noOrdersText}>No orders found.</Text>
      ) : (
        <FlatList
          data={orders}
          keyExtractor={(item) => item.idorders.toString()}
          renderItem={({ item }) => (
            <View style={styles.orderItem}>
              <Text>Order ID: {item.idorders}</Text>
              <Text> {item.picture}</Text>
              <Text> {item.category}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  orderItem: {
    padding: 15,
    marginVertical: 8,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: "#f9f9f9",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noOrdersText: {
    textAlign: "center",
    fontSize: 18,
    color: "#888",
  },
});

export default Cart;
