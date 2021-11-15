import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StyleSheet, Text, View, ImageBackground, TextInput, Button } from 'react-native';
import { HandleLogin } from "../store/Actions";

export default function Login({navigation}) {
    const dispatch = useDispatch()
    const {error, isLoading} = useSelector(state=>state.login)
    // console.log(error, isLoading, 'data pelengkap')
    const [loginData, setLoginData] = useState({
        email: '',
        password: ''
    })
    const changeLoginHandler = (val, prop) => {
        const state = loginData
        state[prop] = val
        setLoginData(state)
    }
    const handleLogin = () => {
        const payload = {
            email: loginData.email,
            password: loginData.password
        }
        dispatch(HandleLogin(payload))
    }
    return (
        <>
            <Text>Login Page</Text>

            <TextInput
                style={styles.inputStyle}
                placeholder="Email"
            // value={this.state.email}
            onChangeText={(val) => changeLoginHandler(val, 'email')}
            />
            <TextInput
                style={styles.inputStyle}
                placeholder="Password"
                // value={this.state.password}
                onChangeText={(val) => changeLoginHandler(val, 'password')}
                maxLength={15}
                secureTextEntry={true}
            />
            <Button
                color="#3740FE"
                title="Signup"
                onPress={() => handleLogin()}
            />
            <Text>
                Don't have account? 
                <Text
                onPress={()=> navigation.navigate("Register")}
                >
                    Sign Up
                </Text>
            </Text>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: 35,
        backgroundColor: '#fff'
    },
    inputStyle: {
        width: '100%',
        marginBottom: 15,
        paddingBottom: 15,
        alignSelf: "center",
        borderColor: "#ccc",
        borderBottomWidth: 1
    },
    loginText: {
        color: '#3740FE',
        marginTop: 25,
        textAlign: 'center'
    },
    preloader: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff'
    }
});