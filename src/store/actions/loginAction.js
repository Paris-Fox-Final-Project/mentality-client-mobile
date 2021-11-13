import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  SET_LOGIN_ERROR,
  SET_LOGIN_LOADING,
  SET_LOGIN_STATUS,
} from "../loginTypes";
import apiServer from "../../apis";
export const setLoginError = (payload) => {
  return {
    type: SET_LOGIN_ERROR,
    payload: payload,
  };
};

export const setLoginLoading = (payload) => {
  return {
    type: SET_LOGIN_LOADING,
    payload: payload,
  };
};

export const setLoginStatus = (payload) => {
  return {
    type: SET_LOGIN_STATUS,
    payload: payload,
  };
};

export const loginHandler = (credential) => {
  return async (dispatch, getState) => {
    dispatch(setLoginLoading(true));
    try {
      const { data } = await apiServer({
        url: "/login",
        method: "POST",
        data: credential,
      });
      await AsyncStorage.setItem("access_token", data.access_token);
      dispatch(setLoginStatus(true));
    } catch (error) {
      const { response } = error;
      const { data } = response;
      const message = data.message;
      dispatch(setLoginError(message));
    } finally {
      dispatch(setLoginLoading(false));
    }
  };
};
