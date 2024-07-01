import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text, ImageBackground,Image } from 'react-native';
import axios from 'axios';

const AccountType = ({ route ,navigation}) => {
  const { email, password, username, address, phoneNumber, cin } = route.params;

  const AccountSelection = async (type) => {
    if (type === 'Personal') {
      try {
        const response = await axios.post('http://192.168.11.237:3000/clients', {
          userName: username,
          address: address,
          cin: parseInt(cin),
          phoneNum: parseInt(phoneNumber),
          email: email,
          password: password,
        });
        console.log('Response:', response.data);
        navigation.navigate('SignupPicture')
      } catch (error) {
        if (error.response) {
          console.error('Error response:', error.response.data);
          console.error('Status code:', error.response.status);
          alert(`Error: ${error.response.data.message || 'Failed to insert client'}`);
        } else if (error.request) {
          console.error('No response received:', error.request);
          alert('Error: No response from server. Please try again later.');
        } else {
          console.error('Error setting up request:', error.message);
          alert(`Error: ${error.message}`);
        }
        console.error('Error config:', error.config);
      }
    }
    console.log('Account Type:', type);
    console.log('User Details:', { email, password, username, address, phoneNumber, cin });
  };
  

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require('../assets/logo.png')} />
      <Text style={styles.Title}> Choose your subscription type ! </Text>
      <TouchableOpacity style={styles.button} onPress={() => AccountSelection('Professional')}>
        <ImageBackground
          source={require('../assets/ProfessionalAcc.png')}
          style={styles.imageBackground}
          imageStyle={styles.imageStyle}
        >
          <Text style={styles.buttonTitle}>Professional Account</Text>
          <Text style={styles.buttonText}>
            Join ABConstruction as {"\n"}a valued team member! {"\n"}
            Apply now to enhance your {"\n"}visibility to our extensive{"\n"} client base.
          </Text>
        </ImageBackground>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => AccountSelection('Personal')}>
        <ImageBackground
          source={require('../assets/PersonalAcount.png')}
          style={styles.imageBackground}
          imageStyle={styles.imageStyle}
        >
          <Text style={styles.buttonTitle}>Personal Account</Text>
          <Text style={styles.buttonText}>
            Partner with ABConstruction to rent top-quality building materials. Apply now to access our extensive inventory and reliable service.
          </Text>
        </ImageBackground>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: "#e6ede6"
  },
  button: {
    height: 200,
    marginVertical: 10,
    borderWidth:3,
    borderColor:'white',
    backgroundColor:"#042630"
  },  image: {
    width: 300,
    height: 200,
    alignItems: "center",
    marginLeft: '10%',
  },
  imageBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    overflow: 'hidden',
  },
  imageStyle: {
    resizeMode: 'contain',
    opacity: 0.9,
    marginLeft:220
  },
  buttonTitle: {
    fontSize: 24,
    color: '#ffffff',
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'left',
    marginRight:80
    
  },
  buttonText: {
    fontSize: 16,
    color: '#ffffff',
    textAlign: 'left',
    paddingHorizontal: 16,
    marginRight:120
    
  },
  Title:{
    fontSize:35,
    textAlign:"center",
    color:'#042630',
    
  }
});

export default AccountType;
