import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const Dropdown = ({ data, onSelect }) => {
  return (
    <View style={styles.dropdown}>
      {data.map((item, index) => (
        <TouchableOpacity key={index} onPress={() => onSelect(item)}>
          <Text style={styles.item}>{item}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  dropdown: {
    position: 'absolute',
    top: 50,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    zIndex: 1000,
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default Dropdown;
