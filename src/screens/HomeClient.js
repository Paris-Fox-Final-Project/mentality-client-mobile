import * as React from "react";
import { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  ActivityIndicator,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSelector, useDispatch } from "react-redux";
import { setLoginStatus } from "../store/actions/loginAction";
import { fetchCounselors } from "../store/actions/counselorsAction";

export default function HomeClient({ navigation }) {
  const dispatch = useDispatch();
  const { counselors, error, loading } = useSelector(
    (state) => state.counselors
  );

  useEffect(() => {
    dispatch(fetchCounselors());
  }, []);

  const logoutHandler = () => {
    (async () => {
      await AsyncStorage.removeItem("access_token");
      await AsyncStorage.removeItem("user");
      dispatch(setLoginStatus(false));
    })();
  };

  if (loading) {
    return <ActivityIndicator size="small" color="black" />;
  }

  const renderCardCounselor = ({ item }) => {
    return (
      <View style={styleHomeClient.counselorCard}>
        <Image
          source={{ uri: item.User.avatarUrl }}
          style={styleHomeClient.profilePicture}
        />
        <View style={styleHomeClient.textCardContainer}>
          <Text style={styleHomeClient.counselorName}>{item.User.name}</Text>
          <Text style={styleHomeClient.textSpecialist} numberOfLines={3}>
            {item.specialist}
          </Text>
          <TouchableOpacity
            style={{
              backgroundColor: "#FDB029",
              alignSelf: "flex-start",
              paddingVertical: 6,
              paddingHorizontal: 20,
              borderRadius: 15,
            }}
            onPress={() =>
              navigation.navigate("DetailCounselor", {
                id: item.id,
                counselor: item,
              })
            }
          >
            <Text
              style={{
                fontSize: 12,
                color: "white",
                fontWeight: "bold",
                letterSpacing: 1,
              }}
            >
              Jadwalkan Sesi
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styleHomeClient.AndroidSafeArea}>
      <View style={styleHomeClient.profileContainer}>
        <View style={{ alignItems: "center" }}>
          <Text style={styleHomeClient.textUser}>Halo, Damar!</Text>
        </View>
      </View>
      <View style={styleHomeClient.listContainer}>
        <Text>Temukan konselor yang tepat, yuk!</Text>
        <FlatList
          data={counselors}
          renderItem={renderCardCounselor}
          keyExtractor={(item) => item.id}
        />
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
  listContainer: {
    flex: 1.5,
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  counselorCard: {
    backgroundColor: "white",
    height: 150,
    borderRadius: 30,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 25,
    paddingVertical: 8,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  counselorName: {
    color: "black",
    fontSize: 18,
    fontWeight: "bold",
    letterSpacing: 1,
  },
  textCardContainer: {
    marginTop: 6,
    flex: 1,
  },
  textSpecialist: {
    textAlign: "justify",
    marginBottom: 10,
  },
  profileContainer: {
    flex: 1,
    borderRadius: 35,
    paddingVertical: 20,
    paddingHorizontal: 10,
    backgroundColor: "#FDB029",
  },
  textUser: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
    letterSpacing: 1,
  },
  profilePicture: {
    width: 85,
    height: 100,
    borderRadius: 8,
    backgroundColor: "gray",
    marginRight: 10,
  },
  textCard: {
    color: "black",
    fontWeight: "bold",
    fontSize: 16,
  },
});
