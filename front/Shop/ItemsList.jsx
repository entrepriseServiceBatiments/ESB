import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { BASE_URL } from "../private.json";
import ProductCard from './ProductCard';
import WorkerCard from './WorkerCard';
import WorkerDetailsScreen from './OneWorker';
import ProductDetailsModal from './OneProduct';
import QuantitySelector from './QuantitySelector';

const ItemsList = ({ category, type, onClose ,navigation}) => {
  const [favorites, setFavorites] = useState([]);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedWorker, setSelectedWorker] = useState(null);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [clientId, setClientId] = useState(null);
  const [quantitySelectorVisible, setQuantitySelectorVisible] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);

  useEffect(() => {
    const getClientID = async () => {
      try {
        const client = await AsyncStorage.getItem('user');
        if (client) {
          const parsedClient = JSON.parse(client);
          console.log('Client ID:', parsedClient.idClient || parsedClient.idworker);
          setClientId(parsedClient.idClient || parsedClient.idworker);
        }
      } catch (error) {
        console.error('Error retrieving client ID from AsyncStorage:', error);
      }
    };
    getClientID();
  }, []);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        let response;
        if (type === 'Products') {
          response = await axios.get(`${BASE_URL}/products/${category}`);
        } else if (type === 'Services') {
          response = await axios.get(`${BASE_URL}/workers/${category}`);
        }
        if (response && response.data) {
          setItems(response.data);
        } else {
          console.error('Error fetching items:', response);
          Alert.alert("Error", "Failed to fetch items. Please try again.");
        }
      } catch (error) {
        console.error('Error fetching items:', error);
        Alert.alert("Error", "Failed to fetch items. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, [category, type]);

  const toggleFavorite = async (itemId) => {
    if (!clientId) {
      console.error('Client ID is not available');
      return;
    }

    try {
      if (favorites.includes(itemId)) {
        setFavorites(favorites.filter(id => id !== itemId));
        await fetch(`${BASE_URL}/wishlist`, {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ clientId, productsId: itemId }),
        });
      } else {
        setFavorites([...favorites, itemId]);
        await fetch(`${BASE_URL}/wishlist`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ clientId, productsId: itemId }),
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

  const renderItem = (item) => {
    if (type === 'Products') {
      const isInCart = selectedProducts.some(p => p.idproducts === item.idproducts);
      console.log(item,'item');
      return (
        <ProductCard
          key={item.idproducts}
          item={item}
          onPress={() => ProductCardPress(item)}
          onRentPress={() => RentPress(item)}
          onRemovePress={() => RemoveFromCart(item.idproducts)}
          isInCart={isInCart}
          toggleFavorite={toggleFavorite}
        />
      );
    } else if (type === 'Services') {
      return (
        <WorkerCard
          key={item.idworker}
          item={item}
          onPress={() => WorkerCardPress(item)}

        />
      );
    } else {
      return null;
    }
  };
console.log(selectedProduct,'selected');
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={onClose}>
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>
      <ScrollView contentContainerStyle={styles.scrollView}>
        {loading ? (
          <ActivityIndicator size="large" color="#2196F3" />
        ) : (
          <View style={styles.gridContainer}>
            {items.map((item) => (
              <View key={item.idworker || item.idproducts} style={styles.cardContainer}>
                {renderItem(item)}
              </View>
            ))}
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
      {type === 'Products' && (
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
    backgroundColor: '#e6ede6',
  },
  scrollView: {
    paddingVertical: 20,
    paddingHorizontal: 10,
    marginTop: 60,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  cardContainer: {
    width: '48%',
    marginBottom: 15,
    marginTop: 10,
  },
  backButton: {
    backgroundColor: '#042630',
    padding: 15,
    borderRadius: 10,
    marginBottom: 50,
    alignItems: 'center',
    marginTop: 20,
    position: 'absolute',
    width: '90%',
    top: 10,
    left: 20,
    right: 10,
    zIndex: 1,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  orderButton: {
    backgroundColor: '#042630',
    paddingVertical: 15,
    alignItems: 'center',
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
  },
  orderButtonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default ItemsList;
