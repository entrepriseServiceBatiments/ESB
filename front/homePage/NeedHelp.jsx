import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Linking,
  Button,
} from "react-native";
import { FontAwesome, Entypo } from "@expo/vector-icons";

const NeedHelp = () => {
  const [isModalVisible, setModalVisible] = useState(false);

  const handleHelpPress = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const handleContactPress = (number) => {
    const phoneUrl = `tel:${number}`;
    Linking.openURL(phoneUrl);
  };

  return (
    <View>
      <TouchableOpacity style={styles.helpButton} onPress={handleHelpPress}>
        <Text style={styles.helpText}>Need Help    ?</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={handleCloseModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text>Contact us:</Text>
            <TouchableOpacity
              style={styles.contactItem}
              onPress={() => handleContactPress("20458583")}
            >
              <FontAwesome
                name="phone"
                size={40}
                color="#042630"
                style={styles.contactIcon}
              />
              <Text>Ilyes</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.contactItem}
              onPress={() => handleContactPress("27306205")}
            >
              <FontAwesome
                name="phone"
                size={40}
                color="#042630"
                style={styles.contactIcon}
              />
              <Text>Adem</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.contactItem}
              onPress={() => handleContactPress("96003581")}
            >
              <FontAwesome
                name="phone"
                size={40}
                color="#042630"
                style={styles.contactIcon}
              />
              <Text>Aziz</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.contactItem}
              onPress={() => handleContactPress("94904323")}
            >
              <FontAwesome
                name="phone"
                size={40}
                color="#042630"
                style={styles.contactIcon}
              />
              <Text>Taha</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={handleCloseModal}
            >
              <Text style={styles.Button}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  helpButton: {
    backgroundColor: "#042630", // Adjust color as needed
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
    alignSelf: "center",
  },
  helpText: {
    color: "#fff",
    fontSize: 16,
    marginLeft:50,
    marginRight:50
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: "100%",
    backgroundColor: "#fff",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  contactItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  contactIcon: {
    marginRight: 10,
  },
  closeButton: {
    marginTop: 10,
    alignSelf: "center",
    backgroundColor: "#042630",
    padding: 10,
    borderRadius: 5,
    
  },
  Button:{color:"white"}
});

export default NeedHelp;
