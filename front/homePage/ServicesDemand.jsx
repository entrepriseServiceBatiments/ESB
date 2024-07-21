import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ServicesDemand = ({ services }) => {
  const navigation = useNavigation();

  const handleServicePress = (service) => {
    navigation.navigate('ServiceDetails', { service, services });
  };
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Book a service</Text>
        <TouchableOpacity>
          <Text style={styles.viewMore}>Show more</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.border}>
        <FlatList
          data={services}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => handleServicePress(item)}
              style={styles.card}
            >
              <Image source={{ uri: item.imageUri }} style={styles.image} />
              <View style={styles.textContainer}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.description}>{item.description}</Text>
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.list}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#042630',
  },
  viewMore: {
    fontSize: 14,
    color: '#042630',
  },
  border: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    overflow: 'hidden',
    marginHorizontal: 10,
  },
  list: {
    paddingHorizontal: 10,
    paddingVertical: 7,
  },
  card: {
    width: 300,
    height: 200,
    marginHorizontal: 10,
    borderRadius: 10,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  textContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: 'rgba(4, 38, 48, 0.9)', // Semi-transparent background for text
    paddingHorizontal: 10,
    paddingBottom: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    color: '#ddd',
  },
});

export default ServicesDemand;
