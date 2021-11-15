import AsyncStorage from "@react-native-async-storage/async-storage";
import * as React from "react";
import { StatusBar, TouchableOpacity } from "react-native";
import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";
import { setLoginStatus } from "../store/actions/loginAction";

export default function HomeCounselor() {
  const dispatch = useDispatch();
  const signOut = () => {
    (async () => {
      await AsyncStorage.removeItem("access_token");
      await AsyncStorage.removeItem("user");
      dispatch(setLoginStatus(false));
    })();
  };
  return (
    <SafeAreaView style={styleHomeCounselor.AndroidSafeArea}>
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <Text>Hello Counselor</Text>
        <TouchableOpacity
          style={{
            paddingVertical: 10,
            paddingHorizontal: 20,
            backgroundColor: "black",
          }}
          onPress={signOut}
        >
          <Text style={{ color: "white" }}>Logout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styleHomeCounselor = StyleSheet.create({
  AndroidSafeArea: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});
