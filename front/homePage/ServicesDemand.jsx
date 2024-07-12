import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import ServiceCard from './ServiceCard';

const ServicesDemand = ({ services, onServicePress }) => {
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Réserver un service</Text>
        <TouchableOpacity>
          <Text style={styles.viewMore}>Voir plus</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={services}
        renderItem={({ item }) => (
          <ServiceCard
            imageUri={item.imageUri}
            title={item.title}
            description={item.description}
            onPress={() => onServicePress(item.id)}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.list}
      />
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
    color: '#042630	',
  },
  viewMore: {
    fontSize: 14,
    color: '#FFD700',
  },
  list: {
    paddingHorizontal: 10,
  },
});

export default ServicesDemand;
