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
      const data = await response.json();
      setFavorites(data);
    } catch (error) {
      console.error("Error fetching favorites:", error);
    }
  };

  const RentPress = (product) => {
    setSelectedProduct(product);
    setShowQuantitySelector(true);
  };

  const QuantitySelectorClose = (quantity) => {
    if (quantity) {
      setSelectedQuantity(quantity);
      setShowQuantitySelector(false);
    } else {
      setShowQuantitySelector(false);
    }
  };

  const RemoveFavorite = async (productId) => {
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

  const Order = async () => {
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
                onRentPress={() => RentPress(item)}
                onRemovePress={() => RemoveFavorite(item.idproducts)}
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
            onConfirm={QuantitySelectorClose}
            onCancel={() => setShowQuantitySelector(false)}
          />
        )}
      </ScrollView>
      {selectedProduct && (
        <TouchableOpacity style={styles.orderButton} onPress={Order}>
          <Text style={styles.orderButtonText}>Order ({selectedQuantity})</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e6ede6",
    marginTop:30,
    
  },
  listContent: {
    padding: 10,
    margin:20
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
    alignSelf: "center",
  },
  orderButton: {
    position: 'absolute',
    width:'100%',
    bottom: 0, 
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
