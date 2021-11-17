import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/core";
import * as React from "react";
import { StatusBar } from "react-native";
import {
  StyleSheet,
  Image,
  Text,
  View,
  FlatList,
  TextInput,
  ScrollView,
  Button,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { setLoginStatus } from "../store/actions/loginAction";
import { counselorHomeDataHandler } from "../store/actions/counselorHomeAction";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import userProfile from "../../assets/user.png";
import Loading from "../components/Loading";

export default function HomeCounselor({ navigate }) {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { homeData, error, isLoading, profile } = useSelector(
    (state) => state.counselorHome
  );
  useFocusEffect(
    React.useCallback(() => {
      dispatch(counselorHomeDataHandler());
    }, [])
  );

  const signOut = () => {
    (async () => {
      await AsyncStorage.removeItem("access_token");
      await AsyncStorage.removeItem("user");
      dispatch(setLoginStatus(false));
    })();
  };

  const renderListPatient = (item) => {
    return (
      <TouchableOpacity
        style={[
          styles.bWhite,
          styles.mt10,
          styles.br10,
          styles.shadow,
          styles.boderOrange,
        ]}
        onPress={() =>
          navigation.navigate("CounselorDetailClient", {
            counselingId: item.id,
          })
        }
        key={item.id}
      >
        <View
          style={[
            styles.dFlex,
            styles.h120,
            styles.itemCenter,
            styles.containerItemFluid,
          ]}
        >
          <View>
            <Image
              style={[styles.imgSize, styles.rounded]}
              source={
                item.User?.avatarUrl !== null
                  ? {
                      uri: item.User.avatarUrl,
                    }
                  : userProfile
              }
            />
          </View>
          <View style={[styles.ml5, styles.container, styles.h80]}>
            <Text style={[styles.fwBold, styles.mb5]}>{item.User.name}</Text>
            <Text numberOfLines={3}>{item.description}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <SafeAreaView
      style={[styleHomeCounselor.AndroidSafeArea, styles.bLightGrey]}
    >
      <ScrollView>
        <View style={[styles.pb5]}>
          <View
            style={[styles.container, styles.pb30, styles.h180, styles.shadow]}
          >
            <View
              style={[
                styles.bOrange,
                styles.container,
                styles.dFlex,
                styles.itemCenter,
                styles.brb30,
              ]}
            >
              <View style={{ marginRight: 15 }}>
                <Text
                  style={[
                    styles.cBlack,
                    styles.fs16,
                    styles.fwBold,
                    styles.cBlack,
                  ]}
                >
                  {profile.User?.name}
                </Text>
                <Text style={[styles.cBlack]}>{profile.User?.email}</Text>
              </View>
              <View>
                <TouchableOpacity
                  style={{
                    paddingVertical: 10,
                    paddingHorizontal: 15,
                    borderRadius: 100,
                    borderWidth: 3,
                    borderColor: "black",
                  }}
                  onPress={signOut}
                >
                  <Text
                    style={{
                      color: "black",
                      textAlign: "right",
                      fontWeight: "600",
                    }}
                  >
                    Logout
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
        <View
          style={[
            styles.mauto,
            styles.mt10,
            styles.h100,
            styles.containerItemFluid,
          ]}
        >
          <View style={[styles.w50, styles.h50, styles.boderBoldBlack]}>
            <View
              style={[
                styles.justifyCenter,
                styles.itemCenter,
                styles.h100,
                styles.bDarkBlue,
              ]}
            >
              <Text style={[styles.fs16, styles.cWhite]}># Active Patient</Text>
              <Text style={[styles.fs16, styles.cWhite, styles.fwBold]}>
                {homeData.filter((e) => !e.isDone).length}
              </Text>
            </View>
          </View>
          <View style={[styles.mt10]}>{homeData.map(renderListPatient)}</View>
        </View>
      </ScrollView>
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

const styles = StyleSheet.create({
  container: {
    marginLeft: 5,
    marginRight: 5,
    paddingBottom: 10,
    paddingTop: 10,
  },
  containerItemFluid: {
    marginLeft: 15,
    marginRight: 15,
    paddingBottom: 10,
    paddingTop: 10,
  },
  flex: {
    flex: 1,
  },
  containerItem: {
    width: 300,
  },
  blueColor: {
    color: "black",
    opacity: 0.8,
  },
  fs20: {
    fontSize: 20,
  },
  wImage: {
    width: 80,
    height: 80,
  },
  w200: {
    width: 150,
  },
  w90: {
    width: "90%",
  },
  w80: {
    width: "80%",
  },
  w50: {
    width: "50%",
  },
  h50: {
    height: 50,
  },
  h80: {
    height: 80,
  },
  h100: {
    height: "100%",
  },
  mauto: {
    margin: "auto",
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
  pCenter: {
    justifyContent: "center",
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
    marginLeft: 10,
  },
  ml15: {
    marginLeft: 15,
  },
  mb5: {
    marginBottom: 5,
  },
  mb10: {
    marginBottom: 10,
  },
  mb30: {
    marginBottom: 30,
  },
  pt5: {
    paddingTop: 5,
  },
  pt10: {
    paddingTop: 10,
  },
  pb5: {
    paddingBottom: 5,
  },
  pb30: {
    paddingBottom: 30,
  },
  bWhite: {
    backgroundColor: "white",
  },
  bOrange: {
    backgroundColor: "#FDB029",
  },
  cOrange: {
    color: "#FDB029",
  },
  bDarkBlue: {
    backgroundColor: "#222C39",
  },
  cWhite: {
    color: "white",
  },
  cBlack: {
    color: "black",
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
  brb30: {
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  dFlex: {
    flexDirection: "row",
  },
  pCenter: {
    justifyContent: "center",
  },
  tLeft: {
    textAlign: "left",
  },
  imgSize: {
    height: 50,
    width: 50,
  },
  imgMediumSize: {
    height: 80,
    width: 80,
  },
  rounded: {
    borderRadius: 90,
  },
  h180: {
    height: 180,
  },
  h150: {
    height: 150,
  },
  h120: {
    height: 120,
  },
  w300: {
    width: 300,
  },
  bGrey: {
    backgroundColor: "grey",
  },
  btnSubmit: {
    width: 128,
    height: 26,
  },
  z99: {
    zIndex: 99,
  },
  container: {
    flex: 1,
    justifyContent: "center",
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
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
});
