import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const categories = [
  "Plumbing",
  "Electricity",
  "Housekeeping",
  "Windows and blinds",
  "Air conditioning",
  "DIY and assembly",
  "Washing machine",
  "Painting",
  "Gardening",
];

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const navigation = useNavigation();

  const fetchProductsByCategory = async (category) => {
    try {
      console.log(`Fetching products for category: ${category}`);
      const response = await fetch(
        `http://localhost:3000/products/${category}`
      );
      const data = await response.json();
      console.log("Fetched products:", data);
      navigation.navigate("ProductScreen", { category, products: data });
      setSelectedCategory(category);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <ScrollView
          horizontal
          contentContainerStyle={styles.scrollView}
          showsHorizontalScrollIndicator={false}
        >
          {categories.map((category, index) => (
            <TouchableOpacity
              key={index}
              style={styles.box}
              onPress={() => fetchProductsByCategory(category)}
            >
              <Text style={styles.boxText}>{category}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={styles.promoContainer}>
          <Image
            source={{
              uri: "https://st.depositphotos.com/62628780/59500/i/450/depositphotos_595006128-stock-photo-passing-safety-inspections-every-single.jpg",
            }}
            style={styles.promoImage}
          />
          <View style={styles.promoTextContainer}>
            <Text style={styles.promoTitle}>
              -25% sur la première année de votre contrat Sécurité avec le code
              JUIN2024
            </Text>
            <Text style={styles.promoDescription}>
              Profitez d’une remise immédiate de 25% sur la souscription de
              votre contrat d’une chaudière gaz ou pompe à chaleur air/eau ou
              d’un climatiseur réversible, Formule Sécurité, avec ou sans option
              Service illigo (non disponible pour le climatiseur réversible).
              Offre réservée aux nouveaux clients ENGIE Home Services et valable
              uniquement sur la première année de contrat.
            </Text>
            <TouchableOpacity
              style={styles.promoButton}
              onPress={() => navigation.navigate("Subscribe")}
            >
              <Text style={styles.promoButtonText}>Je souscris un contrat</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.noticeContainer}>
          <Text style={styles.noticeTitle}>
            Jusqu’au 30 juin 2024 pour souscrire 1 an d’option “Gaz Vert+”
            offert
          </Text>
          <Text style={styles.noticeDescription}>
            Vous avez validé un devis d’installation de chaudière gaz à Très
            Haute Performance Énergétique entre le 1er avril et le 31 mai ? Vous
            avez encore jusqu’au 30 juin 2024 pour bénéficier de 1 an offert
            d’option “Gaz Vert+ 100%” d’ENGIE.
          </Text>
          <TouchableOpacity
            style={styles.noticeButton}
            onPress={() => navigation.navigate("Subscribe")}
          >
            <Text style={styles.noticeButtonText}>
              Souscrire l’option “Gaz Vert+”
            </Text>
          </TouchableOpacity>
        </View>
        <View>
          
        </View>

        <View style={styles.servicesContainer}>
          <Text style={styles.servicesHeader}>
            Un service de proximité et de qualité pour vous accompagner en toute
            sécurité
          </Text>
          <View style={styles.serviceItem}>
            <Image
              source={require("../assets/icons/position.png")}
              style={styles.serviceIcon}
            />
            <Text style={styles.serviceTitle}>Nos agences de proximité</Text>
            <Text style={styles.serviceDescription}>
              Entretien, dépannage, installation et remplacement de vos
              équipements par nos équipes locales
            </Text>
          </View>
          <View style={styles.serviceItem}>
            <Image
              source={require("../assets/icons/miner.png")}
              style={styles.serviceIcon}
            />
            <Text style={styles.serviceTitle}>
              Une expertise de près de 50 ans
            </Text>
            <Text style={styles.serviceDescription}>
              Des agences certifiées RGE avec un réseau de technico-commerciaux
              et techniciens régulièrement formés
            </Text>
          </View>
          <View style={styles.serviceItem}>
            <Image
              source={require("../assets/icons/team.png")}
              style={styles.serviceIcon}
            />
            <Text style={styles.serviceTitle}>
              Des partenariats aves des grandes marques
            </Text>
            <Text style={styles.serviceDescription}>
              Large choix d’équipements de chauffage, climatisation et
              production d’eau chaude de grandes marques
            </Text>
          </View>
          <View style={styles.serviceItem}>
            <Image
              source={require("../assets/icons/guarantee.png")}
              style={styles.serviceIcon}
            />
            <Text style={styles.serviceTitle}>
              Confiance et sécurité au cœur de nos priorités
            </Text>
            <Text style={styles.serviceDescription}>
              Nous veillons à la sécurité et à la satisfaction de nos clients au
              travers de nos actions et nos interventions !
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollView: {
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  box: {
    backgroundColor: "#f0f0f0",
    padding: 20,
    marginHorizontal: 10,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  boxText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  promoContainer: {
    flexDirection: "row",
    padding: 20,
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
    marginBottom: 20,
    marginHorizontal: 10,
  },
  promoImage: {
    width: 150,
    height: 150,
    borderRadius: 10,
    marginRight: 20,
  },
  promoTextContainer: {
    flex: 1,
    justifyContent: "center",
  },
  promoTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  promoDescription: {
    fontSize: 14,
    color: "#555",
    marginBottom: 10,
  },
  promoButton: {
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 5,
  },
  promoButtonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
  noticeContainer: {
    padding: 20,
    backgroundColor: "#e0f7fa",
    borderRadius: 10,
    marginBottom: 20,
    marginHorizontal: 10,
  },
  noticeTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  noticeDescription: {
    fontSize: 14,
    color: "#555",
    marginBottom: 10,
  },
  noticeButton: {
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 5,
  },
  noticeButtonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
  servicesContainer: {
    padding: 20,
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    marginBottom: 20,
    marginHorizontal: 10,
  },
  servicesHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  serviceItem: {
    alignItems: "center",
    marginBottom: 20,
  },
  serviceIcon: {
    width: 50,
    height: 50,
    marginBottom: 10,
  },
  serviceTitle: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  serviceDescription: {
    fontSize: 14,
    color: "#555",
    textAlign: "center",
    paddingHorizontal: 20,
  },
});

export default Home;
