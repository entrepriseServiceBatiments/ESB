import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import LoginForm from "../app/LoginForm";
import SignupForm from "../app/SignupForm";
import SignupPassword from "../app/SignupPassword";
import SignupDetails from "../app/SignupDetails";
import AccountType from "../app/AccountType";
import SignupPicture from "../app/SignupPicture";

const Stack = createStackNavigator();

function LoginStack() {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={LoginForm} />
      <Stack.Screen name="Signup" component={SignupForm} />
      <Stack.Screen name="SignupPassword" component={SignupPassword} />
      <Stack.Screen name="SignupDetails" component={SignupDetails} />
      <Stack.Screen name="AccountType" component={AccountType} />
      <Stack.Screen name="SignupPicture" component={SignupPicture} />
    </Stack.Navigator>
  );
}

export default LoginStack;
