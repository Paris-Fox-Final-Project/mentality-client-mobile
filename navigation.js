import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Login from "./src/screens/Login";
import Register from "./src/screens/Register";
import HomeClient from "./src/screens/HomeClient";
import AsyncStorage from "@react-native-async-storage/async-storage";
import HomeCounselor from "./src/screens/HomeCounselor";
import ListCounselor from "./src/screens/ListCounselor";
import DetailCounselor from "./src/screens/Detail";
import CounselorDetailClient from "./src/screens/CounselorDetailClient";
import { useDispatch, useSelector } from "react-redux";
import Schedule from "./src/screens/Schedule";
import { setLoginStatus } from "./src/store/actions/loginAction";
import HomeNavigation from "./src/components/HomeNavigation";
import Chat from "./src/screens/Chat";

const Stack = createNativeStackNavigator();

export default function Navigation() {
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.login);
  const [user, setUser] = React.useState({});

  React.useEffect(() => {
    (async () => {
      const userData = await AsyncStorage.getItem("user");
      const token = await AsyncStorage.getItem("access_token");

      if (userData) {
        console.log(userData, ">>>>>");
        setUser(JSON.parse(userData));
      }

      if (userData && token) {
        dispatch(setLoginStatus(true));
      }
    })();
  }, [isLoggedIn]);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isLoggedIn ? (
          user.role === "user" ? (
            // seluruh screen counselor
            <>
              <Stack.Screen name="HomeUser" component={HomeNavigation} />
              <Stack.Screen
                name="DetailCounselor"
                component={DetailCounselor}
                options={({ route }) => ({
                  title: route.params.counselor.User.name,
                  headerShown: true,
                })}
              />
              <Stack.Screen
                name="Schedule"
                component={Schedule}
                options={({ route }) => ({
                  title: route.params.counselor.User.name,
                  headerShown: true,
                  headerTitleAlign: "center",
                })}
              />
              <Stack.Screen
                name="Chat"
                component={Chat}
                options={{
                  headerShown: true,
                }}
              />
            </>
          ) : (
            // seluruh screen counselor
            <>
              <Stack.Screen name="HomeCounselor" component={HomeCounselor} />
              <Stack.Screen
                name="CounselorDetailClient"
                component={CounselorDetailClient}
              />
              <Stack.Screen
                name="Chat"
                component={Chat}
                options={{
                  headerShown: true,
                }}
              />
            </>
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
