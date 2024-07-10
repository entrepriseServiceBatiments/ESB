import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert, ScrollView, Modal } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FontAwesome } from '@expo/vector-icons';
import CreditCardModal from './CreditCardModal';
import EditProfileModal from './EditProfileModal';
import ProfilePictureModal from './ProfilePicture';
import { jwtDecode } from 'jwt-decode'; 
import AwesomeAlert from 'react-native-awesome-alerts';
import JobTitleAndResumeUpload from './JobTitleAndResumeUpload'; 

const Profile = ({ navigation }) => {
  const [userName, setUserName] = useState('');
  const [address, setAddress] = useState('');
  const [cin, setCin] = useState('');
  const [phoneNum, setPhoneNum] = useState('');
  const [picture, setPicture] = useState('');
  const [email, setEmail] = useState('');
  const [resume, setResume] = useState('');
  const [creditCardModalVisible, setCreditCardModalVisible] = useState(false);
  const [editProfileModalVisible, setEditProfileModalVisible] = useState(false);
  const [profilePictureModalVisible, setProfilePictureModalVisible] = useState(false);
  const [creditCardNumber, setCreditCardNumber] = useState('');
  const [expirationMonth, setExpirationMonth] = useState('');
  const [expirationYear, setExpirationYear] = useState('');
  const [cvv, setCvv] = useState('');
  const [clientId, setClientId] = useState('');
  const [showPictureAlert, setShowPictureAlert] = useState(false);
  const [showCreditCardAlert, setShowCreditCardAlert] = useState(false);
  const [showResumeAlert, setShowResumeAlert] = useState(false);
  const [userType, setUserType] = useState('');
  const [jobTitleModalVisible, setJobTitleModalVisible] = useState(false); 

  useEffect(() => {
    retrieveData();
  }, [creditCardModalVisible, editProfileModalVisible, profilePictureModalVisible,jobTitleModalVisible]);

  const retrieveData = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const decodedToken = jwtDecode(token);
      setUserType(decodedToken.userType);
      let user = await AsyncStorage.getItem('user');
      
      user = JSON.parse(user);
      if (user !== null) {
        console.log(user);
        const creditCard = JSON.parse(user.creditCard || '{}');
        setUserName(user.userName);
        setAddress(user.address);
        setCin(user.cin);
        setPhoneNum(user.phoneNum);
        setPicture(user.picture);
        setEmail(user.email);
        setClientId(user.idClient||user.idworker);
        setCreditCardNumber(creditCard.creditCardNumber || '');
        setCvv(creditCard.cvv || '');
        setExpirationMonth(creditCard.expirationMonth || '');
        setExpirationYear(creditCard.expirationYear || '');
        setResume(user.resume || '');

        if (!user.picture && !(await AsyncStorage.getItem('pictureAlertShown'))) {
          setShowPictureAlert(true);
          
        }
        if (!creditCard.creditCardNumber && !(await AsyncStorage.getItem('creditCardAlertShown'))) {
          setShowCreditCardAlert(true);
          
        }
        if (!user.resume && !(await AsyncStorage.getItem('resumeAlertShown')) && userType==='worker') {
          setShowResumeAlert(true);
         
        }
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
        { text: 'Logout', onPress: () => {
          AsyncStorage.clear(); 
        }},
      ],
      { cancelable: false }
    );
  };

  const AddPicture = () => {
    setProfilePictureModalVisible(true);
    console.log(profilePictureModalVisible);
    setShowPictureAlert(false); 
  };

  const AddCreditCard = () => {
    setCreditCardModalVisible(true);
    setShowCreditCardAlert(false); 
  };

  const EditProfile = () => {
    setEditProfileModalVisible(true);
  };

  const handleUpdate = (updatedUserInfo) => {
    if (updatedUserInfo.picture) setPicture(updatedUserInfo.picture);
    if (updatedUserInfo.userName) setUserName(updatedUserInfo.userName);
    if (updatedUserInfo.address) setAddress(updatedUserInfo.address);
    if (updatedUserInfo.email) setEmail(updatedUserInfo.email);
    if (updatedUserInfo.resume) setResume(updatedUserInfo.resume);
  };

  const handleJobTitleModalOpen = () => {
    setJobTitleModalVisible(true);
  };

  const handleJobTitleModalClose = () => {
    setJobTitleModalVisible(false);
  };

  return (
    <ScrollView>
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

          {resume ? (
            <>
              <Text style={styles.label}>Resume:</Text>
              <Text > {resume.split('/').pop()} </Text>
              <TouchableOpacity onPress={handleJobTitleModalOpen}>
              <Text style={styles.buttonText}>Update Resume</Text>
            </TouchableOpacity>
            </>
          ) : ( userType==='worker' &&
            <TouchableOpacity onPress={handleJobTitleModalOpen}>
              <Text style={styles.addResume}>Add Resume</Text>
            </TouchableOpacity>
          )}
        </View>

        <CreditCardModal
          modalVisible={creditCardModalVisible}
          setModalVisible={setCreditCardModalVisible}
          clientId={clientId}
          creditCard={{ creditCardNumber, expirationYear, expirationMonth, cvv }}
        />

        <EditProfileModal
          modalVisible={editProfileModalVisible}
          setModalVisible={setEditProfileModalVisible}
          userInfo={{ userName, email, address, clientId }}
          onUpdate={handleUpdate}
        />

        <ProfilePictureModal
          modalVisible={profilePictureModalVisible}
          setModalVisible={setProfilePictureModalVisible}
          clientId={clientId}
          onUpdate={handleUpdate}
        />

        <Modal
          animationType="slide"
          transparent={true}
          visible={jobTitleModalVisible}
          onRequestClose={handleJobTitleModalClose}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <JobTitleAndResumeUpload closeModal={handleJobTitleModalClose} />
            </View>
          </View>
        </Modal>

        <AwesomeAlert
          show={showPictureAlert}
          showProgress={false}
          title="No Profile Picture"
          message="Please add a profile picture to enhance your profile."
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={false}
          showCancelButton={true}
          showConfirmButton={true}
          cancelText="Cancel"
          confirmText="Add Picture"
          confirmButtonColor="#042630"
          onCancelPressed={() => {
            setShowPictureAlert(false);
            AsyncStorage.setItem('pictureAlertShown', 'true');
          }}
          onConfirmPressed={() => {
            setShowPictureAlert(false);
            AsyncStorage.setItem('pictureAlertShown', 'true');
            AddPicture();
          }}
        />

        <AwesomeAlert
          show={showCreditCardAlert}
          showProgress={false}
          title="No Credit Card"
          message="Please add a credit card to enable payments."
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={false}
          showCancelButton={true}
          showConfirmButton={true}
          cancelText="Cancel"
          confirmText="Add Credit Card"
          confirmButtonColor="#042630"
          onCancelPressed={() => {
            setShowCreditCardAlert(false);
            AsyncStorage.setItem('creditCardAlertShown', 'true');
          }}
          onConfirmPressed={() => {
            setShowCreditCardAlert(false);
            AsyncStorage.setItem('creditCardAlertShown', 'true');
            AddCreditCard();
          }}
        />

        <AwesomeAlert
          show={showResumeAlert}
          showProgress={false}
          title="No Resume"
          message="Please upload a resume to enhance your profile."
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={false}
          showCancelButton={true}
          showConfirmButton={true}
          cancelText="Cancel"
          confirmText="Add Resume"
          confirmButtonColor="#042630"
          onCancelPressed={() => {
            setShowResumeAlert(false);
            AsyncStorage.setItem('resumeAlertShown', 'true');
          }}
          onConfirmPressed={() => {
            setShowResumeAlert(false);
            AsyncStorage.setItem('resumeAlertShown', 'true');
            handleJobTitleModalOpen();
          }}
        />
      </View>
    </ScrollView>
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
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    marginBottom: 10,
    alignSelf: 'flex-end',
  },
  buttonText: {
    fontSize: 16,
    marginLeft: 10,
    color: '#042630',
  },
  noResume: {
    fontSize: 16,
    color: 'red',
    marginTop: 10,
  },
});

export default Profile;
