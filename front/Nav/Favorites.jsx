import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  RefreshControl,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "../private.json";
import ProductCard from "../Shop/ProductCard"; // Import the ProductCard component
import QuantitySelector from './QuantitySelector'; // Import QuantitySelector

const Favorites = ({ navigation }) => {
  const [favorites, setFavorites] = useState([]);
  const [clientId, setClientId] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showQuantitySelector, setShowQuantitySelector] = useState(false);
  const [selectedQuantity, setSelectedQuantity] = useState(1);

  useEffect(() => {
    const retrieveClientId = async () => {
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

    retrieveClientId();
  }, []);

  useEffect(() => {
    if (clientId) {
      fetchFavorites(clientId);
    }
  }, [clientId, refresh]);

  const fetchFavorites = async (clientId) => {
    try {
      const response = await fetch(
        `${BASE_URL}/wishlist/${clientId}`
      );
      console.log('data');
      const data = await response.json();
      setFavorites(data);
    } catch (error) {
      console.error("Error fetching favorites:", error);
    }
  };

  const handleRentPress = (product) => {
    setSelectedProduct(product);
    setShowQuantitySelector(true);
  };

  const handleQuantitySelectorClose = (quantity) => {
    if (quantity) {
      setSelectedQuantity(quantity);
      setShowQuantitySelector(false);
    } else {
      setShowQuantitySelector(false);
    }
  };

  const handleRemoveFavorite = async (productId) => {
    if (!clientId) return;

    try {
      await fetch(`${BASE_URL}/wishlist`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ clientId, productsId: productId }),
      });

      // Update the favorites list immediately
      setFavorites(favorites.filter((item) => item.idproducts !== productId));
    } catch (error) {
      console.error('Error removing favorite:', error);
      Alert.alert("Error", "Failed to remove item. Please try again.");
    }
  };

  const handleOrder = async () => {
    if (!selectedProduct) {
      Alert.alert("Error", "Please select a product first.");
      return;
    }

    try {
      const orders = [{ ...selectedProduct, quantity: selectedQuantity }];
      await AsyncStorage.setItem('orders', JSON.stringify(orders));
      Alert.alert("Success", "Order saved successfully.");
      setSelectedProduct(null);
      setSelectedQuantity(1);
    } catch (error) {
      console.error('Error saving order to AsyncStorage:', error);
      Alert.alert("Error", "Failed to save order. Please try again.");
    }
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      setRefresh(!refresh); // Trigger re-fetching of favorites
    }, 2000);
  }, [refresh]);

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <Text style={styles.titleText}>Your Favorites</Text>
        {favorites.length === 0 ? (
          <View style={styles.noFavoritesContainer}>
            <Text style={styles.noFavoritesText}>
              You have no favorites yet. Start adding your favorite products!
            </Text>
          </View>
        ) : (
          <FlatList
            data={favorites}
            keyExtractor={(item) => item.idproducts.toString()}
            renderItem={({ item }) => (
              <ProductCard
                item={item}
                onPress={() => console.log(`Selected product with id: ${item.idproducts}`)}
                onRentPress={() => handleRentPress(item)}
                onRemovePress={() => handleRemoveFavorite(item.idproducts)}
                isInCart={false}
                toggleFavorite={() => console.log('Toggling favorite')}
              />
            )}
            contentContainerStyle={styles.listContent}
          />
        )}
        {showQuantitySelector && (
          <QuantitySelector
            visible={showQuantitySelector}
            onConfirm={handleQuantitySelectorClose}
            onCancel={() => setShowQuantitySelector(false)}
          />
        )}
      </ScrollView>
      {selectedProduct && (
        <TouchableOpacity style={styles.orderButton} onPress={handleOrder}>
          <Text style={styles.orderButtonText}>Order ({selectedQuantity})</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  listContent: {
    padding: 10,
  },
  noFavoritesContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  noFavoritesText: {
    fontSize: 18,
    color: "#666",
    textAlign: "center",
  },
  scrollView: {
    flexGrow: 1,
  },
  titleText: {
    fontSize: 24,
    fontWeight: "bold",
    padding: 10,
    alignSelf: "flex-start",
  },
  orderButton: {
    position: 'absolute',
    bottom: 80, // Adjust this value to ensure it is positioned correctly above the navbar
    left: 20,
    right: 20,
    backgroundColor: '#042630',
    paddingVertical: 15,
    alignItems: 'center',
    borderRadius: 5,
    elevation: 5,
  },
  orderButtonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default Favorites;
