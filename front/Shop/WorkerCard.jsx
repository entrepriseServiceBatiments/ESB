import React ,{useState,useEffect}from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { AirbnbRating } from 'react-native-ratings';
import {BASE_URL} from '../private.json'

const WorkerCard = ({ item, onPress }) => {
  const { picture, jobTitle, hourlyRate, status, userName, rating } = item;

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image source={{ uri: picture }} style={styles.image} resizeMode="cover" />
      <View style={styles.cardContent}>
        <Text style={styles.title}>{userName}</Text>
        <Text style={styles.description}>{jobTitle}</Text>
        <Text style={styles.description}>Hourly Rate: {hourlyRate}</Text>
        {status === 1 && <Text style={styles.verifiedText}>Verified</Text>}
        <View style={styles.ratingContainer}>
          <AirbnbRating count={5} defaultRating={rating} size={15} showRating={false} isDisabled={true} />
        </View>
        <TouchableOpacity style={styles.button} onPress={onPress}>
          <Text style={styles.buttonText}>View Profile</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 8,
    margin: 3,
    width: '100%', // Ensure the card takes the full width of its container
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
  verifiedText: {
    fontSize: 12,
    color: 'green',
    marginTop: 5,
  },
  ratingContainer: {
    marginTop: 5,
  },
  button: {
    backgroundColor: '#042630',
    paddingVertical: 10,
    borderRadius: 4,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default WorkerCard;
