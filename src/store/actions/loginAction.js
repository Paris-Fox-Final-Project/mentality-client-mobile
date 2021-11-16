import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  SET_LOGIN_ERROR,
  SET_LOGIN_LOADING,
  SET_LOGIN_STATUS,
  SET_LOGIN_USER,
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

export const setLoginUser = (payload) => {
  return {
    type: SET_LOGIN_USER,
    payload,
  };
};

export const loginHandler = (credential) => {
  return async (dispatch, getState) => {
    dispatch(setLoginLoading(true));
    dispatch(setLoginError(""));
    try {
      const { data } = await apiServer({
        url: "/login",
        method: "POST",
        data: credential,
      });
      await AsyncStorage.setItem("access_token", data.access_token);
      await AsyncStorage.setItem("user", JSON.stringify(data.user));
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

export const getUserLoggedInProfile = () => {
  return async (dispatch, getState) => {
    dispatch(setLoginLoading(true));
    try {
      const token = await AsyncStorage.getItem("access_token");
      const userString = await AsyncStorage.getItem("user");
      const { id } = JSON.parse(userString);
      const { data } = await apiServer({
        method: "GET",
        url: `/users/${id}`,
        headers: {
          access_token: token,
        },
      });
      const { user } = data;
      dispatch(setLoginUser(user));
    } catch (error) {
      const { response } = error;
      const { data } = response;
      const { message } = data;
      dispatch(setLoginError(message));
    } finally {
      dispatch(setLoginLoading(false));
    }
  };
};
