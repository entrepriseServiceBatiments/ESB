import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const WorkerList = ({ workers, favorites, toggleFavorite }) => {
  const renderWorkerItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.picture }} style={styles.image} />
      <View style={styles.cardContent}>
        <Text style={styles.title}>{item.userName}</Text>
        <Text style={styles.description}>{item.resume}</Text>
        <Text style={styles.details}>Phone: {item.phoneNum}</Text>
        <Text style={styles.details}>Email: {item.email}</Text>
        <Text style={styles.details}>Rating: {item.rating}</Text>
        <Text style={styles.details}>Job Title: {item.jobTitle}</Text>
        <Text style={styles.details}>Address: {item.address}</Text>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Réserver</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => toggleFavorite(item.id)}>
          <Icon
            name={favorites.includes(item.id) ? 'heart' : 'heart-outline'}
            size={30}
            color={favorites.includes(item.id) ? 'red' : 'black'}
          />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <FlatList
      data={workers}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderWorkerItem}
      contentContainerStyle={styles.list}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    flexGrow: 1,
  },
  card: {
    backgroundColor: '#fff',
    margin: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
    width: '100%',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  cardContent: {
    padding: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    color: '#777',
    marginBottom: 10,
    textAlign: 'center',
  },
  details: {
    fontSize: 14,
    marginBottom: 5,
  },
  button: {
    backgroundColor: '#2196F3',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default WorkerList;
