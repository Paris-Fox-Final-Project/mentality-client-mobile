import * as React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch,  useSelector } from "react-redux";
import { fetchCounselors } from "../store/actions/counselorsAction"

export default function ListCounselor({ navigation }) {
  const dispatch = useDispatch();
  const { counselors, error, loading } = useSelector(
    (state) => state.counselors
  );

  useEffect(() => {
    dispatch(fetchCounselors())
  }, [])

  if (loading) return <Text>Loading...</Text>
  if (error) return <Text>Error: {error}</Text>

  return (
    <SafeAreaView style={styleListCounselor.AndroidSafeArea}>
      <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
        <Text>Counselors List</Text>
        <ScrollView>
          {
            counselors.map((counselor) => (
              <View key={counselor.id} style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
                <Text>{counselor.User?.name}</Text>
                <Text>{counselor.specialist}</Text>
                <Text>{counselor.motto}</Text>
                <Button 
                  title='View Details'
                  onPress={() => navigation.navigate('DetailCounselor', 
                    { id: counselor.id }
                  )} 
                />
              </View>
            ))
          }
        </ScrollView>
        
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
