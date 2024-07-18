import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Modal } from 'react-native';
import { AirbnbRating } from 'react-native-ratings';

const WorkerDetailsScreen = ({ worker, onClose, visible }) => {
  if (!visible) return null;

  return (
    <Modal visible={true} animationType="slide" transparent={true}>
      <View style={styles.container}>
        <Image source={{ uri: worker.picture }} style={styles.workerImage} />
        <Text style={styles.workerTitle}>{worker.userName}</Text>
        <Text style={styles.jobTitle}>{worker.jobTitle}</Text>
        <Text style={styles.workerDescription}>Hourly Rate: {worker.hourlyRate}</Text>
        <View style={styles.ratingContainer}>
          <AirbnbRating
            count={5}
            defaultRating={worker.rating}
            size={20}
            showRating={false}
            isDisabled={true}
          />
        </View>
        <Text style={styles.workerDescription}>Address: {worker.address}</Text>
        {/* Render map component using worker's latitude and longitude */}
        {/* <MapView style={styles.map} /> */}
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Text style={styles.closeButtonText}>Close</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  workerImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 10,
  },
  workerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  jobTitle: {
    fontSize: 18,
    marginBottom: 10,
  },
  workerDescription: {
    fontSize: 16,
    marginBottom: 10,
  },
  ratingContainer: {
    marginBottom: 10,
  },
  map: {
    width: '100%',
    height: 200,
    marginBottom: 10,
  },
  closeButton: {
    backgroundColor: '#2196F3',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default WorkerDetailsScreen;
