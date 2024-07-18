import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Modal } from 'react-native';

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

const Categories = ({ onClose, onSelectCategory, selectedCard }) => {
  const CategoryPress = (category) => {
    onSelectCategory(category);
  };

  return (
    <Modal visible={true} animationType="slide" transparent={true}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <FlatList
            data={categories}
            keyExtractor={(item) => item.name}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.categoryContainer}
                onPress={() =>
                  selectedCard === 'Products'
                    ? CategoryPress(item.name)
                    : CategoryPress(item.jobTitle)
                }
              >
                <Text style={styles.categoryText}>{item.name}</Text>
              </TouchableOpacity>
            )}
          />
          <TouchableOpacity style={styles.backButton} onPress={onClose}>
            <Text style={styles.backButtonText}>Back</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#e6ede6',
    width: '100%',
    height: '100%',
    borderRadius: 10,
    padding: 20,
    
  },
  categoryContainer: {
    backgroundColor: '#042630',
    padding: 15,
    marginBottom: 10,
    marginTop:5,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    width: '100%',
  },
  categoryText: {
    fontSize: 18,
    color:'#e6ede6',
    textAlign:'center'
  },
  backButton: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  backButtonText: {
    color: '#042630',
    fontSize: 18,
  },
});

export default Categories;
