import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';

const CategoryDetails = ({ route, navigation }) => {
  const { category, jobTitle } = route.params;
  const [tab, setTab] = useState('products');
  const [products, setProducts] = useState([]);
  const [workers, setWorkers] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          `http://192.168.104.15:3000/products/${category}`
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
          `http://localhost:3000/workers/${jobTitle}`
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

  
  const toggleFavorite = (item) => {
    setFavorites((prevFavorites) => {
      if (prevFavorites.includes(item.id)) {
        return prevFavorites.filter(favId => favId !== item.id);
      } else {
        return [...prevFavorites, item.id];
      }
    });
  };





  const renderProductItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.favoriteIconContainer}>
        <Image
          source={require('../assets/icons/favorite.png')}
          style={styles.favoriteIcon}
        />
      </View>
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
        key={tab} // Unique key based on the current tab
        data={tab === 'products' ? products : workers}
        keyExtractor={keyExtractor}
        renderItem={tab === 'products' ? renderProductItem : renderWorkerItem}
        numColumns={tab === 'products' ? 2 : 1}
        columnWrapperStyle={tab === 'products' && styles.row}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    backgroundColor: '#f0f0f0',
  },
  navItem: {
    padding: 10,
  },
  tab: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#555',
  },
  activeTab: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  listContent: {
    padding: 10,
  },
  row: {
    flex: 1,
    justifyContent: 'space-between',
  },
  card: {
    flex: 1,
    margin: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 4,
    elevation: 2,
  },
  favoriteIconContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
  },
  favoriteIcon: {
    width: 24,
    height: 24,
  },
  image: {
    width: '100%',
    height: 150,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  cardContent: {
    padding: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 14,
    color: '#666',
  },
  price: {
    fontSize: 16,
    color: '#000',
    marginTop: 5,
  },
  button: {
    marginTop: 10,
    backgroundColor: '#ff0000',
    paddingVertical: 10,
    borderRadius: 4,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  workerCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    marginVertical: 10,
    padding: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 4,
    elevation: 2,
  },
  workerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  workerImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  workerInfo: {
    flex: 1,
    marginLeft: 10,
  },
  workerName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  workerVerified: {
    fontSize: 12,
    color: '#4CAF50',
  },
  workerRating: {
    fontSize: 14,
    color: '#FFA500',
  },
  workerDistance: {
    alignItems: 'flex-end',
  },
  distanceText: {
    fontSize: 12,
    color: '#555',
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
