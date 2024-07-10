import React, { useState } from 'react';
import { View, Text, Modal, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CreditCardModal = ({ modalVisible, setModalVisible, clientId, onUpdate ,CreditCard}) => {
  const [creditCardNumber, setCreditCardNumber] = useState('');
  const [expirationMonth, setExpirationMonth] = useState('');
  const [expirationYear, setExpirationYear] = useState('');
  const [cvv, setCvv] = useState('');

  const validateCreditCardNumber = (number) => {
    const regex = new RegExp("^[0-9]{16}$");
    if (!regex.test(number)) return false;
    let sum = 0;
    let shouldDouble = false;
    for (let i = number.length - 1; i >= 0; i--) {
      let digit = parseInt(number.charAt(i));
      if (shouldDouble) {
        digit *= 2;
        if (digit > 9) digit -= 9;
      }
      sum += digit;
      shouldDouble = !shouldDouble;
    }
    return sum % 10 === 0;
  };

  const validateCvv = (cvv) => {
    const regex = new RegExp("^[0-9]{3}$");
    return regex.test(cvv);
  };

  const submitCreditCard = async () => {
    if (!validateCreditCardNumber(creditCardNumber)) {
      Alert.alert("Invalid Credit Card Number", "Please enter a valid 16-digit credit card number.");
      return;
    }

    if (!validateCvv(cvv)) {
      Alert.alert("Invalid CVV", "Please enter a valid 3-digit CVV.");
      return;
    }

    try {
      const token = await AsyncStorage.getItem('token');
      const creditCardInfo = {
        creditCardNumber,
        expirationMonth,
        expirationYear,
        cvv,
      };

      const response = await axios.put(
        `http://192.168.11.225:3000/clients/${clientId}`,
        { creditCard: JSON.stringify(creditCardInfo) },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      onUpdate(response.data);
      setModalVisible(false);
    } catch (error) {
      Alert.alert('Error', error.message);
      console.error('Error updating credit card:', error);
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
        <Text style={styles.modalText}>Add Credit Card</Text>
        <TextInput
          style={styles.input}
          placeholder="Credit Card Number"
          keyboardType="numeric"
          onChangeText={(text) => setCreditCardNumber(text)}
          value={CreditCard.creditCardNumber}
        />
        <Text style={styles.expitext}>Expiration Date</Text>
        <View style={styles.dropdownContainer}>
          <RNPickerSelect
            onValueChange={(value) => setExpirationMonth(value)}
            items={[
              { label: '01', value: '01' },
              { label: '02', value: '02' },
              { label: '03', value: '03' },
              { label: '04', value: '04' },
              { label: '05', value: '05' },
              { label: '06', value: '06' },
              { label: '07', value: '07' },
              { label: '08', value: '08' },
              { label: '09', value: '09' },
              { label: '10', value: '10' },
              { label: '11', value: '11' },
              { label: '12', value: '12' },
            ]}
            placeholder={{ label: 'Month', value: null }}
            value={CreditCard.expirationMonth}
            style={pickerSelectStyles}
          />
          <RNPickerSelect
            onValueChange={(value) => setExpirationYear(value)}
            items={[
              { label: '2024', value: '2024' },
              { label: '2025', value: '2025' },
              { label: '2026', value: '2026' },
              { label: '2027', value: '2027' },
              { label: '2028', value: '2028' },
            ]}
            placeholder={{ label: 'Year', value: null }}
            value={CreditCard.expirationYear}
            style={pickerSelectStyles}
          />
        </View>
        <TextInput
          style={styles.input}
          placeholder="CVV"
          keyboardType="numeric"
          secureTextEntry={true}
          onChangeText={(text) => setCvv(text)}
          value={CreditCard.cvv}
        />
        <TouchableOpacity style={styles.button} onPress={submitCreditCard}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={() => setModalVisible(false)}>
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#d0d6d6',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30,
    marginBottom: 10,
    backgroundColor: "#d0d6d6",
    width: '75%',
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#d0d6d6',
    borderRadius: 4,
    color: 'black',
    paddingRight: 120,
    marginBottom: 10,
    backgroundColor: "#d0d6d6",
    width: '75%',
  },
});

const styles = StyleSheet.create({
  modalView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
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
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: "#042630",
  },
  input: {
    height: 50,
    borderColor: '#d0d6d6',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
    backgroundColor: "#d0d6d6",
    width: '80%',
  },
  button: {
    backgroundColor: '#042630',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  cancelButton: {
    backgroundColor: '#dc3545',
  },
  dropdownContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    width: '80%',
  },
  expitext: {
    fontSize: 12,
    color: "#042630",
    textAlign:'left'
  },
});

export default CreditCardModal;
