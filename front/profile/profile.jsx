import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FontAwesome } from '@expo/vector-icons';
import CreditCardModal from './CreditCardModal';
import EditProfileModal from './EditProfileModal';

const Profile = () => {
  const [userName, setUserName] = useState('');
  const [creditCard, setCreditCard] = useState('');
  const [address, setAddress] = useState('');
  const [cin, setCin] = useState('');
  const [phoneNum, setPhoneNum] = useState('');
  const [picture, setPicture] = useState('');
  const [email, setEmail] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [editProfileModalVisible, setEditProfileModalVisible] = useState(false);
  const [creditCardNumber, setCreditCardNumber] = useState('');
  const [expirationMonth, setExpirationMonth] = useState('');
  const [expirationYear, setExpirationYear] = useState('');
  const [cvv, setCvv] = useState('');
  const [clientId, setClientId] = useState('');

  useEffect(() => {
    retrieveData();
  }, []);

  const retrieveData = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      let user = await AsyncStorage.getItem('user');
      user = JSON.parse(user);
      if (user !== null) {
        const CreditCard = JSON.parse(user.creditCard);
        setUserName(user.userName);
        setAddress(user.address);
        setCin(user.cin);
        setPhoneNum(user.phoneNum);
        setPicture(user.picture);
        setEmail(user.email);
        setClientId(user.idClient);
        setCreditCardNumber(CreditCard.creditCardNumber);
        setCvv(CreditCard.cvv);
        setExpirationMonth(CreditCard.expirationMonth);
        setExpirationYear(CreditCard.expirationYear);
      }
    } catch (error) {
      console.error('Error retrieving data:', error);
    }
  };

  const Logout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Logout', onPress: () => AsyncStorage.clear() },
      ],
      { cancelable: false }
    );
  };

  const AddPicture = () => {
    navgation.navigate('ProfilePicture')
  };

  const AddCreditCard = () => {
    setModalVisible(true);
  };

  const EditProfile = () => {
    setEditProfileModalVisible(true);
  };

  const handleUpdate = (updatedUserInfo) => {
    setUserName(updatedUserInfo.userName);
    setAddress(updatedUserInfo.address);
    setEmail(updatedUserInfo.email);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={Logout} style={styles.logoutButton}>
        <FontAwesome name="sign-out" size={24} color="#dc3545" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.profileImageContainer} onPress={AddPicture}>
        {picture ? (
          <Image style={styles.profileImage} source={{ uri: picture }} />
        ) : (
          <View style={styles.profileImagePlaceholder}>
            <Text>Select Image</Text>
          </View>
        )}
      </TouchableOpacity>

      <View style={styles.userInfoContainer}>
        <TouchableOpacity style={styles.editButton} onPress={EditProfile}>
          <FontAwesome name="pencil" size={24} color="#042630" />
          <Text style={styles.buttonText}>Edit Profile</Text>
        </TouchableOpacity>

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

        {creditCardNumber ? (
          <>
            <Text style={styles.label}>Card:</Text>
            <Text style={styles.creditCard}>**** **** **** {creditCardNumber.slice(-4)}</Text>
            <TouchableOpacity onPress={AddCreditCard}>
              <Text style={styles.addCreditCard}>Update Credit Card</Text>
            </TouchableOpacity>
          </>
        ) : (
          <TouchableOpacity onPress={AddCreditCard}>
            <Text style={styles.addCreditCard}>Add Credit Card</Text>
          </TouchableOpacity>
        )}
      </View>

      <CreditCardModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        clientId={clientId}
        onUpdate={handleUpdate}
        CreditCard={{ creditCardNumber, expirationYear, expirationMonth, cvv }}
      />

      <EditProfileModal
        modalVisible={editProfileModalVisible}
        setModalVisible={setEditProfileModalVisible}
        userInfo={{ userName, email, address, clientId }}
        onUpdate={handleUpdate}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#e6ede6',
    padding: 20,
  },
  logoutButton: {
    position: 'absolute',
    top: 20,
    right: 20,
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
    color: "#042630",
  },
  value: {
    fontSize: 16,
    marginBottom: 10,
    color: "#042630",
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
  editButton: {
    flexDirection: 'row',
    alignItems: 'right',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    marginBottom: 10,
    marginLeft:220
  },
  buttonText: {
    fontSize: 16,
    marginLeft: 10,
    color: '#042630',
  },
});

export default Profile;
