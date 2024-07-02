import LandingPage from './LandingPages/LandingPage';
import Home from './Nav/Home';
import Subscribe from './Nav/Subscribe';
import Navbar from './Nav/Navbar';

import Profile from "./profile/profile";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginForm from "./app/LoginForm";
import SignupForm from "./app/SignupForm";
import SignupPassword from "./app/SignupPassword";
import SignupDetails from "./app/SignupDetails";
import AccountType from "./app/AccountType";
import HomeScreen from "./screens/HomeScreen";

import SignupPicture from "./app/SignupPicture";
const Stack = createStackNavigator();

const App = () => {
  return (
        <NavigationContainer>
      
        <Stack.Navigator initialRouteName="Landing">
          <Stack.Screen
            name="Landing"
            component={LandingPage}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Subscribe" component={Subscribe} />
        </Stack.Navigator>
    </NavigationContainer>
      
    

 <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginForm} />

        <Stack.Screen name="Signup" component={SignupForm} />
        <Stack.Screen name="SignupPassword" component={SignupPassword} />
        <Stack.Screen name="SignupDetails" component={SignupDetails} />
        <Stack.Screen name="AccountType" component={AccountType} />
  <Stack.Screen name="SignupPicture" component={SignupPicture} />
        <Stack.Screen name="HomePage" component={HomeScreen} />
        <Stack.Screen name="profile" component={Profile} />
      </Stack.Navigator>
    </NavigationContainer>

  );
};

export default App;
