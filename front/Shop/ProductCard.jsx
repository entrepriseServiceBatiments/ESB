import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "../private.json";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; 
import AwesomeAlert from 'react-native-awesome-alerts';

const ProductCard = ({ item, onPress, onRentPress, onRemovePress, isInCart, toggleFavorite }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  useEffect(() => {
    const checkFavoriteStatus = async () => {
      try {
        const user = await AsyncStorage.getItem("user");
        if (user) {
          const { idClient, idworker } = JSON.parse(user);
          const clientId = idClient || idworker;

          const response = await fetch(`${BASE_URL}/wishlist/${clientId}`);
          const data = await response.json();
          const isFav = data.some(favItem => favItem.idproducts === item.idproducts);
          setIsFavorite(isFav);
        }
      } catch (error) {
        console.error("Error checking favorite status:", error);
      }
    };

    checkFavoriteStatus();
  }, [item.idproducts]);

  const showAlert = (action) => {
    let toFrom = action === 'added' ? 'to' : 'from';
    setAlertMessage(`The item has been ${action} ${toFrom} your favorites.`);
    setAlertVisible(true);
  };

  const ToggleFavorite = async () => {
    try {
      const user = await AsyncStorage.getItem("user");
      if (user) {
        const { idClient, idworker } = JSON.parse(user);
        const clientId = idClient || idworker;

        if (isFavorite) {
          await fetch(`${BASE_URL}/wishlist`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ clientId, productsId: item.idproducts }),
          });
          setIsFavorite(false);
          showAlert('removed');
        } else {
          await fetch(`${BASE_URL}/wishlist`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ clientId, productsId: item.idproducts }),
          });
          setIsFavorite(true);
          showAlert('added');
        }
        toggleFavorite(item.idproducts); 
      } else {
        Alert.alert('Please login to  be able to add product to favorites')
        
      }
    } catch (error) {
      console.error("Error toggling favorite status:", error);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.imageContainer} onPress={onPress}>
        <Image source={{ uri: item.picture }} style={styles.image} />
      </TouchableOpacity>
      <View style={styles.info}>
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.price}>{item.price} €</Text>
      </View>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity 
          style={[styles.rentButton, isInCart && styles.removeButton]} 
          onPress={isInCart ? onRemovePress : onRentPress}
        >
          <Text style={styles.rentText}>{isInCart ? 'Remove' : 'Rent'}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.favoriteButton} onPress={ToggleFavorite}>
          <Icon 
            name={isFavorite ? 'trash-can' : 'heart'} 
            size={24} 
            color={isFavorite ? 'darkred' : 'darkred'}
          />
        </TouchableOpacity>
      </View>

      <AwesomeAlert
        show={alertVisible}
        showProgress={false}
        title={isFavorite ? 'Removed' : 'Added'}
        message={alertMessage}
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={false}
        showConfirmButton={true}
        confirmText="OK"
        confirmButtonColor="#042630"
        onConfirmPressed={() => setAlertVisible(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    elevation: 4,
  },
  imageContainer: {
    marginBottom: 10,
  },
  image: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  info: {
    marginTop: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 16,
    color: '#666',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  rentButton: {
    backgroundColor: '#042630',
    paddingVertical: 10,
    borderRadius: 5,
    flex: 1,
    alignItems: 'center',
  },
  removeButton: {
    backgroundColor: '#FF0000',
  },
  rentText: {
    color: '#fff',
    fontSize: 16,
  },
  favoriteButton: {
    backgroundColor: 'transparent',
    paddingVertical: 10,
    borderRadius: 5,
    marginLeft: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor:'#042630'
  },
});

export default ProductCard;
