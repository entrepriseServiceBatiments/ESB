// In your navigation file (e.g., App.js or Navigation.js)
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Profile from "../profile/profile.jsx";
import AllChats from "../profile/AllChat.jsx";
import WorkerChat from "../profile/WorkerChat.jsx";

const Stack = createStackNavigator();

function AppNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="AllChats" component={AllChats} />

      <Stack.Screen
        name="WorkerChat"
        component={WorkerChat}
        options={({ route }) => ({ title: route.params.userName || "Chat" })}
      />
    </Stack.Navigator>
  );
}

export default AppNavigator;
