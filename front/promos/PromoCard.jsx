import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const PromoCard = ({ item }) => {
  return (
    <View style={styles.cardContainer}>
      <Image
        source={{ uri: item.image }}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.overlay}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.price}>${item.price}</Text>
        {item.oldPrice && <Text style={styles.oldPrice}>${item.oldPrice}</Text>}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: 380, 
    height: 250,
    marginRight: 5,
    marginBottom:15,
    borderRadius: 10,
    overflow: 'hidden',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 10,
    backgroundColor: 'rgba(4, 38, 48, 0.9)', // Semi-transparent overlay
  },
  title: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
  price: {
    fontSize: 14,
    color: '#fff',
  },
  oldPrice: {
    fontSize: 12,
    color: '#fff',
    textDecorationLine: 'line-through',
  },
});

export default PromoCard;
