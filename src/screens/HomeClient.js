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
import userProfile from "../../assets/user.png";
import backgroundHome from "../../assets/background.jpg";
import { useSelector, useDispatch } from "react-redux";
import { getUserLoggedInProfile } from "../store/actions/loginAction";
import { fetchCounselors } from "../store/actions/counselorsAction";
import { useFocusEffect } from "@react-navigation/core";
import Loading from "../components/Loading";

export default function HomeClient({ navigation }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.login);
  const { counselors, loading } = useSelector((state) => state.counselors);

  useEffect(() => {
    dispatch(getUserLoggedInProfile());
    dispatch(fetchCounselors());
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      StatusBar.setBarStyle("light-content", true);
      return () => {
        StatusBar.setBarStyle("dark-content", true);
      };
    }, [])
  );

  if (loading) {
    return <Loading />;
  }

  const renderCardCounselor = ({ item }) => {
    return (
      <View
        style={[
          styleHomeClient.counselorCard,
          styleHomeClient.br10,
          styleHomeClient.boderBoldBlack,
        ]}
      >
        <View
          style={[
            styleHomeClient.itemCenter,
            styleHomeClient.dFlex,
            styleHomeClient.ml5,
          ]}
        >
          <Image
            source={{ uri: item.User.avatarUrl }}
            style={styleHomeClient.profilePicture}
          />
        </View>
        <View style={styleHomeClient.textCardContainer}>
          <Text style={styleHomeClient.counselorName}>{item.User.name}</Text>
          <Text style={styleHomeClient.textSpecialist} numberOfLines={2}>
            {item.specialist}
          </Text>
          <View style={{ alignSelf: "flex-end", marginRight: 10 }}>
            <TouchableOpacity
              style={[
                {
                  backgroundColor: "#FDB029",
                  alignSelf: "flex-start",
                  paddingVertical: 6,
                  paddingHorizontal: 8,
                  borderRadius: 15,
                  width: 120,
                  marginBottom: 3,
                },
              ]}
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
                  textAlign: "center",
                }}
              >
                Jadwalkan Sesi
              </Text>
            </TouchableOpacity>
          </View>
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
      <View
        style={[
          styleHomeClient.profileContainer,
          styleHomeClient.justifyCenter,
        ]}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View>
            <Text style={[styleHomeClient.fs30, styleHomeClient.cWhite]}>
              Welcome,{" "}
            </Text>
            <Text style={[styleHomeClient.cWhite, styleHomeClient.fs18]}>
              {user?.name} 👋
            </Text>
          </View>

          <Image
            source={user?.avatarUrl ? { uri: user?.avatarUrl } : userProfile}
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
          showsVerticalScrollIndicator={false}
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
    paddingTop: 20,
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
  containerItemFluid: {
    marginLeft: 15,
    marginRight: 15,
    paddingBottom: 10,
    paddingTop: 10,
  },
  counselorCard: {
    flexDirection: "row",
    marginBottom: 15,
    alignItems: "center",
    backgroundColor: "white",
    paddingBottom: 10,
    paddingHorizontal: 5,
  },
  counselorName: {
    color: "#222C39",
    fontSize: 18,
    fontWeight: "bold",
    letterSpacing: 1,
    textTransform: "capitalize",
  },
  textCardContainer: {
    marginTop: 30,
    justifyContent: "center",
    flex: 1,
  },
  textSpecialist: {
    textAlign: "left",
    marginBottom: 10,
    fontSize: 14,
    fontWeight: "600",
    color: "#222C39",
    width: 200,
    textTransform: "capitalize",
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
    width: 60,
    height: 70,
    borderRadius: 8,
    backgroundColor: "gray",
    marginRight: 10,
  },
  textCard: {
    color: "black",
    fontWeight: "bold",
    fontSize: 16,
  },
  mb10: {
    marginBottom: 10,
  },
  mb20: {
    marginBottom: 20,
  },
  mb30: {
    marginBottom: 30,
  },
  mt10: {
    marginTop: 10,
  },
  mt20: {
    marginTop: 20,
  },
  mt30: {
    marginTop: 30,
  },
  ml5: {
    marginLeft: 5,
  },
  fs20: {
    fontSize: 20,
  },
  fs18: {
    fontSize: 18,
  },
  fs16: {
    fontSize: 16,
  },
  fs14: {
    fontSize: 14,
  },
  fwBold: {
    fontWeight: "bold",
  },
  bWhite: {
    backgroundColor: "white",
  },
  cWhite: {
    color: "white",
  },
  cBlack: {
    color: "black",
  },
  bGrey: {
    backgroundColor: "grey",
  },
  bLightGrey: {
    backgroundColor: "#C4C4C4",
  },
  dFlex: {
    flexDirection: "row",
  },
  itemCenter: {
    alignItems: "center",
  },
  justifyCenter: {
    justifyContent: "center",
  },
  justifyRight: {
    justifyContent: "flex-end",
  },
  pCenter: {
    justifyContent: "center",
  },
  tLeft: {
    textAlign: "left",
  },
  tRight: {
    textAlign: "right",
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
  loadingContainer: {
    marginLeft: 5,
    marginRight: 5,
    paddingBottom: 10,
    paddingTop: 10,
  },
  boderOrange: {
    borderWidth: 1,
    borderColor: "#FDB029",
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 5,
  },
  fs30: {
    fontSize: 30,
  },
  fs25: {
    fontSize: 25,
  },
  fs20: {
    fontSize: 20,
  },
  fs18: {
    fontSize: 18,
  },
  fs16: {
    fontSize: 16,
  },
  fs14: {
    fontSize: 14,
  },
  fwBold: {
    fontWeight: "bold",
  },
  boderOrange: {
    borderWidth: 1,
    borderColor: "#FDB029",
  },
  boderBoldOrange: {
    borderWidth: 3,
    borderColor: "#FDB029",
  },
  boderBoldBlack: {
    borderWidth: 1,
    borderColor: "#1F2937",
  },
  br10: {
    borderRadius: 10,
  },
  br20: {
    borderRadius: 20,
  },
  br30: {
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  txtRight: {
    textAlign: "right",
  },
});
