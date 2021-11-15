import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  SET_COUNSELOR_ERROR,
  SET_COUNSELOR_LOADING,
  SET_COUNSELOR_DATA,
} from "../counselorsTypes";
import apiClient from "../../apis/index";

export const setCounselorsData = (payload) => {
  return {
    type: SET_COUNSELOR_DATA,
    payload: payload,
  };
};

export const setCounselorsError = (payload) => {
  return {
    type: SET_COUNSELOR_ERROR,
    payload: payload,
  };
};

export const setCounselorsLoading = (payload) => {
  return {
    type: SET_COUNSELOR_LOADING,
    payload: payload,
  };
};

export const fetchCounselors = () => {
  return async (dispatch) => {
    dispatch(setCounselorsLoading(true));
    try {
      const token = await AsyncStorage.getItem("access_token");
      const { data } = await apiClient({
        url: "/counselors",
        method: "GET",
        headers: token,
      });
      dispatch(setCounselorsData(data));
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
      dispatch(setCounselorsError(message));
    } finally {
      dispatch(setCounselorsLoading(false));
    }
  };
};
