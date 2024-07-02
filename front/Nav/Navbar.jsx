import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import HomeScreen from "./HomeScreen.jsx";
import FavoritesScreen from "./Favorites";
import CartScreen from "./Cart";
import ProfileScreen from "./Profile";
import Profile from "../profile/profile";
import NotificationsScreen from "./Notifications";
import LoginStack from "../Nav/LoginScreen"; // Ensure the path is correct

const Tab = createBottomTabNavigator();

const Navbar = () => {
  return (
    <Tab.Navigator
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
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Favorites" component={FavoritesScreen} />
      <Tab.Screen name="Cart" component={CartScreen} />
      <Tab.Screen name="Profile" component={Profile} />
      <Tab.Screen name="Login" component={LoginStack} />
    </Tab.Navigator>
  );
};

export default Navbar;
