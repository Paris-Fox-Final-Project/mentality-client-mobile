import React, { useEffect, useState } from 'react';
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, Image, Text, View, FlatList, TextInput, ScrollView, Button, TouchableOpacity } from 'react-native';
import { counselorCounselingDetailHandler } from "../store/actions/counselorCounselingDetailAction"
import { useFocusEffect } from '@react-navigation/core';
import { useDispatch, useSelector } from 'react-redux';

export default function CounselorDetailClient({ route }) {
    const counselingID = +route.params.counselingId
    const dispatch = useDispatch()
    const { detail, isLoading, error } = useSelector(state => state.detail)
    console.log(detail, 'data detail di page')
    useFocusEffect(
        React.useCallback(() => {
            dispatch(counselorCounselingDetailHandler(counselingID))
        }, [])
    )
    return (
        <SafeAreaView>
            <View>
                <View style={[styles.container, styles.mAuto, styles.h180, styles.mt10]}>
                    <View style={[styles.mt30, styles.dFlex, styles.containerItem, styles.ml15, styles.pCenter]}>
                        <View>
                            <Image style={[styles.imgMediumSize, styles.br10]} source={{
                                uri: detail.User.avatarUrl,
                            }} />
                        </View>
                        <View style={[styles.ml5, styles.mt10]}>
                            <Text style={[styles.cBlack]}>{detail.User.name}</Text>
                            <Text style={[styles.cBlack]}>{detail.User.email}</Text>
                        </View>
                    </View>
                </View>
            </View>
            <View style={[styles.bGrey, styles.mAuto, styles.br30, styles.mt20, styles.h100]}>
                <View style={[styles.w90, styles.mauto, styles.mt20]}>
                    <Text style={[styles.cBlack]}>
                        Deskripsi permasalahan
                    </Text>
                    <Text style={[styles.cBlack]}>
                        {detail.description}
                    </Text>
                </View>
                <View style={[styles.mt10]}>
                    <View>
                        <Text>Topik: {detail.Topic.name}</Text>
                    </View>
                </View>
                <View style={[styles.mt10]}>
                    <View>
                        <Text>Jadwal Konseling: {detail.schedule}</Text>
                    </View>
                    {/* <View>
                        <View style={[styles.dFlex, styles.bWhite, styles.mt10, styles.w90]}>
                            <View>
                                <Image style={[styles.imgSize, styles.rounded]} source={{
                                    uri: 'https://reactnative.dev/img/tiny_logo.png',
                                }} />
                            </View>
                            <View>
                                <Text>name konselor</Text>
                                <Text>deskripsi</Text>
                                <Text>spesialisasi</Text>
                            </View>
                        </View>
                    </View> */}
                </View>
                {/* <View>
                    <TouchableOpacity
                        style={{
                            borderWidth: 1,
                            borderColor: 'rgba(0,0,0,0.2)',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: 250,
                            position: 'absolute',
                            bottom: 10,
                            height: 40,
                            borderRadius: 50,
                            backgroundColor: '#fff',
                        }}
                    >
                        <Text>Mulai Konseling</Text>
                    </TouchableOpacity>
                </View> */}
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