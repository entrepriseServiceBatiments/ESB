import React, { useEffect, useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import HomeScreen from "./HomeScreen.jsx";
import Favorites from "./Favorites.jsx";
import CartScreen from "./Cart";
import Shop from "./Shop";

import LoginStack from "../LoginSignup/LoginStack.jsx";

import Profile from "../profile/profile.jsx";
// import NotificationsScreen from "./Notifications";


const Tab = createBottomTabNavigator();

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [initialScreen, setInitialScreen] = useState("Login");

  useEffect(() => {
    const checkToken = async () => {
      const token = await AsyncStorage.getItem("token");
      setIsLoggedIn(token !== null);

      if (token !== null) {
        setInitialScreen("Profile");
      } else {
        setInitialScreen("Login");
      }
    };

    const interval = setInterval(checkToken, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Tab.Navigator
      initialRouteName={initialScreen}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          switch (route.name) {
            case "Home":
              iconName = focused ? "home" : "home-outline";
              break;
            case "Favorites":
              iconName = focused ? "heart" : "heart-outline";
              break;
            case "Cart":
              iconName = focused ? "cart" : "cart-outline";
              break;
            case "Profile":
              iconName = focused ? "person" : "person-outline";
              break;
            case "Login":
              iconName = focused ? "log-in" : "log-in-outline";
              break;
            case "Shop":
              iconName = focused ? "pricetag" : "pricetag-outline";
              break;
            default:
              iconName = "help-circle";
              break;
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "tomato",
        tabBarInactiveTintColor: "gray",
      })}
    >
      {isLoggedIn ? (
        <Tab.Screen name="Profile" component={Profile} />
      ) : (
        <Tab.Screen name="Login" component={LoginStack} />
      )}
      <Tab.Screen name="Favorites" component={Favorites } />
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Shop" component={Shop} />
      <Tab.Screen name="Cart" component={CartScreen} />
     
      
     </Tab.Navigator>
  );
};

export default Navbar;
