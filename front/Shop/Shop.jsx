import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground, Modal } from 'react-native';
import Categories from './CategoriesModal';
import ItemsList from './ItemsList';

const Shop = ({navigation}) => {
  const [selectedCard, setSelectedCard] = useState(null);
  const [isCategoriesVisible, setIsCategoriesVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isItemsListVisible, setIsItemsListVisible] = useState(false);

  const CardPress = (card) => {
    setSelectedCard(card);
    setIsCategoriesVisible(true);
  };

  const CategorySelect = (category) => {
    setSelectedCategory(category);
    setIsCategoriesVisible(false);
    setIsItemsListVisible(true);
  };

  const CloseCategories = () => {
    setIsCategoriesVisible(false);
    setSelectedCard(null);
  };

  const CloseItemsList = () => {
    setIsItemsListVisible(false);
    setSelectedCategory(null);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.card} onPress={() => CardPress('Products')}>
        <ImageBackground source={require('../assets/Products.png')} style={styles.imageBackground}>
          <View style={styles.titleContainer}>
            <Text style={styles.cardTitle}>Products</Text>
          </View>
        </ImageBackground>
      </TouchableOpacity>
      <TouchableOpacity style={styles.card} onPress={() => CardPress('Services')}>
        <ImageBackground source={require('../assets/Services.png')} style={styles.imageBackground}>
          <View style={styles.titleContainer}>
            <Text style={styles.cardTitle}>Services</Text>
          </View>
        </ImageBackground>
      </TouchableOpacity>

      {isCategoriesVisible && (
        <Modal visible={isCategoriesVisible} animationType="slide" transparent={true}>
          <Categories selectedCard={selectedCard} onSelectCategory={CategorySelect} onClose={CloseCategories} />
        </Modal>
      )}

      {isItemsListVisible && (
        <Modal visible={isItemsListVisible} animationType="slide" transparent={true}>
          <ItemsList category={selectedCategory} type={selectedCard} onClose={CloseItemsList} navigation={navigation} />
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e6ede6',
    padding: 20,
  },
  card: {
    backgroundColor: '#042630',
    margin: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
    width: '100%',
    height: 270,
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
    backgroundColor: '#042630',
    opacity:0.8,
    width: '100%',
    alignItems: 'center',
    padding: 10,
    marginTop: 'auto',
  },
  cardTitle: {
    fontSize: 18,
    color: '#fff',
    padding: 5,
  },
});

export default Shop;
