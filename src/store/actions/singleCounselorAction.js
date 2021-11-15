import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  SET_SINGLE_COUNSELOR_ERROR,
  SET_SINGLE_COUNSELOR_LOADING,
  SET_SINGLE_COUNSELOR_DATA,
} from "../singleCounselorTypes";
import apiClient from "../../apis/index";

export const setSingleCounselorData = (payload) => {
  return {
    type: SET_SINGLE_COUNSELOR_DATA,
    payload: payload,
  };
};

export const setSingleCounselorError = (payload) => {
  return {
    type: SET_SINGLE_COUNSELOR_ERROR,
    payload: payload,
  };
};

export const setSingleCounselorLoading = (payload) => {
  return {
    type: SET_SINGLE_COUNSELOR_LOADING,
    payload: payload,
  };
};

export const fetchSingleCounselor = (id) => {
  return async (dispatch) => {
    dispatch(setSingleCounselorLoading(true));
    try {
      const token = await AsyncStorage.getItem("access_token", data.access_token);
      const { data } = await apiClient({
        url: "/counselors/" + id,
        method: "GET",
        headers: token,
      });
      dispatch(setSingleCounselorData(data));
    } catch (error) {
      const { response } = error;
      let message = "";
      if (response) {
        let { data } = response;
        if (Array.isArray(data.message)) {
          message = data.message[0];
        } else {
          message = data.message;
        }
      }
      dispatch(setSingleCounselorError(message));
    } finally {
      dispatch(setSingleCounselorLoading(false));
    }
  };
};
