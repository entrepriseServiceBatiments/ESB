import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import { useRoute } from '@react-navigation/native';

const ServiceDetails = () => {
  const route = useRoute();
  const { service, services } = route.params;

  return (
    <ScrollView style={styles.container}>
      {/* Image and Offer Details */}
      <View style={styles.header}>
        <Image source={{ uri: service.imageUri }} style={styles.image} />
        <View style={styles.offerDetails}>
          <Text style={styles.offerTitle}>Détails de l'offre</Text>
          <Text style={styles.serviceTitle}>{service.title}</Text>
          <Text style={styles.serviceAvailability}>{service.available ? 'Disponible' : 'Indisponible'}</Text>
          <Text style={styles.servicePrice}>{service.price} DT</Text>
        </View>
      </View>

      {/* Client Ratings and Service Description */}
      <View style={styles.ratingsContainer}>
        <Text style={styles.ratingTitle}>Note clients</Text>
        <Text style={styles.ratingValue}>{service.rating} / 5</Text>
        <Text style={styles.numRatings}>Clients livrés: {service.numOfRatings}</Text>
      </View>
      <Text style={styles.description}>{service.description}</Text>

      {/* Customer Opinions */}
      <View style={styles.opinionsContainer}>
        <Text style={styles.opinionsTitle}>Ce que disent nos clients</Text>
        <FlatList
          data={service.comments}
          renderItem={({ item }) => (
            <View style={styles.comment}>
              <Text style={styles.commentText}>{item.comment}</Text>
              <Text style={styles.commentDate}>{item.date}</Text>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>

      {/* Other Services */}
      <View style={styles.otherServicesContainer}>
        <Text style={styles.otherServicesTitle}>Autres services</Text>
        <FlatList
          data={services && services.filter(s => s.id !== service.id)}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => { /* Navigate to service details or handle press */ }}>
              <View style={styles.otherServiceCard}>
                <Image source={{ uri: item.imageUri }} style={styles.otherServiceImage} />
                <Text style={styles.otherServiceTitle}>{item.title}</Text>
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
  },
  header: {
    flexDirection: 'row',
    padding: 10,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 10,
  },
  offerDetails: {
    marginLeft: 10,
    justifyContent: 'center',
  },
  offerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  serviceTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  serviceAvailability: {
    fontSize: 14,
    color: 'green',
  },
  servicePrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFD700',
  },
  ratingsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: '#fff',
    marginVertical: 10,
  },
  ratingTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  ratingValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFD700',
  },
  numRatings: {
    fontSize: 14,
    color: '#666',
  },
  description: {
    padding: 10,
    fontSize: 16,
    color: '#333',
  },
  opinionsContainer: {
    backgroundColor: '#fff',
    padding: 10,
    marginVertical: 10,
  },
  opinionsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  comment: {
    marginVertical: 5,
  },
  commentText: {
    fontSize: 14,
    color: '#333',
  },
  commentDate: {
    fontSize: 12,
    color: '#666',
  },
  otherServicesContainer: {
    padding: 10,
  },
  otherServicesTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  otherServiceCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  otherServiceImage: {
    width: 50,
    height: 50,
    borderRadius: 5,
  },
  otherServiceTitle: {
    marginLeft: 10,
    fontSize: 14,
    color: '#333',
  },
});

export default ServiceDetails;
