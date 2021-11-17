import * as React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeClient from "../screens/HomeClient";
import History from "../screens/History";
import CustomDrawerContent from "./CustonDrawerContent";
const Drawer = createDrawerNavigator();

export default function HomeNavigation() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Drawer.Screen name="Beranda" component={HomeClient} />
      <Drawer.Screen
        name="Riwayat"
        component={History}
        options={{
          headerShown: true,
        }}
      />
    </Drawer.Navigator>
  );
}
