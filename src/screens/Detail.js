import * as React from "react";
import { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image, Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { fetchSingleCounselor } from "../store/actions/singleCounselorAction"

export default function DetailCounselor({ navigation, route }) {
  const dispatch = useDispatch();
  const { id } = route.params;
  const { singleCounselor, error, loading } = useSelector(
    (state) => state.singleCounselor
  );

  useEffect(() => {
    dispatch(fetchSingleCounselor(id))
  }, [id])

  if (loading) return <Text>Loading...</Text>
  if (error) return <Text>Error: {error}</Text>

  
  return (
    <SafeAreaView style={styleDetailCounselor.AndroidSafeArea}>
      <View style={{ flexDirection: 'column', justifyContent: "center", alignItems: "center", flex: 1 }}>
        <Text style={{ fontSize: 30, fontWeight: "bold" }}>Detail Counselor</Text>
        <Image 
          style={{ width: 200, height: 200, }}
          source={{ uri: singleCounselor.User?.avatarUrl }}
        />
        <Text>name:{singleCounselor.User?.name}</Text>
        <Text>specialist:{singleCounselor.specialist}</Text>
        <Text>motto:{singleCounselor.motto}</Text>
        <Text>price:{singleCounselor.price}</Text>
        <Text>about:{singleCounselor.about}</Text>
        <Button 
          title='Schedule Your Counseling'
          onPress={() => navigation.navigate('ScheduleCounseling', 
            {
              name: singleCounselor.User?.name,
              specialist: singleCounselor.specialist,
              price: singleCounselor.price
            }
          )} 
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
