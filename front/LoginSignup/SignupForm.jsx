import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Text, Image } from 'react-native';
import ErrorModal from './ErrorModal'; 

const SignupForm = ({ navigation, ErrorModalVisible, toggleErrorModal }) => {
  const [email, setEmail] = useState('');
  const [errorModalVisible, setErrorModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalMessage, setModalMessage] = useState('');

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const Next = () => {
    if (email.trim() === '') {
      setModalTitle('Error');
      setModalMessage('Please enter an email.');
      setErrorModalVisible(true);
      return;
    }
    if (!isValidEmail(email)) {
      setModalTitle('Error');
      setModalMessage('Please enter a valid email address.');
      setErrorModalVisible(true);
      return;
    }
    navigation.navigate('SignupPassword', { email });
  };

  const GoogleLogin = () => {
    console.log('Continue with Google');
    // Handle Google login logic here
  };

  const goToLogin = () => {
    navigation.navigate('LoginForm');
  };

  const closeModal = () => {
    setErrorModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require('../assets/logo.png')} />
      <Text style={styles.title}>Create an account</Text>
      <Text style={styles.p}>Enter your email to sign up for this app</Text>
      <Text style={styles.label}>Email*</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        accessibilityLabel="Email Input"
      />
      <TouchableOpacity style={styles.button} onPress={Next} accessibilityRole="button">
        <Text style={styles.buttonText}>Signup with email</Text>
      </TouchableOpacity>
      <View style={styles.separatorContainer}>
        <View style={styles.separator} />
        <Text style={styles.separatorText}>or continue with</Text>
        <View style={styles.separator} />
      </View>
      <TouchableOpacity style={styles.googleButton} onPress={GoogleLogin} accessibilityRole="button">
        <Image style={styles.googleIcon} source={require('../assets/google-icon.png')} />
        <Text style={styles.googleButtonText}>Google</Text>
      </TouchableOpacity>
      <View style={styles.separatorContainer}>
        <View style={styles.separator} />
        <Text style={styles.separatorText}>Already have an account?</Text>
        <View style={styles.separator} />
      </View>
      <TouchableOpacity style={styles.googleButton} onPress={goToLogin} accessibilityRole="button">
        <Text style={styles.googleButtonText}>Login</Text>
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
  image: {
    width: 300,
    height: 200,
    alignItems: "center",
    marginLeft: '10%',
  },
  input: {
    height: 50,
    borderColor: '#d0d6d6',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
    backgroundColor: "#d0d6d6"
  },
  title: {
    textAlign: "center",
    fontSize: 22,
    marginBottom: 8,
    color:"#042630"
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
  p: {
    textAlign: "center",
    fontSize: 14,
    paddingBottom: 20,
    color:"#042630"
  },
  separatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 16,
  },
  separator: {
    flex: 1,
    height: 1,
    backgroundColor: '#042630',
  },
  separatorText: {
    marginHorizontal: 8,
    fontSize: 14,
    color: '#042630',
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#042630',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
  },
  googleIcon: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  googleButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default SignupForm;
