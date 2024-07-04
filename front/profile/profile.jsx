import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FontAwesome } from '@expo/vector-icons';

const Profile = ({ navigation }) => {
  const [userName, setUserName] = useState('');
  const [creditCard, setCreditCard] = useState('');
  const [address, setAddress] = useState('');
  const [cin, setCin] = useState('');
  const [phoneNum, setPhoneNum] = useState('');
  const [picture, setPicture] = useState('');
 const [email,setEmail]=useState("")
  useEffect(() => {
    retrieveData();
  }, []);

  const retrieveData = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      let user = await  AsyncStorage.getItem('user')
      user=JSON.parse(user)
      if (token !== null) {
       
        setUserName(user.userName);
        setCreditCard(user.creditCard);
        setAddress(user.address);
        setCin(user.cin);
        setPhoneNum(user.phoneNum);
        setPicture(user.picture);
        setEmail(user.email)
      }
    } catch (error) {
      console.error('Error retrieving data:', error);
    }
  };
  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Logout', onPress: ()=>AsyncStorage.clear() },
      ],
      { cancelable: false }
    );
  };
  const handleAddPicture = () => {
    // Implement logic to add picture
    Alert.alert('Add Picture', 'Implement logic to add a profile picture.');
  };

  const handleAddCreditCard = () => {
    // Implement logic to add credit card
    Alert.alert('Add Credit Card', 'Implement logic to add a credit card.');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.profileImageContainer} onPress={handleAddPicture}>
        {picture ? (
          <Image style={styles.profileImage} source={{ uri: picture }} />
        ) : (
          <View style={styles.profileImagePlaceholder}>
            <Text>Select Image</Text>
          </View>
        )}
      </TouchableOpacity>

      <View style={styles.userInfoContainer}>
        <Text style={styles.label}>User Name:</Text>
        <Text style={styles.value}>{userName}</Text>

        <Text style={styles.label}>Email:</Text>
        <Text style={styles.value}>{email}</Text>

        <Text style={styles.label}>Address:</Text>
        <Text style={styles.value}>{address}</Text>

        <Text style={styles.label}>Phone Number:</Text>
        <Text style={styles.value}>{phoneNum}</Text>
        <Text style={styles.label}>CIN:</Text>
        <Text style={styles.value}>{cin}</Text>
        {creditCard ? (
          <Text style={styles.creditCard}>{`**** **** **** ${creditCard.slice(-4)}`}</Text>
        ) : (
          <TouchableOpacity onPress={handleAddCreditCard}>
            <Text style={styles.addCreditCard}>Add Credit Card</Text>
          </TouchableOpacity>
        )}
            <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <FontAwesome name="sign-out" size={24} color="#dc3545" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    padding: 20,
  },
  profileImageContainer: {
    marginTop: 20,
    marginBottom: 20,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  profileImagePlaceholder: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
  },
  userInfoContainer: {
    width: '100%',
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 3,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
  value: {
    fontSize: 16,
    marginBottom: 10,
  },
  creditCard: {
    fontSize: 16,
    color: 'gray',
    marginTop: 10,
  },
  addCreditCard: {
    fontSize: 16,
    color: 'tomato',
    marginTop: 10,
  },
});

export default Profile;
