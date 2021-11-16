import * as React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";

export default function Loading() {
  return (
    <View style={loadingStyle.container}>
      <ActivityIndicator size="large" color="#FDB029" />
    </View>
  );
}

const loadingStyle = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
