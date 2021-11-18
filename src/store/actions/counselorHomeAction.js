import {
  SET_COUNSELOR_HOME_DATA,
  SET_COUNSELOR_HOME_ERROR,
  SET_COUNSELOR_HOME_LOADING,
  SET_COUNSELOR_PROFILE_DATA,
} from "../counselorHomeTypes";
import apiClient from "../../apis/index";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const setCounselorHomeData = (payload) => {
  return {
    type: SET_COUNSELOR_HOME_DATA,
    payload: payload,
  };
};

export const setCounselorHomeLoading = (payload) => {
  return {
    type: SET_COUNSELOR_HOME_LOADING,
    payload: payload,
  };
};

export const setCounselorHomeError = (payload) => {
  return {
    type: SET_COUNSELOR_HOME_ERROR,
    payload: payload,
  };
};

export const setCounselorProfileData = (payload) => {
  return {
    type: SET_COUNSELOR_PROFILE_DATA,
    payload: payload,
  };
};

export const counselorHomeDataHandler = (payload) => {
  return async (dispatch, getState) => {
    dispatch(setCounselorHomeLoading(true));
    try {
      const access_token = await AsyncStorage.getItem("access_token");
      let user = await AsyncStorage.getItem("user");
      user = JSON.parse(user);
      console.log(user, ">>>");
      if (user.role === "counselor") {
        dispatch(setCounselorProfileData(user));
        const homeData = await apiClient({
          url: `/counseling/counselor/${+user.Counselor?.id}`,
          method: "GET",
          headers: { access_token: access_token },
        });
        dispatch(setCounselorHomeData(homeData.data));
      }
    } catch (err) {
      const { response } = err;
      const { data } = response;
      const { message } = data;
      dispatch(setCounselorHomeError(message));
    } finally {
      dispatch(setCounselorHomeLoading(false));
    }
  };
};
