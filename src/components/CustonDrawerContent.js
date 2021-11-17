import * as React from "react";
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import { setLoginStatus } from "../store/actions/loginAction";
export default CustomDrawerContent = (props) => {
  const dispatch = useDispatch();
  const signOut = () => {
    (async () => {
      await AsyncStorage.removeItem("access_token");
      await AsyncStorage.removeItem("user");
      dispatch(setLoginStatus(false));
    })();
  };

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem label="Logout" onPress={signOut} />
    </DrawerContentScrollView>
  );
};
