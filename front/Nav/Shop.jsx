import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground, FlatList, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Calendar from "../homePage/Calendar";
const categories = [
  { name: 'Plumbing', jobTitle: 'Plumber' },
  { name: 'Electricity', jobTitle: 'Electrician' },
  { name: 'Housekeeping', jobTitle: 'Housekeeper' },
  { name: 'Masonry', jobTitle: 'Mason' },
  { name: 'Air conditioning', jobTitle: 'HVAC Technician' },
  { name: 'DIY and assembly', jobTitle: 'Handyman' },
  { name: 'Washing machine', jobTitle: 'Appliance Repair Technician' },
  { name: 'Painting', jobTitle: 'Painter' },
  { name: 'Gardening', jobTitle: 'Gardener' },
];

const Shop = () => {
  const [selectedCard, setSelectedCard] = useState(null);
  const [data, setData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [clientId, setClientId] = useState('');

  useEffect(() => {
    retrieveData();
    if (selectedCard === 'Products') {
      fetchProducts();
    } else if (selectedCard === 'Services') {
      fetchServices();
    }
  }, [selectedCard]);

  const retrieveData = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      let user = await AsyncStorage.getItem('user');
      user = JSON.parse(user);
      if (user !== null) {
        setClientId(user.idClient);
      }
    } catch (error) {
      console.error('Error retrieving data:', error);
    }
  };

  const handleCardPress = (card) => {
    setSelectedCard(card);
  };

  const handleCategoryPress = (category) => {
    setSelectedCategory(category);
    if (selectedCard === 'Products') {
      fetchProducts(category);
    } else if (selectedCard === 'Services') {
      fetchServices(category);
    }
  };

  const fetchProducts = async (category) => {
    try {
      const response = await fetch(`http://192.168.104.11:3000/products/${category}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        const data = await response.json();
        setData(data);
      } else {
        throw new Error('Oops! Unexpected response from server');
      }
    } catch (error) {
      console.error('Fetch Error:', error.message);
      setData([]);
    }
  };

  const fetchServices = async (category) => {
    const jobTitle = categories.find(cat => cat.name === category)?.jobTitle;
    if (!jobTitle) return;

    try {
      const response = await fetch(`http://192.168.104.11:3000/workers/${jobTitle}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        const data = await response.json();
        setData(data);
      } else {
        throw new Error('Oops! Unexpected response from server');
      }
    } catch (error) {
      console.error('Fetch Error:', error.message);
      setData([]);
    }
  };

  const toggleFavorite = async (itemId) => {
    console.log(itemId,"item");
    console.log(clientId);
    try {
      if (favorites.includes(itemId)) {
        
        setFavorites(favorites.filter(id => id !== itemId));

        const response = await fetch(`http://192.168.104.11:3000/wishlist`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
         
          body: JSON.stringify({ clientId,productsId:itemId }),
        });
  
        if (response.ok) {
          console.log('Item removed from wishlist');
        } else {

          const responseText = await response.text();
          try {
            const data = JSON.parse(responseText);
            throw new Error(data.error);
          } catch (jsonError) {
            throw new Error('Unexpected response: ' + responseText);
          }
        }
      } else {
        setFavorites([...favorites, itemId]);
        const response = await fetch(`http://192.168.104.11:3000/wishlist`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ clientId,productsId:itemId }),
        });

  
        const responseText = await response.text();
  
        try {
          const data = JSON.parse(responseText);
  
          if (response.ok) {
            console.log('Item added to wishlist');
          } else {
            console.error('Error adding to wishlist:', data.error);
          }
        } catch (jsonError) {
          console.error('Invalid JSON response:', responseText);
        }
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
      
    }
  };
 

  const renderProductItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.picture }} style={styles.image} />
      <View style={styles.cardContent}>
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.description}>{item.description}</Text>
        {item.price ? (
          <Text style={styles.price}>
            À PARTIR DE : {item.price.toFixed(2)} € TTC/JOUR
          </Text>
        ) : (
          <Text style={styles.price}>Price not available</Text>
        )}
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Réserver</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => toggleFavorite(item.idproducts)}>
          <Icon
            name={favorites.includes(item.idproducts) ? 'heart' : 'heart-outline'}
            size={30}
            color={favorites.includes(item.idproducts) ? 'red' : 'black'}
          />
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderWorkerItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.picture }} style={styles.image} />
      <View style={styles.cardContent}>
        <Text style={styles.title}>{item.userName}</Text>
        <Text style={styles.description}>{item.resume}</Text>
        <Text style={styles.details}>Phone: {item.phoneNum}</Text>
        <Text style={styles.details}>Email: {item.email}</Text>
        <Text style={styles.details}>Rating: {item.rating}</Text>
        <Text style={styles.details}>Job Title: {item.jobTitle}</Text>
        <Text style={styles.details}>Address: {item.address}</Text>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Réserver</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => toggleFavorite(item.idproducts)}>
          <Icon
            name={favorites.includes(item.id) ? 'heart' : 'heart-outline'}
            size={30}
            color={favorites.includes(item.id) ? 'red' : 'black'}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
  
  return (
    <View style={styles.container}>
      {!selectedCard && !selectedCategory && (
        <>
          <TouchableOpacity
            style={styles.card}
            onPress={() => handleCardPress('Products')}
          >
            <ImageBackground source={{ uri: 'https://shorturl.at/ZwQVz' }} style={styles.imageBackground}>
              <View style={styles.titleContainer}>
                <Text style={styles.cardTitle}>Products</Text>
              </View>
            </ImageBackground>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.card}
            onPress={() => handleCardPress('Services')}
          >
            <ImageBackground source={{ uri: 'https://shorturl.at/4ZLN5' }} style={styles.imageBackground}>
              <View style={styles.titleContainer}>
                <Text style={styles.cardTitle}>Services</Text>
              </View>
            </ImageBackground>
          </TouchableOpacity>
        </>
      )}
      {selectedCard && !selectedCategory && (
        <View style={styles.categoriesContainer}>
          <FlatList
            data={categories}
            keyExtractor={(item) => item.name}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.categoryContainer}
                onPress={() => handleCategoryPress(item.name)}
              >
                <Text style={styles.categoryText}>{item.name}</Text>
              </TouchableOpacity>
            )}
          />
          <TouchableOpacity style={styles.backButton} onPress={() => setSelectedCard(null)}>
            <Text style={styles.backButtonText}>Back</Text>
          </TouchableOpacity>
        </View>
      )}
      {selectedCategory && (
        <View style={styles.listContainer}>
          <TouchableOpacity style={styles.backButton} onPress={() => setSelectedCategory(null)}>
            <Text style={styles.backButtonText}>Back to Categories</Text>
          </TouchableOpacity>
          <Text style={styles.listTitle}>
            {selectedCard === 'Products' ? `Products in ${selectedCategory}` : `Workers in ${selectedCategory}`}
          </Text>
          <FlatList
            data={data}
            keyExtractor={(item) => item.id ? item.id.toString() : String(Math.random())} 
            renderItem={selectedCard === 'Products' ? renderProductItem : renderWorkerItem

            }
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  card: {
    backgroundColor: '#fff',
    margin: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
    width: '100%',
    flex: 1,
    overflow: 'hidden',
  },
  imageBackground: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  titleContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    width: '100%',
    alignItems: 'center',
    padding: 10,
  },
  cardTitle: {
    fontSize: 18,
    color: '#fff',
    padding: 5,
  },
  categoriesContainer: {
    flex: 1,
    width: '100%',
  },
  categoryContainer: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    width: '100%',
  },
  categoryText: {
    fontSize: 16,
  },
  backButton: {
    backgroundColor: '#2196F3',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  listContainer: {
    flex: 1,
    width: '100%',
    padding: 20,
  },
  listTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  itemContainer: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  itemText: {
    fontSize: 16,
  },
  cardContent: {
    padding: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    color: '#777',
    marginBottom: 10,
    textAlign: 'center',
  },
  details: {
    fontSize: 14,
    color: '#555',
    marginBottom: 5,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#000',
  },
  button: {
    backgroundColor: '#2196F3',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  image: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
});

export default Shop;
