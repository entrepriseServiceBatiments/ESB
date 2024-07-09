import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

const ProductCard = ({ item, onReservePress, onFavoritePress }) => {
  return (
    <View style={styles.card}>
      <TouchableOpacity
        style={styles.favoriteIconContainer}
        onPress={() => onFavoritePress(item.id)}
      >
        <Image
          source={require('../assets/icons/favorite.png')}
          style={styles.favoriteIcon}
        />
      </TouchableOpacity>
      <Image source={{ uri: item.image }} style={styles.image} />
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
        <TouchableOpacity
          style={styles.button}
          onPress={() => onReservePress(item)}
        >
          <Text style={styles.buttonText}>Réserver</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 8,
    margin: 10,
    padding: 10,
    elevation: 3,
  },
  favoriteIconContainer: {
    alignItems: 'flex-end',
  },
  favoriteIcon: {
    width: 24,
    height: 24,
    tintColor: '#ff0000',
  },
  image: {
    width: '100%',
    height: 150,
    borderRadius: 8,
  },
  cardContent: {
    marginTop: 10,
    flex: 1, 
    justifyContent: 'space-between', 
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginVertical: 5,
  },
  price: {
    fontSize: 16,
    color: '#000',
    marginBottom: 10, 
  },
  button: {
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    borderRadius: 4,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default ProductCard;
