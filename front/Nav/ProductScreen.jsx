import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";

const ProductScreen = ({ route }) => {
  const { category } = route.params;
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProductsByCategory = async () => {
      try {
        console.log(`Fetching products for category: ${category}`);
        const response = await fetch(
          `http://192.168.104.10:3000/products/${category}`


        );
        const data = await response.json();
        console.log("Fetched products:", data);
        setProducts(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProductsByCategory();
  }, [category]);

  return (
    <View style={styles.container}>
      <Text style={styles.categoryTitle}>{category}</Text>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.productBox}>
            <Text style={styles.productName}>{item.name}</Text>
            <Text>{item.description}</Text>
            <Text>Price: ${item.price}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  productBox: {
    padding: 15,
    backgroundColor: "#e0e0e0",
    marginBottom: 10,
    borderRadius: 10,
  },
  productName: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ProductScreen;
