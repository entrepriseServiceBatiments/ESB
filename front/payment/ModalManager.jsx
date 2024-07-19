import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Platform,
} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import axios from 'axios';
import { BASE_URL } from '../private.json';

const ModalManager = ({ visible, onClose, orderId, amount, clientId }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [creditCardNumber, setCreditCardNumber] = useState('');
  const [expirationMonth, setExpirationMonth] = useState('');
  const [expirationYear, setExpirationYear] = useState('');
  const [cvv, setCvv] = useState('');

  const validateCreditCardNumber = (number) => {
    const regex = new RegExp('^[0-9]{16}$');
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
    const regex = new RegExp('^[0-9]{3}$');
    return regex.test(cvv);
  };

  const handleNext = () => {
    if (currentStep === 1) {
      if (!validateCreditCardNumber(creditCardNumber)) {
        Alert.alert(
          'Invalid Credit Card Number',
          'Please enter a valid 16-digit credit card number.'
        );
        return;
      }

      if (!validateCvv(cvv)) {
        Alert.alert('Invalid CVV', 'Please enter a valid 3-digit CVV.');
        return;
      }

      setCurrentStep(2);
    } else if (currentStep === 2) {
      handleConfirm();
    }
  };

  const handleConfirm = async () => {
    try {
      const response = await axios.post(`${BASE_URL}/payments`, {
        clientId,
        pendingOrderId: orderId,
        amount,
        creditCardInfo: {
          creditCardNumber,
          expirationMonth,
          expirationYear,
          cvv,
        },
      });

      if (response.status === 201) {
        setCurrentStep(3);
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong. Please try again later.');
    }
  };

  const handleReturnHome = () => {
    onClose();
  };

  return (
    <Modal
      transparent={true}
      animationType="slide"
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        {currentStep === 1 && (
          <View style={styles.modalContent}>
            <Text style={styles.title}>Add Credit Card</Text>
            <TextInput
              style={styles.input}
              placeholder="Credit Card Number"
              keyboardType="numeric"
              onChangeText={setCreditCardNumber}
              value={creditCardNumber}
            />
            <Text style={styles.label}>Expiration Date</Text>
            <View style={styles.dropdownContainer}>
              <RNPickerSelect
                onValueChange={setExpirationMonth}
                items={[...Array(12).keys()].map((i) => ({
                  label: (i + 1).toString().padStart(2, '0'),
                  value: (i + 1).toString().padStart(2, '0'),
                }))}
                placeholder={{ label: 'Month', value: null }}
                value={expirationMonth}
                style={pickerSelectStyles}
              />
              <RNPickerSelect
                onValueChange={setExpirationYear}
                items={[...Array(10).keys()].map((i) => ({
                  label: (new Date().getFullYear() + i).toString(),
                  value: (new Date().getFullYear() + i).toString(),
                }))}
                placeholder={{ label: 'Year', value: null }}
                value={expirationYear}
                style={pickerSelectStyles}
              />
            </View>
            <TextInput
              style={styles.input}
              placeholder="CVV"
              keyboardType="numeric"
              secureTextEntry={true}
              onChangeText={setCvv}
              value={cvv}
            />
            <TouchableOpacity style={styles.button} onPress={handleNext}>
              <Text style={styles.buttonText}>Next</Text>
            </TouchableOpacity>
          </View>
        )}
        {currentStep === 2 && (
          <View style={styles.modalContent}>
            <Text style={styles.title}>Confirm Payment</Text>
            <Text style={styles.label}>Total Amount: ${amount}</Text>
            <Text style={styles.label}>Order ID: {orderId}</Text>
            <TouchableOpacity style={styles.button} onPress={handleNext}>
              <Text style={styles.buttonText}>Confirm Payment</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.cancelButton]}
              onPress={() => setCurrentStep(1)}
            >
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        )}
        {currentStep === 3 && (
          <View style={styles.modalContent}>
            <Text style={styles.title}>Payment Successful</Text>
            <Text style={styles.message}>
              Thank you for your payment. Your order has been processed successfully.
            </Text>
            <TouchableOpacity style={styles.button} onPress={handleReturnHome}>
              <Text style={styles.buttonText}>Return to Home</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 8,
    width: '100%',
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
  },
  dropdownContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#28a745',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    width: '100%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  cancelButton: {
    backgroundColor: '#dc3545',
    marginTop: 10,
  },
  message: {
    fontSize: 16,
    marginBottom: 30,
    textAlign: 'center',
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30,
    backgroundColor: '#f0f0f0',
    width: '48%',
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30,
    backgroundColor: '#f0f0f0',
    width: '48%',
  },
});

export default ModalManager;
