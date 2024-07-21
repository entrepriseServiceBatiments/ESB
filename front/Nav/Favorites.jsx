import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  RefreshControl,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { Dialog } from "react-native-simple-dialogs";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  GestureHandlerRootView,
  Swipeable,
  RectButton,
} from "react-native-gesture-handler";

const Favorites = ({ navigation }) => {
  const [favorites, setFavorites] = useState([]);
  const [isDialogVisible, setDialogVisible] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [clientId, setClientId] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const swipeableRefs = useRef(new Map());

  useEffect(() => {
    const retrieveClientId = async () => {
      try {
        let user = await AsyncStorage.getItem("user");
        if (user) {
          user = JSON.parse(user);
          setClientId(user.idClient || user.idworker);
          console.log("Retrieved user:", user);
          console.log("Set clientId:", user.idClient || user.idworker);
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
        `http://localhost:3000/wishlist/${clientId}`
      );
      const data = await response.json();
      setFavorites(data);
    } catch (error) {
      console.error("Error fetching favorites:", error);
    }
  };

  const removeFromFavorites = async (productId) => {
    try {
      const response = await fetch("http://localhost:3000/wishlist", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ clientId, productsId: productId }),
      });

      if (response.ok) {
        setFavorites((prevFavorites) =>
          prevFavorites.filter((item) => item.id !== productId)
        );
        alert("Item removed from favorites");
        setRefresh(!refresh);
      } else {
        const data = await response.json();
        throw new Error(data.error);
      }
    } catch (error) {
      console.error("Error removing item from wishlist:", error);
      alert(`Error removing item: ${error.message}`);
    } finally {
      setDialogVisible(false);
    }
  };

  const keyExtractor = (item, index) => {
    if (item && item.id) {
      return item.id.toString();
    } else {
      return index.toString();
    }
  };

  const onRefresh = React.useCallback(() => {
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
    <GestureHandlerRootView style={{ flex: 1 }}>
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
    </GestureHandlerRootView>
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
  card: {
    flex: 1,
    margin: 10,
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 4,
    elevation: 2,
  },
  image: {
    width: "100%",
    height: 150,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  cardContent: {
    padding: 10,
    position: "relative",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  description: {
    fontSize: 14,
    color: "#666",
  },
  price: {
    fontSize: 16,
    color: "#000",
    marginTop: 5,
  },
  button: {
    marginTop: 10,
    backgroundColor: "#ff0000",
    paddingVertical: 10,
    borderRadius: 4,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
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
