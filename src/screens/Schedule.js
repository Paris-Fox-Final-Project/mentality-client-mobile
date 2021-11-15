import * as React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";

export default function ScheduleCounseling({ navigation, route  }) {
  const dispatch = useDispatch();
  const { name, specialist, price } = route.params;
  
  return (
    <SafeAreaView style={styleScheduleCounseling.AndroidSafeArea}>
      <View style={{ flexDirection: 'column', justifyContent: "center", alignItems: "center", flex: 1 }}>
        <Text style={{ fontSize: 30, fontWeight: "bold" }}>Book Your Session</Text>
        <Text>Berikut params dari Detail Screen:</Text>
        <Text>name: {name}</Text>
        <Text>specialist: {specialist}</Text>
        <Text>price: {price}</Text>
        <Button 
          title='Submit Your Schedule'
        />
      </View>
    </SafeAreaView>
  );
}

const styleScheduleCounseling = StyleSheet.create({
  AndroidSafeArea: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});
