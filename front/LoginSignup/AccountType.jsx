import React from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  ImageBackground,
  Image,
  Alert,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AccountType = ({ route, navigation }) => {
  const { email, password, username, address, phoneNum, cin } = route.params;

  const automaticLogin = async () => {
    try {


      const response = await fetch("http://192.168.11.225:3000/login", 
 {

        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        await AsyncStorage.setItem("token", data.token);
        await AsyncStorage.setItem("user", JSON.stringify(data.user));
        console.log(data.token);
        navigation.navigate("Profile");
      } else {
        Alert.alert("Login Failed", data.message);
      }
    } catch (error) {
      console.error("Error logging in:", error);
      Alert.alert("Login Failed", "An error occurred. Please try again.");
    }
  };

  const AccountSelection = async (type) => {
    try {
      const url =
        type === "Personal"

          ? "http://192.168.11.225:3000/clients/add"
          : "http://192.168.11.225:3000/workers/add";



      const payload = {
        userName: username,
        address: address,
        cin: parseInt(cin),
        phoneNum: parseInt(phoneNum),
        email: email,
        password: password,
      };

      const response = await axios.post(url, payload);

      if (response.status === 200) {
        console.log("Response:", response.data);
        automaticLogin();
      } else {
        throw new Error("Failed to sign up");
      }
    } catch (error) {
      let errorMessage = "An error occurred. Please try again later.";

      if (error.response) {
        console.error("Error response:", error.response);
        console.error("Status code:", error.response.status);

        if (error.response.data && error.response.data.message) {
          errorMessage = `Error: ${error.response.data.message}`;
        } else {
          errorMessage = `Error: ${error.response.status} ${error.response.statusText}`;
        }
      } else if (error.request) {
        console.error("No response received:", error.request);
        errorMessage =
          "Error: No response from server. Please try again later.";
      } else {
        console.error("Error setting up request:", error.message);
        errorMessage = `Error: ${error.message}`;
      }

      Alert.alert("Error", errorMessage);
      console.error("Error config:", error);
    }

    console.log("Account Type:", type);
    console.log("User Details:", {
      email,
      password,
      username,
      address,
      phoneNum,
      cin,
    });
  };

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require("../assets/logo.png")} />
      <Text style={styles.Title}> Choose your subscription type ! </Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => AccountSelection("Professional")}
      >
        <ImageBackground
          source={require("../assets/ProfessionalAcc.png")}
          style={styles.imageBackground}
          imageStyle={styles.imageStyle}
        >
          <Text style={styles.buttonTitle}>Professional Account</Text>
          <Text style={styles.buttonText}>
            Join ABConstruction as {"\n"}a valued team member! {"\n"}
            Apply now to enhance your {"\n"}visibility to our extensive{"\n"}{" "}
            client base.
          </Text>
        </ImageBackground>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => AccountSelection("Personal")}
      >
        <ImageBackground
          source={require("../assets/PersonalAcount.png")}
          style={styles.imageBackground}
          imageStyle={styles.imageStyle}
        >
          <Text style={styles.buttonTitle}>Personal Account</Text>
          <Text style={styles.buttonText}>
            Partner with ABConstruction to rent top-quality building materials.
            Apply now to access our extensive inventory and reliable service.
          </Text>
        </ImageBackground>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
    backgroundColor: "#e6ede6",
  },
  button: {
    height: 200,
    marginVertical: 10,
    borderWidth: 3,
    borderColor: "white",
    backgroundColor: "#042630",
  },
  image: {
    width: 300,
    height: 200,
    alignItems: "center",
    marginLeft: "10%",
  },
  imageBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    overflow: "hidden",
  },
  imageStyle: {
    resizeMode: "contain",
    opacity: 0.9,
    marginLeft: 220,
  },
  buttonTitle: {
    fontSize: 24,
    color: "#ffffff",
    fontWeight: "bold",
    marginBottom: 8,
    textAlign: "left",
    marginRight: 80,
  },
  buttonText: {
    fontSize: 16,
    color: "#ffffff",
    textAlign: "left",
    paddingHorizontal: 16,
    marginRight: 120,
  },
  Title: {
    fontSize: 35,
    textAlign: "center",
    color: "#042630",
  },
});

export default AccountType;
