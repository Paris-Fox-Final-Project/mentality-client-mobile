import axios from "axios";
import { ERROR_STATE_LOGIN, IS_LOADING_LOGIN } from "../ActionType";
import AsyncStorage from '@react-native-async-storage/async-storage';

export function setLoading(payload){
    return{
        type: IS_LOADING_LOGIN,
        payload: payload
    }
}

export function setError(payload){
    return{
        type: ERROR_STATE_LOGIN,
        payload: payload
    }
}

export function HandleLogin(payload){
    return async (dispatch, getState)=>{
        try {
            dispatch(setLoading(true))
            const {data} = await axios({
                url: "http://192.168.1.8:4000/login",
                method: "POST",
                data: payload
            })
            // console.log(data, 'ini')
            await AsyncStorage.setItem('user_cred', JSON.stringify(data.user))
            await AsyncStorage.setItem("access_token", data.access_token)
            let test = await AsyncStorage.getItem('access_token')
            let test1 = await AsyncStorage.getItem('user_cred')
            // get user data juga
            // console.log(test,"||||||||" ,test1,'ini kah')
        } catch (err) {
            console.log(err.response.data, 'err login') 
            dispatch(setError(err.response.data))    
        }
        finally{
            dispatch(setLoading(false))
        }
    }
}

export function HandleRegister(payload){
    return async (dispatch, getState)=>{
        try {
            console.log(payload, 'data di store buat register')
            const {data} = await axios({
                url: "http://192.168.1.5:4000/register",
                method: "POST",
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                data: payload
            })
            console.log(data, 'balikan register')
        } catch (err) {
            console.log(err, 'err regis')
        }
    }
}