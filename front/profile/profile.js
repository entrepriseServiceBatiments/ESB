import React, { useState,useEffect } from 'react';
import { View, Text, TextInput, Image, StyleSheet, Button, TouchableOpacity, Alert } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import axios from 'axios';

const ProfileEditScreen = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [userName, setUserName] = useState('hmed');
  const [creditCard, setCreditCard] = useState('');
  const [address, setAddress] = useState('');
  const [cin, setCin] = useState('');
  const [phoneNum, setPhoneNum] = useState('');
  const [email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [picture, setPicture] = useState('');

  useEffect(()=>{

  })
  

  const handleSave = async () => {
  

    try {
     
      const updatedProfile = {
        userName,
        creditCard,
        address,
        cin,
        phoneNum,
        email,
        Password   
      };

    //   const updateResponse = await axios.put(`http://192.168.1.27:8081/clients/`, updatedProfile);

    //   if (updateResponse.data.success) {
    //     setIsEditing(false);
    //     Alert.alert('Success', 'Profile updated successfully!');
    //   } else if (updateResponse.data.error === 'incorrect_password') {
    //     Alert.alert('Error', 'Current password is incorrect');
    //   } else {
    //     Alert.alert('Error', 'Failed to update profile');
    //   }
    }
     catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'An error occurred');
    }
  };

  const confirmSave = () => {
    Alert.alert(
      'Confirm Save',
      'Are you sure you want to save the changes?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Save', onPress: handleSave },
      ]
    );
  };

  const handleImagePick = () => {
    const options = {
      noData: true,
    };

    ImagePicker.showImagePicker(options, response => {
      if (response.uri) {
        setPicture(response.uri);
      }
    });
  };

  const getCreditCardDisplay = (creditCard) => {
    return creditCard ? `**** **** **** ${creditCard.slice(-4)}` : '';
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleImagePick}>
        {picture ? (
          <Image style={styles.profileImage} source={{ uri: picture }} />
        ) : (
          <View style={styles.profileImagePlaceholder}>
            <Text>Select Image</Text>
          </View>
        )}
      </TouchableOpacity>

      {isEditing ? (
        <TextInput
          style={styles.input}
          value={userName}
          onChangeText={setUserName}
          placeholder="User Name"
        />
      ) : (
        <Text style={styles.name}>{userName}</Text>
      )}
      {isEditing ? (
        <TextInput
          style={styles.input}
          value={creditCard}
          onChangeText={setCreditCard}
          placeholder="Credit Card"
          keyboardType="numeric"
          maxLength={16}
        />
      ) : (
        <Text style={styles.name}>{getCreditCardDisplay(creditCard)}</Text>
      )}
      {isEditing ? (
        <TextInput
          style={styles.input}
          value={address}
          onChangeText={setAddress}
          placeholder="Address"
        />
      ) : (
        <Text style={styles.name}>{address}</Text>
      )}
      {isEditing ? (
        <TextInput
          style={styles.input}
          value={cin}
          onChangeText={setCin}
          placeholder="CIN"
          keyboardType="numeric"
        />
      ) : (
        <Text style={styles.name}>{cin}</Text>
      )}
      {isEditing ? (
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
        />
      ) : (
        <Text style={styles.email}>{email}</Text>
      )}
      {isEditing ? (
        <>
          <TextInput
            style={styles.input}
            value={Password}
            onChangeText={setPassword}
            placeholder=" Password"
            secureTextEntry
          />
        
        </>
      ) : null}
      {isEditing ? (
        <TextInput
          style={styles.input}
          value={phoneNum}
          onChangeText={setPhoneNum}
          placeholder="Phone Number"
          keyboardType="numeric"
        />
      ) : (
        <Text style={styles.number}>{phoneNum}</Text>
      )}

      {isEditing ? (
        <Button title="Save" onPress={confirmSave} />
      ) : (
        <Button title="Edit Profile" onPress={() => setIsEditing(true)} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
  profileImagePlaceholder: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  email: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 20,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  number: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 20,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    width: '80%',
  },
});


export default ProfileEditScreen
