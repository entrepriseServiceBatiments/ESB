import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Subscribe = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');

  const navigation = useNavigation();

  const subScription = () => {
    Alert.alert('Success', 'Your subscription has been submitted!', [
      { text: 'OK', onPress: () => navigation.goBack() },
    ]);
  };

  return (
    <View style={styles.container}>
       <TouchableOpacity style={styles.closeButton} onPress={()=> navigation.goBack()}>
        <Text style={styles.closeButtonText}>Close</Text>
      </TouchableOpacity>
      <Text style={styles.title}>Subscribe Form</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="address"
        value={address}
        onChangeText={setAddress}
      />
      <TouchableOpacity style={styles.button} onPress={subScription}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    justifyContent: 'center',
    backgroundColor:'#e6ede6'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 250,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor:'lightgrey'
  },
  button: {
    backgroundColor: '#042630',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },closeButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    padding: 10,
  },
  closeButtonText: {
    fontSize: 16,
    color: 'darkred',
  }
});

export default Subscribe;
