import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  Button,
} from "react-native";

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
        <Button title="Search" onPress={handleSearch} />
      </View>
      <TouchableOpacity onPress={searchii} style={styles.button}>
        <Text style={styles.button}>SEARCH</Text>
      </TouchableOpacity>
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
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    borderColor: "#042630",
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
  },
  searchIcon: {
    width: 24,
    height: 24,
    marginLeft: 10,
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
  button: {
    backgroundColor: "#042630",
    color: "white",
    padding: 10,
  },
});

export default SearchBar;
