import React from 'react';
import { StyleSheet, Image, Text, View, SafeAreaView, FlatList, TextInput, Button } from 'react-native';

export default function HomeClient({navigation}) {
  return (
    <SafeAreaView>
      <View>
        <View style={[styles.container, styles.bGrey, styles.mAuto, styles.h180, styles.br38, styles.mt10]}>
          <View style={[styles.mt30, styles.dFlex, styles.containerItem, styles.ml15]}>
            <View>
              <Image style={[styles.imgSize, styles.rounded]} source={{
                uri: 'https://reactnative.dev/img/tiny_logo.png',
              }}/>
            </View>
            <View style={[styles.ml5]}>
              <Text style={[styles.cWhite]}>Name</Text>
              <Text style={[styles.cWhite]}>Selamat datang di Mentality.</Text>
            </View>
          </View>
        </View>
      </View>
        <View style={[styles.bGrey, styles.mAuto, styles.h180, styles.br30, styles.mt20, styles.h100]}>
          <View style={[styles.w80, styles.mauto, styles.mt10]}>
            <TextInput style={[styles.h50, styles.bWhite]} placeholder="Search.."/>
          </View>
          <View style={[styles.dFlex, styles.bWhite, styles.mt30, styles.w90]}>
            <View>
              <Image style={[styles.imgSize, styles.rounded]} source={{
                uri: 'https://reactnative.dev/img/tiny_logo.png',
              }}/>
            </View>
            <View>
              <Text>name konselor</Text>
              <Text>deskripsi</Text>
              <Text>spesialisasi</Text>
              <Button style={[styles.btnSubmit, styles.bWhite, styles.  cBlack]}
                title="Jadwal Konsesi"
                accessibilityLabel="Learn more about this purple button"
              />
            </View>
          </View>
          <View style={[styles.dFlex, styles.bWhite, styles.mt10, styles.w90]}>
            <View>
              <Image style={[styles.imgSize, styles.rounded]} source={{
                uri: 'https://reactnative.dev/img/tiny_logo.png',
              }}/>
            </View>
            <View>
              <Text>name konselor</Text>
              <Text>deskripsi</Text>
              <Text>spesialisasi</Text>
              <Button style={[styles.btnSubmit, styles.bWhite, styles.  cBlack]}
                title="Jadwal Konsesi"
                accessibilityLabel="Learn more about this purple button"
              />
            </View>
          </View>
          <View style={[styles.dFlex, styles.bWhite, styles.mt10, styles.w90]}>
            <View>
              <Image style={[styles.imgSize, styles.rounded]} source={{
                uri: 'https://reactnative.dev/img/tiny_logo.png',
              }}/>
            </View>
            <View>
              <Text>name konselor</Text>
              <Text>deskripsi</Text>
              <Text>spesialisasi</Text>
              <Button style={[styles.btnSubmit, styles.bWhite, styles.  cBlack]}
                title="Jadwal Konsesi"
                accessibilityLabel="Learn more about this purple button"
              />
            </View>
          </View>
        </View>
    </SafeAreaView>
  )
}

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
  h100: {
    height: '100%'
  },
  mauto:{
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
  br38: {
    borderRadius: 30
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
