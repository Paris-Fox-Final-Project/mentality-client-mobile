import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import HomeClient from "../screens/HomeClient";

const Drawer = createDrawerNavigator();
export default function NavigationDrawer() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="HomeClient">
        <Drawer.Screen name="HomeClient" component={HomeClient} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
