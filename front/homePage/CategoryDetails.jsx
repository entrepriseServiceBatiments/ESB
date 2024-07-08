import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import Calendar from './Calendar';

const CategoryDetails = ({ route, navigation }) => {
  const { category, jobTitle } = route.params;
  const [tab, setTab] = useState('products');
  const [products, setProducts] = useState([]);
  const [workers, setWorkers] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          `http://192.168.103.2:3000/products/${category}`
        );
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchWorkers = async () => {
      try {
        const response = await fetch(
          `http:///192.168.103.2:3000/workers/${jobTitle}`
        );
        const data = await response.json();
        setWorkers(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProducts();
    fetchWorkers();
  }, [category, jobTitle]);

  const handleReserverPress = (product) => {
    setSelectedProduct(product);
  };

  const handleStartDateChange = (selectedDate) => {
    setStartDate(selectedDate || startDate);
  };

  const handleEndDateChange = (selectedDate) => {
    setEndDate(selectedDate || endDate);
  };

  const handleCalendarClose = () => {
    setSelectedProduct(null);
  };

  const handleFavoritePress = async (productId) => {
    const clientId = 1;
    try {
      const response = await fetch('http:///192.168.103.2:3000/wishlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ clientId, productsId: productId }),
      });

      const responseText = await response.text();

      try {
        const data = JSON.parse(responseText);

        if (response.ok) {
          setFavorites((prevFavorites) => [...prevFavorites, productId]);
        } else {
          console.error('Error adding to wishlist:', data.error);
        }
      } catch (jsonError) {
        console.error('Invalid JSON response:', responseText);
      }
    } catch (error) {
      console.error('Error adding to wishlist:', error);
    }
  };

  const renderProductItem = ({ item }) => (
    <View style={styles.card}>
      <TouchableOpacity
        style={styles.favoriteIconContainer}
        onPress={() => handleFavoritePress(item.id)}
      >
        <Image
          source={require('../assets/icons/favorite.png')}
          style={styles.favoriteIcon}
        />
      </TouchableOpacity>
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
        <TouchableOpacity style={styles.button} onPress={() => handleReserverPress(item)}>
          <Text style={styles.buttonText}>Réserver</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderWorkerItem = ({ item }) => (
    <TouchableOpacity
      style={styles.workerCard}
      onPress={() => navigation.navigate('WorkerDetails', { worker: item })}
    >
      <View style={styles.workerHeader}>
        <Image source={{ uri: item.image }} style={styles.workerImage} />
        <View style={styles.workerInfo}>
          <Text style={styles.workerName}>{item.name}</Text>
          <Text style={styles.workerVerified}>Identité Vérifiée</Text>
          <Text style={styles.workerRating}>
            {item.rating ? `${item.rating} ★` : 'No rating available'}
          </Text>
        </View>
        <View style={styles.workerDistance}>
          <Text style={styles.distanceText}>
            {item.distance ? `${item.distance} KM` : 'Distance not available'}
          </Text>
        </View>
      </View>
      <View style={styles.workerContent}>
        <Text style={styles.workerDescription}>{item.description}</Text>
      </View>
    </TouchableOpacity>
  );

  const keyExtractor = (item) => (item.id ? item.id.toString() : item.name);

  return (
    <View style={styles.container}>
      <View style={styles.navbar}>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => setTab('products')}
        >
          <Text style={tab === 'products' ? styles.activeTab : styles.tab}>
            Products
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => setTab('services')}
        >
          <Text style={tab === 'services' ? styles.activeTab : styles.tab}>
            Services
          </Text>
        </TouchableOpacity>
      </View>
      <FlatList
        key={tab}
        data={tab === 'products' ? products : workers}
        keyExtractor={keyExtractor}
        renderItem={tab === 'products' ? renderProductItem : renderWorkerItem}
        numColumns={tab === 'products' ? 2 : 1}
        columnWrapperStyle={tab === 'products' ? styles.columnWrapper : null}
        contentContainerStyle={styles.listContent}
      />
      <Calendar
        visible={selectedProduct !== null}
        startDate={startDate}
        endDate={endDate}
        onStartDateChange={handleStartDateChange}
        onEndDateChange={handleEndDateChange}
        onClose={handleCalendarClose}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
    paddingVertical: 10,
    elevation: 2,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
  },
  tab: {
    fontSize: 16,
    color: '#666',
  },
  activeTab: {
    fontSize: 16,
    color: '#000',
    fontWeight: 'bold',
  },
  listContent: {
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
  card: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 8,
    margin: 10,
    padding: 10,
    elevation: 3,
  },
  favoriteIconContainer: {
    alignItems: 'flex-end',
  },
  favoriteIcon: {
    width: 24,
    height: 24,
    tintColor: '#ff0000',
  },
  image: {
    width: '100%',
    height: 150,
    borderRadius: 8,
  },
  cardContent: {
    marginTop: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginVertical: 5,
  },
  price: {
    fontSize: 16,
    color: '#000',
    marginVertical: 5,
  },
  button: {
    marginTop: 10,
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    borderRadius: 4,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  workerCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    margin: 10,
    padding: 10,
    elevation: 3,
  },
  workerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  workerImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  workerInfo: {
    flex: 1,
  },
  workerName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  workerVerified: {
    fontSize: 14,
    color: '#4CAF50',
  },
  workerRating: {
    fontSize: 14,
    color: '#FFD700',
  },
  workerDistance: {
    alignItems: 'flex-end',
  },
  distanceText: {
    fontSize: 14,
    color: '#666',
  },
  workerContent: {
    marginTop: 10,
  },
  workerDescription: {
    fontSize: 14,
    color: '#666',
  },
});

export default CategoryDetails;
