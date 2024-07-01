import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './Navbar/Home';
import Subscribe from './Subscribe';
import Navbar from './Navbar/Navbar';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Subscribe" component={Subscribe} />
        <Stack.Screen name="Navbar" component={Navbar} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
