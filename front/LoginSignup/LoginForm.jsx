import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginForm = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const Login = async () => {
    try {
      const response = await fetch("http://192.168.104.3:3000/login", {
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

  const GoogleLogin = () => {
    console.log("Continue with Google");
  };

  const gotoSignup = () => {
    navigation.navigate("Signup");
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <Image style={styles.image} source={require("../assets/logo.png")} />
        <Text style={styles.title}>Log in to your account</Text>
        <Text style={styles.p}>Enter your username and password</Text>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          autoCapitalize="none"
        />
        <TouchableOpacity style={styles.googleButton} onPress={Login}>
          <Text style={styles.googleButtonText}>Login</Text>
        </TouchableOpacity>
        <View style={styles.separatorContainer}>
          <View style={styles.separator} />
          <Text style={styles.separatorText}>or continue with</Text>
          <View style={styles.separator} />
        </View>
        <TouchableOpacity style={styles.googleButton} onPress={GoogleLogin}>
          <Image
            style={styles.googleIcon}
            source={require("../assets/google-icon.png")}
          />
          <Text style={styles.googleButtonText}>Google</Text>
        </TouchableOpacity>
        <View style={styles.separatorContainer}>
          <View style={styles.separator} />
          <Text style={styles.separatorText}>Don't have an account?</Text>
          <View style={styles.separator} />
        </View>
        <TouchableOpacity style={styles.googleButton} onPress={gotoSignup}>
          <Text style={styles.googleButtonText}>Signup</Text>
        </TouchableOpacity>
      </ScrollView>
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
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: "#042630",
  },
  input: {
    height: 50,
    borderColor: "#042630",
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
    backgroundColor: "#d0d6d6",
  },
  title: {
    textAlign: "center",
    fontSize: 22,
    marginBottom: 8,
    color: "#042630",
  },
  p: {
    textAlign: "center",
    fontSize: 14,
    paddingBottom: 20,
    color: "#042630",
  },
  image: {
    width: 300,
    height: 200,
    alignItems: "center",
    marginLeft: "10%",
  },
  separatorContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 16,
  },
  separator: {
    flex: 1,
    height: 1,
    backgroundColor: "#042630",
  },
  separatorText: {
    marginHorizontal: 8,
    fontSize: 14,
    color: "#042630",
  },
  googleButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#042630",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
  },
  googleIcon: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  googleButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default LoginForm;
