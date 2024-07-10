import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import LoginForm from "../LoginSignup/LoginForm";
import SignupForm from "../LoginSignup/SignupForm";
import SignupPassword from "../LoginSignup/SignupPassword";
import SignupDetails from "../LoginSignup/SignupDetails";
import AccountType from "../LoginSignup/AccountType";
import Profile from '../profile/profile'

const Stack = createStackNavigator();

function LoginStack() {
  return (
    <Stack.Navigator initialRouteName="LoginForm">
      <Stack.Screen name="LoginForm" component={LoginForm} />
      <Stack.Screen name="Signup" component={SignupForm} />
      <Stack.Screen name="SignupPassword" component={SignupPassword} />
      <Stack.Screen name="SignupDetails" component={SignupDetails} />
      <Stack.Screen name="AccountType" component={AccountType} />
      <Stack.Screen name="Profile" component={Profile} />
    </Stack.Navigator>
  );
}

export default LoginStack;
