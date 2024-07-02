import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';

const SignupPicture = ({ route, navigation }) => {
  const [profilePicture, setProfilePicture] = useState(null);

  const selectImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions to make this work!');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setProfilePicture(result);
    }
  };

  const uploadImageToCloudinary = async () => {
    const data = new FormData();
    data.append('file', {
      uri: profilePicture.uri,
      type: 'image/jpeg',
      name: 'profile-pic.jpg',
    });
    data.append('upload_preset', 'finalProject');

    try {
      const res = await fetch('https://api.cloudinary.com/v1_1/dqsmyqnfl/image/upload', {
        method: 'POST',
        body: data,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      const response = await res.json();
      return response.secure_url;
    } catch (error) {
      console.error('Error uploading image:', error);
      Alert.alert('Error', 'Failed to upload image. Please try again.');
      throw error;
    }
  };

  const handleSubmit = async () => {
    try {
      let imageUrl = '';
      if (profilePicture) {
        imageUrl = await uploadImageToCloudinary();
      }

      const cin = route.params.cin; // assuming you pass the cin parameter from the previous screen
      const response = await axios.put(`http://192.168.1.16:3000/clients/${cin}`, {
        picture: imageUrl,
      });

      console.log('Response:', response.data);
      navigation.navigate('HomePage');
    } catch (error) {
      console.error('Error updating profile:', error);
      Alert.alert('Error', 'Failed to update profile. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add a Profile Picture</Text>
      {profilePicture ? (
        <Image source={{ uri: profilePicture.uri }} style={styles.image} />
      ) : (
        <TouchableOpacity style={styles.imagePicker} onPress={selectImage}>
          <Text style={styles.imagePickerText}>Select Image</Text>
        </TouchableOpacity>
      )}
      <View style={styles.buttons}>
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('HomePage')}>
          <Text style={styles.buttonText}>Skip</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#e6ede6',
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    color: '#042630',
  },
  imagePicker: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  imagePickerText: {
    color: '#042630',
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 16,
  },
  buttons: {
    flexDirection: 'row',
  },
  button: {
    backgroundColor: '#042630',
    padding: 16,
    borderRadius: 8,
    marginHorizontal: 8,
  },
  buttonText: {
    color: '#ffffff',
  },
});

export default SignupPicture;
