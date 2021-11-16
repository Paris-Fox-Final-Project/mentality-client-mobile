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
import { setLoginStatus } from "../store/Actions/loginAction";
import { fetchCounselors } from "../store/Actions/counselorsAction";

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

  if(loading){
    return(
        <>
            <View style={[styles.container, styles.horizontal]}>
                <ActivityIndicator size="large" color="#FDB029" />
            </View>
        </>
    )
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
              backgroundColor: "#1F2937",
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
    <SafeAreaView style={[styleHomeClient.AndroidSafeArea]}>
      <View>
          <TouchableOpacity
          style={{
            paddingVertical: 10,
            paddingHorizontal: 20,
            backgroundColor: "black",
          }}
          onPress={logoutHandler}
          >
            <Text style={{ color: "white" }}>Logout</Text>
          </TouchableOpacity>
      </View>
      <View style={[styleHomeClient.profileContainer, styleHomeClient.containerItemFluid, styleHomeClient.mt20, styleHomeClient.justifyCenter]}>
        <View style={[{ alignItems: "center" }]}>
          <Text style={[styles.fs25, styles.cWhite]}>Halo, Damar!</Text>
        </View>
      </View>
      <View style={styleHomeClient.listContainer}>
        <View style={[styleHomeClient.containerItemFluid]}>
          <Text style={[styleHomeClient.fs16, styles.fw500]}>Temukan konselor yang tepat, yuk!</Text>
        </View>
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
  container: {
    marginLeft: 5,
    marginRight: 5,
    paddingBottom: 10,
    paddingTop: 10
  },
  containerItemFluid: {
    marginLeft: 15,
    marginRight: 15,
    paddingBottom: 10,
    paddingTop: 10
  },
  counselorCard: {
    backgroundColor: "white",
    height: 100,
    borderRadius: 15,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 25,
    paddingVertical: 8,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 5,
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
    marginBottom: 10
  },
  mb20: {
    marginBottom: 20
  },
  mb30: {
    marginBottom: 30
  },
  mt10: {
    marginTop: 10
  },
  mt20: {
    marginTop: 20
  },
  mt30: {
    marginTop: 30
  },
  fs20: {
    fontSize: 20
  },
  fs18: {
    fontSize: 18
  },
  fs16: {
    fontSize: 16
  },
  fs14: {
    fontSize: 14
  },
  fwBold: {
    fontWeight: 'bold'
  },
  bWhite: {
    backgroundColor: 'white'
  },
  cWhite: {
    color: 'white'
  },
  cBlack: {
    color: 'black'
  },
  bGrey: {
    backgroundColor: 'grey'
  },
  bLightGrey: {
    backgroundColor: '#C4C4C4'
  },
  dFlex: {
    flexDirection: 'row',
  },
  itemCenter: {
    alignItems: 'center'
  },
  justifyCenter: {
    justifyContent: 'center'
  },
  pCenter: {
    justifyContent: 'center'
  },
  tLeft: {
    textAlign: 'left'
  }
});


const styles = StyleSheet.create({
  container: {
      marginLeft: 5,
      marginRight: 5,
      paddingBottom: 10,
      paddingTop: 10
  },
  containerItemFluid: {
      marginLeft: 15,
      marginRight: 15,
      paddingBottom: 10,
      paddingTop: 10
  },
  flex: {
      flex: 1
  },
  containerItem: {
      width: 300
  },
  blueColor: {
      color: 'black',
      opacity: .8
  },
  fs20: {
      fontSize: 20
  },
  wImage: {
      width: 80,
      height: 80
  },
  w200: {
      width: 150
  },
  w90: {
      width: '90%'
  },
  w80: {
      width: '80%'
  },
  h50: {
      height: 50
  },
  h80: {
      height: 80
  },
  h100: {
      height: '100%'
  },
  mauto: {
      margin: 'auto'
  },
  dFlex: {
      flexDirection: 'row',
  },
  itemCenter: {
      alignItems: 'center'
  },
  justifyCenter: {
      justifyContent: 'center'
  },
  pCenter: {
      justifyContent: 'center'
  },
  mt10: {
      marginTop: 10
  },
  mt20: {
      marginTop: 20
  },
  mt30: {
      marginTop: 30
  },
  ml5: {
      marginLeft: 10
  },
  ml15: {
      marginLeft: 15
  },
  mb5: {
      marginBottom: 5
  },
  mb10: {
      marginBottom: 10
  },
  mb30: {
      marginBottom: 30
  },
  pt5: {
      paddingTop: 5
  },
  pt10: {
      paddingTop: 10
  },
  pb5: {
      paddingBottom: 5
  },
  pb30: {
      paddingBottom: 30
  },
  bWhite: {
      backgroundColor: 'white'
  },
  bOrange: {
      backgroundColor: '#FDB029'
  },
  bDarkBlue: {
      backgroundColor: '#222C39'
  },
  cWhite: {
      color: 'white'
  },
  cBlack: {
      color: 'black'
  },
  br10: {
      borderRadius: 10
  },
  br20: {
      borderRadius: 20
  },
  br30: {
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30
  },
  dFlex: {
      flexDirection: 'row',
  },
  pCenter: {
      justifyContent: 'center'
  },
  tLeft: {
      textAlign: 'left'
  },
  imgSize: {
      height: 50,
      width: 50
  },
  imgMediumSize: {
      height: 80,
      width: 80
  },
  rounded: {
      borderRadius: 90
  },
  h180: {
      height: 180
  },
  h150: {
      height: 150
  },
  h120: {
      height: 120
  },
  w300: {
      width: 300
  },
  bGrey: {
      backgroundColor: 'grey'
  },
  btnSubmit: {
      width: 128,
      height: 26
  },
  z99: {
      zIndex: 99
  },
  container: {
      flex: 1,
      justifyContent: "center"
  },
  horizontal: {
      flexDirection: "row",
      justifyContent: "space-around",
      padding: 10
  },
  fs25: {
      fontSize: 25
  },
  fs20: {
      fontSize: 20
  },
  fs18: {
      fontSize: 18
  },
  fs16: {
      fontSize: 16
  },
  fs14: {
      fontSize: 14
  },
  fwBold: {
      fontWeight: 'bold'
  },
  fw500: {
    fontWeight: "500"
  }
})