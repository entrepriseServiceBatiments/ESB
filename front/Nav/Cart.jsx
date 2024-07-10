import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, Button } from "react-native";
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
        setClientId(user.idClient || user.idworker);
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
          `http://192.168.11.49:3000/orders/client/${clientId}`
        );
        const products =
          response.data[0].Products
          .flatMap((order) =>
            order.Products.map((product) => ({
              ...product,
              quantity: 1,
            }))
          ) || [];
        setOrders(products);
        setLoading(false);
        console.log(response.data, "orders useEff");
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchOrders();
  }, [clientId]);

  const handleQuantityChange = (productId, delta) => {
    setOrders((prevOrders) =>
      prevOrders.map((product) =>
        product.productId === productId
          ? {
              ...product,
              quantity: Math.max(
                1,
                Math.min(product.quantity + delta, product.Product.stock)
              ),
            }
          : product
      )
    );
  };

  const calculateTotalPrice = () => {
    return orders
      .reduce(
        (total, product) => total + product.Product.price * product.quantity,
        0
      )
      .toFixed(2);
  };

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
        <>
          <FlatList
            data={orders}
            keyExtractor={(item) => item.productId.toString()}
            renderItem={({ item }) => (
              <View style={styles.orderItem}>
                <Text>Order ID: {item.orderId}</Text>
                <Text>{item.Product.picture}</Text>
                <Text>{item.Product.category}</Text>
                <Text>Price: ${item.Product.price}</Text>
                <Text>Stock: {item.Product.stock}</Text>
                <Text>Quantity: {item.quantity}</Text>
                <View style={styles.buttonContainer}>
                  <Button
                    title="-"
                    onPress={() => handleQuantityChange(item.productId, -1)}
                    disabled={item.quantity <= 1}
                  />
                  <Button
                    title="+"
                    onPress={() => handleQuantityChange(item.productId, 1)}
                    disabled={item.quantity >= item.Product.stock}
                  />
                </View>
              </View>
            )}
          />
          <View style={styles.totalPriceContainer}>
            <Text style={styles.totalPriceText}>
              Total Price: ${calculateTotalPrice()}
            </Text>
          </View>
        </>
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
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 100,
  },
  totalPriceContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  totalPriceText: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default Cart;
