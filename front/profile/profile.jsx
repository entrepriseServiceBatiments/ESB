import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
  ScrollView,
  Dimensions,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FontAwesome, Entypo } from "@expo/vector-icons";
import { jwtDecode } from "jwt-decode";
import AwesomeAlert from "react-native-awesome-alerts";
import MapView, { Marker } from "react-native-maps";

import CreditCardModal from "./CreditCardModal";
import EditProfileModal from "./EditProfileModal";
import ProfilePictureModal from "./ProfilePicture";
import JobTitleAndResumeUpload from "./JobTitleAndResumeUpload";
import PositionModal from "./PositionModal";
import AllChats from "./AllChat";

const Profile = ({ navigation }) => {
  const [userName, setUserName] = useState("");
  const [status, setStatus] = useState("");
  const [address, setAddress] = useState("");
  const [cin, setCin] = useState("");
  const [phoneNum, setPhoneNum] = useState("");
  const [picture, setPicture] = useState("");
  const [email, setEmail] = useState("");
  const [resume, setResume] = useState("");
  const [creditCardModalVisible, setCreditCardModalVisible] = useState(false);
  const [editProfileModalVisible, setEditProfileModalVisible] = useState(false);
  const [profilePictureModalVisible, setProfilePictureModalVisible] = useState(false);
  const [creditCardNumber, setCreditCardNumber] = useState("");
  const [expirationMonth, setExpirationMonth] = useState("");
  const [expirationYear, setExpirationYear] = useState("");
  const [cvv, setCvv] = useState("");
  const [clientId, setClientId] = useState("");
  const [showPictureAlert, setShowPictureAlert] = useState(false);
  const [showCreditCardAlert, setShowCreditCardAlert] = useState(false);
  const [showResumeAlert, setShowResumeAlert] = useState(false);
  const [userType, setUserType] = useState("");
  const [jobTitleModalVisible, setJobTitleModalVisible] = useState(false);
  const [positionModalVisible, setPositionModalVisible] = useState(false);
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [allChatsModalVisible, setAllChatsModalVisible] = useState(false);

  const screenWidth = Dimensions.get("window").width;
  const screenHeight = Dimensions.get("window").height;

  useEffect(() => {
    retrieveData();
  }, [
    creditCardModalVisible,
    editProfileModalVisible,
    profilePictureModalVisible,
    jobTitleModalVisible,
    positionModalVisible,
  ]);

  const retrieveData = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const decodedToken = jwtDecode(token);
      setUserType(decodedToken.userType);
      let user = await AsyncStorage.getItem("user");

      user = JSON.parse(user);
      if (user !== null) {
        const creditCard = JSON.parse(user.creditCard || "{}");
        setUserName(user.userName);
        setAddress(user.address);
        setCin(user.cin);
        setStatus(user.status);
        setPhoneNum(user.phoneNum);
        setPicture(user.picture);
        setEmail(user.email);
        setClientId(user.idClient || user.idworker);
        setCreditCardNumber(creditCard.creditCardNumber || "");
        setCvv(creditCard.cvv || "");
        setExpirationMonth(creditCard.expirationMonth || "");
        setExpirationYear(creditCard.expirationYear || "");
        setResume(user.resume || "");
        setLatitude(Number(user.latitude));
        setLongitude(Number(user.longitude));

        if (!user.picture && !(await AsyncStorage.getItem("pictureAlertShown"))) {
          setShowPictureAlert(true);
        }
        if (!creditCard.creditCardNumber && !(await AsyncStorage.getItem("creditCardAlertShown"))) {
          setShowCreditCardAlert(true);
        }
        if (!user.resume && !(await AsyncStorage.getItem("resumeAlertShown")) && userType === "worker") {
          setShowResumeAlert(true);
        }
      }
    } catch (error) {
      console.error("Error retrieving data:", error);
    }
  };

  const Logout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Logout",
          onPress: () => {
            AsyncStorage.clear();
            
          },
        },
      ],
      { cancelable: false }
    );
  };

  const AddPicture = () => {
    setProfilePictureModalVisible(true);
    setShowPictureAlert(false);
  };

  const AddCreditCard = () => {
    setCreditCardModalVisible(true);
    setShowCreditCardAlert(false);
  };

  const EditProfile = () => {
    setEditProfileModalVisible(true);
  };

  const Update = (Info) => {
    if (Info.picture) setPicture(Info.picture);
    if (Info.userName) setUserName(Info.userName);
    if (Info.address) setAddress(Info.address);
    if (Info.email) setEmail(Info.email);
    if (Info.resume) setResume(Info.resume);
    if (Info.latitude) setLatitude(Info.latitude);
    if (Info.longitude) setLongitude(Info.longitude);
  };

  const JobTitleModalOpen = () => {
    setJobTitleModalVisible(true);
  };

  const JobTitleModalClose = () => {
    setJobTitleModalVisible(false);
  };

  const togglePositionModalOpen = () => {
    setPositionModalVisible(!positionModalVisible);
  };

  const openAllChatsModal = () => {
    setAllChatsModalVisible(true);
  };

  return (
    <View style={styles.mainContainer}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.container}>
          <TouchableOpacity onPress={Logout} style={styles.logoutButton}>
            <FontAwesome name="sign-out" size={24} color="darkred" />
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
            <View style={styles.row}>
              <Text style={styles.label}>User Name:</Text>
              <TouchableOpacity style={styles.editButton} onPress={EditProfile}>
                <FontAwesome name="pencil" size={24} color="darkred" />
              </TouchableOpacity>
            </View>
            <Text style={styles.value}>{userName}</Text>

            <View style={styles.row}>
              <Text style={styles.label}>Email:</Text>
            </View>
            <Text style={styles.value}>{email}</Text>

            <Text style={styles.label}>Status:</Text>
            <Text style={styles.value}>{status ? "Verified" : "Not verified"}</Text>

            <Text style={styles.label}>Phone Number:</Text>
            <Text style={styles.value}>{phoneNum}</Text>

            <Text style={styles.label}>CIN:</Text>
            <Text style={styles.value}>{cin}</Text>

            {creditCardNumber ? (
              <>
                <View style={styles.row}>
                  <Text style={styles.label}>Card:</Text>
                  <TouchableOpacity style={styles.editButton} onPress={AddCreditCard}>
                    <FontAwesome name="pencil" size={24} color="darkred" />
                  </TouchableOpacity>
                </View>
                <Text style={styles.creditCard}>**** **** **** {creditCardNumber.slice(-4)}</Text>
              </>
            ) : (
              <TouchableOpacity onPress={AddCreditCard}>
                <Text style={styles.addCreditCard}>Add Credit Card</Text>
              </TouchableOpacity>
            )}

            {resume ? (
              <>
                <View style={styles.row}>
                  <Text style={styles.label}>Resume:</Text>
                  <TouchableOpacity style={styles.editButton} onPress={JobTitleModalOpen}>
                    <FontAwesome name="pencil" size={24} color="darkred" />
                  </TouchableOpacity>
                </View>
                <Text>{resume.split("/").pop()}</Text>
              </>
            ) : (
              userType === "worker" && (
                <TouchableOpacity onPress={JobTitleModalOpen}>
                  <Text style={styles.addResume}>Add Resume</Text>
                </TouchableOpacity>
              )
            )}

            {latitude && longitude ? (
              <View>
                <View style={styles.row}>
                  <Text style={styles.label}>Address:</Text>
                  <TouchableOpacity onPress={togglePositionModalOpen} style={styles.editButton}>
                    <FontAwesome name="pencil" size={24} color="darkred" />
                  </TouchableOpacity>
                </View>
                <Text style={styles.value}>{address}</Text>
                <MapView
                  style={styles.map}
                  initialRegion={{
                    latitude: latitude,
                    longitude: longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                  }}
                >
                  <Marker coordinate={{ latitude: latitude, longitude: longitude }} />
                </MapView>
              </View>
            ) : (
              <TouchableOpacity onPress={togglePositionModalOpen} style={styles.positionButton}>
                <Text style={styles.buttonText}>Choose Position</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </ScrollView>

      <TouchableOpacity style={styles.floatingButton} onPress={openAllChatsModal}>
        <Entypo name="message" size={24} color="#e6ede6" />
      </TouchableOpacity>

      <CreditCardModal
        modalVisible={creditCardModalVisible}
        setModalVisible={setCreditCardModalVisible}
        clientId={clientId}
        creditCard={{ creditCardNumber, expirationYear, expirationMonth, cvv }}
      />

      <EditProfileModal
        modalVisible={editProfileModalVisible}
        setModalVisible={setEditProfileModalVisible}
        userInfo={{ userName, email, phoneNum, clientId, userType }}
        onUpdate={Update}
      />

      <ProfilePictureModal
        modalVisible={profilePictureModalVisible}
        setModalVisible={setProfilePictureModalVisible}
        clientId={clientId}
        onUpdate={Update}
      />

      <AllChats
        modalVisible={allChatsModalVisible}
        setModalVisible={setAllChatsModalVisible}
        navigation={navigation}
      />

      <PositionModal
        userType={userType}
        clientId={clientId}
        modalVisible={positionModalVisible}
        setModalVisible={setPositionModalVisible}
        onSave={(region) => {
          Update({
            latitude: region.latitude,
            longitude: region.longitude,
          });
        }}
      />

      <JobTitleAndResumeUpload
        modalVisible={jobTitleModalVisible}
        setModalVisible={setJobTitleModalVisible}
        onUpdate={Update}
      />

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
          AsyncStorage.setItem("pictureAlertShown", "true");
        }}
        onConfirmPressed={() => {
          setShowPictureAlert(false);
          AsyncStorage.setItem("pictureAlertShown", "true");
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
          AsyncStorage.setItem("creditCardAlertShown", "true");
        }}
        onConfirmPressed={() => {
          setShowCreditCardAlert(false);
          AsyncStorage.setItem("creditCardAlertShown", "true");
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
          AsyncStorage.setItem("resumeAlertShown", "true");
        }}
        onConfirmPressed={() => {
          setShowResumeAlert(false);
          AsyncStorage.setItem("resumeAlertShown", "true");
          JobTitleModalOpen();
        }}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    alignItems: "center",
    backgroundColor: "#e6ede6",
    padding: 20,
    marginTop: 30,
    paddingBottom: 200,
  },
  mapContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  logoutButton: {
    position: "absolute",
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
    backgroundColor: "#ddd",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 50,
  },
  userInfoContainer: {
    marginTop: 10,
    width: "100%",
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    elevation: 3,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#042630",
    marginBottom: 0,
  },
  value: {
    fontSize: 16,
    color: "#042630",
    marginBottom: 10,
  },
  editButton: {
    marginLeft: 10,
  },
  addCreditCard: {
    color: "#042630",
    fontWeight: "bold",
    textAlign: "right",
  },
  creditCard: {
    fontSize: 16,
    color: "#042630",
    marginBottom: 10,
  },
  addResume: {
    color: "#042630",
    fontWeight: "bold",
    textAlign: "right",
  },
  positionButton: {
    marginTop: 10,
    backgroundColor: "#042630",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
  map: {
    width: "100%",
    height: 200,
    marginTop: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: "80%",
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    elevation: 3,
  },
  floatingButton: {
    position: "absolute",
    marginTop: 210,
    bottom: 10,
    right: 30,
    backgroundColor: "#042630",
    borderRadius: 20,
    width: 80,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    zIndex: 1000,
  },
  buttonTouchable: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Profile;
