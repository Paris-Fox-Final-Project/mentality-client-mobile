import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
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
  ActivityIndicator,
} from "react-native";
import { counselorCounselingDetailHandler } from "../store/Actions/counselorCounselingDetailAction";
import { useFocusEffect } from "@react-navigation/core";
import { useDispatch, useSelector } from "react-redux";
import { formatDate } from "../helpers/formatDate";
import { scheduleValidation } from "../helpers/scheduleValidation";
import { WebView } from "react-native-webview";

export default function CounselorDetailClient({ route }) {
  const counselingID = +route.params.counselingId;
  const dispatch = useDispatch();
  const [videoUrl,setVideoUrl] = React.useState()
  const { detail, isLoading, error } = useSelector((state) => state.detail);
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  useFocusEffect(
    React.useCallback(() => {
      dispatch(counselorCounselingDetailHandler(counselingID));
    }, [])
  );
  if (isLoading) {
    return (
      <>
        <View style={[styles.container, styles.horizontal]}>
          <ActivityIndicator size="large" color="#FDB029" />
        </View>
      </>
    );
  }

  if(videoUrl){
    return <WebView source={{ uri:videoUrl }} />
  }

  return (
    <SafeAreaView>
      <View style={[styles.mb10, styles.h180]}>
        <View
          style={[styles.container, styles.mAuto, styles.h180, styles.mt10]}
        >
          <View
            style={[
              styles.mt30,
              styles.dFlex,
              styles.containerItem,
              styles.ml15,
              styles.pCenter,
            ]}
          >
            <View>
              <Image
                style={[styles.imgMediumSize, styles.br10]}
                source={{
                  uri: detail.User.avatarUrl,
                }}
              />
            </View>
            <View style={[styles.ml5, styles.justifyCenter]}>
              <Text style={[styles.cBlack, styles.fs18]}>
                {detail.User.name}
              </Text>
              <Text style={[styles.cBlack]}>{detail.User.email}</Text>
            </View>
          </View>
        </View>
      </View>
      <View style={[styles.bOrange, styles.h100, styles.mAuto, styles.br30]}>
        <ScrollView>
          <View style={[styles.containerItemFluid]}>
            <View style={[styles.mauto, styles.mt20]}>
              <Text
                style={[styles.cBlack, styles.fs16, styles.fwBold, styles.mb5]}
              >
                Deskripsi permasalahan
              </Text>
              <View style={[styles.bWhite, styles.h120, styles.br10]}>
                <ScrollView>
                  <Text
                    style={[
                      styles.cBlack,
                      styles.mt10,
                      styles.mb10,
                      styles.ml5,
                    ]}
                  >
                    {detail.description}
                  </Text>
                </ScrollView>
              </View>
            </View>
            <View style={[styles.mt10]}>
              <View>
                <Text style={[styles.fs16, styles.fwBold, styles.mb5]}>
                  Topik
                </Text>
                <View
                  style={[
                    styles.bWhite,
                    styles.h50,
                    styles.br10,
                    styles.dFlex,
                    styles.itemCenter,
                  ]}
                >
                  <Text style={[styles.ml5]}>{detail.Topic.name}</Text>
                </View>
              </View>
            </View>
            <View style={[styles.mt10]}>
              <View>
                <Text style={[styles.fs16, styles.fwBold, styles.mb5]}>
                  Jadwal Konseling
                </Text>
                <View
                  style={[
                    styles.bWhite,
                    styles.h50,
                    styles.br10,
                    styles.justifyCenter,
                  ]}
                >
                  <View style={[styles.dFlex, styles.itemCenter]}>
                    <Text style={[styles.ml5, styles.fwBold]}>Start :</Text>
                    <Text style={[styles.ml5]}>
                      {formatDate(detail.schedule)}
                    </Text>
                  </View>
                  <View style={[styles.dFlex, styles.itemCenter]}>
                    <Text style={[styles.ml5, styles.fwBold]}>End :</Text>
                    <Text style={[styles.ml5]}>
                      {formatDate(detail.enddate)}
                      {/* {detail.enddate} */}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
          <View style={[styles.containerItemFluid]}>
            <TouchableOpacity
              style={[
                styles.bDarkBlue,
                styles.h50,
                styles.br20,
                styles.dFlex,
                styles.justifyCenter,
                styles.itemCenter,
              ]}
              onPress={()=>setVideoUrl(detail.dailyUrl)}
              disabled={!scheduleValidation(detail.schedule)}
            >
              <Text style={[styles.cWhite, styles.fwBold]}>
                Mulai Konseling
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

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
  imgLargeSize: {
    height: 100,
    width: 100,
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
  }
});
