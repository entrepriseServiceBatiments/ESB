import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ProductScreen from "./ProductScreen";
import Home from "./Home";
const Stack = createStackNavigator();

function LoginStack() {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="ProductScreen" component={ProductScreen} />
    </Stack.Navigator>
  );
}

export default LoginStack;
