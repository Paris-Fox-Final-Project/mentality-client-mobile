import * as React from "react";
import { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, TouchableOpacity, View, ScrollView, Button} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSelector, useDispatch } from "react-redux";
import { setLoginStatus } from "../store/Actions/loginAction";
import { fetchCounselors } from "../store/Actions/counselorsAction";

export default function HomeClient({ navigation }) {
  const dispatch = useDispatch();
  const { counselors, error, loading } = useSelector(
    (state) => state.counselors
  );
  const logoutHandler = () => {
    (async () => {
      await AsyncStorage.removeItem("access_token");
      await AsyncStorage.removeItem("user");
      dispatch(setLoginStatus(false));
    })();
  };

  useEffect(() => {
    dispatch(fetchCounselors())
  }, [])

  if (loading) return <Text>Loading...</Text>
  if (error) return <Text>Error: {error}</Text>

  return (
    <SafeAreaView style={styleHomeClient.AndroidSafeArea}>
      <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
        <Text style={{ fontSize: 30, fontWeight: "bold" }}>Home</Text>
        <Button 
          title='Counseling/List Counselor'
          onPress={() => navigation.navigate('ListCounselor')} 
        />
        <ScrollView>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>List Counselor:</Text>
          {
            counselors.map((counselor) => (
              <View key={counselor.id} style={{ flexDirection: 'column', justifyContent: "center", alignItems: "center", flex: 1 }}>
                <Text>name: {counselor.User?.name}</Text>
                <Text>specialist: {counselor.specialist}</Text>
              </View>
            ))
          }
        </ScrollView>
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
