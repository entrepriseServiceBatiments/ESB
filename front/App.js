import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LandingPage from './LandingPages/LandingPage';
import Home from './Nav/Home';
import Subscribe from './Nav/Subscribe';
import Navbar from './Nav/Navbar';

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
      
    

  );
};

export default App;
