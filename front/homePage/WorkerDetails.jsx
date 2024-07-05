import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  Button,
  ScrollView,
} from 'react-native';

const WorkerDetails = ({ route }) => {
  const { worker } = route.params;
  const [showNumber, setShowNumber] = useState(false);

  const renderCustomerOpinion = ({ item }) => (
    <View style={styles.opinionCard}>
      <Text style={styles.opinionText}>{item.opinion}</Text>
    </View>
  );

  const renderImageItem = ({ item }) => (
    <Image source={{ uri: item }} style={styles.workerImage} />
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.profileSection}>
        <Image source={{ uri: worker.picture }} style={styles.profileImage} />
        <View style={styles.profileContent}>
          <Text style={styles.name}>{worker.name}</Text>
          <Text style={styles.rating}>{worker.rating ? `${worker.rating} ★` : 'No rating available'}</Text>
          <Text style={styles.description}>{worker.description}</Text>
        </View>
      </View>
      <View style={styles.customerOpinionsSection}>
        <Text style={styles.sectionTitle}>Customers' Opinions</Text>
        <FlatList
          data={worker.opinions}
          renderItem={renderCustomerOpinion}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
      <View style={styles.contactSection}>
        <Text style={styles.sectionTitle}>Contact Me</Text>
        {showNumber ? (
          <Text style={styles.contactNumber}>{worker.phoneNumber}</Text>
        ) : (
          <TouchableOpacity style={styles.contactButton} onPress={() => setShowNumber(true)}>
            <Text style={styles.buttonText}>Show Number</Text>
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.imagesSection}>
        <Text style={styles.sectionTitle}>Images</Text>
        <FlatList
          data={worker.images}
          renderItem={renderImageItem}
          keyExtractor={(item, index) => index.toString()}
          horizontal
        />
      </View>
      <View style={styles.descriptionSection}>
        <Text style={styles.sectionTitle}>Qualification</Text>
        <Text style={styles.descriptionText}>Work Experience: {worker.experience}</Text>
        <Text style={styles.descriptionText}>Certification: {worker.certification}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
  profileSection: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  profileContent: {
    marginLeft: 20,
    justifyContent: 'center',
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  rating: {
    fontSize: 16,
    color: '#FFA500',
  },
  description: {
    fontSize: 14,
    color: '#666',
  },
  customerOpinionsSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  opinionCard: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  opinionText: {
    fontSize: 14,
    color: '#666',
  },
  contactSection: {
    marginBottom: 20,
    alignItems: 'center',
  },
  contactButton: {
    backgroundColor: '#FFCC09',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 4,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  contactNumber: {
    fontSize: 16,
    color: '#000',
  },
  imagesSection: {
    marginBottom: 20,
  },
  workerImage: {
    width: 100,
    height: 100,
    marginRight: 10,
    borderRadius: 8,
  },
  descriptionSection: {
    marginBottom: 20,
  },
  descriptionText: {
    fontSize: 14,
    color: '#666',
  },
});

export default WorkerDetails;
