import React,  {useState} from 'react';
import { StyleSheet, Image, Text, View, SafeAreaView, FlatList, TextInput, Button, Picker } from 'react-native';

export default function Schedule({navigation}) {

  return (
    <SafeAreaView>
      <View style={styles.containerMedium}>
        <View>
          <View>
            <Text>Choose date :</Text>
          </View>
          <View>

          </View>
        </View>
        <View>
          <View>
            <Text>Topic Konseling</Text>
          </View>
          <View>
            <Picker
            style={{ height: 50, width: '100%' }}>
              <Picker.Item label="Keluarga" value="Keluarga" />
              <Picker.Item label="Percintaan" value="Percintaan" />
              <Picker.Item label="Pekerjaan" value="Pekerjaan" />
              <Picker.Item label="External" value="External" />
            </Picker>
          </View>
        </View>
        <View>
          <View>
            <Text>Deskripsi singkat masalah</Text>
          </View>
          <View>
            <View
              style={{
                borderBottomColor: '#000000',
                borderWidth: 1,
              }}>
              <TextInput
                multiline
                numberOfLines={6}
                style={{textAlignVertical: 'top', padding: 5}}
              />
            </View>
          </View>
        </View>
        <View>
          <Button 
            title="Learn More"
            color="#841584"
            accessibilityLabel="Learn more about this purple button"/>
          <Button 
            title="Learn More"
            color="#841584"
            accessibilityLabel="Learn more about this purple button"/>
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
  containerMedium: {
    marginLeft: 10,
    marginRight: 10,
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
