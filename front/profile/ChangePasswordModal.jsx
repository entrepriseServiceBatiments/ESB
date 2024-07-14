import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal, Alert } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {jwtDecode} from 'jwt-decode'
import { BASE_URL } from "../private.json"; 


const ChangePasswordModal = ({ modalVisible, setModalVisible, email }) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [userType,setUserType]=useState('')
  const updatePassword = async () => {
    try {
      if (newPassword !== confirmPassword) {
        Alert.alert('Error', 'New passwords do not match.');
        return;
      }
      
      const token = await AsyncStorage.getItem('token');
      const decodedToken=jwtDecode(token)
      setUserType(decodedToken.userType)
      const client=await AsyncStorage.getItem('user');
      const idClient=JSON.parse(client).idClient||JSON.parse(client).idworker
      const endpoint = userType === "client" ? `clients/updatePassword/${idClient}` : `workers/updatePassword/${idClient}`;

      const response = await axios.put(
        `${BASE_URL}/${endpoint}`,

        { currentPassword, newPassword },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      Alert.alert('Success', 'Password updated successfully.');
      setModalVisible(false);
    } catch (error) {
      Alert.alert('Error', 'Failed to update password.');
      console.error('Error updating password:', error);
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <View style={styles.modalView}>
        <Text style={styles.modalText}>Change Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Current Password"
          secureTextEntry={true}
          onChangeText={setCurrentPassword}
        />
        <TextInput
          style={styles.input}
          placeholder="New Password"
          secureTextEntry={true}
          onChangeText={setNewPassword}
        />
        <TextInput
          style={styles.input}
          placeholder="Confirm New Password"
          secureTextEntry={true}
          onChangeText={setConfirmPassword}
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={updatePassword}>
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={() => setModalVisible(false)}>
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    backgroundColor: 'white',
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    borderRadius: 10,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: "#042630",
  },
  input: {
    height: 50,
    borderColor: '#d0d6d6',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
    backgroundColor: "#d0d6d6",
    width: '80%',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginTop: 20,
  },
  button: {
    backgroundColor: '#042630',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    alignItems: 'center',
    marginVertical: 10,
    flex: 1,
    marginRight: 15,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  cancelButton: {
    backgroundColor: '#dc3545',
    marginLeft: 15,
  },
});

export default ChangePasswordModal;
