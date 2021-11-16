import * as React from "react";
import { useEffect } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  ActivityIndicator,
  Image,
  StatusBar,
  ImageBackground,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import user from "../../assets/user.png";
import backgroundHome from "../../assets/background.jpg";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSelector, useDispatch } from "react-redux";
import {
  getUserLoggedInProfile,
  setLoginStatus,
} from "../store/actions/loginAction";
import { fetchCounselors } from "../store/actions/counselorsAction";

export default function HomeClient({ navigation }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.login);
  const { counselors, error, loading } = useSelector(
    (state) => state.counselors
  );

  useEffect(() => {
    dispatch(getUserLoggedInProfile());
    dispatch(fetchCounselors());
    StatusBar.setBarStyle("light-content", true);
  }, []);

  const logoutHandler = () => {
    (async () => {
      await AsyncStorage.removeItem("access_token");
      await AsyncStorage.removeItem("user");
      dispatch(setLoginStatus(false));
    })();
  };

  if (loading) {
    return (
      <View style={{ alignItems: "center", justifyContent: "center", flex: 1 }}>
        <ActivityIndicator size="small" color="black" />
      </View>
    );
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
              paddingHorizontal: 8,
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
                fontSize: 10,
                color: "white",
                fontWeight: "bold",
                letterSpacing: 0.5,
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
    <ImageBackground
      source={backgroundHome}
      resizeMode="cover"
      style={styleHomeClient.container}
    >
      <View style={styleHomeClient.profileContainer}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 20,
          }}
        >
          <Text style={styleHomeClient.textUser}>{user?.name} 👋</Text>
          <Image
            source={user?.avatarUrl ? { uri: user?.avatarUrl } : user}
            style={{
              width: 60,
              height: 60,
              borderColor: "white",
              borderWidth: 0.5,
              borderRadius: 99,
            }}
          />
        </View>
      </View>
      <View style={styleHomeClient.listContainer}>
        <Text
          style={{
            fontWeight: "700",
            fontSize: 15,
            color: "#222C39",
            marginBottom: 20,
          }}
        >
          Konselor andalan MentaliTy
        </Text>
        <FlatList
          data={counselors}
          renderItem={renderCardCounselor}
          keyExtractor={(item) => item.id}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </ImageBackground>
  );
}

const styleHomeClient = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    paddingTop: 40,
  },
  listContainer: {
    flex: 1,
    backgroundColor: "white",
    paddingVertical: 20,
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
    paddingHorizontal: 25,
    paddingTop: 50,
  },
  counselorCard: {
    backgroundColor: "transparent",
    height: 100,
    flexDirection: "row",
    marginBottom: 15,
  },
  counselorName: {
    color: "#222C39",
    fontSize: 18,
    fontWeight: "bold",
    letterSpacing: 1,
    textTransform: "capitalize",
  },
  textCardContainer: {
    marginTop: 6,
    flex: 1,
  },
  textSpecialist: {
    textAlign: "justify",
    marginBottom: 10,
    fontSize: 14,
    fontWeight: "600",
    color: "#222C39",
  },
  profileContainer: {
    paddingHorizontal: 20,
    flex: 0.5,
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
