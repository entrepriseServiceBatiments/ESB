import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Alert,
} from "react-native";
import ChangePasswordModal from "./ChangePasswordModal";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { BASE_URL } from "../private.json";

const EditProfileModal = ({
  modalVisible,
  setModalVisible,
  userInfo,
  onUpdate,
}) => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNum, setPhoneNum] = useState(0);
  const [passwordModalVisible, setPasswordModalVisible] = useState(false);

  useEffect(() => {
    if (userInfo) {
      setUserName(userInfo.userName);
      setEmail(userInfo.email);
      setPhoneNum(userInfo.phoneNum);
    }
  }, [userInfo]);
  const x = 20;
  const openPasswordModal = () => {
    setPasswordModalVisible(true);
  };

  const updateProfile = async () => {
    try {
      const client = await AsyncStorage.getItem("user");
      const token = await AsyncStorage.getItem("token");
      const id = JSON.parse(client).idworker||JSON.parse(client).idClient;
      const data = { userName, email, phoneNum: Number(phoneNum) };
      const response = await axios.put(
        `${BASE_URL}/${userInfo.userType}s/${id}`,
        data,
        { headers: { Authorization: `${token}` } }
      );

      await AsyncStorage.setItem("user", JSON.stringify(response.data));
      setModalVisible(false);
      Alert.alert("Success", "Profile updated successfully.");
      onUpdate(response.data);
    } catch (error) {
      Alert.alert("Error", "Failed to update info.");
      console.error("Error updating info:", error);
    }
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
          value={userName}
          onChangeText={setUserName}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Phone Number"
          onChangeText={setPhoneNum}
          value={phoneNum.toString()}
          keyboardType="numeric"
        />

        <TouchableOpacity
          style={[styles.button, styles.passwordButton]}
          onPress={openPasswordModal}
        >
          <Text style={styles.buttonText}>Change Password</Text>
        </TouchableOpacity>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.saveButton]}
            onPress={updateProfile}
          >
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.cancelButton]}
            onPress={() => setModalVisible(false)}
          >
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
        </View>

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
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    backgroundColor: "white",
    padding: 20,
    shadowColor: "#000",
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
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    color: "#042630",
  },
  input: {
    height: 50,
    borderColor: "#d0d6d6",
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
    backgroundColor: "#d0d6d6",
    width: "80%",
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    alignItems: "center",
    marginVertical: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  passwordButton: {
    backgroundColor: "#042630",
    width: "80%",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
  },
  saveButton: {
    backgroundColor: "#042630",
    flex: 1,
    marginRight: 10,
  },
  cancelButton: {
    backgroundColor: "#dc3545",
    flex: 1,
    marginLeft: 10,
  },
});

export default EditProfileModal;
