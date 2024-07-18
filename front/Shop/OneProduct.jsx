import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { AirbnbRating } from 'react-native-ratings';

const ProductDetailsModal = ({ 
  product, 
  onClose, 
  visible, 
  toggleFavorite, 
  onRentPress, 
  onRemovePress, 
  isInCart 
}) => {
  if (!visible || !product) return null;

  return (
    <Modal visible={true} animationType="slide" transparent={true}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Image source={{ uri: product.picture }} style={styles.productImage} />
          <View style={styles.titleContainer}>
            <Text style={styles.productTitle}>{product.name}</Text>
            <TouchableOpacity 
              style={styles.favoriteIconContainer} 
              onPress={() => toggleFavorite(product.idproducts)}
            >
              <Image 
                source={require('../assets/icons/favorite.png')} 
                style={styles.favoriteIcon} 
              />
            </TouchableOpacity>
          </View>
          <Text style={styles.productDescription}>{product.description}</Text>
          <Text style={styles.price}>Price per day: {product.price} Dt</Text>
          <View style={styles.ratingContainer}>
            <AirbnbRating
              count={5}
              defaultRating={product.rating}
              size={20}
              showRating={false}
              isDisabled={true}
            />
            <Text style={styles.numOfRatings}> ({product.numOfRatings})</Text>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.backButton} onPress={onClose}>
              <Text style={styles.buttonText}>Back to shop</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.button, isInCart && styles.removeButton]}
              onPress={isInCart ? onRemovePress : onRentPress}
            >
              <Text style={styles.buttonText}>
                {isInCart ? 'Remove' : 'Rent'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#e6ede6',
    width: '95%',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    elevation: 5,
  },
  productImage: {
    width: '100%',
    height: 200,
    borderRadius: 15,
    marginBottom: 15,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 10,
  },
  productTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  favoriteIconContainer: {
    padding: 5,
  },
  favoriteIcon: {
    width: 30,
    height: 30,
    tintColor: 'darkred',
  },
  productDescription: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center',
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  numOfRatings: {
    fontSize: 14,
    color: '#666',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  backButton: {
    backgroundColor: '#042630',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  button: {
    backgroundColor: '#042630',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  removeButton: {
    backgroundColor: '#ff4444',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ProductDetailsModal;