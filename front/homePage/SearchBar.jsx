import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, Text, Image,TouchableOpacity } from 'react-native';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [placeHolder, setPlaceHolder] = useState(
    'Trouver plus de 5000 prestataires'
  );

  useEffect(() => {
    const phrases = ['5000 prestataires', '150 services'];
    let index = 0;

    const interval = setInterval(() => {
      index = (index + 1) % phrases.length;
      setPlaceHolder(`Trouver plus de ${phrases[index]}`);
    }, 2000);

    return () => clearInterval(interval);
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
      <TouchableOpacity  onPress={searchii}  style={styles.button}>
        <Text style={styles.button}>SEARCH</Text>
      </TouchableOpacity>
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
    borderColor: '#042630',
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
  button:{
    backgroundColor: "#042630",
    color:'white',
    padding:10
  }
});

export default SearchBar;