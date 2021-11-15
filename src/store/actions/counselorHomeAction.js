import {
  SET_COUNSELOR_HOME_DATA,
  SET_COUNSELOR_HOME_ERROR,
  SET_COUNSELOR_HOME_LOADING,
  SET_COUNSELOR_PROFILE_DATA
} from "../counselorHomeTypes"
import apiClient from "../../apis/index";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const setCounselorHomeData = (payload) => {
  return{
    type: SET_COUNSELOR_HOME_DATA,
    payload: payload
  }
}

export const setCounselorHomeLoading = (payload) => {
  return{
    type: SET_COUNSELOR_HOME_LOADING,
    payload: payload
  }
}

export const setCounselorHomeError = (payload) => {
  return{
    type: SET_COUNSELOR_HOME_ERROR,
    payload: payload
  }
}

export const setCounselorProfileData = (payload) => {
  return{
    type: SET_COUNSELOR_PROFILE_DATA,
    payload: payload
  }
}

export const counselorHomeDataHandler = (payload) => {
  return async (dispatch) => {
    dispatch(setCounselorHomeLoading(true))
    try {
      const access_token = await AsyncStorage.getItem("access_token")
      let user = await AsyncStorage.getItem("user")
      user = JSON.parse(user)
      // console.log(access_token, 'token')
      // console.log(user, 'data user')
      // console.log("data home counselor di store")

      const homeData = await apiClient({
        url: `/counseling/counselor/${user.dataValues.id}`,
        method: "GET",
        headers: {access_token: access_token}
      })
      // console.log(homeData.data, 'balikan server')
      dispatch(setCounselorProfileData(user.payload))
      dispatch(setCounselorHomeData(homeData.data))
    } catch (err) {
      console.log(err, "err get home counselor")
    }
    finally{
      dispatch(setCounselorHomeLoading(false))
    }
  }
}