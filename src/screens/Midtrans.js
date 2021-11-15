import * as React from "react";
import { StatusBar, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { WebView } from "react-native-webview";
export default function Midtrans({ uri }) {
  return (
    <SafeAreaView style={styleMidtrans.container}>
      <WebView source={{ uri }} />
    </SafeAreaView>
  );
}

const styleMidtrans = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 10,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});
