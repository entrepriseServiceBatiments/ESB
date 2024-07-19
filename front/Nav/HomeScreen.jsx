import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './Home';
import Subscribe from './Subscribe';
import Promos from '../promos/Promos';
import CategoryDetails from '../homePage/CategoryDetails';
import WorkerDetails from '../homePage/WorkerDetails';
import AllChats from '../profile/AllChat.jsx';
import WorkerChat from '../profile/WorkerChat';
import Chatpage from '../Nav/Chat.jsx';
import ServiceDetails from '../homePage/ServiceDetails.jsx';
const Stack = createStackNavigator();

function LoginStack() {
  return (
    <Stack.Navigator initialRouteName="Login"   screenOptions={{
      headerShown: false
    }}>
      <Stack.Screen name="HomeScreen" component={Home} />
      <Stack.Screen name="CategoryDetails" component={CategoryDetails} />
      <Stack.Screen name="WorkerDetails" component={WorkerDetails} />
      <Stack.Screen name="Promos" component={Promos} />
      <Stack.Screen name="ServiceDetails" component={ServiceDetails} />
      <Stack.Screen name="Subscribe" component={Subscribe} />
      <Stack.Screen name="Chat" component={Chatpage} />
      {/* <Stack.Screen name="AllChats" component={AllChats} /> */}
      <Stack.Screen name="workerChat" component={WorkerChat} />
    </Stack.Navigator>
  );
}

export default LoginStack;
