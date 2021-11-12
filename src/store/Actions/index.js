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
                url: "http://192.168.1.4:4000/login",
                method: "POST",
                data: payload
            })
            // console.log(data.access_token, 'ini')
            await AsyncStorage.setItem("access_token", data.access_token)
            let test = await AsyncStorage.getItem('access_token')
            // console.log(test, 'ini kah')
        } catch (err) {
            console.log(err.response.data, 'err login') 
            dispatch(setError(err.response.data))    
        }
        finally{
            dispatch(setLoading(false))
        }
    }
}