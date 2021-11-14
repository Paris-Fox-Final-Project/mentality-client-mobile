import * as React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import { setLoginStatus } from "../store/actions/loginAction";

export default function HomeClient({ navigation }) {
  const dispatch = useDispatch();
  const logoutHandler = () => {
    (async () => {
      await AsyncStorage.removeItem("access_token");
      await AsyncStorage.removeItem("user");
      dispatch(setLoginStatus(false));
    })();
  };
  return (
    <SafeAreaView style={styleHomeClient.AndroidSafeArea}>
      <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
        <Text>Home</Text>
        <TouchableOpacity
          style={{
            backgroundColor: "black",
            paddingHorizontal: 20,
            paddingVertical: 10,
          }}
          onPress={logoutHandler}
        >
          <Text style={{ color: "white" }}>Logout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styleHomeClient = StyleSheet.create({
  AndroidSafeArea: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});
