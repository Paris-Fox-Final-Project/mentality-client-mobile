import * as React from "react";
import { StatusBar, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Schedule() {
  const [schedule, setSchedule] = React.useState(new Date());
  return (
    <SafeAreaView style={styleSchedule.container}>
      <View>
        <Text>Hello World</Text>
      </View>
    </SafeAreaView>
  );
}

const styleSchedule = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    paddingHorizontal: 10,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});
