import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  RefreshControl,
  ScrollView,
} from "react-native";
import { Dialog } from "react-native-simple-dialogs";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  GestureHandlerRootView,
  Swipeable,
  RectButton,
} from "react-native-gesture-handler";
import {BASE_URL} from '../private.json'
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
      console.log('data', response);

      const data = await response.json();
      setFavorites(data);
    } catch (error) {
      console.error("Error fetching favorites:", error);
    }
  };

  const removeFromFavorites = async (productId) => {
    try {
      const response = await fetch(`${BASE_URL}/wishlist`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
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
    }, 500);
  }, []);

  const renderRightActions = (progress, dragX, itemId) => {
    return (
      <RectButton
        style={styles.rightAction}
        onPress={() => {
          setSelectedProductId(itemId);
          setDialogVisible(true);
        }}
      >
        <Image
          source={require("../assets/icons/bin.png")}
          style={styles.trashIcon}
        />
        <Text style={styles.actionText}>DELETE</Text>
      </RectButton>
    );
  };

  const renderFavoriteItem = ({ item }) => (
    <Swipeable
      ref={(ref) => swipeableRefs.current.set(item.idproducts, ref)}
      renderRightActions={(progress, dragX) =>
        renderRightActions(progress, dragX, item.idproducts)
      }
      onSwipeableWillOpen={() => {
        if (swipeableRefs.current && swipeableRefs.current.size > 0) {
          swipeableRefs.current.forEach((ref, key) => {
            if (key !== item.idproducts && ref) {
              ref.close();
            }
          });
        }
      }}
    >
      <View style={styles.card}>
        <Image source={{ uri: item.picture }} style={styles.image} />
        <View style={styles.cardContent}>
          <Text style={styles.title}>{item.name}</Text>
          <Text style={styles.description}>{item.description}</Text>
          {item.price ? (
            <Text style={styles.price}>
              À PARTIR DE : {item.price.toFixed(2)} € TTC/JOUR
            </Text>
          ) : (
            <Text style={styles.price}>Price not available</Text>
          )}
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Réserver</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Swipeable>
  );

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.container}>
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
              keyExtractor={keyExtractor}
              renderItem={renderFavoriteItem}
              contentContainerStyle={styles.listContent}
            />
          )}
          <Dialog
            visible={isDialogVisible}
            title="Delete Product"
            onTouchOutside={() => {
              setDialogVisible(false);
              if (
                selectedProductId &&
                swipeableRefs.current.has(selectedProductId)
              ) {
                swipeableRefs.current.get(selectedProductId).close();
              }
            }}
            contentStyle={{ alignItems: "center", justifyContent: "center" }}
            animationType="fade"
          >
            <View>
              <Text>Would you like to delete this product?</Text>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-around",
                  marginTop: 20,
                }}
              >
                <TouchableOpacity
                  onPress={() => removeFromFavorites(selectedProductId)}
                >
                  <Text style={{ color: "#FF0000", fontSize: 18 }}>DELETE</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setDialogVisible(false);
                    if (
                      selectedProductId &&
                      swipeableRefs.current.has(selectedProductId)
                    ) {
                      swipeableRefs.current.get(selectedProductId).close();
                    }
                  }}
                >
                  <Text style={{ color: "#007BFF", fontSize: 18 }}>CANCEL</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Dialog>
        </View>
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
  rightAction: {
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
    width: 80,
    height: "100%",
  },
  actionText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  trashIcon: {
    width: 24,
    height: 24,
  },
});

export default Favorites;
