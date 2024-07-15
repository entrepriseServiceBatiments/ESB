import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "../private.json";
import ProductCard from "./ProductCard";
import Calendar from "./Calendar";

const CategoryDetails = ({ route, navigation }) => {
  const { category, jobTitle } = route.params;
  const [tab, setTab] = useState("products");
  const [products, setProducts] = useState([]);
  const [workers, setWorkers] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [clientId, setClientId] = useState(null);
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${BASE_URL}/products/${category}`);
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
        Alert.alert("Error", "Failed to fetch products. Please try again.");
      }
    };

    const fetchWorkers = async () => {
      try {
        const response = await fetch(`${BASE_URL}/workers/${jobTitle}`);
        const data = await response.json();
        setWorkers(data);
      } catch (error) {
        console.error("Error fetching workers:", error);
        Alert.alert("Error", "Failed to fetch workers. Please try again.");
      }
    };

    fetchProducts();
    fetchWorkers();
    retrieveData();
  }, [category, jobTitle]);

  const retrieveData = async () => {
    try {
      let user = await AsyncStorage.getItem("user");
      if (user) {
        user = JSON.parse(user);
        setClientId(user.idClient || user.idworker || null);
      }
    } catch (error) {
      console.error("Error retrieving user data:", error);
    }
  };

  const handleToggleProduct = (product) => {
    setSelectedProducts((prevSelected) => {
      const isAlreadySelected = prevSelected.some(
        (p) => p.idproducts === product.idproducts
      );
      if (isAlreadySelected) {
        return prevSelected.filter((p) => p.idproducts !== product.idproducts);
      } else {
        return [...prevSelected, product];
      }
    });
  };

  const handleOrder = async () => {
    if (selectedProducts.length === 0) {
      Alert.alert("Error", "Please select at least one product.");
      return;
    }

    try {
      await AsyncStorage.setItem(
        "selectedProducts",
        JSON.stringify(selectedProducts)
      );
      navigation.navigate("Cart");
    } catch (error) {
      console.error("Error saving selected products:", error);
      Alert.alert(
        "Error",
        "Failed to save selected products. Please try again."
      );
    }
  };

  const renderProductItem = ({ item }) => (
    <ProductCard
      item={item}
      onReservePress={handleToggleProduct}
      isSelected={selectedProducts.some(
        (p) => p.idproducts === item.idproducts
      )}
    />
  );

  const renderWorkerItem = ({ item }) => (
    <TouchableOpacity
      style={styles.workerCard}
      onPress={() => navigation.navigate("WorkerDetails", { worker: item })}
    >
      <View style={styles.workerHeader}>
        <Image source={{ uri: item.picture }} style={styles.workerImage} />
        <View style={styles.workerInfo}>
          <Text style={styles.workerName}>{item.name}</Text>
          <Text style={styles.workerVerified}>Identité Vérifiée</Text>
          <Text style={styles.workerRating}>
            {item.rating ? `${item.rating} ★` : "No rating available"}
          </Text>
        </View>
        <View style={styles.workerDistance}>
          <Text style={styles.distanceText}>
            {item.distance ? `${item.distance} KM` : "Distance not available"}
          </Text>
        </View>
      </View>
      <View style={styles.workerContent}>
        <Text style={styles.workerDescription}>{item.description}</Text>
      </View>
    </TouchableOpacity>
  );

  const keyExtractor = (item) =>
    item.idproducts ? item.idproducts.toString() : item.name;

  return (
    <View style={styles.container}>
      <View style={styles.navbar}>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => setTab("products")}
        >
          <Text style={tab === "products" ? styles.activeTab : styles.tab}>
            Products
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => setTab("services")}
        >
          <Text style={tab === "services" ? styles.activeTab : styles.tab}>
            Services
          </Text>
        </TouchableOpacity>
      </View>
      <FlatList
        key={tab}
        data={tab === "products" ? products : workers}
        keyExtractor={keyExtractor}
        renderItem={tab === "products" ? renderProductItem : renderWorkerItem}
        numColumns={tab === "products" ? 2 : 1}
        columnWrapperStyle={tab === "products" ? styles.columnWrapper : null}
        contentContainerStyle={styles.listContent}
      />
      {tab === "products" && (
        <TouchableOpacity style={styles.orderButton} onPress={handleOrder}>
          <Text style={styles.orderButtonText}>
            Order ({selectedProducts.length})
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
  },
  navbar: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#fff",
    paddingVertical: 10,
    elevation: 2,
  },
  navItem: {
    flex: 1,
    alignItems: "center",
  },
  tab: {
    fontSize: 16,
    color: "#666",
  },
  activeTab: {
    fontSize: 16,
    color: "#000",
    fontWeight: "bold",
  },
  listContent: {
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  columnWrapper: {
    justifyContent: "space-between",
  },
  card: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 8,
    margin: 10,
    padding: 10,
    elevation: 3,
  },
  selectedCard: {
    borderColor: "#007BFF",
    borderWidth: 2,
  },
  favoriteIconContainer: {
    alignItems: "flex-end",
  },
  favoriteIcon: {
    width: 24,
    height: 24,
    tintColor: "#ff0000",
  },
  image: {
    width: "100%",
    height: 150,
    borderRadius: 8,
  },
  cardContent: {
    marginTop: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  description: {
    fontSize: 14,
    color: "#666",
    marginVertical: 5,
  },
  price: {
    fontSize: 16,
    color: "#000",
    marginVertical: 5,
  },
  button: {
    marginTop: 10,
    backgroundColor: "#007BFF",
    paddingVertical: 10,
    borderRadius: 4,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  workerCard: {
    backgroundColor: "#fff",
    borderRadius: 8,
    margin: 10,
    padding: 10,
    elevation: 3,
  },
  workerHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  workerImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  workerInfo: {
    flex: 1,
  },
  workerName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  workerVerified: {
    fontSize: 14,
    color: "#4CAF50",
  },
  workerRating: {
    fontSize: 14,
    color: "#FFD700",
  },
  workerDistance: {
    alignItems: "flex-end",
  },
  distanceText: {
    fontSize: 14,
    color: "#666",
  },
  workerContent: {
    marginTop: 10,
  },
  workerDescription: {
    fontSize: 14,
    color: "#666",
  },
  orderButton: {
    backgroundColor: "#007BFF",
    paddingVertical: 15,
    alignItems: "center",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  orderButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
});

export default CategoryDetails;
