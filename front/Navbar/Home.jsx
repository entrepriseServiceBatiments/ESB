import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import Navbar from './Navbar';
import { useNavigation } from '@react-navigation/native';

const categories = [
  'Plumbing',
  'Electricity',
  'Housekeeping',
  'Windows and blinds',
  'Air conditioning',
  'DIY and assembly',
  'Washing machine',
  'Painting',
  'Gardening',
];

const Home = () => {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const navigation = useNavigation();

  const fetchProductsByCategory = async (category) => {
    try {
      const response = await fetch(`http://10.0.2.2:3000/products/${category}`);
      const data = await response.json();
      setProducts(data);
      setSelectedCategory(category);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Navbar />
      <ScrollView>
        <ScrollView
          horizontal
          contentContainerStyle={styles.scrollView}
          showsHorizontalScrollIndicator={false}
        >
          {categories.map((category, index) => (
            <TouchableOpacity
              key={index}
              style={styles.box}
              onPress={() => fetchProductsByCategory(category)}
            >
              <Text style={styles.boxText}>{category}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={styles.promoContainer}>
          <Image
            source={{
              uri: 'https://st.depositphotos.com/62628780/59500/i/450/depositphotos_595006128-stock-photo-passing-safety-inspections-every-single.jpg',
            }}
            style={styles.promoImage}
          />
          <View style={styles.promoTextContainer}>
            <Text style={styles.promoTitle}>
              -25% sur la première année de votre contrat Sécurité avec le code
              JUIN2024
            </Text>
            <Text style={styles.promoDescription}>
              Profitez d’une remise immédiate de 25% sur la souscription de
              votre contrat d’une chaudière gaz ou pompe à chaleur air/eau ou
              d’un climatiseur réversible, Formule Sécurité, avec ou sans option
              Service illigo (non disponible pour le climatiseur réversible).
              Offre réservée aux nouveaux clients ENGIE Home Services et valable
              uniquement sur la première année de contrat.
            </Text>
            <TouchableOpacity
              style={styles.promoButton}
              onPress={() => navigation.navigate('SubscribeForm')}
            >
              <Text style={styles.promoButtonText}>Je souscris un contrat</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.noticeContainer}>
          <Text style={styles.noticeTitle}>
            Jusqu’au 30 juin 2024 pour souscrire 1 an d’option “Gaz Vert+”
            offert
          </Text>
          <Text style={styles.noticeDescription}>
            Vous avez validé un devis d’installation de chaudière gaz à Très
            Haute Performance Énergétique entre le 1er avril et le 31 mai ? Vous
            avez encore jusqu’au 30 juin 2024 pour bénéficier de 1 an offert
            d’option “Gaz Vert+ 100%” d’ENGIE.
          </Text>
          <TouchableOpacity
            style={styles.noticeButton}
            onPress={() => navigation.navigate('SubscribeForm')}
          >
            <Text style={styles.noticeButtonText}>
              Souscrire l’option “Gaz Vert+”
            </Text>
          </TouchableOpacity>
        </View>

        {selectedCategory && (
          <View style={styles.productsContainer}>
            <Text style={styles.categoryTitle}>{selectedCategory}</Text>
            <FlatList
              data={products}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <View style={styles.productBox}>
                  <Text style={styles.productName}>{item.name}</Text>
                  <Text>{item.description}</Text>
                  <Text>Price: ${item.price}</Text>
                </View>
              )}
            />
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  box: {
    backgroundColor: '#f0f0f0',
    padding: 20,
    marginHorizontal: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  boxText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  promoContainer: {
    flexDirection: 'row',
    padding: 20,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    marginBottom: 20,
    marginHorizontal: 10,
  },
  promoImage: {
    width: 150,
    height: 150,
    borderRadius: 10,
    marginRight: 20,
  },
  promoTextContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  promoTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  promoDescription: {
    fontSize: 14,
    color: '#555',
    marginBottom: 10,
  },
  promoButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
  },
  promoButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  noticeContainer: {
    padding: 20,
    backgroundColor: '#e0f7fa',
    borderRadius: 10,
    marginBottom: 20,
    marginHorizontal: 10,
  },
  noticeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  noticeDescription: {
    fontSize: 14,
    color: '#555',
    marginBottom: 10,
  },
  noticeButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
  },
  noticeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  productsContainer: {
    flex: 1,
    padding: 20,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  productBox: {
    padding: 15,
    backgroundColor: '#e0e0e0',
    marginBottom: 10,
    borderRadius: 10,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  additionalFeaturesContainer: {
    padding: 20,
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    marginBottom: 20,
    marginHorizontal: 10,
  },
  additionalFeatureTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
});

export default Home;
