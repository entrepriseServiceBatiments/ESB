import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Text } from 'react-native';
import ErrorModal from './ErrorModal'; 

const SignupDetails = ({ route, navigation }) => {
  const { email, password } = route.params;
  const [username, setUsername] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [cin, setCin] = useState('');
  const [errorModalVisible, setErrorModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalMessage, setModalMessage] = useState('');

  const validateDetails = () => {
    if (username.trim() === '') return 'Please enter a username.';
    if (address.trim() === '') return 'Please enter an address.';
    if (phoneNumber.trim() === '') return 'Please enter a phone number.';
    if (cin.trim() === '') return 'Please enter a CIN.';
    if (!/^\d{8}$/.test(phoneNumber)) return 'Phone number must be 8 digits.';
    if (!/^\d{8}$/.test(cin)) return 'CIN must be 8 digits.';
    return '';
  };

  const Next = () => {
    const errorMessage = validateDetails();
    if (errorMessage) {
      setModalTitle('Error');
      setModalMessage(errorMessage);
      setErrorModalVisible(true);
      return;
    }
    navigation.navigate('AccountType', { email, password, username, address, phoneNumber, cin });
  };

  const closeModal = () => {
    setErrorModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your details</Text>
      <Text style={styles.label}>Username*</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your username"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
      />
      <Text style={styles.label}>Address*</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your address"
        value={address}
        onChangeText={setAddress}
      />
      <Text style={styles.label}>Phone Number*</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your phone number"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        keyboardType="phone-pad"
      />
      <Text style={styles.label}>CIN*</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your CIN"
        value={cin}
        onChangeText={setCin}
        keyboardType="number-pad"
      />
      <TouchableOpacity style={styles.button} onPress={Next}>
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>

      <ErrorModal
        visible={errorModalVisible}
        onClose={closeModal}
        title={modalTitle}
        message={modalMessage}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: "#e6ede6"
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: "#042630"
  },
  input: {
    height: 50,
    borderColor: '#042630',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
    backgroundColor: "#d0d6d6"
  },
  title: {
    textAlign: "center",
    fontSize: 22,
    marginBottom: 8,
    color:'#042630'
  },
  button: {
    backgroundColor: '#042630',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default SignupDetails;
