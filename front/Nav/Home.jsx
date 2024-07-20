import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import PromoCard from '../promos/PromoCard';
import AnnouncementCard from '../homePage/Announcement';
import ServicesDemand from '../homePage/ServicesDemand';
import SearchBar from '../homePage/SearchBar';
import NeedHelp from '../homePage/NeedHelp';

const categoryData = [
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
    id: "1",
    title: "Air Conditioner Installation",
    location: "Greater Tunis",
    price: "70",
    oldPrice: "90",
    image:
      'https://ijenintechstorage.blob.core.windows.net/testv2/Promo-UserId-6dddac3d-1461-4eb9-5649-08dc32914590--144559fa-ee24-4dcf-98c4-5e2f78208914',
  },
  {
    id: "2",
    title: "Waterproofing with Horizon Chemi System",
    location: "Ariana Governorate, Ariana",
    oldPrice: "175",
    price: "150",
    image:
      'https://st.depositphotos.com/62628780/59500/i/450/depositphotos_595006128-stock-photo-passing-safety-inspections-every-single.jpg',
  },
  {
    id: "3",
    title: "General Maintenance",
    location: "Bizerte Governorate",
    price: "90",
    oldPrice: "100",
    image:
      'https://ijenintechstorage.blob.core.windows.net/testv2/Promo-UserId-6dddac3d-1461-4eb9-5649-08dc32914590--144559fa-ee24-4dcf-98c4-5e2f78208914',
  },
];


const services = [
  
    {
      id: 1,
      imageUri:
        "https://smte-44.fr/uploads/media/images/cms/medias/thumb_/cms/medias/6583053d8cd60_images_large.webp",
      title: "Air Conditioner Maintenance",
      description: "By our best",
    },
    {
      id: 2,
      imageUri:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-Sp29fYjX7UoJA8jXo8lilkKzVvkxjoaSyg&s",
      title: "Implementation",
      description: "Implementation, installation, effective use",
    },
    {
      id: 3,
      imageUri:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7fwDyBIf0Ndh_BrJjvA8Ov_W7auyegp1f_A&s",
      title: "Plumbing Repair",
      description: "Fast service",
    },
    {
      id: 4,
      imageUri:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTpbR8dgVItlUeK2zgiiLLSU_7modQGCDvVw&s",
      title: "Green Space Maintenance",
      description: "Service guaranteed",
    },
  ];
  



const Home = () => {
  const navigation = useNavigation();
  const [filteredCategories, setFilteredCategories] = useState(categoryData);

  const handleCategoryPress = (category, jobTitle) => {
    navigation.navigate('CategoryDetails', { category, jobTitle });
  };

  const handlePromoPress = (item) => {
    navigation.navigate('Promos', { item, allPromos: promoData });
  };

  const handleSearch = (filteredData) => {
    setFilteredCategories(filteredData);
  };



  return (
    <View style={[styles.container, { backgroundColor: '#e6ede6' }]}>
      <ScrollView>
        <SearchBar data={categoryData} onSearch={handleSearch} />

        <ScrollView
          horizontal
          contentContainerStyle={styles.scrollView}
          showsHorizontalScrollIndicator={false}
        >
          {filteredCategories.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.box}
              onPress={() => handleCategoryPress(item.name, item.jobTitle)}
            >
              <Text style={styles.boxText}>{item.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        

        <View style={styles.promoContainer}>
          <Text style={styles.promoHeader}>Promotions</Text>
          <View style={styles.promoBorder}>
            <FlatList
              data={promoData}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => handlePromoPress(item)}>
                  <PromoCard item={item} />
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item.id}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.promoList}
            />
          </View>
        </View>

        <ServicesDemand
          services={services}
          
        />

        <View style={styles.needHelpContainer}>
          <NeedHelp />
        </View>
      </ScrollView>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e6ede6",
    marginTop: 30,
  },
  scrollView: {
    paddingHorizontal: 10,
  },
  box: {
    width: 120,
    height: 50,
    backgroundColor: "#042630",
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
    marginVertical: 10,
  },
  boxText: {
    fontSize: 16,
    fontWeight: "bold",
    color: 'white'
  },
  announcementContainer: {
    marginVertical: 10,
  },
  announcementHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#042630',
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  announcementBorder: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    overflow: 'hidden',
    marginHorizontal: 10,
  },
  announcementList: {
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  promoContainer: {
    marginVertical: 10,
  },
  promoHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#042630',
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  promoBorder: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    overflow: 'hidden',
    marginHorizontal: 10,
  },
  promoList: {
    paddingVertical: 10,
    paddingHorizontal: 5,
    paddingBottom: 20, // Adds space below the last item
  },
  needHelpContainer: {
    marginVertical: 20,
  },
});

export default Home;
