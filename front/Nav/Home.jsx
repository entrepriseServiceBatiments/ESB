import React ,{useEffect,useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import PromoCard from '../promos/PromoCard';
import SearchBar from '../homePage/SearchBar';


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

const promoData = [
  {
    id: '1',
    title: 'installation climatiseur',
    location: ' Grand Tunis',
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
    location: 'Gouvernorat de Bizerte, ',
    price: '50',
    oldPrice: '65',
    image:
      'https://ijenintechstorage.blob.core.windows.net/testv2/Promo-UserId-6dddac3d-1461-4eb9-5649-08dc32914590--144559fa-ee24-4dcf-98c4-5e2f78208914',
  },
];

const Home = () => {
  const navigation = useNavigation();
  const [categoriess, setCategories] = useState(categories);
  const handleCategoryPress = (category, jobTitle) => {
    navigation.navigate('CategoryDetails', { category, jobTitle });
  };

  const handlePromoPress = (item) => {
    navigation.navigate('Promos', { item , allPromos:promoData});
  };
  const handleSearch = (query) => {
    console.log('Search query:', query);
    const filteredCategories = categories.filter((category) =>
      category.name.toLowerCase().includes(query.toLowerCase())
    );
    setCategories(filteredCategories);
  }
  return (
    <View style={styles.container}>
      <ScrollView>
        <SearchBar onSearch={handleSearch}/>
        <ScrollView
          horizontal
          contentContainerStyle={styles.scrollView}
          showsHorizontalScrollIndicator={false}
        >
          {categories.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.box}
              onPress={() => handleCategoryPress(item.name, item.jobTitle)}
            >
              <Text style={styles.boxText}>{item.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <FlatList
          data={promoData}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handlePromoPress(item)}>
              <PromoCard item={item} />
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.promoList}
        />

        <View style={styles.servicesContainer}>
          <Text style={styles.servicesHeader}>
            Un service de proximité et de qualité pour vous accompagner en toute
            sécurité
          </Text>
          <View style={styles.serviceItem}>
            <Image
              source={require('../assets/icons/position.png')}
              style={styles.serviceIcon}
            />
            <Text style={styles.serviceTitle}>Nos agences de proximité</Text>
            <Text style={styles.serviceDescription}>
              Entretien, dépannage, installation et remplacement de vos
              équipements par nos équipes locales
            </Text>
          </View>
          <View style={styles.serviceItem}>
            <Image
              source={require('../assets/icons/miner.png')}
              style={styles.serviceIcon}
            />
            <Text style={styles.serviceTitle}>
              Une expertise de près de 50 ans
            </Text>
            <Text style={styles.serviceDescription}>
              Des agences certifiées RGE avec un réseau de technico-commerciaux
              et techniciens régulièrement formés
            </Text>
          </View>
          <View style={styles.serviceItem}>
            <Image
              source={require('../assets/icons/team.png')}
              style={styles.serviceIcon}
            />
            <Text style={styles.serviceTitle}>
              Des partenariats aves des grandes marques
            </Text>
            <Text style={styles.serviceDescription}>
              Large choix d’équipements de chauffage, climatisation et
              production d’eau chaude de grandes marques
            </Text>
          </View>
          <View style={styles.serviceItem}>
            <Image
              source={require('../assets/icons/guarantee.png')}
              style={styles.serviceIcon}
            />
            <Text style={styles.serviceTitle}>
              Confiance et sécurité au cœur de nos priorités
            </Text>
            <Text style={styles.serviceDescription}>
              Nous veillons à la sécurité et à la satisfaction de nos clients au
              travers de nos actions et nos interventions !
            </Text>
          </View>
        </View>
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
  promoList: {
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  servicesContainer: {
    padding: 20,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    marginBottom: 20,
    marginHorizontal: 10,
  },
  servicesHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  serviceItem: {
    alignItems: 'center',
    marginBottom: 20,
  },
  serviceIcon: {
    width: 50,
    height: 50,
    marginBottom: 10,
  },
  serviceTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  serviceDescription: {
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
});

export default Home;
