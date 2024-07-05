import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './Home';
import Subscribe from './Subscribe';
import Promos from '../promos/Promos';
import CategoryDetails from '../homePage/CategoryDetails';
import WorkerDetails from '../homePage/WorkerDetails';
const Stack = createStackNavigator();

function LoginStack() {
  return (

    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="CategoryDetails" component={CategoryDetails} />
      <Stack.Screen name="WorkerDetails" component={WorkerDetails} />
      <Stack.Screen name="Promos" component={Promos} />
      <Stack.Screen name="Subscribe" component={Subscribe} />

    </Stack.Navigator>
  );
}

export default LoginStack;
