import * as React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";

export default function ListCounselor({ navigation }) {
  const dispatch = useDispatch();
  
  return (
    <SafeAreaView style={styleListCounselor.AndroidSafeArea}>
      <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
        <Text>Counselors List</Text>
        <Button 
          title='View Details'
          onPress={() => navigation.navigate('List')} 
        />
      </View>
    </SafeAreaView>
  );
}

const styleListCounselor = StyleSheet.create({
  AndroidSafeArea: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});
