import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Login from "./src/screens/Login";
import Register from "./src/screens/Register";
import HomeClient from "./src/screens/HomeClient";
import AsyncStorage from "@react-native-async-storage/async-storage";
import HomeCounselor from "./src/screens/HomeKonselor";
import { useDispatch, useSelector } from "react-redux";
import { setLoginStatus } from "./src/store/actions/loginAction";

const Stack = createNativeStackNavigator();

export default function Navigation() {
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.login);
  const [user, setUser] = React.useState({});

  React.useEffect(() => {
    (async () => {
      const userData = await AsyncStorage.getItem("user");
      const token = await AsyncStorage.getItem("access_token");

      if (userData && token) {
        dispatch(setLoginStatus(true));
        setUser(JSON.parse(userData));
      }
    })();
  }, [isLoggedIn]);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isLoggedIn ? (
          user.role === "user" ? (
            <Stack.Screen name="HomeClient" component={HomeClient} />
          ) : (
            <Stack.Screen name="HomeCounselor" component={HomeCounselor} />
          )
        ) : (
          <>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
