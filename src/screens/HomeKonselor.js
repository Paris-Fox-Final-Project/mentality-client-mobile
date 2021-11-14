import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/core";
import * as React from "react";
import { StatusBar, TouchableOpacity } from "react-native";
import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch,useSelector } from "react-redux";
import { setLoginStatus } from "../store/actions/loginAction";
import {counselorHomeDataHandler} from "../store/actions/counselorHomeAction"


export default function HomeCounselor() {
  const dispatch = useDispatch();
  const {homeData,error,isLoading,profile} = useSelector(state=>state.counselorHome)
  console.log(homeData, 'data di home konselor js', profile)

  useFocusEffect(
    React.useCallback(()=>{
      dispatch(counselorHomeDataHandler())
    },[])
  )
  
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
        <Text>Hello {profile.name}</Text>
        <Text>{profile.email}</Text>
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
        <Text>{JSON.stringify(homeData)}</Text>
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
