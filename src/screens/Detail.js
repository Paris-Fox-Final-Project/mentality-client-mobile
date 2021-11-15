import * as React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";

export default function DetailCounselor({ navigation }) {
  const dispatch = useDispatch();
  
  return (
    <SafeAreaView style={styleDetailCounselor.AndroidSafeArea}>
      <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
        <Text>Detail Counselor</Text>
        <Button 
          title='Schedule Your Counseling'
          onPress={() => navigation.navigate('ScheduleCounseling')} 
        />
      </View>
    </SafeAreaView>
  );
}

const styleDetailCounselor = StyleSheet.create({
  AndroidSafeArea: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});
