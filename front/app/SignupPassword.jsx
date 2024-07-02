import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Text, Image } from 'react-native';
import ErrorModal from './ErrorModal'; // Adjust the path as per your file structure

const SignupPassword = ({ route, navigation }) => {
  const { email } = route.params;
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorModalVisible, setErrorModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalMessage, setModalMessage] = useState('');

  const Next = () => {
    if (password.trim() === '' || confirmPassword.trim() === '') {
      setModalTitle('Error');
      setModalMessage('Please fill in both password fields.');
      setErrorModalVisible(true);
      return;
    }
    
    if (password === confirmPassword) {
      // Passwords match, navigate to the next screen
      navigation.navigate('SignupDetails', { email, password });
    } else {
      // Passwords do not match, display modal with error message
      setModalTitle('Error');
      setModalMessage('Passwords do not match.');
      setErrorModalVisible(true);
    }
  };

  const closeModal = () => {
    setErrorModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require('../assets/logo.png')} />
      <Text style={styles.title}>Set Your Password</Text>
      <Text style={styles.label}>Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        autoCapitalize="none"
      />
      <Text style={styles.label}>Confirm Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Confirm your password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
        autoCapitalize="none"
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
    color: "#042630"
  },
  image: {
    width: 300,
    height: 200,
    alignItems: "center",
    marginLeft: '10%',
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

export default SignupPassword;
