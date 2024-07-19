import React from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';

const ServiceCard = ({ imageUri, title, description, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.card}>
      <ImageBackground
        source={{ uri: imageUri }}
        style={styles.imageBackground}
        imageStyle={styles.image}
      >
        <View style={styles.overlay}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description}>{description}</Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 200,
    marginRight: 15,
    borderRadius: 10,
    overflow: 'hidden',
  },
  imageBackground: {
    width: '100%',
    height: 150,
    justifyContent: 'flex-end',
  },
  image: {
    borderRadius: 10,
  },
  overlay: {
    backgroundColor: 'rgba(4, 38, 48, 0.9)',
    padding: 10,
  },
  title: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  description: {
    color: '#fff',
    fontSize: 14,
  },
});

export default ServiceCard;
