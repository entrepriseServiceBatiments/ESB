import React from 'react';
import { View, Text, StyleSheet, Button, Image } from 'react-native';

const LandingPage = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to RentAll Products</Text>
      <Text style={styles.subtitle}>Rent all the building products you need</Text>
      <Image source={{ uri: 'https://unbounce.com/photos/best-mobile-landing-page-examples-blog-header.jpg' }} style={styles.image} />
      <Button title="Get Started" onPress={() => navigation.navigate('Home')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    marginBottom: 20,
  },
  image: {
    width: 300,
    height: 200,
    resizeMode: 'cover',
    borderRadius: 10,
    marginBottom: 20,
  },
});

export default LandingPage;
