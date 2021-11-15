import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/core";
import * as React from "react";
import { StatusBar } from "react-native";
import { StyleSheet, Image, Text, View, FlatList, TextInput, ScrollView, Button, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { setLoginStatus } from "../store/actions/loginAction";
import { counselorHomeDataHandler } from "../store/actions/counselorHomeAction"
import { NavigationContainer, useNavigation } from '@react-navigation/native';


export default function HomeCounselor({ navigate }) {
  const navigation = useNavigation()
  const dispatch = useDispatch();
  const { homeData, error, isLoading, profile } = useSelector(state => state.counselorHome)
  // console.log(homeData, 'data di home konselor js')

  useFocusEffect(
    React.useCallback(() => {
      dispatch(counselorHomeDataHandler())
    }, [])
  )
  const handleDetail = () => {
    console.log("detail")
  }
  const signOut = () => {
    (async () => {
      await AsyncStorage.removeItem("access_token");
      await AsyncStorage.removeItem("user");
      dispatch(setLoginStatus(false));
    })();
  };
  return (
    <SafeAreaView style={styleHomeCounselor.AndroidSafeArea}>
      <TouchableOpacity
        style={{
          paddingVertical: 10,
          paddingHorizontal: 20,
          backgroundColor: "black",
        }}
        onPress={signOut}
      >
        <Text style={{ color: "white" }}>Logout</Text>
      </TouchableOpacity>
      {/* <View style={{ justifyContent: "center", alignItems: "center" }}>
        <Text>Hello {profile.name}</Text>
        <Text>{profile.email}</Text>
        <TouchableOpacity
          style={{
            paddingVertical: 10,
            paddingHorizontal: 20,
            backgroundColor: "black",
          }}
          onPress={signOut}
        >
          <Text style={{ color: "white" }}>Logout</Text>
        </TouchableOpacity>
        <Text>{JSON.stringify(homeData)}</Text>
        {homeData.map(el=>{
          return 
        })}
      </View> */}
      <ScrollView>
        <View>
          <View style={[styles.container, styles.mAuto, styles.h180, styles.mt10]}>
            <View style={[styles.mt30, styles.containerItem, styles.ml15]}>
              <View style={[styles.pCenter, styles.dFlex]}>
                <Image style={[styles.imgMediumSize, styles.rounded]} source={{
                  uri: 'https://reactnative.dev/img/tiny_logo.png',
                }} />
              </View>
              <View style={[styles.ml5, styles.mt10]}>
                <Text style={[styles.cBlack, styles.txtCenter]}>{profile.name}</Text>
                <Text style={[styles.cBlack, styles.txtCenter]}>{profile.email}</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={[styles.mAuto, styles.mt20, styles.h100]}>
          <View style={[styles.mt10]}>
            <View>
              {homeData.map(el => {
                return (
                  <>
                    <TouchableOpacity
                      key={el.id} onPress={() => navigation.navigate("CounselorDetailClient", { counselingId: el.id })}
                    >

                      <View style={[styles.dFlex, styles.bWhite, styles.mt10, styles.w90, styles.br10, styles.h80]}>
                        <View>
                          <Image style={[styles.imgSize, styles.rounded]} source={{
                            uri: el.User.avatarUrl,
                          }} />
                        </View>
                        <View>
                          <Text>{el.User.name}</Text>
                          <Text>{el.description}</Text>

                        </View>
                      </View>

                    </TouchableOpacity>
                  </>
                )
              })}

            </View>
          </View>
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
  txtCenter: {
    textAlign: 'center'
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
  cWhite: {
    color: 'white'
  },
  cBlack: {
    color: 'black'
  },
  br10: {
    borderRadius: 10
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
  }
})
