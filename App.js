import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Provider } from "react-redux";
import Login from "./src/screens/Login";
import Register from "./src/screens/Register";
import store from "./src/store";
import HomeClient from "./src/screens/HomeClient";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="HomeClient" component={HomeClient} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
