import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from 'axios';
import { BASE_URL } from "../private.json";
import ProductCard from "../Shop/ProductCard";
import WorkerCard from "../Shop/WorkerCard";
import WorkerDetailsScreen from '../Shop/OneWorker';
import ProductDetailsModal from '../Shop/OneProduct';
import QuantitySelector from '../Shop/QuantitySelector';

const CategoryDetails = ({ route, navigation }) => {
  const { category, jobTitle } = route.params;
  const [tab, setTab] = useState("products");
  const [products, setProducts] = useState([]);
  const [workers, setWorkers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedWorker, setSelectedWorker] = useState(null);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [clientId, setClientId] = useState(null);
  const [quantitySelectorVisible, setQuantitySelectorVisible] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const getClientIDAndFavorites = async () => {
      try {
        const client = await AsyncStorage.getItem('user');
        if (client) {
          const parsedClient = JSON.parse(client);
          const clientId = parsedClient.idClient || parsedClient.idworker;
          setClientId(clientId);

          const response = await fetch(
            `${BASE_URL}/wishlist/${clientId}`
          );
          
          const data = await response.json();
          console.log('data',data);
          setFavorites(data.map(item => item.idproducts));
        }
      } catch (error) {
        console.error('Error retrieving client ID or fetching favorites from AsyncStorage:', error);
      }
    };

    getClientIDAndFavorites();
  }, []);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        let response;
        if (tab === 'products') {
          response = await axios.get(`${BASE_URL}/products/${category}`);
          setProducts(response.data);
        } else if (tab === 'services') {
          response = await axios.get(`${BASE_URL}/workers/${jobTitle}`);
          setWorkers(response.data);
        }
      } catch (error) {
        console.error('Error fetching items:', error);
        Alert.alert("Error", "Failed to fetch items. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchItems();
  }, [category, jobTitle, tab]);

  const toggleFavorite = async (itemId) => {
    if (!clientId) {
      console.error('Client ID is not available');
      return;
    }

    try {
      if (favorites.includes(itemId)) {
        setFavorites(favorites.filter(id => id !== itemId));
        await axios.delete(`${BASE_URL}/wishlist`, {
          data: { clientId:clientId, productsId: itemId },
        });
      } else {
        setFavorites([...favorites, itemId]);
        await axios.post(`${BASE_URL}/wishlist`, {
          clientId:clientId, productsId: itemId,
        });
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  const ProductCardPress = (product) => {
    setSelectedProduct(product);
  };

  const WorkerCardPress = (worker) => {
    setSelectedWorker(worker);
  };

  const RentPress = (product) => {
    openQuantitySelector(product);
  };

  const openQuantitySelector = (product) => {
    setCurrentProduct(product);
    setQuantitySelectorVisible(true);
  };

  const AddToCart = (product, quantity) => {
    setSelectedProducts((prevSelected) => {
      const existingProductIndex = prevSelected.findIndex(
        (p) => p.idproducts === product.idproducts
      );
      if (existingProductIndex > -1) {
        const updatedProducts = [...prevSelected];
        updatedProducts[existingProductIndex].quantity += quantity;
        return updatedProducts;
      } else {
        return [...prevSelected, { ...product, quantity }];
      }
    });
    setQuantitySelectorVisible(false);
    setSelectedProduct(null);
  };

  const RemoveFromCart = (productId) => {
    setSelectedProducts((prevSelected) => 
      prevSelected.filter((p) => p.idproducts !== productId)
    );
  };

  const saveOrderToAsyncStorage = async () => {
    if (selectedProducts.length === 0) {
      Alert.alert("Error", "Please select at least one product.");
      return;
    }

    try {
      await AsyncStorage.setItem('orders', JSON.stringify(selectedProducts));
      console.log('Order saved to AsyncStorage');
      Alert.alert("Success", "Order saved successfully.");
      setSelectedProducts([]); // Clear the cart after saving
    } catch (error) {
      console.error('Error saving order to AsyncStorage:', error);
      Alert.alert("Error", "Failed to save order. Please try again.");
    }
  };

  const renderProductItem = ({ item }) => {
    const isInCart = selectedProducts.some(p => p.idproducts === item.idproducts);
    const isFavorite = favorites.includes(item.idproducts);
    return (
      <ProductCard
        key={item.idproducts}
        item={item}
        onPress={() => ProductCardPress(item)}
        onRentPress={() => RentPress(item)}
        onRemovePress={() => RemoveFromCart(item.idproducts)}
        isInCart={isInCart}
        isFavorite={isFavorite}
        toggleFavorite={() => toggleFavorite(item.idproducts)}
      />
    );
  };

  const renderWorkerItem = ({ item }) => (
    <WorkerCard
      key={item.idworker}
      item={item}
      onPress={() => WorkerCardPress(item)}
      navigation={navigation}
    />
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
      <ScrollView contentContainerStyle={styles.scrollView}>
        {loading ? (
          <ActivityIndicator size="large" color="#2196F3" />
        ) : (
          <View style={styles.gridContainer}>
            {tab === 'products' ? (
              products.map((item) => (
                <View key={item.idproducts} style={styles.cardContainer}>
                  {renderProductItem({ item })}
                </View>
              ))
            ) : (
              workers.map((item) => (
                <View key={item.idworker} style={styles.cardContainer}>
                  {renderWorkerItem({ item })}
                </View>
              ))
            )}
          </View>
        )}
      </ScrollView>
      <ProductDetailsModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onRentPress={() => RentPress(selectedProduct)}
        onRemovePress={() => RemoveFromCart(selectedProduct?.idproducts)}
        isInCart={selectedProducts.some(p => p.idproducts === selectedProduct?.idproducts)}
        visible={!!selectedProduct}
        toggleFavorite={toggleFavorite}
      />
      <WorkerDetailsScreen
        navigation={navigation}
        worker={selectedWorker}
        onClose={() => setSelectedWorker(null)}
        visible={!!selectedWorker}
      />
      {tab === 'products' && (
        <TouchableOpacity style={styles.orderButton} onPress={saveOrderToAsyncStorage}>
          <Text style={styles.orderButtonText}>Order ({selectedProducts.length})</Text>
        </TouchableOpacity>
      )}
      {quantitySelectorVisible && (
        <QuantitySelector
          visible={quantitySelectorVisible}
          onConfirm={(quantity) => AddToCart(currentProduct, quantity)}
          onCancel={() => setQuantitySelectorVisible(false)}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e6ede6",
    marginTop: 30,
  },
  navbar: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#042630",
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
    color: "#e6ede6",
    borderBottomWidth: 2,
    borderBottomColor: "#e6ede6",
    paddingBottom: 5,
  },
  scrollView: {
    flexGrow: 1,
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  cardContainer: {
    width: "48%",
    marginBottom: 15,
  },
  orderButton: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#042630",
    padding: 15,
    alignItems: "center",
  },
  orderButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default CategoryDetails;
