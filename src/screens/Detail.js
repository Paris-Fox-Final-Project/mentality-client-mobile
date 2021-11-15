import * as React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image } from "react-native";
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
      <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
        <Text>Detail Counselor</Text>
        {/* <Image 
          style={{ width: 200, height: 200, }}
          source={{ uri: singleCounselor.User?.avatarUrl }}
        /> */}
        <Text>{singleCounselor.User?.name}</Text>
        <Text>{singleCounselor.specialist}</Text>
        <Text>{singleCounselor.motto}</Text>
        <Text>{singleCounselor.price}</Text>
        <Text>{singleCounselor.about}</Text>
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
