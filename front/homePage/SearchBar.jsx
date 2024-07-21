import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity
} from 'react-native';
import { useNavigation } from "@react-navigation/native";
const SearchBar = ({ data = [], onSearch }) => {
  const [query, setQuery] = useState("");
  const [placeHolder, setPlaceHolder] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    const phrases = ["5000 prestataires", "200 services"];
    let index = 0;
    let currentIndex = 0;
    let typingInterval = null;

    const updatePlaceholder = () => {
      setPlaceHolder((prevPlaceholder) => {
        if (currentIndex <= phrases[index].length) {
          return phrases[index].slice(0, currentIndex);
        } else {
          return prevPlaceholder.slice(0, -1);
        }
      });
      currentIndex++;

      if (currentIndex > phrases[index].length + 1) {
        currentIndex = 0;
        index = (index + 1) % phrases.length;
      }
    };

    typingInterval = setInterval(updatePlaceholder, 150); // Adjust typing speed here

    return () => clearInterval(typingInterval);
  }, []);

  useEffect(() => {
    if (query.trim() === "") {
      setFilteredData([]);
      setShowDropdown(false);
    } else {
      const filtered = data.filter((item) =>
        item.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredData(filtered);
      setShowDropdown(true);
    }
  }, [query, data]);

  const handleSearch = () => {
    onSearch(filteredData);
    navigation.navigate("Home");
  };

  const handleInputChange = (text) => {
    setQuery(text);
    if (!text) {
      onSearch(data);
    }
  };
  const searchii = () => {
    onSearch(filteredData);
    navigation.navigate("Home");
  };
  const handleDropdownSelect = (item) => {
    setQuery(item.name);
    onSearch([item]);
    setShowDropdown(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Image
          source={require("../assets/icons/search.png")}
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.input}
          placeholder={`Trouvez plus de ${placeHolder}`}
          value={query}
          onChangeText={handleInputChange}
          onFocus={() => setShowDropdown(true)}
          onBlur={() => setShowDropdown(false)}
          onSubmitEditing={handleSearch}
        />
        <TouchableOpacity onPress={handleSearch} style={styles.button}>
          <Text style={styles.buttonText}>SEARCH</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleSearch} style={styles.button}>
          <Text style={styles.buttonText}>SEARCH</Text>
        </TouchableOpacity>
      </View>
      {showDropdown && (
        <View style={styles.dropdown}>
          {filteredData.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleDropdownSelect(item)}
              style={styles.dropdownItem}
            >
              <Text>{item.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
      {showDropdown && (
        <View style={styles.dropdown}>
          {filteredData.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleDropdownSelect(item)}
              style={styles.dropdownItem}
            >
              <Text>{item.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    marginHorizontal: 10,
    marginVertical: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#042630',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: '#fff',
  },
  searchIcon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  input: {
    flex: 1,
    paddingVertical: 5,
    paddingHorizontal: 10,
    fontSize: 13,
  },
  button: {
    backgroundColor: '#042630',
    paddingVertical: 7,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  dropdown: {
    position: "absolute",
    top: 50,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    zIndex: 1000,
    maxHeight: 200,
  },
  dropdownItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
});

export default SearchBar;
