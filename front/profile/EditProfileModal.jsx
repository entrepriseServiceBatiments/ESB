import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal, Alert } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ChangePasswordModal from './ChangePasswordModal'; // Import ChangePasswordModal

const EditProfileModal = ({ modalVisible, setModalVisible, userInfo, onUpdate }) => {
  const [userName, setUserName] = useState(userInfo.userName);
  const [email, setEmail] = useState(userInfo.email);
  const [address, setAddress] = useState(userInfo.address);
  const [passwordModalVisible, setPasswordModalVisible] = useState(false);

  const openPasswordModal = () => {
    setPasswordModalVisible(true);
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <View style={styles.modalView}>
        <Text style={styles.modalText}>Edit Profile</Text>
        <TextInput
          style={styles.input}
          placeholder="User Name"
          defaultValue={userInfo.userName}
          onChangeText={setUserName}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          defaultValue={userInfo.email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Address"
          defaultValue={userInfo.address}
          onChangeText={setAddress}
        />
        <TouchableOpacity style={styles.button} onPress={() => updateProfile({ userName, email, address })}>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={openPasswordModal}>
          <Text style={styles.buttonText}>Change Password</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={() => setModalVisible(false)}>
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>

        {/* Render ChangePasswordModal */}
        <ChangePasswordModal
          modalVisible={passwordModalVisible}
          setModalVisible={setPasswordModalVisible}
          email={email}
        />
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
  button: {
    backgroundColor: '#042630',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  cancelButton: {
    backgroundColor: '#dc3545',
  },
});

export default EditProfileModal;
