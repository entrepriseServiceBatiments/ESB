import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginForm from './app/LoginForm'; 
import SignupForm from './app/SignupForm';
import SignupPassword from './app/SignupPassword';
import SignupDetails from './app/SignupDetails';
import AccountType from './app/AccountType';
import HomeScreen from './screens/HomeScreen'
import SignupPicture from './app/SignupPicture'
const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator >
        <Stack.Screen name="Login" component={LoginForm} />
        <Stack.Screen name="Signup" component={SignupForm} />
        <Stack.Screen name="SignupPassword" component={SignupPassword} />
        <Stack.Screen name="SignupDetails" component={SignupDetails} />
        <Stack.Screen name="AccountType" component={AccountType} />
        <Stack.Screen name="HomePage" component={HomeScreen} />
        <Stack.Screen name="SignupPicture" component={SignupPicture}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
