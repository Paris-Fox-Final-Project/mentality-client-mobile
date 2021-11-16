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
<<<<<<< HEAD
import { setLoginStatus } from "../store/Actions/loginAction";
import { fetchCounselors } from "../store/Actions/counselorsAction";
=======
import {
  getUserLoggedInProfile,
  setLoginStatus,
} from "../store/actions/loginAction";
import { fetchCounselors } from "../store/actions/counselorsAction";
>>>>>>> a361006b2fcf50c9431f19dfe5454652b91f7744

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

<<<<<<< HEAD
  if(loading){
    return(
        <>
            <View style={[styles.container, styles.horizontal]}>
                <ActivityIndicator size="large" color="#FDB029" />
            </View>
        </>
    )
}
=======
  if (loading) {
    return (
      <View style={{ alignItems: "center", justifyContent: "center", flex: 1 }}>
        <ActivityIndicator size="small" color="black" />
      </View>
    );
  }
>>>>>>> a361006b2fcf50c9431f19dfe5454652b91f7744

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
<<<<<<< HEAD
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
=======
    backgroundColor: "transparent",
    height: 100,
    flexDirection: "row",
    marginBottom: 15,
>>>>>>> a361006b2fcf50c9431f19dfe5454652b91f7744
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