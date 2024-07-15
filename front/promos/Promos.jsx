import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Button,
  ScrollView,
  Image,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import PromoCard from './PromoCard';

const Promos = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { item } = route.params;

  const promoData = [
    {
      id: '1',
      title: 'installation climatiseur',
      location: 'Grand Tunis',
      price: '70',
      oldPrice: '90',
      image:
        'https://st.depositphotos.com/62628780/59500/i/450/depositphotos_595006128-stock-photo-passing-safety-inspections-every-single.jpg',
    },
    {
      id: '2',
      title: 'Etancheite avec le systeme horizon chimi',
      location: "Gouvernorat de l'Ariana, Ariana",
      price: '30',
      oldPrice: '35',
      image:
        'https://ijenintechstorage.blob.core.windows.net/testv2/Promo-UserId-6dddac3d-1461-4eb9-5649-08dc32914590--144559fa-ee24-4dcf-98c4-5e2f78208914',
    },
    {
      id: '3',
      title: 'Entretien général',
      location: 'Gouvernorat de Bizerte',
      price: '50',
      oldPrice: '65',
      image:
        'https://ijenintechstorage.blob.core.windows.net/testv2/Promo-UserId-6dddac3d-1461-4eb9-5649-08dc32914590--144559fa-ee24-4dcf-98c4-5e2f78208914',
    },
  ];

  const subScription = () => {
    navigation.navigate('Subscribe', { promo: item });
  };

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: item.image }} style={styles.mainImage} />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.location}>{item.location}</Text>
      <Text style={styles.price}>
        {item.price} DT <Text style={styles.oldPrice}>{item.oldPrice} DT</Text>
      </Text>

      <Button title="Subscribe" onPress={subScription} />

      <Text style={styles.discoverMoreTitle}>Discover More</Text>
      <View style={styles.promoSection}>
        <Text style={styles.promoHeader}>Promotions</Text>
        <View style={styles.promoBorder}>
          <FlatList
            data={promoData}
            renderItem={({ item }) => <PromoCard item={item} />}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.promoList}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  mainImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  location: {
    fontSize: 16,
    color: '#888',
    marginBottom: 10,
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  oldPrice: {
    textDecorationLine: 'line-through',
    color: '#888',
  },
  discoverMoreTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 20,
  },
  promoSection: {
    marginVertical: 20,
  },
  promoHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  promoBorder: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    overflow: 'hidden',
  },
  promoList: {
    paddingHorizontal: 10,
  },
});

export default Promos;
