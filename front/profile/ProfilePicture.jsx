import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  Modal,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {jwtDecode} from "jwt-decode";

const ProfilePictureModal = ({ modalVisible, setModalVisible, clientId, onUpdate }) => {
  const [profilePicture, setProfilePicture] = useState(null);
  const [userType, setUserType] = useState("");
  
 
  useEffect(() => {
    const getUserType = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        const decodedToken = jwtDecode(token);
        setUserType(decodedToken.userType);
      } catch (error) {
        console.error("Error retrieving user type:", error);
      }
    };

    getUserType();
  }, []);

  const selectImage = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
        return;
      }

      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled) {
        setProfilePicture(result.assets[0]);
        await uploadImageToCloudinary(result.assets[0].uri);
      }
    } catch (error) {
      console.error("Error selecting image:", error);
      Alert.alert("Error", "Failed to select image. Please try again.");
    }
  };

  const uploadImageToCloudinary = async (uri) => {
    const data = new FormData();
    data.append("file", {
      uri,
      type: "image/jpeg",
      name: uri.split('/').pop() ,
    });
    data.append("upload_preset", "Boughanmi");

    try {
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/tahacloudinary/image/upload",
        {
          method: "POST",
          body: data,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      
      const response = await res.json();
      console.log("Uploaded to Cloudinary:", response.secure_url);
      setProfilePicture((prev) => ({ ...prev, url: response.secure_url }));
      return response.secure_url;
    } catch (error) {
      console.error("Error uploading image:", error);
      Alert.alert("Error", "Failed to upload image. Please try again.");
      throw error;
    }
  };

  const Submit = async () => {
    try {
      let imageUrl = profilePicture.uri || "";


      const endpoint = userType === "client" ? `clients/${clientId}` : `workers/${clientId}`;
      const response = await axios.put(`http://192.168.1.109:3000/${endpoint}`, {
        picture: imageUrl,
      });


      onUpdate({ picture: imageUrl });
      setModalVisible(false);
      user=JSON.parse(await AsyncStorage.getItem('user'))
      user.picture=imageUrl
      AsyncStorage.setItem('user',JSON.stringify(user))
    } catch (error) {
      console.error("Error updating profile:", error);
      Alert.alert("Error", "Failed to update profile. Please try again.");
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <View style={styles.modalContainer}>
        <View style={styles.container}>
          <Text style={styles.title}>Add a Profile Picture</Text>
          <TouchableOpacity style={styles.imagePicker} onPress={selectImage}>
          {profilePicture ? (
            <Image source={{ uri: profilePicture.uri }} style={styles.image}  />
          ) : (
              <Text style={styles.imagePickerText}>Select Image</Text>
          )}
          </TouchableOpacity>
          <View style={styles.buttons}>
            <TouchableOpacity style={styles.button} onPress={Submit}>
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: "gray" }]}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  container: {
    width: 300,
    padding: 16,
    backgroundColor: "#e6ede6",
    borderRadius: 8,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    color: "#042630",
    textAlign: "center",
  },
  imagePicker: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: "#ccc",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
    alignSelf: "center",
  },
  imagePickerText: {
    color: "#042630",
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 16,
    alignSelf: "center",
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  button: {
    backgroundColor: "#042630",
    padding: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: "#ffffff",
  },
});

export default ProfilePictureModal;
