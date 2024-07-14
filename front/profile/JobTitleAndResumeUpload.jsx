import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert ,Modal} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import * as DocumentPicker from 'expo-document-picker';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from "../private.json"; 



const JobTitleAndResumeUpload = ({modalVisible,setModalVisible}) => {

  const [jobTitle, setJobTitle] = useState('');
  const [hourlyRate, setHourlyRate] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);

  const FilePick = async () => {
    try {
      const file = await DocumentPicker.getDocumentAsync({ type: 'application/pdf' });

      if (file.type !== 'cancel') {
        const cloudinaryUrl = await uploadFileToCloudinary(file);
        setSelectedFile({ uri: cloudinaryUrl, name: file.assets[0].name });
      } else {
        console.log('Document picker cancelled');
      }
    } catch (err) {
      console.error('Error picking file:', err);
      Alert.alert('Error', 'Failed to pick file. Please try again.');
    }
  };

  const uploadFileToCloudinary = async (file) => {
    const data = new FormData();
    data.append('file', {
      uri: file.assets[0].uri,
      type: 'application/pdf',
      name: file.assets[0].name,
    });
    data.append('upload_preset', 'Boughanmi');

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/tahacloudinary/image/upload`,
        {
          method: 'POST',
          body: data,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      const responseData = await response.json();
      if (responseData.secure_url) {
        return responseData.secure_url;
      } else {
        throw new Error('Upload failed');
      }
    } catch (error) {
      console.error('Error uploading file to Cloudinary:', error.message);
      Alert.alert('Error', 'Failed to upload file to Cloudinary. Please try again.');
      throw error;
    }
  };

  const Upload = async () => {
    if (selectedFile) {
      try {
        const token = await AsyncStorage.getItem('token');
        const client = await AsyncStorage.getItem('user');
        const idworker = JSON.parse(client).idworker;

        const data = {
          jobTitle,
          hourlyRate: parseFloat(hourlyRate),
          resume: selectedFile.uri,
        };

        const response = await axios.put(
          `${BASE_URL}/workers/${idworker}`,
          data,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        await AsyncStorage.setItem('user', JSON.stringify(response.data));
        Alert.alert('Success', 'Profile updated successfully.');
        setJobTitle('');
        setHourlyRate('');
        setSelectedFile(null);

      } catch (error) {
        Alert.alert('Error', 'Failed to update profile.');
        console.error('Error updating profile:', error);
      }
    } else {
      Alert.alert('No file selected', 'Please select a PDF file before uploading.');
    }
  };

  return (
 
 <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <View style={styles.container}>
      <TouchableOpacity style={styles.closeButton} onPress={()=>setModalVisible(false)}>
        <Text style={styles.closeButtonText}>Close</Text>
      </TouchableOpacity>
        <Text style={styles.label}>Job Title</Text>
        <Picker
          style={styles.input}
          selectedValue={jobTitle}
          onValueChange={(itemValue) => setJobTitle(itemValue)}
        >
          <Picker.Item label="Select job title" value="" />
          <Picker.Item label="Plumber" value="Plumber" />
          <Picker.Item label="Electrician" value="Electrician" />
          <Picker.Item label="Housekeeper" value="Housekeeper" />
          <Picker.Item label="Mason" value="Mason" />
          <Picker.Item label="HVAC Technician" value="HVAC Technician" />
          <Picker.Item label="Appliance Repair Technician" value="Appliance Repair Technician" />
          <Picker.Item label="Gardener" value="Gardener" />
          <Picker.Item label="Painter" value="Painter" />
        </Picker>

        <Text style={styles.label}>Hourly Rate</Text>
        <TextInput
          style={styles.input}
          value={hourlyRate}
          onChangeText={(text) => setHourlyRate(text)}
          keyboardType="numeric"
          placeholder="Enter hourly rate"
        />

        {!selectedFile && (
          <TouchableOpacity style={styles.button} onPress={FilePick}>
            <Text style={styles.buttonText}>Choose Resume (PDF)</Text>
          </TouchableOpacity>
        )}

        {selectedFile && (
          <View style={styles.selectedFileContainer}>
            <Text style={styles.selectedFileName} numberOfLines={1}>{selectedFile.name}</Text>
          </View>
        )}

        <TouchableOpacity style={styles.uploadButton} onPress={Upload}>
          <Text style={styles.uploadButtonText}>Submit</Text>
        </TouchableOpacity>
      </View>
      </Modal>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
     paddingTop:150,
     paddingBottom:240,
     marginLeft:10,
     marginRight:10,
    backgroundColor: 'white',
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    borderRadius: 10,
    
  },closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    padding: 10,
  },
  closeButtonText: {
    fontSize: 16,
    color: '#042630',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    width: '80%',
    backgroundColor:"#e6ede6"
  },
  button: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
    width: '80%',
  },
  buttonText: {
    color: '#042630',
    fontSize: 16,
  },
  selectedFileContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 20,
    width: '80%',
  },
  selectedFileName: {
    flex: 1,
    fontSize: 16,
    marginRight: 10,
    color: 'black',
  },
  uploadButton: {
    backgroundColor: '#042630',
    padding: 15,
    borderRadius: 5,
    width: '80%',
    alignItems: 'center',
  },
  uploadButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default JobTitleAndResumeUpload;
