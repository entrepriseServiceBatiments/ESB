import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, Alert, Dimensions } from 'react-native'; 
import MapView, { Marker } from 'react-native-maps';
import axios from 'axios';
import { BASE_URL } from '../private.json';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width, height } = Dimensions.get('window');

const PositionModal = ({ modalVisible, setModalVisible, onSave, clientId, userType }) => {
  const [region, setRegion] = useState({
    latitude: 36.806389,
    longitude: 10.181667,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const getAddressFromCoordinates = async (latitude, longitude) => {
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
      );
      if (response.data && response.data.display_name) {
        return response.data.display_name;
      } else {
        return null;
      }
    } catch (error) {
      console.error('Error fetching address:', error);
      return null;
    }
  };

  const Save = async () => {
    try {
      const address = await getAddressFromCoordinates(region.latitude, region.longitude);
      if (!address) {
        Alert.alert('Error', 'Failed to get address from coordinates.');
        return;
      }

      const response = await axios.put(`${BASE_URL}/${userType}s/${clientId}`, {
        latitude: region.latitude,
        longitude: region.longitude,
        address: address,
      });

      console.log('Position updated successfully:', response.data);
      AsyncStorage.setItem('user', JSON.stringify(response.data));

      onSave({ ...region, address });
      setModalVisible(false);
      Alert.alert('Success', 'Position updated successfully');
    } catch (error) {
      console.error('Error updating position:', error);
      Alert.alert('Error', 'Failed to update position. Please try again.');
    }
  };

  const handleMapPress = (event) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    setRegion((prevRegion) => ({
      ...prevRegion,
      latitude,
      longitude,
    }));
  };

  return (
    <Modal animationType="slide" transparent={true} visible={modalVisible}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
            <Text style={styles.closeButtonText}>X</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Select Your Position</Text>
          <MapView
            style={styles.map}
            region={region}
            onPress={handleMapPress}
          >
            <Marker coordinate={{ latitude: region.latitude, longitude: region.longitude }} />
          </MapView>
          <TouchableOpacity style={styles.saveButton} onPress={Save}>
            <Text style={styles.saveButtonText}>Save Position</Text>
          </TouchableOpacity>
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
    width: width - 40, 
    height: height - 80, 
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    position: 'relative',
  },
  title: {
    fontSize: 18,
    marginBottom: 10,
  },
  map: {
    width: '100%',
    height: '70%', 
    marginBottom: 20,
  },
  saveButton: {
    backgroundColor: '#042630',
    padding: 10,
    borderRadius: 5,
    alignSelf: 'center', 
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    padding: 10,
  },
  closeButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default PositionModal;
