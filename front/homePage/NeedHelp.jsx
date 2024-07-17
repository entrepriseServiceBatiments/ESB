import React, { useState } from "react";
import { View, Text, TouchableOpacity, Modal, StyleSheet } from "react-native";

const NeedHelp = () => {
  const [isModalVisible, setModalVisible] = useState(false);

  const handleHelpPress = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  return (
    <View>
      <TouchableOpacity style={styles.helpButton} onPress={handleHelpPress}>
        <Text style={styles.helpText}>Besoin d'aide?</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={handleCloseModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text>Contactez nous:</Text>
            <TouchableOpacity style={styles.contactItem}>
              <Text>Ilyes</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.contactItem}>
              <Text>Adem</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.contactItem}>
              <Text>Aziz</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.contactItem}>
              <Text>Taha</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={handleCloseModal}
            >
              <Text>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  helpButton: {
    backgroundColor: "#FFD700", // Adjust color as needed
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
    alignSelf: "center",
  },
  helpText: {
    color: "#000",
    fontSize: 16,
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
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  closeButton: {
    marginTop: 10,
    alignSelf: "center",
    backgroundColor: "#FFD700", // Adjust color as needed
    padding: 10,
    borderRadius: 5,
  },
});

export default NeedHelp;
