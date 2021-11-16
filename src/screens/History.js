import * as React from "react";
import { StatusBar, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
export default function History() {
  return (
    <SafeAreaView StatusBar={historyStyle.container}>
      <Text>Hello History</Text>
    </SafeAreaView>
  );
}

const historyStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#222C39",
    justifyContent: "center",
    paddingHorizontal: 10,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});
