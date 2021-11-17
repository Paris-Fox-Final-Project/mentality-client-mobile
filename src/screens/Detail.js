import * as React from "react";
import { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  ImageBackground,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSingleCounselor,
  setSingleCounselorData,
} from "../store/actions/singleCounselorAction";
import formatPrice from "../helpers/formatPrice";
import Loading from "../components/Loading";
import { useFocusEffect } from "@react-navigation/core";
import getFirstName from "../helpers/getFirstName";
export default function DetailCounselor({ navigation, route }) {
  const dispatch = useDispatch();
  const { id, counselor } = route.params;
  const {
    singleCounselor: counselorData,
    error,
    loading,
  } = useSelector((state) => state.singleCounselor);

  const [singleCounselor, setSingleCounselor] = React.useState(counselor);
  console.log(counselorData);
  useEffect(() => {
    dispatch(fetchSingleCounselor(id));
  }, [id]);

  useFocusEffect(
    React.useCallback(() => {
      if (counselorData) {
        setSingleCounselor(counselorData);
      }

      return () => {
        dispatch(setSingleCounselorData(null));
      };
    }, [counselorData])
  );

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <>
        <View style={[styles.container, styles.horizontal]}>
          <Text>Error</Text>
          <Text>{error}</Text>
        </View>
      </>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          flexDirection: "row",
          backgroundColor: "transparent",
          alignItems: "center",
          justifyContent: "center",
          paddingTop: 10,
          paddingBottom: 10,
          width: "100%",
        }}
      >
        <Image
          source={{ uri: singleCounselor.User?.avatarUrl }}
          style={{
            width: 120,
            height: 120,
            borderRadius: 10,
            marginRight: 10,
          }}
        />
        <View style={{ width: 180 }}>
          <Text
            numberOfLines={2}
            style={{
              fontWeight: "bold",
              fontSize: 18,
              letterSpacing: 0.8,
              color: "#222C39",
            }}
          >
            {singleCounselor.User?.name}
          </Text>
          <Text
            numberOfLines={3}
            style={{
              textAlign: "left",
              overflow: "hidden",
              color: "#222C39",
              fontWeight: "500",
              textTransform: "capitalize",
              fontSize: 13,
            }}
          >
            {singleCounselor.specialist}
          </Text>
        </View>
      </View>
      <View
        style={{
          flex: 1,
          backgroundColor: "white",
          borderTopRightRadius: 32,
          borderTopLeftRadius: 32,
          paddingTop: 40,
          paddingHorizontal: 30,
        }}
      >
        <Text
          style={{
            color: "#222C39",
            fontWeight: "bold",
            fontSize: 18,
            marginBottom: 10,
          }}
        >
          Profile Konselor {getFirstName(singleCounselor.User.name)}
        </Text>
        <View style={{ alignItems: "center", marginBottom: 10 }}>
          <Text
            style={{
              color: "#FDB029",
              fontWeight: "bold",
              fontSize: 18,
              textAlign: "center",
              letterSpacing: 1,
            }}
          >{`" ${singleCounselor.motto} "`}</Text>
        </View>
        <View>
          <Text
            style={{
              textAlign: "justify",
              letterSpacing: 1,
              fontSize: 14,
              lineHeight: 1.5 * 14,
            }}
          >
            {singleCounselor.about}
          </Text>
        </View>
      </View>
      <View style={{ paddingHorizontal: 30 }}>
        <TouchableOpacity
          style={{
            backgroundColor: "#FDB029",
            borderRadius: 10,
            paddingVertical: 4,
            paddingHorizontal: 10,
            minHeight: 44,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={{ color: "white", fontWeight: "bold", fontSize: 16 }}>
            Konseling dengan {getFirstName(singleCounselor.User.name)}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  // return (
  //   <SafeAreaView
  //     style={[styleDetailCounselor.AndroidSafeArea, styles.bLightOrange]}
  //   >
  //     <ScrollView>
  //       <View style={[styles.bDarkBlue, styles.br30, styles.pt20]}>
  //         <View style={[styles.mb30]}>
  //           {/* <View>
  //           <Text style={[styles.fs20, styles.txtCenter, styles.mt10, styles.h50]}>
  //             Profile
  //           </Text>
  //         </View> */}
  //           <View
  //             style={[styles.itemCenter, styles.dFlex, styles.justifyCenter]}
  //           >
  //             <Image
  //               source={{ uri: singleCounselor.User?.avatarUrl }}
  //               style={[styles.imgLargeSize, styles.br10]}
  //             />
  //             <View style={[styles.ml5]}>
  //               <Text style={[styles.fs18, styles.fwBold, styles.cWhite]}>
  //                 {singleCounselor.User?.name}
  //               </Text>
  //               <Text style={[styles.cWhite]}>
  //                 {singleCounselor.specialist}
  //               </Text>
  //               <Text style={[styles.cWhite]}>{singleCounselor.motto}</Text>
  //             </View>
  //           </View>
  //         </View>
  //         <View style={[styles.br30, styles.bWhite]}>
  //           <View style={[styles.containerItemFluid]}>
  //             <View style={[styles.mt30, styles.mb10]}>
  //               <View style={[singleCounselor.mb5]}>
  //                 <Text style={[styles.fs16, styles.fwBold, styles.mb5]}>
  //                   About
  //                 </Text>
  //                 {/* <View style={[styles.bWhite, styles.h120, styles.br10]}> */}
  //                 <ScrollView>
  //                   <Text
  //                     style={[
  //                       styles.container,
  //                       styles.mt5,
  //                       styles.mb5,
  //                       styles.ml5,
  //                     ]}
  //                   >
  //                     {singleCounselor.about}
  //                   </Text>
  //                 </ScrollView>
  //                 {/* </View> */}
  //               </View>
  //               <View style={[styles.boderBlack, styles.br10, styles.mt10]}>
  //                 <Text
  //                   style={[
  //                     styles.fs16,
  //                     styles.fwBold,
  //                     styles.mb5,
  //                     styles.mt5,
  //                     styles.ml5,
  //                   ]}
  //                 >
  //                   Price
  //                 </Text>
  //                 <View
  //                   style={[
  //                     styles.bDarkBlue,
  //                     styles.h50,
  //                     styles.br10,
  //                     styles.dFlex,
  //                     styles.itemCenter,
  //                   ]}
  //                 >
  //                   <Text style={[styles.ml5, styles.cWhite]}>
  //                     {formatPrice(
  //                       !singleCounselor.price ? 0 : singleCounselor.price
  //                     )}
  //                   </Text>
  //                 </View>
  //               </View>
  //             </View>
  //             <View style={[styles.mb10]}>
  //               <View style={[styles.h180, styles.mb30s]}>
  //                 <View style={[styles.mb5]}>
  //                   <Text style={[styles.fs16]}>Review Konseling</Text>
  //                 </View>
  //                 <View
  //                   style={[
  //                     styles.h80,
  //                     styles.bWhite,
  //                     styles.br10,
  //                     styles.mb5,
  //                     styles.shadow,
  //                     styles.boderOrange,
  //                   ]}
  //                 >
  //                   <View style={[styles.containerItemFluid]}>
  //                     <Text>Name Reviewer</Text>
  //                     <Text>Review</Text>
  //                   </View>
  //                 </View>
  //               </View>
  //             </View>
  //           </View>
  //         </View>
  //       </View>
  //     </ScrollView>
  //     <TouchableOpacity
  //       style={[styles.bOrange, styles.h50, styles.br20, styles.floatingButton]}
  //       onPress={() =>
  //         navigation.navigate("Schedule", {
  //           counselor: singleCounselor,
  //         })
  //       }
  //     >
  //       <Text style={[styles.cWhite, styles.fwBold]}>Make appointment</Text>
  //     </TouchableOpacity>
  //   </SafeAreaView>
  // );
}

const styleDetailCounselor = StyleSheet.create({
  AndroidSafeArea: {
    flex: 1,
    backgroundColor: "white",
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
  imgSize: {
    height: 50,
    width: 50,
  },
  imgMediumSize: {
    height: 80,
    width: 80,
  },
  imgLargeSize: {
    height: 100,
    width: 100,
  },
  rounded: {
    borderRadius: 90,
  },
  txtCenter: {
    textAlign: "center",
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
  mt5: {
    marginTop: 5,
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
  mr5: {
    marginBottom: 5,
  },
  pt5: {
    paddingTop: 5,
  },
  pt10: {
    paddingTop: 10,
  },
  pt20: {
    paddingTop: 20,
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
  bLightOrange: {
    backgroundColor: "#F9DCA8",
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
  floatingButton: {
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: 5,
    right: 10,
    left: 10,
  },
  boderOrange: {
    borderWidth: 1,
    borderColor: "#FDB029",
  },
  boderBlack: {
    borderWidth: 1,
    borderColor: "#222C39",
  },
});
