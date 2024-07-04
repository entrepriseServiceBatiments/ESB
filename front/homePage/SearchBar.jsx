import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, Button, Image } from 'react-native';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [placeHolder, setPlaceHolder] = useState(
    'Trouver plus de 5000 prestataires'
  );

  useEffect(() => {
    const phrases = ['5000 prestataires', '150 services'];
    let index = 0;

    const intervalId = setInterval(() => {
      index = (index + 1) % phrases.length;
      setPlaceHolder(`Trouver plus de ${phrases[index]}`);
    }, 3000);

    return () => clearInterval(intervalId);
  }, []);

  const searchii = () => {
    onSearch(query);
  };
  const keyPress = (el)=>{
    if (el.nativeEvent.key === 'Enter'){
      searchii();
    }
  }

  return (
    <View style={styles.searchContainer}>
      <View style={styles.inputWrapper}>
        <Image source={require('../assets/icons/search.png')} style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder={placeHolder}
          value={query}
          onKeyPress={keyPress}
          onChangeText={setQuery}
        />
      </View>
      <Button title="Search" onPress={searchii} />
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
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