import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';

const CardSelector = ({ onCardPress }) => (
  <>
    <TouchableOpacity
      style={styles.card}
      onPress={() => onCardPress('Products')}
    >
      <ImageBackground source={require('../assets/Products.jpg')} style={styles.imageBackground}>
        <View style={styles.titleContainer}>
          <Text style={styles.cardTitle}>Products</Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
    <TouchableOpacity
      style={styles.card}
      onPress={() => onCardPress('Services')}
    >
      <ImageBackground source={require('../assets/Services.png')} style={styles.imageBackground}>
        <View style={styles.titleContainer}>
          <Text style={styles.cardTitle}>Services</Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  </>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    margin: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
    width: '100%',
    flex: 1,
    overflow: 'hidden',
  },
  imageBackground: {
    width: '100%',
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 10,
    borderRadius: 10,
  },
  cardTitle: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default CardSelector;
