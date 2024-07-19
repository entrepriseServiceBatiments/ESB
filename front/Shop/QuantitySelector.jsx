import React, { useState } from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from 'react-native';

const QuantitySelector = ({ visible, onConfirm, onCancel }) => {
  const [quantity, setQuantity] = useState(1);

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const Confirm = () => {
    onConfirm(quantity);
  };

  return (
    <Modal visible={visible} transparent={true} animationType="slide">
      <View style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.title}>Select Quantity</Text>
          <View style={styles.quantityContainer}>
            <TouchableOpacity
              onPress={decreaseQuantity}
              style={styles.quantityButton}
            >
              <Text style={styles.quantityButtonText}>-</Text>
            </TouchableOpacity>
            <TextInput
              style={styles.quantityInput}
              value={quantity.toString()}
              keyboardType="numeric"
              onChangeText={(text) => setQuantity(parseInt(text) || 1)}
            />
            <TouchableOpacity
              onPress={increaseQuantity}
              style={styles.quantityButton}
            >
              <Text style={styles.quantityButtonText}>+</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={Confirm} style={styles.confirmButton}>
              <Text style={styles.buttonText}>Confirm</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onCancel} style={styles.cancelButton}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    zIndex: 1000,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 9999,
  },
  content: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  quantityButton: {
    backgroundColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  quantityButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  quantityInput: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    width: 50,
    textAlign: 'center',
    padding: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  confirmButton: {
    backgroundColor: '#28a745',
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  cancelButton: {
    backgroundColor: '#dc3545',
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default QuantitySelector;
