import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, Button, Image } from 'react-native';
import Dropdown from './Dropdown'; 

const SearchBar = ({ data = [], onSearch }) => {
  const [query, setQuery] = useState('');
  const [placeHolder, setPlaceHolder] = useState('Trouver plus de 5000 prestataires');
  const [filteredData, setFilteredData] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const phrases = ['5000 prestataires', '150 services'];
    let index = 0;

    const interval = setInterval(() => {
      index = (index + 1) % phrases.length;
      setPlaceHolder(`Trouver plus de ${phrases[index]}`);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const handleSearch = () => {
    onSearch(query);
    setShowDropdown(false);
  };

  const handleChangeText = (text) => {
    setQuery(text);
    if (text.length > 0) {
      const results = data.filter(item =>
        item.name.toLowerCase().includes(text.toLowerCase()) ||
        item.jobTitle.toLowerCase().includes(text.toLowerCase()) ||
        item.category.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredData(results);
      setShowDropdown(true);
    } else {
      setFilteredData([]);
      setShowDropdown(false);
    }
  };

  const handleSelectItem = (item) => {
    setQuery(item.name || item.jobTitle || item.category); 
    setShowDropdown(false);
    onSearch(item);
  };

  const handleKeyPress = (event) => {
    if (event.nativeEvent.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <View style={styles.searchContainer}>
      <View style={styles.inputWrapper}>
        <Image source={require('../assets/icons/search.png')} style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder={placeHolder}
          value={query}
          onChangeText={handleChangeText}
          onKeyPress={handleKeyPress}
        />
      </View>
      <Button title="Search" onPress={handleSearch} />
      {showDropdown && <Dropdown data={filteredData} onSelect={handleSelectItem} />}
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    position: 'relative',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
  },
  searchIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    padding: 5,
  },
});

export default SearchBar;
