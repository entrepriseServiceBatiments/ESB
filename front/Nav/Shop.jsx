import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground, FlatList, Image } from 'react-native';

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
  const [products, setProducts] = useState([]);
  const [workers, setWorkers] = useState([]);

  useEffect(() => {
    
    if (selectedCard === 'Products') {
      fetchProducts();
    } else if (selectedCard === 'Services') {
      fetchServices();
    }
  }, [selectedCard]);

  const handleCardPress = (card) => {
    setSelectedCard(card);
  };

  const handleCategoryPress = (category, jobTitle) => {
    setSelectedCard(null); 
    fetchProducts(category);
    fetchWorkers(jobTitle);
  };

  const fetchProducts = async (category) => {
    try {
      const response = await fetch(`http://192.168.104.10:8081/products/${category}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        const data = await response.json();
        setProducts(data);
      } else {
        throw new Error('Oops! Unexpected response from server');
      }
    } catch (error) {
      console.error('Fetch Error:', error.message);
      setProducts([]);
    }
  };
  
  const fetchWorkers = async (jobTitle) => {
    try {
      const response = await fetch(`http://192.168.104.10:8081/workers/${jobTitle}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        const data = await response.json();
        setWorkers(data);
      } else {
        throw new Error('Oops! Unexpected response from server');
      }
    } catch (error) {
      console.error('Fetch Error:', error.message);
      setWorkers([]);
    }
  };

  const renderProductItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.image} />
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
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {!selectedCard && (
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
      {selectedCard && (
        <View style={styles.categoriesContainer}>
          <FlatList
            data={categories}
            keyExtractor={(item) => item.name}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.categoryContainer}
                onPress={() => handleCategoryPress(item.name, item.jobTitle)}
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
      {products.length > 0 && (
        <View style={styles.listContainer}>
          <Text style={styles.listTitle}>Products</Text>
          <FlatList
            data={products}
            keyExtractor={(item) => item.id}
            renderItem={renderProductItem}
          />
        </View>
      )}
      {workers.length > 0 && (
        <View style={styles.listContainer}>
          <Text style={styles.listTitle}>Workers</Text>
          <FlatList
            data={workers}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.itemContainer}>
                <Text style={styles.itemText}>{item.name}</Text>
              </View>
            )}
          />
        </View>
      )}
    </View>
  );
};

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
    width: '100%',
  },
  itemText: {
    fontSize: 16,
  },
  cardContent: {
    padding: 10,
    width: '100%',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 16,
    marginTop: 5,
  },
  price: {
    fontSize: 14,
    color: '#888',
    marginTop: 5,
  },
  button: {
    backgroundColor: '#2196F3',
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
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
