import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
  RefreshControl,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "../private.json";

const CartScreen = ({ navigation }) => {
  const [orders, setOrders] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [clientId, setClientId] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    setClientId(null);
    console.log("====================================");
    console.log("reset");
    console.log("====================================");
    // retrieveClientId();
  }, []);

  useEffect(() => {
    // setClientId(null)
    retrieveClientId();
    fetchOrders();
  }, []);

  const retrieveClientId = async () => {
    try {
      const user = await AsyncStorage.getItem("user");
      console.log("userr===>", user);
      if (user) {
        const parsedUser = JSON.parse(user);
        console.log("user insde cond", user);
        setClientId(parsedUser.idClient || parsedUser.idworker);
      } else {
        setClientId(clientId);
        setOrders([]);
      }
    } catch (error) {
      console.error("Error retrieving client ID:", error);
    }
  };

  const fetchOrders = async () => {
    try {
      setRefreshing(true);
      const response = await axios.get(`${BASE_URL}/orders/client/${clientId}`);
      setOrders(response.data);

      calculateTotalAmount(response.data);
      console.log("client id:", clientId);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setRefreshing(false);
    }
  };

  const calculateTotalAmount = (orderData) => {
    const total = orderData.reduce((acc, order) => {
      return (
        acc +
        order.Products.reduce((prodAcc, productItem) => {
          return prodAcc + productItem.Product.price;
        }, 0)
      );
    }, 0);
    setTotalAmount(total);
  };

  const renderOrderItem = ({ item: order }) => (
    <View style={styles.orderItem}>
      <Text style={styles.orderId}>Order ID: {order.idorders}</Text>
      <Text>Start Date: {new Date(order.startDate).toLocaleDateString()}</Text>
      <Text>End Date: {new Date(order.endDate).toLocaleDateString()}</Text>
      <Text>Status: {order.status}</Text>
      <Text style={styles.productsTitle}>Products:</Text>
      {order.Products.map((productItem, index) => (
        <View key={index} style={styles.productItem}>
          <Image
            source={{ uri: productItem.Product.picture }}
            style={styles.productImage}
          />
          <View style={styles.productDetails}>
            <Text style={styles.productName}>{productItem.Product.name}</Text>
            <Text>Category: {productItem.Product.category}</Text>
            <Text>Price: ${productItem.Product.price.toFixed(2)}</Text>
          </View>
        </View>
      ))}
    </View>
  );

  const onRefresh = () => {
    fetchOrders();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Cart</Text>
      <FlatList
        data={orders}
        renderItem={renderOrderItem}
        keyExtractor={(item) => item.idorders.toString()}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>
          Total Amount: ${totalAmount.toFixed(2)}
        </Text>
      </View>
      <TouchableOpacity style={styles.checkoutButton} onPress={() => {}}>
        <Text style={styles.checkoutButtonText}>Proceed to Checkout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f8f8f8",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  orderItem: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    elevation: 3,
  },
  orderId: {
    fontWeight: "bold",
    marginBottom: 5,
  },
  productsTitle: {
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 5,
  },
  productItem: {
    flexDirection: "row",
    marginLeft: 10,
    marginTop: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    paddingBottom: 5,
  },
  productImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  productDetails: {
    flex: 1,
  },
  productName: {
    fontWeight: "bold",
  },
  totalContainer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: "#e6f7ff",
    borderRadius: 8,
  },
  totalText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  checkoutButton: {
    backgroundColor: "#007BFF",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  checkoutButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default CartScreen;