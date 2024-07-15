import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  Button,
  ScrollView,
} from "react-native";
import MapView from "react-native-maps";
import { AirbnbRating } from "react-native-ratings";
const WorkerDetails = ({ route }) => {
  const { worker } = route.params;
  const [showNumber, setShowNumber] = useState(false);

  const renderCustomerOpinion = ({ item }) => (
    <View style={styles.opinionCard}>
      <Text style={styles.opinionText}>{item.opinion}</Text>
    </View>
  );

  const renderImageItem = ({ item }) => (
    <Image source={{ uri: item }} style={styles.workerImage} />
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.container}>
        <Image source={{ uri: worker.picture }} style={styles.workerImage} />
        <Text style={styles.workerTitle}>{worker.userName}</Text>
        <Text style={styles.jobTitle}>{worker.jobTitle}</Text>
        <Text style={styles.workerDescription}>
          Hourly Rate: {worker.hourlyRate}
        </Text>
        <View style={styles.ratingContainer}>
          <AirbnbRating
            count={5}
            defaultRating={worker.rating}
            size={20}
            showRating={false}
            isDisabled={true}
          />
        </View>
        <Text style={styles.workerDescription}>Address: {worker.address}</Text>
        <MapView style={styles.map} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
  },
  profileSection: {
    flexDirection: "row",
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  profileContent: {
    marginLeft: 20,
    justifyContent: "center",
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
  },
  rating: {
    fontSize: 16,
    color: "#FFA500",
  },
  description: {
    fontSize: 14,
    color: "#666",
  },
  customerOpinionsSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  opinionCard: {
    backgroundColor: "#f0f0f0",
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  opinionText: {
    fontSize: 14,
    color: "#666",
  },
  contactSection: {
    marginBottom: 20,
    alignItems: "center",
  },
  contactButton: {
    backgroundColor: "#FFCC09",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 4,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  contactNumber: {
    fontSize: 16,
    color: "#000",
  },
  imagesSection: {
    marginBottom: 20,
  },
  workerImage: {
    width: 100,
    height: 100,
    marginRight: 10,
    borderRadius: 8,
  },
  descriptionSection: {
    marginBottom: 20,
  },
  descriptionText: {
    fontSize: 14,
    color: "#666",
  },
});

export default WorkerDetails;
