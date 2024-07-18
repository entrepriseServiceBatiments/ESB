import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';

const ProductCard = ({ item, onPress, onRentPress, onRemovePress, isInCart, toggleFavorite }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image source={{ uri: item.picture }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.price}>{item.price} €</Text>
      </View>
      <TouchableOpacity 
        style={[styles.rentButton, isInCart && styles.removeButton]} 
        onPress={isInCart ? onRemovePress : onRentPress}
      >
        <Text style={styles.rentText}>{isInCart ? 'Remove' : 'Rent'}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.favoriteButton} onPress={() => toggleFavorite(item.idproducts)}>
        <Text style={styles.favoriteText}>Favorite</Text>
      </TouchableOpacity>
    </TouchableOpacity>
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
  rentButton: {
    backgroundColor: '#042630',
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 10,
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
    backgroundColor: '#2196F3',
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
  },
  favoriteText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default ProductCard;