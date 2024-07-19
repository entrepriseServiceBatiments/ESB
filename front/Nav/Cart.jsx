import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
  RefreshControl,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import axios from 'axios';
import { BASE_URL } from '../private.json';
import ModalManager from '../payment/ModalManager';

const CartScreen = ({ navigation }) => {
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [totalAmount, setTotalAmount] = useState(0);
  const [clientId, setClientId] = useState(null);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [datePickerMode, setDatePickerMode] = useState('start');
  const [refreshing, setRefreshing] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [orderId, setOrderId] = useState(null);

  useEffect(() => {
    retrieveData();
  }, []);

  const retrieveData = async () => {
    try {
      const user = await AsyncStorage.getItem('user');
      if (user) {
        const parsedUser = JSON.parse(user);
        setClientId(parsedUser.idClient || parsedUser.idworker);
      }

      const products = await AsyncStorage.getItem('selectedProducts');
      if (products) {
        setSelectedProducts(JSON.parse(products));
      } else {
        setSelectedProducts([]);
      }
    } catch (error) {
      console.error('Error retrieving data:', error);
      Alert.alert('Error', 'Failed to load cart data. Please try again.');
    }
  };

  const calculateTotalAmount = () => {
    let total = 0;
    selectedProducts.forEach((product) => {
      total += product.price;
    });
    const daysDifference = Math.max(
      1,
      Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24))
    );
    total *= daysDifference;
    setTotalAmount(total);
  };

  const handleSubmitOrder = async () => {
    if (!clientId) {
      Alert.alert('Error', 'Client ID not found. Please login again.');
      return;
    }
  
    if (selectedProducts.length === 0) {
      Alert.alert('Error', 'No products selected. Please add products to your cart.');
      return;
    }
  
    if (startDate >= endDate) {
      Alert.alert('Error', 'End date must be after start date.');
      return;
    }
  
    try {
      const response = await axios.post(`${BASE_URL}/pen`, {
        clientId: clientId,
        startDate: startDate.toISOString().split('T')[0],
        endDate: endDate.toISOString().split('T')[0],
        Products: selectedProducts.map((product) => ({
          idproducts: product.idproducts,
        })),
        amount: totalAmount,
      });
  
      if (response.status === 201 || response.status === 200) {
        const newOrderId = response.data.id; // Assuming the response includes the new order's ID
        setOrderId(newOrderId);
        setIsModalVisible(true);
      } else {
        Alert.alert('Error', 'Failed to submit order. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting order:', error);
      Alert.alert('Error', 'Something went wrong. Please try again later.');
    }
  };
  
  const showDatePicker = (mode) => {
    setDatePickerMode(mode);
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirmDate = (date) => {
    if (datePickerMode === 'start') {
      setStartDate(date);
    } else {
      setEndDate(date);
    }
    hideDatePicker();
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  const handleSuccessfulPayment = async () => {
    try {
      await AsyncStorage.removeItem('selectedProducts');
      setSelectedProducts([]);
      setTotalAmount(0);
      Alert.alert(
        'Order Submitted',
        'Your order has been successfully placed and paid for.',
        [
          {
            text: 'OK',
            onPress: () => navigation.navigate('Home'),
          },
        ]
      );
    } catch (error) {
      console.error('Error clearing cart:', error);
      Alert.alert('Error', 'Failed to clear cart. Please try again.');
    }
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    retrieveData().then(() => setRefreshing(false));
  }, []);

  const renderProductItem = ({ item }) => (
    <View style={styles.productItem}>
      <Image source={{ uri: item.picture }} style={styles.productImage} />
      <View style={styles.productDetails}>
        <Text style={styles.productName}>{item.name}</Text>
        <Text>Category: {item.category}</Text>
        <Text>Price: ${item.price.toFixed(2)} per day</Text>
      </View>
    </View>
  );

  return (
    <ScrollView
      contentContainerStyle={styles.scrollView}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View style={styles.container}>
        <Text style={styles.title}>Your Cart</Text>
        <FlatList
          data={selectedProducts}
          renderItem={renderProductItem}
          keyExtractor={(item) => item.idproducts.toString()}
          ListEmptyComponent={
            <Text style={styles.emptyCartText}>Your cart is empty</Text>
          }
        />
        <View style={styles.dateContainer}>
          <TouchableOpacity
            style={styles.dateButton}
            onPress={() => showDatePicker('start')}
          >
            <Text>Start Date: {startDate.toLocaleDateString()}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.dateButton}
            onPress={() => showDatePicker('end')}
          >
            <Text>End Date: {endDate.toLocaleDateString()}</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.calculateButton}
          onPress={calculateTotalAmount}
        >
          <Text style={styles.calculateButtonText}>Calculate Total</Text>
        </TouchableOpacity>
        <Text style={styles.totalText}>
          Total Amount: ${totalAmount.toFixed(2)}
        </Text>
        <TouchableOpacity
          style={styles.orderButton}
          onPress={handleSubmitOrder}
        >
          <Text style={styles.orderButtonText}>Submit Order</Text>
        </TouchableOpacity>
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirmDate}
          onCancel={hideDatePicker}
          minimumDate={new Date()}
        />
        <ModalManager
          visible={isModalVisible}
          onClose={handleCloseModal}
          orderId={orderId}
          amount={totalAmount}
          clientId={clientId}
          onSuccessfulPayment={handleSuccessfulPayment}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  productItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    elevation: 2,
  },
  productImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginRight: 15,
  },
  productDetails: {
    flex: 1,
  },
  productName: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
  },
  emptyCartText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#666',
    marginTop: 20,
  },
  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  dateButton: {
    padding: 10,
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
    flex: 1,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  calculateButton: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  calculateButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 15,
    textAlign: 'center',
  },
  orderButton: {
    backgroundColor: '#28a745',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  orderButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default CartScreen;